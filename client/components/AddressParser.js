import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from 'react-redux';

import { TextField, Menu, FormControl, FormControlLabel, InputLabel, Checkbox, Button, Box, Typography, MenuItem } from "@mui/material";
import Parser from "./Parser";


const AddressParser = () => {
  const parser = str => {
    let spl = str.toUpperCase().split('\n');

    if (str.includes('(')){
      spl = spl.join(' ').split(') ')
    
    } else {
      for (const item of spl){
        item === '' ? spl.shift() : '';
      }
      spl = spl.join(' ').split(/\d{5}\-\d{4}/);

      for (let i = 0; i < spl.length; i++){
        let item = spl[i].split(' ')
        if (item[0] === ''){
          item.splice(0, 2);
        }
          spl[i] = item.join(' ')
      }
    }
    const setParsed = spl.reduce((accum, item) => {
      let itemArr = item.split(' ');
      itemArr[0] === '' ? itemArr.shift() : '';
      const boxIdx = itemArr.indexOf('BOX')
      if (itemArr[1]){
        if (itemArr[1].length === 1) {
          const retStr = itemArr[0].concat(' ', itemArr[1], ' ', itemArr[2]);
          accum.add(`"${retStr}"`);
          if(itemArr[1] === 'N'){
            accum.add(`"${itemArr[0].concat(' NORTH ', itemArr[2])}"`);
          }
          if(itemArr[1] === 'S'){
            accum.add(`"${itemArr[0].concat(' SOUTH ', itemArr[2])}"`);
          }
          if(itemArr[1] === 'E'){
            accum.add(`"${itemArr[0].concat(' EAST ', itemArr[2])}"`);
          }
          if(itemArr[1] === 'W'){
            accum.add(`"${itemArr[0].concat(' WEST ', itemArr[2])}"`);
          }
        } else if (boxIdx > -1){
          accum.add(`"${itemArr[boxIdx].concat(' ',itemArr[boxIdx + 1])}"`)
        } else if (itemArr[0][0] !== '(' ){
        accum.add(`"${itemArr[0].concat(' ', itemArr[1])}"`)
        } 
      } 
      return accum;
    }, new Set())
    let returnStr = ''
    setParsed.forEach((item) => returnStr += item + ' OR ')
    return returnStr.slice(0,-4)

  }
  const Instructions = () => (
    <>
      <Typography  variant='subtitle1' >
        Paste in the subject's addresses (making sure to delete any unrelated lines such as 'Utility Locator...' or page headings). Both TLO and IRB formats will work, like in the examples below.
      </Typography>
      <Typography  variant='subtitle1' color='text.secondary'>
      ---TLO---
      </Typography>
      <Typography  variant='subtitle1' color='text.secondary'>
        4420 1ST PL NE APT 31, WASHINGTON, DC 20011-4954 (DISTRICT OF COLUMBIA COUNTY) (07/11/2019 to 07/11/2019) 
  1823 CAMBRIDGE BLVD, COLUMBUS, OH 43212-1932 (FRANKLIN COUNTY) (04/01/2010 to 06/05/2014)
      </Typography>
      <Typography  variant='subtitle1' color='text.secondary'>
      ---IRB---
      </Typography>
      <Typography  variant='subtitle1' color='text.secondary'>
      7490 E DREYFUS AVE, SCOTTSDALE, AZ 85260-3909 MARICOPA 1823 CAMBRIDGE BLVD, COLUMBUS, OH 43212-1932 FRANKLIN
      </Typography>
    </>
    )
    const searchLabel = 'Addresses String'      
    const resultsLabel = 'Boolean Format'      
    return (
      <Parser Instructions = {Instructions} searchLabel={searchLabel} resultsLabel={resultsLabel} parser={parser} />
    )
}

export default AddressParser;