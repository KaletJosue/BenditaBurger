import dotenv from "dotenv"
import conectarConMongoDB from "../../db/db.js"
import jsonwebtoken from "jsonwebtoken"

dotenv.config()

async function deleteCar(req, res) {
    if (req.headers.cookie) {
        const name = req.body.Name
        const cant = req.body.Cant
        const correo = req.body.Correo

        const db = await conectarConMongoDB()
        const carCollection = db.collection('carrito')

        const resultado = await carCollection.deleteOne({
            Nombre: name.toLowerCase(),
            Correo: correo
        });

        return res.status(200).send({ status: "Delete Correct", message: "Producto Eliminado correctamente" })
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

async function updateCar(req, res) {
    if (req.headers.cookie) {
        const name = req.body.Name
        const cant = req.body.Cant
        const correo = req.body.Correo

        if (cant <= 10) {
            if (cant == 0) {
                return res.status(400).send({ status: "Error Cant", message: "No puedes pedir menos de 1 producto" });
            } else {
                const db = await conectarConMongoDB();
                const carCollection = db.collection('carrito');
    
                const filtro = {
                    Nombre: name.toLowerCase(),
                    Correo: correo
                };
                const nuevosDatos = {
                    $set: {
                        Cantidad: cant
                    }
                };
    
                const resultado = await carCollection.updateOne(filtro, nuevosDatos);
    
                return res.status(200).send({ status: "Update Correct", message: "Producto actualizado" });
            }
        } else {
            return res.status(400).send({ status: "Error Cant", message: "Puedes pedir hasta un maximo de 10 productos" });
        }

    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

async function carData(req, res) {
    if (req.headers.cookie) {
        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4)
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)

        const db = await conectarConMongoDB();
        const carCollection = db.collection('carrito');

        const carData = await carCollection.find({ Correo: decodificada.user }).toArray();

        return res.status(200).send({
            status: "Data Car",
            message: "Datos del carrito obtenidos correctamente",
            data: carData,
        });
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

async function addCar(req, res) {
    if (req.headers.cookie) {
        const name = req.body.Name;
        const cant = req.body.Cant;
        const email = req.body.Correo;

        const db = await conectarConMongoDB();
        const carCollection = db.collection('carrito');

        const revisarCar = await carCollection.findOne({
            Nombre: name.toLowerCase(),
            Correo: email
        });

        if (revisarCar) {
            return res.status(400).send({ status: "Error Add Car", message: `Este producto '${name}' ya esta en el carrito, revisalo` });
        }

        const newCar = {
            Nombre: name.toLowerCase(),
            Cantidad: cant,
            Correo: email
        }

        const result = await carCollection.insertOne(newCar)

        return res.status(200).send({ status: "Add Car", message: "Tu producto se ha guardado en el carrito" });

    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión bien" });
    }
}

export const method = {
    addCar,
    carData,
    updateCar,
    deleteCar
}