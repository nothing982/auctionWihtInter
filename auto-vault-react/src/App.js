import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './containers/Home/Home';
import BuyItNow from './containers/BuyItNow/BuyItNow';
import OurFee from './components/Support/OurFee/OurFee';
import FAQ from './components/Support/FAQ/FAQ';
import BuyerTips from './components/Support/BuyerTips/BuyerTips';
import AddCar from './containers/Form/AddCar/AddCar';
import SignUp from './containers/Form/SignUp/SignUp';
import SignIn from './containers/Form/SignIn/SignIn';
import Layout from './hoc/Layout/Layout';
import Trends from './containers/Trends/Trends';
import Forums from './containers/Forums/Forum/Forum';
import CreateThread from './containers/Forums/CreateThread/CreateThread';
import Thread from './containers/Forums/Thread/Thread';
import CarDetail from './components/CarDetail/CarDetail';
import { useSelector } from 'react-redux';
import { I8nProvider, LOCALES } from './i18n';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

function App(props) {
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  let routes = (
    <Switch>
      <Route path='/buyitnow' component={BuyItNow} />
      <Route path='/buyertips' component={BuyerTips} />
      <Route path='/ourfee' component={OurFee} />
      <Route path='/faq' component={FAQ} />
      <Route path='/signup' component={SignUp} />
      <Route path='/forums' component={Forums} />
      <Route path='/signin' component={SignIn} />
      <Route path='/thread' component={Thread} />
      <Route path='/cardetail/:id' component={CarDetail} />
      <Route path='/trends' component={Trends} />
      <Route path='/' exact component={Home} />
      <Redirect to='/' exact component={Home} />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/buyitnow' component={BuyItNow} />
        <Route path='/buyertips' component={BuyerTips} />
        <Route path='/ourfee' component={OurFee} />
        <Route path='/faq' component={FAQ} />
        <Route path='/addcar' component={AddCar} />
        <Route path='/forums' component={Forums} />
        <Route path='/createthread' component={CreateThread} />
        <Route path='/cardetail/:id' component={CarDetail} />
        <Route path='/thread' component={Thread} />
        <Route path='/trends' component={Trends} />
        <Route path='/' exact component={Home} />
        <Redirect to='/' exact component={Home} />
      </Switch>
    );
  }
  return (
    <I8nProvider locale={props.language}>
      <Layout>{routes}</Layout>
    </I8nProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.language.language,
  };
};

export default connect(mapStateToProps, null)(App);
