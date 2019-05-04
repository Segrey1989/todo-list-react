import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/Navigation/Navigation';
import Sidebar from './components/Navigation/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import CreateProject from './components/Project/CreateProject';
import ProjectDetails from './components/Project/ProjectDetails';
import UpdateProjectDetails from './components/Project/UpdateProjectDetails';
import Settings from './components/Settings/Settings';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    const { auth } = this.props;

    return (
      <BrowserRouter>
        <NavBar />

        {!auth.isEmpty && <Sidebar />}
        <Route exact path='/' component={Dashboard} />

        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/create' component={CreateProject} />
        <Route path='/settings' component={Settings} />
        <Route path='/projects/:id' component={ProjectDetails} />
        <Route path='/change/:id' component={UpdateProjectDetails} />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state.firebase;
  return {
    auth,
  };
};

export default connect(mapStateToProps)(App);
