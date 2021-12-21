import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from 'react-redux';
import { editState, loadStates, editCounty, addCounty, loadCounties } from '../store';
import { TextField, Button, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const SummaryForm = ({ stateId, countyId, action, handleClose}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadStates());
    }, [])
    const states = useSelector(({states}) => states);
    const stateToEdit = states.find(state => state.id === +stateId) || {};
    const counties = useSelector(({counties}) => counties);
    const county = counties.find(county => county.id === +countyId) || {};

    const [inputs, setInputs] = useState(() => ({
        summary: (countyId ? county.summary : action === 'edit' ? stateToEdit.summary : '') || '',
        nm: (countyId ? county.name : action === 'edit' ? stateToEdit.name : '') || '',
    }));

    const {summary, nm} = inputs;
    const handleInputChange = (ev) => {
        ev.persist();
        const change = {};
        change[ev.target.name] = ev.target.value;
        setInputs({...inputs, ...change});
    }

    const handleSubmit = async(ev) => {
        ev.preventDefault();
        try {
            if (countyId) {
                await dispatch(editCounty({...county, summary: inputs.summary, name: inputs.nm})); 
                await dispatch(loadStates())
            } else {
                if (action === 'add'){
                    await dispatch(addCounty({summary: inputs.summary, name: inputs.nm, stateId})); 
                    await dispatch(loadStates())
                } else {
                    await dispatch(editState({...stateToEdit, summary: inputs.summary})); 
                }
            }
            handleClose(ev);
        } catch (error) {
            console.log(error);            
        }
    }

    return (
    <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
        <Button startIcon={<CloseIcon style={{color: 'black'}}/>} onClick={handleClose} ></Button>
        <div style={{display: 'flex', flexDirection: 'column', margin: '1rem'}}>
            <TextField size='small' style={{width: '90%'}}  name="nm" label="Name" type="text" 
                value={nm || ''} onChange={ countyId || action === 'add' ? handleInputChange : null} onKeyDown={!countyId && action==='edit'  ? (event) => event.preventDefault() : null}
            />
            <TextField size='small' multiline maxRows={4} style={{width: '90%'}}  id='summary-input' name="summary" label="Summary" type="text" 
                value={summary || ''} onChange={handleInputChange}/>
            <Button disabled={countyId && !inputs.nm} style={{alignSelf: 'center',textAlign: 'center', width: '20%', backgroundColor: '#1976d2', color: 'black'}} variant='contained' color='primary' onClick={handleSubmit}>
               { countyId ? 'Edit County' : action === 'add' ? 'Add County' : 'Edit State Summary' }
            </Button>
            {/* {
                !!error ? 
                <div style={{margin: '1rem', color: 'red', border: '1px solid red'}}>
                    { JSON.stringify(error, null, 2) }
                </div>
                : ''
            } */}
        </div>
    </Box>
    )
}

export default SummaryForm;