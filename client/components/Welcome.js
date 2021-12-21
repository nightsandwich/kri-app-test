import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, IconButton, Typography, Tooltip } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import Users from "./Users";

const Welcome = ({auth, logout}) => {
  

    return (
       
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' marginRight='.5rem' paddingBottom={0}>
          <Box paddingBottom={0} marginBottom={0}>
            <Typography sx={{color: 'black'}}>
              Hi, {auth.initials}!
            </Typography>
          </Box>
          <Box display='flex' margin={0}>
            <Box margin={0}>
              <Tooltip title="Profile">
                <IconButton
                  style={{
                    borderRadius: 4,
                    alignSelf: 'center',
                    color: '#1976d2', 
                  }}
                  component={Link}
                  to='/profile'
                  size='small'
                >
                  <AccountBoxIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
            <Tooltip title="Log Out">
                <IconButton
                  style={{
                    borderRadius: 4,
                    alignSelf: 'center',
                    color: '#1976d2',
                  }}
                  size='small'
                  onClick={logout}
                  
                >
                  <ExitToAppIcon fontSize="large"/>
                </IconButton>
              </Tooltip>
              {/* <Tooltip title="Log Out">
                <Button
                  style={{
                    borderRadius: 4,
                    border: '2px solid grey',
                    width: '10%',
                    alignSelf: 'center',
                    color: '#1976d2', 
                    fontWeight: 'bold',
                  }}
                  onClick={logout}
                  size='small'
                  startIcon={<LogoutIcon />}
                >
                </Button>
              </Tooltip> */}
            </Box>
          </Box>
        </Box>
    
    
    )
}

export default Welcome;