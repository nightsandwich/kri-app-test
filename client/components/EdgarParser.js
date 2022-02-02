import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from 'react-redux';

import { TextField, Menu, FormControl, FormControlLabel, InputLabel, Checkbox, Button, Box, Typography, Stack, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Parser from "./Parser";

const EdgarParser = () => {
  const Instructions = () => (
    <Stack>
      <Typography  variant='subtitle1' >
        Paste in the boolean search string used for Lexis or ProQuest.
      </Typography>
      <Typography  variant='subtitle1' color='text.secondary'>
      ---Example---
      </Typography>
      <Typography  variant='subtitle1' color='text.secondary'>
      ((tom OR thomas) w/2 lastname) AND ("company name" OR (another w/2 name) OR (word AND word AND "multiple words"))
      </Typography>
      <Typography  variant='subtitle1' color='text.secondary'>
      ((tom OR thomas) n/2 lastname) AND ("company name" OR (another n/2 name) OR (word AND word AND "multiple words"))
      </Typography>
    </Stack>
  )
  const searchLabel = 'Boolean Search String'
  const resultsLabel = 'EDGAR Pro Format'

  const parser = str => {
    const andReg = /(?: AND )/gmi;
    const orReg = /(:? OR )/gmi;
    const wReg = /(:? w\/2 )/gmi;
    const nReg = /(:? n\/2 )/gmi;
    const qReg = /(:?")/gmi;
    let ret = str.replace(orReg, ' <OR> ').replace(andReg, ' <AND> ').replace(wReg, ' <near/2> ').replace(nReg, ' <near/2> ').replace(qReg,'')
    return ret
  }
    
  return (
    <Parser Instructions = {Instructions} searchLabel={searchLabel} resultsLabel={resultsLabel} parser={parser} />
  )
}

export default EdgarParser;