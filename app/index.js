import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import router from './routes/routes.js';
import handleStripeWebhook from './pay/webhook.js';
import { setSocket } from './socket/socket.js';
import { handleSocketConnection } from './socket/connectionHandler.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 4000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // ⚠️ Cámbialo a tu dominio en producción
        methods: ["GET", "POST"]
    }
});

setSocket(io);

io.on('connection', (socket) => {
    handleSocketConnection(socket);
});

app.use('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');
    next();
});

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());

app.use('/', router);

server.listen(port, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${port}`);
});
