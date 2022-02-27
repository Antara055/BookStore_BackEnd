import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    // destination: '../uploads',
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

export let upload = multer({ storage: storage })
//export upload;

