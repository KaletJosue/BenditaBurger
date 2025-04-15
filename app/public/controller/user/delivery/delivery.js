var loader = document.querySelector('.loader')

window.onload = function () {
    loader.classList.add('active')
}

var btnConfig = document.querySelector('.btnConfig')

btnConfig.addEventListener('click', () => {
    window.location.href = "/user/config"
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

const resOrder = await fetch("http://localhost:4000/api/ordersData", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})

const resJsonOrder = await resOrder.json()

if (resJsonOrder.status == "Data Orders") {
    const orderData = resJsonOrder.data;

    const main2 = document.querySelector('.main2')
    const main = document.querySelector('.main')
    const search = document.querySelector('.search')

    if (orderData != '') {
        main2.style.display = 'none'

        var tbody = document.querySelector('.tbody')

        orderData.forEach((doc) => {
            var tr = document.createElement('tr')
            var direccion = document.createElement('th')
            var fecha = document.createElement('th')
            var hora = document.createElement('th')
            var metodoPago = document.createElement('th')
            var estado = document.createElement('th')
            var btnEstado = document.createElement('p')
            var montoTotal = document.createElement('th')
            var thDetails = document.createElement('th')
            var btnDetails = document.createElement('button')

            direccion.textContent = doc.Direccion + " " + doc.Barrio
            fecha.textContent = doc.Fecha
            hora.textContent = doc.Hora
            if (doc.MetodoPago == "card") {
                metodoPago.textContent = "Tarjeta"
            } else {
                metodoPago.textContent = doc.MetodoPago
            }
            btnEstado.textContent = doc.Estado
            montoTotal.textContent = `$${parseInt(doc.Total).toLocaleString('de-DE')}`
            btnDetails.textContent = 'Detalles'

            btnEstado.className = (doc.Estado).toLowerCase()

            tbody.appendChild(tr)
            tr.appendChild(direccion)
            tr.appendChild(fecha)
            tr.appendChild(hora)
            tr.appendChild(metodoPago)
            tr.appendChild(estado)
            estado.appendChild(btnEstado)
            tr.appendChild(montoTotal)
            tr.appendChild(thDetails)
            thDetails.appendChild(btnDetails)

            const modalUpdate = document.querySelector('.modalUpdate');
            const modalContentUpdate = document.querySelector('.conModalUpdate');
            const closeModalUpdate = document.querySelectorAll('#closeModalUpdate')

            btnEstado.addEventListener('click', () => {
                modalUpdate.style.display = 'flex'

                var conOne = document.querySelector('.conOne')
                var conTwo = document.querySelector('.conTwo')
                var conThree = document.querySelector('.conThree')
                var conFourth = document.querySelector('.conFourth')

                var progress = document.querySelector('.progress')
                var cancel = document.querySelector('.cancel')

                cancel.style.display = "none"

                if ((doc.Estado).toLowerCase() == "preparacion") {
                    progress.style.display = "flex"
                    setTimeout(() => {
                        conOne.classList.add('active')
                    }, 200)
                } else if ((doc.Estado).toLowerCase() == "enviado") {
                    progress.style.display = "flex"
                    setTimeout(() => {
                        conOne.classList.add('active')
                    }, 200)
                    setTimeout(() => {
                        conTwo.classList.add('active')
                    }, 250)
                } else if ((doc.Estado).toLowerCase() == "cerca") {
                    progress.style.display = "flex"
                    setTimeout(() => {
                        conOne.classList.add('active')
                    }, 200)
                    setTimeout(() => {
                        conTwo.classList.add('active')
                    }, 250)
                    setTimeout(() => {
                        conThree.classList.add('active')
                    }, 300)
                } else if ((doc.Estado).toLowerCase() == "entregado") {
                    progress.style.display = "flex"
                    setTimeout(() => {
                        conOne.classList.add('active')
                    }, 200)
                    setTimeout(() => {
                        conTwo.classList.add('active')
                    }, 250)
                    setTimeout(() => {
                        conThree.classList.add('active')
                    }, 300)
                    setTimeout(() => {
                        conFourth.classList.add('active')
                    }, 350)
                } else if ((doc.Estado).toLowerCase() == "cancelado") {
                    progress.style.display = "none"
                    cancel.style.display = "flex"
                }

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
                                conOne.classList.remove('active')
                                conTwo.classList.remove('active')
                                conThree.classList.remove('active')
                                conFourth.classList.remove('active')
                            }
                        });
                    }
                })
                closeModalUpdate.forEach((closeModalUpdate) => {
                    closeModalUpdate.addEventListener('click', () => {
                        gsap.to(modalContentUpdate, {
                            height: '0px',
                            duration: .2,
                            ease: 'power1.in',
                            onComplete: () => {
                                modalUpdate.style.display = 'none';
                                conOne.classList.remove('active')
                                conTwo.classList.remove('active')
                                conThree.classList.remove('active')
                                conFourth.classList.remove('active')
                            }
                        });
                    })
                })
            })

            const modalDetails = document.querySelector('.modalDetalis');
            const modalContentDetails = document.querySelector('.conModalDetails');
            const closeModalDetails = document.getElementById('closeModalDetails')

            var infoPedidio = document.querySelector('.infoPedido')

            btnDetails.addEventListener('click', () => {
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

                var dataProducts = doc.Productos

                dataProducts.forEach(async (product) => {
                    if (product.name != "Manejo, Logistica y Envio") {
                        const resProduct = await fetch("http://localhost:4000/api/productData", {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })

                        const resProductJson = await resProduct.json()

                        if (resProductJson.status == "Data Products") {
                            const productData = resProductJson.data;

                            if (product.quantity > 1) {
                                for (var i = 0; i < product.quantity; i++) {
                                    productData.forEach((docCar) => {
                                        if ((docCar.Nombre).toLowerCase() == (product.name).toLowerCase()) {
                                            var campoPedido = document.createElement('div')
                                            var imgCampoPedido = document.createElement('div')
                                            var img = document.createElement('img')
                                            var name = document.createElement('p')
                                            var price = document.createElement('p')

                                            img.src = docCar.Foto
                                            name.textContent = product.name
                                            price.textContent = `$${parseInt(docCar.Precio).toLocaleString('de-DE')}`

                                            campoPedido.className = "campoPedido"
                                            imgCampoPedido.className = "imgCampoPedido"

                                            infoPedidio.appendChild(campoPedido)
                                            campoPedido.appendChild(imgCampoPedido)
                                            imgCampoPedido.appendChild(img)
                                            imgCampoPedido.appendChild(name)
                                            campoPedido.appendChild(price)
                                        }
                                    })
                                }
                            } else {
                                productData.forEach((docCar) => {
                                    if ((docCar.Nombre).toLowerCase() == (product.name).toLowerCase()) {
                                        var campoPedido = document.createElement('div')
                                        var imgCampoPedido = document.createElement('div')
                                        var img = document.createElement('img')
                                        var name = document.createElement('p')
                                        var price = document.createElement('p')

                                        img.src = docCar.Foto
                                        name.textContent = product.name
                                        price.textContent = `$${parseInt(docCar.Precio).toLocaleString('de-DE')}`

                                        campoPedido.className = "campoPedido"
                                        imgCampoPedido.className = "imgCampoPedido"

                                        infoPedidio.appendChild(campoPedido)
                                        campoPedido.appendChild(imgCampoPedido)
                                        imgCampoPedido.appendChild(img)
                                        imgCampoPedido.appendChild(name)
                                        campoPedido.appendChild(price)
                                    }
                                })
                            }
                        }
                    } else {
                        var campoPedido = document.createElement('div')
                        var imgCampoPedido = document.createElement('div')
                        var img = document.createElement('img')
                        var name = document.createElement('p')
                        var price = document.createElement('p')

                        img.src = "/assets/logo.png"
                        name.textContent = "Envio y Logistica"
                        price.textContent = `$${parseInt(product.price).toLocaleString('de-DE')}`

                        campoPedido.className = "campoPedido"
                        imgCampoPedido.className = "imgCampoPedido"

                        infoPedidio.appendChild(campoPedido)
                        campoPedido.appendChild(imgCampoPedido)
                        imgCampoPedido.appendChild(img)
                        imgCampoPedido.appendChild(name)
                        campoPedido.appendChild(price)
                    }
                })
            })
            closeModalDetails.addEventListener('click', () => {
                gsap.to(modalContentDetails, {
                    filter: 'blur(10px)',
                    opacity: 0,
                    x: 1000,
                    ease: 'power1.in',
                    onComplete: () => {
                        modalDetails.style.display = 'none';
                        infoPedidio.innerHTML = ''
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
                            infoPedidio.innerHTML = ''
                        }
                    });
                }
            })
        })

    } else {
        main.style.display = 'none'
        search.style.display = 'none'
    }
}

// Search

var search = document.getElementById('search')

search.addEventListener("input", e => {
    document.querySelectorAll('.tbody tr').forEach(documento => {

        let originalString = documento.textContent;

        originalString.toLowerCase().includes(e.target.value.toLowerCase())
            ? documento.classList.remove("filtro")
            : documento.classList.add("filtro");
    });
});