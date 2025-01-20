import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
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

var loader = document.querySelector('.loader')

onAuthStateChanged(auth, (user) => {
    if (user) {

        var sidebar = document.querySelector('.sidebar')
        var btnSidebar = document.querySelector('.sidebar .topSidebar .user img')

        sidebar.classList.add('active')

        btnSidebar.addEventListener('click', () => {
            sidebar.classList.toggle('active')
        })

        var btnOptions2 = document.querySelector('.btnOptions2')
        var btnOptions = document.querySelector('.btnOptions')

        var optionsFinanzas = document.querySelector('.sidebar .centerSidebar ul li:nth-child(4)')
        var optionsMenu = document.querySelector('.sidebar .centerSidebar ul li:nth-child(3)')

        var optionsMenu2 = document.querySelector('.optionsMenu2')
        var optionsFinanzas2 = document.querySelector('.optionsFinanzas2')

        btnOptions2.addEventListener('click', () => {
            optionsFinanzas.classList.toggle('active')
            optionsMenu.classList.remove('active')
            if (optionsFinanzas.classList == "active") {
                optionsFinanzas2.classList.add('active')
                optionsMenu2.classList.remove('active')
            } else {
                optionsFinanzas2.classList.remove('active')
            }
        })

        btnOptions.addEventListener('click', () => {
            optionsMenu.classList.toggle('active')
            optionsFinanzas.classList.remove('active')
            if (optionsMenu.classList == "active") {
                optionsMenu2.classList.add('active')
                optionsFinanzas2.classList.remove('active')
            } else {
                optionsMenu2.classList.remove('active')
            }
        })

        var palanca = document.querySelector('.switch')
        var body = document.querySelector('body')

        palanca.addEventListener('click', () => {
            palanca.classList.toggle('active')
            body.classList.toggle('darkMode')
        })

        var name = document.querySelector('.name')
        var correo = document.querySelector('.correo')
        var profile = document.querySelector('.profile')

        var close = document.querySelector('.close')

        getDocs(query(collection(db, "Users", "IdUser", "Private_Data"), where("Id", "==", user.uid)))
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    name.textContent = doc.data().Nombre
                    correo.textContent = doc.data().Rol

                    if (doc.data().URL == "") {
                        profile.src = "/assets/profile-5.jpg"
                    } else {
                        profile.src = doc.data().URL
                    }
                })
            })
            .then(() => {
                loader.classList.add('active')
            })
            .catch((error) => {
                console.error("Error al obtener los datos del usuario:", error);
                loader.classList.add('active')
            });

        close.addEventListener('click', () => {
            signOut(auth).then(() => {
                location.href = "/index.html";
            }).catch((error) => {
                console.error("Error al cerrar sesión:", error);
            });
        });

    } else {
        loader.classList.add('active')
        var modal = document.querySelector('.modal')
        var tryAgain = document.querySelector('.tryAgain')

        modal.classList.add('active')
        tryAgain.addEventListener('click', () => {
            location.href = "/views/login/login.html"
        })
    }
});

