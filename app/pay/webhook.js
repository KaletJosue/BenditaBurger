import Stripe from 'stripe';
import conectarConMongoDB from "../db/db.js"
import { sendWhatsAppMessage } from '../services/whatsapp.js';
import { getSocket } from "../socket/socket.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handleStripeWebhook = async (req, res) => {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const sig = req.headers['stripe-signature'];
    const rawBody = req.body;

    let event;

    try {
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err) {
        console.error('❌ Error verificando el webhook:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const io = getSocket();

        const session = event.data.object;

        const customerEmail = session.customer_details?.email;
        const amountTotal = session.amount_total / 100;
        const paymentIntentId = session.payment_intent;
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        const paymentMethod = paymentIntent.payment_method_types[0];

        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
            expand: ['data.price.product'],
        });

        const products = lineItems.data.map(item => ({
            name: item.description,
            quantity: item.quantity,
            price: item.amount_total / 100
        }));

        const now = new Date();
        const formatNumber = (n) => String(n).padStart(2, '0');
        const fecha = `${formatNumber(now.getDate())} / ${formatNumber(now.getMonth() + 1)} / ${String(now.getFullYear()).slice(-2)}`;
        const hora = `${formatNumber(now.getHours())} : ${formatNumber(now.getMinutes())}`;

        const db = await conectarConMongoDB();
        const ordersCollection = db.collection('ventas');
        const usersCollection = db.collection('usuarios');

        const revisarUsuario = await usersCollection.findOne({ Correo: customerEmail })

        var direccion = revisarUsuario.Direccion
        var barrio = revisarUsuario.Barrio
        var nombre = revisarUsuario.Nombre
        var foto = revisarUsuario.Foto ? revisarUsuario.Foto : '';
        var numero = revisarUsuario.Telefono
        var descripcion = revisarUsuario.Descripcion

        const newOrder = {
            Correo: customerEmail,
            Nombre: nombre,
            Foto: foto,
            Direccion: direccion,
            Barrio: barrio,
            Telefono: numero,
            Estado: "Preparacion",
            Total: amountTotal,
            MetodoPago: paymentMethod,
            Productos: products,
            Fecha: fecha,
            Hora: hora,
            Descripcion: descripcion
        };

        const mensaje =
            `✅ Hey *¡Compra completada!,* se acepto tu pedido en Bendita Burger y ya esta en preparación.

Gracias por tu compra *BenditaLover*:

  💰Total pagado: *$${parseInt(amountTotal).toLocaleString('de-DE')}*
  💳Método de pago: *${paymentMethod}*
  👨‍🍳Estado del pedido: *En Preparacion*
  ✋Nombre: *${nombre}*

Esta pendiente a las actualizaciones en la aplicacion de Bendita Burger`;

        const carCollection = db.collection('carrito')

        const numeroCliente = `57${revisarUsuario.Telefono}`;

        products.forEach(async (p) => {
            const resultado = await carCollection.deleteOne({
                Nombre: (p.name).toLowerCase(),
                Correo: customerEmail
            });
        })

        await ordersCollection.insertOne(newOrder);

        io.to("administradores").emit("notificacion-nuevo-pedido", {
            customerEmail,
            nombre,
            amountTotal
        });

        io.to("cajeros").emit("notificacion-nuevo-pedido", {
            customerEmail,
            nombre,
            amountTotal
        });

        io.to("superadministradores").emit("notificacion-nuevo-pedido", {
            customerEmail,
            nombre,
            amountTotal
        });

        await sendWhatsAppMessage(numeroCliente, mensaje);

    } else {
        console.log(`🔔 Evento recibido: ${event.type}`);
    }

    res.status(200).send();
};

export default handleStripeWebhook;
