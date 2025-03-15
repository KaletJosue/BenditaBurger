import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv"
import conectarConMongoDB from "../db/db.js"

dotenv.config()

async function soloAdmin(req, res, next) {
    if (req.headers.cookie) {
        const logueado = revisarCookie(req)

        if (logueado) {
            const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4)
            const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)

            const db = await conectarConMongoDB()
            const usuariosCollection = db.collection('usuarios')

            const revisarUsuario = await usuariosCollection.findOne({ Correo: decodificada.user })

            if (logueado && revisarUsuario.Rol == "Administrador") {
                return next()
            } else {
                return res.status(200).send({ status: "Rol Incorrect", message: "No tienes acceso a este apartado" });
            }
        } else {
            return res.status(200).send({ status: "Login Incorrect", message: "No iniciaste sesion de manera correcta" });
        }

    } else {
        return res.status(200).send({ status: "Login Incorrect", message: "No iniciaste sesion de manera correcta" });
    }
}

async function userToken(req, res, next) {
    if (req.headers.cookie) {
        const logueado = revisarCookie(req)

        if (logueado) {
            const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4)
            const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)

            const db = await conectarConMongoDB()
            const usuariosCollection = db.collection('usuarios')

            const revisarUsuario = await usuariosCollection.findOne({ Correo: decodificada.user })

            if (logueado && revisarUsuario.Rol == "Administrador") {
                return res.redirect('/admin')
            } else if (logueado && revisarUsuario.Rol == "Cajero") {
                return res.redirect('/checker')
            } else if (logueado && revisarUsuario.Rol == "Usuario") {
                return res.redirect('/user')
            } else {
                return next()
            }
        } {
            return next()
        }
    } else {
        return next()
    }
}

async function revisarVerified(req, res, next) {
    if (req.headers.cookie) {
        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4)
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)

        const db = await conectarConMongoDB()
        const usuariosCollection = db.collection('usuarios')

        const revisarUsuario = await usuariosCollection.findOne({ Correo: decodificada.user })

        if (revisarUsuario.Verificado === true) {
            return next()
        } else {
            return res.status(200).send({ status: "Email no Verified", message: "No has verificado tu correo electronico revisalo (no olvides revisar en spam)" });
        }
    } else {
        return res.status(200).send({ status: "Login Incorrect", message: "No iniciaste sesion de manera correcta", redirect: '/signIn' });
    }
}

async function revisarCookie(req) {
    if (req.headers.cookie) {
        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4)
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)
    
        const db = await conectarConMongoDB()
        const usuariosCollection = db.collection('usuarios')
    
        const revisarUsuario = await usuariosCollection.findOne({ Correo: decodificada.user })
    
        if (!revisarUsuario) {
            return false
        }
        return revisarUsuario
    } else {
        return res.status(200).send({ status: "Login Incorrect", message: "No iniciaste sesion de manera correcta", redirect: '/signIn' });
    }
}

export const method = {
    soloAdmin,
    userToken,
    revisarVerified
}