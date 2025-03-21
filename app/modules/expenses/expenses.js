import dotenv from "dotenv"
import conectarConMongoDB from "../../db/db.js"

dotenv.config()

async function addExpense(req, res) {
    if (req.headers.cookie) {
        const name = req.body.Name;
        const price = req.body.Price;
        const pay = req.body.Pay;
        const fecha = req.body.Fecha;

        const db = await conectarConMongoDB();
        const expenseCollection = db.collection('gastos');

        const newExpense = {
            Nombre: name,
            Precio: price,
            Pago: pay,
            Fecha: fecha,
        }

        const result = await expenseCollection.insertOne(newExpense)

        return res.status(200).send({ status: "Add Expense Correct", message: "Gasto actualizado" });

    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión bien" });
    }
}

async function expenseData(req, res) {
    if (req.headers.cookie) {
        const db = await conectarConMongoDB();
        const expenseCollection = db.collection('gastos');

        const expenseData = await expenseCollection.find({}).toArray();

        return res.status(200).send({
            status: "Data Expenses",
            message: "Datos de los gastos obtenidos correctamente",
            data: expenseData,
        });
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

async function updateExpense(req, res) {
    if (req.headers.cookie) {
        const name = req.body.Nombre;
        const price = req.body.Precio;
        const pay = req.body.Pago;

        const fechaRefe = req.body.FechaRefe
        const nameRefe = req.body.NombreRefe;
        const precioRefe = req.body.PrecioRefe
        const pagoRefe = req.body.PagoRefe;

        const db = await conectarConMongoDB();
        const expenseCollection = db.collection('gastos');

        const filtro = { 
            Nombre: nameRefe,
            Fecha: fechaRefe,
            Precio: precioRefe,
            Pago: pagoRefe
        };
        const nuevosDatos = {
            $set: {
                Nombre: name,
                Precio: price,
                Pago: pay,
            }
        };

        const resultado = await expenseCollection.updateOne(filtro, nuevosDatos);

        return res.status(200).send({ status: "Update Correct", message: "Gasto actualizado" });
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión bien" });
    }
}

export const method = {
    addExpense,
    expenseData,
    updateExpense
}