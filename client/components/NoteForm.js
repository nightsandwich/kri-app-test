import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from 'react-redux';
import { addNote, updateNote, loadNotes, loadCounties, loadStates } from '../store';
import { TextField, Menu, FormControl, FormControlLabel, InputLabel, Checkbox, Button, Box, Select, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


const NoteForm = ({ stateId, countyId, handleClose, action, note, auth}) => {
    const dispatch = useDispatch();
    
    const [inputs, setInputs] = useState(() => ({
            text: note.text || '',
            link: note.link || '',
            title: note.title || '',
            error: ''
        }));
    const [paid, setPaid] = useState(note.paid || false);
    const [password, setPassword] = useState(note.password || false);
    const { text, link, title, error} = inputs;
    
    useEffect(() => {
        if (action === 'edit') {
            setInputs({text: note.text, link: note.link, title: note.title});
            setPaid(note.paid);
            setPassword(note.password);
        }
    }, [])

    useEffect(() => {setInputs({...inputs, error: error})},[error]);

    const onChange = ev => {
            ev.persist();
            const change = {};
            change[ev.target.name] = ev.target.value;
            setInputs({ ...inputs, ...change});
    }

    const onSubmit = async (ev) => {
        ev.preventDefault();
        try{
            action === 'add' ? await dispatch(addNote({text, title, paid, password, link,  countyId: countyId ? countyId : null, userId: auth.id, stateId: countyId ? null : stateId}))
            : await dispatch(updateNote({...note, text, title, link, paid, password, userId: auth.id }));
            handleClose(ev);
            // dispatch(loadStates())
            // dispatch(loadCounties())
        }
        catch(ex){
            setInputs({...inputs, error: ex.response.data});
        }
    }
    const handleBox = (ev) => {
        setPaid(ev.target.checked);
    }
    const handlePassword = (ev) => {
        setPassword(ev.target.checked);
    }

    if (action === 'edit' && !note) return '...loading'

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
            <TextField size='small' style={{width: '90%'}}  helperText='Required' name="title" label="Website Name" type="text" value={title || ''} onChange={onChange} />
            <TextField multiline maxRows={4} size='small' style={{width: '90%'}}  name="text" label="Note" type="text" value={text || ''} onChange={onChange}/>
            <TextField  multiline maxRows={4} size='small' style={{width: '90%'}} helperText='Required' name="link" label="URL" type="text" 
                value={link || ''} onChange={onChange}/>
            <FormControlLabel style={{marginLeft: '2rem'}} control={<Checkbox id='paid' checked={paid || false} onChange={handleBox}/>} label='Receipt'/>
            <FormControlLabel style={{marginLeft: '2rem'}} control={<Checkbox id='password' checked={password || false} onChange={handlePassword} />} label='Password'/>
            <TextField  size='small' style={{width: '90%'}} label="Edited By" type="text" 
                value={auth.initials}/>
            {/* <FormControl >
                <InputLabel style={{marginTop: '1rem'}}>Edited By (Required)</InputLabel>
                <Select
                    label="Edited By"
                    required
                    autoWidth={true}
                    variant='filled'
                >
                    <MenuItem style={{margin: '.25rem .5rem 0 .5rem '}} value={auth.id} >
                    {auth.initials}
                    </MenuItem>     
                </Select>
            </FormControl> */}
            <Button disabled={!title.length || !auth.id || !link.length} style={{marginTop: '1rem', alignSelf: 'center',textAlign: 'center', width: '10%', backgroundColor: '#1976d2', color: 'black'}} variant='contained' color='primary' onClick={onSubmit}>
                {action === 'add' ? 'Add' : 'Edit'}
            </Button>
            {
                !!error ? 
                <div style={{margin: '1rem', color: 'red', border: '1px solid red'}}>
                    { JSON.stringify(error, null, 2) }
                </div>
                : ''
            }
        </div>
    </Box>
    
    )
}

export default NoteForm;