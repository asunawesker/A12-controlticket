const lblTicket1 = document.querySelector('#lblTicket1');
const bckTicket1 = document.querySelector('#bckTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');
const lblTicket2 = document.querySelector('#lblTicket2');
const bckTicket2 = document.querySelector('#bckTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');
const lblTicket3 = document.querySelector('#lblTicket3');
const bckTicket3 = document.querySelector('#bckTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');
const bckTicket4 = document.querySelector('#bckTicket4');

const socket = io();

change_color = (clasificacion) => {
    if(clasificacion === "Asesoria"){
        return '#1c00bb';
    }
    if(clasificacion === "Reclamacion"){
        return '#bd231e';
    }
    if(clasificacion === "Devolucion"){
        return '#be5c00';
    }
    if(clasificacion === "Otro"){
        return '#20be00';
    }
}

socket.on('estado-actual', ( payload ) => {
    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();

    const [ticket1, ticket2, ticket3, ticket4] = payload;
    
    if( ticket1 ){
        lblTicket1.innerText = `Ticket ${ticket1.numero}
        ${ticket1.clasificacion}`;
        lblEscritorio1.innerText = ticket1.escritorio;

        bckTicket1.style.setProperty('background',this.change_color(ticket1.clasificacion))
       
    }

    if( ticket2 ){
        lblTicket2.innerText = `Ticket ${ticket2.numero}
        ${ticket2.clasificacion}`;
        lblEscritorio2.innerText = ticket2.escritorio;

        bckTicket2.style.setProperty("background", this.change_color(ticket2.clasificacion));
    }

    if( ticket3 ){
        lblTicket3.innerText = `Ticket ${ticket3.numero}
        ${ticket3.clasificacion}`;
        lblEscritorio3.innerText = ticket3.escritorio;
        
        bckTicket3.style.setProperty("background", this.change_color(ticket3.clasificacion));
    }

    if( ticket4 ){
        lblTicket4.innerText = `Ticket ${ticket4.numero}
        ${ticket4.clasificacion}`;
        lblEscritorio4.innerText = ticket4.escritorio;

        bckTicket4.style.setProperty("background", this.change_color(ticket4.clasificacion));
    }
});