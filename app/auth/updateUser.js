import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv"
import conectarConMongoDB from "../db/db.js"
import bcryptsjs from "bcryptjs"

dotenv.config()

async function updateData(req, res) {
    if (req.headers.cookie) {
        const name = req.body.Name;
        const phone = req.body.Phone;
        const direccion = req.body.Direccion;
        const barrio = req.body.Barrio;
        const descripcion = req.body.Descripcion;

        if (descripcion.length <= 100) {
            if (phone.length == 10) {
                const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
                const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    
                const db = await conectarConMongoDB();
                const usuariosCollection = db.collection('usuarios');
    
                const revisarUsuario = await usuariosCollection.findOne({ Correo: decodificada.user });
    
                let imageUrl;
                if (req.file) {
                    imageUrl = req.file.path;
                }
    
                const filtro = { Correo: revisarUsuario.Correo };
                const nuevosDatos = {
                    $set: {
                        Nombre: name,
                        Telefono: phone,
                        Direccion: direccion,
                        ...(imageUrl && { Foto: imageUrl }),
                        Barrio: barrio,
                        Descripcion: descripcion
                    }
                };
    
                const resultado = await usuariosCollection.updateOne(filtro, nuevosDatos);
    
                return res.status(200).send({ status: "Update correct", message: "Tus datos ya han sido actualizados" });
            } else {
                return res.status(400).send({ status: "Error Phone", message: "Tu numero de telefono debe ser de 10 digitos" });
            }
        } else {
            return res.status(400).send({ status: "Error Description", message: "La descripcion de tu cada no debe superar los 100 caracteres" });
        }

    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión bien" });
    }
}

async function updatePassword(req, res) {
    if (req.headers.cookie) {
        const password = req.body.Password
        const confirPassword = req.body.ConfirPassword

        if (password == confirPassword) {
            if (password.length >= 8) {
                const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4)
                const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)

                const db = await conectarConMongoDB()
                const usuariosCollection = db.collection('usuarios')

                const revisarUsuario = await usuariosCollection.findOne({ Correo: decodificada.user })

                const salt = await bcryptsjs.genSalt(5)
                const hashPassword = await bcryptsjs.hash(password, salt)

                const filtro = { Correo: revisarUsuario.Correo };
                const nuevosDatos = {
                    $set: {
                        Contraseña: hashPassword
                    }
                };

                const resultado = await usuariosCollection.updateOne(filtro, nuevosDatos);

                return res.status(200).send({ status: "Update correct", message: "Tus datos ya han sido actualizados" })
            } else {
                return res.status(400).send({ status: "Error Passwords", message: "La contraseña debe contener al menos 8 caracteres" })
            }
        } else {
            return res.status(400).send({ status: "Error Passwords", message: "Las contraseñas deben ser iguales" })
        }

    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesion bien" })
    }
}

export const method = {
    updateData,
    updatePassword
}