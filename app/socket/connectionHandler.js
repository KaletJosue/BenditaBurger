import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv"
import conectarConMongoDB from "../db/db.js"

dotenv.config()

export const handleSocketConnection = async (socket) => {
    const cookies = socket.handshake.headers.cookie;

    if (cookies) {
        const cookieJWT = cookies.split("; ").find(cookie => cookie.startsWith("jwt="))?.slice(4);

        if (cookieJWT) {

            try {
                const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)
                const email = decodificada.user;

                const db = await conectarConMongoDB()
                const usuariosCollection = db.collection('usuarios')

                const revisarUsuario = await usuariosCollection.findOne({ Correo: decodificada.user })

                const role = revisarUsuario.Rol;

                socket.join(email);

                if (role === 'Cajero') socket.join('cajeros');
                if (role === 'Administrador') socket.join('administradores');
                if (role === 'SuperAdministrador') socket.join('superadministradores');

            } catch (err) {
                console.error('❌ Error verificando JWT:', err.message);
            }
        }
    }

    socket.on('disconnect', () => {
        
    });
};
