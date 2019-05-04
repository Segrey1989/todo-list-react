import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectActions';
import { Redirect } from 'react-router-dom';

class CreateProject extends Component {
  state = {
    title: '',
    content: '',
    priority: 'Medium',
    status: false, // not completed
  };

  handlerChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handlerSubmit = e => {
    e.preventDefault();
    this.props.createProject(this.state);
    this.props.history.push('/');
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />;

    return (
      <div className='container'>
        <form onSubmit={this.handlerSubmit}>
          <div className='input-field'>
            <input
              id='title'
              type='text'
              onChange={this.handlerChange}
              placeholder='Title'
            />
          </div>

          <div className='input-field'>
            <textarea
              id='content'
              type='text'
              className='materialize-textarea'
              onChange={this.handlerChange}
              placeholder='Content'
            />
          </div>

          <div className='input-field'>
            <select
              className='browser-default'
              id='priority'
              onChange={this.handlerChange}
              defaultValue='Medium'
            >
              <option value='Select priority' disabled>
                Select priority
              </option>
              <option value='High'>High</option>
              <option value='Medium'>Medium</option>
              <option value='Low'>Low</option>
            </select>
          </div>

          <div className='input-field'>
            <button className='btn pink lighten-2 projectDetailsBtn'>
              Add Todo
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: project => dispatch(createProject(project)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateProject);
