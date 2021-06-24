import React, { Fragment, useState, useEffect } from 'react';
import classes from './Header.module.css';
import Logo from '../../../assets/Logo/Logo.jpg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/auth';

const Header = (props) => {
  const dispatch = useDispatch();
  console.log(props);

  return (
    <Fragment>
      <nav
        class={[classes['nav'], 'navbar navbar-expand-lg navbar-light'].join(
          ' '
        )}
      >
        <img src={Logo} className={classes['logo']}></img>
        {props.name ? (
          <div className={classes['auth-container']}>
            <button
              className='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target='#navbar-list-4'
              aria-controls='navbarNav'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbar-list-4'>
              <ul className='navbar-nav'>
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link dropdown-toggle'
                    href='#'
                    id='navbarDropdownMenuLink'
                    role='button'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    {props.name.name}
                    <img
                      src='https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg'
                      width='40'
                      height='40'
                      className='rounded-circle'
                    />
                  </a>
                  <div
                    className='dropdown-menu'
                    aria-labelledby='navbarDropdownMenuLink'
                  >
                    <Link className='dropdown-item' to='/addcar'>
                      Feature Car
                    </Link>
                    <Link className='dropdown-item' to='/addcar'>
                      Manage Cars
                    </Link>
                    <Link className='dropdown-item' to='/createthread'>
                      Create Thread
                    </Link>
                    <Link className='dropdown-item' to='/addcar'>
                      Manage Threads
                    </Link>
                    <Link className='dropdown-item' to='/addcar'>
                      Create Blog
                    </Link>
                    <Link className='dropdown-item' to='/addcar'>
                      Manage Blog
                    </Link>
                    <Link
                      className='dropdown-item'
                      onClick={() => dispatch(actions.logout())}
                    >
                      Log Out
                    </Link>
                  </div>
                </li>
              </ul>
            </div>{' '}
          </div>
        ) : (
          <div className={classes['btn-container']}>
            <Link to='/signup'>
              <button type='button' className={classes['btn-submit']}>
                Sign Up
              </button>
            </Link>
            <div className={classes['divider']}></div>
            <Link to='/signin'>
              <button type='button' className={classes['btn-submit']}>
                Sign In
              </button>
            </Link>
          </div>
        )}
      </nav>
    </Fragment>
  );
};

export default Header;
