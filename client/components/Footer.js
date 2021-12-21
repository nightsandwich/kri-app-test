import React from 'react';
import Typography from '@mui/material/Typography';


export default function Footer() {

  return (
    <footer className='footer' style={{backgroundColor: '#D7EBF8', borderRadius: 3, border: '1px dotted grey',  height: 'auto', position: 'fixed', width: '100%', bottom: '0',  boxShadow: '0 8px 8px -2px lightgrey'}}>
        <Typography variant="subtitle1" style={{color: 'darkslategrey', textAlign: 'left', padding: '1rem'}}>
          Made by Corinne ©2021 
          {/* Made by Corinne from <a href='http://www.fullstackacademy.com' style={{textDecoration: 'underline', color: 'red'}}>Fullstack Academy</a> © 2021  */}
        </Typography>
    </footer>
      
      
  );
}