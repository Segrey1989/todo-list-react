import React, { Component } from 'react';
import './settingsStyles.css';
import { installSettings } from '../../store/actions/settingsActions';

import { connect } from 'react-redux';

class Settings extends Component {
  state = {};

  submitFormHandler = e => {
    e.preventDefault();
    this.props.installSettings(this.state);
  };

  changeColorHandler = e => {
    const color = e.target.value;
    const targetId = e.target.id;

    this.setState({
      [targetId]: color,
    });
    document.getElementById(targetId).value = color;
  };

  render() {
    const { settingsError } = this.props;
    return (
      <div className='container settings'>
        <form id='appColorForm' onSubmit={this.submitFormHandler}>
          <div className='row'>
            <div className='col m6 s12'>
              <h4 className='center'>App Color</h4>

              <div className='collection'>
                <div className='collection-item'>
                  <p>Background color:</p>
                  <input
                    type='color'
                    id='appColor'
                    onChange={this.changeColorHandler}
                  />
                </div>

                <div className='collection-item'>
                  <p>Main navigation color:</p>
                  <input
                    type='color'
                    id='navColor'
                    onChange={this.changeColorHandler}
                  />
                </div>

                <div className='collection-item'>
                  <p>Sidebar color:</p>
                  <input
                    type='color'
                    id='sidebarColor'
                    onChange={this.changeColorHandler}
                  />
                </div>
              </div>
            </div>

            <div className='col m6 s12'>
              <h4 className='center'>Todo Color</h4>

              <div className='collection'>
                <div className='collection-item'>
                  <p>High priority:</p>
                  <input
                    type='color'
                    id='highPriorityColor'
                    onChange={this.changeColorHandler}
                  />
                </div>

                <div className='collection-item'>
                  <p>Medium priority:</p>
                  <input
                    type='color'
                    id='mediumPriorityColor'
                    onChange={this.changeColorHandler}
                  />
                </div>

                <div className='collection-item'>
                  <p>Low Priority:</p>
                  <input
                    type='color'
                    id='lowPriorityColor'
                    onChange={this.changeColorHandler}
                  />
                </div>
              </div>
            </div>
          </div>
          <input type='submit' value='Submit' className='btn formSubmitBtn' />
        </form>
        {settingsError && (
          <p className='red-text center'>{settingsError.message}</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    settingsError: state.settingsReducer.settingsError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    installSettings: settings => dispatch(installSettings(settings)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
