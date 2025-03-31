var loader = document.querySelector('.loader')

window.onload = function () {
    loader.classList.add('active')
}

const resDataFavorite = await fetch("http://localhost:4000/api/favoriteData", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})

const resJsonDataFavorite = await resDataFavorite.json()

if (resJsonDataFavorite.status == "Data Favorite") {
    const favoriteData = resJsonDataFavorite.data;

    favoriteData.forEach(async (doc) => {
        const resProduct = await fetch("http://localhost:4000/api/productData", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const resProductJson = await resProduct.json()

        var nombreProduct = doc.Nombre

        if (resProductJson.status == "Data Products") {

            const productData = resProductJson.data;

            var productsCategory = document.querySelector('.productsCategory')

            productData.forEach(async (doc) => {
                if (doc.Nombre.toLowerCase() == nombreProduct.toLowerCase() && doc.Estado == true) {

                    var product = document.createElement('div')
                    var img = document.createElement('img')
                    var rightProduct = document.createElement('div')
                    var price = document.createElement('p')
                    var discount = document.createElement('span')
                    var nombre = document.createElement('h3')
                    var description = document.createElement('h4')
                    var divButtons = document.createElement('div')
                    var addCar = document.createElement('button')
                    var iCar = document.createElement('i')
                    var addFavorite = document.createElement('button')
                    var iFavorite = document.createElement('i')

                    img.src = doc.Foto
                    if (doc.Descuento != "") {
                        price.textContent = `$${parseInt(parseInt(doc.Precio) - (parseInt(doc.Precio) * (parseInt(doc.Descuento) / 100))).toLocaleString('ed-ED')}`
                        discount.textContent = `-${doc.Descuento}%`

                        price.className = "discount1"
                        price.appendChild(discount)
                    } else {
                        price.textContent = `$${parseInt(doc.Precio).toLocaleString('ed-ED')}`
                    }
                    nombre.textContent = (doc.Nombre).charAt(0).toUpperCase() + (doc.Nombre).slice(1)
                    description.textContent = doc.Descripcion
                    addCar.textContent = "Agregar"

                    product.className = "product"
                    rightProduct.className = "rightProduct"
                    divButtons.className = "buttons"
                    addCar.className = "addCar"
                    addFavorite.className = "addFavorite"
                    iCar.className = "ph ph-shopping-cart"
                    iFavorite.className = "ph-bold ph-heart"

                    addFavorite.classList.add('active')

                    productsCategory.appendChild(product)
                    product.appendChild(img)
                    product.appendChild(rightProduct)
                    rightProduct.appendChild(price)
                    rightProduct.appendChild(nombre)
                    rightProduct.appendChild(description)
                    rightProduct.appendChild(divButtons)
                    divButtons.appendChild(addCar)
                    addCar.appendChild(iCar)
                    divButtons.appendChild(addFavorite)
                    addFavorite.appendChild(iFavorite)

                    const modalUpdate = document.querySelector('.modalUpdate');
                    const modalContentUpdate = document.querySelector('.conModalUpdate');
                    const closeModalUpdate = document.getElementById('closeModalUpdate')

                    addCar.addEventListener('click', () => {
                        modalUpdate.style.display = 'flex'

                        gsap.fromTo(modalContentUpdate,
                            { height: 0, opacity: 0 },
                            {
                                height: '100%',
                                opacity: 1,
                                backgroundColor: 'var(--color-blanco)',
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

                        var nameUpdate = document.querySelectorAll('.nameUpdate')
                        var imgUpdate = document.querySelector('.imgUpdate')
                        var price = document.querySelector('.price')
                        var discount = document.querySelector('.discount')
                        var descriptionUpdate = document.querySelector('.descriptionUpdate')

                        if (doc.Descuento == '') {
                            discount.style.display = 'none'
                            price.textContent = `$${parseInt(doc.Precio).toLocaleString('ed-ED')}`
                        } else {
                            discount.style.display = 'flex'
                            price.textContent = `$${parseInt(parseInt(doc.Precio) - (parseInt(doc.Precio) * (parseInt(doc.Descuento) / 100))).toLocaleString('ed-ED')}`
                        }

                        nameUpdate.forEach((nameUpdate) => {
                            nameUpdate.textContent = (doc.Nombre).charAt(0).toUpperCase() + (doc.Nombre).slice(1)
                        })
                        imgUpdate.src = doc.Foto
                        discount.textContent = `-${doc.Descuento}%`
                        descriptionUpdate.textContent = doc.Descripcion
                        discount.className = "discount"
                        price.appendChild(discount)

                    })

                    addFavorite.addEventListener('click', async () => {
                        addFavorite.classList.remove('active')

                        const resDeleteFavorite = await fetch("http://localhost:4000/api/deleteFavorite", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                Name: doc.Nombre,
                            })
                        })

                        const resJsonDeleteFavorite = await resDeleteFavorite.json()

                        if (resJsonDeleteFavorite.status == "Favorite Delete") {
                            location.reload()
                        } else {
                            textErrorModal.textContent = resJsonDeleteFavorite.message;
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

                }
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
    })
} else {
    textErrorModal.textContent = resJsonDataFavorite.message;
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

var addCarBtn = document.querySelector('.addCarBtn')

addCarBtn.addEventListener('click', async () => {
    loader.classList.remove('active')

    let name = document.querySelector('.nameUpdate')
    let cant = document.querySelector('#count')

    const resUser = await fetch("http://localhost:4000/api/userData", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const resJsonUser = await resUser.json()

    const resAddCar = await fetch("http://localhost:4000/api/addCar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Name: name.textContent,
            Cant: cant.textContent,
            Correo: resJsonUser.data.Email
        })
    })

    const resJsonAddCar = await resAddCar.json()

    if (resJsonAddCar.status == "Add Car") {
        loader.classList.add('active')

        let modalUpdate = document.querySelector('.modalUpdate');
        let modalContentUpdate = document.querySelector('.conModalUpdate');

        gsap.to(modalContentUpdate, {
            height: '0px',
            duration: .2,
            ease: 'power1.in',
            onComplete: () => {
                modalUpdate.style.display = 'none';
            }
        });

    } else {
        loader.classList.add('active')
        textErrorModal.textContent = resJsonAddCar.message
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

var countMinus = document.querySelector('#countMinus')
var count = document.querySelector('#count')
var countPlus = document.querySelector('#countPlus')

var cont = 1

countMinus.style.display = "none"

countMinus.addEventListener('click', () => {
    if (cont == 2) {
        countMinus.style.display = "none"

        cont--
        count.textContent = cont
    } else {
        countMinus.style.display = "flex"

        cont--
        count.textContent = cont
    }
})

countPlus.addEventListener('click', () => {
    if (cont < 10) {
        cont++
        count.textContent = cont

        countMinus.style.display = "flex"
    } else {
        textErrorModal.textContent = "Puedes pedir hasta un maximo de 10 unidades de este producto"
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

var btnConfig = document.querySelector('.btnConfig')

btnConfig.addEventListener('click', () => {
    window.location.href = "/user/config"
})

var modal = document.querySelector('.modal')
var closeModal = document.querySelector('#closeModal')
var tryAgain = document.querySelector('.tryAgain')
var textErrorModal = document.querySelector('.textErrorModal')

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
