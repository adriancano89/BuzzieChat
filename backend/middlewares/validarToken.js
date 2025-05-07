import jwt from 'jsonwebtoken';

export const validacion = (req, res, next) => {
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
            if (error) {
                res.status(400).json({message : "Token invalido"});
            }
            else {
                req.user = user;
                next();
            }
        });
    }
    else {
        res.status(400).json({message : "No hay token. Autorización denegada"});
    }
}