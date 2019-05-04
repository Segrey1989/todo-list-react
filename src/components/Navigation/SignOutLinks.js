import React from 'react';
import { NavLink } from 'react-router-dom';

const SignOutLinks = () => {
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

export default SignOutLinks;
