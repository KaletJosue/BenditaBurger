import dotenv from "dotenv"
import conectarConMongoDB from "../../db/db.js"

dotenv.config()

async function favoriteData(req, res) {
    if (req.headers.cookie) {
        const db = await conectarConMongoDB();
        const favoriteCollection = db.collection('favoritos');

        const favoriteData = await favoriteCollection.find({}).toArray();

        return res.status(200).send({
            status: "Data Favorite",
            message: "Datos de los productos favoritos obtenidos correctamente",
            data: favoriteData,
        });
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

async function addFavorite(req, res) {
    if (req.headers.cookie) {
        const name = req.body.Name;
        const email = req.body.Correo;

        const db = await conectarConMongoDB();
        const favoriteCollection = db.collection('favoritos');

        const newFavorite = {
            Nombre: name,
            Correo: email,
        }

        const result = await favoriteCollection.insertOne(newFavorite)

        return res.status(200).send({ status: "Add Favorite Correct", message: "Tu favorito se ha guardado" });

    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión bien" });
    }
}

async function deleteFavorite(req, res) {
    if (req.headers.cookie) {
        const name = req.body.Name

        const db = await conectarConMongoDB()
        const favoriteCollection = db.collection('favoritos')

        const resultado = await favoriteCollection.deleteOne({
            Nombre: name.toLowerCase(),
        });

        return res.status(200).send({ status: "Favorite Delete", message: "Producto Eliminado correctamente" })
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

export const method = {
    favoriteData,
    addFavorite,
    deleteFavorite
}