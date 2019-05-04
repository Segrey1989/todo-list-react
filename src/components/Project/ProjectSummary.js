import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const createTodoTheme = (priority, settings) => {
  switch (priority) {
    case 'High':
      return { backgroundColor: settings.highPriorityColor };
    case 'Medium':
      return { backgroundColor: settings.mediumPriorityColor };
    case 'Low':
      return { backgroundColor: settings.lowPriorityColor };
    default:
      return null;
  }
};

const ProjectSummary = props => {
  const { todo, viewMode, settings } = props;
  const firstLetter = todo.title[0].toUpperCase();

  const viewModeGridStyle =
    viewMode === 'view_list' ? 'wrapper-list' : 'wrapper-tile';

  const todoInfoStyle =
    viewMode === 'view_list' ? 'todoInfoList grey-text' : 'grey-text';

  const style = settings ? createTodoTheme(todo.priority, settings) : null;
  const todoLogo = (
    <span className='btn-large btn-floating center todoLogo' style={style}>
      {firstLetter}
    </span>
  );
  const fragment = (
    <div className={viewModeGridStyle}>
      {viewMode === 'view_list' && (
        <div className='valign-wrapper'>{todoLogo}</div>
      )}
      <div className='card-content'>
        {(!todo.status && (
          <div className={`valign-wrapper todoInfo ${todoInfoStyle}`}>
            <i className='material-icons '>access_time</i>
            <span>{moment(todo.createdAt.toDate()).format('LLL')}</span>
            <span>{todo.priority} Priority</span>
          </div>
        )) || <p className='green-text lighten-2 right'>Completed!</p>}
        <span className='card-title'>{todo.title}</span>
        <p>{todo.content}</p>
      </div>
      <div className='valign-wrapper'>
        <span className='todoOptions'>
          <Link to={'projects/' + todo.id} key={todo.id}>
            <i className='material-icons'>more_vert</i>
          </Link>
        </span>
      </div>
    </div>
  );

  if (viewMode === 'view_module') {
    return <div className='card card-tile'>{fragment}</div>;
  } else {
    return <div className='card'>{fragment}</div>;
  }
};

const mapStateToProps = state => {
  const { profile } = state.firebase;
  const settings = !profile.isEmpty ? profile.settings : null;
  return {
    viewMode: state.dataHelper.viewMode,
    settings,
  };
};

export default connect(mapStateToProps)(ProjectSummary);
