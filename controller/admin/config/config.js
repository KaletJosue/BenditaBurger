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

                    if (doc.data().Rol == "Administrador" || doc.data().Rol == "SuperAdministrador") {

                        const openModalAdd = document.querySelector('.security');
                        const modalAdd = document.querySelector('.modalAdd');
                        const modalContentAdd = document.querySelector('.conModalAdd');
                        const closeModalAdd = document.querySelector('#closeModalAdd');
                        const cancelModalAdd = document.querySelector('.cancelModalAdd');

                        openModalAdd.addEventListener('click', () => {
                            modalAdd.style.display = 'flex';

                            gsap.fromTo(
                                modalContentAdd,
                                { backdropFilter: 'blur(0px)', height: 0, opacity: 0 },
                                {
                                    height: '100%',
                                    opacity: 1,
                                    backdropFilter: 'blur(90px)',
                                    duration: 0.7,
                                    ease: 'expo.out',
                                }
                            );

                            window.addEventListener('click', (event) => {
                                if (event.target === modalAdd) {
                                    gsap.to(modalContentAdd, {
                                        height: '0px',
                                        duration: 0.2,
                                        ease: 'power1.in',
                                        onComplete: () => {
                                            modalAdd.style.display = 'none';
                                        },
                                    });
                                }
                            });

                            closeModalAdd.addEventListener('click', () => {
                                gsap.to(modalContentAdd, {
                                    height: '0px',
                                    duration: 0.2,
                                    ease: 'power1.in',
                                    onComplete: () => {
                                        modalAdd.style.display = 'none';
                                    },
                                });
                            });

                            cancelModalAdd.addEventListener('click', () => {
                                gsap.to(modalContentAdd, {
                                    height: '0px',
                                    duration: 0.2,
                                    ease: 'power1.in',
                                    onComplete: () => {
                                        modalAdd.style.display = 'none';
                                        inputNameAdd.value = ''
                                        inputCategoryAdd.value = ''
                                        btnAdd.classList.remove('active')
                                        btnAdd.disabled = true
                                    },
                                });
                            })
                        });

                        var inputNameAdd = document.querySelector('.inputNameAdd');
                        var inputCategoryAdd = document.querySelector('.inputCategoryAdd');
                        var btnAdd = document.querySelector('.btnAdd');

                        inputNameAdd.addEventListener('input', () => {
                            if (inputNameAdd.value.length !== 0 && inputCategoryAdd.value.length !== 0) {
                                btnAdd.classList.add('active');
                                btnAdd.disabled = false;
                            } else {
                                btnAdd.classList.remove('active');
                                btnAdd.disabled = true;
                            }
                        });

                        inputCategoryAdd.addEventListener('input', () => {
                            if (inputNameAdd.value.length !== 0 && inputCategoryAdd.value.length !== 0) {
                                btnAdd.classList.add('active');
                                btnAdd.disabled = false;
                            } else {
                                btnAdd.classList.remove('active');
                                btnAdd.disabled = true;
                            }
                        });

                        const openModalUpdate = document.querySelector('.info');
                        const modalUpdate = document.querySelector('.modalUpdate');
                        const modalContentUpdate = document.querySelector('.conModalUpdate');
                        const closeModalUpdate = document.querySelectorAll('#closeModalUpdate')

                        openModalUpdate.addEventListener('click', () => {
                            modalUpdate.style.display = 'flex'

                            gsap.fromTo(modalContentUpdate,
                                { backdropFilter: 'blur(0px)', height: 0, opacity: 0 },
                                {
                                    height: '100%',
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
                            closeModalUpdate.forEach((closeModalUpdateBtn) => {
                                closeModalUpdateBtn.addEventListener('click', () => {
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
                        })

                        var inputNameUpdate = document.querySelector('.inputNameUpdate')
                        var inputCategoryUpdate = document.querySelector('.inputCategoryUpdate')

                        var btnUpdate = document.querySelector('.btnUpdate')

                        inputNameUpdate.addEventListener('input', () => {
                            if (inputNameUpdate.value.length != 0 && inputCategoryUpdate.value.length != 0) {
                                btnUpdate.classList.add('active')
                                btnUpdate.disabled = false
                            } else {
                                btnUpdate.classList.remove('active')
                                btnUpdate.disabled = true
                            }
                        })

                        inputCategoryUpdate.addEventListener('input', () => {
                            if (inputNameUpdate.value.length != 0 && inputCategoryUpdate.value.length != 0) {
                                btnUpdate.classList.add('active')
                                btnUpdate.disabled = false
                            } else {
                                btnUpdate.classList.remove('active')
                                btnUpdate.disabled = true
                            }
                        })

                        if (doc.data().Rol == "Administrador") {
                            var contUser = document.querySelector('.user')
                            var contSecurity = document.querySelector('.security')

                            contUser.style.display = "none"
                            contSecurity.style.borderRadius = "0 0 20px 20px"
                        } else if (doc.data().Rol == "SuperAdministrador") {
                            var btnUser = document.querySelector('.user')

                            btnUser.addEventListener('click', () => {
                                location.href = "/views/admin/users/users.html"
                            })
                        }

                        var leerDarkMode = localStorage.getItem('darkMode');
                        var body = document.querySelector('body');

                        if (leerDarkMode === 'active') {
                            body.classList.add('darkMode');
                        }

                        var name = document.querySelector('.name')
                        var correo = document.querySelector('.correo')
                        var profile = document.querySelector('.profile')

                        getDocs(query(collection(db, "Users", "IdUser", "Private_Data"), where("Id", "==", user.uid)))
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    name.textContent = doc.data().Nombre
                                    correo.textContent = doc.data().Correo

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

