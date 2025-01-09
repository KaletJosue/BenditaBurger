import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider  } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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

auth.languageCode = 'es'
const provider = new GoogleAuthProvider()
const providerFacebook = new FacebookAuthProvider()

var loader = document.querySelector('.loader')
var btnGoogle = document.getElementById('btnGoogle')
var btnFacebook = document.getElementById('btnFacebook')

btnGoogle.addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            location.href = "/views/admin/home/home.html"
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
})

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