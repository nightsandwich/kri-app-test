import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from 'react-redux';
import { addNote, updateNote, loadNotes, loadCounties, loadStates } from '../store';
import { TextField, Grid, Menu, FormControl, FormControlLabel, InputLabel, Checkbox, Button, Box, Select, MenuItem, Typography } from "@mui/material";
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
            display='flex'
            flexDirection={'column'}
            alignItems={'center'}
        >
                <Typography variant='h6'>
                    {action === 'add' ? 'Add Link' : 'Edit Link'}
                </Typography>
        <Box
            component="form"
            onSubmit={onSubmit}
        >
            <Button startIcon={<CloseIcon style={{color: 'black'}}/>} onClick={handleClose} ></Button>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="title"
                    name="title"
                    required
                    size='small' 
                    style={{width: '100%'}} 
                    id="title"
                    label="Website Name"
                    value={title || ''}
                    autoFocus
                    onChange={onChange}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    size='small' 
                    style={{width: '100%'}} 
                    required
                    id="url"
                    label="URL"
                    name="link"
                    value={link || ''}
                    autoComplete="link"
                    onChange={onChange}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    size='small' 
                    style={{width: '100%'}} 
                    id="note"
                    label="Note"
                    name="text"
                    value={text || ''}
                    autoComplete="note"
                    onChange={onChange}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControlLabel 
                        style={{marginLeft: '2rem'}} 
                        control={<Checkbox id='paid' checked={paid || false} onChange={handleBox}/>} label='Receipt'
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControlLabel 
                        style={{marginLeft: '2rem'}} 
                        control={<Checkbox id='password' checked={password || false} onChange={handlePassword}/>} label='Password'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField  
                        size='small' 
                        style={{width: '100%'}} 
                        label="Edited By" 
                        type="text" 
                        value={auth.initials}
                    />
                </Grid>
                <Grid item xs={12} >
                    <Box textAlign='center' width='10%'>
                        <Button disabled={!title} style={{backgroundColor: '#1976d2', color: 'black'}} variant='contained' color='primary' type='submit'>
                            {action === 'add' ? 'Add' : 'Edit'}
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} >
                    {
                        !!error ? 
                        <div style={{margin: '1rem', color: 'red', border: '1px solid red'}}>
                            { JSON.stringify(error, null, 2) }
                        </div>
                        : ''
                    }
                </Grid>
            </Grid>
        {/* <div style={{display: 'flex', flexDirection: 'column', margin: '1rem'}}>
            <TextField size='small' style={{width: '90%'}}  required name="title" label="Website Name" type="text" value={title || ''} onChange={onChange} />
            <TextField multiline maxRows={4} size='small' style={{width: '90%'}}  name="text" label="Note" type="text" value={text || ''} onChange={onChange}/>
            <TextField  multiline maxRows={4} size='small' style={{width: '90%'}} required name="link" label="URL" type="text" 
                value={link || ''} onChange={onChange}/>
            <FormControlLabel style={{marginLeft: '2rem'}} control={<Checkbox id='paid' checked={paid || false} onChange={handleBox}/>} label='Receipt'/>
            <FormControlLabel style={{marginLeft: '2rem'}} control={<Checkbox id='password' checked={password || false} onChange={handlePassword} />} label='Password'/>
            <TextField  size='small' style={{width: '90%'}} label="Edited By" type="text" 
                value={auth.initials}/>
            <Button disabled={!title || !link} style={{marginTop: '1rem', alignSelf: 'center',textAlign: 'center', width: '10%', backgroundColor: '#1976d2', color: 'black'}} variant='contained' color='primary' type='submit'>
                {action === 'add' ? 'Add' : 'Edit'}
            </Button>
            {
                !!error ? 
                <div style={{margin: '1rem', color: 'red', border: '1px solid red'}}>
                    { JSON.stringify(error, null, 2) }
                </div>
                : ''
            }
        </div> */}
    </Box>
    </Box>
    
    )
}

export default NoteForm;