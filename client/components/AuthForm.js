import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'

import { Box, Avatar, TextField, Typography, Button, Link, Container, SvgIcon, Grid,} from '@mui/material';
import FindInPageIcon from '@mui/icons-material/FindInPage';
/**
 * COMPONENT
 */
const AuthForm = props => {
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
        {/* <Box
            sx={{
              mt: 2,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center'
            }}
            > */}
            <Box component="form" onSubmit={handleSubmit} name={name} sx={{ mt: 0, ml: 0, pl: 0, fontSize: 'smaller', }}>
                <TextField
                    // margin='dense'
                    required
                    // size='small'
                    fullWidth
                    id="initials"
                    label="Username"
                    name="initials"
                    autoComplete="username"
                    autoFocus
                    variant='filled'
                    />
              
                <TextField
                    // margin='dense'
                    required
                    fullWidth
                    // size='small'
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
                
          {/* </Box> */}
        </Box>
      </Container >
    //   <div>
    //   <form onSubmit={handleSubmit} name={name}>
    //   <div>
    //   <label htmlFor="initials">
    //   <small>Username</small>
    //   </label>
    //       <input name="initials" type="text" />
    //     </div>
    //     <div>
    //       <label htmlFor="password">
    //         <small>Password</small>
    //       </label>
    //       <input name="password" type="password" />
    //     </div>
    //     <div>
    //       <button type="submit">{displayName}</button>
    //     </div>
    //     {error && error.response && <div> {error.response.data} </div>}
    //   </form>
    // </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
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

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
