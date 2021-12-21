import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from 'react-redux';

import { TextField, Menu, FormControl, FormControlLabel, InputLabel, Checkbox, Button, Box, Typography, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


const AddressParser = () => {
    const dispatch = useDispatch();
    
    const [addresses, setAddresses] = useState('');

    const parser = str => {
        let spl = str.split('\n');

  if (str.includes('(')){
    spl = spl.join(' ').split(') ')
    
  } else {
    for (const item of spl){
      item === '' ? spl.shift() : '';
    }
    spl = spl.join(' ').split(/\d{5}\-\d{4}/);

    for (let i = 0; i < spl.length; i++){
      let item = spl[i].split(' ')
      //console.log(item)
      //console.log(item[0])
      if (item[0] === ''){
        item.splice(0, 2);
      }
        spl[i] = item.join(' ')
    }
  }
  //console.log('SPL!:',spl)
  //console.log(str.split('\n'))
  return spl.reduce((accum, item) => {
      let itemArr = item.split(' ');
      
      itemArr[0] === '' ? itemArr.shift() : '';
      
      if (itemArr[1]){
        if (itemArr[1].length === 1) {
          const retStr = itemArr[0].concat(' ', itemArr[1], ' ', itemArr[2]);
          accum.push(`"${retStr}"`);
          if(itemArr[1] === 'N'){
            accum.push(`"${itemArr[0].concat(' NORTH ', itemArr[2])}"`);
          }
          if(itemArr[1] === 'S'){
            accum.push(`"${itemArr[0].concat(' SOUTH ', itemArr[2])}"`);
          }
          if(itemArr[1] === 'E'){
            accum.push(`"${itemArr[0].concat(' EAST ', itemArr[2])}"`);
          }
          if(itemArr[1] === 'W'){
            accum.push(`"${itemArr[0].concat(' WEST ', itemArr[2])}"`);
          } 
        } else if (itemArr[0][0] !== '(' ){
        accum.push(`"${itemArr[0].concat(' ', itemArr[1])}"`)
        } 
      } 
    return accum;
  }, []).join(' OR ')
      }
    
    const onChange = ev => {
            ev.persist();
            setAddresses(ev.target.value);
        }
    
    const [parsed, setParsed] = useState('');

    const onSubmit = (ev) => {
        ev.preventDefault();
        setParsed(parser(addresses));
    }

    const instString = `Paste in the subject's addresses (making sure to delete any unrelated lines such as 'Utility Locator...' or page headings). Both TLO and IRB formats will work, like in the examples below.
    
---TLO---
4420 1ST PL NE APT 31, WASHINGTON, DC 20011-4954 (DISTRICT OF COLUMBIA COUNTY) (07/11/2019 to 07/11/2019) 
1823 CAMBRIDGE BLVD, COLUMBUS, OH 43212-1932 (FRANKLIN COUNTY) (04/01/2010 to 06/05/2014)

---IRB---
7490 E DREYFUS AVE, SCOTTSDALE, AZ 85260-3909 MARICOPA 1823 CAMBRIDGE BLVD, COLUMBUS, OH 43212-1932 FRANKLIN
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
                <Instructions />
                : ''
            }
            <TextField  multiline maxRows={15} size='small' style={{width: '90%'}} name="addresses" label="Addresses" type="text" 
                onChange={onChange}/>
            
            <Button disabled={!addresses} style={{marginTop: '1rem', alignSelf: 'center',textAlign: 'center', width: '20%', backgroundColor: '#1976d2', color: 'black'}} variant='contained' color='primary' onClick={onSubmit}>
                Format
            </Button>
            <TextField  multiline maxRows={15} size='small' style={{marginTop: '2rem', width: '90%'}} value={parsed || ''} label="Boolean Format" InputProps={{readOnly: true}}
            />
        </div>
    </Box>
    
    )
}

export default AddressParser;