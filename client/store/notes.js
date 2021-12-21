import axios from 'axios'

const TOKEN = 'token';

const LOAD_NOTES = 'LOAD_NOTES';
const ADD_NOTE = 'ADD_NOTE';
const UPDATE_NOTE = 'UPDATE_NOTE';
const DELETE_NOTE = 'DELETE_NOTE';

const _loadNotes = (notes) => {
    return {
        type: LOAD_NOTES,
        notes
    }
};

export const loadNotes = () => {
    const token = window.localStorage.getItem(TOKEN)
    if (token){
        return async(dispatch) => {
            const {data} = await axios.get('/api/notes', {
                headers: {
                    authorization: token
                }
            });
            dispatch(_loadNotes(data));
        };
    }
};

const _addNote = note => {
    return {
        type: ADD_NOTE,
        note
    }
};

export const addNote = (note) => {
    const token = window.localStorage.getItem(TOKEN)
    if (token){
        console.log("TOKEN")
        return async(dispatch) => {
            const added = (await axios.post('/api/notes', note, {
                headers: {
                    authorization: token
                }
            })).data;
            dispatch(_addNote(added));
        }
    }
}
const _updateNote = note => {
    return {
        type: UPDATE_NOTE,
        note
    }
};

export const updateNote = (note) => {
    const token = window.localStorage.getItem(TOKEN)
    if (token){
        return async(dispatch) => {
            const updated = (await axios.put(`/api/notes/`, note, {
                headers: {
                    authorization: token
                }
            })).data;
            dispatch(_updateNote(updated));
        }
    }
}

const _deleteNote = id => {
    return {
        type: DELETE_NOTE,
        id
    }
};

export const deleteNote = (id) => {
    const token = window.localStorage.getItem(TOKEN)
    if (token){
        return async(dispatch) => {
            (await axios.delete(`/api/notes/${id}`, {
                headers: {
                    authorization: token
                }
            }));
            dispatch(_deleteNote(id));
        }
    }
}

export default function(state = [], action){
    switch(action.type) {
        case LOAD_NOTES: 
            return action.notes
        case ADD_NOTE:
            return [...state, action.note]
        case UPDATE_NOTE:
            return state.map(note => note.id === action.note.id ? action.note : note)
        case DELETE_NOTE:
            return state.filter(note => note.id !== action.id)
        default:
            return state
    }
};