import dotenv from "dotenv"
import conectarConMongoDB from "../../db/db.js"
import jsonwebtoken from "jsonwebtoken"

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

export const method = {
    orderData,
    orderDataAdmin
}