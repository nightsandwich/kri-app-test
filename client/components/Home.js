import React from 'react'
import { useEffect, forwardRef } from 'react'
import {connect} from 'react-redux'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { loadStates, loadCounties, loadNotes, deleteNote } from '../store'
import SummaryForm from './SummaryForm';
import NoteForm from './NoteForm';
import CircularLoading from './CircularLoading';
import { Typography, Box, Button } from '@mui/material';
/**
 * COMPONENT
 */
export const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  

  if (!auth) return <CircularLoading />

  return (
      <Box 
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        marginTop='5rem'
    >
      <Box >
        <Typography>
            Welcome, {auth.initials}!
        </Typography>
      </Box>
      <Box >
        <Button variant='outlined' color="inherit" component={Link} to="/profile">
              Edit Info
        </Button>
      </Box>
    </Box>

  )
}

export default Home
