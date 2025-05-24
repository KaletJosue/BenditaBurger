var loader = document.querySelector('.loader')

window.onload = function () {
    loader.classList.add('active')
}

var modal = document.querySelector('.modal')
var closeModal = document.querySelector('#closeModal')
var tryAgain = document.querySelector('.tryAgain')
var textErrorModal = document.querySelector('.textErrorModal')

var btnConfig = document.querySelector('.btnConfig')

btnConfig.addEventListener('click', () => {
    window.location.href = "/checker/config"
})

const modalFactura = document.querySelector('.modalFactura');
const conModalFactura = document.querySelector('.conModalFactura');
const closeModalFactura = document.querySelector('.closeModalFactura')

const openModalAdd = document.querySelector('.openModalAdd');
const modalAdd = document.querySelector('.modalAdd');
const closeModalAdd = document.querySelector('#closeModalAdd')
const cancelModalAdd = document.querySelector('.cancelModalAdd')

var openResumen = document.querySelectorAll('.product')
var containerResumen = document.querySelector('.conModalAdd')
var leftModalAdd = document.querySelector('.leftModalAdd')

var cancelPedido = document.querySelector('.cancel')

cancelPedido.addEventListener('click', () => {
    productosAgregados = []
    productosAgregadosBase = []
    containerResumen.classList.remove('active')
})

openModalAdd.addEventListener('click', () => {
    gsap.fromTo(modalAdd,
        { height: 0, opacity: 0 },
        {
            padding: '0.5rem',
            height: '100dvh',
            opacity: 1,
            duration: .2,
            ease: 'expo.out',
        }
    )
    closeModalAdd.addEventListener('click', () => {
        gsap.to(modalAdd, {
            height: '0px',
            padding: '0rem 1rem',
            duration: .2,
            ease: 'power1.in',
        });
    })
})

var btnCarry = document.querySelector('.carry')
var btnEat = document.querySelector('.eat')
var btnOrder = document.querySelector('.order')

var total = 0

const now = new Date();
const formatNumber = (n) => String(n).padStart(2, '0');
const fecha = `${formatNumber(now.getDate())} / ${formatNumber(now.getMonth() + 1)} / ${String(now.getFullYear()).slice(-2)}`;
const hora = `${formatNumber(now.getHours())} : ${formatNumber(now.getMinutes())}`;

btnOrder.addEventListener('click', async () => {
    gsap.to(modalContentSelectModo, {
        height: '0px',
        padding: '0rem',
        duration: .2,
        ease: 'power1.in',
        onComplete: () => {
            modalSelectModo.style.display = 'none';
        }
    });

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

                inputNameUpdate.value = ''
                inputDirectionUpdate.value = ''
                inputPhomeUpdate.value = ''
                inputDescriptionUpdate.value = ''

                btnUpdate.classList.remove('active')
                btnUpdate.disabled = true
            }
        });
    });

    var inputNameUpdate = document.querySelector('.inputNameUpdate')
    var inputDirectionUpdate = document.querySelector('.inputDirectionUpdate')
    var inputPhomeUpdate = document.querySelector('.inputPhomeUpdate')
    var inputDescriptionUpdate = document.querySelector('.inputDescriptionUpdate')
    var inputBarrioUpdate = document.querySelector('.inputBarrioUpdate')

    var btnUpdate = document.querySelector('.btnUpdate')

    inputNameUpdate.addEventListener('input', () => {
        if (inputBarrioUpdate.value.length != 0 && inputNameUpdate.value.length != 0 && inputDirectionUpdate.value.length != 0 && inputPhomeUpdate.value.length != 0 && inputDescriptionUpdate.value.length != 0) {
            btnUpdate.classList.add('active')
            btnUpdate.disabled = false
        } else {
            btnUpdate.classList.remove('active')
            btnUpdate.disabled = true
        }
    })

    inputDirectionUpdate.addEventListener('input', () => {
        if (inputBarrioUpdate.value.length != 0 && inputNameUpdate.value.length != 0 && inputDirectionUpdate.value.length != 0 && inputPhomeUpdate.value.length != 0 && inputDescriptionUpdate.value.length != 0) {
            btnUpdate.classList.add('active')
            btnUpdate.disabled = false
        } else {
            btnUpdate.classList.remove('active')
            btnUpdate.disabled = true
        }
    })

    inputPhomeUpdate.addEventListener('input', () => {
        if (inputBarrioUpdate.value.length != 0 && inputNameUpdate.value.length != 0 && inputDirectionUpdate.value.length != 0 && inputPhomeUpdate.value.length != 0 && inputDescriptionUpdate.value.length != 0) {
            btnUpdate.classList.add('active')
            btnUpdate.disabled = false
        } else {
            btnUpdate.classList.remove('active')
            btnUpdate.disabled = true
        }
    })

    inputDescriptionUpdate.addEventListener('input', () => {
        if (inputBarrioUpdate.value.length != 0 && inputNameUpdate.value.length != 0 && inputDirectionUpdate.value.length != 0 && inputPhomeUpdate.value.length != 0 && inputDescriptionUpdate.value.length != 0) {
            btnUpdate.classList.add('active')
            btnUpdate.disabled = false
        } else {
            btnUpdate.classList.remove('active')
            btnUpdate.disabled = true
        }
    })

    inputBarrioUpdate.addEventListener('input', () => {
        if (inputBarrioUpdate.value.length != 0 && inputNameUpdate.value.length != 0 && inputDirectionUpdate.value.length != 0 && inputPhomeUpdate.value.length != 0 && inputDescriptionUpdate.value.length != 0) {
            btnUpdate.classList.add('active')
            btnUpdate.disabled = false
        } else {
            btnUpdate.classList.remove('active')
            btnUpdate.disabled = true
        }
    })

    btnUpdate.addEventListener('click', async () => {
        loader.classList.remove('active')

        const resNewOrder = await fetch("http://localhost:4000/api/newOrderChecker", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Correo: "benditaburger54@gmail.com",
                Nombre: inputNameUpdate.value,
                Foto: 'https://firebasestorage.googleapis.com/v0/b/oasiscol.appspot.com/o/logoAmarillo.png?alt=media&token=ef53c12b-64fe-4004-b4dd-a2840b2106fb',
                Direccion: inputDirectionUpdate.value,
                Barrio: inputBarrioUpdate.value,
                Telefono: inputPhomeUpdate.value,
                Estado: 'Preparacion',
                Total: calcularPrecio(),
                MetodoPago: '',
                Productos: productosAgregadosBase,
                Fecha: fecha,
                Hora: hora,
                Descripcion: inputDescriptionUpdate.value,
                Pago: "No pago"
            })
        })

        const resJsonNewOrder = await resNewOrder.json()

        if (resJsonNewOrder.status == "New Order correct") {
            location.reload()
        }
    })

})

btnCarry.addEventListener('click', async () => {
    gsap.to(modalContentSelectModo, {
        height: '0px',
        padding: '0rem',
        duration: .2,
        ease: 'power1.in',
        onComplete: () => {
            modalSelectModo.style.display = 'none';
        }
    });
    gsap.to(modalAdd, {
        height: '0px',
        padding: '0rem 1rem',
        duration: .2,
        ease: 'power1.in',
    });

    loader.classList.remove('active')

    const resNewOrder = await fetch("http://localhost:4000/api/newOrderChecker", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Correo: "benditaburger54@gmail.com",
            Nombre: "Para Llevar",
            Foto: 'https://firebasestorage.googleapis.com/v0/b/oasiscol.appspot.com/o/logoAmarillo.png?alt=media&token=ef53c12b-64fe-4004-b4dd-a2840b2106fb',
            Direccion: 'Cll 10 # 6 - 33',
            Barrio: 'Madrid',
            Telefono: '3229645600',
            Estado: 'En preparacion',
            Total: calcularPrecio(),
            MetodoPago: '',
            Productos: productosAgregadosBase,
            Fecha: fecha,
            Hora: hora,
            Descripcion: "Restaurante con las mejores hamburguesas de Madrid",
            Pago: "No pago"
        })
    })

    const resJsonNewOrder = await resNewOrder.json()

    if (resJsonNewOrder.status == "New Order correct") {
        location.reload()
    }
})

const modalSeletTable = document.querySelector('.modalSeletTable');
const conModalSeletTable = document.querySelector('.conModalSeletTable');

var mesas = document.querySelectorAll('.mesas')

mesas.forEach(mesa => {
    mesa.addEventListener('click', async () => {
        gsap.to(modalContentSelectModo, {
            height: '0px',
            padding: '0rem',
            duration: .2,
            ease: 'power1.in',
            onComplete: () => {
                modalSelectModo.style.display = 'none';
            }
        });
        gsap.to(modalAdd, {
            height: '0px',
            padding: '0rem 1rem',
            duration: .2,
            ease: 'power1.in',
        });

        loader.classList.remove('active')

        const resNewOrder = await fetch("http://localhost:4000/api/newOrderChecker", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Correo: "benditaburger54@gmail.com",
                Nombre: mesa.textContent,
                Foto: 'https://firebasestorage.googleapis.com/v0/b/oasiscol.appspot.com/o/logoAmarillo.png?alt=media&token=ef53c12b-64fe-4004-b4dd-a2840b2106fb',
                Direccion: 'Cll 10 # 6 - 33',
                Barrio: 'Madrid',
                Telefono: '3229645600',
                Estado: 'En preparacion',
                Total: calcularPrecio(),
                MetodoPago: '',
                Productos: productosAgregadosBase,
                Fecha: fecha,
                Hora: hora,
                Descripcion: "Restaurante con las mejores hamburguesas de Madrid",
                Pago: "No pago"
            })
        })

        const resJsonNewOrder = await resNewOrder.json()

        if (resJsonNewOrder.status == "New Order correct") {
            location.reload()
        }
    })
})

btnEat.addEventListener('click', () => {
    gsap.to(modalContentSelectModo, {
        height: '0px',
        padding: '0rem',
        duration: .2,
        ease: 'power1.in',
        onComplete: () => {
            modalSelectModo.style.display = 'none';
        }
    });

    modalSeletTable.style.display = 'flex'
    gsap.fromTo(conModalSeletTable,
        { backdropFilter: 'blur(0px)', height: 0, opacity: 0 },
        {
            padding: '1rem',
            height: 'auto',
            opacity: 1,
            backdropFilter: 'blur(90px)',
            duration: .7,
            ease: 'expo.out',
        }
    )

    window.addEventListener('click', event => {
        if (event.target == modalSeletTable) {
            gsap.to(conModalSeletTable, {
                height: '0px',
                padding: '0rem',
                duration: .2,
                ease: 'power1.in',
                onComplete: () => {
                    modalSeletTable.style.display = 'none';
                }
            });
        }
    })
})

var btnConfir = document.querySelector('.confir')
const modalSelectModo = document.querySelector('.modalSelectModo');
const modalContentSelectModo = document.querySelector('.conModalSelectModo');

btnConfir.addEventListener('click', () => {
    modalSelectModo.style.display = 'flex'

    gsap.fromTo(modalContentSelectModo,
        { backdropFilter: 'blur(0px)', height: 0, opacity: 0 },
        {
            padding: '1rem',
            height: '300px',
            opacity: 1,
            backdropFilter: 'blur(90px)',
            duration: .7,
            ease: 'expo.out',
        }
    )

    window.addEventListener('click', event => {
        if (event.target == modalSelectModo) {
            gsap.to(modalContentSelectModo, {
                height: '0px',
                padding: '0rem',
                duration: .2,
                ease: 'power1.in',
                onComplete: () => {
                    modalSelectModo.style.display = 'none';
                }
            });
        }
    })
})

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

var productosAgregados = []
var productosAgregadosBase = []
var conRightModalAdd = document.querySelector('.conRightModalAdd')

const resProduct = await fetch("http://localhost:4000/api/productData", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
});

var montoTotal = document.querySelector('.montoTotal')

function calcularPrecio() {
    var pagoTotal = 0

    productosAgregados.forEach((doc) => {
        pagoTotal += (parseInt(doc.price) * parseInt(doc.quaintity))
    })

    return pagoTotal
}

function renderizarProducts() {
    if (productosAgregados != "") {
        montoTotal.textContent = `$${calcularPrecio().toLocaleString('de-DE')}`

        conRightModalAdd.innerHTML = '';

        productosAgregados.forEach((prod) => {
            const divProduct = document.createElement('div');
            const iconTrash = document.createElement('i');
            const leftProduct = document.createElement('div');
            const imgProduct = document.createElement('img');
            const textLeftProduct = document.createElement('div');
            const nombre = document.createElement('h3');
            const price = document.createElement('p');
            const plusMinus = document.createElement('div');
            const iconPlus = document.createElement('i');
            const input = document.createElement('input');
            const iconMinus = document.createElement('i');

            input.type = 'number';

            divProduct.className = "productPedido";
            leftProduct.className = "leftProductPedido";
            textLeftProduct.className = "textLeftProductPedido";
            plusMinus.className = "plusMinus";
            iconTrash.className = "fa-solid fa-trash";
            iconPlus.className = "fa-solid fa-plus";
            iconMinus.className = "fa-solid fa-minus";

            imgProduct.src = prod.foto;
            nombre.textContent = prod.name;
            price.textContent = `$${parseInt(prod.price).toLocaleString('de-DE')}`;
            input.value = prod.quaintity;

            divProduct.appendChild(leftProduct);
            divProduct.appendChild(iconTrash);
            leftProduct.appendChild(imgProduct);
            leftProduct.appendChild(textLeftProduct);
            textLeftProduct.appendChild(nombre);
            textLeftProduct.appendChild(price);
            textLeftProduct.appendChild(plusMinus);
            plusMinus.appendChild(iconPlus);
            plusMinus.appendChild(input);
            plusMinus.appendChild(iconMinus);
            conRightModalAdd.appendChild(divProduct);

            iconPlus.addEventListener('click', () => {
                let product = productosAgregados.find(p => p.name == prod.name)
                let productBase = productosAgregadosBase.find(p => p.name == (prod.name).toLowerCase())

                if (product && productBase) {
                    product.quaintity += 1
                    productBase.quaintity += 1

                    input.value = prod.quaintity

                    montoTotal.textContent = `$${calcularPrecio().toLocaleString('de-DE')}`
                }
            })

            iconMinus.addEventListener('click', () => {
                let product = productosAgregados.find(p => p.name == prod.name)
                let productBase = productosAgregadosBase.find(p => p.name == (prod.name).toLowerCase())

                if (product && productBase) {
                    if (product.quaintity > 1) {
                        product.quaintity -= 1
                        productBase.quaintity -= 1

                        input.value = prod.quaintity

                        montoTotal.textContent = `$${calcularPrecio().toLocaleString('de-DE')}`
                    } else {
                        textErrorModal.textContent = "No puedes pedir menos de 1 producto";
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

            input.addEventListener('input', () => {
                let product = productosAgregados.find(p => p.name == prod.name)
                let productBase = productosAgregadosBase.find(p => p.name == (prod.name).toLowerCase())

                if (product && productBase) {
                    if (input.value < 1 || input.value == "") {
                        input.value = 1
                    }

                    product.quaintity = input.value
                    productBase.quaintity = input.value

                    input.value = prod.quaintity

                    console.log(productosAgregadosBase)

                    montoTotal.textContent = `$${calcularPrecio().toLocaleString('de-DE')}`
                }
            })

            iconTrash.addEventListener('click', () => {
                let index = productosAgregados.findIndex(p => p.name == prod.name)
                let indexBase = productosAgregadosBase.findIndex(p => p.name == (prod.name).toLowerCase())

                if (index !== -1 && indexBase !== -1) {
                    productosAgregados.splice(index, 1);
                    productosAgregadosBase.splice(index, 1);
                }

                renderizarProducts()
                montoTotal.textContent = `$${calcularPrecio().toLocaleString('de-DE')}`
            })
        });
    } else {
        containerResumen.classList.remove('active')
    }
}

const resProductJson = await resProduct.json();

if (resProductJson.status == "Data Products") {
    const productData = resProductJson.data;

    productData.forEach((doc) => {
        const divProduct = document.createElement('div');
        const img = document.createElement('img');
        const name = document.createElement('h1');
        const category = document.createElement('p');
        const price = document.createElement('h3');

        const nombreCapitalizado = doc.Nombre.charAt(0).toUpperCase() + doc.Nombre.slice(1);
        const categoriaCapitalizada = doc.Categoria.charAt(0).toUpperCase() + doc.Categoria.slice(1);

        img.src = doc.Foto;
        name.textContent = nombreCapitalizado;
        category.textContent = categoriaCapitalizada;
        var precioDescuento = 0
        if (doc.Descuento != "") {
            precioDescuento = (parseInt(doc.Precio) - ((doc.Descuento / 100) * parseInt(doc.Precio)))
            price.textContent = `$${(parseInt(doc.Precio) - ((doc.Descuento / 100) * parseInt(doc.Precio))).toLocaleString('de-DE')}`
        } else {
            price.textContent = `$${parseInt(doc.Precio).toLocaleString('de-DE')}`
            precioDescuento = parseInt(doc.Precio)
        }

        divProduct.className = "product";
        divProduct.appendChild(img);
        divProduct.appendChild(name);
        divProduct.appendChild(category);
        divProduct.appendChild(price);
        leftModalAdd.appendChild(divProduct);

        divProduct.addEventListener('click', () => {
            const existe = productosAgregados.find(prodcut => (prodcut.name).toLowerCase() == doc.Nombre)

            if (!existe) {
                productosAgregados.push({
                    name: nombreCapitalizado,
                    price: precioDescuento,
                    quaintity: 1,
                    foto: doc.Foto
                })

                productosAgregadosBase.push({
                    name: doc.Nombre,
                    price: precioDescuento,
                    quaintity: 1,
                })

                renderizarProducts()

            } else {
                textErrorModal.textContent = "Este producto ya esta agregado, revisalo";
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

            containerResumen.classList.add('active')
        })
    });

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

// Search

var search = document.getElementById('search')

search.addEventListener("input", e => {
    document.querySelectorAll('.product').forEach(documento => {

        let originalString = documento.textContent;

        originalString.toLowerCase().includes(e.target.value.toLowerCase())
            ? documento.classList.remove("filtro")
            : documento.classList.add("filtro");

    });
});

// Search2

var search2 = document.getElementById('search2')

search2.addEventListener("input", e => {
    document.querySelectorAll('.tbody tr').forEach(documento => {

        let originalString = documento.textContent;

        originalString.toLowerCase().includes(e.target.value.toLowerCase())
            ? documento.classList.remove("filtro")
            : documento.classList.add("filtro");

    });
});

const resOrder = await fetch("http://localhost:4000/api/ordersDataAdmin", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})

const resJsonOrder = await resOrder.json()

var band = false

if (resJsonOrder.status == "Data Orders") {
    const orderData = resJsonOrder.data;

    const main2 = document.querySelector('.main2')
    const main = document.querySelector('.main')
    const search = document.querySelector('.search')

    if (orderData != '') {
        main2.style.display = 'none'

        var tbody = document.querySelector('.tbody')

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

        var tbody = document.querySelector('.tbody')

        orderData.forEach(async (doc) => {
            if (fechaActual == doc.Fecha && doc.Correo == "benditaburger54@gmail.com") {

                band = true

                var tr = document.createElement('tr')
                var th = document.createElement('th')
                var divClient = document.createElement('div')
                var img = document.createElement('img')
                var name = document.createElement('p')
                var direccion = document.createElement('th')
                var fecha = document.createElement('th')
                var hora = document.createElement('th')
                var metodoPago = document.createElement('th')
                var precio = document.createElement('th')
                var thButton = document.createElement('th')
                var divButton = document.createElement('div')
                var openModalDetails = document.createElement('button')
                var btnPagar = document.createElement('button')
                var btnFactura = document.createElement('button')

                img.src = '/assets/logoAmarillo.png'
                name.textContent = doc.Nombre
                direccion.textContent = doc.Direccion + ' ' + doc.Barrio
                fecha.textContent = doc.Fecha
                hora.textContent = doc.Hora
                if (doc.Pago == "No pago") {
                    metodoPago.textContent = "Sin Pagar"
                } else {
                    metodoPago.textContent = doc.MetodoPago
                }
                precio.textContent = `$${parseInt(doc.Total).toLocaleString('de-DE')}`
                openModalDetails.textContent = "Detalles"
                btnPagar.textContent = "Pagar"
                btnFactura.textContent = "Ver Factura"

                divClient.className = "divClient"
                openModalDetails.className = "openModal"
                divButton.className = "buttons"
                btnPagar.className = "pago"
                btnFactura.className = "openModalFactura factura"

                tbody.appendChild(tr)
                tr.appendChild(th)
                th.appendChild(divClient)
                divClient.appendChild(img)
                divClient.appendChild(name)
                tr.appendChild(direccion)
                tr.appendChild(fecha)
                tr.appendChild(hora)
                tr.appendChild(metodoPago)
                tr.appendChild(precio)
                tr.appendChild(thButton)
                thButton.appendChild(divButton)
                divButton.appendChild(openModalDetails)
                if (doc.Pago == "No pago") {
                    divButton.appendChild(btnPagar)
                } else {
                    divButton.appendChild(btnFactura)
                }

                openModalDetails.addEventListener('click', () => {
                    const modalDetails = document.querySelector('.modalDetalis');
                    const modalContentDetails = document.querySelector('.conModalDetails');
                    const closeModalDetails = document.getElementById('closeModalDetails')

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

                    var imgDetails = document.querySelector('.imgDetails')
                    var nameDetails = document.querySelector('.nameDetails')
                    var phoneDetails = document.querySelector('.phoneDetails')
                    var methodDetails = document.querySelector('.methodDetails')
                    var gmailDetails = document.querySelector('.gmailDetails')
                    var directionDetails = document.querySelector('.directionDetails')
                    var descriptionDetails = document.querySelector('.descriptionDetails')
                    var dateDetails = document.querySelector('.dateDetails')
                    var hourDetails = document.querySelector('.hourDetails')
                    var statusDetails = document.querySelector('.statusDetails')

                    var nameMesa = ''

                    if (doc.Nombre == '1' || doc.Nombre == '2' || doc.Nombre == '3' || doc.Nombre == '4' || doc.Nombre == '5' || doc.Nombre == '6' || doc.Nombre == '7' || doc.Nombre == '8' || doc.Nombre == '9') {
                        nameMesa = `Mesa ${doc.Nombre}`
                    } else {
                        nameMesa = doc.Nombre
                    }

                    imgDetails.src = "/assets/logoAmarillo.png";
                    nameDetails.textContent = nameMesa
                    phoneDetails.textContent = doc.Telefono
                    methodDetails.textContent = doc.MetodoPago == '' ? "Sin Pagar" : doc.MetodoPago
                    gmailDetails.textContent = doc.Correo
                    directionDetails.textContent = doc.Direccion + ' ' + doc.Barrio
                    descriptionDetails.textContent = doc.Descripcion
                    dateDetails.textContent = doc.Fecha
                    hourDetails.textContent = doc.Hora
                    statusDetails.textContent = doc.Estado

                    var dataProducts = doc.Productos

                    var infoPedidio = document.querySelector('.infoPedido')

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
                                                price.textContent = `$${parseInt(product.price).toLocaleString('de-DE')}`
                                                campoPedido.className = "campoPedido"
                                                imgCampoPedido.className = "imgCampoPedido"

                                                infoPedido.appendChild(campoPedido)
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

                btnFactura.addEventListener('click', () => {

                    modalFactura.style.display = 'flex'

                    gsap.fromTo(conModalFactura,
                        { backdropFilter: 'blur(0px)', height: 0, opacity: 0 },
                        {
                            padding: '2rem 1rem 1rem 2rem',
                            height: '100%',
                            opacity: 1,
                            backdropFilter: 'blur(90px)',
                            duration: .7,
                            ease: 'expo.out',
                        }
                    )
                    window.addEventListener('click', event => {
                        if (event.target == modalFactura) {
                            gsap.to(conModalFactura, {
                                height: '0px',
                                padding: '0rem',
                                duration: .2,
                                ease: 'power1.in',
                                onComplete: () => {
                                    modalFactura.style.display = 'none';
                                }
                            });
                        }
                    })
                    closeModalFactura.addEventListener('click', () => {
                        gsap.to(conModalFactura, {
                            height: '0px',
                            padding: '0rem',
                            duration: .2,
                            ease: 'power1.in',
                            onComplete: () => {
                                modalFactura.style.display = 'none';
                            }
                        });
                    })
                })


            }

        })

        if (band == false) {
            var textMain2 = document.querySelector('.textMain2')

            main.style.display = 'none'

            main2.style.display = "flex"
            textMain2.textContent = "No has registrado ningun pedido el dia de hoy"
        }

    } else {
        main.style.display = 'none'
    }
}
