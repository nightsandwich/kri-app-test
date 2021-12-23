import React , {useRef, useEffect, useState, forwardRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { editCounty, loadStates, loadNotes } from "../store";
import {Button, Box} from '@mui/material';
import MaterialTable, {MTableToolbar} from 'material-table';
import CloseIcon from '@mui/icons-material/Close';

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
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';
import ExploreIcon from '@mui/icons-material/Explore';

const ProjectSummary = ({ states, counties, handleClose}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        (async function(){
            await dispatch(loadNotes());
            await setIsLoaded(true)
        })();
    },[]);

    const notes = useSelector(state => state.notes)

    if (!isLoaded) return '...loading'
    
    const findCountyNotes = (state) => {
        return [...counties.filter(county => county.stateId === state.id).map(county => (
            notes.filter(note => note.countyId === county.id).length === 0 ? 
            [ {
                countyName: `-${county.name}-`, 
                summary: county.summary, 
                stateName: ''
                }, 
                {
                stateName: '',
                countyName: county.name,
                website: '-no links-',
                link: null,
            }] : 
            [{
                countyName: `-${county.name}-`, 
                stateName: '', 
                summary: county.summary
                },
                ...notes.filter(note => note.countyId === county.id).map(note => (
                {
                    stateName: '',
                    countyName: county.name,
                    website: note.title,
                    link: note.link,
                    note: note.text,
                    paid: note.paid,
                    password: note.password
                }
            ))]
        ))]
    }
    
    const findStateNotes = (state) => {
        return (
            notes.filter(note => note.stateId === state.id).length === 0 ?
                [
                    {
                        stateName: `-${state.name}-`,
                        summary: state.summary || ''
                    },
                    ,{
                    stateName: state.name,
                    countyName: '',
                    website: '-no links-',
                    link: null,
                }]
            :
            [{
                stateName: `-${state.name}-`,
                summary: state.summary
            },...notes.filter(note => note.stateId === state.id).map(note => (
                {
                    stateName: state.name,
                    countyName: null,
                    website: note.title,
                    link: note.link,
                    note: note.text,
                    paid: note.paid,
                    password: note.password
                }
            ))]
        )
    }
    
    let notesToDisplay = states.map(state => {
        return [ ...findStateNotes(state).filter(note => note.stateName), ...findCountyNotes(state)]
    }).flat(4);
    
    const columns = [
        { title: 'State', field: 'stateName', render: (rowData) => (
            <div style={{fontWeight: 'bold', textDecoration: rowData.stateName[0] === '-' ? 'underline' : ''}}>{rowData.stateName}</div>
        ) },
        { title: 'County', field: 'countyName', render: (rowData) => (
            !rowData.countyName && !rowData.stateName.includes('-') ? <div style={{fontSize: 'smaller', color: 'slategrey'}}>-statewide-</div>
            : <div style={{textDecoration: rowData.countyName && rowData.countyName[0] === '-' ? 'underline' : ''}}>{rowData.countyName}</div>
        ) },
        { title: 'Summary', field: 'summary', render: (rowData) => (
            <div style={{fontWeight: 'bold', fontSize: 'smaller'}}>{rowData.summary}</div>
        ) },
        { title: 'Website', field: 'website',
        render: (rowData) => (
            <a
              href={rowData.link}
              target="_blank"
              style={{ textDecoration: 'none', fontSize: 'smaller' }}
            >
              {rowData.website}
            </a>
          ) },
        { title: 'Note', field: 'note', render: rowData => (
            <div style={{fontSize: 'smaller'}}>{rowData.note} </div>
        )},
        { title: 'Receipt', field: 'paid', type: 'boolean'},
        { title: 'Password', field: 'password', type: 'boolean'},
    ];

    const data = notesToDisplay.map( note => (
        {
            stateName: note.stateName,
            countyName: note.countyName,
            summary: note.summary,
            website: note.website,
            link: note.link,
            note: note.note,
            paid: note.paid,
            password: note.password,
            summaryDetail: states.map(state => (
                {
                    stateName: state.name,
                    stateSummary: state.summary
                })),
        }
    ));

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} style={{
            color: '#099451'}}/>),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
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
            color: '#F81454'}}/>),
        DriveFolderUploadIcon: forwardRef((props, ref) => <DriveFolderUploadIcon {...props} ref={ref} style={{
            color: '#099451'}}/>),
      };

    return(
        <Box>
        <Button startIcon={<CloseIcon style={{color: 'black', alignContent: 'left'}}/>} onClick={handleClose} ></Button>
        <MaterialTable
            title='PROJECT SUMMARY'
            icons={tableIcons}
            columns={columns}
            data={data}
            options={{
                filtering: false,
                grouping: true,
                pageSize: 100,
                pageSizeOptions: [100, 20]
            }}
            components={{
                Toolbar: props => (
                    <div style={{ backgroundColor: '#e8eaf5' }}>
                        <MTableToolbar {...props} />
                    </div>
                )
            }}
            style={{
                margin: '1rem',
                fontFamily: "Roboto, Helvetica, Arial, sansSerif"
            }}
        />
        </Box>
    )
}

export default ProjectSummary;