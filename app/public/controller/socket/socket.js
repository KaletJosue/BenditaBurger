import { io } from 'https://cdn.socket.io/4.6.1/socket.io.esm.min.js';

export const socket = io();

socket.on("notificacion-estado-pedido", (data) => {
    alert(`¡Tu pedido fue actualizado a: ${data.nuevoEstado}!`);
    if (location.href == 'http://localhost:4000/user/delivery') {
        var colums = document.querySelectorAll('tbody tr')

        var pago = ''

        if (data.metodoPago == "card") {
            pago = 'Tarjeta'
        } else {
            pago = data.metodoPago
        }

        var dataUnit = `${data.direccion} ${data.barrio}${data.fecha}${data.hora}${pago}${data.estado}$${(parseInt(data.total)).toLocaleString('de-DE')}Detalles`

        colums.forEach((doc) => {
            if (doc.textContent == dataUnit) {
                const celdas = doc.querySelectorAll("th");
                const estadoParrafo = celdas[4].querySelector("p");

                estadoParrafo.textContent = data.nuevoEstado
                estadoParrafo.className = (data.nuevoEstado).toLowerCase()
            }
        })
    }
});

socket.on("notificacion-estado-pedido-staff", (data) => {
    if (location.href == 'http://localhost:4000/admin/delivery' || location.href == 'http://localhost:4000/checker/delivery') {
        var colums = document.querySelectorAll('tbody tr')

        var pago = ''

        if (data.metodoPago == "card") {
            pago = 'Tarjeta'
        } else {
            pago = data.metodoPago
        }

        var dataUnit = `${data.nombre}${data.direccion} ${data.barrio}${data.fecha}${data.hora}${pago}${data.estado}EnviadoCanceladoPreparacionEntregadoCerca$${(parseInt(data.total)).toLocaleString('de-DE')}Detalles`

        colums.forEach((doc) => {
            if (doc.textContent == dataUnit) {
                const celdas = doc.querySelectorAll("th");
                const estadoParrafo = celdas[5].querySelector("p");

                estadoParrafo.textContent = data.nuevoEstado
                estadoParrafo.className = (data.nuevoEstado).toLowerCase()
            }
        })
    }
});

socket.on("notificacion-nuevo-pedido", (data) => {
    alert(`El usuario ${data.customerEmail} realizo un nuevo pedido`);
});