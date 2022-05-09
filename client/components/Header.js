import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import {IconButton, MenuItem, Drawer, Box, Dialog, Toolbar, Tooltip, Button, Typography, AppBar, Paper} from '@mui/material';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { makeStyles } from "@mui/styles";
import { loadCounties, loadStates, logout, loadNotes, loadUserCounties } from '../store'
import ProjectSummary from "./ProjectSummary";
import ProjectCounties from './ProjectCounties';
import CircularLoading from './CircularLoading'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@mui/icons-material/Search';

export default function Header() {
  const useStyles = makeStyles(() => ({
    header: {
      backgroundColor: '#078BEC',
      paddingLeft: 4,
      paddingRight: 2
    },
    logo: {
      color: '#FFFEFE',
      textAlign: 'left'
    },
    menuButton: {
      fontSize: '.75rem',
      color: 'white',
    }
  }))
  
  const allStates = useSelector(({states}) => states)
  let counties = useSelector(({counties}) => counties)
  let userCounties = useSelector(({userCounties}) => userCounties)
  
  
  const { header, logo, menuButton } = useStyles();
  const dispatch = useDispatch()
    const [state, setState] = useState({
      mobileView: false,
      drawerOpen: false,
    });
    const [open, setOpen] = useState(false);
    const auth = useSelector(state => state.auth)
    const isLoggedIn = !!auth.id;
    const [openCounties, setOpenCounties] = useState(false);
    const { mobileView, drawerOpen } = state;
    const handleOpenCounties = () => {
      setOpenCounties(true);
    }
    const handleOpen = () => {
      setOpen(true);
    }
    const handleClose = () => {
      // ev.preventDefault();
      setOpen(false);
      setOpenCounties(false);
    }
    const [headerDataIsLoaded, setHeaderDataIsLoaded] = useState(false)
    const logoutUser = () => {
      dispatch(logout())
    }
    // const loadData = () => {
    //   dispatch(loadStates())
    //   dispatch(loadCounties())
    //   dispatch(loadNotes())
    //   dispatch(loadUserCounties())
    // }
    const loadData = async() => {
        await dispatch(loadStates())
        await dispatch(loadCounties())
        await dispatch(loadNotes())
        await dispatch(loadUserCounties())
        console.log('done load')
        setHeaderDataIsLoaded(true);
      }
      useEffect(() => {
        // const load = async() => {
        //   await loadData()
        // }
        try {
          loadData()
          // load()
      } catch (err){
        console.log(err)
        // if (isSubscribed) {
        //   setHeaderDataIsLoaded(false)
        // }
      }
    
    // return () => isSubscribed = false
    // () => setIsLoaded(false)
  }, [isLoggedIn])
  

    const headersData = [
      {
        label: "States",
        href: '/states',
      },
      {
        label: "Project Summary",
        onClick: () => handleOpen()
      },
      {
        label: `Project Counties (${userCounties.length})`,
        onClick: () => {handleOpenCounties()}
      },
      {
        label: "Format Addresses",
        href: '/parseaddresses',
      },
      {
        label: "Format EDGAR Pro",
        href: '/parseproedgar',
      },
      {
        label: 'Profile',
        href: '/profile',
        startIcon: <AccountBoxIcon />,
        toolTip: 'Edit Profile'
      },
      {
        label: 'Logout',
        startIcon: <ExitToAppIcon />,
        onClick: () => logoutUser(),
        toolTip: 'Log Out'
      },
    ]
    useEffect(() => {
      const setResponsiveness = () => {
        return window.innerWidth < 767
          ? setState((prevState) => ({ ...prevState, mobileView: true }))
          : setState((prevState) => ({ ...prevState, mobileView: false }));
      };
  
      setResponsiveness();
      window.addEventListener("resize", () => setResponsiveness());
  
      return () => {
        window.removeEventListener("resize", () => setResponsiveness());
      }
    }, []);
    // if (!countiesInSummary || !allStates) return <CircularLoading />
    if (!headerDataIsLoaded) return <CircularLoading />
console.log('countiesinsummary', countiesInSummary)
    const countiesInSummary = userCounties.map(userCounty => counties.find(county => county.id === userCounty.countyId))
    
    const statesIds = countiesInSummary.length > 0 ? countiesInSummary.reduce((accum, county) => {
      !accum.find(accum => accum === county.stateId) ? accum.push(county.stateId) : '';
      return accum;
    },[]) : [];
    
    const statesInSummary = allStates.filter(state => statesIds.includes(state.id))

    const kriLogo = (
      <>
      <Typography variant='h6' component='h1'  className={logo}>
      {/* <SearchIcon sx={{color: 'black'}} /> */}
        <FindInPageIcon />
          KRI
      </Typography>
        {/* <Paper variant="outlined" backgroundColor='#078BEC'> */}
        {/* <Paper height='25px' >
          <img src="favicon-32x32.png" />
        </Paper>
        <Typography variant='h6'  className={logo}>
          KRI
        </Typography> */}
      </>
    )
    
    const getMenuButtons = () => {
      return headersData.map(({ label, href, onClick, startIcon, toolTip }) => {
        return (
          toolTip ? (
            <Tooltip key={label} title={toolTip}>
              <Box sx={{ml: 1}}>
                <Button sx={{fontSize: '.75rem',
      color: 'white',}}
                  variant='outlined'
                  {...{
                    onClick: onClick,
                    to: href ? href : null,
                    component: href ? Link : Button,
                    
                    startIcon: startIcon,
                  }}
                >
                  {startIcon ? '' : label}
                </Button>
              </Box>
            </Tooltip>)
            :
            <Box key={label} sx={{ml: 1}}>
              <Button sx={{fontSize: '.75rem',
      color: 'white',}}
                  variant='outlined'
                  {...{
                    onClick: onClick,
                    to: href ? href : null,
                    component: href ? Link : Button,
                    
                    startIcon: startIcon
                  }}
                >
                  {startIcon ? '' : label}
                </Button>
            </Box>
        )
      })
    }
    const displayDesktop = () => {
      return (
        <Toolbar style={{display:'flex', flexDirection: 'row', justifyContent:'space-between'}}>
          <div>
            {kriLogo}
          </div>
          
            {getMenuButtons()}
          

          
        </Toolbar>
      )
    }
    const getDrawerChoices = () => {
      return headersData.map(({ label, href, onClick, startIcon, toolTip }) => {
        return (
            // <Box key={label} sx={{ml: 1}}>
            
              href ? 
              <Box key={label} sx={{backgroundColor: 'dodgerblue', m: 2}} >
              <Button  component={Link} to={href} sx={{color: 'white'}} variant='outlined' size='small'>
                  <MenuItem>
                    {label}
                  </MenuItem>
              </Button>
             </Box>
              :
              <Box key={label} sx={{backgroundColor: 'dodgerblue', m:2}} variant='outlined'>
              <Button  onClick={onClick} sx={{color: 'white'}} size='small'>
                  <MenuItem>
                    {label}
                  </MenuItem>
              </Button>
             </Box>
        )
      })
    }
    const displayMobile = () => {
      const handleDrawerOpen = () => {
        setState((prevState) => ({ ...prevState, drawerOpen: true}));
      }
      const handleDrawerClose = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: false }));

      return (
        <Toolbar sx={{backgroundColor: 'dodgerblue'}} >
          <IconButton
            {...{
              edge: 'start',
              color: 'inherit',
              'aria-label': 'menu',
              'aria-haspopup': 'true',
              onClick: handleDrawerOpen
            }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            {...{
              anchor: "left",
              open: drawerOpen,
              onClick: handleDrawerClose,
              onClose: handleDrawerClose,
            }}
            >
            <div>{getDrawerChoices()}</div>
          </Drawer>
            <div>
              {kriLogo}
            </div>
        </Toolbar>
      );
    };
    return (
     
        <header>
          <Dialog onClose={handleClose} open={openCounties}  maxWidth='lg'>
              <ProjectCounties handleClose={handleClose}/>
          </Dialog>
          <Dialog onClose={handleClose} open={open} fullWidth maxWidth='lg'>
              {/* <ProjectSummary states={statesInSummary} userCounties={userCounties} handleClose={handleClose} /> */}
              <ProjectSummary states={statesInSummary} counties={countiesInSummary} handleClose={handleClose} />
          </Dialog>
          <AppBar sx={{backgroundColor: '#078BEC',
      paddingLeft: 4,
      paddingRight: 2}}>
            {mobileView ? displayMobile() : displayDesktop()}
          </AppBar>
        </header>
    );
}