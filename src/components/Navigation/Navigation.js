import React from 'react';
import SignInLinks from './SignInLinks';
import SignOutLinks from './SignOutLinks';
import { connect } from 'react-redux';
import {
  resetFilterParam,
  resetSortParam,
} from '../../store/actions/dataActions';

const NavBar = props => {
  const { auth, navColor, appColor } = props;
  document.querySelector('html').style.backgroundColor = appColor;
  const content = auth.isEmpty ? <SignOutLinks /> : <SignInLinks />;
  if (auth.isEmpty) {
    props.resetFilterParam();
    props.resetSortParam();
  }
  return navColor ? (
    <nav
      className='nav-wrapper z-depth-0 right'
      style={{ backgroundColor: navColor }}
    >
      {content}
    </nav>
  ) : (
    <nav className='nav-wrapper z-depth-0 right'>{content}</nav>
  );
};

const mapStateToProps = state => {
  const { profile } = state.firebase;
  const navColor = profile.settings ? profile.settings.navColor : null;
  const appColor = profile.settings ? profile.settings.appColor : null;
  return {
    auth: state.firebase.auth,
    filterParam: state.dataHelper.filterParam,
    navColor,
    appColor,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetFilterParam: () => dispatch(resetFilterParam()),
    resetSortParam: () => dispatch(resetSortParam()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
