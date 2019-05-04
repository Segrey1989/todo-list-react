import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import { updateProject } from '../../store/actions/projectActions';
import { deleteProject } from '../../store/actions/projectActions';

const ProjectDetails = props => {
  const { project, auth, id } = props;

  const changeEvent = e => {
    props.history.push('/change/' + id);
  };

  const changeStatusEvent = e => {
    const { project, id } = props;

    const updatedProject = {
      ...project,
      status: !project.status,
    };
    props.updateProject(updatedProject, id);
    props.history.push('/');
  };

  const deleteProjectEvent = () => {
    const { id } = props;
    props.deleteProject(id);
    props.history.push('/');
  };

  if (!auth.uid) props.history.push('/signin');
  if (project) {
    return (
      <div className='project-details'>
        <div className='card grey-text text-darken-3'>
          <div className='card-content'>
            <div className='valign-wrapper todoInfo todoInfoList grey-text'>
              <i className='material-icons '>access_time</i>
              <span>{moment(project.createdAt.toDate()).format('LLL')}</span>
              <span>{project.priority} Priority</span>
            </div>
            <span className='card-title'>{project.title}</span>
            <p>{project.content}</p>
          </div>

          <div className='card-action'>
            <div className='center'>
              <button
                onClick={changeEvent}
                className='btn blue lighten-4 projectDetailsBtn'
              >
                Change
              </button>
              <button
                className='btn orange lighten-4 projectDetailsBtn'
                onClick={changeStatusEvent}
              >
                Change status
              </button>
              <button
                className='btn red lighten-4 projectDetailsBtn'
                onClick={deleteProjectEvent}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { projects } = state.firestore.data;
  const project = projects ? projects[id] : null;
  return {
    project: project,
    auth: state.firebase.auth,
    id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProject: (project, id) => dispatch(updateProject(project, id)),
    deleteProject: id => dispatch(deleteProject(id)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  firestoreConnect([{ collection: 'projects' }]),
)(ProjectDetails);
