import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from 'react-redux';

import { TextField, Menu, FormControl, FormControlLabel, InputLabel, Checkbox, Button, Box, Typography, Stack, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


const Parser = ({Instructions, parser, searchLabel, resultsLabel }) => {
    const [searchString, setSearchString] = useState('');

    const onChange = ev => {
      ev.persist();
      setSearchString(ev.target.value);
    }
    
    const [parsed, setParsed] = useState('');
    
    const onSubmit = (ev) => {
        ev.preventDefault();
        setParsed(parser(searchString));
    }

    return (
      <div style={{display: 'flex', flexDirection: 'column', marginTop: '4rem', marginBottom: '4rem', alignContent: 'center'}}>
        <Box textAlign='center' sx={{mb: 1}}>
          <Instructions/>
        </Box>
            <TextField  multiline maxRows={100} size='small' name="searchString" label={searchLabel} type="text" required
                onChange={onChange}/>
            
            <Button style={{marginTop: '1rem', alignSelf: 'center',textAlign: 'center', width: '20%', backgroundColor: '#1976d2', color: 'black'}} variant='contained' color='primary' onClick={onSubmit}>
                Format
            </Button>
        <TextField  multiline maxRows={100} size='small' style={{marginTop: '2rem'}} value={parsed || ''} label={resultsLabel} InputProps={{readOnly: true}}
        />
    </div>
    
    )
}

export default Parser;