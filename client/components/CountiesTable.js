import React, {useEffect, forwardRef} from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {loadStates, editCounty, deleteCounty, deleteNote} from '../store'
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import AddBox from '@mui/icons-material/AddBox';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
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

const CountiesTable = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const stateId = +(history.location.pathname.slice(8));
    
    const auth = useSelector(state => state.auth);
    const state = useSelector(state => state.states.find(st => st.id === stateId));
    let counties = useSelector(state => state.counties.filter(county => county.stateId === stateId));
    let notes = useSelector(state => state.notes);

    const [open, setOpen] = useState(false);
    const [openNote, setOpenNote] = useState(false);
    const [action, setAction] = useState('');
    
    const [countyId, setCountyId] = useState('');
    const [note, setNote] = useState('');
    const [openProject, setOpenProject] = useState(false);

    const handleOpenProject = (ev) => {
        setOpenProject(true);
    }
    
    if (!state || !counties || !notes || !auth) return <CircularLoading />
    
    const stateName = state.name;
    counties = counties.sort((a,b) => a.name < b.name ? -1 : 1)
    
    const handleOpen = (id, model, editOrAdd) => {       
        if (editOrAdd === 'edit'){
            setAction('edit')
            if (model === 'state'){
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
            if (model === 'county' || model === 'state') {
                setOpen(true)
            } else if (model === 'note'){
                setCountyId(id)
                setOpenNote(true)
            }
        }

    }
    const handleClose = (ev) => {
        ev.preventDefault();
        setOpen(false);
        setOpenNote(false);
        setOpenProject(false);
        setCountyId('');
        setNote('');
        setAction('');
    }

    const rows = counties.map( county => (
        {
            inProject: county.inProject,
            name: county.name,
            summary: county.summary,
            notesDetail: notes.filter(note => note.countyId === county.id).map(note => (
                {
                    title: note.title,
                    link: note.link,
                    text: note.text,
                    paid: note.paid,
                    password: note.password,
                    editor: note.user.initials,
                    id: note.id,
                    countyId: note.countyId
                }
            )),
            notes: notes.filter(note => note.countyId === county.id).length,
            id: county.id
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
                  onClick={() => setOpenExpand(!openExpand)}
                >
                  {openExpand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
                <TableCell align='left' sx={{width: '30%'}}>
                    
                    
                  <Tooltip title='Edit County'>
                    <IconButton
                      aria-label="edit county"
                      size="small"
                      sx={{color: '#1976d2'}}
                      onClick={() => handleOpen(row.id, 'county', 'edit')}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Delete County'>
                    <IconButton
                      aria-label="delete county"
                      size="small"
                      sx={{color: 'red'}}
                      onClick={() => dispatch(deleteCounty(row.id))}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                  {row.name}
                </TableCell>
              <TableCell align="left" sx={{width: '40%'}} >{row.summary}</TableCell>
              <TableCell align="center" >
                <Tooltip title='Add County Link'>
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
                <Tooltip title='Add to Project'>
                  <IconButton
                    aria-label="add county to project"
                    size="small"
                    sx={{color: '#F1B501'}}
                    onClick={() => dispatch(editCounty({id: row.id, inProject: true}))}
                  >
                    <CreateNewFolderIcon />
                  </IconButton>
                </Tooltip>
                
                    <Checkbox checked={row.inProject} disabled/>
                
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={openExpand} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }} textAlign={'center'}>
                    <Typography variant="h6" gutterBottom component="div">
                      Research Links
                    </Typography>
                    <Table size="small" aria-label="research-links">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{fontWeight: 'bold'}}>
                            Website
                          </TableCell>
                          <TableCell sx={{fontWeight: 'bold'}}
                          align='left'
                          >Note</TableCell>
                          <TableCell sx={{fontWeight: 'bold'}}  align="center">Receipt</TableCell>
                          <TableCell sx={{fontWeight: 'bold'}}  align="center">Password</TableCell>
                          <TableCell sx={{fontWeight: 'bold'}}  align="right">Edited By</TableCell>
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
                              <a href={notesDetail.link}>
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

    const title = `COUNTIES IN ${stateName.toUpperCase()}`
    const iconTitle = `Add New County to ${stateName}`

    if (counties.length === 0) {
        return (
            <div style={{margin: '2rem', marginTop: '5rem'}}>
            <Typography>
                No counties have been added to {stateName}. Add one below.
            </Typography>
            <Button style={{marginTop: '1rem', color: '#1976d2', fontWeight: 'bold'}} variant='outlined' onClick={(ev)=>handleOpen(ev, stateId, 'state', 'add')}>Add County to {stateName}</Button>
            <Dialog onClose={handleClose} open={open} fullWidth maxWidth='lg'>
            <SummaryForm stateId={stateId}  countyId={countyId} action={action} handleClose={handleClose} />
            </Dialog>
            </div>
        )
    }

    return (
        <>
        <Dialog onClose={handleClose} open={openNote} fullWidth maxWidth='lg'>
            <NoteForm note={note} countyId={countyId} action={action} handleClose={handleClose} auth={auth}/>
        </Dialog>
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='lg'>
            <SummaryForm stateId={stateId}  countyId={countyId} action={action} handleClose={handleClose} />
        </Dialog>
        <TableContainer component={Paper} sx={{mt: 10}}>
            <Table aria-label="collapsible table" minWidth='375px' >
                <TableHead sx={{position:'sticky'}}>
                  <TableRow>
                      <TableCell sx={{fontWeight: 'bold', fontSize: '1rem', position:'sticky'}} align='center' colSpan={5}>{title}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell />
                      <TableCell align='left' sx={{fontWeight: 'bold', position:'sticky'}} >County</TableCell>
                      <TableCell sx={{fontWeight: 'bold'}} align="left">Summary</TableCell>
                      <TableCell sx={{fontWeight: 'bold'}} align="center">Number of Links</TableCell>
                      <TableCell sx={{fontWeight: 'bold'}} align="center">In Project</TableCell>
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

export default CountiesTable;