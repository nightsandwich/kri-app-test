import axios from 'axios'

const TOKEN = 'token';

const LOAD_USERS = 'LOAD_USERS';
const EDIT_USER = 'EDIT_USER';

const _loadUsers = (users) => {
    return {
        type: LOAD_USERS,
        users
    }
};

export const loadUsers = () => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
        return async(dispatch) => {
            const {data} = await axios.get('/api/users', {
                headers: {
                    authorization: token
                }
            });
            dispatch(_loadUsers(data));
        };
    }
};

const _editUser = (user) => {
    return {
        type: EDIT_USER,
        user
    }
};

export const editUser = (user) => {
    const token = window.localStorage.getItem(TOKEN)
    if (token){
        return async(dispatch) => {
            const updated = (await axios.put(`/api/users/`, user, {
                headers: {
                    authorization: token
                }
            })).data;
            dispatch(_editUser(updated));
        };
    }
};

export default function(state = [], action){
    switch(action.type) {
        case LOAD_USERS: 
            return action.users
        case EDIT_USER:
            return state.map(user => user.id === action.user.id ? action.user : user)
        default:
            return state
    }
};


