import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebarStyles.css';
import { connect } from 'react-redux';
import { signOut } from '../../../store/actions/authActions';
import {
  getFilterParam,
  getSortParam,
} from '../../../store/actions/dataActions';

class Sidebar extends Component {
  selectChangeHandler = e => {
    const select = document.getElementById('prioritySelectSide');
    const filterParam = select.options[select.selectedIndex].value;
    this.props.getFilterParam(filterParam);
  };

  sortHandler = () => {
    const { sortParam } = this.props;
    this.props.getSortParam(!sortParam);
  };

  render() {
    const { sidebarColor, sortParam, filterParam } = this.props;
    const style = sidebarColor ? { backgroundColor: sidebarColor } : null;
    const sortSign = !sortParam ? 'arrow_downward' : 'arrow_upward';

    return (
      <React.Fragment>
        <input type='checkbox' id='nav-toggle' hidden />
        <nav className='nav' style={style}>
          <label htmlFor='nav-toggle' className='nav-toggle' />
          <h2 className='logo'>
            <NavLink to='/'>ToDo</NavLink>
          </h2>

          <ul>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/settings'>Settings</NavLink>
            </li>

            <li>
              <NavLink to='/' onClick={this.props.signOut}>
                Log out
              </NavLink>
            </li>
          </ul>

          <div className='sideHide'>
            <div onClick={this.sortHandler}>
              <span className='navSign'>
                Sorted
                <i className='material-icons left'>{sortSign}</i>
              </span>
            </div>

            <div className='select-priority'>
              <select
                id='prioritySelectSide'
                className='browser-default'
                onChange={this.selectChangeHandler}
                value={filterParam || 'All'}
              >
                <option value='Select priority' disabled>
                  Filter
                </option>
                <option value='All'>All</option>
                <option value='High'>High</option>
                <option value='Medium'>Medium</option>
                <option value='Low'>Low</option>
              </select>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { profile } = state.firebase;
  const sidebarColor = profile.settings ? profile.settings.sidebarColor : null;

  return {
    sortParam: state.dataHelper.sortParam,
    filterParam: state.dataHelper.filterParam,
    sidebarColor,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
    getFilterParam: filterParam => dispatch(getFilterParam(filterParam)),
    getSortParam: sortParam => dispatch(getSortParam(sortParam)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
