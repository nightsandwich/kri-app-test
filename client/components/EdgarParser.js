import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from 'react-redux';

import { TextField, Menu, FormControl, FormControlLabel, InputLabel, Checkbox, Button, Box, Typography, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


const EdgarParser = () => {
    const dispatch = useDispatch();
    
    const [searchString, setSearchString] = useState('');

    const parser = str => {
      const andReg = /(?: AND )/gmi;
      const orReg = /(:? OR )/gmi;
      const wReg = /(:? w\/2 )/gmi;
      const nReg = /(:? n\/2 )/gmi;
      const qReg = /(:?")/gmi;
      let ret = str.replace(orReg, ' <OR> ').replace(andReg, ' <AND> ').replace(wReg, ' <near/2> ').replace(nReg, ' <near/2> ').replace(qReg,'')
      return ret
    }
    const onChange = ev => {
      ev.persist();
      setSearchString(ev.target.value);
    }
    
    const [parsed, setParsed] = useState('');
    
    const onSubmit = (ev) => {
        ev.preventDefault();
        setParsed(parser(searchString));
    }
    const instString = `Paste in the boolean search string used for Lexis.

    ---Example---
    ((tom OR thomas) w/2 lastname) AND ("company name" OR (another w/2 name) OR (word AND word AND "multiple words"))

    ((tom OR thomas) n/2 lastname) AND ("company name" OR (another n/2 name) OR (word AND word AND "multiple words"))
    `
    const Instructions = () => (
    <TextField  multiline maxRows={20} size='small' style={{marginTop: '2rem', width: '90%'}} label="Instructions" value={instString}/>
    )
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
        <div style={{display: 'flex', flexDirection: 'column', margin: '1rem'}}>
          {
            parsed.length === 0 ?
            <Instructions/>
            : ''
          }
            <TextField  multiline maxRows={20} size='small' style={{width: '90%'}} name="searchString" label="Boolean Search String" type="text" 
                onChange={onChange}/>
            
            <Button disabled={!searchString} style={{marginTop: '1rem', alignSelf: 'center',textAlign: 'center', width: '20%', backgroundColor: '#1976d2', color: 'black'}} variant='contained' color='primary' onClick={onSubmit}>
                Format
            </Button>
            <TextField  multiline maxRows={20} size='small' style={{marginTop: '2rem', width: '90%'}} value={parsed || ''} label="Pro-Edgar Format" InputProps={{readOnly: true}}
            />
        </div>
    </Box>
    
    )
}

export default EdgarParser;