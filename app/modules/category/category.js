import dotenv from "dotenv"
import conectarConMongoDB from "../../db/db.js"

dotenv.config()

async function addCategory(req, res) {
    if (req.headers.cookie) {
        const name = req.body.Name;
        const priority = req.body.Priority;
        const fecha = req.body.Fecha;

        const db = await conectarConMongoDB();
        const categoryCollection = db.collection('categorias');

        const revisarCategoria = await categoryCollection.findOne({ Nombre: name.toLowerCase() });
        const revisarPrioridad = await categoryCollection.findOne({ Prioridad: priority });

        if (revisarPrioridad) {
            return res.status(400).send({ status: "Priority Exist", message: "Esta prioridad ya esta en uso, prueba con otra" });
        } else {
            if (revisarCategoria) {
                return res.status(400).send({ status: "Category Exist", message: "Esta categoria ya existe, prueba con otra" });
            } else {
                const newCategory = {
                    Nombre: name.toLowerCase(),
                    Prioridad: priority,
                    Fecha: fecha,
                }

                const result = await categoryCollection.insertOne(newCategory)

                return res.status(200).send({ status: "Add Category Correct", message: "Categoria agregada" });
            }
        }

    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión bien" });
    }
}

async function categoryData(req, res) {
    if (req.headers.cookie) {
        const db = await conectarConMongoDB();
        const categoryCollection = db.collection('categorias');

        const categoryData = await categoryCollection.find({}).toArray();

        return res.status(200).send({
            status: "Data Category",
            message: "Datos de los gastos obtenidos correctamente",
            data: categoryData,
        });
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

async function updateCategory(req, res) {
    if (req.headers.cookie) {
        const name = req.body.Name
        const priority = req.body.Priority
        const fecha = req.body.Fecha
        const nameRefe = req.body.NameRefe
        const priorityRefe = req.body.PriorityRefe

        const db = await conectarConMongoDB();
        const categoryCollection = db.collection('categorias');

        const revisarCategoria = await categoryCollection.findOne({ Nombre: name.toLowerCase() });
        const revisarPrioridad = await categoryCollection.findOne({ Prioridad: priority });

        if (revisarPrioridad) {
            if (revisarPrioridad.Prioridad != priorityRefe) {
                return res.status(400).send({ status: "Priority Exist", message: "Esta prioridad ya esta en uso, prueba con otra" });
            }
        }

        if (revisarCategoria) {
            if (revisarCategoria.Nombre != nameRefe) {
                return res.status(400).send({ status: "Category Exist", message: "Esta categoria ya esta en uso, prueba con otra" });
            }
        }

        const filtro = {
            Nombre: nameRefe,
            Prioridad: priorityRefe
        };
        const nuevosDatos = {
            $set: {
                Nombre: name.toLowerCase(),
                Prioridad: priority,
                Fecha: fecha,
            }
        };

        const resultado = await categoryCollection.updateOne(filtro, nuevosDatos);

        return res.status(200).send({ status: "Update Correct", message: "Categoria actualizada" });

    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

async function deleteCategory(req, res) {
    if (req.headers.cookie) {
        const name = req.body.Name
        const priority = req.body.Priority
        const fecha = req.body.Fecha

        const db = await conectarConMongoDB()
        const categoryCollection = db.collection('categorias')
        const productsCollection = db.collection('productos')

        const resultado = await categoryCollection.deleteOne({
            Nombre: name.toLowerCase(),
            Prioridad: priority,
            Fecha: fecha
        });

        const resultado2 = await productsCollection.deleteMany({
            Categoria: name.toLowerCase(),
        });

        return res.status(200).send({ status: "Product Delete", message: "Producto Eliminado correctamente" })
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

export const method = {
    addCategory,
    categoryData,
    updateCategory,
    deleteCategory
}