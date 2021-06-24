import React, { Component } from 'react';
import * as d3 from 'd3';
import { Bar, Crazy } from 'react-chartjs-2';
import data from '../../assets/Car_sales.csv';

class Trends extends Component {
  state = {
    data: '',
    response: '',
  };

  async componentDidMount() {
    try {
      const response = await d3.csv(data);
      this.setState({ data: response });
      let sales = this.state.data
        .slice(0, this.state.data.length)
        .map((item) => parseInt(item['Sales_in_thousands']));
      let carNames = this.state.data
        .slice(0, this.state.data.length)
        .map((item) => item['Manufacturer'] + ' ' + item['Model']);
      console.log(carNames);
      let display2 = {
        labels: carNames,
        datasets: [
          {
            label: 'Car Sales by Model',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: sales,
          },
        ],
      };
      console.log(display2);

      this.setState({ response: display2 }, () =>
        console.log(this.state.response)
      );
    } catch (err) {
      throw err;
    }
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
          margin: '1rem auto',
        }}
      >
        {' '}
        <div style={{ width: '20%' }}>
          <ul className='nav flex-column'>
            <li className='nav-item'>
              <strong className='nav-link active' href='#'>
                View All Car Sales
              </strong>
            </li>
            <li className='nav-item'>
              <strong className='nav-link' href='#'>
                Car Sales to Dollar Inflation
              </strong>
            </li>
            <li className='nav-item'>
              <strong className='nav-link' href='#'>
                Popular Cars
              </strong>
            </li>
            {/* <li className='nav-item'>
              <strong className='nav-link disabled' href='#'>
                Disabled
              </strong>
            </li> */}
          </ul>
        </div>
        <div style={{ width: '80%' }}>
          {this.state.response ? (
            <Bar data={this.state.response} options={{}} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Trends;
