const TicketControl =  require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {
    
    socket.emit('ultimo-ticket', {
        ultimo: ticketControl.ultimo,
        ultimo_asesoria : ticketControl.ultimo_asesoria,
        ultimo_reclamacion : ticketControl.ultimo_reclamacion,
        ultimo_devolucion : ticketControl.ultimo_devolucion,
        ultimo_otro : ticketControl.ultimo_otro
    });
    socket.emit('estado-actual', ticketControl.ultimos4);

    socket.emit('tickets-pendientes', ticketControl);

    socket.on('siguiente-ticket', (payload,clasificacion, callback) => {
        const siguiente = ticketControl.siguiente(clasificacion);
        callback(siguiente);
        socket.broadcast.emit('tickets-pendientes', ticketControl);
    });

    socket.on('disconnect', ()=>{});

    socket.on('atender-ticket', ({ escritorio}, callback)=>{
        if( !escritorio ){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket( escritorio );

        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);

        socket.emit('tickets-pendientes',  ticketControl);
        
        socket.broadcast.emit('tickets-pendientes', ticketControl);

        if( !ticket ){
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        }else{
            callback({
                ok: true,
                ticket
            });
        }
    });
}

module.exports = {
    socketController
}