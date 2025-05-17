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

const openModalUpdate = document.querySelector('.openModalUpdate');
const modalUpdate = document.querySelector('.modalUpdate');
const modalContentUpdate = document.querySelector('.conModalUpdate');
const closeModalUpdate = document.getElementById('closeModalUpdate')

var inputNameUpdate = document.querySelector('.inputNameUpdate')
var inputCategoryUpdate = document.querySelector('.inputCategoryUpdate')
var inputStockUpdate = document.querySelector('.inputStockUpdate')
var inputPriceUpdate = document.querySelector('.inputPriceUpdate')

var btnUpdate = document.querySelector('.btnUpdate')

inputNameUpdate.addEventListener('input', () => {
    if (inputNameUpdate.value.length != 0 && inputCategoryUpdate.value.length != 0 && inputStockUpdate.value.length != 0 && inputPriceUpdate.value.length != 0) {
        btnUpdate.classList.add('active')
        btnUpdate.disabled = false
    } else {
        btnUpdate.classList.remove('active')
        btnUpdate.disabled = true
    }
})

inputCategoryUpdate.addEventListener('input', () => {
    if (inputNameUpdate.value.length != 0 && inputCategoryUpdate.value.length != 0 && inputStockUpdate.value.length != 0 && inputPriceUpdate.value.length != 0) {
        btnUpdate.classList.add('active')
        btnUpdate.disabled = false
    } else {
        btnUpdate.classList.remove('active')
        btnUpdate.disabled = true
    }
})

inputStockUpdate.addEventListener('input', () => {
    if (inputNameUpdate.value.length != 0 && inputCategoryUpdate.value.length != 0 && inputStockUpdate.value.length != 0 && inputPriceUpdate.value.length != 0) {
        btnUpdate.classList.add('active')
        btnUpdate.disabled = false
    } else {
        btnUpdate.classList.remove('active')
        btnUpdate.disabled = true
    }
})

inputPriceUpdate.addEventListener('input', () => {
    if (inputNameUpdate.value.length != 0 && inputCategoryUpdate.value.length != 0 && inputStockUpdate.value.length != 0 && inputPriceUpdate.value.length != 0) {
        btnUpdate.classList.add('active')
        btnUpdate.disabled = false
    } else {
        btnUpdate.classList.remove('active')
        btnUpdate.disabled = true
    }
})

var inputName = document.querySelector('.inputName')
var inputCategory = document.querySelector('.inputCategory')
var inputStock = document.querySelector('.inputStock')
var inputPrice = document.querySelector('.inputPrice')
var inputPhoto = document.querySelector('#inputPhoto')

var nameImagen = document.querySelector('.nameImagen')

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
            inputCategory.value = ''
            inputStock.value = ''
            inputPrice.value = ''
            inputPhoto.value = ''

            nameImagen.textContent = ''

            one.classList.remove('active')
            two.classList.remove('active')
            three.classList.remove('active')

            line1.classList.remove('active')
            line2.classList.remove('active')

            saveAdd.classList.remove('active')
        }
    });
})

inputPhoto.addEventListener('change', function () {
    if (inputPhoto.files.length > 0) {
        nameImagen.textContent = inputPhoto.files[0].name
        one.classList.add('active')
        line1.classList.add('active')
    }

    if (inputPrice.value.length != 0 && inputStock.value.length != 0 && inputCategory.value.length != 0 && inputName.value.length != 0 && inputPhoto.value.length != 0) {
        saveAdd.classList.add('active')
        saveAdd.disabled = false
    } else {
        saveAdd.classList.remove('active')
        saveAdd.disabled = true
    }
})

inputName.addEventListener("input", function () {
    if (inputName.value.length == 0 || inputCategory.value.length == 0) {
        two.classList.remove('active')
        line2.classList.remove('active')
    } else {
        two.classList.add('active')
        line2.classList.add('active')
    }

    if (inputPrice.value.length != 0 && inputStock.value.length != 0 && inputCategory.value.length != 0 && inputName.value.length != 0 && inputPhoto.value.length != 0) {
        saveAdd.classList.add('active')
        saveAdd.disabled = false
    } else {
        saveAdd.classList.remove('active')
        saveAdd.disabled = true
    }
});

inputCategory.addEventListener("input", function () {
    if (inputName.value.length == 0 || inputCategory.value.length == 0) {
        two.classList.remove('active')
        line2.classList.remove('active')
    } else {
        two.classList.add('active')
        line2.classList.add('active')
    }

    if (inputPrice.value.length != 0 && inputStock.value.length != 0 && inputCategory.value.length != 0 && inputName.value.length != 0 && inputPhoto.value.length != 0) {
        saveAdd.classList.add('active')
        saveAdd.disabled = false
    } else {
        saveAdd.classList.remove('active')
        saveAdd.disabled = true
    }
});

inputStock.addEventListener("input", function () {
    if (inputStock.value.length == 0 || inputPrice.value.length == 0) {
        three.classList.remove('active')
    } else {
        three.classList.add('active')
    }

    if (inputPrice.value.length != 0 && inputStock.value.length != 0 && inputCategory.value.length != 0 && inputName.value.length != 0 && inputPhoto.value.length != 0) {
        saveAdd.classList.add('active')
        saveAdd.disabled = false
    } else {
        saveAdd.classList.remove('active')
        saveAdd.disabled = true
    }
});

inputPrice.addEventListener("input", function () {
    if (inputStock.value.length == 0 || inputPrice.value.length == 0) {
        three.classList.remove('active')
    } else {
        three.classList.add('active')
    }

    if (inputPrice.value.length != 0 && inputStock.value.length != 0 && inputCategory.value.length != 0 && inputName.value.length != 0 && inputPhoto.value.length != 0) {
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
        { backdropFilter: 'blur(0px)', height: '0px', opacity: 0 },
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

var btnAdd = document.querySelector('.saveAdd')

var inputPhoto = document.querySelector('#inputPhoto')
var inputName = document.querySelector('.inputName')
var inputCategory = document.querySelector('.inputCategory')
var inputStock = document.querySelector('.inputStock')
var inputPrice = document.querySelector('.inputPrice')

var modal = document.querySelector('.modal')
var closeModal = document.querySelector('#closeModal')
var tryAgain = document.querySelector('.tryAgain')
var textErrorModal = document.querySelector('.textErrorModal')

const today = new Date();

const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = String(today.getFullYear()).slice(-2);

var fecha = `${day} / ${month} / ${year}`;

btnAdd.addEventListener('click', async () => {
    const formData = new FormData();
    formData.append('inventoryPic', inputPhoto.files[0]);
    formData.append('Name', inputName.value);
    formData.append('Category', inputCategory.value);
    formData.append('Stock', inputStock.value);
    formData.append('Price', inputPrice.value);
    formData.append('Fecha', fecha);

    loader.classList.remove('active');

    const res = await fetch("http://localhost:4000/api/addInventory", {
        method: "POST",
        body: formData,
    });

    const resJson = await res.json();

    if (resJson.status == "Update correct") {
        location.reload();
    } else {
        loader.classList.add('active');
        textErrorModal.textContent = resJson.message;
        modal.classList.add('active');
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        tryAgain.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        window.addEventListener('click', event => {
            if (event.target == modal) {
                modal.classList.remove('active');
            }
        });
    }
});

const resInventory = await fetch("http://localhost:4000/api/inventoryData", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})

const resJsonInventory = await resInventory.json()

if (resJsonInventory.status === "Data Inventory") {
    const inventoryData = resJsonInventory.data;

    const main2 = document.querySelector('.main2')
    const main = document.querySelector('.table')

    var tbody = document.querySelector('.tbody')

    if (inventoryData != '') {
        main.style.display = ""
        main2.style.display = "none"

        inventoryData.forEach((doc) => {

            var tr = document.createElement('tr')
            var thImg = document.createElement('th')
            var img = document.createElement('img')
            var name = document.createElement('th')
            var category = document.createElement('th')
            var stock = document.createElement('th')
            var price = document.createElement('th')
            var fecha = document.createElement('th')
            var thAction = document.createElement('th')
            var divAction = document.createElement('div')
            var editAction = document.createElement('button')
            var deleteAction = document.createElement('button')

            img.src = doc.Foto
            name.textContent = doc.Nombre
            category.textContent = doc.Categoria
            stock.textContent = doc.Stock
            price.textContent = `$${parseInt(doc.Precio).toLocaleString('de-DE')}`
            fecha.textContent = doc.Fecha
            editAction.textContent = "Editar"
            deleteAction.textContent = "Eliminar"

            divAction.className = "actions"

            tbody.appendChild(tr)
            tr.appendChild(thImg)
            thImg.appendChild(img)
            tr.appendChild(name)
            tr.appendChild(category)
            tr.appendChild(stock)
            tr.appendChild(price)
            tr.appendChild(fecha)
            tr.appendChild(thAction)
            thAction.appendChild(divAction)
            divAction.appendChild(editAction)
            divAction.appendChild(deleteAction)

            deleteAction.addEventListener('click', () => {
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

                var imgDelete = document.querySelector('.imgDelete')
                var nameDelete = document.querySelector('.nameDelete')
                var categoryDelete = document.querySelector('.categoryDelete')
                var stockDelete = document.querySelector('.stockDelete')
                var priceDelete = document.querySelector('.priceDelete')

                imgDelete.src = doc.Foto
                nameDelete.textContent = doc.Nombre
                categoryDelete.textContent = doc.Categoria
                stockDelete.textContent = doc.Stock
                priceDelete.textContent = `$${parseInt(doc.Precio).toLocaleString('de-DE')}`

                var deleteProduct = document.querySelector('.deleteProduct')

                deleteProduct.addEventListener('click', async () => {
                    loader.classList.remove('active');

                    const resDelete = await fetch("http://localhost:4000/api/deleteInventory", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            Nombre: doc.Nombre,
                            Foto: doc.Foto
                        })
                    })

                    const resJsonDelete = await resDelete.json()

                    if (resJsonDelete.status == "Product Delete") {
                        location.reload()
                    } else {
                        loader.classList.add('active');
                        textErrorModal.textContent = resJson.message;
                        modal.classList.add('active');
                        closeModal.addEventListener('click', () => {
                            modal.classList.remove('active');
                        });
                        tryAgain.addEventListener('click', () => {
                            modal.classList.remove('active');
                        });
                        window.addEventListener('click', event => {
                            if (event.target == modal) {
                                modal.classList.remove('active');
                            }
                        });
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
                let inputStockUpdate = document.querySelector('.inputStockUpdate')
                let inputPriceUpdate = document.querySelector('.inputPriceUpdate')

                let btnUpdate = document.querySelector('.btnUpdate')

                inputNameUpdate.value = doc.Nombre
                inputCategoryUpdate.value = doc.Categoria
                inputStockUpdate.value = doc.Stock
                inputPriceUpdate.value = doc.Precio

                btnUpdate.addEventListener('click', async () => {

                    let fecha = new Date();
                    let dia = String(fecha.getDate()).padStart(2, '0');
                    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JS empiezan desde 0
                    let anio = String(fecha.getFullYear()).slice(-2);

                    let fechaActual = `${dia} / ${mes} / ${anio}`;

                    if (inputNameUpdate.value == doc.Nombre && inputCategoryUpdate.value == doc.Categoria && inputStockUpdate.value == doc.Stock && inputPriceUpdate.value == doc.Precio) {
                        btnUpdate.classList.remove('active')
                        btnUpdate.disabled = true

                        textErrorModal.textContent = "No hay datos para actualizar";
                        modal.classList.add('active');
                        closeModal.addEventListener('click', () => {
                            modal.classList.remove('active');
                        });
                        tryAgain.addEventListener('click', () => {
                            modal.classList.remove('active');
                        });
                        window.addEventListener('click', event => {
                            if (event.target == modal) {
                                modal.classList.remove('active');
                            }
                        });
                    } else {
                        loader.classList.remove('active');

                        const resUpdate = await fetch("http://localhost:4000/api/updateInventory", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                Nombre: inputNameUpdate.value,
                                Categoria: inputCategoryUpdate.value,
                                Stock: inputStockUpdate.value,
                                Precio: inputPriceUpdate.value,
                                Fecha: fechaActual,
                                NombreReferencia: doc.Nombre,
                                precioReferencia: doc.Precio
                            })
                        })

                        const resJsonUpdate = await resUpdate.json()

                        if (resJsonUpdate.status == "Update correct") {
                            location.reload()
                        } else {
                            loader.classList.add('active')
                            textErrorModal.textContent = resJsonUpdate.message;
                            modal.classList.add('active');
                            closeModal.addEventListener('click', () => {
                                modal.classList.remove('active');
                            });
                            tryAgain.addEventListener('click', () => {
                                modal.classList.remove('active');
                            });
                            window.addEventListener('click', event => {
                                if (event.target == modal) {
                                    modal.classList.remove('active');
                                }
                            });
                        }
                    }
                })
            })

        });
    } else {
        main.style.display = "none"
        main2.style.display = "flex"
    }

} else {
    console.error("Error al obtener los datos del inventario:", resJsonInventory.message);
}