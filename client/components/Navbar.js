import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { AppBar, Button, Dialog, Toolbar } from "@material-ui/core";
import ProjectSummary from "./ProjectSummary";
import { useDispatch } from "react-redux";
import ProjectCounties from './ProjectCounties';
import Welcome from './Welcome'
import { loadCounties, loadStates, logout } from '../store'

const Navbar = ({handleClick, isLoggedIn, firstName, counties, allStates, loadData}) => {
  const history = useHistory()
  
  const [open, setOpen] = useState(false);
  
  const [openCounties, setOpenCounties] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const load = async() => {
      await loadData()
      await setIsLoaded(true)
    }
    if (isLoggedIn){
      load()
    }
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

  if (!isLoaded) return '...loading'

  const statesIds = counties.reduce((accum, county) => {
    !accum.find(accum => accum === county.stateId) ? accum.push(county.stateId) : '';
    return accum;
  },[]);
  const states = allStates.filter(state => statesIds.includes(state.id))

  return (
  <div>
    <h1>KRI APP</h1>
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
              <Toolbar style={{backgroundColor: '#D7EBF8', borderRadius: 3, border: '1px solid grey', padding: '1rem', boxShadow: '0 8px 8px -4px lightgrey'}} >
                <Welcome firstName={firstName} logout={handleClick} />
                <Link to='/home' style={{textDecoration: 'none'}}><Button style={{border: '2px solid grey',fontWeight: 'bold', marginLeft: '1rem', color: '#1976d2'}} variant='outlined'>States</Button></Link>
                <Button style={{border: '2px solid grey', marginLeft: '1rem', color: '#1976d2', fontWeight: 'bold'}} variant='outlined' onClick={handleOpen}>Project Summary </Button>
                <Button style={{border: '2px solid grey', marginLeft: '1rem', color: '#1976d2', fontWeight: 'bold'}} variant='outlined' onClick={ (ev) => handleOpenCounties(ev)}>Project Counties ({counties.length}) </Button>
                <hr></hr>
                <Link to='/parseaddresses' style={{textDecoration: 'none'}}><Button style={{border: '2px solid grey', marginLeft: '1rem', color: 'darkBlue'}} variant='outlined'>Format Addresses</Button></Link>
                <Link to='/parseproedgar' style={{textDecoration: 'none'}}><Button style={{border: '2px solid grey', marginLeft: '1rem', color: 'darkBlue'}} variant='outlined'>Format EDGAR Pro</Button></Link>
              </Toolbar>
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

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    firstName: state.auth.firstName,
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
