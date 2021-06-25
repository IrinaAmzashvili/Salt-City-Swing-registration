import { csrfFetch } from './csrf';

const ADD_TICKET = 'tickets/ADD_TICKET';
const SET_TICKETS = 'tickets/SET_TICKETS';

const setTickets = (tickets) => ({
    type: SET_TICKETS,
    tickets
})

const addTicket = (ticket) => ({
    type: ADD_TICKET,
    ticket
});

export const getTickets = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tickets/${userId}`);

    if (res.ok) {
        const tickets = await res.json();
        dispatch(setTickets(tickets));
        return res;
    }
}

export const purchaseTicket = (newTicket) => async (dispatch) => {
    const res = await csrfFetch('/api/tickets', {
        method: 'POST',
        body: JSON.stringify(newTicket)
    });

    if (res.ok) {
        const ticket = await res.json();
        await dispatch(addTicket(ticket))
        return res;
    }
}

const initialState = {};

const ticketReducer = (state = initialState, action) => {
    let newObj = {};
    switch (action.type) {
        case SET_TICKETS:
            action.tickets.forEach(ticket => {
                newObj[ticket.id] = ticket;
            });
            return { ...state, ...newObj };
        case ADD_TICKET:
            newObj[action.ticket.id] = action.ticket;
            return { ...state, ...newObj };
        default:
            return state;
    }
}

export default ticketReducer;
