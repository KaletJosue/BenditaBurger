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

        getDocs(query(collection(db, "Users", "IdUser", "Private_Data"), where("Id", "==", user.uid))).
            then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    if (doc.data().Rol == "SuperAdministrador") {

                        const openModalUpdate = document.querySelector('.openModalUpdate');
                        const modalUpdate = document.querySelector('.modalUpdate');
                        const modalContentUpdate = document.querySelector('.conModalUpdate');
                        const closeModalUpdate = document.getElementById('closeModalUpdate')

                        var inputNameUpdate = document.querySelector('.inputNameUpdate')

                        var btnUpdate = document.querySelector('.btnUpdate')

                        inputNameUpdate.addEventListener('input', () => {
                            if (inputNameUpdate.value.length != 0) {
                                btnUpdate.classList.add('active')
                                btnUpdate.disabled = false
                            } else {
                                btnUpdate.classList.remove('active')
                                btnUpdate.disabled = true
                            }
                        })

                        openModalUpdate.addEventListener('click', () => {
                            modalUpdate.style.display = 'flex'

                            gsap.fromTo(modalContentUpdate,
                                { backdropFilter: 'blur(0px)', height: 0, opacity: 0 },
                                {
                                    height: 'auto',
                                    opacity: 1,
                                    backdropFilter: 'blur(90px)',
                                    duration: .7,
                                    ease: 'expo.out',
                                }
                            )
                            window.addEventListener('click', event => {
                                if (event.target == modalUpdate) {
                                    gsap.to(modalContentUpdate, {
                                        height: '0px',
                                        duration: .2,
                                        ease: 'power1.in',
                                        onComplete: () => {
                                            modalUpdate.style.display = 'none';
                                        }
                                    });
                                }
                            })
                            closeModalUpdate.addEventListener('click', () => {
                                gsap.to(modalContentUpdate, {
                                    height: '0px',
                                    duration: .2,
                                    ease: 'power1.in',
                                    onComplete: () => {
                                        modalUpdate.style.display = 'none';
                                    }
                                });
                            })
                        })

                        var btnEstatus = document.querySelector('.btnEstatus')

                        btnEstatus.addEventListener('click', () => {
                            btnEstatus.classList.toggle('active')
                        })

                        var body = document.querySelector('body');

                        var leerDarkMode = localStorage.getItem('darkMode');

                        if (leerDarkMode === 'active') {
                            body.classList.add('darkMode');
                        }

                        var close = document.querySelector('.close')

                        getDocs(query(collection(db, "Users", "IdUser", "Private_Data"), where("Id", "==", user.uid)))
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {

                                })
                            })
                            .then(() => {
                                loader.classList.add('active')
                            })
                            .catch((error) => {
                                console.error("Error al obtener los datos del usuario:", error);
                                loader.classList.add('active')
                            });

                    } else {

                        var modal = document.querySelector('.modal')
                        var textErrorModal = document.querySelector('.textErrorModal')
                        var tryAgain = document.querySelector('.tryAgain')

                        loader.classList.add('active')
                        modal.classList.add('active')
                        textErrorModal.textContent = "No tienes acceso a este apartado, inicia sesión"
                        tryAgain.addEventListener('click', () => {
                            location.href = "/views/login/login.html"
                        })

                    }

                })
            })

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

