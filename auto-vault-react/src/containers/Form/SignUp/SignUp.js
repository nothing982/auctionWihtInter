import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, ThemeProvider } from 'react-bootstrap';

import classes from './SignUp.module.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import * as actions from '../../../store/actions/index';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    username: '',
    consumerType: '',
    password: '',
    confirmPassword: '',
    showModal: '',
  };

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    this.props.openRegister();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.err) {
      this.onModalOpen();
    }
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(this.state.consumerType);
    this.props.signUp(
      this.state.name,
      this.state.username,
      this.state.email,
      this.state.password,
      this.state.confirmPassword,
      this.state.phone,
      this.state.consumerType
    );
  };

  onNameChangeHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChangeHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  onUserNameChangeHandler = (event) => {
    this.setState({ username: event.target.value });
  };

  onConsumerTypeChangeHandler = (event) => {
    this.setState({ consumerType: event.target.value });
  };

  onPasswordChangeHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  onConfirmPasswordChangeHandler = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  onModalOpen = () => {
    this.setState({ showModal: true });
  };

  onModalClose = () => {
    this.setState({ showModal: false });
    this.props.clearError();
  };

  render() {
    let redirectPath = null;
    let modal = null;

    if (this.props.createdUser) {
      redirectPath = <Redirect to={'signin'} />;
    }

    return (
      <div className={[classes['container'], 'card'].join(' ')}>
        {redirectPath}
        <div className='card-body mx-auto' style={{ maxWidth: '400px' }}>
          {this.state.showModal ? (
            <Modal
              show={this.state.showModal}
              onHide={this.onModalClose}
              centered
            >
              <Modal.Body style={{ textAlign: 'center' }}>
                <span className={classes['error']}>{this.props.err}</span>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className={classes['button']}
                  onClick={this.onModalClose}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          ) : null}
          <div className={classes['icon']}>
            <i className='fas fa-lock fa-2x'></i>
          </div>
          <h2 className='card-title mt-3 text-center'>Create Account</h2>
          <h6 className={classes['register-text']}>
            Register a free account to start bidding cars
          </h6>
          <p>
            <a
              href='https://www.facebook.com/'
              className={['btn btn-block', classes['btn-twitter']].join(' ')}
            >
              {' '}
              <i className='fab fa-twitter'></i>   Login via Twitter
            </a>
            <a
              href='https://www.twitter.com/'
              className={['btn btn-block', classes['btn-facebook']].join(' ')}
            >
              {' '}
              <i className='fab fa-facebook-f'></i>   Login via facebook
            </a>
          </p>
          <p className={classes['divider-text']}>
            <span className='bg-light'>OR</span>
          </p>
          <form onSubmit={this.onSubmitHandler}>
            <div className='form-group input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>
                  {' '}
                  <i className='fas fa-id-card'></i>{' '}
                </span>
              </div>
              <input
                name=''
                required
                value={this.state.name}
                onChange={this.onNameChangeHandler}
                className='form-control'
                placeholder='Full name'
                type='text'
              />
            </div>
            <div className='form-group input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>
                  {' '}
                  <i className='fa fa-envelope'></i>{' '}
                </span>
              </div>
              <input
                name=''
                required
                value={this.state.email}
                onChange={this.onEmailChangeHandler}
                className='form-control'
                placeholder='Email address'
                type='email'
              />
            </div>
            <div className='form-group input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>
                  {' '}
                  <i className='fa fa-user'></i>{' '}
                </span>
              </div>
              <input
                name=''
                required
                value={this.state.username}
                onChange={this.onUserNameChangeHandler}
                className='form-control'
                placeholder='Username'
                type='text'
              />
            </div>
            <div className='form-group input-group'>
              <PhoneInput
                country={'pk'}
                onlyCountries={['us', 'gb', 'de', 'jp', 'pk']}
                value={this.state.phone}
                onChange={(phone) => this.setState({ phone })}
                containerStyle={{ width: '100%' }}
                inputProps={{
                  name: 'phone',
                  required: true,
                }}
                inputStyle={{ width: '100%' }}
                dropdownStyle={{ width: '13rem', color: 'black' }}
                required
              />
            </div>

            <div className='form-group input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>
                  {' '}
                  <i className='fa fa-building'></i>{' '}
                </span>
              </div>
              <select
                value={this.state.consumerType}
                className='form-control'
                required
                onChange={this.onConsumerTypeChangeHandler}
              >
                <option disabled value=''>
                  Select Consumer Type
                </option>
                <option value='Individual'>Individual</option>
                <option value='Business'>Business</option>
              </select>
            </div>
            <div className='form-group input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>
                  {' '}
                  <i className='fa fa-lock'></i>{' '}
                </span>
              </div>
              <input
                required
                value={this.state.password}
                onChange={this.onPasswordChangeHandler}
                className='form-control'
                placeholder='Create password'
                type='password'
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
                required
                className='form-control'
                value={this.state.confirmPassword}
                onChange={this.onConfirmPasswordChangeHandler}
                placeholder='Repeat password'
                type='password'
              />
            </div>
            <div className='form-group'>
              <button type='submit' className='btn btn-primary btn-block'>
                {' '}
                Create Account{' '}
              </button>
            </div>
            <p className='text-center'>
              Have an account? <Link to='/signin'>Sign In</Link>{' '}
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
    redirectPath: state.auth.redirectPath,
    createdUser: state.auth.createdUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (
      name,
      username,
      email,
      password,
      confirmPassword,
      phone,
      consumerType
    ) =>
      dispatch(
        actions.signUp(
          name,
          username,
          email,
          password,
          confirmPassword,
          phone,
          consumerType
        )
      ),
    openRegister: () => dispatch(actions.openRegister()),
    clearError: () => dispatch(actions.clearError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
