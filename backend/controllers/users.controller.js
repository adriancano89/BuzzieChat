import Usuario from "../models/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { spawn } from 'child_process';
import dotenv from 'dotenv';

export const registro = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const usuario = await Usuario.findOne({$or: [{ email }, { username }]});
        if (usuario) {
            if (usuario.email == email) {
                res.status(400).json({message : 'Este correo electrónico ya está en uso'});
            }
            else {
                res.status(400).json({message : 'Este nombre de usuario ya está registrado'});
            }
        }
        else {
            const passwordHash = await bcrypt.hash(password, 10);
        
            const nuevoUsuario = new Usuario({
                username,
                email,
                password : passwordHash
            })
            
            await nuevoUsuario.save();

            sendEmail(email, username);
            
            res.status(201).json({ message: 'Usuario creado', user: nuevoUsuario });

        }
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', error: error.message });
    }
}

export const sendEmail = async (email, username, token) => {
    const python = spawn('C:\\Users\\adria\\AppData\\Local\\Programs\\Python\\Python313\\python.exe', ['python/sendEmail.py', email, username, token], {
        env : {
            ...process.env
        }
    });

    python.stdout.on('data', (data) => {
    console.log(`Python stdout: ${data.toString()}`);
    });

    python.stderr.on('data', (data) => {
        console.error(`Python stderr: ${data.toString()}`);
    });

    python.on('close', (code) => {
        console.log(`Python terminó con código ${code}`);
    });
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const usuarioEncontrado = await Usuario.findOne({email});
        if (usuarioEncontrado) {
            const coincidePassword = await bcrypt.compare(password, usuarioEncontrado.password);
            if (coincidePassword) {
                const token = jwt.sign(
                    {
                        id: usuarioEncontrado._id,
                    },
                    process.env.TOKEN_SECRET,
                    {
                        expiresIn : "1h"
                    }
                );

                res.cookie('token', token, {
                    httpOnly: true,
                    secure : false,
                });
                res.json(usuarioEncontrado);
            }
            else {
                res.status(400).json({message : "Email o contraseña incorrecto"});
            }
        }
        else {
            res.status(400).json({message : "Email o contraseña incorrecto"});
        }
    } catch (error) {
        res.status(500).json({message : 'Error al validar el usuario. Error: ', error: error.message});
    }
};

export const logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure : false,
    });
    return res.sendStatus(200);
};

export const verificarToken = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (error, user) => {
            if (error) {
                res.status(400).json({message : "Token invalido"});
            }
            else {
                const usuario = await Usuario.findById(user.id);
                if (usuario) {
                    res.json(usuario);
                }
                else {
                    res.status(400).json({message : "Usuario no existe"});
                }
            }
        });
    }
    else {
        res.status(400).json({message : "No hay token. Autorización denegada"});
    }
};

export const perfil = async (req, res) => {
    const usuario = await Usuario.findById(req.user.id);
    res.json(usuario);
};

export const actualizarPerfil = async (req, res) => {
    const { username, email, password } = req.body;
    const usuario = await Usuario.findById(req.user.id);
    const usuarioEncontrado = await Usuario.findOne({$or: [{ email }, { username }], _id : { $ne : usuario._id }});

    if (usuarioEncontrado) {
        if (username === usuarioEncontrado.username) {
            res.status(400).json({ message : "El nombre de usuario introducido ya existe." });
        }
        else {
            res.status(400).json({ message : "El correo electrónico introducido ya existe." });
        }
    }
    else {
        let nuevoPassword;
        if (password === "") {
            nuevoPassword = usuario.password;
        }
        else {
            nuevoPassword = await bcrypt.hash(password, 10);
        }
        const nuevosDatos = {
            username : username,
            email : email,
            password : nuevoPassword
        };
        const usuarioActualizado = await Usuario.findByIdAndUpdate(usuario._id, { $set: nuevosDatos }, { new: true, runValidators: true });
        res.status(200).json({message : "Usuario actualizado con éxito.", usuario : usuarioActualizado});
    }
};

export const getUsers = async (req, res) => {
    try {
        const { busqueda } = req.body;
        const { id } = req.user;
        const usuarios = await Usuario.find({username : {$regex : busqueda, $options : 'i'}, _id : { $ne: id }}); // La opcion 'i' indica que ignore las mayusculas y minusculas
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({message : "Error al obtener los usuarios. Error: " + error.message });
    }
};