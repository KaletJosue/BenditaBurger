var loader = document.querySelector('.loader')

window.onload = function () {
    loader.classList.add('active')
}

var modal = document.querySelector('.modal')
var closeModal = document.querySelector('#closeModal')
var tryAgain = document.querySelector('.tryAgain')
var textErrorModal = document.querySelector('.textErrorModal')

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

const resOrder = await fetch("http://localhost:4000/api/ordersDataAdmin", {
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

        orderData.forEach(async (doc) => {
            var imgDetails = document.querySelector('.imgDetails')
            var nameDetails = document.querySelector('.nameDetails')
            var phoneDetails = document.querySelector('.phoneDetails')
            var methodDetails = document.querySelector('.methodDetails')
            var gmailDetails = document.querySelector('.gmailDetails')
            var directionDetails = document.querySelector('.directionDetails')
            var dateDetails = document.querySelector('.dateDetails')
            var hourDetails = document.querySelector('.hourDetails')
            var statusDetails = document.querySelector('.statusDetails')

            var tr = document.createElement('tr')
            var thCLient = document.createElement('th')
            var divClient = document.createElement('div')
            var imgCLient = document.createElement('img')
            var nameCLient = document.createElement('name')
            var direccion = document.createElement('th')
            var fecha = document.createElement('th')
            var hora = document.createElement('th')
            var metodoPago = document.createElement('th')
            var estado = document.createElement('th')
            var btnEstado = document.createElement('p')
            var selectEstado = document.createElement('div')
            var estadoEnviado = document.createElement('h3')
            var estadoCancelado = document.createElement('h3')
            var estadoPreparacion = document.createElement('h3')
            var estadoEntregado = document.createElement('h3')
            var estadoCerca = document.createElement('h3')
            var montoTotal = document.createElement('th')
            var thDetails = document.createElement('th')
            var btnDetails = document.createElement('button')

            estadoEnviado.textContent = "Enviado"
            estadoCancelado.textContent = "Cancelado"
            estadoPreparacion.textContent = "Preparacion"
            estadoEntregado.textContent = "Entregado"
            estadoCerca.textContent = "Cerca"

            imgCLient.src = doc.Foto ? doc.Foto : "/assets/profile-5.jpg"
            nameCLient.textContent = doc.Nombre
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
            divClient.className = "divClient"
            selectEstado.className = "selectEstado"

            tbody.appendChild(tr)
            tr.appendChild(thCLient)
            thCLient.appendChild(divClient)
            divClient.appendChild(imgCLient)
            divClient.appendChild(nameCLient)
            tr.appendChild(direccion)
            tr.appendChild(fecha)
            tr.appendChild(hora)
            tr.appendChild(metodoPago)
            tr.appendChild(estado)
            estado.appendChild(btnEstado)
            estado.appendChild(selectEstado)
            selectEstado.appendChild(estadoEnviado)
            selectEstado.appendChild(estadoCancelado)
            selectEstado.appendChild(estadoPreparacion)
            selectEstado.appendChild(estadoEntregado)
            selectEstado.appendChild(estadoCerca)
            tr.appendChild(montoTotal)
            tr.appendChild(thDetails)
            thDetails.appendChild(btnDetails)

            estadoEnviado.addEventListener('click', async () => {
                loader.classList.remove('active')

                const resUpdateEstado = await fetch("http://localhost:4000/api/updateEstado", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Correo: doc.Correo,
                        Direccion: doc.Direccion,
                        Barrio: doc.Barrio,
                        Estado: doc.Estado,
                        Total: doc.Total,
                        MetodoPago: doc.MetodoPago,
                        Productos: doc.Productos,
                        Fecha: doc.Fecha,
                        Hora: doc.Hora,
                        NuevoEstado: "Enviado"
                    })
                })

                const resUpdateEstadoJson = await resUpdateEstado.json()

                if (resUpdateEstadoJson.status == "Update correct") {
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

            estadoCancelado.addEventListener('click', () => {
                const modalUpdate = document.querySelector('.modalUpdate');
                const modalContentUpdate = document.querySelector('.conModalUpdate');
                const closeModalUpdate = document.getElementById('closeModalUpdate')

                modalUpdate.style.display = 'flex';

                gsap.fromTo(modalContentUpdate,
                    { backdropFilter: 'blur(0px)', height: 0, opacity: 0 },
                    {
                        height: 'auto',
                        opacity: 1,
                        backdropFilter: 'blur(90px)',
                        duration: .7,
                        ease: 'expo.out',
                    }
                );

                window.addEventListener('click', event => {
                    if (event.target === modalUpdate) {
                        gsap.to(modalContentUpdate, {
                            height: '0px',
                            duration: .2,
                            ease: 'power1.in',
                            onComplete: () => {
                                modalUpdate.style.display = 'none';
                            }
                        });
                    }
                });

                closeModalUpdate.addEventListener('click', () => {
                    gsap.to(modalContentUpdate, {
                        height: '0px',
                        duration: .2,
                        ease: 'power1.in',
                        onComplete: () => {
                            modalUpdate.style.display = 'none';
                        }
                    });
                });

                var inputNameUpdate = document.querySelector('.inputNameUpdate')

                var btnUpdate = document.querySelector('.btnUpdate')

                inputNameUpdate.addEventListener('input', () => {
                    if (inputNameUpdate.value.length != 0) {
                        btnUpdate.classList.add('active')
                        btnUpdate.disabled = false
                    } else {
                        btnUpdate.classList.remove('active')
                        btnUpdate.disabled = true
                    }
                })

                btnUpdate.addEventListener('click', async () => {
                    loader.classList.remove('active')

                    const resUpdateEstado = await fetch("http://localhost:4000/api/updateEstado", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            Correo: doc.Correo,
                            Direccion: doc.Direccion,
                            Barrio: doc.Barrio,
                            Estado: doc.Estado,
                            Total: doc.Total,
                            MetodoPago: doc.MetodoPago,
                            Productos: doc.Productos,
                            Fecha: doc.Fecha,
                            Hora: doc.Hora,
                            NuevoEstado: "Cancelado",
                            Motivo: inputNameUpdate.value
                        })
                    })

                    const resUpdateEstadoJson = await resUpdateEstado.json()

                    if (resUpdateEstadoJson.status == "Update correct") {
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

            estadoPreparacion.addEventListener('click', async () => {
                loader.classList.remove('active')

                const resUpdateEstado = await fetch("http://localhost:4000/api/updateEstado", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Correo: doc.Correo,
                        Direccion: doc.Direccion,
                        Barrio: doc.Barrio,
                        Estado: doc.Estado,
                        Total: doc.Total,
                        MetodoPago: doc.MetodoPago,
                        Productos: doc.Productos,
                        Fecha: doc.Fecha,
                        Hora: doc.Hora,
                        NuevoEstado: "Preparacion"
                    })
                })

                const resUpdateEstadoJson = await resUpdateEstado.json()

                if (resUpdateEstadoJson.status == "Update correct") {
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

            estadoEntregado.addEventListener('click', async () => {
                loader.classList.remove('active')

                const resUpdateEstado = await fetch("http://localhost:4000/api/updateEstado", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Correo: doc.Correo,
                        Direccion: doc.Direccion,
                        Barrio: doc.Barrio,
                        Estado: doc.Estado,
                        Total: doc.Total,
                        MetodoPago: doc.MetodoPago,
                        Productos: doc.Productos,
                        Fecha: doc.Fecha,
                        Hora: doc.Hora,
                        NuevoEstado: "Entregado"
                    })
                })

                const resUpdateEstadoJson = await resUpdateEstado.json()

                if (resUpdateEstadoJson.status == "Update correct") {
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

            estadoCerca.addEventListener('click', async () => {
                loader.classList.remove('active')

                const resUpdateEstado = await fetch("http://localhost:4000/api/updateEstado", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Correo: doc.Correo,
                        Direccion: doc.Direccion,
                        Barrio: doc.Barrio,
                        Estado: doc.Estado,
                        Total: doc.Total,
                        MetodoPago: doc.MetodoPago,
                        Productos: doc.Productos,
                        Fecha: doc.Fecha,
                        Hora: doc.Hora,
                        NuevoEstado: "Cerca"
                    })
                })

                const resUpdateEstadoJson = await resUpdateEstado.json()

                if (resUpdateEstadoJson.status == "Update correct") {
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

            const modalDetails = document.querySelector('.modalDetalis');
            const modalContentDetails = document.querySelector('.conModalDetails');
            const closeModalDetails = document.getElementById('closeModalDetails')

            var infoPedidio = document.querySelector('.infoPedido')

            btnDetails.addEventListener('click', () => {
                modalDetails.style.display = 'flex'

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
                
                sidebar.classList.remove('ocult')
                menu.classList.remove('active')

                imgDetails.src = doc.Foto ? doc.Foto : "/assets/profile-5.jpg"
                nameDetails.textContent = doc.Nombre
                if (doc.MetodoPago == "card") {
                    methodDetails.textContent = "Tarjeta"
                } else {
                    methodDetails.textContent = doc.MetodoPago
                }
                gmailDetails.textContent = doc.Correo
                directionDetails.textContent = doc.Direccion + " " + doc.Barrio
                dateDetails.textContent = doc.Fecha
                hourDetails.textContent = doc.Hora
                statusDetails.textContent = doc.Estado

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

                                            if (docCar.Descuento != '') {
                                                var precioDescuento = docCar.Precio - (docCar.Precio * (docCar.Descuento / 100))
                                                price.textContent = `$${parseInt(precioDescuento).toLocaleString('de-DE')}`
                                            } else {
                                                price.textContent = `$${parseInt(docCar.Precio).toLocaleString('de-DE')}`
                                            }

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

                                        if (docCar.Descuento != '') {
                                            var precioDescuento = docCar.Precio - (docCar.Precio * (docCar.Descuento / 100))
                                            price.textContent = `$${parseInt(precioDescuento).toLocaleString('de-DE')}`
                                        } else {
                                            price.textContent = `$${parseInt(docCar.Precio).toLocaleString('de-DE')}`
                                        }

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

            btnEstado.addEventListener('click', () => {
                var isCollapsed = selectEstado.style.height === '' || selectEstado.style.height === '2px' || selectEstado.style.height === '0px';

                if (isCollapsed == true) {
                    gsap.fromTo(selectEstado,
                        { height: 0, width: 0, opacity: 0, padding: 0 },
                        {
                            height: '190px',
                            width: '250px',
                            opacity: 1,
                            padding: '1rem',
                            duration: .5,
                            ease: 'elastic.out',
                        }
                    )
                } else {
                    gsap.to(selectEstado, {
                        height: 0,
                        width: 0,
                        filter: 'blur(20px)',
                        opacity: 0,
                        padding: 0,
                        duration: .2,
                        ease: 'power1',
                        onComplete: () => {
                            gsap.set(selectEstado, { clearProps: "all" });
                            isCollapsed = true
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

        console.log(originalString)
    });
});