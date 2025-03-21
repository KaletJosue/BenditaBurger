var loader = document.querySelector('.loader')

loader.classList.add('active')

var modal = document.querySelector('.modal')
var closeModal = document.querySelector('#closeModal')
var tryAgain = document.querySelector('.tryAgain')
var textErrorModal = document.querySelector('.textErrorModal')

const resExpense = await fetch("http://localhost:4000/api/expenseData", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})

const resJsonExpense = await resExpense.json()

var expensesTotal = 0

if (resJsonExpense.status === "Data Expenses") {
    var contentBills = document.querySelector('.contentBills')

    const expenseData = resJsonExpense.data;

    expenseData.forEach((doc) => {
        expensesTotal += parseInt(doc.Precio)

        var bill = document.createElement('div')
        var leftBill = document.createElement('div')
        var icon = document.createElement('i')
        var textLeftBill = document.createElement('div')
        var nameBill = document.createElement('h4')
        var priceBill = document.createElement('p')
        var pay = document.createElement('h3')
        var iconMenu = document.createElement('i')

        nameBill.textContent = doc.Nombre
        priceBill.textContent = `$${(parseInt(doc.Precio).toLocaleString('es-ES'))}`
        pay.textContent = `Pagaste con: ${doc.Pago}`

        if ((doc.Pago).toLowerCase() == "tarjetas") {
            icon.className = "ph ph-credit-card"
            icon.style.backgroundColor = "#ff5733"
        } else if ((doc.Pago).toLowerCase() == "nequi") {
            icon.className = "ph ph-devices"
            icon.style.backgroundColor = "#8233ff"
        } else if ((doc.Pago).toLowerCase() == "daviplata") {
            icon.className = "ph ph-devices"
            icon.style.backgroundColor = "#ff3333"
        } else if ((doc.Pago).toLowerCase() == "efectivo") {
            icon.className = "ph ph-piggy-bank"
            icon.style.backgroundColor = "#35c318"
        }

        iconMenu.className = "ph-fill ph-dots-three-outline-vertical"
        iconMenu.style.fontSize = "15px"
        iconMenu.style.cursor = "pointer"

        bill.className = "bill"
        leftBill.className = "leftBill"
        textLeftBill.className = "textLeftBill"

        contentBills.appendChild(bill)
        bill.appendChild(leftBill)
        leftBill.appendChild(icon)
        leftBill.appendChild(textLeftBill)
        textLeftBill.appendChild(nameBill)
        textLeftBill.appendChild(pay)
        textLeftBill.appendChild(priceBill)
        bill.appendChild(iconMenu)

        iconMenu.addEventListener('click', () => {
            modalUpdate.style.display = 'flex'

            gsap.fromTo(modalContentUpdate,
                { backdropFilter: 'blur(0px)', height: 0, opacity: 0 },
                {
                    height: '100%',
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
            closeModalUpdate.forEach((closeModalUpdateBtn) => {
                closeModalUpdateBtn.addEventListener('click', () => {
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

            let inputNameUpdate = document.querySelector('.inputNameUpdate')
            let inputCategoryUpdate = document.querySelector('.inputCategoryUpdate')
            let inputPriceUpdate = document.querySelector('.inputPriceUpdate')

            inputNameUpdate.value = doc.Nombre
            inputPriceUpdate.value = doc.Precio
            inputCategoryUpdate.textContent = doc.Pago

            inputCategoryUpdate.addEventListener('click', () => {
                modalSelect.style.display = 'flex'

                gsap.fromTo(modalContentSelect,
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

                closeModalSelect.addEventListener('click', () => {
                    gsap.to(modalContentSelect, {
                        height: '0px',
                        padding: '0rem',
                        overflow: 'hidden',
                        duration: .2,
                        ease: 'power1.in',
                        onComplete: () => {
                            modalSelect.style.display = 'none';
                        }
                    });
                })
                window.addEventListener('click', event => {
                    if (event.target == modalSelect) {
                        gsap.to(modalContentSelect, {
                            height: '0px',
                            padding: '0rem',
                            overflow: 'hidden',
                            duration: .2,
                            ease: 'power1.in',
                            onComplete: () => {
                                modalSelect.style.display = 'none';
                            }
                        });
                    }
                })
                select.forEach((select) => {
                    select.addEventListener('click', () => {
                        gsap.to(modalContentSelect, {
                            height: '0px',
                            padding: '0rem',
                            overflow: 'hidden',
                            duration: .2,
                            ease: 'power1.in',
                            onComplete: () => {
                                modalSelect.style.display = 'none';
                            }
                        });

                        inputCategoryUpdate.textContent = select.textContent

                        if (inputNameUpdate.value.length != 0 && inputCategoryUpdate.textContent.length != 0 && inputPriceUpdate.value.length != 0) {
                            btnUpdate.classList.add('active')
                            btnUpdate.disabled = false
                        } else {
                            btnUpdate.classList.remove('active')
                            btnUpdate.disabled = true
                        }
                    })
                })
            })

            btnUpdate.addEventListener('click', async () => {
                loader.classList.remove('active');

                const resUpdate = await fetch("http://localhost:4000/api/updateExpense", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Nombre: inputNameUpdate.value,
                        Precio: inputPriceUpdate.value,
                        Pago: ((inputCategoryUpdate.textContent).trimStart()).trimEnd(),
                        FechaRefe: doc.Fecha,
                        NombreRefe: doc.Nombre,
                        PrecioRefe: doc.Precio,
                        PagoRefe: doc.Pago
                    })
                })

                const resJsonUpdate = await resUpdate.json()

                if (resJsonUpdate.status == "Update Correct") {
                    location.reload()
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
            })
        })
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

var expense = document.querySelector('.expense')

expense.textContent = parseInt(expensesTotal).toLocaleString('es-ES')

var btnSales = document.querySelectorAll('.btnSales')
var btnStatistics = document.querySelectorAll('.btnStatistics')
var btnConfig = document.querySelector('.btnConfig')

btnConfig.addEventListener('click', () => {
    window.location.href = "/admin/config"
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

const openModalUpdate = document.querySelector('.openModalUpdate');
const modalUpdate = document.querySelector('.modalUpdate');
const modalContentUpdate = document.querySelector('.conModalUpdate');
const closeModalUpdate = document.querySelectorAll('#closeModalUpdate')

var inputNameUpdate = document.querySelector('.inputNameUpdate')
var inputCategoryUpdate = document.querySelector('.inputCategoryUpdate')
var inputPriceUpdate = document.querySelector('.inputPriceUpdate')

var btnUpdate = document.querySelector('.btnUpdate')

inputNameUpdate.addEventListener('input', () => {
    if (inputNameUpdate.value.length != 0 && inputCategoryUpdate.textContent.length != 0 && inputPriceUpdate.value.length != 0) {
        btnUpdate.classList.add('active')
        btnUpdate.disabled = false
    } else {
        btnUpdate.classList.remove('active')
        btnUpdate.disabled = true
    }
})

inputCategoryUpdate.addEventListener('input', () => {
    if (inputNameUpdate.value.length != 0 && inputCategoryUpdate.textContent.length != 0 && inputPriceUpdate.value.length != 0) {
        btnUpdate.classList.add('active')
        btnUpdate.disabled = false
    } else {
        btnUpdate.classList.remove('active')
        btnUpdate.disabled = true
    }
})

var inputName = document.querySelector('.inputName')
var inputPrice = document.querySelector('.inputPrice')
var inputPay = document.querySelector('.inputPay')

var one = document.querySelector('.one')
var two = document.querySelector('.two')
var three = document.querySelector('.three')

var line1 = document.querySelector('.line1')
var line2 = document.querySelector('.line2')

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
            inputPrice.value = ''
            inputPay.textContent = ''

            one.classList.remove('active')
            two.classList.remove('active')
            three.classList.remove('active')

            line1.classList.remove('active')
            line2.classList.remove('active')

            saveAdd.classList.remove('active')
        }
    });
})

inputName.addEventListener("input", function () {
    if (inputName.value.length == 0) {
        one.classList.remove('active')
        line1.classList.remove('active')
    } else {
        one.classList.add('active')
        line1.classList.add('active')
    }

    if (inputPrice.value.length != 0 && inputName.value.length != 0 && inputPay.textContent.length != 0) {
        saveAdd.classList.add('active')
        saveAdd.disabled = false
    } else {
        saveAdd.classList.remove('active')
        saveAdd.disabled = true
    }
});

inputPrice.addEventListener("input", function () {
    if (inputPrice.value.length == 0) {
        two.classList.remove('active')
        line2.classList.add('active')
    } else {
        two.classList.add('active')
        line2.classList.remove('active')
    }

    if (inputPrice.value.length != 0 && inputName.value.length != 0 && inputPay.textContent.length != 0) {
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

const modalSelect = document.querySelector('.modalSelect');
const modalContentSelect = document.querySelector('.conModalSelect');
const closeModalSelect = document.getElementById('closeModalSelect')
const select = document.querySelectorAll('.select')

inputPay.addEventListener('click', () => {
    modalSelect.style.display = 'flex'

    gsap.fromTo(modalContentSelect,
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

    closeModalSelect.addEventListener('click', () => {
        gsap.to(modalContentSelect, {
            height: '0px',
            padding: '0rem',
            overflow: 'hidden',
            duration: .2,
            ease: 'power1.in',
            onComplete: () => {
                modalSelect.style.display = 'none';
            }
        });
    })
    window.addEventListener('click', event => {
        if (event.target == modalSelect) {
            gsap.to(modalContentSelect, {
                height: '0px',
                padding: '0rem',
                overflow: 'hidden',
                duration: .2,
                ease: 'power1.in',
                onComplete: () => {
                    modalSelect.style.display = 'none';
                }
            });
        }
    })
    select.forEach((select) => {
        select.addEventListener('click', () => {
            gsap.to(modalContentSelect, {
                height: '0px',
                padding: '0rem',
                overflow: 'hidden',
                duration: .2,
                ease: 'power1.in',
                onComplete: () => {
                    modalSelect.style.display = 'none';
                }
            });

            inputPay.textContent = select.textContent
            three.classList.add('active')

            if (inputPrice.value.length != 0 && inputName.value.length != 0 && inputPay.textContent.length != 0) {
                saveAdd.classList.add('active')
                saveAdd.disabled = false
            } else {
                saveAdd.classList.remove('active')
                saveAdd.disabled = true
            }
        })
    })
})

var inputName = document.querySelector('.inputName')
var inputPrice = document.querySelector('.inputPrice')
var inputPay = document.querySelector('.inputPay')

var saveAdd = document.querySelector('.saveAdd')

const today = new Date();

const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = String(today.getFullYear()).slice(-2);

var fecha = `${day} / ${month} / ${year}`;

saveAdd.addEventListener('click', async () => {
    loader.classList.remove('active')

    const res = await fetch("http://localhost:4000/api/addExpense", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Name: inputName.value,
            Price: inputPrice.value,
            Pay: ((inputPay.textContent).trimStart()).trimEnd(),
            Fecha: fecha,
        })
    })

    const resJson = await res.json()

    if (resJson.status == "Add Expense Correct") {
        location.reload()
    } else if (resJson.status) {
        loader.classList.add('active')
        textErrorModal.textContent = resJson.message
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
})