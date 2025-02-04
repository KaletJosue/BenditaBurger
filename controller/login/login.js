import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, sendEmailVerification, signOut, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, where, query } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDo7CLdjeXnrFmGeCTb5kgVbtzmxK2i22g",
    authDomain: "bendita-burger.firebaseapp.com",
    projectId: "bendita-burger",
    storageBucket: "bendita-burger.firebasestorage.app",
    messagingSenderId: "205041913819",
    appId: "1:205041913819:web:ee1ecfd383d77ffa98a1fe",
    measurementId: "G-J68Z8T6DGV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app);

auth.languageCode = 'es'
const provider = new GoogleAuthProvider()

var loader = document.querySelector('.loader')
var btnGoogle = document.getElementById('btnGoogle')
var btnFacebook = document.getElementById('btnFacebook')

window.onload = function () {
    loader.classList.add('active')
}

var btnMoveContainers = document.querySelectorAll('.btnMoveContainers')
var containers = document.querySelectorAll('.container')

var title = document.querySelector('.title')

btnMoveContainers.forEach((move) => {
    move.addEventListener('click', () => {
        containers.forEach((container) => {
            container.classList.toggle('active')
            if (container.classList == "container active") {
                title.textContent = "Registrate | Bendita Burger"
            } else {
                title.textContent = "Iniciar Sesión | Bendita Burger"
            }
        })
    })
})

var eyePass = document.querySelector('#eyePass')
var eyePassRegister = document.querySelector('#eyePassRegister')

var inputContra = document.querySelector('#inputContra')
var inputContraRegis = document.querySelector('#inputContraRegis')

eyePass.addEventListener('click', () => {
    eyePass.classList.toggle('active')
    if (inputContra.type == "text") {
        inputContra.type = "password"
    } else {
        inputContra.type = "text"
    }
})

eyePassRegister.addEventListener('click', () => {
    eyePassRegister.classList.toggle('active')
    if (inputContraRegis.type == "text") {
        inputContraRegis.type = "password"
    } else {
        inputContraRegis.type = "text"
    }
})

btnGoogle.addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = auth.currentUser;

            if (user !== null) {
                getDocs(query(collection(db, "Users", "IdUser", "Private_Data"), where("Id", "==", user.uid))).
                    then((querySnapshot) => {
                        if (querySnapshot.empty) {

                            loader.classList.remove('active')

                            addDoc(collection(db, "Users", "IdUser", "Private_Data"), {
                                Correo: user.email,
                                Id: user.uid,
                                Nombre: user.displayName,
                                Telefono: '',
                                Direccion: '',
                                Rol: "Usuario",
                                URL: user.photoURL,
                            }).then(() => {
                                return getDocs(query(collection(db, "Users", "IdUser", "Private_Data"), where("Id", "==", user.uid)))
                            }).then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    if (doc.data().Rol == "Administrador" || doc.data().Rol == "SuperAdministrador") {
                                        location.href = "/views/admin/home/home.html"
                                    } else if (doc.data().Rol == "Cajero") {
                                        location.href = "/views/cajero/home/home.html"
                                    } else if (doc.data().Rol == "Usuario") {
                                        location.href = "/views/user/home/home.html"
                                    } else if (doc.data().Rol == "") {
                                        loader.classList.add('active')
                                        modal.classList.add('active')
                                        textErrorModal.textContent = "Parece que no tienes acceso, comunicate con el administrador de Bendita Burger"
                                        closeModal.addEventListener('click', () => {
                                            modal.classList.remove('active')
                                        })
                                        tryAgain.addEventListener('click', () => {
                                            modal.classList.remove('active')
                                        })
                                        window.addEventListener('click', event => {
                                            if (event.target == modal) {
                                                modal.classList.remove('active')
                                            }
                                        })
                                    }
                                })
                            })

                        } else {

                            loader.classList.remove('active')

                            querySnapshot.forEach((doc) => {
                                if (doc.data().Rol == "Administrador" || doc.data().Rol == "SuperAdministrador") {
                                    location.href = "/views/admin/home/home.html"
                                } else if (doc.data().Rol == "Cajero") {
                                    location.href = "/views/cajero/home/home.html"
                                } else if (doc.data().Rol == "Usuario") {
                                    location.href = "/views/user/home/home.html"
                                } else if (doc.data().Rol == "") {
                                    loader.classList.add('active')
                                    modal.classList.add('active')
                                    textErrorModal.textContent = "Parece que no tienes acceso, comunicate con el administrador de Bendita Burger"
                                    closeModal.addEventListener('click', () => {
                                        modal.classList.remove('active')
                                    })
                                    tryAgain.addEventListener('click', () => {
                                        modal.classList.remove('active')
                                    })
                                    window.addEventListener('click', event => {
                                        if (event.target == modal) {
                                            modal.classList.remove('active')
                                        }
                                    })
                                }
                            })
                        }
                    })
            }
        }).catch((error) => {
        });
})

var emailRegister = document.querySelector('.emailRegister')
var nameRegister = document.querySelector('.nameRegister')
var passwordRegister = document.querySelector('.passwordRegister')
var btnRegister = document.querySelector('#btnRegister')

var emailLogin = document.querySelector('.emailLogin')
var passwordEmail = document.querySelector('.passwordEmail')
var btnLogin = document.querySelector('#btnLogin')

var modal = document.querySelector('.modal')
var closeModal = document.querySelector('#closeModal')
var textErrorModal = document.querySelector('.textErrorModal')
var tryAgain = document.querySelector('.tryAgain')

var modal2 = document.querySelector('.modal2')
var closeModal2 = document.querySelector('#closeModal2')
var textErrorModal2 = document.querySelector('.textErrorModal2')
var tryAgain2 = document.querySelector('.tryAgain2')

btnLogin.addEventListener('click', () => {
    if (emailLogin.value.trim().length != 0) {
        if (passwordEmail.value.trim().length != 0) {

            signInWithEmailAndPassword(auth, emailLogin.value, passwordEmail.value).
                then((userCredential) => {

                    const user = userCredential.user

                    if (getAuth().currentUser.emailVerified) {

                        loader.classList.remove('active')

                        getDocs(query(collection(db, "Users", "IdUser", "Private_Data"), where("Id", "==", user.uid))).
                            then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {

                                    if (doc.data().Rol == "Administrador" || doc.data().Rol == "SuperAdministrador") {
                                        location.href = "/views/admin/home/home.html"
                                    } else if (doc.data().Rol == "Cajero") {
                                        location.href = "/views/cajero/home/home.html"
                                    } else if (doc.data().Rol == "Usuario") {
                                        location.href = "/views/user/home/home.html"
                                    } else if (doc.data().Rol == "") {
                                        loader.classList.add('active')
                                        modal.classList.add('active')
                                        textErrorModal.textContent = "Parece que no tienes acceso, comunicate con el administrador de Bendita Burger"
                                        closeModal.addEventListener('click', () => {
                                            modal.classList.remove('active')
                                        })
                                        tryAgain.addEventListener('click', () => {
                                            modal.classList.remove('active')
                                        })
                                        window.addEventListener('click', event => {
                                            if (event.target == modal) {
                                                modal.classList.remove('active')
                                            }
                                        })
                                    }

                                })
                            })

                    } else {
                        modal.classList.add('active')
                        textErrorModal.textContent = "No has verificado tu correo electronico, ve a tu Gmail"
                        closeModal.addEventListener('click', () => {
                            modal.classList.remove('active')
                        })
                        tryAgain.addEventListener('click', () => {
                            modal.classList.remove('active')
                        })
                        window.addEventListener('click', event => {
                            if (event.target == modal) {
                                modal.classList.remove('active')
                            }
                        })
                    }

                }).catch((error) => {
                    if (error.code === "auth/invalid-credential") {
                        modal.classList.add('active')
                        textErrorModal.textContent = "Correo o contraseña incorrectos, revisalos de nuevo"
                        closeModal.addEventListener('click', () => {
                            modal.classList.remove('active')
                        })
                        tryAgain.addEventListener('click', () => {
                            modal.classList.remove('active')
                        })
                        window.addEventListener('click', event => {
                            if (event.target == modal) {
                                modal.classList.remove('active')
                            }
                        })
                    } else if (error.code === "auth/invalid-email") {
                        modal.classList.add('active')
                        textErrorModal.textContent = "El correo que ingresaste no es valido, revisalo"
                        closeModal.addEventListener('click', () => {
                            modal.classList.remove('active')
                        })
                        tryAgain.addEventListener('click', () => {
                            modal.classList.remove('active')
                        })
                        window.addEventListener('click', event => {
                            if (event.target == modal) {
                                modal.classList.remove('active')
                            }
                        })
                    }
                })

        } else {
            modal.classList.add('active')
            textErrorModal.textContent = "Debes ingresar tu Contraseña"
            closeModal.addEventListener('click', () => {
                modal.classList.remove('active')
            })
            tryAgain.addEventListener('click', () => {
                modal.classList.remove('active')
            })
            window.addEventListener('click', event => {
                if (event.target == modal) {
                    modal.classList.remove('active')
                }
            })
        }
    } else {
        modal.classList.add('active')
        textErrorModal.textContent = "Debes ingresar tu Correo Electronico"
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active')
        })
        tryAgain.addEventListener('click', () => {
            modal.classList.remove('active')
        })
        window.addEventListener('click', event => {
            if (event.target == modal) {
                modal.classList.remove('active')
            }
        })
    }
})

btnRegister.addEventListener('click', () => {
    if (emailRegister.value.trim().length != 0) {
        if (nameRegister.value.trim().length != 0) {
            if (passwordRegister.value.trim().length != 0) {

                createUserWithEmailAndPassword(auth, emailRegister.value, passwordRegister.value)
                    .then((userCredential) => {
                        const user = userCredential.user;

                        sendEmailVerification(user)
                            .then(() => {
                                addDoc(collection(db, "Users", "IdUser", "Private_Data"), {
                                    Correo: emailRegister.value,
                                    Id: user.uid,
                                    Nombre: nameRegister.value,
                                    Telefono: '',
                                    Direccion: '',
                                    Rol: "Usuario",
                                    URL: '',
                                })
                            }).then(() => {
                                modal2.classList.add('active')
                                textErrorModal2.textContent = "Revisa tu Gmail, enviamos un mensaje para verificar tu correo (no olvides revisar en spam)"
                                closeModal2.addEventListener('click', () => {
                                    modal2.classList.remove('active')
                                    signOut(auth)
                                })
                                tryAgain2.addEventListener('click', () => {
                                    modal2.classList.remove('active')
                                    signOut(auth)
                                    window.open(`https://accounts.google.com/signin/v2/identifier?service=mail&Email=${emailRegister.value}`, '_blank')
                                })
                                window.addEventListener('click', event => {
                                    if (event.target == modal2) {
                                        signOut(auth)
                                        modal2.classList.remove('active')
                                    }
                                })
                            })
                    }).catch((error) => {

                        if (error.code === "auth/email-already-in-use") {
                            modal.classList.add('active')
                            textErrorModal.textContent = `El correo electronico (${emailRegister.value}) ya esta registrado, prueba iniciando sesión`
                            closeModal.addEventListener('click', () => {
                                modal.classList.remove('active')
                            })
                            tryAgain.addEventListener('click', () => {
                                modal.classList.remove('active')
                            })
                            window.addEventListener('click', event => {
                                if (event.target == modal) {
                                    modal.classList.remove('active')
                                }
                            })
                        } else if (error.code === "auth/invalid-email") {
                            modal.classList.add('active')
                            textErrorModal.textContent = `El correo electronico (${emailRegister.value}) no es valido`
                            closeModal.addEventListener('click', () => {
                                modal.classList.remove('active')
                            })
                            tryAgain.addEventListener('click', () => {
                                modal.classList.remove('active')
                            })
                            window.addEventListener('click', event => {
                                if (event.target == modal) {
                                    modal.classList.remove('active')
                                }
                            })
                        } else if (error.code === "auth/weak-password") {
                            modal.classList.add('active')
                            textErrorModal.textContent = `Tu contraseña es demasiado corta`
                            closeModal.addEventListener('click', () => {
                                modal.classList.remove('active')
                            })
                            tryAgain.addEventListener('click', () => {
                                modal.classList.remove('active')
                            })
                            window.addEventListener('click', event => {
                                if (event.target == modal) {
                                    modal.classList.remove('active')
                                }
                            })
                        }

                    })

            } else {
                modal.classList.add('active')
                textErrorModal.textContent = "Debes ingresar una contraseña, no se te vaya a olvidar"
                closeModal.addEventListener('click', () => {
                    modal.classList.remove('active')
                })
                tryAgain.addEventListener('click', () => {
                    modal.classList.remove('active')
                })
                window.addEventListener('click', event => {
                    if (event.target == modal) {
                        modal.classList.remove('active')
                    }
                })
            }
        } else {
            modal.classList.add('active')
            textErrorModal.textContent = "Debes ingresar tu Nombre Completo"
            closeModal.addEventListener('click', () => {
                modal.classList.remove('active')
            })
            tryAgain.addEventListener('click', () => {
                modal.classList.remove('active')
            })
            window.addEventListener('click', event => {
                if (event.target == modal) {
                    modal.classList.remove('active')
                }
            })
        }
    } else {
        modal.classList.add('active')
        textErrorModal.textContent = "Debes ingresar tu Correo Electronico"
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active')
        })
        tryAgain.addEventListener('click', () => {
            modal.classList.remove('active')
        })
        window.addEventListener('click', event => {
            if (event.target == modal) {
                modal.classList.remove('active')
            }
        })
    }
})

var rememberPassword = document.querySelector('.rememberPassword')
var closeRememberPassword = document.querySelector('#closeRemember')
var btnRemember = document.querySelector('.btnRemember')

btnRemember.addEventListener('click', () => {
    rememberPassword.classList.add('active')
    closeRememberPassword.addEventListener('click', () => {
        rememberPassword.classList.remove('active')
    })
    window.addEventListener('click', event => {
        if (event.target == rememberPassword) {
            rememberPassword.classList.remove('active')
        }
    })
})

var btnSendRemember = document.querySelector('.btnSendRemember')
var inputSendRemember = document.querySelector('.inputSendRemember')

btnSendRemember.addEventListener('click', () => {
    if (inputSendRemember.value.trim().length != 0) {

        sendPasswordResetEmail(auth, inputSendRemember.value)
            .then(() => {
                modal2.classList.add('active')
                rememberPassword.classList.remove('active')
                textErrorModal2.textContent = "Revisa tu Gmail, enviamos un mensaje para recuperar tu contraseña (no olvides revisar en spam)"
                closeModal2.addEventListener('click', () => {
                    modal2.classList.remove('active')
                })
                tryAgain2.addEventListener('click', () => {
                    modal2.classList.remove('active')
                    window.open(`https://accounts.google.com/signin/v2/identifier?service=mail&Email=${emailRegister.value}`, '_blank')
                })
                window.addEventListener('click', event => {
                    if (event.target == modal2) {
                        modal2.classList.remove('active')
                    }
                })
            })
            .catch((error) => {
                if (error.code === "auth/invalid-email") {
                    modal.classList.add('active')
                    textErrorModal.textContent = "Ingresa una direccion de correo electronico valida"
                    closeModal.addEventListener('click', () => {
                        modal.classList.remove('active')
                    })
                    tryAgain.addEventListener('click', () => {
                        modal.classList.remove('active')
                    })
                    window.addEventListener('click', event => {
                        if (event.target == modal) {
                            modal.classList.remove('active')
                        }
                    })
                }
            });

    } else {
        modal.classList.add('active')
        textErrorModal.textContent = "Debes ingresar tu Correo Electronico"
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active')
        })
        tryAgain.addEventListener('click', () => {
            modal.classList.remove('active')
        })
        window.addEventListener('click', event => {
            if (event.target == modal) {
                modal.classList.remove('active')
            }
        })
    }
})

