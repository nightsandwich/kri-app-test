import React , {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';
import { editCounty } from "../store";
import {Button, Typography, Box } from '@mui/material';
import ProjectSummary from "./ProjectSummary";
import CloseIcon from '@mui/icons-material/Close';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

const ProjectCounties = ({handleClose}) => {
    const dispatch = useDispatch();
    let counties = useSelector(({counties}) => counties.filter(county => county.inProject));
    counties = counties.sort((a,b) => a.name < b.name ? -1 : 1)
    const states = useSelector(({states}) => states)

    const clearNotes = () => {
        counties.forEach(county => dispatch(editCounty({...county, inProject: false})));
    }
    return(
        <Box>
            <Button startIcon={<CloseIcon style={{color: 'black', alignContent: 'left'}}/>} onClick={handleClose} ></Button>
            <Box style={{ backgroundColor: 'cornsilk', border: '1px solid black', borderRadius: 4, width: '20rem', margin: '1rem', alignSelf: 'center'}}>
                <Typography ml='1rem' variant='subtitle1' color='black' sx={{textAlign: 'center'}}>
                    Counties in Project
                </Typography>
                <hr></hr>
                    {counties.map(county => {
                        const abbreviation = states.find(state => county.stateId === state.id).abbreviation
                        return (
                            <div key={county.id} style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div>
                                    <Button startIcon={<IndeterminateCheckBoxIcon style={{color: '#1976d2', fontWeight: 'bold'}}/>} onClick={()=>dispatch(editCounty({...county, inProject: false}))} >
                                    </Button>
                                </div>    
                                <div >
                                    <Typography key={county.id} color='black' variant='subtitle2'>{county.name} 
                                    </Typography>
                                </div>    
                                <div>
                                    <Typography key={county.id} style={{marginRight: '2rem'}} color='black' variant='subtitle2'>({abbreviation}) 
                                    </Typography>
                                </div>
                            </div>      
                        );
                    })}
                    <div style={{textAlign: 'center', marginBottom: '1rem'}}>
                        <Button style={{alignSelf: 'center', color: '#1976d2', fontWeight: 'bold'}} variant='outlined'  color='primary' onClick={clearNotes}>Clear Project ({counties.length}) </Button>
                    </div>
            </Box>
            
      </Box>
    )
}


export default ProjectCounties;