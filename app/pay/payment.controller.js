import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createSession = async (req, res) => {
    const { products } = req.body;

    const line_items = products.map(product => ({
        price_data: {
            product_data: {
                name: product.nombre,
                description: product.descripcion,
                images: [product.foto],
            },
            currency: 'cop',
            unit_amount: parseInt(product.precio) * 100,
        },
        quantity: parseInt(product.cantidad),
    }));

    const session = await stripe.checkout.sessions.create({
        line_items: [
            ...line_items,
            {
                price_data: {
                    product_data: {
                        name: 'Costo de envío',
                        description: 'Envío estándar',
                        images: ['https://firebasestorage.googleapis.com/v0/b/oasiscol.appspot.com/o/logoAmarillo.png?alt=media&token=ef53c12b-64fe-4004-b4dd-a2840b2106fb']
                    },
                    currency: 'cop',
                    unit_amount: 500000,
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: 'http://localhost:4000/user',
        cancel_url: 'http://localhost:4000/user/car'
    });

    return res.json({ url: session.url });
};
