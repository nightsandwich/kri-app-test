import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//////////// MUI //////////////////
import { Badge, Avatar, Box, Button, Container, IconButton, Grid, TextField, Typography, Alert as MuiAlert, Snackbar } from '@mui/material';
import { Edit as EditIcon, VpnKey as VpnKeyIcon } from '@mui/icons-material';

////////////// REDUX ////////////////
import { editUser, me } from '../store'

const Profile = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth);

  const [input, setinput] = useState({
    initials: auth.initials || '',
    firstName: auth.firstName || '',
    lastName: auth.lastName || '',
    repeatInfoError: '',
  })

  const handleChange = (evt) => {
    const name = evt.target.name
    const value = evt.target.value

    setinput({ ...input, [name]: value, disabled: !input.initials, repeatInfoError: '' })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      await dispatch(editUser({ id: auth.id, ...input }));
      await dispatch(me({ id: auth.id, ...input }));
      setOpenAlert(true)
    }
    catch (error) {
      console.log(error)
      setinput({ ...input, repeatInfoError: 'Username already exists' })

    }
  }
  //////////// SNACKBAR ALERT //////////////////
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  });

  const [openAlert, setOpenAlert] = useState(false)
  const handleClose = () => {
    setOpenAlert(false);
  }

  return (
    <Container component="main" maxWidth="xs" >
      <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Profile Updated!
        </Alert>
      </Snackbar>
      <Box
        sx={{
          marginTop: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        
        <Avatar sx={{ height: 60, width: 60, m: 1, bgcolor: 'primary.main' }}  >
          <EditIcon/>
        </Avatar>
        
        <Typography component="h1" variant="h5">
          {auth.initials}'s Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={input.firstName || ''}
                autoFocus
                onChange={handleChange}
                variant='standard'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={input.lastName || ''}
                autoComplete="family-name"
                onChange={handleChange}
                variant='standard'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="initials"
                label="Username"
                name="initials"
                value={input.initials || ''}
                autoComplete="username"
                onChange={handleChange}
                variant='standard'
              />
            </Grid>
            {
              input.repeatInfoError &&
              <Grid item xs={12}>
                <Typography variant='caption' sx={{ color: 'red' }}>
                  {input.repeatInfoError}
                </Typography>
              </Grid>
            }
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={input.disabled}
                sx={{mb: 2 }}
              >
                Update Information
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                component={Link}
                to='/profile/password'
                variant='contained'
                fullWidth
                startIcon={<VpnKeyIcon />}
                >
                Change Password
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Profile;