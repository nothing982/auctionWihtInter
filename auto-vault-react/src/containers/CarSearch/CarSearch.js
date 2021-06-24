import React, { Component } from 'react';
import classes from './CarSearch.module.css';

class CarSearch extends Component {
  state = {
    car: '',
  };

  onChangeHandler = (event) => {
    console.log(event.target.value);
    this.setState({
      car: event.target.value,
    });
  };

  render() {
    return (
      <div className={['container', classes['search-container']].join(' ')}>
        <div className='row' id='filter'>
          <form>
            <div className='form-group col-md-12 col-xs-3'>
              <h6>
                <strong>Body Type</strong>
              </h6>
              <select
                data-filter='model'
                className='filter-model filter form-control'
              >
                <option value='' disabled selected>
                  Body Type
                </option>
                <option value='Hatchback'>Hatchback</option>
                <option value='Sedan'>Sedan</option>
                <option value='Jeep'>Jeep</option>
                <option value='SUV'>SUV</option>
                <option value='MPV'>MPV</option>
                <option value='BUS'>Bus</option>
                <option value='Truck'>Truck</option>
              </select>
            </div>
            <div className='form-group col-md-12 col-xs-3'>
              <h6>
                <strong>Location</strong>
              </h6>
              <select
                data-filter='model'
                className='filter-model filter form-control'
              >
                <option value='' disabled selected>
                  Country
                </option>
                <option value='United States'>United States</option>
                <option value='United Kingdom'>United Kingdom</option>
                <option value='Canada'>Canada</option>
                <option value='Australia'>Australia</option>
                <option value='Japan'>Japan</option>
                <option value='Pakistan'>Pakistan</option>
              </select>
            </div>

            <div className='form-group col-md-12 col-xs-3'>
              <h6>
                <strong>City</strong>
              </h6>
              <select
                data-filter='model'
                className='filter-model filter form-control'
              >
                <option value='' disabled selected>
                  City
                </option>
                <option value='United States'>Karachi</option>
                <option value='United Kingdom'>Lahore</option>
                <option value='Canada'>Peshawar</option>
                <option value='Australia'>Islamabad</option>
                <option value='Japan'>Quetta</option>
                <option value='Pakistan'>Pakistan</option>
              </select>
            </div>

            <div className='form-group col-md-12 col-xs-3'>
              <h6>
                <strong>Select Make</strong>
              </h6>
              <select
                data-filter='model'
                onChange={this.onChangeHandler}
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
            {this.state.car == 'Honda' ? (
              <div className='form-group col-md-12 col-xs-3'>
                <h6>
                  <strong>Select Model</strong>
                </h6>
                <select
                  data-filter='type'
                  className='filter-type filter form-control'
                >
                  <option value='' disabled selected>
                    Select Model
                  </option>
                  <option value=''>City</option>
                  <option value=''>Civic</option>
                </select>
              </div>
            ) : (
              <div className='form-group col-md-12 col-xs-3'>
                <h6>
                  <strong>Select Model</strong>
                </h6>
                <select
                  data-filter='type'
                  className='filter-type filter form-control'
                >
                  <option value=''>Select Model</option>
                  <option value=''>Corolla</option>
                  <option value=''>Yaris</option>
                </select>
              </div>
            )}

            <div className='form-group col-md-12 col-xs-3'>
              <h6>
                <strong>Price Range</strong>
              </h6>
              <input
                type='text'
                name='price'
                placeholder='From'
                list='citynames'
                className={[
                  'col-sm-6 custom-select custom-select-sm',
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
                  'col-sm-6 custom-select custom-select-sm',
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
          </form>
        </div>
        <button
          type='submit'
          className={['btn btn-block ', classes['btn-search']].join(' ')}
        >
          Search
        </button>
      </div>
    );
  }
}

export default CarSearch;
