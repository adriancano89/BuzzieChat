import Message from "../models/Message.model.js";

export const createMessage = async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.status(201).json(message);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear el mensaje. Error: " + error.message });
    }
};

export const updateMessage = async (req, res) => {
    try {
        const idMessage = req.params.id;
        const { content } = req.body;
        const message = await Message.findByIdAndUpdate(idMessage, { $set: { content: content } }, { new: true });
        res.status(200).json(message);
    }
    catch (error) {
        res.status(500).json({ message: "Error al editar el mensaje. Error: " + error.message });
    }
};