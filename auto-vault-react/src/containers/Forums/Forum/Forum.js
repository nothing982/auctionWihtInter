import React, { Component } from 'react';
import classes from './Forum.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

import qs from 'query-string';

class Forums extends Component {
  state = {
    threads: '',
    queryParam: '',
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/thread/getthreads')
      .then((res) => {
        console.log(res.data.thread);
        this.setState({ threads: res.data.thread });
      })
      .catch((err) => console.log(err));
    // console.log(this.state);
  }

  render() {
    const queryParam = qs.parse(this.props.location.search);

    return (
      <div>
        <ul className='nav'>
          <li className='nav-item'>
            <form className='form-inline'>
              <input
                className='form-control mr-sm-2'
                type='search'
                placeholder='Search car'
                aria-label='Search'
              />
              <button className={classes['button-search']} type='submit'>
                Search
              </button>
            </form>
          </li>
          <li className='nav-item'>
            <a
              className={['nav-link', classes['link']].join(' ')}
              aria-current='page'
              href='#'
            >
              Categories
            </a>
          </li>
          <li className='nav-item'>
            <a className={['nav-link', classes['link']].join(' ')} href='#'>
              Latest
            </a>
          </li>
          <li className='nav-item'>
            <a className={['nav-link', classes['link']].join(' ')} href='#'>
              Top
            </a>
          </li>
        </ul>
        <div class='table-responsive'>
          <table
            className={['table  mx-auto w-auto', classes['table']].join(' ')}
          >
            <thead>
              <tr>
                <th scope='col'>
                  <center>
                    <strong>Category</strong>
                  </center>
                </th>
                <th scope='col'>
                  <center>
                    <strong>Latest</strong>
                  </center>
                </th>
                <th scope='col'>
                  <center>
                    <strong>Topics</strong>
                  </center>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={classes['column-item']}>
                    <h3 style={{ width: '100%' }}>General Car Discussion</h3>
                    <div style={{ width: '100%', wordBreak: 'break-word' }}>
                      All discussion related to cars goes into this section.
                      Find solution to your problems, ask questions and talk
                      about your, all in one place.
                    </div>
                  </div>
                </td>
                <td>
                  <div className={classes['column-item']}>
                    {this.state.threads
                      ? this.state.threads.map((item, index) => {
                          if (item.category === 'General Car Discussion') {
                            return item.mostRecentTitle.map((forum, index) => (
                              <div>
                                <Link
                                  to={{
                                    pathname: '/thread',
                                    search: qs.stringify({
                                      ...queryParam,
                                      id: item.ids[index],
                                    }),
                                  }}
                                >
                                  <h5>{forum}</h5>
                                </Link>
                                {/* <h1>{item.ids[index]}</h1> */}
                              </div>
                            ));
                          }
                        })
                      : null}
                  </div>
                </td>
                <td>Otto</td>
              </tr>
              <tr>
                <td>
                  <div className={classes['column-item']}>
                    <h3 style={{ width: '100%' }}>Technical Forums</h3>
                    <div style={{ width: '100%', wordBreak: 'break-word' }}>
                      This section is dedicated for general non-model specific
                      technical discussion of more serious discussion. If you
                      want to post a problem about your ride or you want to ask
                      a question, please post in the model specific forum of
                      your vehicle.
                    </div>
                  </div>
                </td>
                <td>
                  <div className={classes['column-item']}>
                    {this.state.threads
                      ? this.state.threads.map((item, index) => {
                          if (item.category === 'Technical Forums') {
                            return item.mostRecentTitle.map((forum, index) => (
                              <div>
                                <Link
                                  to={{
                                    pathname: '/thread',
                                    search: qs.stringify({
                                      ...queryParam,
                                      id: item.ids[index],
                                    }),
                                  }}
                                >
                                  <h5>{forum}</h5>
                                </Link>
                                {/* <h1>{item.ids[index]}</h1> */}
                              </div>
                            ));
                          }
                        })
                      : null}
                  </div>
                </td>
                <td>Otto</td>
              </tr>

              <tr>
                <td>
                  <div className={classes['column-item']}>
                    <h3 style={{ width: '100%' }}>Buy, Sell & Exchange</h3>
                    <div style={{ width: '100%', wordBreak: 'break-word' }}>
                      Buy, sell and exchange your cars, bikes, 4x4s, parts and
                      other stuff.
                    </div>
                  </div>
                </td>
                <td>
                  <div className={classes['column-item']}>
                    {this.state.threads
                      ? this.state.threads.map((item, index) => {
                          if (item.category === 'Buy, Sell & Exchange') {
                            return item.mostRecentTitle.map((forum, index) => (
                              <div>
                                <Link
                                  to={{
                                    pathname: '/thread',
                                    search: qs.stringify({
                                      ...queryParam,
                                      id: item.ids[index],
                                    }),
                                  }}
                                >
                                  <h5>{forum}</h5>
                                </Link>
                                {/* <h1>{item.ids[index]}</h1> */}
                              </div>
                            ));
                          }
                        })
                      : null}
                  </div>
                </td>
                <td>Otto</td>
              </tr>

              <tr>
                <td>
                  <div className={classes['column-item']}>
                    <h3 style={{ width: '100%' }}>Casual Forums</h3>
                    <div style={{ width: '100%', wordBreak: 'break-word' }}>
                      These allow for more casual conversations and discussions,
                      however, posts and replies must still be within the limits
                      of the rules and regulations.
                    </div>
                  </div>
                </td>
                <td>
                  <div className={classes['column-item']}>
                    {this.state.threads
                      ? this.state.threads.map((item, index) => {
                          if (item.category === 'Casual Forums') {
                            return item.mostRecentTitle.map((forum, index) => (
                              <div>
                                <Link
                                  to={{
                                    pathname: '/thread',
                                    search: qs.stringify({
                                      ...queryParam,
                                      id: item.ids[index],
                                    }),
                                  }}
                                >
                                  <h5>{forum}</h5>
                                </Link>
                                {/* <h1>{item.ids[index]}</h1> */}
                              </div>
                            ));
                          }
                        })
                      : null}
                  </div>
                </td>
                <td>Otto</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Forums;
