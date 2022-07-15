const lblNuevoTicket  = document.querySelector('#lblNuevoTicket');
const lblNuevoTicket_asesoria  = document.querySelector('#lblNuevoTicket_asesoria');
const btnCrear_asesoria = document.querySelector('#button_asesoria');
const lblNuevoTicket_reclamacion = document.querySelector('#lblNuevoTicket_reclamacion');
const btnCrear_reclamacion = document.querySelector('#button_reclamacion');
const lblNuevoTicket_devolucion = document.querySelector('#lblNuevoTicket_devolucion');
const btnCrear_devolucion = document.querySelector('#button_devolucion');
const lblNuevoTicket_otro = document.querySelector('#lblNuevoTicket_otro');
const btnCrear_otro = document.querySelector('#button_otro');

const socket = io();

socket.on('connect', () => {
    btnCrear_asesoria.disabled = false;
    btnCrear_reclamacion.disabled = false;
    btnCrear_devolucion.disabled = false;
    btnCrear_otro.disabled = false;
});

socket.on('disconnect', () => {
    btnCrear_asesoria.disabled = true;
    btnCrear_reclamacion.disabled = true;
    btnCrear_devolucion.disabled = true;
    btnCrear_otro.disabled = true;
});

socket.on('ultimo-ticket', (ultimo) => {
    lblNuevoTicket.innerHTML = 'Total ' + ultimo.ultimo;
})

btnCrear_asesoria.addEventListener( 'click', () => {
    socket.emit( 'siguiente-ticket', 'generador de tickets',"Asesoria",( ticket ) => {
        lblNuevoTicket_asesoria.innerHTML = `${ticket.ticket_clasificacion} <br> #${ticket.ticket_numero_asesoria}`;
        lblNuevoTicket.innerHTML = ticket.ticket_numero;
    });
});

btnCrear_reclamacion.addEventListener( 'click', () => {
    socket.emit( 'siguiente-ticket', 'generador de tickets',"Reclamacion", ( ticket ) => {
        lblNuevoTicket_reclamacion.innerHTML = `${ticket.ticket_clasificacion} <br> #${ticket.ticket_numero_reclamacion}`;
        lblNuevoTicket.innerHTML = ticket.ticket_numero;
    });
});

btnCrear_devolucion.addEventListener( 'click', () => {
    socket.emit( 'siguiente-ticket', 'generador de tickets',"Devolucion", ( ticket ) => {
        lblNuevoTicket_devolucion.innerHTML = `${ticket.ticket_clasificacion} <br> #${ticket.ticket_numero_devolucion}`;
        lblNuevoTicket.innerHTML = ticket.ticket_numero;
    });
});

btnCrear_otro.addEventListener( 'click', () => {
    socket.emit( 'siguiente-ticket', 'generador de tickets',"Otro", ( ticket ) => {
        lblNuevoTicket_otro.innerHTML = `${ticket.ticket_clasificacion}<br> #${ticket.ticket_numero_otro}`;
        lblNuevoTicket.innerHTML = ticket.ticket_numero;
    });
});