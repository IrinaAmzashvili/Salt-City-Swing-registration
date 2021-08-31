import { csrfFetch } from './csrf';

const ADD_TICKET = 'tickets/ADD_TICKET';
const SET_TICKETS = 'tickets/SET_TICKETS';
const REMOVE_TICKET = 'tickets/REMOVE_TICKET';
const UNLOAD_TICKETS = 'tickets/UNLOAD_TICKETS';

const setTickets = (tickets) => ({
    type: SET_TICKETS,
    tickets
})

const addTicket = (ticket) => ({
    type: ADD_TICKET,
    ticket
});

const removeTicket = (id) => ({
    type: REMOVE_TICKET,
    id
});

export const unloadTickets = () => ({
    type: UNLOAD_TICKETS,
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

export const updateTicket = (ticketId, newTicket) => async (dispatch) => {
    const res = await csrfFetch(`/api/tickets/${ticketId}`, {
        method: 'PUT',
        body: JSON.stringify(newTicket)
    });

    if (res.ok) {
        const ticket = await res.json();
        await dispatch(addTicket(ticket));
        return res;
    }
}

export const cancelTicket = (ticketId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tickets/${ticketId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
       await dispatch(removeTicket(ticketId));
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
        case REMOVE_TICKET:
            newObj = { ...state };
            delete newObj[action.id];
            return newObj;
        case UNLOAD_TICKETS:
            return { ...initialState };
        default:
            return state;
    }
}

export default ticketReducer;
