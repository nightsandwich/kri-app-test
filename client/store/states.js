import axios from 'axios'

const TOKEN = 'token';

const LOAD_STATES = 'LOAD_STATES';
const EDIT_STATE = 'EDIT_STATE';

const _loadStates = (states) => {
    return {
        type: LOAD_STATES,
        states
    }
};

export const loadStates = () => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
        return async(dispatch) => {
            const {data} = await axios.get('/api/states', {
                headers: {
                    authorization: token
                }
            });
            dispatch(_loadStates(data));
        };
    }
};

const _editState = (stt) => {
    return {
        type: EDIT_STATE,
        stt
    }
};

export const editState = (state) => {
    const token = window.localStorage.getItem(TOKEN)
    if (token){
        return async(dispatch) => {
            const updated = (await axios.put(`/api/states/`, state, {
                headers: {
                    authorization: token
                }
            })).data;
            dispatch(_editState(updated));
        };
    }
};

export default function(state = [], action){
    switch(action.type) {
        case LOAD_STATES: 
            return action.states
        case EDIT_STATE:
            return state.map(stt => stt.id === action.stt.id ? action.stt : stt)
        default:
            return state
    }
};


