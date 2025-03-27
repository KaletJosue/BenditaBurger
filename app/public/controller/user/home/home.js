var loader = document.querySelector('.loader')

window.onload = function () {
    loader.classList.add('active')
}

var btnConfig = document.querySelector('.btnConfig')

btnConfig.addEventListener('click', () => {
    window.location.href = "/user/config"
})

var modal = document.querySelector('.modal')
var closeModal = document.querySelector('#closeModal')
var tryAgain = document.querySelector('.tryAgain')
var textErrorModal = document.querySelector('.textErrorModal')

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

var logOut = document.querySelector('.close')

var modal2 = document.querySelector('.modal2')
var closeModal2 = document.querySelector('#closeModal2')
var logOut2 = document.querySelector('.logOut2')
var tryAgain2 = document.querySelector('.tryAgain2')

logOut.addEventListener('click', () => {
    modal2.classList.add('active')
    closeModal2.addEventListener('click', () => {
        modal2.classList.remove('active')
    })
    logOut2.addEventListener('click', () => {
        document.cookie = "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT"
        document.location.href = "/"
    })
    tryAgain2.addEventListener('click', () => {
        modal2.classList.remove('active')
    })
    window.addEventListener('click', event => {
        if (event.target == modal2) {
            modal2.classList.remove('active')
        }
    })
})

const res = await fetch("http://localhost:4000/api/userData", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})

const resJson = await res.json()

var imgProfile = document.querySelector('.profile')
var gmail = document.querySelector('.correo')
var nombre = document.querySelector('.name')

nombre.textContent = resJson.data.Nombre.split(' ').slice(0, 2).join(' ')
gmail.textContent = resJson.data.Rol

if (resJson.data.Photo == "") {
    imgProfile.src = "/assets/profile-5.jpg"
} else {
    imgProfile.src = resJson.data.Photo
}

var addCar = document.querySelectorAll('.addCar')

const modalUpdate = document.querySelector('.modalUpdate');
const modalContentUpdate = document.querySelector('.conModalUpdate');
const closeModalUpdate = document.getElementById('closeModalUpdate')

addCar.forEach((addCar) => {
    addCar.addEventListener('click', () => {
        modalUpdate.style.display = 'flex'

        gsap.fromTo(modalContentUpdate,
            { height: 0, opacity: 0 },
            {
                height: '100%',
                opacity: 1,
                backgroundColor: 'var(--color-blanco)',
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
})