import React, {useState} from "react";

import { TextField, Button, Box } from "@mui/material";

const Parser = ({Instructions, searchLabel, resultsLabel, parser}) => {
    const [searchString, setSearchString] = useState('');
    const [parsed, setParsed] = useState('');
    
    const onChange = ev => {
      ev.persist();
      setSearchString(ev.target.value);
    }
    
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