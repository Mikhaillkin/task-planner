const { Router } = require('express');
const config = require('../config/default.json');
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


            const { email,password } = req.body;

            const candidate = await User.findOne({ email: email });

            if(candidate) {
                return res.status(400).json({ message: "Такой пользователь уже есть" });
            }

            const user = new User({ email: email, password: password });

            await user.save().then(console.log('User registered'));

            res.status(201).json({ message: "Пользователь создан" });

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

            res.status(200).json({
                token,
                userId: user.id
            });

        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так" });
        }
    })


module.exports = router;