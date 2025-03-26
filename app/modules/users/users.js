import dotenv from "dotenv"
import conectarConMongoDB from "../../db/db.js"

dotenv.config()

async function usersData(req, res) {
    if (req.headers.cookie) {
        const db = await conectarConMongoDB();
        const productsCollection = db.collection('usuarios');

        const usersData = await productsCollection.find({}).toArray();

        return res.status(200).send({
            status: "Data Users",
            message: "Datos de los usuarios obtenidos correctamente",
            data: usersData,
        });
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

async function updateStatus(req, res) {
    if (req.headers.cookie) {
        const correo = req.body.Gmail
        const status = req.body.Estatus

        const db = await conectarConMongoDB();
        const usuariosCollection = db.collection('usuarios');

        const filtro = {
            Correo: correo,
        };
        const nuevosDatos = {
            $set: {
                Estado: status
            }
        };

        const resultado = await usuariosCollection.updateOne(filtro, nuevosDatos);

        return res.status(200).send({ status: "Update Correct", message: "Estatus actualizada" });
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

async function updateRol(req, res) {
    if (req.headers.cookie) {
        const correo = req.body.Gmail
        const rol = req.body.Rol

        if (rol) {
            if (rol == "Administrador" || rol == "SuperAdministrador" || rol == "Cajero" || rol == "Usuario") {
                const db = await conectarConMongoDB();
                const usuariosCollection = db.collection('usuarios');

                const filtro = {
                    Correo: correo,
                };
                const nuevosDatos = {
                    $set: {
                        Rol: rol
                    }
                };

                const resultado = await usuariosCollection.updateOne(filtro, nuevosDatos);

                return res.status(200).send({ status: "Update Correct", message: "Estatus actualizada" });
            } else {
                return res.status(400).send({ status: "Error Rol", message: "El rol que ingresaste para este usuario no esta permitido, los unicos roles son 'Administrador', 'SuperAdministrador', 'Cajero', 'Usuario'" });
            }
        } else {
            return res.status(400).send({ status: "Error Rol", message: "Debes ingresar el nuevo rol del usuario" });
        }
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

export const method = {
    usersData,
    updateStatus,
    updateRol
}