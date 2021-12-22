import React, {useEffect, forwardRef} from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import {loadStates, loadCounties, loadNotes, editCounty, deleteNote, deleteCounty} from '../store'
import { useDispatch } from 'react-redux';
import MaterialTable, { MTableToolbar } from 'material-table';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AddBox from '@mui/icons-material/AddBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Clear from '@mui/icons-material/Clear';
import Edit from '@mui/icons-material/Edit';
import FilterList from '@mui/icons-material/FilterList';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import Remove from '@mui/icons-material/Remove';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Search from '@mui/icons-material/Search';
import Delete from '@mui/icons-material/Delete';
import ViewColumn from '@mui/icons-material/ViewColumn';
import StorageIcon from '@mui/icons-material/Storage';
import SummaryForm from './SummaryForm';
import NoteForm from './NoteForm';

import AddLocationSharpIcon from '@mui/icons-material/AddLocationSharp';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Typography } from '@material-ui/core';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

import CircularLoading from './CircularLoading';

const CountiesTable = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const stateId = +(history.location.pathname.slice(8));
    
    const auth = useSelector(state => state.auth);
    const state = useSelector(state => state.states.find(st => st.id === stateId));
    let counties = useSelector(state => state.counties.filter(county => county.stateId === stateId));
    let notes = useSelector(state => state.notes);
    // const [isLoaded, setIsLoaded] = useState(false)

    // useEffect(() => {
    //     async function loadData (){
    //         await dispatch(loadStates());
    //         await dispatch(loadNotes());
    //         await dispatch(loadCounties());
    //         setIsLoaded(true)
    //     };
    //     loadData();
    // }, []);

    
    const [open, setOpen] = useState(false);
    const [openNote, setOpenNote] = useState(false);
    const [action, setAction] = useState('');
    
    const [countyId, setCountyId] = useState('');
    const [note, setNote] = useState('');
    const [openProject, setOpenProject] = useState(false);

    const handleOpenProject = (ev) => {
        setOpenProject(true);
    }
    
    // if (!isLoaded) return <CircularLoading />
    if (!state || !counties || !notes || !auth) return <CircularLoading />
    const stateName = state.name;
    counties = counties.sort((a,b) => a.name < b.name ? -1 : 1)
    
    const handleOpen = (ev, id, model, editOrAdd) => {       
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

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} style={{
            color: '#099451'}}/>),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <Delete {...props} ref={ref} style={{color: 'red'}}/> ),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} style={{
            color: '#1976d2'}}/>),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => ''),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
        AddLocationIcon: forwardRef((props, ref) => <AddLocationSharpIcon {...props} ref={ref} style={{
            color: '#099451'}} variant='outlined'/>),
        CreateNewFolderIcon: forwardRef((props, ref) => <CreateNewFolderIcon {...props} ref={ref} style={{
            color: '#F1B501'}}/>),
        
      };

    const columns = [
        { title: 'In Project', field: 'inProject', type: 'boolean' },
        { title: 'County', field: 'name' },
        { title: 'Summary', field: 'summary',
            cellStyle: {
                width: 20,
                maxWidth: 20,
            },
            headerStyle: {
                width: 20,
                maxWidth: 20
            }
        },
        { title: 'Number of Links', field: 'notes'}
    ];
    
    
    
    // if (!counties) return <CircularLoading />

    const data = counties.map( county => (
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
    
    
    // counties = counties.sort((a,b) => a.name < b.name ? -1 : 1)
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
    // if (data.length === 0) return <CircularLoading />

    return (
        <>
        <Dialog onClose={handleClose} open={openNote} fullWidth maxWidth='lg'>
            <NoteForm note={note} countyId={countyId} action={action} handleClose={handleClose} auth={auth}/>
        </Dialog>
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='lg'>
            <SummaryForm stateId={stateId}  countyId={countyId} action={action} handleClose={handleClose} />
        </Dialog>
        <MaterialTable
            title={title}
            icons={tableIcons}
            columns={columns}
            data={data}
            options={{
                filtering: false,
                grouping: true,
                search: true,
                toolbarButtonAlignment: 'left',
                pageSize: 20,
                pageSizeOptions: [20, 40, 60, 80, 100],
                headerStyle: {
                    color: 'darkslate',
                    background: '#D7EBF8',
                }
            }}
            components={{
                Toolbar: props => (
                    <div style={{ backgroundColor: '#e8eaf5' }}>
                        <MTableToolbar {...props} />
                    </div>
                )
            }}
            actions={[
                {
                    icon: tableIcons.CreateNewFolderIcon,
                    tooltip: 'Add to Project',
                    isFreeAction: false,
                    onClick: (ev, rowData) => dispatch(editCounty({id: rowData.id, inProject: true}))
                },
                {
                    icon: tableIcons.Add,
                    tooltip: 'Add Link',
                    position: 'row',
                    onClick: (ev, rowData) => handleOpen(ev, rowData.id, 'note', 'add')
                },
                {
                    icon: tableIcons.Edit,
                    tooltip: 'Edit County',
                    position: 'row',
                    onClick: (ev, rowData) => handleOpen(ev, rowData.id, 'county', 'edit')
                },
                {
                    icon: tableIcons.AddLocationIcon,
                    tooltip: `${iconTitle}`,
                    isFreeAction: true,
                    onClick: (ev) => handleOpen(ev, stateId, 'state', 'add')
                },
                {
                    icon: tableIcons.Delete,
                    tooltip: 'Delete County',
                    position: 'row',
                    onClick: async (ev,rowData) => {
                        await dispatch(deleteCounty(rowData.id));
                        await dispatch(loadStates());
                        await dispatch(loadCounties());
                    }
                }
            ]}
            style={{
                margin: '1rem',
                marginTop: '5rem',
                fontFamily: "Roboto, Helvetica, Arial, sansSerif",
                marginBottom: '6rem'
            }}
            detailPanel={rowData => {
                return (
                    <MaterialTable
                        components={{
                            Toolbar: props => (
                                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}>
                                    <MTableToolbar {...props} />
                                </div>
                            )
                        }}
                        title='RESEARCH LINKS'
                        icons={tableIcons}
                        columns={[
                            { title: 'Website', field: 'title',
                            render: (rowData) => (
                                <a
                                  href={rowData.link}
                                  target="_blank"
                                  style={{ textDecoration: 'none' }}
                                >
                                  {rowData.title}
                                </a>
                              ) }
                            ,
                            { title: 'Note', field: 'text',
                                cellStyle: {
                                    width: 20,
                                    maxWidth: 20,
                                    wordWrap: 'break-word'
                                },
                                headerStyle: {
                                    width: 20,
                                    maxWidth: 20
                                }
                            },
                            { title: 'Receipt', field: 'paid', type: 'boolean'},
                            { title: 'Password', field: 'password', type: 'boolean'},
                            { title: 'Edited By', field: 'editor'},
                        ]}
                        data={rowData.notesDetail}
                        actions={[
                            {
                                icon: tableIcons.Edit,
                                tooltip: 'Edit Link',
                                position: 'row',
                                onClick: (ev,rowData) => handleOpen(ev, rowData, 'note', 'edit')
                            },
                            {
                                icon: tableIcons.Delete,
                                tooltip: 'Delete Link',
                                position: 'row',
                                onClick: async (ev,rowData) => {
                                    await dispatch(deleteNote(rowData.id));
                                    await dispatch(loadStates());
                                    await dispatch(loadCounties());
                                }
                            }
                        ]}
                        style={{
                            fontFamily: "Roboto, Helvetica, Arial, sansSerif"
                        }}
                        options={{
                            pageSize: 10,
                            pageSizeOptions: [10, 20],
                            headerStyle: {
                                color: 'darkslate',
                                background: '#D7EBF8',
                            }
                        }}
                    />
                );
            }}
        />
        </>
    )

}

export default CountiesTable;