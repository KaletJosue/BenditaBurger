var loader = document.querySelector('.loader')

window.onload = function () {
    loader.classList.add('active')
}

const openModalFactura = document.querySelector('.openModalFactura');
const modalFactura = document.querySelector('.modalFactura');
const conModalFactura = document.querySelector('.conModalFactura');
const closeModalFactura = document.querySelector('.closeModalFactura')

const openModalAdd = document.querySelector('.openModalAdd');
const modalAdd = document.querySelector('.modalAdd');
const closeModalAdd = document.querySelector('#closeModalAdd')
const cancelModalAdd = document.querySelector('.cancelModalAdd')

var openResumen = document.querySelectorAll('.product')
var containerResumen = document.querySelector('.conModalAdd')
var leftModalAdd = document.querySelector('.leftModalAdd')

var cancelPedido = document.querySelector('.cancel')

cancelPedido.addEventListener('click', () => {
    containerResumen.classList.remove('active')
})

openResumen.forEach((product) => {
    product.addEventListener('click', () => {
        containerResumen.classList.add('active')
    })
})

openModalAdd.addEventListener('click', () => {
    gsap.fromTo(modalAdd,
        { height: 0, opacity: 0 },
        {
            padding: '0.5rem',
            height: '100dvh',
            opacity: 1,
            duration: .2,
            ease: 'expo.out',
        }
    )
    closeModalAdd.addEventListener('click', () => {
        gsap.to(modalAdd, {
            height: '0px',
            padding: '0rem 1rem',
            duration: .2,
            ease: 'power1.in',
        });
    })
})

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
closeModalFactura.addEventListener('click', () => {
    gsap.to(conModalFactura, {
        height: '0px',
        padding: '0rem',
        duration: .2,
        ease: 'power1.in',
        onComplete: () => {
            modalFactura.style.display = 'none';
        }
    });
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

var btnCarry = document.querySelector('.carry')
var btnEat = document.querySelector('.eat')
var btnOrder = document.querySelector('.order')

btnCarry.addEventListener('click', () => {
    gsap.to(modalContentSelectModo, {
        height: '0px',
        padding: '0rem',
        duration: .2,
        ease: 'power1.in',
        onComplete: () => {
            modalSelectModo.style.display = 'none';
        }
    });
    gsap.to(modalAdd, {
        height: '0px',
        padding: '0rem 1rem',
        duration: .2,
        ease: 'power1.in',
    });
    containerResumen.classList.remove('active')
})

const modalSeletTable = document.querySelector('.modalSeletTable');
const conModalSeletTable = document.querySelector('.conModalSeletTable');

var mesas = document.querySelectorAll('.mesas')

mesas.forEach(mesa => {
    mesa.addEventListener('click', () => {
        gsap.to(conModalSeletTable, {
            height: '0px',
            padding: '0rem',
            duration: .2,
            ease: 'power1.in',
            onComplete: () => {
                modalSeletTable.style.display = 'none';
            }
        });
        gsap.to(modalAdd, {
            height: '0px',
            padding: '0rem 1rem',
            duration: .2,
            ease: 'power1.in',
        });
        containerResumen.classList.remove('active')
    })
})

btnEat.addEventListener('click', () => {
    gsap.to(modalContentSelectModo, {
        height: '0px',
        padding: '0rem',
        duration: .2,
        ease: 'power1.in',
        onComplete: () => {
            modalSelectModo.style.display = 'none';
        }
    });

    modalSeletTable.style.display = 'flex'
    gsap.fromTo(conModalSeletTable,
        { backdropFilter: 'blur(0px)', height: 0, opacity: 0 },
        {
            padding: '1rem',
            height: 'auto',
            opacity: 1,
            backdropFilter: 'blur(90px)',
            duration: .7,
            ease: 'expo.out',
        }
    )

    window.addEventListener('click', event => {
        if (event.target == modalSeletTable) {
            gsap.to(conModalSeletTable, {
                height: '0px',
                padding: '0rem',
                duration: .2,
                ease: 'power1.in',
                onComplete: () => {
                    modalSeletTable.style.display = 'none';
                }
            });
        }
    })
})

var btnConfir = document.querySelector('.confir')
const modalSelectModo = document.querySelector('.modalSelectModo');
const modalContentSelectModo = document.querySelector('.conModalSelectModo');

btnConfir.addEventListener('click', () => {
    modalSelectModo.style.display = 'flex'

    gsap.fromTo(modalContentSelectModo,
        { backdropFilter: 'blur(0px)', height: 0, opacity: 0 },
        {
            padding: '1rem',
            height: '300px',
            opacity: 1,
            backdropFilter: 'blur(90px)',
            duration: .7,
            ease: 'expo.out',
        }
    )

    window.addEventListener('click', event => {
        if (event.target == modalSelectModo) {
            gsap.to(modalContentSelectModo, {
                height: '0px',
                padding: '0rem',
                duration: .2,
                ease: 'power1.in',
                onComplete: () => {
                    modalSelectModo.style.display = 'none';
                }
            });
        }
    })
})

var menu = document.querySelector('.menu')
var conMenu = document.querySelector('.conMenu')

conMenu.addEventListener('click', () => {
    menu.classList.toggle('active')
    sidebar.classList.toggle('ocult')
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

