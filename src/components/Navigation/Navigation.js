import React, { Component } from 'react';
import SignInLinks from './SignInLinks';
import SignOutLinks from './SignOutLinks';
import { connect } from 'react-redux';

class NavBar extends Component {
  render() {
    const { auth, navColor, appColor } = this.props;
    document.querySelector('html').style.backgroundColor = appColor;
    const content = auth.isEmpty ? <SignOutLinks /> : <SignInLinks />;

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
  }
}

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

export default connect(mapStateToProps)(NavBar);
