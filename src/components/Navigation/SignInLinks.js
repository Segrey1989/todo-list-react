import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFilterParam, getSortParam } from '../../store/actions/dataActions';

const SignInLinks = props => {
  const selectChangeHandler = e => {
    const select = document.getElementById('prioritySelect');
    const filterParam = select.options[select.selectedIndex].value;
    props.getFilterParam(filterParam);
  };

  const sortHandler = () => {
    const { sortParam } = props;
    props.getSortParam(!sortParam);
  };

  const { initials, sortParam, filterParam } = props;
  const sortSign = !sortParam ? 'arrow_downward' : 'arrow_upward';
  return (
    <div className='signInContainer'>
      <ul className='right'>
        <li className='mainNavHide'>
          <span onClick={sortHandler}>
            <i className='material-icons left navSign'>{sortSign}</i>
          </span>
        </li>

        <li className='select-priority mainNavHide'>
          <select
            id='prioritySelect'
            className='browser-default'
            onChange={selectChangeHandler}
            value={filterParam || 'All'}
          >
            <option value='All'>All</option>
            <option value='High'>High</option>
            <option value='Medium'>Medium</option>
            <option value='Low'>Low</option>
          </select>
        </li>

        <li>
          <NavLink to='/create' className=''>
            Add todo
          </NavLink>
        </li>

        <li>
          <NavLink to='/' className='btn btn-floating pink darken-2 initials'>
            {initials}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    initials: state.firebase.profile.initials,
    sortParam: state.dataHelper.sortParam,
    filterParam: state.dataHelper.filterParam,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFilterParam: filterParam => dispatch(getFilterParam(filterParam)),
    getSortParam: sortParam => dispatch(getSortParam(sortParam)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInLinks);
