import Stripe from "stripe";
import dotenv from "dotenv";
import conectarConMongoDB from "../db/db.js"
import jsonwebtoken from "jsonwebtoken"

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createSession = async (req, res) => {
    const { products } = req.body;

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

    const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4)
    const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)

    const session = await stripe.checkout.sessions.create({
        line_items: [
            ...line_items,
            cargoManejo
        ],
        mode: 'payment',
        success_url: 'http://localhost:4000/user/delivery',
        cancel_url: 'http://localhost:4000/user/car',
        customer_email: decodificada.user
    });

    return res.json({ url: session.url });
};
