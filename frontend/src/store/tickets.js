import { csrfFetch } from './csrf';

const ADD_TICKET = 'tickets/ADD_TICKET';

const addTicket = (ticket) => ({
    type: ADD_TICKET,
    ticket
});

export const purchaseTicket = (newTicket) => async (dispatch) => {
    const res = await csrfFetch('/api/tickets', {
        method: 'POST',
        body: JSON.stringify(newTicket)
    });

    if (res.ok) {
        const ticket = res.json();
        dispatch(addTicket(ticket))
    }
}

const initialState = {};

const ticketReducer = (state = initialState, action) => {
    let newObj = {};

    switch (action.type) {
        case ADD_TICKET:
            newObj[action.ticket.id] = action.ticket;
            return { ...state, ...newObj };
        default:
            return state;
    }
}

export default ticketReducer;
