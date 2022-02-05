const path = require('path');
const multer = require('multer');

// var storage = multer.diskStorage({
//     destination: function() {
//         cb(null,'uploads/')
//     },
//     filename: function (req,file,cb) {
//         let ext = path.extname(file.originalname)
//         cb(null, Date.now() + ext)
//     }
// })
//
// var upload = multer ({
//     storage: storage,
//     fileFilter: function(req,file,callback) {
//         if(
//             file.mimetype == "image/png" ||
//             file.mimetype == "image/jpg" ||
//             file.mimetype == "image/jpeg"
//         ) {
//             callback(null, true)
//         } else {
//             console.log('only jpg & png file supported!');
//             callback(null,false)
//         }
//     },
//     limits: {
//         fileSize: 1024 * 1024 * 2
//     }
// })
//
// module.exports = upload;


const  storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'/uploads');
    },
    filename: (req,file,cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname );
    }
});

const filefilter = (req,file,cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg"
        || file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


const upload = multer({storage: storage, fileFilter: filefilter});

// module.exports = {upload};  //как написал он
module.exports = upload;     //или нужно так?