import React from 'react';
import ProjectSummary from './ProjectSummary';
import { connect } from 'react-redux';
import { updateProject } from '../../store/actions/projectActions';

class ProjectList extends React.Component {
  state = {};

  createList = (list, mode) => {
    if (!list.length) return null;

    let classListString = '';
    if (mode === 'view_list') {
      classListString = 'draggable';
    } else {
      classListString = 'draggable col m6 s12';
    }

    const result = list.map(el => (
      <div
        draggable
        className={classListString}
        onDragStart={e => this.onDragStart(e, el)}
        key={el.id}
      >
        <ProjectSummary todo={el} />
      </div>
    ));
    return result;
  };

  filterByPriority = (data, filterParam) => {
    if (!data) return null;
    const dataCopy = [...data];
    if (filterParam === 'All' || !filterParam) return dataCopy;

    const filteredData = dataCopy.filter(project => {
      return project.priority === filterParam;
    });
    return filteredData;
  };

  onDragStart = (e, todo) => {
    e.dataTransfer.setData('draggedData', todo);
    this.setState({
      dragTodo: todo,
    });
  };

  onDrop = (e, completeState) => {
    const updatedProject = { ...this.state.dragTodo };
    if (completeState === 'complete') {
      updatedProject.status = true;
    } else {
      updatedProject.status = false;
    }
    this.props.updateProject(updatedProject, updatedProject.id);
  };

  onDragOver = e => {
    e.preventDefault();
  };

  render() {
    const { projects, filterParam, sortParam, viewMode } = this.props;
    let filteredByPriority = this.filterByPriority(projects, filterParam);
    if (sortParam) {
      filteredByPriority = filteredByPriority.reverse();
    }
    const completed = filteredByPriority.filter(project => project.status);
    const todos = filteredByPriority.filter(project => !project.status);

    return (
      <React.Fragment>
        <div className='todo-container row'>
          <div
            className='droppable'
            onDrop={e => this.onDrop(e, 'todo')}
            onDragOver={e => {
              this.onDragOver(e);
            }}
          >
            {(!todos.length && (
              <h5 className='center pink-text text-lighten-4'>
                All have been done!
              </h5>
            )) || (
              <h5 className='center pink-text text-lighten-4'>
                To Do ({todos.length})
              </h5>
            )}

            {this.createList(todos, viewMode)}
          </div>
        </div>

        <div className='todo-container row'>
          <div
            className='droppable'
            onDrop={e => this.onDrop(e, 'complete')}
            onDragOver={e => {
              this.onDragOver(e);
            }}
          >
            <h5 className='center pink-text text-lighten-4'>
              Completed ({completed.length})
            </h5>

            {this.createList(completed, viewMode)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    sortParam: state.dataHelper.sortParam,
    viewMode: state.dataHelper.viewMode,
  };
};

const dispatchStateToProps = dispatch => {
  return {
    updateProject: (newProject, id) => dispatch(updateProject(newProject, id)),
  };
};

export default connect(
  mapStateToProps,
  dispatchStateToProps,
)(ProjectList);
