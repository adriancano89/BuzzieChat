import multer from "multer";
import fs from 'fs';

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        const chatId = req.params.idChat;
        console.log("ID del chat: " + chatId);
        const dirDestino = `./uploads/chat-${chatId}`;

        if (!fs.existsSync(dirDestino)) {
            fs.mkdirSync(dirDestino, {recursive : true});
        }

        cb(null, dirDestino);
    },
    filename : (req, file, cb) => {
        const extension = file.originalname.split(".").pop();
        cb(null, `${Date.now()}.${extension}`);
    }
});

export const upload = multer({storage : storage});