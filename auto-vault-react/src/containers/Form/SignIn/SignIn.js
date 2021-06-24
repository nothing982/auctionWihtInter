import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import classes from './SignIn.module.css';
import { Modal, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class SignIn extends Component {
  state = {
    username: '',
    password: '',
  };

  onLoginHandler = (event) => {
    event.preventDefault();
    console.log(this.props.isAuthenticated);
    this.props.login(this.state.username, this.state.password);
  };

  onUsernameChangeHandler = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  onPasswordChangeHandler = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  openModal = () => {
    if (this.props.err) {
      console.log('Hello');
      this.onModalShow();
    }
  };

  onModalShow = () => {
    this.setState({ showModal: true });
  };

  onModalClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div className={[classes['container'], 'card'].join(' ')}>
        {this.props.err ? (
          <Modal
            show={this.state.showModal}
            onHide={this.onModalClose}
            centered
          >
            <Modal.Body style={{ textAlign: 'center' }}>
              <span className={classes['error']}>{this.props.err}</span>
            </Modal.Body>
            <Modal.Footer>
              <Button className={classes['button']} onClick={this.onModalClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        ) : null}
        <div className='card-body mx-auto' style={{ maxWidth: '400px' }}>
          <div className={classes['icon']}>
            <i className='fas fa-lock fa-2x'></i>
          </div>
          <h2 className='card-title mt-3 text-center'>Login</h2>
          <form onSubmit={this.onLoginHandler}>
            <div className='form-group input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>
                  {' '}
                  <i className='fa fa-user'></i>{' '}
                </span>
              </div>
              <input
                value={this.state.username}
                onChange={this.onUsernameChangeHandler}
                className='form-control'
                placeholder='Username'
                type='text'
              />
            </div>

            <div className='form-group input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>
                  {' '}
                  <i className='fa fa-lock'></i>{' '}
                </span>
              </div>
              <input
                value={this.state.password}
                onChange={this.onPasswordChangeHandler}
                className='form-control'
                placeholder='Password'
                type='password'
              />
            </div>

            <div className='form-group'>
              <button type='submit' className='btn btn-primary btn-block'>
                Login
              </button>
            </div>
            <p className='text-center'>
              New User? <Link to='/signup'>Sign Up</Link>{' '}
            </p>
            <p className='text-center'>
              <Link to='/'>Forgot password?</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    err: state.auth.err,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(actions.login(username, password)),
    clearError: () => dispatch(actions.clearError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
