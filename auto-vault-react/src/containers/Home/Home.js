import React, { Component, Fragment } from 'react';
import HomeImage from '../../components/HomePage/HomeImage/HomeImage';
import classes from './Home.module.css';
import CarGrid from '../../containers/CarGrid/CarGrid';
import Help from '../../components/HomePage/Help/Help';

class Home extends Component {
  render() {
    return (
      <Fragment>
        <HomeImage />
        <CarGrid />
        <Help />
      </Fragment>
    );
  }
}
export default Home;
