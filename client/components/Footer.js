import React from 'react'

////////////////// MATERIAL UI ////////////////
import { Box, Grid, IconButton, Appbar, Typography, Link } from '@mui/material';
import { GitHub as GitHubIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';

const Footer = () => {
    return (
        
        <footer className='footer' style={{backgroundColor: '#078BEC',  height: 'auto', position: 'fixed', width: '100%', bottom: '0', marginLeft: '0', boxSizing: 'border-box'}}>
                <Box display='flex' alignItems='center' sx={{ml: 0}} >
                    <Typography variant="subtitle1" sx={{color: 'text.secondary', textAlign: 'left', ml: '1rem'}}>
                        Made by 
                    </Typography>
                    <IconButton size="small" href="https://github.com/nightsandwich" target="_blank" sx={{color: 'text.secondary', fontSize: 'inherit'}}>
                        <AccountCircleIcon />
                        {'Corinne  '}
                    </IconButton>
                    <Typography variant="subtitle2" sx={{color: 'text.secondary'}}>
                        © {new Date().getFullYear()}
                    </Typography>
                </Box>

        </footer>
            
    )
}

export default Footer