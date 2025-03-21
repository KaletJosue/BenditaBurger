import dotenv from "dotenv"
import conectarConMongoDB from "../../db/db.js"

dotenv.config()

async function deleteInventory(req, res) {
    if (req.headers.cookie) {

        const nombre = req.body.Nombre
        const foto = req.body.Foto

        const db = await conectarConMongoDB()
        const inventoryCollection = db.collection('inventario')

        const resultado = await inventoryCollection.deleteOne({
            Nombre: nombre,
            Foto: foto
        });

        return res.status(200).send({ status: "Product Delete", message: "Producto Eliminado correctamente" })

    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesion bien" })
    }
}

async function addInventory(req, res) {
    if (req.headers.cookie) {
        const name = req.body.Name;
        const category = req.body.Category;
        const stock = req.body.Stock;
        const price = req.body.Price;
        const fecha = req.body.Fecha;

        const db = await conectarConMongoDB();
        const inventoryCollection = db.collection('inventario');

        const revisarUsuario = await inventoryCollection.findOne({ Nombre: name });

        let imageUrl;
        if (req.file) {
            imageUrl = req.file.path;
        }

        if (revisarUsuario) {
            return res.status(400).send({ status: "Error Product", message: "Este producto ya esta agregado" });
        } else {

            const newInventory = {
                Nombre: name,
                Categoria: category,
                Stock: stock,
                Precio: price,
                Fecha: fecha,
                Foto: imageUrl,
            }

            const result = await inventoryCollection.insertOne(newInventory)

            return res.status(200).send({ status: "Update correct", message: "Tus datos ya han sido actualizados" });

        }

    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión bien" });
    }
}

async function inventoryData(req, res) {
    if (req.headers.cookie) {
        const db = await conectarConMongoDB();
        const inventarioCollection = db.collection('inventario');

        const inventarioData = await inventarioCollection.find({}).toArray();

        return res.status(200).send({
            status: "Data Inventory",
            message: "Datos del inventario obtenidos correctamente",
            data: inventarioData,
        });
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

async function updateInventory(req, res) {
    if (req.headers.cookie) {
        const name = req.body.Nombre;
        const category = req.body.Categoria;
        const stock = req.body.Stock;
        const price = req.body.Precio;
        const fecha = req.body.Fecha

        const nameRefe = req.body.NombreReferencia;

        const db = await conectarConMongoDB();
        const inventarioCollection = db.collection('inventario');

        const revisarProducto = await inventarioCollection.findOne({ Nombre: name });

        if (revisarProducto) {
            if (revisarProducto.Nombre == nameRefe) {
                const filtro = {
                    Nombre: nameRefe
                };
                const nuevosDatos = {
                    $set: {
                        Nombre: name,
                        Categoria: category,
                        Stock: stock,
                        Precio: price,
                        Fecha: fecha
                    }
                };

                const resultado = await inventarioCollection.updateOne(filtro, nuevosDatos);

                return res.status(200).send({ status: "Update correct", message: "Tus datos ya han sido actualizados" });
            } else {
                return res.status(400).send({ status: "Error Name", message: `Este nombre ya esta en uso (${revisarProducto.Nombre})` });
            }
        } else {
            const filtro = {
                Nombre: nameRefe
            };
            const nuevosDatos = {
                $set: {
                    Nombre: name,
                    Categoria: category,
                    Stock: stock,
                    Precio: price
                }
            };

            const resultado = await inventarioCollection.updateOne(filtro, nuevosDatos);

            return res.status(200).send({ status: "Update correct", message: "Tus datos ya han sido actualizados" });
        }
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión bien" });
    }
}

export const method = {
    addInventory,
    deleteInventory,
    inventoryData,
    updateInventory
}