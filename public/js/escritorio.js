const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblTotal =document.querySelector('#lblTotal');
const lblPendientes = document.querySelector('#lblPendientes');
const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

divAlerta.style.display = 'none';

const socket = io();

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('tickets-pendientes', (pendientes) => {
    if (pendientes === 0 ){
        lblPendientes.style.display = 'none';
    } else {        
        let pendiente_asesoria = 0;
        let pendientes_reclamacion = 0;
        let pendientes_devolucion = 0;
        let pendientes_otros = 0;
        pendientes.tickets.forEach(element => {
            if(element.clasificacion === "Asesoria"){
                pendiente_asesoria += 1;
            }
            if(element.clasificacion === "Reclamacion"){
                pendientes_reclamacion += 1;
            }
            if(element.clasificacion === "Devolucion"){
                pendientes_devolucion += 1;
            }
            if(element.clasificacion === "Otro"){
                pendientes_otros += 1;
            }
        });

        lblPendientes.style.display = '';
        lblPendientes.innerHTML = `
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Asesoría</th>
                    <th scope="col">Reclamación</th>
                    <th scope="col">Devolución</th>
                    <th scope="col">Otros</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${pendiente_asesoria}</td>
                        <td>${pendientes_reclamacion}</td>
                        <td>${pendientes_devolucion}</td>
                        <td>${pendientes_otros}</td>
                    </tr>
                </tbody>
            </table>
        `;

        lblTotal.innerHTML = `${pendientes.tickets.length}`
    }
});

btnAtender.addEventListener( 'click', () => {

    socket.emit('atender-ticket', { escritorio }, ( {ok, ticket, msg } ) => {
        if( !ok ){
            lblTicket.innerHTML = 'Nadie.';
            return divAlerta.style.display = '';
        }

        lblTicket.innerHTML = `
            Ticker #${ticket.numero} -> <b class = "clasificacion">${ticket.clasificacion}</b>`;
    });
});