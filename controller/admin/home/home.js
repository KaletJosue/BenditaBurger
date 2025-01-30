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

                    if (doc.data().Rol == "Administrador") {

                        const openModalDetails = document.querySelector('.openModal');
                        const modalDetails = document.querySelector('.modalDetalis');
                        const modalContentDetails = document.querySelector('.conModalDetails');
                        const closeModalDetails = document.getElementById('closeModalDetails')

                        openModalDetails.addEventListener('click', () => {
                            modalDetails.style.display = 'flex'

                            gsap.fromTo(modalContentDetails,
                                { scale: 0, opacity: 0, filter: 'blur(10px)', backdropFilter: 'blur(0px)', x: 0 },
                                {
                                    scale: 1,
                                    opacity: 1,
                                    backdropFilter: 'blur(100px)',
                                    filter: 'blur(0px)',
                                    duration: .3,
                                    ease: 'power1.in',
                                }
                            )
                        })
                        closeModalDetails.addEventListener('click', () => {
                            gsap.to(modalContentDetails, {
                                filter: 'blur(10px)',
                                opacity: 0,
                                x: 1000,
                                ease: 'power1.in',
                                onComplete: () => {
                                    modalDetails.style.display = 'none';
                                }
                            });
                        })
                        window.addEventListener('click', event => {
                            if (event.target == modalDetails) {
                                gsap.to(modalContentDetails, {
                                    filter: 'blur(10px)',
                                    opacity: 0,
                                    x: 1000,
                                    ease: 'power1.in',
                                    onComplete: () => {
                                        modalDetails.style.display = 'none';
                                    }
                                });
                            }
                        })

                        var menu = document.querySelector('.menu')
                        var conMenu = document.querySelector('.conMenu')

                        conMenu.addEventListener('click', () => {
                            menu.classList.toggle('active')
                            sidebar.classList.toggle('ocult')
                            if (menu.classList == "menu") {
                                optionsFinanzas2.classList.remove('active')
                                optionsMenu2.classList.remove('active')
                            }
                        })

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

                        var palanca = document.querySelector('.switch');
                        var body = document.querySelector('body');

                        var leerDarkMode = localStorage.getItem('darkMode');

                        if (leerDarkMode === 'active') {
                            body.classList.add('darkMode');
                            palanca.classList.add('active');
                        }

                        palanca.addEventListener('click', () => {
                            palanca.classList.toggle('active');
                            body.classList.toggle('darkMode');

                            if (body.classList.contains('darkMode')) {
                                localStorage.setItem('darkMode', 'active');
                            } else {
                                localStorage.setItem('darkMode', 'desactive');
                            }
                        });

                        var name = document.querySelector('.name')
                        var correo = document.querySelector('.correo')
                        var profile = document.querySelector('.profile')

                        var close = document.querySelector('.close')

                        getDocs(query(collection(db, "Users", "IdUser", "Private_Data"), where("Id", "==", user.uid)))
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    name.textContent = (doc.data().Nombre).split(" ").slice(0, 2).join(" ")
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
                                let circularProgress = document.querySelector('.circular-progress'),
                                    progressValue = document.querySelector('.progress-value'),
                                    circularProgress2 = document.querySelector('.circular-progress2'),
                                    progressValue2 = document.querySelector('.progress-value2'),
                                    circularProgress3 = document.querySelector('.circular-progress3'),
                                    progressValue3 = document.querySelector('.progress-value3')

                                let progressStartValue = 0,
                                    progressEndValue = 90,
                                    speed = 10,
                                    progressStartValue2 = 0,
                                    progressEndValue2 = 20,
                                    progressStartValue3 = 0,
                                    progressEndValue3 = 80

                                let progress3 = setInterval(() => {
                                    progressStartValue3++

                                    progressValue3.textContent = `${progressStartValue3}%`
                                    circularProgress3.style.background = `conic-gradient(#00be59 ${progressStartValue * 3.6}deg, var(--color-fondo) 0deg)`

                                    if (progressStartValue3 == progressEndValue3) {
                                        clearInterval(progress3)
                                    }
                                }, speed)

                                let progress2 = setInterval(() => {
                                    progressStartValue2++

                                    progressValue2.textContent = `${progressStartValue2}%`
                                    circularProgress2.style.background = `conic-gradient(#ff7777 ${progressStartValue * 3.6}deg, var(--color-fondo) 0deg)`

                                    if (progressStartValue2 == progressEndValue2) {
                                        clearInterval(progress2)
                                    }
                                }, speed)

                                let progress = setInterval(() => {
                                    progressStartValue++

                                    progressValue.textContent = `${progressStartValue}%`
                                    circularProgress.style.background = `conic-gradient(#7d2ae8 ${progressStartValue * 3.6}deg, var(--color-fondo) 0deg)`

                                    if (progressStartValue == progressEndValue) {
                                        clearInterval(progress)
                                    }
                                }, speed)
                            })
                            .catch((error) => {
                                console.error("Error al obtener los datos del usuario:", error);
                                loader.classList.add('active')
                            });

                        close.addEventListener('click', () => {
                            var modal2 = document.querySelector('.modal2')
                            var tryAgain2 = document.querySelector('.tryAgain2')
                            var closeModal2 = document.querySelector('#closeModal2')
                            var logOut2 = document.querySelector('.logOut2')

                            modal2.classList.add('active')
                            logOut2.addEventListener('click', () => {
                                signOut(auth).then(() => {
                                    location.href = "/index.html"
                                }).catch((error) => {
                                    // An error happened.
                                });
                            })
                            closeModal2.addEventListener('click', () => {
                                modal2.classList.remove('active')
                            })
                            tryAgain2.addEventListener('click', () => {
                                modal2.classList.remove('active')
                            })
                            window.addEventListener('click', event => {
                                if (event.target == modal2) {
                                    modal2.classList.remove('active')
                                }
                            })
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

