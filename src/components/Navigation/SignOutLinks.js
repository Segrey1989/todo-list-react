import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  resetFilterParam,
  resetSortParam,
} from '../../store/actions/dataActions';

const SignOutLinks = props => {
  props.resetFilterParam();
  props.resetSortParam();
  return (
    <div className='container'>
      <ul className='right'>
        <li>
          <NavLink to='/signup' className='grey-text'>
            Sign up
          </NavLink>
        </li>
        <li>
          <NavLink to='/signin' className='grey-text'>
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    resetFilterParam: () => dispatch(resetFilterParam()),
    resetSortParam: () => dispatch(resetSortParam()),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(SignOutLinks);
