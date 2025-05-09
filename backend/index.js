import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import rutasUsuarios from './routes/users.routes.js';
import rutasChats from './routes/chats.routes.js';
import rutasMensajes from './routes/messages.routes.js';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}));

const io = new SocketServer(server, {
    cors: {
      origin: 'http://localhost:5173',
    }
});

io.on('connection', socket => {
    console.log("Cliente conectado. ID: " + socket.id);

    socket.on('message', (data) => {
        console.log(data);
        socket.broadcast.emit('message', data);
    });
})

app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send("main");
});
app.use('/users', rutasUsuarios);
app.use('/chats', rutasChats);
app.use('/messages', rutasMensajes);

server.listen(PORT, () => {
    console.log('Servidor en el puerto ' + PORT);
});