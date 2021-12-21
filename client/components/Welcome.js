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
       
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' marginRight='.5rem'>
          <Box marginBottom={0}>
            <Typography>
              Welcome, {auth.initials}!
            </Typography>
          </Box>
          <Box display='flex' marginTop={0}>
            <Box>
              <Tooltip title="Profile">
                <IconButton
                  style={{
                    borderRadius: 4,
                    alignSelf: 'center',
                    color: 'white', 
                    fontWeight: 'bold',
                  }}
                  component={Link}
                  to='/profile'
                  size='medium'
                >
                  <AccountBoxIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
            <Tooltip title="Log Out">
                <IconButton
                  style={{
                    borderRadius: 4,
                    alignSelf: 'center',
                    color: 'white', 
                    fontWeight: 'bold',
                  }}
                  onClick={logout}
                  size='medium'
                >
                  <ExitToAppIcon />
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