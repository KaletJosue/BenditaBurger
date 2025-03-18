var loader = document.querySelector('.loader')

loader.classList.add('active')

var btnSales = document.querySelectorAll('.btnSales')
var btnStatistics = document.querySelectorAll('.btnStatistics')
var btnBills = document.querySelectorAll('.btnBills')
var btnConfig = document.querySelector('.btnConfig')

btnConfig.addEventListener('click', () => {
    window.location.href = "/admin/config"
})

btnBills.forEach((btnBill) => {
    btnBill.addEventListener('click', () => {
        window.location.href = "/admin/expenses"
    })
})

btnStatistics.forEach((btnStatistic) => {
    btnStatistic.addEventListener('click', () => {
        window.location.href = "/admin/statistic"
    })
})

btnSales.forEach((btnSale) => {
    btnSale.addEventListener('click', () => {
        window.location.href = "/admin/sale"
    })
})

var btnProducts = document.querySelectorAll('.btnProducts')
var btnSections = document.querySelectorAll('.btnSections')

btnSections.forEach(btnSection => {
    btnSection.addEventListener('click', () => {
        window.location.href = "/admin/section"
    })
})

btnProducts.forEach(btnProduct => {
    btnProduct.addEventListener('click', () => {
        window.location.href = "/admin/product"
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

var btnSelectEstado = document.querySelector('.enviado')
var selectEstado = document.querySelector('.selectEstado')

btnSelectEstado.addEventListener('click', () => {
    var isCollapsed = selectEstado.style.height === '' || selectEstado.style.height === '2px' || selectEstado.style.height === '0px';

    if (isCollapsed == true) {
        gsap.fromTo(selectEstado,
            { height: 0, width: 0, opacity: 0, padding: 0 },
            {
                height: '130px',
                width: '250px',
                opacity: 1,
                padding: '1rem',
                duration: .5,
                ease: 'elastic.out',
            }
        )
    } else {
        gsap.to(selectEstado, {
            height: 0,
            width: 0,
            filter: 'blur(20px)',
            opacity: 0,
            padding: 0,
            duration: .2,
            ease: 'power1',
            onComplete: () => {
                gsap.set(selectEstado, { clearProps: "all" });
                isCollapsed = true
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