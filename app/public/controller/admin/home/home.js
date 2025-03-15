var loader = document.querySelector('.loader')

loader.classList.add('active')

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

