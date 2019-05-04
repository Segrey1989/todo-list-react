import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProject } from '../../store/actions/projectActions';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

class UpdateProject extends Component {
  state = {};

  handlerChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handlerSubmit = e => {
    e.preventDefault();
    const { project, id } = this.props;
    const updatedProject = {
      ...project,
      ...this.state,
    };
    this.props.updateProject(updatedProject, id);
    this.props.history.push('/');
  };

  render() {
    const { project, auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />;
    if (project) {
      return (
        <div className='container'>
          <form onSubmit={this.handlerSubmit}>
            <div className='input-field'>
              <input
                id='title'
                type='text'
                onChange={this.handlerChange}
                defaultValue={project.title}
                placeholder='Title'
              />
            </div>

            <div className='input-field'>
              <textarea
                id='content'
                type='text'
                className='materialize-textarea'
                onChange={this.handlerChange}
                defaultValue={project.content}
                placeholder='Content'
              />
            </div>

            <div className='input-field'>
              <select
                className='browser-default'
                id='priority'
                onChange={this.handlerChange}
                defaultValue={project.priority}
              >
                <option disabled value='Select priority'>
                  Select priority
                </option>
                <option value='High'>High</option>
                <option value='Medium'>Medium</option>
                <option value='Low'>Low</option>
              </select>
            </div>

            <div className='input-field'>
              <button className='btn pink lighten-4 projectDetailsBtn'>
                Update Todo
              </button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className='center'>
          <p>Loading...</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { projects } = state.firestore.data;
  const project = projects ? projects[id] : null;
  return {
    auth: state.firebase.auth,
    project,
    id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProject: (project, id) => dispatch(updateProject(project, id)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  firestoreConnect([{ collection: 'projects' }]),
)(UpdateProject);
