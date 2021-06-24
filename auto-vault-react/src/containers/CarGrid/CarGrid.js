import React, { Component } from 'react';
import CarCard from '../../components/HomePage/CarCard/CarCard';
import classes from './CarGrid.module.css';

class CarGrid extends Component {
  render() {
    return (
      <div className={[classes['container'], 'row'].join(' ')}>
        {/* <div className='col-12 col-lg-4 col-md-6 xs-12'>
          <CarCard />
        </div>
        <div className='col-12 col-lg-4 col-md-6 xs-12'>
          <CarCard />
        </div>
        <div className='col-12 col-lg-4 col-md-6 xs-12'>
          <CarCard />
        </div> */}
        {/* <div className="col-3 col-md-4 col-sm-12"><CarCard/></div> */}
      </div>
    );
  }
}
export default CarGrid;
