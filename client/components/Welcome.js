import React from "react";
import { useSelector } from "react-redux";
import { Box, Button, Typography, Tooltip } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
// import Users from "./Users";

const Welcome = ({firstName, logout}) => {
  

    return (
        <Box
        display="flex" 
        flexDirection='column'
        // width='auto'
        maxWidth='lg'
        // border='1px solid black'
        alignItems='center'
        justifyContent='center'
        // ml='1rem'
        // mr='1rem'
      >
        <Box width='100%'>
          <Typography variant='subtitle1' color='black'>
            Welcome {firstName}!
          </Typography>
        </Box>
        <Box>
          <Tooltip title="Log Out">
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
            </Tooltip>
        </Box>
        {/* <Button color='primary' variant='contained' onClick={logout}>TODO: ADD LOGOUT ICON</Button> */}
      </Box>
    
    
    )
}

export default Welcome;