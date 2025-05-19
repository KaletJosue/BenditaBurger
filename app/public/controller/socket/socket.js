import { io } from 'https://cdn.socket.io/4.6.1/socket.io.esm.min.js';

export const socket = io();

var loader = document.querySelector('.loader')
var toast = document.querySelector('.toast')
var textToast = document.querySelector('.textToast')

socket.on("notificacion-estado-pedido", async (data) => {
    if (location.href == 'http://localhost:4000/user/delivery') {
        toast.classList.add('active')
        textToast.textContent = "Tu pedido recibio nuevas actualizaciones, ya puedes verlas"

        setTimeout(() => {
            toast.classList.remove('active')
        }, 5000)

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

            var sidebar = document.querySelector('.sidebar')
            var menu = document.querySelector('.menu')

            if (orderData != '') {
                main2.style.display = 'none'
                main.style.display = ''
                search.style.display = ''

                var tbody = document.querySelector('.tbody')

                tbody.innerHTML = ''

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

                        if ((btnEstado.textContent).toLowerCase() == "preparacion") {
                            progress.style.display = "flex"
                            setTimeout(() => {
                                conOne.classList.add('active')
                            }, 200)
                        } else if ((btnEstado.textContent).toLowerCase() == "enviado") {
                            progress.style.display = "flex"
                            setTimeout(() => {
                                conOne.classList.add('active')
                            }, 200)
                            setTimeout(() => {
                                conTwo.classList.add('active')
                            }, 250)
                        } else if ((btnEstado.textContent).toLowerCase() == "cerca") {
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
                        } else if ((btnEstado.textContent).toLowerCase() == "entregado") {
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
                        } else if ((btnEstado.textContent).toLowerCase() == "cancelado") {
                            progress.style.display = "none"
                            cancel.style.display = "flex"

                            var motivoCancel = document.querySelector('.motivoCancel')
                            motivoCancel.textContent = doc.Motivo
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
                        sidebar.classList.remove('ocult')
                        menu.classList.remove('active')

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
    } else {
        toast.classList.add('active')
        toast.style.cursor = "pointer"
        textToast.textContent = "Tu pedido recibio nuevas actualizaciones (presiona esta alerta para dirigirte a los pedidos)"

        setTimeout(() => {
            toast.classList.remove('active')
        }, 5000)

        toast.addEventListener('click', () => {
            window.location.href = "/user/delivery"
        })
    }
});

socket.on("notificacion-estado-pedido-staff", async (data) => {
    if (location.href == 'http://localhost:4000/admin/delivery' || location.href == 'http://localhost:4000/checker/delivery') {
        toast.classList.add('active')
        textToast.textContent = `El pedido del usuario ${data.nombre} ha recibido actualizaciones`

        setTimeout(() => {
            toast.classList.remove('active')
        }, 5000)

        const resOrder = await fetch("http://localhost:4000/api/ordersDataAdmin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const resJsonOrder = await resOrder.json()

        if (resJsonOrder.status == "Data Orders") {
            const orderData = resJsonOrder.data;

            var sidebar = document.querySelector('.sidebar')
            var menu = document.querySelector('.menu')

            const main2 = document.querySelector('.main2')
            const main = document.querySelector('.main')
            const search = document.querySelector('.search')

            if (orderData != '') {
                main2.style.display = 'none'
                main.style.display = ''
                search.style.display = ''

                var tbody = document.querySelector('.tbody')

                tbody.innerHTML = ''

                var imgDetails = document.querySelector('.imgDetails')
                var nameDetails = document.querySelector('.nameDetails')
                var phoneDetails = document.querySelector('.phoneDetails')
                var methodDetails = document.querySelector('.methodDetails')
                var gmailDetails = document.querySelector('.gmailDetails')
                var directionDetails = document.querySelector('.directionDetails')
                var dateDetails = document.querySelector('.dateDetails')
                var hourDetails = document.querySelector('.hourDetails')
                var statusDetails = document.querySelector('.statusDetails')
                var descriptionDetails = document.querySelector('.descriptionDetails')

                let fecha = new Date();
                let dia = String(fecha.getDate()).padStart(2, '0');
                const mes = String(fecha.getMonth() + 1).padStart(2, '0');
                let anio = String(fecha.getFullYear()).slice(-2);

                let fechaActual = `${dia} / ${mes} / ${anio}`;

                var band

                orderData.forEach(async (doc) => {

                    if (fechaActual == doc.Fecha) {
                        band = true

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
                            phoneDetails.textContent = doc.Telefono
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
                            descriptionDetails.textContent = doc.Descripcion

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
                    } else {
                        band = false
                    }

                })

                if (band == false) {
                    var textMain2 = document.querySelector('.textMain2')

                    main.style.display = 'none'
                    search.style.display = 'none'

                    main2.style.display = "flex"
                    textMain2.textContent = "Ningun usuario ha realizado un pedido el dia de hoy, espera un poco"
                }

            } else {
                main.style.display = 'none'
                search.style.display = 'none'
            }
        }
    } else {
        toast.classList.add('active')
        toast.style.cursor = "pointer"
        textToast.textContent = `El pedido del usuario ${data.nombre} recibio nuevas actualizaciones (presiona esta alerta para dirigirte a los pedidos)`

        setTimeout(() => {
            toast.classList.remove('active')
        }, 5000)

        if (location.href == 'http://localhost:4000/admin' || location.href == 'http://localhost:4000/admin/product' || location.href == 'http://localhost:4000/admin/section' || location.href == 'http://localhost:4000/admin/sale' || location.href == 'http://localhost:4000/admin/statistic' || location.href == 'http://localhost:4000/admin/expenses' || location.href == 'http://localhost:4000/admin/inventory' || location.href == 'http://localhost:4000/admin/config') {
            toast.addEventListener('click', () => {
                window.location.href = "/admin/delivery"
            })
        } else if (location.href == 'http://localhost:4000/checker' || location.href == 'http://localhost:4000/checker/inventory' || location.href == 'http://localhost:4000/checker/config') {
            toast.addEventListener('click', () => {
                window.location.href = "/checker/delivery"
            })
        }
    }
});

socket.on("notificacion-nuevo-pedido", async (data) => {
    if (location.href == 'http://localhost:4000/admin/delivery' || location.href == 'http://localhost:4000/checker/delivery') {
        toast.classList.add('active')
        textToast.textContent = `El usuario ${data.nombre} ha realizado un pedido`

        setTimeout(() => {
            toast.classList.remove('active')
        }, 5000)

        const resOrder = await fetch("http://localhost:4000/api/ordersDataAdmin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const resJsonOrder = await resOrder.json()

        if (resJsonOrder.status == "Data Orders") {
            const orderData = resJsonOrder.data;

            var sidebar = document.querySelector('.sidebar')
            var menu = document.querySelector('.menu')

            const main2 = document.querySelector('.main2')
            const main = document.querySelector('.main')
            const search = document.querySelector('.search')

            if (orderData != '') {
                main2.style.display = 'none'
                main.style.display = ''
                search.style.display = ''

                var tbody = document.querySelector('.tbody')

                tbody.innerHTML = ''

                var imgDetails = document.querySelector('.imgDetails')
                var nameDetails = document.querySelector('.nameDetails')
                var phoneDetails = document.querySelector('.phoneDetails')
                var methodDetails = document.querySelector('.methodDetails')
                var gmailDetails = document.querySelector('.gmailDetails')
                var directionDetails = document.querySelector('.directionDetails')
                var dateDetails = document.querySelector('.dateDetails')
                var hourDetails = document.querySelector('.hourDetails')
                var statusDetails = document.querySelector('.statusDetails')
                var descriptionDetails = document.querySelector('.descriptionDetails')

                let fecha = new Date();
                let dia = String(fecha.getDate()).padStart(2, '0');
                const mes = String(fecha.getMonth() + 1).padStart(2, '0');
                let anio = String(fecha.getFullYear()).slice(-2);

                let fechaActual = `${dia} / ${mes} / ${anio}`;

                var band

                orderData.forEach(async (doc) => {

                    if (fechaActual == doc.Fecha) {
                        band = true

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
                            phoneDetails.textContent = doc.Telefono
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
                            descriptionDetails.textContent = doc.Descripcion

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
                    } else {
                        band = false
                    }

                })

                if (band == false) {
                    var textMain2 = document.querySelector('.textMain2')

                    main.style.display = 'none'
                    search.style.display = 'none'

                    main2.style.display = "flex"
                    textMain2.textContent = "Ningun usuario ha realizado un pedido el dia de hoy, espera un poco"
                }

            } else {
                main.style.display = 'none'
                search.style.display = 'none'
            }
        }
    } else {
        toast.classList.add('active')
        toast.style.cursor = "pointer"
        textToast.textContent = `El usuario ${data.nombre} ha realizado un nuevo pedido (presiona esta alerta para dirigirte a los pedidos)`

        setTimeout(() => {
            toast.classList.remove('active')
        }, 5000)

        if (location.href == 'http://localhost:4000/admin' || location.href == 'http://localhost:4000/admin/product' || location.href == 'http://localhost:4000/admin/section' || location.href == 'http://localhost:4000/admin/sale' || location.href == 'http://localhost:4000/admin/statistic' || location.href == 'http://localhost:4000/admin/expenses' || location.href == 'http://localhost:4000/admin/inventory' || location.href == 'http://localhost:4000/admin/config') {
            toast.addEventListener('click', () => {
                window.location.href = "/admin/delivery"
            })
        } else if (location.href == 'http://localhost:4000/checker' || location.href == 'http://localhost:4000/checker/inventory' || location.href == 'http://localhost:4000/checker/config') {
            toast.addEventListener('click', () => {
                window.location.href = "/checker/delivery"
            })
        }
    }
});