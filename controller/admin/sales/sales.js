import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, where, query, onSnapshot } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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

                        var btnSales = document.querySelectorAll('.btnSales')
                        var btnStatistics = document.querySelectorAll('.btnStatistics')
                        var btnBills = document.querySelectorAll('.btnBills')
                        var btnConfig = document.querySelector('.btnConfig')

                        btnConfig.addEventListener('click', () => {
                            location.href = "/views/admin/config/config.html"
                        })

                        btnBills.forEach((btnBill) => {
                            btnBill.addEventListener('click', () => {
                                location.href = "/views/admin/bills/bills.html"
                            })
                        })

                        btnStatistics.forEach((btnStatistic) => {
                            btnStatistic.addEventListener('click', () => {
                                location.href = "/views/admin/statics/statics.html"
                            })
                        })

                        btnSales.forEach((btnSale) => {
                            btnSale.addEventListener('click', () => {
                                location.href = "/views/admin/sales/sales.html"
                            })
                        })

                        var btnProducts = document.querySelectorAll('.btnProducts')
                        var btnSections = document.querySelectorAll('.btnSections')

                        btnSections.forEach(btnSection => {
                            btnSection.addEventListener('click', () => {
                                location.href = "/views/admin/sections/sections.html"
                            })
                        })

                        btnProducts.forEach(btnProduct => {
                            btnProduct.addEventListener('click', () => {
                                location.href = "/views/admin/products/products.html"
                            })
                        })

                        const openModalDetails = document.querySelector('.openModal');
                        const modalDetails = document.querySelector('.modalDetalis');
                        const modalContentDetails = document.querySelector('.conModalDetails');
                        const closeModalDetails = document.getElementById('closeModalDetails')

                        openModalDetails.addEventListener('click', () => {
                            modalDetails.style.display = 'flex'

                            gsap.fromTo(modalContentDetails,
                                { scale: 0, opacity: 0, filter: 'blur(10px)', x: 0 },
                                {
                                    scale: 1,
                                    opacity: 1,
                                    filter: 'blur(0px)',
                                    duration: .5,
                                    ease: 'power1.out',
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

