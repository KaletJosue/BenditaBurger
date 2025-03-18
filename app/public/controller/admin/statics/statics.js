var loader = document.querySelector('.loader')

loader.classList.add('active')

const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
}

const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

let calendar = document.querySelector('.calendar')

const month_names = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

let month_picker = document.querySelector('#month-picker')

month_picker.addEventListener('click', () => {
    month_list.classList.add('show')
})

const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days')
    calendar_days.innerHTML = ''
    let calendar_header_year = document.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    let currDate = new Date()

    month_picker.innerHTML = month_names[month]
    calendar_header_year.innerHTML = year

    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div>${e}</div>`
    month.addEventListener('click', () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(curr_month.value, curr_year.value)
    })
    month_list.appendChild(month)
})

document.querySelector('#prev-year').addEventListener('click', () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
})

document.querySelector('#next-year').addEventListener('click', () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
})

let currDate = new Date()

let curr_month = { value: currDate.getMonth() }
let curr_year = { value: currDate.getFullYear() }

generateCalendar(curr_month.value, curr_year.value)

var inputDay = document.querySelector('.inputDay')
var inputMonth = document.querySelector('.inputMonth')
var inputYear = document.querySelector('.inputYear')

var modalMonth = document.querySelector('.modalMonth')
var conModalMonth = document.querySelector('.conModalMonth')

var modalDay = document.querySelector('.modalDay')

var modalYear = document.querySelector('.modalYear')

inputMonth.addEventListener('click', () => {
    inputDay.value = ''
    inputYear.value = ''

    modalMonth.style.display = 'flex'

    gsap.fromTo(conModalMonth,
        { backdropFilter: 'blur(0px)', height: 0, opacity: 0 },
        {
            height: '100%',
            padding: '1rem',
            opacity: 1,
            backdropFilter: 'blur(90px)',
            duration: .7,
            ease: 'expo.out',
        }
    )

    window.addEventListener('click', event => {
        if (event.target == modalMonth) {
            gsap.to(conModalMonth, {
                height: '0px',
                padding: '0rem',
                duration: .2,
                ease: 'power1.in',
                onComplete: () => {
                    modalMonth.style.display = 'none';
                    inputDay.value = '16 / 07 / 2025'
                }
            });
        }
    })
})

inputDay.addEventListener('click', () => {
    inputMonth.value = ''
    inputYear.value = ''

    modalDay.style.display = 'flex'
    let calendar = document.querySelector('.calendar')

    gsap.fromTo(calendar,
        { backdropFilter: 'blur(0px)', height: 0, opacity: 0 },
        {
            height: '100%',
            padding: '1rem',
            opacity: 1,
            backdropFilter: 'blur(90px)',
            duration: .7,
            ease: 'expo.out',
        }
    )
    window.addEventListener('click', event => {
        if (event.target == modalDay) {
            gsap.to(calendar, {
                height: '0',
                padding: '1rem',
                duration: .2,
                ease: 'power1.in',
                onComplete: () => {
                    modalDay.style.display = 'none';
                }
            });
        }
    })
})

inputYear.addEventListener('click', () => {
    inputMonth.value = ''
    inputDay.value = ''

    modalYear.classList.add('active')

    window.addEventListener('click', event => {
        if (event.target == modalYear) {
            modalYear.classList.remove('active')
            inputDay.value = '16 / 07 / 2025'
        }
    })
})

inputDay.addEventListener('mousedown', function (event) {
    event.preventDefault();
});
inputMonth.addEventListener('mousedown', function (event) {
    event.preventDefault();
});

var btnSales = document.querySelectorAll('.btnSales')
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

const ctx = document.getElementById('myChart');

const ingresos = [5000, 7000, 8000, 6000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000];
const gastos = [3000, 4000, 5000, 3500, 4500, 4800, 5000, 5100, 5500, 6000, 6100, 7000];

const ganancias = ingresos.map((ingreso, index) => ingreso - gastos[index]);

const myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['12:30', '13:30', '14:30', '15:30', '16:30', '17:30', '18:30', '19:30', '20:30', '21:30', '22:30'], // Meses del año
        datasets: [
            {
                label: 'Ingresos',
                data: ingresos,
                borderColor: '#7d2ae8',
                backgroundColor: '#7d2ae8',
                tension: .3,
                fill: false
            },
            {
                label: 'Gastos',
                data: gastos,
                borderColor: '#ff7777',
                backgroundColor: '#ff7777',
                tension: .3,
                fill: false
            },
            {
                label: 'Ganancias',
                data: ganancias,
                borderColor: '#00be59',
                backgroundColor: '#00be59',
                tension: .3,
                fill: false
            }
        ]
    }, options: {
        responsive: true,
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