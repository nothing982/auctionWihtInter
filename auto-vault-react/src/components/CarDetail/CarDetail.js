import React, { Component } from 'react';
import classes from './Honda2006.module.css';
import Slider from './slider';
import AuctionIcon from './auctionIcon.PNG';
import Title from './title.PNG';
import watchList from './watchList.PNG';
import statusIcon from './statusIcon.PNG';
import damage from './damageIcon.PNG';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Countdown from 'react-countdown';
import io from 'socket.io-client';
import { Modal, Button, ThemeProvider, Alert } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import data from '../../assets/Car_sales.csv';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import StripeCheckout from 'react-stripe-checkout';
import translate from '../../i18n/translate';
// import pic1 from './1.jpg';
// import pic2 from './2.jpg';
// import pic3 from './3.jpg';
import MakeAnOffer from './MakeAnOffer.PNG';
import axios from 'axios';
import { timer } from 'd3';

let socket;
let STRIPE_PUBLISHABLE_KEY =
  'pk_test_51J4vwtH7Iinz1VCHjOXPL2hObZGD7D06BGfIiz9wtzgL4LLivcrmbW7atpmlsZgLwXNzFfyK0U2TMvrCdyc9HmEP00urlLQkY9';
var countDownTime = 0;

class CarDetail extends Component {
  constructor(props) {
    super(props);

    // Create the ref
    this.exampleRef = React.createRef(null);
    this.dateRef = React.createRef(null);
  }

  state = {
    key: 0,
    showModal: '',
    showAlert: '',
    message: '',
    showButtons: false,
    currentBid: 0,
    time: 10,
    startAuction: false,
  };

  makePayment = (token) => {
    console.log('hello');
    socket.emit('completePayment', {
      token: token,
      buyerUserId: this.props.user._id,
      sellerUserId: this.props.location.vehicle.creator,
      room: this.props.location.vehicle.vin,
      name: `${this.props.location.vehicle.make} ${this.props.location.vehicle.model} ${this.props.location.vehicle.year}`,
    });
  };

  joinAuction = () => {
    socket.emit(
      'join',
      {
        name: this.props?.user?.name,
        userId: this.props.user._id,
        room: this.props.location?.vehicle?.vin,
      },
      (err) => {
        if (err) {
          this.setState({ message: err, showAlert: true }, () => {
            setTimeout(() => {
              this.setState({ showAlert: false });
            }, 2000);
          });
        }
      }
    );

    socket.on('messageUserJoined', ({ message }) => {
      console.log(message);
      this.setState({ message: message, showAlert: true }, () => {
        setTimeout(() => {
          this.setState({ showAlert: false });
        }, 2000);
      });
    });
  };

  checkWinAuction = () => {
    console.log('You');
    socket.on('informWinner', ({ message }) => {
      this.setState({ showModal: true, message: message });
      console.log('Infrom WInner');
    });
  };

  startAuction = () => {
    this.dateRef = Date.now() + 10000;
    console.log(this.dateRef);
    this.setState({ showButtons: true, startAuction: true });
  };

  placeBid = (event) => {
    socket.emit('placeBid', { bid: parseInt(event.target.value) });
    socket.on('bidSuccessful', ({ message }) => {
      this.setState({ message: message, showAlert: true });
    });
    socket.emit('refreshTime', {});
    socket.on('updateTime', () => {
      console.log('hello');
      this.dateRef = Date.now() + 10000;
      this.setState((prevState) => ({ key: prevState.key + 1 }));
    });
  };
  async componentDidMount() {
    // if (!this.props.location.vehicle) {
    //   axios.get('')
    // }

    socket = io('localhost:5000');

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

      this.setState({ response: display2 }, () =>
        console.log(this.state.response)
      );
    } catch (err) {
      throw err;
    }
  }

  finishAuction = () => {
    socket.emit('auctionFinished', { room: this.props.location.vehicle.vin });
    this.setState({ showAlert: false });
    this.checkWinAuction();
  };
  componentWillUnmount() {
    socket.disconnect();
  }
  onModalOpen = () => {
    this.setState({ showModal: true });
  };

  onModalClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div className={classes['main-container']}>
        {this.state.showModal ? (
          <Modal
            show={this.state.showModal}
            onHide={this.onModalClose}
            centered
          >
            <Modal.Body style={{ textAlign: 'center' }}>
              <span className={classes['win']}>
                <i
                  className={[
                    'fas fa-thumbs-up fa-3x',
                    classes['thumbsup-icon'],
                  ].join(' ')}
                ></i>
                <strong>{this.state.message}</strong>
              </span>
            </Modal.Body>
            <Modal.Footer>
              <StripeCheckout
                stripeKey={STRIPE_PUBLISHABLE_KEY}
                token={this.makePayment}
                name='Buy Car'
                email={this.props.user.email}
              >
                <Button
                  variant='success'
                  className={classes['button']}
                  onClick={this.onModalClose}
                >
                  Proceed to Buy Car
                </Button>
              </StripeCheckout>
              <Button
                variant='danger'
                className={classes['button']}
                onClick={this.onModalClose}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        ) : null}
        {this.state.showAlert ? (
          <div className={classes['alert-container']}>
            {' '}
            <Alert variant='info'>{this.state.message}</Alert>
          </div>
        ) : null}

        <div className={classes['nav-links']}>
          <a href='#' className={classes['auctions']}>
            Auctions
          </a>
          <span> / </span>
          <a href='#' className={classes['DealerAuction']}>
            Dealer's Auction
          </a>
          <span> / </span>
          <a className={classes['Honda-Pilot-2006']}>Honda Pilot 2006</a>
        </div>
        {/* <nav aria-label="breadcrumb">
                <ol class={["breadcrumb",classes["links"]].join(" ")}>
                    <li class="breadcrumb-item"><a href="#">Auctions</a></li>
                    <li class="breadcrumb-item"><a href="#">Dealer's Auction</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Honda Pilot 2006 </li>
                </ol>
            </nav> */}
        <div className={classes['topContainer']}>
          <h1 className={classes['vehicleName']}>
            {`${this.props.location.vehicle.make} ${this.props.location.vehicle.model} ${this.props.location.vehicle.year}`}{' '}
          </h1>

          <div className={classes['vehicle-intro']}>
            <div style={{ width: '50%' }} className={classes['carousel']}>
              <Carousel autoPlay interval='1000' transitionTime='1000'>
                {this.props.location.vehicle.imageUrl.map((image) => (
                  <img src={image} />
                ))}
              </Carousel>
            </div>
            <div className={classes['display-container']}>
              <div
                style={{
                  background: 'white',
                  padding: '1rem',
                  height: 'max-content',
                  color: '#555A60',
                  width: '70%',
                }}
              >
                <h4>
                  {new Date(this.props.location.vehicle.auctionTime) <
                  Date.now() ? (
                    <center>
                      <strong>Auction in Progress</strong>
                    </center>
                  ) : (
                    <strong>
                      {translate('TimeRemaining')}: &nbsp;
                      <Countdown
                        date={new Date(this.props.location.vehicle.auctionTime)}
                        onComplete={this.startAuction}
                      />
                    </strong>
                  )}
                </h4>
              </div>
              <div
                style={{
                  background: 'white',
                  padding: '1rem',
                  color: '#555A60',
                  width: '70%',
                }}
              >
                <h4>
                  {' '}
                  <strong>
                    {translate('CurrentPreBid')}:
                    {this.props.location.vehicle.preBidPrice + '$'}
                  </strong>
                </h4>
              </div>
              <div
                style={{
                  background: 'white',
                  padding: '1rem',
                  height: 'max-content',
                  color: '#555A60',
                  width: '70%',
                }}
              >
                <p>
                  <strong>
                   {translate('Terms&Conditions')}
                  </strong>
                </p>
              </div>

              <div
                style={{
                  background: 'white',
                  padding: '1rem',
                  height: 'max-content',
                  color: '#555A60',
                  width: '70%',
                }}
              >
                <p>
                  <strong>
                    {translate('RepresentativeText')}
                  </strong>
                </p>
              </div>

              <div
                style={{
                  background: 'white',
                  padding: '1rem',
                  height: 'max-content',
                  color: '#555A60',
                  width: '70%',
                }}
              >
                <p>
                  <strong>
                   {translate('ViolationText')}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={classes['top-buttons']}>
          <button
            type='button'
            onClick={() => {
              this.joinAuction();
              this.startAuction();
            }}
            className={['btn btn-warning', classes['auction-button']].join(' ')}
          >
            {translate('AttendThisAuction')}
          </button>
          <br />
          <br />
          <button
            type='button'
            className={['btn btn-info', classes['BuyNow-button']].join(' ')}
          >
            {translate('BuyNow')}
          </button>
          <br />
          <br />
          <button
            type='button'
            className={['btn btn-light', classes['WatchList-button']].join(' ')}
          >
            {translate('AddToWatchList')}
          </button>
        </div>

        <div className={classes['optionsContainer']}>
          <div className={classes['make-an-offer']}>
            <a>
              <img src={MakeAnOffer} />
              <br />
              {translate('MakeAnOffer')}
            </a>
          </div>
          <div className={classes['make-an-offer']}>
            <a>
              <img src={MakeAnOffer} />
              <br />
              {translate('VehicleHistoryReport')}
            </a>
          </div>
          <div className={classes['make-an-offer']}>
            <a>
              <img src={MakeAnOffer} />
              <br />
              {translate('FeeCalculator')}
            </a>
          </div>
          <div className={classes['make-an-offer']}>
            <a>
              {' '}
              <img src={MakeAnOffer} />
              <br />
              {translate('ContactAutoVaultSpecialist')}
            </a>
          </div>
        </div>
        <div
          style={{
            width: '100vw',
            position: 'fixed',
            zIndex: '9999',
            top: '0',
            lefft: '0',
            textAlign: 'center',
          }}
        >
          {' '}
          <strong>
            {this.state.startAuction ? (
              // <CountdownCircleTimer
              //   key={this.state.key}
              //   isPlaying={this.state.startAuction}
              //   isPlaying={true}
              //   duration={10}
              //   colors={[
              //     ['#004777', 0.33],
              //     ['#A30000', 0.33],
              //   ]}
              //   onComplete={this.finishAuction}
              // >
              //   {({ remainingTime }) => remainingTime}
              // </CountdownCircleTimer>
              <Countdown
                date={this.dateRef}
                key={this.state.key}
                onComplete={this.finishAuction}
              />
            ) : null}
          </strong>
        </div>
        <div className={classes['lower-container']}>
          <div className={classes['sellers-comments']}>
            <div>
              {' '}
              <h2 className={classes['sellers-comments__heading']}>
                <strong>{translate('SellerComments')}</strong>
              </h2>
              <p>{this.props.location.vehicle.comments}</p>
            </div>
            {this.state.response ? (
              <Bar data={this.state.response} options={{}} />
            ) : null}
          </div>
          <div className={classes['car-details-conatiner']}>
            <div className={classes['car-details__item']}>
              <div>{translate('Vin')} </div>
              <div>
                <strong>{this.props.location.vehicle.vin}</strong>
              </div>
            </div>
            <div className={classes['car-details__item']}>
              <div>{translate('Inventory')}</div>
              <div>
                <strong>CO29715221</strong>
              </div>
            </div>
            <div className={classes['car-details__item']}>
              <div>{translate('City')}</div>
              <div>
                <strong>Karachi</strong>
              </div>
            </div>
            <div className={classes['car-details__item']}>
              <div>{translate('Country')}</div>
              <div>
                <strong>Pakistan</strong>
              </div>
            </div>
            <div className={classes['car-details__item']}>
              <div>{translate('Year')}</div>
              <div>
                <strong>{this.props.location.vehicle.year}</strong>
              </div>
            </div>
            <div className={classes['car-details__item']}>
              <div>{translate('Make')}</div>
              <div>
                <strong>{this.props.location.vehicle.make}</strong>
              </div>
            </div>
            <div className={classes['car-details__item']}>
              <div>{translate('Model')}</div>
              <div>
                <strong>{this.props.location.vehicle.model}</strong>
              </div>
            </div>
            <div className={classes['car-details__item']}>
              <div>{translate('Color')}</div>
              <div>
                <strong>{this.props.location.vehicle.color}</strong>
              </div>
            </div>
            <div className={classes['car-details__item']}>
              <div>{translate('VehicleStyle')}</div>
              <div>
                <strong>SUV</strong>
              </div>
            </div>
            <div className={classes['car-details__item']}>
              <div>{translate('TransmissionType')}</div>
              <div>
                <strong>{this.props.location.vehicle.transmissionType}</strong>
              </div>
            </div>
            <div className={classes['car-details__item']}>
              <div>{translate('DriveTrain')}</div>
              <div>
                <strong>Front-wheel drive</strong>
              </div>
            </div>
            <div className={classes['car-details__item']}>
              <div>{translate('EngineType')}</div>
              <div>
                <strong>{this.props.location.vehicle.engineType}</strong>
              </div>
            </div>
          </div>
        </div>
        {/* {this.state.showButtons ? (
          <div className={classes['auction-button-container']}>
            <button className={classes['bid-button']}>100$</button>
            <button className={classes['bid-button']}>500$</button>
            <button className={classes['bid-button']}>1000$</button>
          </div>
        ) : null} */}
        <div className={classes['auction-button-container']}>
          <button
            className={classes['bid-button']}
            value='100'
            onClick={this.placeBid}
          >
            100$
          </button>
          <button
            className={classes['bid-button']}
            value='500'
            onClick={this.placeBid}
          >
            500$
          </button>
          <button
            className={classes['bid-button']}
            value='1000'
            onClick={this.placeBid}
          >
            1000$
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(CarDetail);
