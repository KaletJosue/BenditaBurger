
var loader = document.querySelector('.loader')

loader.classList.add('active')

const openModalFactura = document.querySelector('.openModalFactura');
const modalFactura = document.querySelector('.modalFactura');
const conModalFactura = document.querySelector('.conModalFactura');

openModalFactura.addEventListener('click', () => {
    modalFactura.style.display = 'flex'

    gsap.fromTo(conModalFactura,
        { backdropFilter: 'blur(0px)', height: 0, opacity: 0 },
        {
            padding: '2rem 1rem 1rem 2rem',
            height: '100%',
            opacity: 1,
            backdropFilter: 'blur(90px)',
            duration: .7,
            ease: 'expo.out',
        }
    )
})
window.addEventListener('click', event => {
    if (event.target == modalFactura) {
        gsap.to(conModalFactura, {
            height: '0px',
            padding: '0rem',
            duration: .2,
            ease: 'power1.in',
            onComplete: () => {
                modalFactura.style.display = 'none';
            }
        });
    }
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

