import dotenv from "dotenv"
import conectarConMongoDB from "../../db/db.js"
import jsonwebtoken from "jsonwebtoken"
import { sendWhatsAppMessage } from '../../services/whatsapp.js';
import { getSocket } from "../../socket/socket.js";

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

async function newOrderChecker(req, res) {
    if (req.headers.cookie) {
        const io = getSocket();

        const correo = req.body.Correo;
        const nombre = req.body.Nombre;
        const foto = req.body.Foto;
        const direccion = req.body.Direccion;
        const barrio = req.body.Barrio;
        const telefono = req.body.Telefono;
        const estado = req.body.Estado;
        const total = req.body.Total;
        const metodoPago = req.body.MetodoPago;
        const productos = req.body.Productos;
        const fecha = req.body.Fecha;
        const hora = req.body.Hora;
        const segundo = req.body.Segundo;
        const descripcion = req.body.Descripcion;
        const pago = req.body.Pago

        const db = await conectarConMongoDB();
        const ordersCollection = db.collection('ventas');

        const newOrder = {
            Correo: correo,
            Nombre: nombre,
            Foto: foto,
            Direccion: direccion,
            Barrio: barrio,
            Telefono: telefono,
            Estado: estado,
            Total: total,
            MetodoPago: metodoPago,
            Productos: productos,
            Fecha: fecha,
            Hora: hora,
            Segundo: segundo,
            Descripcion: descripcion,
            Pago: pago
        };

        io.to("administradores").emit("notificacion-nuevo-pedido", {
            correo,
            nombre,
            total
        });

        io.to("cajeros").emit("notificacion-nuevo-pedido", {
            correo,
            nombre,
            total
        });

        io.to("superadministradores").emit("notificacion-nuevo-pedido", {
            correo,
            nombre,
            total
        });

        await ordersCollection.insertOne(newOrder);
        return res.status(200).send({ status: "New Order correct", message: "Se ha agregado el nuevo pedido" });

    }
}

async function newOrder(req, res) {
    if (req.headers.cookie) {
        const io = getSocket();

        const products = req.body.products;
        const metodoPago = req.body.metodoPago;
        const correo = req.body.Correo;
        const monto = req.body.Monto;

        const db = await conectarConMongoDB();
        const ordersCollection = db.collection('ventas');
        const usersCollection = db.collection('usuarios');

        const revisarUsuario = await usersCollection.findOne({ Correo: correo })

        if (revisarUsuario) {
            const nombre = revisarUsuario.Nombre
            const foto = revisarUsuario.Foto
            const direccion = revisarUsuario.Direccion
            const barrio = revisarUsuario.Barrio
            const telefono = revisarUsuario.Telefono
            const descripcion = revisarUsuario.Descripcion

            const now = new Date();
            const formatNumber = (n) => String(n).padStart(2, '0');
            const fecha = `${formatNumber(now.getDate())} / ${formatNumber(now.getMonth() + 1)} / ${String(now.getFullYear()).slice(-2)}`;
            const hora = `${formatNumber(now.getHours())} : ${formatNumber(now.getMinutes())}`;

            const newOrder = {
                Correo: correo,
                Nombre: nombre,
                Foto: foto,
                Direccion: direccion,
                Barrio: barrio,
                Telefono: telefono,
                Estado: "Preparacion",
                Total: monto,
                MetodoPago: metodoPago,
                Productos: products,
                Fecha: fecha,
                Hora: hora,
                Descripcion: descripcion
            };

            const mensaje =
                `✅ Hey *¡Compra completada!,* se acepto tu pedido en Bendita Burger y ya esta en preparación.

Gracias por tu compra *BenditaLover*:

  💰Total pagado: *$${parseInt(monto).toLocaleString('de-DE')}*
  💳Método de pago: *${metodoPago}*
  👨‍🍳Estado del pedido: *En Preparacion*
  ✋Nombre: *${nombre}*

Esta pendiente a las actualizaciones en la aplicacion de Bendita Burger`;

            const carCollection = db.collection('carrito')

            const numeroCliente = `57${revisarUsuario.Telefono}`;

            products.forEach(async (p) => {
                const resultado = await carCollection.deleteOne({
                    Nombre: (p.name).toLowerCase(),
                    Correo: correo
                });
            })

            io.to("administradores").emit("notificacion-nuevo-pedido", {
                correo,
                nombre,
                monto
            });

            io.to("cajeros").emit("notificacion-nuevo-pedido", {
                correo,
                nombre,
                monto
            });

            io.to("superadministradores").emit("notificacion-nuevo-pedido", {
                correo,
                nombre,
                monto
            });

            await ordersCollection.insertOne(newOrder);
            await sendWhatsAppMessage(numeroCliente, mensaje);

            return res.status(200).send({ status: "New Order correct", message: "Se ha agregado el nuevo pedido" });
        } else {
            return res.status(400).send({ status: "Error Gmail", message: "Correo electronico no encontrado" });
        }
    }
}

async function updateStatus(req, res) {
    if (req.headers.cookie) {
        const io = getSocket();

        const correo = req.body.Correo;
        const direccion = req.body.Direccion;
        const barrio = req.body.Barrio;
        const estado = req.body.Estado;
        const total = req.body.Total;
        const metodoPago = req.body.MetodoPago;
        const productos = req.body.Productos;
        const fecha = req.body.Fecha;
        const hora = req.body.Hora;
        const nuevoEstado = req.body.NuevoEstado
        const motivo = req.body.Motivo ? req.body.Motivo : "";

        const db = await conectarConMongoDB();
        const orderCollection = db.collection('ventas');

        const usersCollection = db.collection('usuarios');
        const revisarUsuario = await usersCollection.findOne({ Correo: correo })

        const filtro = {
            Correo: correo,
            Direccion: direccion,
            Barrio: barrio,
            Estado: estado,
            Total: total,
            MetodoPago: metodoPago,
            Productos: productos,
            Fecha: fecha,
            Hora: hora,
        };
        const nuevosDatos = {
            $set: {
                Estado: nuevoEstado,
                Motivo: motivo
            }
        };

        const resultado = await orderCollection.updateOne(filtro, nuevosDatos);

        io.to(correo).emit("notificacion-estado-pedido", {
            correo,
            direccion,
            barrio,
            estado,
            total,
            metodoPago,
            productos,
            fecha,
            hora,
            nuevoEstado,
            nombre: revisarUsuario.Nombre
        });

        io.to("administradores").emit("notificacion-estado-pedido-staff", {
            correo,
            direccion,
            barrio,
            estado,
            total,
            metodoPago,
            productos,
            fecha,
            hora,
            nuevoEstado,
            nombre: revisarUsuario.Nombre
        });

        io.to("cajeros").emit("notificacion-estado-pedido-staff", {
            correo,
            direccion,
            barrio,
            estado,
            total,
            metodoPago,
            productos,
            fecha,
            hora,
            nuevoEstado,
            nombre: revisarUsuario.Nombre
        });

        io.to("superadministradores").emit("notificacion-estado-pedido-staff", {
            correo,
            direccion,
            barrio,
            estado,
            total,
            metodoPago,
            productos,
            fecha,
            hora,
            nuevoEstado,
            nombre: revisarUsuario.Nombre
        });

        var mensaje = ''

        if (nuevoEstado == "Enviado") {
            mensaje =
                `🛵 Hey *¡Se actualizo tu pedido!*
        
Uno de nuestros repartidores *ya salio* con tu pedido, espera nuevas actualizaciones en la aplicacion`;
        } else if (nuevoEstado == "Preparacion") {
            mensaje =
                `👨‍🍳 Hey *¡Se actualizo tu pedido!*
                    
Estamos *preparando y cocinando tu pedido*, sabemos que tienes hambre pero espera un poco, espera nuevas actualizaciones en la aplicacion`;
        } else if (nuevoEstado == "Cerca") {
            mensaje =
                `📍 Hey *¡Se actualizo tu pedido!*
                    
Estamos *muy cerca* de tu ubicacion, espera nuevas actualizaciones en la aplicacion`;
        } else if (nuevoEstado == "Cancelado") {
            mensaje =
                `❌ Hey *¡Se actualizo tu pedido!*
                    
Ooops lamentamos informarte que tu pedido *se cancelo*

*Motivo*: ${motivo}`;
        } else if (nuevoEstado == "Entregado") {
            mensaje =
                `✅ Hey *¡Ya entregamos tu pedidio!*
                    
Esperamos que sea de tu agrado y muy pronto vuelvas a realizar un pedido, *¡Disfrutalo!*`;
        }

        const numeroCliente = `57${revisarUsuario.Telefono}`;

        await sendWhatsAppMessage(numeroCliente, mensaje);

        return res.status(200).send({ status: "Update correct", message: "Tus datos ya han sido actualizados" });
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

async function updateOrderChecker(req, res) {
    if (req.headers.cookie) {
        const io = getSocket();

        const correo = req.body.Correo;
        const direccion = req.body.Direccion;
        const barrio = req.body.Barrio;
        const estado = "Preparacion";
        const nuevoEstado = "Entregado";
        const total = req.body.Total;
        const metodoPago = req.body.MetodoPago;
        const productos = req.body.Productos;
        const fecha = req.body.Fecha;
        const hora = req.body.Hora;
        const segundo = req.body.Segundo;
        const nuevoMetodoPago = req.body.NuevoMetodoPago;
        const pago = 'Pago';

        const db = await conectarConMongoDB();
        const orderCollection = db.collection('ventas');

        const filtro = {
            Correo: correo,
            Direccion: direccion,
            Barrio: barrio,
            Estado: estado,
            Total: total,
            MetodoPago: metodoPago,
            Productos: productos,
            Fecha: fecha,
            Hora: hora,
            Segundo: segundo,
        };
        const nuevosDatos = {
            $set: {
                Estado: nuevoEstado,
                MetodoPago: nuevoMetodoPago,
                Pago: pago
            }
        };

        const resultado = await orderCollection.updateOne(filtro, nuevosDatos);

        return res.status(200).send({ status: "Update correct", message: "Tus datos ya han sido actualizados" });
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

async function updateOrderProductsChecker(req, res) {
    if (req.headers.cookie) {
        const fecha = req.body.Fecha;
        const hora = req.body.Hora;
        const segundo = req.body.Segundo;
        const productos = req.body.Productos;
        const nuevosProductos = req.body.ProductosActualizados;
        const monto = req.body.Monto;

        const db = await conectarConMongoDB();
        const orderCollection = db.collection('ventas');

        const filtro = {
            Productos: productos,
            Fecha: fecha,
            Hora: hora,
            Segundo: segundo,
        };
        const nuevosDatos = {
            $set: {
                Productos: nuevosProductos,
                Total: parseInt(monto)
            }
        };

        const resultado = await orderCollection.updateOne(filtro, nuevosDatos);

        return res.status(200).send({ status: "Update correct", message: "Tus datos ya han sido actualizados" });
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesión correctamente" });
    }
}

export const method = {
    orderData,
    orderDataAdmin,
    updateStatus,
    newOrder,
    newOrderChecker,
    updateOrderChecker,
    updateOrderProductsChecker
}