import nodemailer from 'nodemailer'
import dotenv from "dotenv"
import conectarConMongoDB from "../db/db.js"

dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    }
})

export async function sendEmail(direccion, codigo) {
    transporter.sendMail({
        from: "Bendita Burger <benditaburger54@gmail.com>",
        to: direccion,
        subject: "Verifica tu correo electronico registrado en Bendita Burger",
        html: crearMailVerification(direccion, codigo),
    })

    const db = await conectarConMongoDB()
    const usuariosCollection = db.collection('usuarios')

    const filtro = { Correo: direccion };
    const nuevosDatos = { $set: { Codigo: codigo } };

    const resultado = await usuariosCollection.updateOne(filtro, nuevosDatos);
}

function crearMailVerification(direccion, codigo) {
    const codigoStr = codigo.toString();

    return `
    <!DOCTYPE html>
        <html lang="es">
        <body style="padding: 0; margin: 0; font-family: 'Montserrat', sans-serif;">

            <img src="https://firebasestorage.googleapis.com/v0/b/peerflow-50fee.appspot.com/o/logoAmarillo.png?alt=media&token=acac9e9d-329b-4c35-b8c0-8451cd0087ab" alt="" style="aspect-ratio: 1/1; width: 70px; border-radius: 20px;">
            <h1 style="font-size: 20px; font-weight: 900; margin-top: 1rem; color: black;">Hola BenditaLover</h1>
            <p style="font-size: 13px; font-weight: 600; color: black;">Necesitamos verificar tu cuenta ${direccion} registrada en Bendita Burger</p>
            <h3 style="font-size: 12px; font-weight: 400; color: black;">Si no te registraste ignora este mensaje (no responder)</h3>

            <h2 style="font-size: 13px; font-weight: 400; margin-top: 2rem; margin-bottom: .5rem; color: black;">Código de Verificación:</h2>
        
            <div style="display: flex; align-items: center; justify-content: center; background-color: #ffeb00; border-radius: 10px; padding: .5rem 1rem; gap: .5rem; width: 230px;">
                <p style="font-size: 13px; font-weight: 800; padding: .7rem; background-color: white; border-radius: 10px; color: black;">${codigoStr[0]}</p>
                <p style="font-size: 13px; font-weight: 800; padding: .7rem; margin-left: .5rem; background-color: white; border-radius: 10px; color: black;">${codigoStr[1]}</p>
                <p style="font-size: 13px; font-weight: 800; padding: .7rem; margin-left: .5rem; background-color: white; border-radius: 10px; color: black;">${codigoStr[2]}</p>
                <p style="font-size: 13px; font-weight: 800; padding: .7rem; margin-left: .5rem; background-color: white; border-radius: 10px; color: black;">${codigoStr[3]}</p>
                <p style="font-size: 13px; font-weight: 800; padding: .7rem; margin-left: .5rem; background-color: white; border-radius: 10px; color: black;">${codigoStr[4]}</p>
                <p style="font-size: 13px; font-weight: 800; padding: .7rem; margin-left: .5rem; background-color: white; border-radius: 10px; color: black;">${codigoStr[5]}</p>
            </div>

            <a href="http://localhost:4000/verified" style="font-size: 13px; font-weight: 600; color: black; margin-top: 1rem; display: flex">Ir a Bendita Burger</a>

        </body>
    </html>`;
}
