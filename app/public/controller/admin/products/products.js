var loader = document.querySelector('.loader')

window.onload = function () {
    loader.classList.add('active')
}

var btnEstatus = document.querySelector('.btnEstatus')

btnEstatus.addEventListener('click', () => {
    btnEstatus.classList.toggle('active')
})

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

var modal = document.querySelector('.modal')
var closeModal = document.querySelector('#closeModal')
var tryAgain = document.querySelector('.tryAgain')
var textErrorModal = document.querySelector('.textErrorModal')

const resProduct = await fetch("http://localhost:4000/api/productData", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})

const resProductJson = await resProduct.json()

if (resProductJson.status == "Data Products") {
    var tbody = document.querySelector('.tbody')

    const productData = resProductJson.data;

    productData.forEach((doc) => {
        var tr = document.createElement('tr')
        var thImg = document.createElement('th')
        var img = document.createElement('img')
        var nombre = document.createElement('th')
        var categoria = document.createElement('th')
        var precio = document.createElement('th')
        var descuento = document.createElement('th')
        var thStatus = document.createElement('th')
        var divStatus = document.createElement('div')
        var activeStatus = document.createElement('p')
        var desactiveStatus = document.createElement('p')
        var thActions = document.createElement('th')
        var divActions = document.createElement('div')
        var editActions = document.createElement('button')
        var deleteActions = document.createElement('button')

        img.src = doc.Foto
        nombre.textContent = (doc.Nombre).charAt(0).toUpperCase() + (doc.Nombre).slice(1)
        categoria.textContent = doc.Categoria
        precio.textContent = `$${parseInt(doc.Precio).toLocaleString('de-DE')}`

        if (doc.Descuento == '') {
            descuento.textContent = "Sin Descuento"
        } else {
            descuento.textContent = `${doc.Descuento}%`
        }

        divStatus.className = "btnEstatus"

        if (doc.Estado == true) {
            divStatus.classList.remove('active')
        } else {
            divStatus.classList.add('active')
        }

        activeStatus.textContent = 'Activo'
        desactiveStatus.textContent = 'Inactivo'
        editActions.textContent = "Editar"
        deleteActions.textContent = "Eliminar"

        divActions.className = "actions"

        tbody.appendChild(tr)
        tr.appendChild(thImg)
        thImg.appendChild(img)
        tr.appendChild(nombre)
        tr.appendChild(categoria)
        tr.appendChild(precio)
        tr.appendChild(descuento)
        tr.appendChild(thStatus)
        thStatus.appendChild(divStatus)
        divStatus.appendChild(activeStatus)
        divStatus.appendChild(desactiveStatus)
        tr.appendChild(thActions)
        thActions.appendChild(divActions)
        divActions.appendChild(editActions)
        divActions.appendChild(deleteActions)

        divStatus.addEventListener('click', async () => {
            loader.classList.remove('active')

            divStatus.classList.toggle('active')

            if (divStatus.classList == "btnEstatus active") {
                const resStatus = await fetch("http://localhost:4000/api/products/updateStatus", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Status: false,
                        Nombre: doc.Nombre
                    })
                })
                
                const resJsonStatus = await resStatus.json()

                if (resJsonStatus.status == "Update Correct") {
                    location.reload()
                } else {
                    loader.classList.add('active')
                    textErrorModal.textContent = resJsonStatus.message;
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
            } else {
                const resStatus = await fetch("http://localhost:4000/api/products/updateStatus", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Status: true,
                        Nombre: doc.Nombre
                    })
                })
                
                const resJsonStatus = await resStatus.json()

                if (resJsonStatus.status == "Update Correct") {
                    location.reload()
                } else {
                    loader.classList.add('active')
                    textErrorModal.textContent = resJsonStatus.message;
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

} else {
    textErrorModal.textContent = resProductJson.message;
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

const openModalDelete = document.querySelector('.openModalDelete');
const modalDelete = document.querySelector('.modalDetele');
const modalContentDelete = document.querySelector('.conModalDelete');

openModalDelete.addEventListener('click', () => {
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
const closeModalUpdate = document.querySelectorAll('#closeModalUpdate')

var inputNameUpdate = document.querySelector('.inputNameUpdate')
var inputCategoryUpdate = document.querySelector('.inputCategoryUpdate')
var inputPriceUpdate = document.querySelector('.inputPriceUpdate')
var inputDescriptionUpdate = document.querySelector('.inputDescriptionUpdate')
var inputDiscountUpdate = document.querySelector('.inputDiscountUpdate')

var btnUpdate = document.querySelector('.btnUpdate')

inputDiscountUpdate.addEventListener('input', () => {
    if (inputNameUpdate.value.length != 0 && inputCategoryUpdate.value.length != 0 && inputPriceUpdate.value.length != 0 && inputDescriptionUpdate.value.length != 0 && inputDiscountUpdate.value.length != 0) {
        btnUpdate.classList.add('active')
        btnUpdate.disabled = false
    } else {
        btnUpdate.classList.remove('active')
        btnUpdate.disabled = true
    }
})

inputDescriptionUpdate.addEventListener('input', () => {
    if (inputNameUpdate.value.length != 0 && inputCategoryUpdate.value.length != 0 && inputPriceUpdate.value.length != 0 && inputDescriptionUpdate.value.length != 0 && inputDiscountUpdate.value.length != 0) {
        btnUpdate.classList.add('active')
        btnUpdate.disabled = false
    } else {
        btnUpdate.classList.remove('active')
        btnUpdate.disabled = true
    }
})

inputNameUpdate.addEventListener('input', () => {
    if (inputNameUpdate.value.length != 0 && inputCategoryUpdate.value.length != 0 && inputPriceUpdate.value.length != 0 && inputDescriptionUpdate.value.length != 0 && inputDiscountUpdate.value.length != 0) {
        btnUpdate.classList.add('active')
        btnUpdate.disabled = false
    } else {
        btnUpdate.classList.remove('active')
        btnUpdate.disabled = true
    }
})

inputCategoryUpdate.addEventListener('input', () => {
    if (inputNameUpdate.value.length != 0 && inputCategoryUpdate.value.length != 0 && inputPriceUpdate.value.length != 0 && inputDescriptionUpdate.value.length != 0 && inputDiscountUpdate.value.length != 0) {
        btnUpdate.classList.add('active')
        btnUpdate.disabled = false
    } else {
        btnUpdate.classList.remove('active')
        btnUpdate.disabled = true
    }
})

inputPriceUpdate.addEventListener('input', () => {
    if (inputNameUpdate.value.length != 0 && inputCategoryUpdate.value.length != 0 && inputPriceUpdate.value.length != 0 && inputDescriptionUpdate.value.length != 0 && inputDiscountUpdate.value.length != 0) {
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
})

var inputName = document.querySelector('.inputName')
var inputCategory = document.querySelector('.inputCategory')
var inputPrice = document.querySelector('.inputPrice')
var inputPhoto = document.querySelector('#inputPhoto')
var inputDescription = document.querySelector('.inputDescription')
var inputDiscount = document.querySelector('.inputDiscount')

var btnAdd = document.querySelector('.saveAdd')

btnAdd.addEventListener('click', async () => {
    const formData = new FormData();
    formData.append('productPic', inputPhoto.files[0]);
    formData.append('Name', inputName.value);
    formData.append('Category', inputCategory.value);
    formData.append('Price', inputPrice.value);
    formData.append('Discount', inputDiscount.value);
    formData.append('Description', inputDescription.value);

    loader.classList.remove('active');

    const res = await fetch("http://localhost:4000/api/addProduct", {
        method: "POST",
        body: formData,
    });

    const resJson = await res.json();

    if (resJson.status == "Add Correct") {
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
            inputPrice.value = ''
            inputPhoto.value = ''
            inputDescription.value = ''
            inputDiscount.value = ''

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

    if (inputPrice.value.length != 0 && inputCategory.value.length != 0 && inputName.value.length != 0 && inputPhoto.value.length != 0 && inputDescription.value.length != 0) {
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

    if (inputPrice.value.length != 0 && inputCategory.value.length != 0 && inputName.value.length != 0 && inputPhoto.value.length != 0 && inputDescription.value.length != 0) {
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

    if (inputPrice.value.length != 0 && inputCategory.value.length != 0 && inputName.value.length != 0 && inputPhoto.value.length != 0 && inputDescription.value.length != 0) {
        saveAdd.classList.add('active')
        saveAdd.disabled = false
    } else {
        saveAdd.classList.remove('active')
        saveAdd.disabled = true
    }
});

inputPrice.addEventListener("input", function () {
    if (inputPrice.value.length == 0 || inputDescription.value.length == 0) {
        three.classList.remove('active')
    } else {
        three.classList.add('active')
    }

    if (inputPrice.value.length != 0 && inputCategory.value.length != 0 && inputName.value.length != 0 && inputPhoto.value.length != 0 && inputDescription.value.length != 0) {
        saveAdd.classList.add('active')
        saveAdd.disabled = false
    } else {
        saveAdd.classList.remove('active')
        saveAdd.disabled = true
    }
});

inputDescription.addEventListener("input", function () {
    if (inputPrice.value.length == 0 || inputDescription.value.length == 0) {
        three.classList.remove('active')
    } else {
        three.classList.add('active')
    }

    if (inputPrice.value.length != 0 && inputCategory.value.length != 0 && inputName.value.length != 0 && inputPhoto.value.length != 0 && inputDescription.value.length != 0) {
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