var loader = document.querySelector('.loader')

window.onload = function () {
    loader.classList.add('active')
}

var modal = document.querySelector('.modal')
var closeModal = document.querySelector('#closeModal')
var tryAgain = document.querySelector('.tryAgain')
var textErrorModal = document.querySelector('.textErrorModal')

const resExpense = await fetch(`http://localhost:4000/api/expenseData`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})

const resJsonExpense = await resExpense.json()

var expensesTotal = 0

if (resJsonExpense.status === "Data Expenses") {

    const expenseData = resJsonExpense.data;

    let fecha = new Date();
    let dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    let anio = String(fecha.getFullYear()).slice(-2);

    let fechaActual = `${dia} / ${mes} / ${anio}`;

    expenseData.forEach((doc) => {
        if (fechaActual == doc.Fecha) {
            expensesTotal += parseInt(doc.Precio)
        }
    })

} else {
    textErrorModal.textContent = resJsonExpense.message
    modal.classList.add('active')
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active')
    })
    tryAgain.addEventListener('click', () => {
        modal.classList.remove('active')
    })
    window.addEventListener('click', event => {
        if (event.target == modal) {
            modal.classList.remove('active')
        }
    })
}

var valorGastos = document.querySelector('.valorGastos')
valorGastos.textContent = `$${expensesTotal.toLocaleString('de-DE')}`

const resOrder = await fetch("http://localhost:4000/api/ordersDataAdmin", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})

const resJsonOrder = await resOrder.json()

var salesTotal = 0

if (resJsonOrder.status == "Data Orders") {
    const orderData = resJsonOrder.data;

    const main2 = document.querySelector('.main2')
    const main = document.querySelector('.main')
    const search = document.querySelector('.search')

    if (orderData != '') {

        let fecha = new Date();
        let dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        let anio = String(fecha.getFullYear()).slice(-2);

        let fechaActual = `${dia} / ${mes} / ${anio}`;

        var band

        orderData.forEach(async (doc) => {

            if (fechaActual == doc.Fecha) {
                salesTotal += parseInt(doc.Total)
            }

        })

    }
}

var valorIngresos = document.querySelector('.valorIngresos')
valorIngresos.textContent = `$${salesTotal.toLocaleString('de-DE')}`

var totalGanancias = salesTotal - expensesTotal

var valorGanancias = document.querySelector('.valorGanancias')
valorGanancias.textContent = `$${totalGanancias.toLocaleString('de-DE')}`

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

var formulaGastos = parseInt(salesTotal > 0 ? (expensesTotal / salesTotal) * 100 : 0)
var formulaGanancias = parseInt(salesTotal > 0 ? ((salesTotal - expensesTotal) / salesTotal) * 100 : 0)

alert(`${formulaGanancias} ${formulaGastos}`)

let circularProgress = document.querySelector('.circular-progress'),
    progressValue = document.querySelector('.progress-value'),
    circularProgress2 = document.querySelector('.circular-progress2'),
    progressValue2 = document.querySelector('.progress-value2'),
    circularProgress3 = document.querySelector('.circular-progress3'),
    progressValue3 = document.querySelector('.progress-value3')

let speed = 10,
    progressStartValue = 0,
    progressStartValue2 = 0,
    progressStartValue3 = 0,
    progressEndValue = 100,
    progressEndValue2 = formulaGastos <= 0 ? 1 : formulaGastos > 100 ? 100 : formulaGastos,
    progressEndValue3 = formulaGanancias <= 0 ? 1 : formulaGanancias > 100 ? 100 : formulaGanancias;

let progress3 = setInterval(() => {
    progressStartValue3++

    progressValue3.textContent = `${progressStartValue3}%`
    circularProgress3.style.background = `conic-gradient(#00be59 ${progressStartValue3 * 3.6}deg, var(--color-fondo) 0deg)`

    if (progressStartValue3 == progressEndValue3) {
        clearInterval(progress3)
    }
}, speed)

let progress2 = setInterval(() => {
    progressStartValue2++

    progressValue2.textContent = `${progressStartValue2}%`
    circularProgress2.style.background = `conic-gradient(#ff7777 ${progressStartValue2 * 3.6}deg, var(--color-fondo) 0deg)`

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