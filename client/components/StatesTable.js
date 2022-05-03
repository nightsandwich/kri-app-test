import React, {useEffect, forwardRef} from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {loadStates, loadCounties, deleteNote} from '../store'
import Dialog from '@mui/material/Dialog';
import Link from '@mui/material/Link';
import AddBox from '@mui/icons-material/AddBox';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import ExploreIcon from '@mui/icons-material/Explore';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SummaryForm from './SummaryForm';
import NoteForm from './NoteForm';
import CircularLoading from './CircularLoading';

const StatesTable = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const states = useSelector(state => state.states.filter(state => !(['AS', 'FM', 'GU', 'PW', "VI", "MH", "MP"].includes(state.abbreviation))).sort((a,b) => a.name < b.name ? -1 : 1));
    const notes = useSelector(state => state.notes)
    const counties = useSelector(state => state.counties)
    const [isLoaded, setIsLoaded] = useState(false)

    const [open, setOpen] = useState(false);
    const [openNote, setOpenNote] = useState(false);
    const [action, setAction] = useState('');
    const [stateId, setStateId] = useState('');
    const [countyId, setCountyId] = useState('');
    const [note, setNote] = useState('');

    const handleOpen = (id, model, editOrAdd) => {       
        if (editOrAdd === 'edit'){
            setAction('edit')
            if (model === 'state'){
                setStateId(id);
                setOpen(true)
            } else if (model === 'county'){
                setCountyId(id);
                setOpen(true)
            } else if (model === 'note'){
                setNote(id);
                setOpenNote(true);
            }
        } else {
            setAction('add');
            if (model === 'county') {
                setStateId(id);
                setOpen(true)
            } else if (model === 'note'){
                setStateId(id);
                setOpenNote(true)
            }
        }

    }
    const handleClose = (ev) => {
        ev.preventDefault();
        setOpen(false);
        setOpenNote(false);
        setStateId('');
        setCountyId('');
        setNote('');
        setAction('');
    }

    if (!states || !counties || !notes || !auth ) return <CircularLoading />
    
    const rows = states.map( state => (
        {
            name: state.name,
            summary: state.summary,
            notesDetail: notes.filter(note => note.stateId === state.id).map(note => (
                {
                    title: note.title,
                    link: note.link,
                    text: note.text,
                    paid: note.paid,
                    password: note.password,
                    editor: note.user.initials,
                    id: note.id,
                    stateId: note.stateId
                }
            )),
            notes: notes.filter(note => note.stateId === state.id).length,
            counties: counties.filter(county => county.stateId === state.id).length,
            abbreviation: state.abbreviation,
            id: state.id
        }
    ));

    function Row(props) {
        const { row } = props;
        const [openExpand, setOpenExpand] = useState(false);
      
        return (
          <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  disabled={row.notes === 0}
                  onClick={() => setOpenExpand(!openExpand)}
                >
                  {openExpand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell align='left' sx={{width: '30%'}}>
                  <Link href={`/states/${row.id}`}> 
                    {row.name}
                  </Link>
                  
              </TableCell>
              <TableCell align="left" sx={{width: '40%'}}>
                <Tooltip title='Edit State Summary'>
                  <IconButton
                    aria-label="edit state summary"
                    size="small"
                    sx={{color: '#1976d2'}}
                    onClick={() => handleOpen(row.id, 'state', 'edit')}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                {row.summary}
              </TableCell>
              <TableCell align="center" >
                <Tooltip title='Add Statewide Link'>
                  <IconButton
                      aria-label="add link"
                      size="small"
                      sx={{color: '#099451'}}
                      onClick={() => handleOpen(row.id, 'note', 'add')}
                    >
                    <AddBox />
                  </IconButton>
                </Tooltip>
                {row.notes}
              </TableCell>
              <TableCell align="center" 
              >
                <a href={`/states/${row.id}`}>
                  {row.counties}
                </a>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={openExpand} timeout="auto" unmountOnExit>
                  <Box textAlign={'center'} sx={{ margin: 1, backgroundColor: '#F8F7ED', borderRadius: '7px'}}>
                    <Typography variant="h6" gutterBottom component="div">
                      Research Links
                    </Typography>
                    <Table size="small" aria-label="research-links">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                          </TableCell>
                          <TableCell align='left' sx={{fontWeight: 'bold'}}>
                            Website
                          </TableCell>
                          <TableCell align='left' sx={{fontWeight: 'bold'}}
                          >Note</TableCell>
                          <TableCell sx={{fontWeight: 'bold'}} align="center">Receipt</TableCell>
                          <TableCell sx={{fontWeight: 'bold'}} align="center">Password</TableCell>
                          <TableCell sx={{fontWeight: 'bold'}} align="right">Edited By</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.notesDetail.map((notesDetail) => (
                          <TableRow key={notesDetail.id}>
                            <TableCell component="th" scope="row">
                              <Tooltip title='Edit Link'>
                                <IconButton
                                  aria-label="edit link"
                                  size="small"
                                  sx={{color: '#1976d2'}}
                                  onClick={() => handleOpen(notesDetail, 'note', 'edit')}
                                >
                                  <Edit />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title='Delete Link'>
                                <IconButton
                                  aria-label="delete link"
                                  size="small"
                                  sx={{color: 'red'}}
                                  onClick={() => dispatch(deleteNote(notesDetail.id))}
                                >
                                  <Delete />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                            <TableCell align='left'>
                              <a href={notesDetail.link} target="_blank" rel="noreferrer noopener">
                                {notesDetail.title}
                              </a>
                            </TableCell>
                            <TableCell align='left'>{notesDetail.text}</TableCell>
                            <TableCell align="center">
                              <Checkbox checked={notesDetail.paid} disabled/>
                            </TableCell>
                            <TableCell align="center">
                              <Checkbox checked={notesDetail.password} disabled/>
                            </TableCell>
                            <TableCell align="right">
                              {notesDetail.editor}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </>
        );
    }
    
    Row.propTypes = {
        row: PropTypes.shape({
          name: PropTypes.string,
          summary: PropTypes.string,
          notes: PropTypes.number,
          county: PropTypes.number,
          notesDetail: PropTypes.arrayOf(
            PropTypes.shape({
              title: PropTypes.string,
              text: PropTypes.string,
              paid: PropTypes.bool,
              password: PropTypes.bool,
              editor: PropTypes.string,
            }),
          ),
        }),
      };

    return (
        <>
      <Dialog onClose={handleClose} open={openNote} fullWidth maxWidth='lg'>
          <NoteForm note={note} stateId={stateId}  action={action} handleClose={handleClose} auth={auth} />
      </Dialog>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth='lg'>
          <SummaryForm stateId={stateId} countyId={countyId} action={action} handleClose={handleClose} />
      </Dialog>
      <TableContainer component={Paper} sx={{mt: 10}}>
      <Table aria-label="collapsible table" sx={{maxWidth:'1058px'}} >
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: 'bold', fontSize: '1rem'}} align='center' colSpan={5}>ALL STATES</TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell align='left' sx={{fontWeight: 'bold', width: '20%'}}>State</TableCell>
            <TableCell align='left' sx={{fontWeight: 'bold', width: '60%'}}>Summary</TableCell>
            <TableCell align='center' sx={{fontWeight: 'bold', width: '10%'}}>No. of Links</TableCell>
            <TableCell align='center' sx={{fontWeight: 'bold', width: '10%'}}>No. of Counties</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </>
    )

}

export default StatesTable;