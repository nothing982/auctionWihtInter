import React, { Component } from 'react';
import CarSearch from '../CarSearch/CarSearch';
import CarCard from '../../components/HomePage/CarCard/CarCard';
import Datetime from 'react-datetime';
import classes from './BuyItNow.module.css';
import axios from 'axios';
import { Modal, Button, ThemeProvider } from 'react-bootstrap';
import { relativeTimeThreshold } from 'moment';
import translate from '../../i18n/translate';

class BuyItNow extends Component {
  state = {
    car: '',
    filter: false,
    bodyTypeOpen: true,
    countryOpen: true,
    cityOpen: true,
    makeOpen: true,
    modelOpen: true,
    yearOpen: true,
    priceOpen: true,
    bodyType: [],
    country: [],
    city: [],
    make: [],
    model: [],
    year: '',
    price: '',
    page: 1,
    limit: 12,
    vehicles: '',
    timeLeft: '',
    intervalId: '',
    showModal: false,
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/car/getcars/', {
        params: {
          page: this.state.page,
          limit: this.state.limit,
        },
      })
      .then((res) => this.setState({ vehicles: res.data.vehicles }))
      .catch((err) => console.log(err));
  }

  onChangeHandler = (event) => {
    console.log(event.target.value);
    console.log(window.innerWidth);
    this.setState({
      car: event.target.value,
    });
  };
  handleBodyTypeOpen = () => {
    this.setState(
      (prevState) => ({
        bodyTypeOpen: !prevState.bodyTypeOpen,
      }),
      () => {
        console.log(this.state.bodyTypeOpen);
      }
    );
  };
  handleCountryOpen = () => {
    this.setState(
      (prevState) => ({
        countryOpen: !prevState.countryOpen,
      }),
      () => {
        console.log(this.state.countryOpen);
      }
    );
  };
  handleCityOpen = () => {
    this.setState(
      (prevState) => ({
        cityOpen: !prevState.cityOpen,
      }),
      () => {
        console.log(this.state.cityOpen);
      }
    );
  };
  handleMakeOpen = () => {
    this.setState(
      (prevState) => ({
        makeOpen: !prevState.makeOpen,
      }),
      () => {
        console.log(this.state.makeOpen);
      }
    );
  };
  handleModelOpen = () => {
    this.setState(
      (prevState) => ({
        modelOpen: !prevState.modelOpen,
      }),
      () => {
        console.log(this.state.modelOpen);
      }
    );
  };
  handleYearOpen = () => {
    this.setState(
      (prevState) => ({
        yearOpen: !prevState.yearOpen,
      }),
      () => {
        console.log(this.state.yearOpen);
      }
    );
  };
  handlePriceOpen = () => {
    this.setState(
      (prevState) => ({
        priceOpen: !prevState.priceOpen,
      }),
      () => {
        console.log(this.state.priceOpen);
      }
    );
  };

  bodyTypeChangeHandler = (event) => {
    if (event.target.checked) {
      this.setState((prevState) => ({
        bodyType: prevState.bodyType.concat(event.target.name),
      }));
    } else {
      this.setState((prevState) => ({
        bodyType: prevState.bodyType.filter(
          (item) => item !== event.target.name
        ),
      }));
    }
  };

  countryChangeHandler = (event) => {
    if (event.target.checked) {
      this.setState(
        (prevState) => ({
          country: prevState.country.concat(event.target.name),
        }),
        () => console.log(this.state.country)
      );
    } else {
      this.setState((prevState) => ({
        country: prevState.country.filter((item) => item !== event.target.name),
      }));
    }
  };

  makeChangeHandler = (event) => {
    if (event.target.checked) {
      this.setState(
        (prevState) => ({
          make: prevState.make.concat(event.target.name),
        }),
        () => console.log(this.state.make)
      );
    } else {
      this.setState((prevState) => ({
        make: prevState.make.filter((item) => item !== event.target.name),
      }));
    }
  };

  modelChangeHandler = (event) => {
    if (event.target.checked) {
      this.setState(
        (prevState) => ({
          model: prevState.model.concat(event.target.name),
        }),
        () => console.log(this.state.model)
      );
    } else {
      this.setState((prevState) => ({
        model: prevState.model.filter((item) => item !== event.target.name),
      }));
    }
  };

  setPageNumber = (page) => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          page: page,
        };
      },
      () => {
        axios
          .get('http://localhost:5000/car/getcars/', {
            params: {
              page: this.state.page,
              limit: this.state.limit,
            },
          })
          .then((res) => this.setState({ vehicles: res.data.vehicles }))
          .catch((err) => console.log(err));
      }
    );
  };

  onFilterClickHandler = (event) => {
    event.preventDefault();
    const filterData = {
      make: this.state.make ? this.state.make : '',
      model: this.state.model ? this.state.model : '',
    };
    Object.keys(filterData).forEach(
      (key) => filterData[key] === '' && delete filterData[key]
    );
    axios
      .post('http://localhost:5000/car/filtercars/', filterData, {
        params: {
          page: this.state.page,
          limit: this.state.limit,
        },
      })
      .then((res) => {
        if (res.data.vehicles.length === 0) {
          this.onModalOpen();
        } else {
          this.setState({ vehicles: res.data.vehicles });
        }
      })
      .catch((err) => console.log(err));
  };

  onClickHandler = () => {
    this.setState((prevState) => ({
      filter: !prevState.filter,
    }));
  };

  onModalOpen = () => {
    this.setState({ showModal: true });
  };

  onModalClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    // console.log(this.state.filter && (window.innerWidth < 930));
    return (
      <div className={classes['background']}>
        <h6 className={classes['count-heading']}>
          Showing <strong>1-60</strong> of <strong>9,300</strong> vehicles
        </h6>
        <button onClick={this.onClickHandler} className={classes['filter-btn']}>
          Filters
        </button>

        {this.state.filter ? (
          <div className={classes['responsive-search-container']}>
            <form className={['text-left', classes['form']].join(' ')}>
              <div
                className={['form-group', classes['form-element']].join(' ')}
              >
                <button
                  className={['btn', classes['collapse-btn']].join(' ')}
                  type='button'
                  data-toggle='collapse'
                  data-target='#body-type'
                  aria-expanded='false'
                  aria-controls='collapseExample'
                  onClick={this.handleBodyTypeOpen}
                >
                  <strong>
                    {translate('BodyType')}{' '}
                    <i
                      className={
                        this.state.bodyTypeOpen
                          ? 'fas fa-angle-down'
                          : 'fas fa-angle-up'
                      }
                    ></i>
                  </strong>
                </button>
                <div className='collapse' id='body-type'>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Hatchback'
                      name='Hatchback'
                      onChange={this.bodyTypeChangeHandler}
                    />
                    <label className='custom-control-label' for='Hatchback'>
                      Hatchback
                    </label>
                  </div>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Sedan'
                      name='Sedan'
                      onChange={this.bodyTypeChangeHandler}
                    />
                    <label className='custom-control-label' for='Sedan'>
                      Sedan
                    </label>
                  </div>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='SUV'
                      name='SUV'
                      onChange={this.bodyTypeChangeHandler}
                    />
                    <label className='custom-control-label' for='SUV'>
                      SUV
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='MPV'
                      name='MPV'
                      onChange={this.bodyTypeChangeHandler}
                    />
                    <label className='custom-control-label' for='MPV'>
                      MPV
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Jeep'
                      name='Jeep'
                      onChange={this.bodyTypeChangeHandler}
                    />
                    <label className='custom-control-label' for='Jeep'>
                      Jeep
                    </label>
                  </div>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Truck'
                      name='Truck'
                      onChange={this.bodyTypeChangeHandler}
                    />
                    <label className='custom-control-label' for='Truck'>
                      Truck
                    </label>
                  </div>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Bus'
                      name='Bus'
                      onChange={this.bodyTypeChangeHandler}
                    />
                    <label className='custom-control-label' for='Bus'>
                      Bus
                    </label>
                  </div>
                </div>
              </div>

              <div
                className={['form-group', classes['form-element']].join(' ')}
              >
                <button
                  className={['btn', classes['collapse-btn']].join(' ')}
                  type='button'
                  data-toggle='collapse'
                  data-target='#country'
                  aria-expanded='false'
                  aria-controls='collapseExample'
                  onClick={this.handleCountryOpen}
                >
                  <strong>
                    {translate('Country')}{' '}
                    <i
                      className={
                        this.state.countryOpen
                          ? 'fas fa-angle-down'
                          : 'fas fa-angle-up'
                      }
                    ></i>
                  </strong>
                </button>

                <div className='collapse' id='country'>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='United States'
                      name='United States'
                      onChange={this.countryChangeHandler}
                    />
                    <label className='custom-control-label' for='United States'>
                      United States
                    </label>
                  </div>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='United Kingdom'
                      name='United Kingdom'
                      onChange={this.countryChangeHandler}
                    />
                    <label
                      className='custom-control-label'
                      for='United Kingdom'
                    >
                      United Kingdom
                    </label>
                  </div>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Australia'
                      name='Australia'
                      onChange={this.countryChangeHandler}
                    />
                    <label className='custom-control-label' for='Australia'>
                      Australia
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Japan'
                      name='Japan'
                      onChange={this.countryChangeHandler}
                    />
                    <label className='custom-control-label' for='Japan'>
                      Japan
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Pakistan'
                      name='Pakistan'
                      onChange={this.countryChangeHandler}
                    />
                    <label className='custom-control-label' for='Pakistan'>
                      Pakistan
                    </label>
                  </div>
                </div>
              </div>

              <div
                className={['form-group', classes['form-element']].join(' ')}
              >
                <button
                  className={['btn', classes['collapse-btn']].join(' ')}
                  type='button'
                  data-toggle='collapse'
                  data-target='#city'
                  aria-expanded='false'
                  aria-controls='collapseExample'
                  onClick={this.handleCityOpen}
                >
                  <strong>
                    {translate('City')}{' '}
                    <i
                      className={
                        this.state.cityOpen
                          ? 'fas fa-angle-down'
                          : 'fas fa-angle-up'
                      }
                    ></i>
                  </strong>
                </button>
                <div className='collapse' id='city'>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Karachi'
                    />
                    <label className='custom-control-label' for='Karachi'>
                      Karachi
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Lahore'
                    />
                    <label className='custom-control-label' for='Lahore'>
                      Lahore
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Peshawar'
                    />
                    <label className='custom-control-label' for='Peshawar'>
                      Peshawar
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Islamabad'
                    />
                    <label className='custom-control-label' for='Islamabad'>
                      Islamabad
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Quetta'
                    />
                    <label className='custom-control-label' for='Quetta'>
                      Quetta
                    </label>
                  </div>
                </div>
              </div>

              <div
                className={['form-group', classes['form-element']].join(' ')}
              >
                <button
                  className={['btn', classes['collapse-btn']].join(' ')}
                  type='button'
                  data-toggle='collapse'
                  data-target='#make'
                  aria-expanded='false'
                  aria-controls='collapseExample'
                  onClick={this.handleMakeOpen}
                >
                  <strong>
                    {translate('Make')}{' '}
                    <i
                      className={
                        this.state.makeOpen
                          ? 'fas fa-angle-down'
                          : 'fas fa-angle-up'
                      }
                    ></i>
                  </strong>
                </button>

                <div className='collapse' id='make'>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Toyota'
                      name='Toyota'
                      onChange={this.makeChangeHandler}
                    />
                    <label className='custom-control-label' for='Toyota'>
                      Toyota
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Honda'
                    />
                    <label className='custom-control-label' for='Honda'>
                      Honda
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Suzuki'
                    />
                    <label className='custom-control-label' for='Suzuki'>
                      Suzuki
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Volkswagen'
                    />
                    <label className='custom-control-label' for='Volkswagen'>
                      Volkswagen
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Mercedes'
                    />
                    <label className='custom-control-label' for='Mercedes'>
                      Mercedes
                    </label>
                  </div>
                </div>
              </div>

              <div
                className={['form-group', classes['form-element']].join(' ')}
              >
                <button
                  className={['btn', classes['collapse-btn']].join(' ')}
                  type='button'
                  data-toggle='collapse'
                  data-target='#model'
                  aria-expanded='false'
                  aria-controls='collapseExample'
                  onClick={this.handleModelOpen}
                >
                  <strong>
                    {translate('Model')}{' '}
                    <i
                      className={
                        this.state.modelOpen
                          ? 'fas fa-angle-down'
                          : 'fas fa-angle-up'
                      }
                    ></i>
                  </strong>
                </button>

                <div className='collapse' id='model'>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Corolla'
                      name='Corolla'
                      onChange={this.modelChangeHandler}
                    />
                    <label className='custom-control-label' for='Corolla'>
                      Corolla
                    </label>
                  </div>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Yaris'
                      name='Yaris'
                      onChange={this.modelChangeHandler}
                    />
                    <label className='custom-control-label' for='Yaris'>
                      Yaris
                    </label>
                  </div>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Fortuner'
                      name='Corolla'
                      onChange={this.modelChangeHandler}
                    />
                    <label className='custom-control-label' for='Fortuner'>
                      Fortuner
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Prado'
                    />
                    <label className='custom-control-label' for='Prado'>
                      Prado
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Hilux'
                    />
                    <label className='custom-control-label' for='Hilux'>
                      Hilux
                    </label>
                  </div>
                </div>
              </div>

              <div
                className={['form-group', classes['form-element']].join(' ')}
              >
                <button
                  className={['btn', classes['collapse-btn']].join(' ')}
                  type='button'
                  data-toggle='collapse'
                  data-target='#year'
                  aria-expanded='false'
                  aria-controls='collapseExample'
                  onClick={this.handleYearOpen}
                >
                  <strong>
                    {translate('Year')}{' '}
                    <i
                      className={
                        this.state.yearOpen
                          ? 'fas fa-angle-down'
                          : 'fas fa-angle-up'
                      }
                    ></i>
                  </strong>
                </button>

                <div className='collapse' id='year'>
                  <select className='custom-select my-2 mx-2'>
                    <option selected>From</option>
                    <option value='1'>2020</option>
                    <option value='2'>2019</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                  </select>

                  <select className='custom-select mx-2'>
                    <option selected>To</option>
                    <option value='1'>2020</option>
                    <option value='2'>2019</option>
                    <option value='2'>2019</option>
                    <option value='2'>2019</option>
                    <option value='2'>2019</option>
                    <option value='2'>2019</option>
                    <option value='2'>2019</option>
                    <option value='2'>2019</option>
                    <option value='3'>2018</option>

                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>

                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                    <option value='3'>2018</option>
                  </select>
                </div>
              </div>

              <div
                className={['form-group', classes['form-element']].join(' ')}
              >
                <button
                  className={['btn', classes['collapse-btn']].join(' ')}
                  type='button'
                  data-toggle='collapse'
                  data-target='#price'
                  aria-expanded='false'
                  aria-controls='collapseExample'
                  onClick={this.handlePriceOpen}
                >
                  <strong>
                    Price{' '}
                    <i
                      className={
                        this.state.priceOpen
                          ? 'fas fa-angle-down'
                          : 'fas fa-angle-up'
                      }
                    ></i>
                  </strong>
                </button>
                <div className='collapse' id='price'>
                  <input
                    type='text'
                    name='price'
                    placeholder='From'
                    list='citynames'
                    className={[
                      'custom-select custom-select-sm my-2 mx-2',
                      classes['price-input-1'],
                    ].join(' ')}
                  />
                  <datalist id='citynames'>
                    <option className={classes['option']} value='200,000' />
                    <option className={classes['option']} value='400,000' />
                    <option className={classes['option']} value='600,000' />
                    <option className={classes['option']} value='800,000' />
                  </datalist>
                  <input
                    type='text'
                    name='price'
                    placeholder='To'
                    list='citynames'
                    className={[
                      'custom-select custom-select-sm my-2 mx-2',
                      classes['price-input-2'],
                    ].join(' ')}
                  />
                  <datalist id='citynames'>
                    <option value='200,000' />
                    <option value='400,000' />
                    <option value='600,000' />
                    <option value='800,000' />
                  </datalist>
                </div>
              </div>

              <div
                style={{
                  textAlign: 'center',
                  width: '100%',
                  marginLeft: '0.3rem',
                }}
              >
                <button
                  type='submit'
                  className={['btn btn-block', classes['btn-search']].join(' ')}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        ) : null}

        <div className={classes['large-devices-container']}>
          <div className={classes['search-container']}>
            <form
              className={['text-left', classes['form']].join(' ')}
              onSubmit={this.onFilterClickHandler}
            >
              <div
                className={['form-group', classes['form-element']].join(' ')}
              >
                <button
                  className={['btn', classes['collapse-btn']].join(' ')}
                  type='button'
                  data-toggle='collapse'
                  data-target='#body-type'
                  aria-expanded='false'
                  aria-controls='collapseExample'
                  onClick={this.handleBodyTypeOpen}
                >
                  <strong>
                    {translate('BodyType')}{' '}
                    <i
                      className={
                        this.state.bodyTypeOpen
                          ? 'fas fa-angle-down'
                          : 'fas fa-angle-up'
                      }
                    ></i>
                  </strong>
                </button>
                <div className='collapse' id='body-type'>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Hatchback'
                      name='Hatchback'
                      onChange={this.bodyTypeChangeHandler}
                    />
                    <label className='custom-control-label' for='Hatchback'>
                      Hatchback
                    </label>
                  </div>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Sedan'
                      name='Sedan'
                      onChange={this.bodyTypeChangeHandler}
                    />
                    <label className='custom-control-label' for='Sedan'>
                      Sedan
                    </label>
                  </div>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='SUV'
                      name='SUV'
                      onChange={this.bodyTypeChangeHandler}
                    />
                    <label className='custom-control-label' for='SUV'>
                      SUV
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='MPV'
                      name='MPV'
                      onChange={this.bodyTypeChangeHandler}
                    />
                    <label className='custom-control-label' for='MPV'>
                      MPV
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      name='Jeep'
                      onChange={this.bodyTypeChangeHandler}
                      id='Jeep'
                    />
                    <label className='custom-control-label' for='Jeep'>
                      Jeep
                    </label>
                  </div>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Truck'
                      name='Truck'
                      onChange={this.bodyTypeChangeHandler}
                    />
                    <label className='custom-control-label' for='Truck'>
                      Truck
                    </label>
                  </div>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Bus'
                      name='Bus'
                      onChange={this.bodyTypeChangeHandler}
                    />
                    <label className='custom-control-label' for='Bus'>
                      Bus
                    </label>
                  </div>
                </div>
              </div>

              <div
                className={['form-group', classes['form-element']].join(' ')}
              >
                <button
                  className={['btn', classes['collapse-btn']].join(' ')}
                  type='button'
                  data-toggle='collapse'
                  data-target='#country'
                  aria-expanded='false'
                  aria-controls='collapseExample'
                  onClick={this.handleCountryOpen}
                >
                  <strong>
                    {translate('Country')}{' '}
                    <i
                      className={
                        this.state.countryOpen
                          ? 'fas fa-angle-down'
                          : 'fas fa-angle-up'
                      }
                    ></i>
                  </strong>
                </button>

                <div className='collapse' id='country'>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='United States'
                      name='United States'
                      onChange={this.countryChangeHandler}
                    />
                    <label className='custom-control-label' for='United States'>
                      United States
                    </label>
                  </div>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='United Kingdom'
                      name='United Kingdom'
                      onChange={this.countryChangeHandler}
                    />
                    <label
                      className='custom-control-label'
                      for='United Kingdom'
                    >
                      United Kingdom
                    </label>
                  </div>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Australia'
                      name='Australia'
                      onChange={this.countryChangeHandler}
                    />
                    <label className='custom-control-label' for='Australia'>
                      Australia
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Japan'
                      name='Japan'
                      onChange={this.countryChangeHandler}
                    />
                    <label className='custom-control-label' for='Japan'>
                      Japan
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Pakistan'
                      name='Pakistan'
                      onChange={this.countryChangeHandler}
                    />
                    <label className='custom-control-label' for='Pakistan'>
                      Pakistan
                    </label>
                  </div>
                </div>
              </div>

              <div
                className={['form-group', classes['form-element']].join(' ')}
              >
                <button
                  className={['btn', classes['collapse-btn']].join(' ')}
                  type='button'
                  data-toggle='collapse'
                  data-target='#city'
                  aria-expanded='false'
                  aria-controls='collapseExample'
                  onClick={this.handleCityOpen}
                >
                  <strong>
                    {translate('City')}{' '}
                    <i
                      className={
                        this.state.cityOpen
                          ? 'fas fa-angle-down'
                          : 'fas fa-angle-up'
                      }
                    ></i>
                  </strong>
                </button>
                <div className='collapse' id='city'>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Karachi'
                    />
                    <label className='custom-control-label' for='Karachi'>
                      Karachi
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Lahore'
                    />
                    <label className='custom-control-label' for='Lahore'>
                      Lahore
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Peshawar'
                    />
                    <label className='custom-control-label' for='Peshawar'>
                      Peshawar
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Islamabad'
                    />
                    <label className='custom-control-label' for='Islamabad'>
                      Islamabad
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Quetta'
                    />
                    <label className='custom-control-label' for='Quetta'>
                      Quetta
                    </label>
                  </div>
                </div>
              </div>

              <div
                className={['form-group', classes['form-element']].join(' ')}
              >
                <button
                  className={['btn', classes['collapse-btn']].join(' ')}
                  type='button'
                  data-toggle='collapse'
                  data-target='#make'
                  aria-expanded='false'
                  aria-controls='collapseExample'
                  onClick={this.handleMakeOpen}
                >
                  <strong>
                    {translate('Make')}{' '}
                    <i
                      className={
                        this.state.makeOpen
                          ? 'fas fa-angle-down'
                          : 'fas fa-angle-up'
                      }
                    ></i>
                  </strong>
                </button>

                <div className='collapse' id='make'>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Toyota'
                      name='Toyota'
                      onChange={this.makeChangeHandler}
                    />
                    <label className='custom-control-label' for='Toyota'>
                      Toyota
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Honda'
                      name='Honda'
                      onChange={this.makeChangeHandler}
                    />
                    <label className='custom-control-label' for='Honda'>
                      Honda
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Suzuki'
                      name='Suzuki'
                      onChange={this.makeChangeHandler}
                    />
                    <label className='custom-control-label' for='Suzuki'>
                      Suzuki
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Volkswagen'
                      name='Volkswagen'
                      onChange={this.makeChangeHandler}
                    />
                    <label className='custom-control-label' for='Volkswagen'>
                      Volkswagen
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Mercedes'
                      name='Mercedes'
                      onChange={this.makeChangeHandler}
                    />
                    <label className='custom-control-label' for='Mercedes'>
                      Mercedes
                    </label>
                  </div>
                </div>
              </div>

              <div
                className={['form-group', classes['form-element']].join(' ')}
              >
                <button
                  className={['btn', classes['collapse-btn']].join(' ')}
                  type='button'
                  data-toggle='collapse'
                  data-target='#model'
                  aria-expanded='false'
                  aria-controls='collapseExample'
                  onClick={this.handleModelOpen}
                >
                  <strong>
                    {translate('Home')}{' '}
                    <i
                      className={
                        this.state.modelOpen
                          ? 'fas fa-angle-down'
                          : 'fas fa-angle-up'
                      }
                    ></i>
                  </strong>
                </button>

                <div className='collapse' id='model'>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Corolla'
                      name='Corolla'
                      onChange={this.modelChangeHandler}
                    />
                    <label className='custom-control-label' for='Corolla'>
                      Corolla
                    </label>
                  </div>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Yaris'
                      name='Yaris'
                      onChange={this.modelChangeHandler}
                    />
                    <label className='custom-control-label' for='Yaris'>
                      Yaris
                    </label>
                  </div>
                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Fortuner'
                    />
                    <label className='custom-control-label' for='Fortuner'>
                      Fortuner
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Prado'
                    />
                    <label className='custom-control-label' for='Prado'>
                      Prado
                    </label>
                  </div>

                  <div
                    className={[
                      classes['checkbox'],
                      'custom-control custom-checkbox',
                    ].join(' ')}
                  >
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='Hilux'
                    />
                    <label className='custom-control-label' for='Hilux'>
                      Hilux
                    </label>
                  </div>
                </div>
              </div>

              <div
                className={['form-group', classes['form-element']].join(' ')}
              >
                <button
                  className={['btn', classes['collapse-btn']].join(' ')}
                  type='button'
                  data-toggle='collapse'
                  data-target='#year'
                  aria-expanded='false'
                  aria-controls='collapseExample'
                  onClick={this.handleYearOpen}
                >
                  <strong>
                    {translate('Year')}{' '}
                    <i
                      className={
                        this.state.yearOpen
                          ? 'fas fa-angle-down'
                          : 'fas fa-angle-up'
                      }
                    ></i>
                  </strong>
                </button>

                <div
                  className='collapse'
                  style={{
                    textAlign: 'center',
                    margin: 'auto',
                  }}
                  id='year'
                >
                  <Datetime
                    value=''
                    dateFormat='YYYY'
                    timeFormat={false}
                    inputProps={{ className: classes['date-time'] }}

                    // isValidDate={this.disableFutureDt}
                    //onChange={this.onYearChangeHandler}
                  />

                  <Datetime
                    value=''
                    dateFormat='YYYY'
                    timeFormat={false}
                    // inputProps={{ className: classes['date-time'] }}
                    // isValidDate={this.disableFutureDt}
                    //onChange={this.onYearChangeHandler}
                  />
                </div>
              </div>

              <div
                className={['form-group', classes['form-element']].join(' ')}
              >
                <button
                  className={['btn', classes['collapse-btn']].join(' ')}
                  type='button'
                  data-toggle='collapse'
                  data-target='#price'
                  aria-expanded='false'
                  aria-controls='collapseExample'
                  onClick={this.handlePriceOpen}
                >
                  <strong>
                    Price{' '}
                    <i
                      className={
                        this.state.priceOpen
                          ? 'fas fa-angle-down'
                          : 'fas fa-angle-up'
                      }
                    ></i>
                  </strong>
                </button>
                <div className='collapse' id='price'>
                  <input
                    type='text'
                    name='price'
                    placeholder='From'
                    list='citynames'
                    className={[
                      'custom-select custom-select-sm my-2 mx-2',
                      classes['price-input-1'],
                    ].join(' ')}
                  />
                  <datalist id='citynames'>
                    <option className={classes['option']} value='200,000' />
                    <option className={classes['option']} value='400,000' />
                    <option className={classes['option']} value='600,000' />
                    <option className={classes['option']} value='800,000' />
                  </datalist>
                  <input
                    type='text'
                    name='price'
                    placeholder='To'
                    list='citynames'
                    className={[
                      'custom-select custom-select-sm my-2 mx-2',
                      classes['price-input-2'],
                    ].join(' ')}
                  />
                  <datalist id='citynames'>
                    <option value='200,000' />
                    <option value='400,000' />
                    <option value='600,000' />
                    <option value='800,000' />
                  </datalist>
                </div>
              </div>

              <div
                style={{
                  textAlign: 'center',
                  marginLeft: '0.15rem',
                  width: '100%',
                }}
              >
                <button
                  type='submit'
                  className={['btn btn-block ', classes['btn-search']].join(
                    ' '
                  )}
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className={classes['car-container']}>
            {this.state.vehicles ? (
              this.state.vehicles.map((vehicle) => (
                <CarCard vehicle={vehicle} />
              ))
            ) : (
              <div
                className='spinner-border'
                style={{ margin: 'auto', width: '7rem', height: '7rem' }}
                role='status'
              >
                <span className='sr-only'>Loading...</span>
              </div>
            )}

            {this.state.showModal ? (
              <h1 style={{ textAlign: 'center', margin: 'auto' }}>
                <Modal
                  show={this.state.showModal}
                  onHide={this.onModalClose}
                  centered
                >
                  <Modal.Body style={{ textAlign: 'center' }}>
                    <span>
                      <strong>Sorry, No Results Found</strong>
                    </span>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      className={classes['modal-btn']}
                      onClick={this.onModalClose}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </h1>
            ) : null}
          </div>
        </div>
        <nav aria-label='...' className='my-5'>
          <ul className='pagination justify-content-center'>
            <li
              className={`page-item ${this.state.page === 1 ? 'disabled' : ''}`}
            >
              <button
                className='page-link'
                tabindex='-1'
                onClick={() => this.setPageNumber(this.state.page - 1)}
              >
                Previous
              </button>
            </li>
            <li className='page-item active'>
              <button className='page-link'>
                <span className='sr-only'>(current)</span>
                {this.state.page}
              </button>
            </li>
            <li className='page-item'>
              <button
                className='page-link'
                onClick={() => this.setPageNumber(this.state.page + 1)}
              >
                {this.state.page + 1}
              </button>
            </li>
            <li className='page-item'>
              <button
                className='page-link'
                onClick={() => this.setPageNumber(this.state.page + 2)}
              >
                {this.state.page + 2}
              </button>
            </li>
            <li className='page-item'>
              <button
                className='page-link'
                onClick={() => this.setPageNumber(this.state.page + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default BuyItNow;
