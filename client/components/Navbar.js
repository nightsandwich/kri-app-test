import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { AppBar, Box, Button, Dialog, Toolbar } from "@material-ui/core";
import ProjectSummary from "./ProjectSummary";
import { useDispatch } from "react-redux";
import ProjectCounties from './ProjectCounties';
import Welcome from './Welcome'
import { loadCounties, loadStates, logout } from '../store'
import CircularLoading from './CircularLoading'

const Navbar = ({handleClick, isLoggedIn, auth, counties, allStates, loadData}) => {
  const history = useHistory()
  
  const [open, setOpen] = useState(false);
  
  const [openCounties, setOpenCounties] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const load = async() => {
      await loadData()
    }
    if (isLoggedIn){
      load()
    }
    setIsLoaded(true)
  }, [isLoggedIn])
  
  const handleOpenCounties = ev => {
    setOpenCounties(true);
  }
  const handleOpen = (ev) => {
    setOpen(true);
  }
  const handleClose = (ev) => {
    ev.preventDefault();
    setOpen(false);
    setOpenCounties(false);
  }

  if (!isLoaded) return <CircularLoading />

  const statesIds = counties.reduce((accum, county) => {
    !accum.find(accum => accum === county.stateId) ? accum.push(county.stateId) : '';
    return accum;
  },[]);
  const states = allStates.filter(state => statesIds.includes(state.id))

  return (
  <div>
    <h1>KRI RESEARCH TRACKER</h1>
    <nav>
      {isLoggedIn ? (
        <nav style={{position: 'static'}}>
          {/* The navbar will show these links after you log in */}
          <AppBar>
          <Dialog onClose={handleClose} open={openCounties}  maxWidth='lg'>
              <ProjectCounties handleClose={handleClose}/>
          </Dialog>
          <Dialog onClose={handleClose} open={open} fullWidth maxWidth='lg'>
              <ProjectSummary states={states} counties={counties} handleClose={handleClose} />
          </Dialog>
              {/* <Toolbar style={{backgroundColor, borderRadius: 3, border: '1px solid grey', padding: '1rem', boxShadow: '0 8px 8px -4px lightgrey'}} > */}
              <Box display='flex' justifyContent='space-around' alignContent='center' flexWrap='wrap'>
                <Box display="flex" 
                  alignItems='center'
                  justifyContent='space-evenly'
                  marginLeft='.5rem'
                  padding={0}
                >
                  <Welcome auth={auth} logout={handleClick} />
                  <Button component={Link} to='/states'style={styles.projectButton} size='large' variant='outlined'>
                    States
                  </Button>
                </Box>
                <Box display='flex' justifyContent='center' alignContent='center'>
                  <Box display='flex' flexDirection='column' justifyContent='center'>
                    <Button size='small' style={styles.projectButton} variant='outlined' onClick={handleOpen}>Project Summary </Button>
                    <Button size='small' style={styles.projectButton} variant='outlined' onClick={ (ev) => handleOpenCounties(ev)}>Project Counties ({counties.length}) </Button>
                  </Box>
                </Box>
                <Box display='flex' flexDirection='column' justifyContent='center'>
                  <Button component={Link} to='/parseaddresses' style={styles.parseButton} variant='outlined' size='small' >
                    Format Addresses
                  </Button>
                  <Button component={Link} to='/parseproedgar' style={styles.parseButton} variant='outlined' size='small' >
                    Format EDGAR Pro
                  </Button>
                </Box>
              </Box>
              {/* </Toolbar> */}
          </AppBar>
        </nav>
      ) : '' 
      // (
      //   <div>
      //     {/* The navbar will show these links before you log in */}
      //     <Link to="/login">Login</Link>
      //     {/* <Link to="/signup">Sign Up</Link> */}
      //   </div>
      // )
      }
    </nav>
    <hr />
  </div>
  )}

const parseColor = 'black';
const dataColor = 'white';
const backgroundColor = '#D7EBF8'

const styles = {
  projectButton: {
    border: '1px solid black',
    marginBottom: '.25rem',
    color: dataColor,
    fontWeight: 'bold'
  },
  parseButton: {
    border: '1px solid white', 
    marginBottom: '.25rem', 
    color: parseColor
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
    counties: state.counties.filter(county => county.inProject),
    allStates: state.states
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    loadData() {
      dispatch(loadCounties())
      dispatch(loadStates())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)


