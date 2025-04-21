import dotenv from "dotenv"
import conectarConMongoDB from "../../db/db.js"
import jsonwebtoken from "jsonwebtoken"
import { sendWhatsAppMessage } from '../../services/whatsapp.js';

dotenv.config()

async function orderData(req, res) {
    if (req.headers.cookie) {
        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4)
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)

        const db = await conectarConMongoDB();
        const orderCollection = db.collection('ventas');

        const orderData = await orderCollection.find({ Correo: decodificada.user }).toArray();

        return res.status(200).send({
            status: "Data Orders",
            message: "Datos del carrito obtenidos correctamente",
            data: orderData,
        });
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

async function orderDataAdmin(req, res) {
    if (req.headers.cookie) {
        const db = await conectarConMongoDB();
        const orderCollection = db.collection('ventas');

        const orderData = await orderCollection.find({}).toArray();

        return res.status(200).send({
            status: "Data Orders",
            message: "Datos del carrito obtenidos correctamente",
            data: orderData,
        });
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

async function updateStatus(req, res) {
    if (req.headers.cookie) {
        const correo = req.body.Correo;
        const direccion = req.body.Direccion;
        const barrio = req.body.Barrio;
        const estado = req.body.Estado;
        const total = req.body.Total;
        const metodoPago = req.body.MetodoPago;
        const productos = req.body.Productos;
        const fecha = req.body.Fecha;
        const hora = req.body.Hora;
        const nuevoEstado = req.body.NuevoEstado
        const motivo = req.body.Motivo ? req.body.Motivo : "";

        const db = await conectarConMongoDB();
        const orderCollection = db.collection('ventas');

        const usersCollection = db.collection('usuarios');
        const revisarUsuario = await usersCollection.findOne({ Correo: correo })

        const filtro = {
            Correo: correo,
            Direccion: direccion,
            Barrio: barrio,
            Estado: estado,
            Total: total,
            MetodoPago: metodoPago,
            Productos: productos,
            Fecha: fecha,
            Hora: hora,
        };
        const nuevosDatos = {
            $set: {
                Estado: nuevoEstado,
                Motivo: motivo
            }
        };

        const resultado = await orderCollection.updateOne(filtro, nuevosDatos);

        var mensaje = ''

        if (nuevoEstado == "Enviado") {
            mensaje = 
`🛵 Hey *¡Se actualizo tu pedido!*
        
Uno de nuestros repartidores *ya salio* con tu pedido, espera nuevas actualizaciones en la aplicacion`;
        } else if (nuevoEstado == "Preparacion") {
            mensaje = 
`👨‍🍳 Hey *¡Se actualizo tu pedido!*
                    
Estamos *preparando y cocinando tu pedido*, sabemos que tienes hambre pero espera un poco, espera nuevas actualizaciones en la aplicacion`;
        } else if (nuevoEstado == "Cerca") {
            mensaje = 
`📍 Hey *¡Se actualizo tu pedido!*
                    
Estamos *muy cerca*, de tu ubicacion, espera nuevas actualizaciones en la aplicacion`;
        } else if (nuevoEstado == "Cancelado") {
            mensaje = 
`❌ Hey *¡Se actualizo tu pedido!*
                    
Ooops lamentamos informarte que tu pedido *se cancelo*

*Motivo*: ${motivo}`;
        } else if (nuevoEstado == "Entregado") {
            mensaje = 
`✅ Hey *¡Ya entregamos tu pedidio!*
                    
Esperamos que sea de tu agrado y muy pronto vuelvas a realizar un pedido, *¡Disfrutalo!*`;
        }

        const numeroCliente = `57${revisarUsuario.Telefono}`;

        await sendWhatsAppMessage(numeroCliente, mensaje);

        return res.status(200).send({ status: "Update correct", message: "Tus datos ya han sido actualizados" });
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

export const method = {
    orderData,
    orderDataAdmin,
    updateStatus
}