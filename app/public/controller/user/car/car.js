var loader = document.querySelector('.loader')

window.onload = function () {
    loader.classList.add('active')
}

var modal = document.querySelector('.modal')
var closeModal = document.querySelector('#closeModal')
var tryAgain = document.querySelector('.tryAgain')
var textErrorModal = document.querySelector('.textErrorModal')

const resCar = await fetch("http://localhost:4000/api/carData", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})

const resJsonCar = await resCar.json()

var cantTotal = 0
var cantProducts = 0

if (resJsonCar.status == "Data Car") {
    const carData = resJsonCar.data;

    var conProducts = document.querySelector('.conProducts')

    if (carData != "") {
        var main2 = document.querySelector('.main2')

        main2.style.display = "none"

        carData.forEach(async (doc) => {
            var emailUser = doc.Correo
            var nameProduct = doc.Nombre.toLowerCase()
            var cantidad = doc.Cantidad

            const resProduct = await fetch("http://localhost:4000/api/productData", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const resProductJson = await resProduct.json()

            if (resProductJson.status == "Data Products") {

                const productData = resProductJson.data;

                var conProducts = document.querySelector('.conProducts')

                productData.forEach((doc) => {
                    if (nameProduct == doc.Nombre && doc.Estado == true) {
                        var product = document.createElement('div')
                        var leftProduct = document.createElement('div')
                        var img = document.createElement('img')
                        var conLeftProduct = document.createElement('div')
                        var name = document.createElement('h1')
                        var deleteCar = document.createElement('button')
                        var centerProduct = document.createElement('div')
                        var countMinus = document.createElement('i')
                        var count = document.createElement('p')
                        var countPlus = document.createElement('i')
                        var rightProduct = document.createElement('div')
                        var discount = document.createElement('div')
                        var priceDiscount = document.createElement('p')
                        var cantDiscount = document.createElement('span')
                        var price = document.createElement('p')

                        img.src = doc.Foto
                        name.textContent = (doc.Nombre).charAt(0).toUpperCase() + (doc.Nombre).slice(1)
                        deleteCar.textContent = "Eliminar"
                        count.textContent = cantidad

                        if (doc.Descuento != "") {
                            priceDiscount.textContent = `$${parseInt(doc.Precio).toLocaleString('ed-ED')}`
                            cantDiscount.textContent = `-${doc.Descuento}%`
                            price.textContent = `$${parseInt(parseInt(doc.Precio) - (parseInt(doc.Precio) * (parseInt(doc.Descuento) / 100))).toLocaleString('ed-ED')}`

                            discount.className = "discount"

                            rightProduct.appendChild(discount)
                            discount.appendChild(priceDiscount)
                            discount.appendChild(cantDiscount)
                        } else {
                            price.textContent = `$${parseInt(doc.Precio).toLocaleString('ed-ED')}`
                        }

                        product.className = "product"
                        leftProduct.className = "leftProduct"
                        conLeftProduct.className = "conLeftProduct"
                        centerProduct.className = "centerProduct"
                        countMinus.className = "ph-bold ph-minus"
                        countPlus.className = "ph-bold ph-plus"
                        rightProduct.className = "rightProduct"

                        conProducts.appendChild(product)
                        product.appendChild(leftProduct)
                        leftProduct.appendChild(img)
                        leftProduct.appendChild(conLeftProduct)
                        conLeftProduct.appendChild(name)
                        conLeftProduct.appendChild(deleteCar)
                        product.appendChild(centerProduct)
                        centerProduct.appendChild(countMinus)
                        centerProduct.appendChild(count)
                        centerProduct.appendChild(countPlus)
                        product.appendChild(rightProduct)
                        rightProduct.appendChild(price)

                        if (doc.Descuento != "") {
                            cantTotal += (doc.Precio - (doc.Precio * (doc.Descuento / 100))) * cantidad
                        } else {
                            cantTotal += parseInt(doc.Precio) * cantidad
                        }

                        cantProducts++

                        var compraCant = document.querySelector('.compraCant')
                        var compraPrice = document.querySelector('.compraPrice')

                        compraCant.textContent = `Productos(${cantProducts})`
                        compraPrice.textContent = `$ ${cantTotal.toLocaleString('ed-ED')}`

                        var totalEnvio = document.querySelector('.totalEnvio')

                        totalEnvio.textContent = `$${parseInt(cantTotal + 5000).toLocaleString('ed-ED')}`

                        var contador = parseInt(count.textContent)

                        countMinus.addEventListener('click', async () => {
                            const resUpdateCar = await fetch("http://localhost:4000/api/updateCar", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    Name: doc.Nombre,
                                    Cant: parseInt(count.textContent) - 1,
                                    Correo: emailUser
                                })
                            })

                            const resUpdateCarJson = await resUpdateCar.json()

                            if (resUpdateCarJson.status == "Update Correct") {
                                if (contador > 1) {
                                    contador--
                                    count.textContent = contador

                                    if (doc.Descuento != "") {
                                        cantTotal -= doc.Precio - (doc.Precio * (doc.Descuento / 100))

                                        compraPrice.textContent = `$ ${cantTotal.toLocaleString('ed-ED')}`
                                        totalEnvio.textContent = `$${parseInt(cantTotal + 5000).toLocaleString('ed-ED')}`
                                    } else {
                                        cantTotal -= doc.Precio

                                        compraPrice.textContent = `$ ${cantTotal.toLocaleString('ed-ED')}`
                                        totalEnvio.textContent = `$${parseInt(cantTotal + 5000).toLocaleString('ed-ED')}`
                                    }
                                } else {
                                    textErrorModal.textContent = "No puedes pedir menos de 1 producto"
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
                            } else {
                                textErrorModal.textContent = resUpdateCarJson.message
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

                        deleteCar.addEventListener('click', async () => {
                            const resDeleteCar = await fetch("http://localhost:4000/api/deleteCar", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    Name: doc.Nombre,
                                    Cant: count.textContent,
                                    Correo: emailUser
                                })
                            })

                            const resDeleteCarJson = await resDeleteCar.json()

                            if (resDeleteCarJson.status == "Delete Correct") {
                                location.reload()
                            } else {
                                textErrorModal.textContent = resDeleteCarJson.message
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

                        countPlus.addEventListener('click', async () => {
                            const resUpdateCar = await fetch("http://localhost:4000/api/updateCar", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    Name: doc.Nombre,
                                    Cant: parseInt(count.textContent) + 1,
                                    Correo: emailUser
                                })
                            })

                            const resUpdateCarJson = await resUpdateCar.json()

                            if (resUpdateCarJson.status == "Update Correct") {
                                if (contador < 10) {
                                    contador++
                                    count.textContent = contador

                                    if (doc.Descuento != "") {
                                        cantTotal += parseInt(doc.Precio - (doc.Precio * (doc.Descuento / 100)))

                                        compraPrice.textContent = `$ ${cantTotal.toLocaleString('ed-ED')}`
                                        totalEnvio.textContent = `$${parseInt(cantTotal + 5000).toLocaleString('ed-ED')}`
                                    } else {
                                        cantTotal += parseInt(doc.Precio)

                                        compraPrice.textContent = `$ ${cantTotal.toLocaleString('ed-ED')}`
                                        totalEnvio.textContent = `$${parseInt(cantTotal + 5000).toLocaleString('ed-ED')}`
                                    }
                                } else {
                                    textErrorModal.textContent = "Puedes pedir hasta un maximo de 10 productos"
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
                            } else {
                                textErrorModal.textContent = resUpdateCarJson.message
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
                    }
                })

            }
        })
    } else {
        var main = document.querySelector('.main')
        var main2 = document.querySelector('.main2')

        main.style.display = "none"
        main2.style.display = "flex"
    }
} else {
    textErrorModal.textContent = resJsonCar.message
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

var menu = document.querySelector('.menu')
var conMenu = document.querySelector('.conMenu')

conMenu.addEventListener('click', () => {
    menu.classList.toggle('active')
    sidebar.classList.toggle('ocult')
})

var btnConfig = document.querySelector('.btnConfig')

btnConfig.addEventListener('click', () => {
    window.location.href = "/user/config"
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

var btnPay = document.querySelector('.btnPay')

btnPay.addEventListener('click', async () => {
    if (resJson.data.Barrio != "") {
        if (resJson.data.Direccion != "") {
            if (resJson.data.Telefono != "") {
                loader.classList.remove('active')
                var product = []

                const resCar = await fetch("http://localhost:4000/api/carData", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const resJsonCar = await resCar.json()
                const carData = resJsonCar.data

                for (const doc of carData) {
                    var nombreCar = doc.Nombre
                    var cant = parseInt(doc.Cantidad)

                    const resProduct = await fetch("http://localhost:4000/api/productData", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    const resProductJson = await resProduct.json()

                    if (resProductJson.status === "Data Products") {
                        const productData = resProductJson.data;

                        var precio

                        productData.forEach((doc) => {
                            if (doc.Estado == true) {
                                if (doc.Descuento != "") {
                                    precio = parseInt(doc.Precio) - (parseInt(doc.Precio) * (doc.Descuento / 100))
                                } else {
                                    precio = parseInt(doc.Precio)
                                }

                                if (nombreCar.toLowerCase() === doc.Nombre.toLowerCase()) {
                                    product.push({
                                        nombre: doc.Nombre,
                                        descripcion: doc.Descripcion,
                                        foto: doc.Foto,
                                        precio: precio,
                                        cantidad: cant
                                    })
                                }
                            }
                        })
                    }
                }

                const resPay = await fetch('/api/payment', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        products: product
                    })
                })
                const dataPay = await resPay.json()

                if (dataPay) {
                    window.location.href = dataPay.url
                }
            } else {
                textErrorModal.textContent = "Para poder enviar tu pedido, necesitamos saber tu numero de telefono, actualiza la informacion en tu perfil"
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
        } else {
            textErrorModal.textContent = "Para poder enviar tu pedido, necesitamos saber la Direccion en el que vives, actualiza la informacion en tu perfil"
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
    } else {
        textErrorModal.textContent = "Para poder enviar tu pedido, necesitamos saber el Barrio en el que vives, actualiza la informacion en tu perfil"
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
