import axios from 'axios'

const TOKEN = 'token';

const LOAD_USER_COUNTIES = 'LOAD_USER_COUNTIES';
const ADD_USER_COUNTY = 'ADD_USER_COUNTY';
const DELETE_USER_COUNTY = 'DELETE_USER_COUNTY';

const _loadUserCounties = (userCounties) => {
    return {
        type: LOAD_USER_COUNTIES,
        userCounties
    }
};

export const loadUserCounties = () => {
    const token = window.localStorage.getItem(TOKEN)
    if (token){
        return async(dispatch) => {
            const {data} = await axios.get('/api/usercounties', {
                headers: {
                    authorization: token
                }
            });
            dispatch(_loadUserCounties(data));
        };
    }
};

const _addUserCounty = userCounty => {
    return {
        type: ADD_USER_COUNTY,
        userCounty
    }
};

export const addUserCounty = (countyId) => {
    const token = window.localStorage.getItem(TOKEN)
    if (token){
        console.log("TOKEN")
        return async(dispatch) => {
            const added = (await axios.post('/api/usercounties', countyId, {
                headers: {
                    authorization: token
                }
            })).data;
            dispatch(_addUserCounty(added));
        }
    }
}

const _deleteUserCounty = id => {
    return {
        type: DELETE_USER_COUNTY,
        id
    }
};

export const deleteUserCounty = (id) => {
    const token = window.localStorage.getItem(TOKEN)
    if (token){
        return async(dispatch) => {
            (await axios.delete(`/api/usercounties/${id}`, {
                headers: {
                    authorization: token
                }
            }));
            dispatch(_deleteUserCounty(id));
        }
    }
}

export default function(state = [], action){
    switch(action.type) {
        case LOAD_USER_COUNTIES: 
            return action.userCounties
        case ADD_USER_COUNTY:
            return [...state, action.userCounty]
        case DELETE_USER_COUNTY:
            return state.filter(userCounty => userCounty.id !== action.id)
        default:
            return state
    }
};