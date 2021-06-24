import React, { Component } from 'react';
import { Fragment } from 'react';
import Datetime from 'react-datetime';
import axios from 'axios';
import { Link } from 'react-router-dom';
import classes from './AddCar.module.css';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

class AddCar extends Component {
  state = {
    make: '',
    model: '',
    year: '',
    vin: '',
    color: '',
    transmissionType: '',
    mileage: '',
    engineType: '',
    auctionType: '',
    preBidPrice: '',
    comments: '',
    auctionTime: '',
    images: '',
    pdfFile: '',
  };

  onMakeChangeHandler = (event) => {
    this.setState({
      make: event.target.value,
    });
  };

  onModelChangeHandler = (event) => {
    this.setState({
      model: event.target.value,
    });
  };

  onYearChangeHandler = (date) => {
    const year = new Date(date);
    const formattedYear = year.getFullYear();
    this.setState({ year: formattedYear });
  };

  onVINChangeHandler = (event) => {
    this.setState({
      vin: event.target.value,
    });
  };

  onColorChangeHandler = (event) => {
    this.setState({
      color: event.target.value,
    });
  };

  onTransmissionTypeChangeHandler = (event) => {
    this.setState({
      transmissionType: event.target.value,
    });
  };

  onMileageChangeHandler = (event) => {
    this.setState({
      mileage: event.target.value,
    });
  };

  onEngineTypeChangeHandler = (event) => {
    this.setState({
      engineType: event.target.value,
    });
  };

  onAuctionTypeChangeHandler = (event) => {
    this.setState({
      auctionType: event.target.value,
    });
  };

  onPreBidPriceChangeHandler = (event) => {
    this.setState({
      preBidPrice: event.target.value,
    });
  };

  onDateChangeHandler = (date) => {
    if (date > moment()) {
      this.setState({ auctionTime: date });
    } else {
      console.log('error');
    }
  };

  onCommentsChangeHandler = (event) => {
    this.setState({
      comments: event.target.value,
    });
  };

  imageSelectedHandler = (event) => {
    this.setState({ images: event.target.files });
  };

  pdfSelectedHandler = (event) => {
    this.setState({ pdfFile: event.target.files[0] });
  };

  disablePastDt = (current) => {
    const yesterday = moment().subtract(1, 'day');
    return current.isAfter(yesterday);
  };

  disableFutureDt = (current) => {
    const today = moment();
    return current.isBefore(today);
  };

  renderModel = (brand) => {
    if (brand === 'Honda') {
      return (
        <Fragment>
          <option value='' disabled selected>
            Select Model
          </option>
          <option value='City'>City</option>
          <option value='Civic'>Civic</option>
        </Fragment>
      );
    } else if (brand === 'Toyota') {
      return (
        <Fragment>
          <option value='' disabled selected>
            Select Model
          </option>
          <option value='Corolla'>Corolla</option>
          <option value='Yaris'>Yaris</option>
          <option value='Prado'>Prado</option>
          <option value='Fortuner'>Fortuner</option>
        </Fragment>
      );
    } else if (brand === 'Suzuki') {
      return (
        <Fragment>
          <option value='' disabled selected>
            Select Model
          </option>
          <option value='Alto'>Alto</option>
          <option value='Cultus'>Cultus</option>
          <option value='WagonR'>Wagon R</option>
          <option value='Swift'>Swift</option>
        </Fragment>
      );
    }

    return null;
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('make', this.state.make);
    data.append('model', this.state.model);
    data.append('year', this.state.year);
    data.append('vin', this.state.vin);
    data.append('color', this.state.color);
    data.append('transmissionType', this.state.transmissionType);
    data.append('mileage', this.state.mileage);
    data.append('engineType', this.state.engineType);
    data.append('images', this.state.images);
    data.append('pdfFile', this.state.pdfFile);
    data.append('auctionType', this.state.auctionType);
    data.append('preBidPrice', this.state.preBidPrice);
    data.append('auctionTime', this.state.auctionTime);
    data.append('comments', this.state.comments);
    data.append('userId', localStorage.getItem('userId'));
    const token = localStorage.getItem('token');
    for (const file of this.state.images) {
      data.append('images', file);
    }
    console.log(data);
    data.append('pdfFile', this.state.pdfFile[0]);
    axios
      .post('http://localhost:5000/car/addcar/', data, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div style={{ paddingTop: '0.25rem' }}>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <Link to='/'>Home</Link>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>
              Post Car Ad
            </li>
          </ol>
        </nav>
        <div className={['mx-auto', classes['container']].join(' ')}>
          <form
            classes={classes['form-classes']}
            encType='multipart/form-data'
            onSubmit={this.onSubmitHandler}
          >
            <div class='form-group'>
              <label for='make'>Enter Car Make</label>
              <select
                data-filter='model'
                onChange={this.onMakeChangeHandler}
                className='filter-model filter form-control'
              >
                <option value='' disabled selected>
                  Select Make
                </option>
                <option value='Toyota'>Toyota</option>
                <option value='Honda'>Honda</option>
                <option value='Suzuki'>Suzuki</option>
              </select>
            </div>
            <div class='form-group'>
              <label for='model'>Enter Car Model</label>
              <select
                data-filter='type'
                className='filter-type filter form-control'
                onChange={this.onModelChangeHandler}
              >
                {this.renderModel(this.state.make)}
              </select>
            </div>
            <div class='form-group'>
              <label for='year'>Select Model Year</label>
              <Datetime
                value=''
                dateFormat='YYYY'
                timeFormat={false}
                isValidDate={this.disableFutureDt}
                onChange={this.onYearChangeHandler}
              />
            </div>
            <div class='form-group'>
              <label for='vin'>Enter VIN</label>
              <input
                type='text'
                class='form-control'
                id='vin'
                placeholder=''
                onChange={this.onVINChangeHandler}
              />
            </div>
            <div class='form-group'>
              <label for='color'>Enter Color</label>
              <select
                data-filter='model'
                className='filter-model filter form-control'
                onChange={this.onColorChangeHandler}
              >
                <option value='' disabled selected>
                  Select Color
                </option>
                <option value='White'>White</option>
                <option value='Red'>Red</option>
                <option value='Black'>Black</option>
                <option value='Silver'>Silver</option>
                <option value='Blue'>Blue</option>
                <option value='Beige'>Beige</option>
              </select>
            </div>
            <div class='form-group'>
              <label for='transmission-type'>Enter Tranmission Type</label>
              <select
                data-filter='model'
                className='filter-model filter form-control'
                onChange={this.onTransmissionTypeChangeHandler}
              >
                <option value='' disabled selected>
                  Select Transmission Type
                </option>
                <option value='Manual'>Manual</option>
                <option value='Automatic'>Automatic</option>
              </select>
            </div>
            <div class='form-group'>
              <label for='mileage'>Enter Mileage</label>
              <input
                type='number'
                class='form-control'
                id='mileage'
                placeholder=''
                onChange={this.onMileageChangeHandler}
              />
            </div>
            <div class='form-group'>
              <label for='engine-type'>Enter Engine Type</label>
              <select
                data-filter='model'
                className='filter-model filter form-control'
                onChange={this.onEngineTypeChangeHandler}
              >
                <option value='' disabled selected>
                  Select Engine Type
                </option>
                <option value='Petrol'>Petrol</option>
                <option value='CNG'>CNG</option>
                <option value='Hybrid'>Hybrid</option>
                <option value='Electric'>Electric</option>
              </select>
            </div>
            <div class='form-group'>
              <label for='car-images'>Upload Car Images</label>
              <input
                type='file'
                id='file'
                multiple
                onChange={this.imageSelectedHandler}
              />{' '}
            </div>
            <div class='form-group'>
              <label for='inspection-sheet'>Upload Inspection Sheet</label>
              <input
                type='file'
                id='file'
                onChange={this.pdfSelectedHandler}
              />{' '}
            </div>
            <div class='form-group'>
              <label for='auction-type'>Enter Auction Type</label>
              <select
                data-filter='model'
                className='filter-model filter form-control'
                onChange={this.onAuctionTypeChangeHandler}
              >
                <option value='' disabled selected>
                  Select Auction Type
                </option>
                <option value='Dealer Auction'>Dealer Auction</option>
                <option value='Savage Auction'>Savage Auction</option>
                <option value='Live Auction'>Live Auction</option>
              </select>
            </div>
            <div class='form-group'>
              <label for='pre-bid-price'>Enter Pre Bid Price</label>
              <input
                type='number'
                class='form-control'
                id='pre-bid-price'
                placeholder=''
                onChange={this.onPreBidPriceChangeHandler}
              />
            </div>
            <div class='form-group'>
              <label for='auction-time'>Select Auction Date & Time</label>
              <Datetime
                value={this.state.date}
                onChange={this.onDateChangeHandler}
                isValidDate={this.disablePastDt}
              />
            </div>

            <div class='form-group'>
              <label for='exampleFormControlTextarea1'>
                Enter Comments About Car
              </label>
              <textarea
                class='form-control'
                id='exampleFormControlTextarea1'
                rows='3'
                onChange={this.onCommentsChangeHandler}
              ></textarea>
            </div>
            <div class='text-center'>
              <button type='submit' className={classes['btn-submit']}>
                Post Ad
              </button>
            </div>
          </form>
        </div>
        <br />
      </div>
    );
  }
}

export default AddCar;
