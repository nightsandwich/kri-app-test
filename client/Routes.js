import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login } from './components/AuthForm';
import Home from './components/Home';
import CountiesTable from './components/CountiesTable';
import EdgarParser from './components/EdgarParser';
import AddressParser from './components/AddressParser';
import Navbar from './components/Navbar';
import StatesTable from './components/StatesTable';
import Profile from './components/Profile';
import Password from './components/Password';

import {me, loadNotes, loadCounties, loadStates} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    // this.props.loadInitialStates();
    // this.props.loadInitialCounties();
    // this.props.loadInitialNotes();
  }

  render() {
    const {isLoggedIn, states, counties, notes} = this.props

    return (
      <div>
        {/* <Route component={Navbar} path='/'/> */}
        {isLoggedIn ? (
          <>
            {/* <Route component={Header} path='/'/> */}
          <Switch>
            {/* <Route path="/home" component={Home} /> */}
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/password" component={Password} />

            <Route exact path='/states' render={() => <StatesTable /> } />
            <Route exact path='/states/:id' render={() => <CountiesTable /> } />
            <Route component={AddressParser} path='/parseaddresses' />
            <Route component={EdgarParser} path='/parseproedgar' />
            <Redirect to="/states" />
          </Switch>
          </>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            {/* <Route path="/signup" component={Signup} /> */}
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    // auth: state.auth,
    // counties: state.counties,
    // states: state.states,
    // notes: state.notes
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadInitialCounties(){
      dispatch(loadCounties())
    },
    loadInitialStates(){
      dispatch(loadStates())
    },
    loadInitialNotes(){
      dispatch(loadNotes())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
