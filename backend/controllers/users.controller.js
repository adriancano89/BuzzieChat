import Usuario from "../models/User.model.js";

export const crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();

        res.status(201).json({ message: 'Usuario creado', user: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', error: error.message });
    }
}