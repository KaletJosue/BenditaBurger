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

const openModalDelete = document.querySelector('.openModalDelete');
const modalDelete = document.querySelector('.modalDetele');
const modalContentDelete = document.querySelector('.conModalDelete');

const isSmallScreen = window.matchMedia("(height: 550)").matches;

var heightModal = 0

if (isSmallScreen) {
    heightModal = "100%"
} else {
    heightModal = "auto"
}

openModalDelete.addEventListener('click', () => {
    modalDelete.style.display = 'flex'

    gsap.fromTo(modalContentDelete,
        { backdropFilter: 'blur(0px)', height: 0, opacity: 0 },
        {
            height: heightModal,
            opacity: 1,
            backdropFilter: 'blur(90px)',
            duration: .7,
            ease: 'expo.out',
        }
    )
})
window.addEventListener('click', event => {
    if (event.target == modalDelete) {
        gsap.to(modalContentDelete, {
            height: '0px',
            duration: .2,
            ease: 'power1.in',
            onComplete: () => {
                modalDelete.style.display = 'none';
            }
        });
    }
})

const openModalUpdate = document.querySelector('.openModalUpdate');
const modalUpdate = document.querySelector('.modalUpdate');
const modalContentUpdate = document.querySelector('.conModalUpdate');
const closeModalUpdate = document.getElementById('closeModalUpdate')

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

openModalUpdate.addEventListener('click', () => {
    modalUpdate.style.display = 'flex'

    gsap.fromTo(modalContentUpdate,
        { backdropFilter: 'blur(0px)', height: 0, opacity: 0 },
        {
            height: 'auto',
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

var inputName = document.querySelector('.inputName')
var inputPriority = document.querySelector('.inputPriority')

var one = document.querySelector('.one')

var cancelAdd = document.querySelector('.cancelAdd')
var saveAdd = document.querySelector('.saveAdd')

cancelAdd.addEventListener('click', () => {
    gsap.to(modalContentAdd, {
        height: '0px',
        padding: '0rem',
        overflow: 'hidden',
        duration: .2,
        ease: 'power1.in',
        onComplete: () => {
            modalAdd.style.display = 'none';

            inputName.value = ''
            inputPriority.value = ''

            one.classList.remove('active')

            saveAdd.classList.remove('active')
            saveAdd.disabled = true
        }
    });
})

inputName.addEventListener("input", function () {
    if (inputName.value.length == 0 || inputPriority.value.length == 0) {
        one.classList.remove('active')
    } else {
        one.classList.add('active')
    }

    if (inputName.value.length != 0 && inputPriority.value.length != 0) {
        saveAdd.classList.add('active')
        saveAdd.disabled = false
    } else {
        saveAdd.classList.remove('active')
        saveAdd.disabled = true
    }
});

inputPriority.addEventListener("input", function () {
    if (inputName.value.length == 0 || inputPriority.value.length == 0) {
        one.classList.remove('active')
    } else {
        one.classList.add('active')
    }

    if (inputName.value.length != 0 && inputPriority.value.length != 0) {
        saveAdd.classList.add('active')
        saveAdd.disabled = false
    } else {
        saveAdd.classList.remove('active')
        saveAdd.disabled = true
    }
});

const openModalAdd = document.querySelector('.openModalAdd');
const modalAdd = document.querySelector('.modalAdd');
const modalContentAdd = document.querySelector('.conModalAdd');
const closeModalAdd = document.getElementById('closeModalAdd')

openModalAdd.addEventListener('click', () => {
    modalAdd.style.display = 'flex'

    gsap.fromTo(modalContentAdd,
        { backdropFilter: 'blur(0px)', height: 0, opacity: 0 },
        {
            height: '100%',
            padding: '1rem',
            overflow: 'hidden',
            opacity: 1,
            backdropFilter: 'blur(90px)',
            duration: .7,
            ease: 'expo.out',
        }
    )
})
closeModalAdd.addEventListener('click', () => {
    gsap.to(modalContentAdd, {
        height: '0px',
        padding: '0rem',
        overflow: 'hidden',
        duration: .2,
        ease: 'power1.in',
        onComplete: () => {
            modalAdd.style.display = 'none';
        }
    });
})
window.addEventListener('click', event => {
    if (event.target == modalAdd) {
        gsap.to(modalContentAdd, {
            height: '0px',
            padding: '0rem',
            overflow: 'hidden',
            duration: .2,
            ease: 'power1.in',
            onComplete: () => {
                modalAdd.style.display = 'none';
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