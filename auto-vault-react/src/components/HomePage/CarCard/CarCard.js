import React, { Component } from 'react';
import classes from './CarCard.module.css';
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown';

class CarCard extends Component {
  state = {
    time: '',
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
    intervalId: '',
    complete: false,
  };

  render() {
    return (
      <div className={[classes['container'], 'card'].join(' ')}>
        {this.props.vehicle.imageUrl[0] ? (
          <img
            className={[classes['car-image'], 'card-img-top'].join(' ')}
            src={this.props.vehicle.imageUrl[0]}
            style={{
              width: '100%',
              height: '400px',
            }}
          />
        ) : (
          <div className='spinner-border' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        )}

        <div className='card-body'>
          <h5 className={['card-title', classes['title']].join(' ')}>
            {this.props.vehicle.make +
              ' ' +
              this.props.vehicle.model +
              ' ' +
              this.props.vehicle.year}
          </h5>
          <p className={['card-text', classes['text']].join(' ')}>
            {this.props.vehicle.mileage
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' km'}
          </p>
          <p className={['card-text', classes['text']].join(' ')}>
            Karachi, Pakistan
          </p>
          <p className={['card-text', classes['text']].join(' ')}>
            Bill of Sale
          </p>
          <p className={['card-text', classes['text']].join(' ')}>
            Run and Drive
          </p>
          <p className={['card-text', classes['text']].join(' ')}>
            Auction in{' '}
            <strong>
              {new Date(this.props.vehicle.auctionTime) < Date.now() ||
              this.state.complete ? (
                ' Progress'
              ) : (
                <Countdown
                  date={new Date(this.props.vehicle.auctionTime)}
                  onComplete={() => this.setState({ complete: true })}
                />
              )}
            </strong>
          </p>
          <br></br>
          <p className={['card-text', classes['text']].join(' ')}>
            Pre Auction charges:
            <span style={{ color: '#1874CD' }}>
              <strong>${this.props.vehicle.preBidPrice}</strong>
            </span>
          </p>
          <Link
            to={{
              pathname: '/cardetail/' + this.props.vehicle._id,
              vehicle: this.props.vehicle,
            }}
            className={classes['btn']}
          >
            Participate Now!
          </Link>
        </div>
      </div>
    );
  }
}

export default CarCard;
