const path = require('path');
const fs = require('fs');

class Ticket{
    constructor(numero, numero_asesoria,numero_reclamacion,numero_devolucion,numero_otro, escritorio, clasificacion){
        this.numero = numero;
        this.numero_asesoria = numero_asesoria;
        this.numero_reclamacion = numero_reclamacion;
        this.numero_devolucion = numero_devolucion;
        this.numero_otro = numero_otro;
        this.escritorio = escritorio;
        this.clasificacion = clasificacion;
    }
}

class TicketControl{
    constructor(){
        this.ultimo = 0;
        this.ultimo_asesoria = 0;
        this.ultimo_reclamacion = 0;
        this.ultimo_devolucion = 0;
        this.ultimo_otro = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        //this.tickets_asesoria = [];
        //this.tickets_reclamacion = [];
        //this.tickets_devolucion = [];
        //this.tickets_otros = [];
        this.ultimos4 = [];

        this.init();
    }

    get toJson(){
        return {
            ultimo: this.ultimo,
            ultimo_asesoria: this.ultimo_asesoria,
            ultimo_reclamacion: this.ultimo_reclamacion,
            ultimo_devolucion: this.ultimo_devolucion,
            ultimo_otro: this.ultimo_otro,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }

    init(){
        const { hoy, tickets,ultimo,ultimo_asesoria,ultimo_reclamacion,ultimo_devolucion,ultimo_otro, ultimos4 } = require('../db/data.json');

        if( hoy === this.hoy ){
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimo_asesoria = ultimo_asesoria;
            this.ultimo_reclamacion = ultimo_reclamacion;
            this.ultimo_devolucion = ultimo_devolucion;
            this.ultimo_otro = ultimo_otro;
            this.ultimos4 = ultimos4;
        }else{
            this.guardarDB();
        }
    }

    guardarDB(){
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync( dbPath, JSON.stringify(this.toJson) );
    }

    siguiente(clasificacion){
        this.ultimo += 1;
        if(clasificacion === "Asesoria"){
            this.ultimo_asesoria += 1;
        }
        if(clasificacion === "Reclamacion"){
            this.ultimo_reclamacion += 1; 
        }
        if(clasificacion === "Devolucion"){
            this.ultimo_devolucion += 1; 
        }
        if(clasificacion === "Otro"){
            this.ultimo_otro += 1;
        }

        const ticket = new Ticket(this.ultimo,this.ultimo_asesoria,this.ultimo_reclamacion,this.ultimo_devolucion,this.ultimo_otro, null,clasificacion);
        this.tickets.push( ticket );        
        this.guardarDB();
        //return 'Ticket ' + ticket.numero;
        return { 
            ticket_numero: `Total <br> ${ticket.numero}`,
            ticket_numero_asesoria:  ticket.numero_asesoria ,
            ticket_numero_reclamacion:  ticket.numero_reclamacion,
            ticket_numero_devolucion:  ticket.numero_devolucion,
            ticket_numero_otro:  ticket.numero_otro,
            ticket_clasificacion:  ticket.clasificacion,  
        };
    }

    atenderTicket( escritorio ){
        // No tenemos tickets
        if( this.tickets.length === 0 ){
            return null;
        }

        const ticket = this.tickets.shift(); // this.tickets[0];
        ticket.escritorio = escritorio;

        this.ultimos4.unshift( ticket );

        if( this.ultimos4.length > 4 ){
            this.ultimos4.splice(-1, 1);
        }

        this.guardarDB();

        return ticket;
    }
}

module.exports = TicketControl;