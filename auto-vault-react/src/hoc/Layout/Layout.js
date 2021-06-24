import React, { Component, Fragment } from 'react';
import Header from '../../components/UI/Header/Header';
import Navigation from '../../components/UI/Navigation/Navigation';
import Footer from '../../components/UI/Footer/Footer';
import classes from './Layout.module.css';
import { connect } from 'react-redux';

class Layout extends Component {
  render() {
    return (
      <Fragment>
        <div className={classes['nav']}>
          <Header name={this.props.user} />
          <Navigation />
        </div>
        <div className={classes['main']}>{this.props.children}</div>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(Layout);
