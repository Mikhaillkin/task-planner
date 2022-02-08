const { Router } = require('express');
const config = require('../config/default.json');
const auth = require('../middleware/auth.middleware');
const jwt = require('jsonwebtoken');
const { check,validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();


//  /api/auth/  +  register/
router.post(
    '/register',
    [
        check('email','Некорректный email').isEmail(),
        check('password','Минимальная длина пароля 6 символов').isLength({ min: 6 })
    ],
    async (req,res) => {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array(), message: 'Некорректные данные при регистрации' });
            }

            const { email,name,password } = req.body;

            const candidate = await User.findOne({ email: email });

            if(candidate) {
                return res.status(400).json({ message: "Такой пользователь уже есть" });
            }

            const user = new User({ email: email,name: name, password: password });

            await user.save().then(console.log('User registered'));

            res.status(201).json({ message: "Пользователь создан" });

        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так" });
        }
})


//api/auth/  +  getUserName/
router.get('/getUserName',
    auth,
    async (req,res) => {
        try {

            console.log(req.body);
            console.log(req.user);

            const user = await User.findById(req.user.userId);

            res.status(201).json(user.name);

        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так" });
        }
    })




//  /api/auth/  +  login/
router.post(
    '/login',
    [
        check('email','Введите корректный email').normalizeEmail().isEmail(),
        check('password','Введите пароль').exists()
    ],
    async (req,res) => {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array(), message: 'Некорректные данные при авторизации' });
            }

            const { email,password } = req.body;

            const user = await User.findOne({ email: email });

            if(!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            if(password !== user.password) {
                return res.status(400).json({ message: 'Неверный пароль' });
            }

            const token = await jwt.sign({
                userId: user.id,
            },config.jwtSecret,{ expiresIn: "365 days" });

            // console.log('User.email: ',user.email);

            res.status(200).json({
                token,
                email: user.email,
                userId: user.id,
                name: user.name
            });

        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так" });
        }
    })


module.exports = router;