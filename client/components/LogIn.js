import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'

import { Box, TextField, Typography, Button, Container, Grid,} from '@mui/material';

const _LogIn = props => {
  const {name, handleSubmit, error} = props

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center'
        }}
        >
          <Box color='primary' sx={{ mb: 0, p: 1, }} >
              <img src='apple-touch-icon.png' height='80px'/>
            <Typography variant="h5">
                Sign In
            </Typography>
          </Box>
        <Box component="form" onSubmit={handleSubmit} name={name} sx={{ mt: 0, ml: 0, pl: 0, fontSize: 'smaller', }}>
            <TextField
                required
                fullWidth
                id="initials"
                label="Username"
                name="initials"
                autoComplete="username"
                autoFocus
                variant='filled'
                />
          
            <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                variant='filled'
                />
          <Grid container justify='center'>
            <Grid item xs={12} >
              <Button
                  type="submit"
                  fullWidth
                  variant="contained" 
                  >
                  SUBMIT
              </Button>
              </Grid>
              </Grid>
              {error && error.response && (
                <Typography align='center' sx={{ color: 'red' }}>
                      {error.response.data}
                  </Typography>
              )}
          </Box>
        </Box>
      </Container >
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const initials = evt.target.initials.value
      const password = evt.target.password.value
      dispatch(authenticate(initials, password, formName))
    }
  }
}

export const LogIn = connect(mapLogin, mapDispatch)(_LogIn)
