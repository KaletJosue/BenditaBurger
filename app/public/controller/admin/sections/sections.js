var loader = document.querySelector('.loader')

window.onload = function () {
    loader.classList.add('active')
}

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

btnProducts.forEach(btnProduct => {
    btnProduct.addEventListener('click', () => {
        window.location.href = "/admin/product"
    })
})

var modal = document.querySelector('.modal')
var closeModal = document.querySelector('#closeModal')
var tryAgain = document.querySelector('.tryAgain')
var textErrorModal = document.querySelector('.textErrorModal')

const resCategory = await fetch("http://localhost:4000/api/categoryData", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})

const resJsonCategory = await resCategory.json()

if (resJsonCategory.status === "Data Category") {
    var tbody = document.querySelector('.tbody')

    const categoryData = resJsonCategory.data;

    categoryData.forEach((doc) => {
        var tr = document.createElement('tr')
        var nombre = document.createElement('th')
        var prioridad = document.createElement('th')
        var fecha = document.createElement('th')
        var thActions = document.createElement('th')
        var divActions = document.createElement('div')
        var editAction = document.createElement('button')
        var deleteAction = document.createElement('button')

        nombre.textContent = (doc.Nombre).charAt(0).toUpperCase() + (doc.Nombre).slice(1)
        prioridad.textContent = doc.Prioridad
        fecha.textContent = doc.Fecha
        editAction.textContent = "Editar"
        deleteAction.textContent = "Eliminar"

        divActions.className = "actions"

        tbody.appendChild(tr)
        tr.appendChild(nombre)
        tr.appendChild(prioridad)
        tr.appendChild(fecha)
        tr.appendChild(thActions)
        thActions.appendChild(divActions)
        divActions.appendChild(editAction)
        divActions.appendChild(deleteAction)

        deleteAction.addEventListener('click', () => {
            modalDelete.style.display = 'flex'

            gsap.fromTo(modalContentDelete,
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

            let deleteName = document.querySelector('.deleteName')
            let deletePriority = document.querySelector('.deletePriority')
            let deleteFecha = document.querySelector('.deleteFecha')

            let sendDelete = document.querySelector('.sendDelete')

            deleteName.textContent = (doc.Nombre).charAt(0).toUpperCase() + (doc.Nombre).slice(1)
            deletePriority.textContent = doc.Prioridad
            deleteFecha.textContent = doc.Fecha

            sendDelete.addEventListener('click', async () => {
                loader.classList.remove('active')

                const resDeleteCategory = await fetch("http://localhost:4000/api/deleteCategory", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Name: doc.Nombre,
                        Priority: doc.Prioridad,
                        Fecha: doc.Fecha,
                    })
                })

                const resJsonDeleteCategory = await resDeleteCategory.json()

                if (resJsonDeleteCategory.status == "Product Delete") {
                    location.reload()
                } else {
                    loader.classList.add('active')
                    textErrorModal.textContent = resJsonDeleteCategory.message
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

        editAction.addEventListener('click', () => {
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

            let inputNameUpdate = document.querySelector('.inputNameUpdate')
            let inputCategoryUpdate = document.querySelector('.inputCategoryUpdate')

            let btnUpdate = document.querySelector('.btnUpdate')

            inputNameUpdate.value = (doc.Nombre).charAt(0).toUpperCase() + (doc.Nombre).slice(1)
            inputCategoryUpdate.value = doc.Prioridad

            btnUpdate.addEventListener('click', async () => {
                loader.classList.remove('active')

                let fecha = new Date();
                let dia = String(fecha.getDate()).padStart(2, '0');
                const mes = String(fecha.getMonth() + 1).padStart(2, '0');
                let anio = String(fecha.getFullYear()).slice(-2);

                let fechaActual = `${dia} / ${mes} / ${anio}`;

                const resUpdateCategory = await fetch("http://localhost:4000/api/updateCategory", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Name: inputNameUpdate.value,
                        Priority: inputCategoryUpdate.value,
                        NameRefe: doc.Nombre,
                        PriorityRefe: doc.Prioridad,
                        Fecha: fechaActual,
                    })
                })

                const resJsonCategory = await resUpdateCategory.json()

                if (resJsonCategory.status == "Update Correct") {
                    location.reload()
                } else {
                    loader.classList.add('active')
                    textErrorModal.textContent = resJsonCategory.message
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

const modalDelete = document.querySelector('.modalDetele');
const modalContentDelete = document.querySelector('.conModalDelete');

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

var inputName = document.querySelector('.inputName')
var inputPriority = document.querySelector('.inputPriority')

var one = document.querySelector('.one')

var cancelAdd = document.querySelector('.cancelAdd')
var saveAdd = document.querySelector('.saveAdd')

const today = new Date();

const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = String(today.getFullYear()).slice(-2);

var fecha = `${day} / ${month} / ${year}`;

saveAdd.addEventListener('click', async () => {
    loader.classList.remove('active')

    const res = await fetch("http://localhost:4000/api/addCategory", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Name: inputName.value,
            Priority: inputPriority.value,
            Fecha: fecha,
        })
    })

    const resJson = await res.json()

    if (resJson.status == "Add Category Correct") {
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