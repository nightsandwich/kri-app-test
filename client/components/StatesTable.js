import React, {useEffect, forwardRef} from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {loadStates, loadCounties, loadNotes, deleteNote} from '../store'
import MaterialTable, { MTableToolbar } from 'material-table';
import Dialog from '@mui/material/Dialog';
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
import SaveAlt from '@mui/icons-material/SaveAlt';
import Delete from '@mui/icons-material/Delete';
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';
import ExploreIcon from '@mui/icons-material/Explore';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

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

    const loadData = async () => {
        await dispatch(loadStates())
        await dispatch(loadCounties())
        await dispatch(loadNotes())
        await setIsLoaded(true)
    }

    useEffect(() => {
    loadData()
    }, [])

    
    const [open, setOpen] = useState(false);
    const [openNote, setOpenNote] = useState(false);
    const [action, setAction] = useState('');
    const [stateId, setStateId] = useState('');
    const [countyId, setCountyId] = useState('');
    const [note, setNote] = useState('');

    const handleOpen = (ev, id, model, editOrAdd) => {       
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
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => ''),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
        Explore: forwardRef((props, ref) => <ExploreIcon {...props} ref={ref} style={{
            color: '#F1B501'}}/>),
        DriveFolderUploadIcon: forwardRef((props, ref) => <DriveFolderUploadIcon {...props} ref={ref} style={{
            color: '#099451'}}/>),
      };

    const columns = [
        { title: 'State', field: 'name' },
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
        { title: 'Number of Links', field: 'notes'},
        { title: 'Number of Counties', field: 'counties'},
    ];

    const data = states.map( state => (
        {
            name: state.name,
            summary: state.summary,
            
            // notesDetail: state.notes.map(note => (
            //     {
            //         title: note.title,
            //         link: note.link,
            //         text: note.text,
            //         paid: note.paid,
            //         password: note.password,
            //         editor: note.user.initials,
            //         id: note.id,
            //         stateId: note.stateId
            //     }
            // )),
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
            // counties: state.counties.length,
            counties: counties.filter(county => county.stateId === state.id).length,
            abbreviation: state.abbreviation,
            id: state.id
        }
    ));

    if (!isLoaded ) return <CircularLoading />

    return (
        <>
      <Dialog onClose={handleClose} open={openNote} fullWidth maxWidth='lg'>
          <NoteForm note={note} stateId={stateId}  action={action} handleClose={handleClose} auth={auth} />
      </Dialog>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth='lg'>
          <SummaryForm stateId={stateId}  countyId={countyId} action={action} handleClose={handleClose} />
      </Dialog>
      <MaterialTable
          title='STATES'
          icons={tableIcons}
          columns={columns}
          data={data}
          onRowClick={(ev, rowData) => {
              handleClick(ev, rowData.summary)
          }}
          options={{
              filtering: false,
              grouping: true,
              pageSize: 15,
              pageSizeOptions: [15, 30, 45, 60],
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
                  icon: tableIcons.Explore,
                  tooltip: `Go to Counties`,
                  isFreeAction: false,
                  onClick: (ev, rowData) => history.push(`/states/${rowData.id}`)
              },
              {
                  icon: tableIcons.Add,
                  tooltip: 'Add Link',
                  isFreeAction: false,
                  onClick: (ev, rowData) => handleOpen(ev, rowData.id, 'note', 'add')
              },
              {
                  icon: tableIcons.Edit,
                  tooltip: 'Edit State Summary',
                  isFreeAction: false,
                  onClick: (ev, rowData) => handleOpen(ev, rowData.id, 'state', 'edit')
              },
          ]}
          style={{
              margin: '1rem',
              marginTop: '4rem',
              marginBottom: '6rem',
              fontFamily: "Roboto, Helvetica, Arial, sansSerif",
          }}
          detailPanel={rowData => {
              return (
                  <MaterialTable
                      title='RESEARCH LINKS'
                      components={{
                          Toolbar: props => (
                              <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}>
                                  <MTableToolbar {...props} />
                              </div>
                          )
                      }}
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
                            ) },
                          { title: 'Note', field: 'text',
                              cellStyle: {
                                  width: 20,
                                  maxWidth: 20,
                                  wordWrap: 'break-word'
                              },
                              headerStyle: {
                                  width: 10,
                                  maxWidth: 10
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
                              isFreeAction: false,
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
                          // backgroundColor: "lightSteelBlue"
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

export default StatesTable;