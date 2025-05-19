import express from 'express';
import { createMessage, updateMessage } from '../controllers/messages.controller.js';
import { upload } from '../config/multer.js';
const router = express.Router();

router.post('/create', createMessage);
router.put('/update/:id', updateMessage);
router.post('/uploadFile/:idChat', upload.single('file'), (req, res, next) => {
    const extensionesImagen = ['png', 'jpg', 'jpeg', 'webp'];
    const extensionesVideo = ['mp4', 'webm'];

    const extension = req.file.filename.split(".").pop();

    let fileType = '';
    if (extensionesImagen.includes(extension)) {
        fileType = 'image';
    }
    else if (extensionesVideo.includes(extension)) {
        fileType = 'video';
    }

    req.body.type = fileType;
    req.body.content = `/uploads/chat-${req.params.idChat}/${req.file.filename}`;

    next();
}, createMessage);

export default router;