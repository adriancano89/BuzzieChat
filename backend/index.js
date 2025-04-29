import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import rutasUsuarios from './routes/users.routes.js';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send("main");
});
app.use('/users', rutasUsuarios);

app.listen(PORT, () => {
    console.log('Servidor en el puerto ' + PORT);
});