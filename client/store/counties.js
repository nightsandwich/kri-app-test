import axios from "axios";

const TOKEN = 'token';

const LOAD_COUNTIES = 'LOAD_COUNTIES';
const ADD_COUNTY = 'ADD_COUNTY';
const DELETE_COUNTY = 'DELETE_COUNTY';
const EDIT_COUNTY = 'EDIT_COUNTY';

const _loadCounties = (counties) => {
    return {
        type: LOAD_COUNTIES,
        counties
    }
};

export const loadCounties = () => {
    const token = window.localStorage.getItem(TOKEN)
    
    if (token){
        return async(dispatch) => {
            const {data} = await axios.get('/api/counties', {
                headers: {
                    authorization: token
                }
            });
            dispatch(_loadCounties(data));
        };
    }
};

const _addCounty = county => {
    return {
        type: ADD_COUNTY,
        county
    }
};

export const addCounty = (county) => {
    const token = window.localStorage.getItem(TOKEN)
    
    if (token) {
        return async(dispatch) => {
            const added = (await axios.post('/api/counties', county, {
                headers: {
                    authorization: token
                }
            })).data;
            dispatch(_addCounty(added));
        }
    }
}

const _editCounty = (county) => {
    return {
        type: EDIT_COUNTY,
        county
    }
};

export const editCounty = (county) => {
    const token = window.localStorage.getItem(TOKEN)

    if (token) {
        return async(dispatch) => {
            const updated = (await axios.put(`/api/counties/${county.id}`, county, {
                headers: {
                    authorization: token
                }
            })).data;
            dispatch(_editCounty(updated));
        };
    }
};

const _deleteCounty = id => {
    return {
        type: DELETE_COUNTY,
        id
    }
};

export const deleteCounty = (id) => {
    const token = window.localStorage.getItem(TOKEN)

    if (token) {
        return async(dispatch) => {
            (await axios.delete(`/api/counties/${id}`, {
                headers: {
                    authorization: token
                }
            }));
            dispatch(_deleteCounty(id));
        }
    }
}

export default function(state = [], action){
    switch(action.type) {
        case LOAD_COUNTIES: 
            return action.counties
        case ADD_COUNTY:
            return [...state, action.county]
        case EDIT_COUNTY:
            return state.map(county => county.id === action.county.id ? action.county : county)
        case DELETE_COUNTY:
            return state.filter(county => county.id !== action.id)    
        default:
            return state
    }
};
