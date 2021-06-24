import React from 'react';
import classes from './Footer.module.css';
import { Link } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import { LOCALES } from '../../../i18n/index';

import translate from '../../../i18n/translate';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/language';
import connect from 'react-redux';

function Footer() {
  const dispatch = useDispatch();
  return (
    <footer className='bottom'>
      <div
        className={[
          'footer-top',
          classes['container'],
          classes['footer-main'],
        ].join(' ')}
      >
        <div className='container'>
          <div className='row'>
            <div
              className='col-md-3 footer-about wow'
              style={{ visibility: 'visible' }}
            >
              <h3>{translate('AboutUs')}</h3>
              <p>{translate('AboutUsText')}</p>
              <p>© Auto Vault Inc.</p>
            </div>
            <div
              className='col-md-4 offset-md-1 footer-contact wow'
              style={{ visibility: 'visible' }}
            >
              <h3>{translate('Contact')} </h3>
              <p>
                <i className='fas fa-map-marker-alt'></i> {translate('Address')}
              </p>
              <p>
                <i className='fas fa-phone'></i> +92-34651153
              </p>
              <p>
                <i className='fas fa-envelope'></i>{' '}
                <a href='mailto:hello@domain.com'>support@autovault.com</a>
              </p>
            </div>
            <div
              className={[
                'col-md-4 footer-links wow',
                classes['links-container'],
              ].join(' ')}
              style={{ visibility: 'visible' }}
            >
              <div className='row'>
                <div className='col'>
                  <h3>{translate('Links')}</h3>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <p>
                    <Link className={classes['link']} to='/'>
                      {translate('Home')}
                    </Link>
                  </p>
                  <p>
                    <Link className={classes['link']} to='/'>
                      
                      {translate('Blog')}
                    </Link>
                  </p>
                  <p>
                    <Link className={classes['link']} to='/'>
                      
                      {translate('About')}
                    </Link>
                  </p>
                </div>
                <div className='col-md-6'>
                  <p>
                    <Link className={classes['link']} to='/'>
                     
                      {translate('Contact')}
                    </Link>
                  </p>
                  <p>
                    <Link className={classes['link']} to='/'>
                   
                      {translate('Support')}
                    </Link>
                  </p>
                  <p>
                    <Link className={classes['link']} to='/'>
                    {translate('T&C')}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='footer-bottom'>
          <div className='container '>
            <div className='row justify-content-center'>
              <div className='py-2'>
                <ReactCountryFlag
                  className='emojiFlag'
                  countryCode='US'
                  style={{
                    fontSize: '3em',
                    lineHeight: '1em',
                    marginRight: '1.5rem',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    dispatch(actions.changeLanguage(LOCALES.ENGLISH))
                  }
                  aria-label='United States'
                />

                <ReactCountryFlag
                  className='emojiFlag'
                  countryCode='DE'
                  style={{
                    fontSize: '3em',
                    lineHeight: '1em',
                    marginRight: '1.5rem',
                    cursor: 'pointer',
                  }}
                  aria-label='Germany'
                  onClick={() =>
                    dispatch(actions.changeLanguage(LOCALES.GERMAN))
                  }
                />
                <ReactCountryFlag
                  className='emojiFlag'
                  countryCode='JP'
                  style={{
                    fontSize: '3em',
                    lineHeight: '1em',
                    cursor: 'pointer',
                  }}
                  aria-label='Japan'
                  onClick={() =>
                    dispatch(actions.changeLanguage(LOCALES.JAPANESE))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
