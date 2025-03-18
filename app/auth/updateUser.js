import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv"
import conectarConMongoDB from "../db/db.js"

dotenv.config()

async function updateData(req, res) {
    if (req.headers.cookie) {
        const name = req.body.Name
        const phone = req.body.Phone
        const direccion = req.body.Direccion

        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4)
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)

        const db = await conectarConMongoDB()
        const usuariosCollection = db.collection('usuarios')

        const revisarUsuario = await usuariosCollection.findOne({ Correo: decodificada.user })

        const filtro = { Correo: revisarUsuario.Correo };
        const nuevosDatos = { $set: { 
            Nombre: name,
            Telefono: phone,
            Direccion: direccion
        }};
    
        const resultado = await usuariosCollection.updateOne(filtro, nuevosDatos);

        return res.status(200).send({ status: "Update correct", message: "Tus datos ya han sido actualizados" })
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesion bien" })
    }
}


export const method = {
    updateData
}