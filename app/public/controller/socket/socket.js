import { io } from 'https://cdn.socket.io/4.6.1/socket.io.esm.min.js';

export const socket = io();

socket.on("notificacion-estado-pedido", (data) => {
    alert(`¡Tu pedido fue actualizado a: ${data.nuevoEstado}!`);
});

socket.on("notificacion-estado-pedido-staff", (data) => {
    alert(`El pedidio del usuario: ${data.correo}, fue actualizado`);
});

socket.on("notificacion-nuevo-pedido", (data) => {
    alert(`El usuario ${data.customerEmail} realizo un nuevo pedido`);
});

