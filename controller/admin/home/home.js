import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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

onAuthStateChanged(auth, (user) => {
    if (user) {

        var name = document.querySelector('.name')
        var correo = document.querySelector('.correo')
        var profile = document.querySelector('.profile')

        var close = document.querySelector('.close')

        const user = auth.currentUser;
        if (user !== null) {
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;

            name.textContent = displayName
            correo.textContent = email
            profile.src = photoURL

            alert(photoURL)

            close.addEventListener('click', () => {
                signOut(auth).then(() => {
                    location.href = "/index.html"
                  }).catch((error) => {
                    // An error happened.
                  });
            })
        }

    } else {
        alert('Inicia Sesion bien perro')
    }
});