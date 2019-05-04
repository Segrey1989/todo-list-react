import React, { Component } from 'react';
import ProjectList from '../Project/ProjectList';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { getViewMode } from '../../store/actions/dataActions';

class Dashboard extends Component {
  changeModeHandler = e => {
    const mode = e.target.id;
    this.props.getViewMode(mode);
  };

  render() {
    const { projects, auth } = this.props;
    const { filterParam } = this.props;
    const currentUserProjects = projects
      ? projects.filter(project => project.authorId === auth.uid)
      : null;

    if (!auth.uid) return <Redirect to='/signin' />;
    return (
      <div className='dashboard'>
        {currentUserProjects && (
          <div>
            <div className='dasboard-icons'>
              <span className='right'>
                <i
                  id='view_list'
                  className='material-icons pink-text text-lighten-4'
                  onClick={this.changeModeHandler}
                >
                  view_list
                </i>
              </span>
              <span className='right'>
                <i
                  id='view_module'
                  className='material-icons pink-text text-lighten-4'
                  onClick={this.changeModeHandler}
                >
                  view_module
                </i>
              </span>
            </div>
            <ProjectList
              projects={currentUserProjects}
              filterParam={filterParam}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    filterParam: state.dataHelper.filterParam,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getViewMode: mode => dispatch(getViewMode(mode)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  firestoreConnect([
    { collection: 'projects', orderBy: ['createdAt', 'desc'] },
  ]),
)(Dashboard);
