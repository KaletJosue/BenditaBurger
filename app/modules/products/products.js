import dotenv from "dotenv"
import conectarConMongoDB from "../../db/db.js"

dotenv.config()

async function addProduct(req, res) {
    if (req.headers.cookie) {
        const name = req.body.Name;
        const category = req.body.Category;
        const price = req.body.Price;
        const discount = req.body.Discount;
        const description = req.body.Description;

        const db = await conectarConMongoDB();
        const productsCollection = db.collection('productos');
        const categoryCollection = db.collection('categorias');

        const revisarProduct = await productsCollection.findOne({ Nombre: name.toLowerCase() });
        const revisarCategory = await categoryCollection.findOne({ Nombre: (category).toLowerCase() });

        let imageUrl;
        if (req.file) {
            imageUrl = req.file.path;
        }

        if (description.length <= 200) {
            if (revisarCategory) {
                if (revisarProduct) {
                    return res.status(400).send({ status: "Error Product", message: "Este producto ya esta agregado" });
                } else {

                    const newProduct = {
                        Nombre: name.toLowerCase(),
                        Categoria: category,
                        Precio: price,
                        Descuento: discount || '',
                        Descripcion: description,
                        Estado: true,
                        Foto: imageUrl,
                    }

                    const result = await productsCollection.insertOne(newProduct)

                    return res.status(200).send({ status: "Add Correct", message: "Producto Agregado corretamente" });

                }
            } else {
                return res.status(400).send({ status: "Error Category", message: "Este categoria no existe" });
            }
        } else {
            return res.status(400).send({ status: "Error Description", message: "La descripcion es demasido larga, no puede superar los 200 caracteres" });
        }

    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión bien" });
    }
}

async function productData(req, res) {
    if (req.headers.cookie) {
        const db = await conectarConMongoDB();
        const productsCollection = db.collection('productos');

        const productsData = await productsCollection.find({}).toArray();

        return res.status(200).send({
            status: "Data Products",
            message: "Datos de los productos obtenidos correctamente",
            data: productsData,
        });
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

async function updateStatusProduct(req, res) {
    if (req.headers.cookie) {
        const name = req.body.Nombre
        const status = req.body.Status

        const db = await conectarConMongoDB();
        const productsCollection = db.collection('productos');

        const filtro = {
            Nombre: name,
        };
        const nuevosDatos = {
            $set: {
                Estado: status
            }
        };

        const resultado = await productsCollection.updateOne(filtro, nuevosDatos);

        return res.status(200).send({ status: "Update Correct", message: "Estatus actualizada" });
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

async function updateProduct(req, res) {
    if (req.headers.cookie) {
        const name = req.body.Name;
        const category = req.body.Category;
        const price = req.body.Price;
        const discount = req.body.Discount;
        const description = req.body.Description;
        const nameRefe = req.body.NameRefe

        const db = await conectarConMongoDB();
        const productsCollection = db.collection('productos');
        const categoryCollection = db.collection('categorias');

        const revisarProduct = await productsCollection.findOne({ Nombre: name.toLowerCase() });
        const revisarCategory = await categoryCollection.findOne({ Nombre: (category).toLowerCase() });

        if (description.length <= 200) {
            if (revisarCategory) {
                if (revisarProduct && revisarProduct.Nombre.toLowerCase() == nameRefe.toLowerCase()) {
                    const filtro = {
                        Nombre: nameRefe,
                    };
                    const newProduct = {
                        $set: {
                            Nombre: name.toLowerCase(),
                            Categoria: category,
                            Precio: price,
                            Descuento: discount || '',
                            Descripcion: description,
                        }
                    }
    
                    const resultado = await productsCollection.updateOne(filtro, newProduct);
    
                    return res.status(200).send({ status: "Update Correct", message: "Producto Actualizado corretamente" });
                } else {
    
                    return res.status(400).send({ status: "Error Product", message: "Este producto ya esta agregado" });
    
                }
            } else {
                return res.status(400).send({ status: "Error Category", message: "Este categoria no existe" });
            }
        } else {
            return res.status(400).send({ status: "Error Description", message: "La descripcion es demasido larga, no puede superar los 200 caracteres" });
        }

    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión bien" });
    }
}

async function deleteProduct(req, res) {
    if (req.headers.cookie) {
        const name = req.body.Nombre
        const category = req.body.Categoria
        const price = req.body.Precio
        const photo = req.body.Foto

        const db = await conectarConMongoDB()
        const productsCollection = db.collection('productos')

        const resultado = await productsCollection.deleteOne({
            Nombre: name.toLowerCase(),
            Categoria: category,
            Precio: price,
            Foto: photo
        });

        return res.status(200).send({ status: "Product Delete", message: "Producto Eliminado correctamente" })
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

export const method = {
    addProduct,
    productData,
    updateStatusProduct,
    updateProduct,
    deleteProduct
}