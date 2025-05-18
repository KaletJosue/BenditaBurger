import Stripe from "stripe";
import dotenv from "dotenv";
import conectarConMongoDB from "../db/db.js";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createSession = async (req, res) => {
    try {
        const { products } = req.body;

        const cookieJWT = req.headers.cookie
            ?.split("; ")
            ?.find(cookie => cookie.startsWith("jwt="))
            ?.slice(4);

        if (!cookieJWT) {
            return res.status(401).json({ error: "No autorizado: token faltante" });
        }

        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
        const correoUsuario = decodificada.user;

        const db = await conectarConMongoDB();
        const ventas = db.collection("ventas");

        const ahora = new Date();
        const formatNumber = (n) => String(n).padStart(2, "0");
        const fecha = `${formatNumber(ahora.getDate())} / ${formatNumber(ahora.getMonth() + 1)} / ${String(ahora.getFullYear()).slice(-2)}`;
        const hora = `${formatNumber(ahora.getHours())} : ${formatNumber(ahora.getMinutes())}`;

        const pedidoRepetido = await ventas.findOne({
            Correo: correoUsuario,
            Fecha: fecha,
            Hora: hora
        });

        if (pedidoRepetido) {
            return res.status(429).json({ error: "Ya realizaste un pedido en el último minuto. Espera un momento antes de intentar de nuevo." });
        }

        let subtotal = 0;

        const line_items = products.map(product => {
            const unitAmount = parseInt(product.precio) * 100;
            subtotal += unitAmount * parseInt(product.cantidad);
            return {
                price_data: {
                    product_data: {
                        name: product.nombre,
                        description: product.descripcion,
                        images: [product.foto],
                    },
                    currency: 'cop',
                    unit_amount: unitAmount,
                },
                quantity: parseInt(product.cantidad),
            };
        });

        const costoEnvio = 500000;
        subtotal += costoEnvio;

        const netoDeseado = subtotal;
        const brutoRequerido = Math.round((netoDeseado + 900) / (1 - 0.0399));
        const extraTotal = brutoRequerido - netoDeseado;

        const totalAdicional = costoEnvio + extraTotal;

        const cargoManejo = {
            price_data: {
                product_data: {
                    name: 'Manejo, Logistica y Envio',
                    description: 'Cobertura de costos operativos, procesamiento, entrega y envio seguro',
                    images: ['https://firebasestorage.googleapis.com/v0/b/oasiscol.appspot.com/o/logoAmarillo.png?alt=media&token=ef53c12b-64fe-4004-b4dd-a2840b2106fb']
                },
                currency: 'cop',
                unit_amount: totalAdicional,
            },
            quantity: 1
        };

        const session = await stripe.checkout.sessions.create({
            line_items: [
                ...line_items,
                cargoManejo
            ],
            mode: 'payment',
            success_url: 'http://localhost:4000/user/delivery',
            cancel_url: 'http://localhost:4000/user/car',
            customer_email: correoUsuario
        });

        return res.json({ url: session.url });

    } catch (error) {
        console.error("❌ Error al crear la sesión:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
