import React, { Component } from 'react';
import { signIn } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { doSignInWithFacebook } from '../../store/actions/authActions';

class SignIn extends Component {
  stete = {
    email: '',
    password: '',
  };

  handlerChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handlerSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  providerHandler = e => {
    this.props.doSignInWithFacebook(e.target.id);
  };

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to='/' />;

    return (
      <div className='container'>
        <form onSubmit={this.handlerSubmit}>
          <h5 className='grey-text text-darken-2'>Sign In</h5>
          <div className='input-field'>
            <input
              type='email'
              id='email'
              onChange={this.handlerChange}
              placeholder='Email'
              autoComplete='on'
            />
          </div>
          <div className='input-field'>
            <input
              type='password'
              id='password'
              onChange={this.handlerChange}
              placeholder='Password'
              autoComplete='on'
            />
          </div>
          <div className='input-field'>
            <button className='btn pink lighten-4 projectDetailsBtn'>
              Submit
            </button>
          </div>
          <div className='center red-text'>
            {authError && <p>{authError.message}</p>}
          </div>
        </form>
        <div className='center'>
          <p className='center grey-text'>Authentificate with</p>
          <button
            id='facebook'
            onClick={this.providerHandler}
            className='btn-small pink lighten-4 projectDetailsBtn'
          >
            Facebook
          </button>

          <button
            id='google'
            onClick={this.providerHandler}
            className='btn-small pink lighten-4 projectDetailsBtn'
          >
            Google
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    firebase: state.firebase,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: user => dispatch(signIn(user)),
    doSignInWithFacebook: provider => dispatch(doSignInWithFacebook(provider)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
