import bcryptsjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv"
import conectarConMongoDB from "../db/db.js"
import { sendEmail } from "../services/mail.services.js"

dotenv.config()

async function signIn(req, res) {
    const email = req.body.Email
    const password = req.body.Password

    if (email) {
        if (password) {

            try {

                const db = await conectarConMongoDB()
                const usuariosCollection = db.collection('usuarios')

                const revisarUsuario = await usuariosCollection.findOne({ Correo: email })

                if (revisarUsuario) {

                    const passwordCorrect = await bcryptsjs.compare(password, revisarUsuario.Contraseña)

                    if (passwordCorrect) {

                        if (revisarUsuario.Verificado === true) {
                            const token = jsonwebtoken.sign(
                                { user: revisarUsuario.Correo },
                                process.env.JWT_SECRET,
                                { expiresIn: process.env.JWT_EXPIRATION }
                            )

                            const cookieOption = {
                                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                                path: "/"
                            }

                            if (revisarUsuario.Rol == "Administrador" || revisarUsuario.Rol == "SuperAdministrador") {
                                res.cookie('jwt', token, cookieOption)
                                res.status(200).send({ status: "Login Correct", message: "Tu usuario ha sido logueado", redirect: "/admin" });
                            } else if (revisarUsuario.Rol == "Cajero") {
                                res.cookie('jwt', token, cookieOption)
                                res.status(200).send({ status: "Login Correct", message: "Tu usuario ha sido logueado", redirect: "/checker" });
                            } else if (revisarUsuario.Rol == "Usuario") {
                                res.cookie('jwt', token, cookieOption)
                                res.status(200).send({ status: "Login Correct", message: "Tu usuario ha sido logueado", redirect: "/user" });
                            } else if (revisarUsuario.Rol == "") {
                                return res.status(400).send({ status: "Not Authorization", message: "Parece que no tienes acceso a Bendita Burger, comunicate a este numero (322 964 56 00)" });
                            }
                        } else {
                            return res.status(400).send({ status: "Error Verified", message: "No has verificado tu correo electronico revisalo (no olvides revisar en spam)" })
                        }

                    } else {
                        return res.status(400).send({ status: "Error Credentials", message: "Correo o contraseña incorrectos" })
                    }

                } else {
                    return res.status(400).send({ status: "Error Credentials", message: "Correo o contraseña incorrectos" });
                }

            } catch (error) {
                return res.status(500).send({ status: 'Error', message: `Tuvimos problemas, intenta iniciar sesion mas tarde` });
            }

        } else {
            return res.status(400).send({ status: "Error Name", message: "Debes ingresar tu Contraseña" })
        }
    } else {
        return res.status(400).send({ status: "Error Name", message: "Debes ingresar tu Correo Electronico" })
    }
}

async function verified(req, res) {
    const code = req.body.Code

    if (code) {
        if (code.length == 6) {

            const db = await conectarConMongoDB()
            const usuariosCollection = db.collection('usuarios')

            const revisarCodigo = await usuariosCollection.findOne({ Codigo: parseInt(code) })

            if (revisarCodigo) {

                const filtro = {
                    Correo: revisarCodigo.Correo,
                    Codigo: parseInt(code)
                };

                const nuevosDatos = {
                    $set: {
                        Codigo: 0,
                        Verificado: true
                    }
                };

                const resultado = await usuariosCollection.updateOne(filtro, nuevosDatos);

                res.status(200).send({ status: "Code Correct", message: "Excelente ya puedes iniciar sesion", redirect: "/signIn" });

            } else {
                return res.status(400).send({ status: "Error Code", message: "Este codigo de verificacion no existe" })
            }

        } else {
            return res.status(400).send({ status: "Error Code", message: "Debes ingresar el codigo de verificacion completo" })
        }
    } else {
        return res.status(400).send({ status: "Error Code", message: "Debes ingresar el codigo de verificacion" })
    }
}

async function deleteUser(req, res) {
    if (req.headers.cookie) {

        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4)
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)

        const db = await conectarConMongoDB()
        const usuariosCollection = db.collection('usuarios')

        const revisarUsuario = await usuariosCollection.findOne({ Correo: decodificada.user })

        const resultado = await usuariosCollection.deleteOne({Correo: revisarUsuario.Correo});

        return res.status(200).send({ status: "User Delete", message: "Tu usuario se ha eliminado correctamente", redirect: '/' })

    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesion bien" })
    }
}

async function signUp(req, res) {
    const name = req.body.Name
    const email = req.body.Email
    const password = req.body.Password

    if (email) {
        if (name) {
            if (password) {

                try {

                    const db = await conectarConMongoDB()
                    const usuariosCollection = db.collection('usuarios')

                    const revisarUsuario = await usuariosCollection.findOne({ Correo: email })

                    if (!revisarUsuario) {
                        const salt = await bcryptsjs.genSalt(5)
                        const hashPassword = await bcryptsjs.hash(password, salt)

                        const newUser = {
                            Nombre: name,
                            Correo: email,
                            Contraseña: hashPassword,
                            Direccion: "",
                            Telefono: "",
                            Rol: "Usuario",
                            Foto: "",
                            Verificado: false
                        }

                        function generarCodigoAleatorio() {
                            return Math.floor(100000 + Math.random() * 900000);
                        }

                        const result = await usuariosCollection.insertOne(newUser)

                        const mail = await sendEmail(email, generarCodigoAleatorio())

                        return res.status(201).send({ status: "Usar Create", message: "Tu usuario ha sido creado", redirect: "/verified" });
                    } else {
                        return res.status(400).send({ status: "Error User Exist", message: "Este usuario ya está en uso, intenta iniciar sesión" });
                    }

                } catch (error) {
                    return res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
                }

            } else {
                return res.status(400).send({ status: "Error Password", message: "Debes ingresar una Contraseña" })
            }
        } else {
            return res.status(400).send({ status: "Error Email", message: "Debes ingresar tu Nombre Completo" })
        }
    } else {
        return res.status(400).send({ status: "Error Name", message: "Debes ingresar tu Correo Electronico" })
    }
}

async function userRol(req, res) {
    if (req.headers.cookie) {
        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4)
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)

        const db = await conectarConMongoDB()
        const usuariosCollection = db.collection('usuarios')

        const revisarUsuario = await usuariosCollection.findOne({ Correo: decodificada.user })

        return res.status(200).send({
            status: "Data User",
            message: `Data de los usuarios`,
            data: {
                Rol: revisarUsuario.Rol,
                Nombre: revisarUsuario.Nombre,
                Email: revisarUsuario.Correo,
                Photo: revisarUsuario.Foto,
                Direccion: revisarUsuario.Direccion,
                Phone: revisarUsuario.Telefono,
            }
        })
    } else {
        return res.status(400).send({ status: "Error Login", message: "No has iniciado sesion bien" })
    }
}


export const method = {
    signIn,
    signUp,
    verified,
    userRol,
    deleteUser
}