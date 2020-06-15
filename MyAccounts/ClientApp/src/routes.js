import React from "react";
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import * as actions from './actions/loginActions';
import { Route } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import SignInPage from './components/sign-in/SignInPage';
import SignUpPage from './components/sign-up/SignIUpPage';
import CurrencyPage from './components/catalogs/currency/CurrencyPage';
import App from './components/App';
import ManageCurrency from "./components/catalogs/currency/ManageCurrency";
import CurrencyRatePage from './components/catalogs/currency/CurrencyRatePage';
import AccountsPage from "./components/accounts/AccountsPage";
import ManageAccount from "./components/accounts/ManageAccount";
import BankPage from './components/catalogs/banks/BankPage';
import { bindActionCreators } from "redux";
import PrivateRoute from './components/privateroute/PrivateRoute';
import ManageBank from "./components/catalogs/banks/ManageBank";
import ClientPage from "./components/catalogs/clients/ClientPage";
import ManageClient from './components/catalogs/clients/ManageClient';


class Routes extends React.Component {
  render() {
    return (
      <App>
        <PrivateRoute path="/home" component={HomePage} authed={this.props.isAuthed} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
        <PrivateRoute path="/currencies" component={CurrencyPage} authed={this.props.isAuthed} />
        <PrivateRoute path="/currency/:id?" component={ManageCurrency} authed={this.props.isAuthed} />
        <PrivateRoute path="/currencyrate/:id" component={CurrencyRatePage} authed={this.props.isAuthed} />
        <PrivateRoute path="/accounts" component={AccountsPage} authed={this.props.isAuthed} />
        <PrivateRoute path="/account/:id?" component={ManageAccount} authed={this.props.isAuthed} />
        <PrivateRoute path="/about" component={AboutPage} authed={this.props.isAuthed} />
        <PrivateRoute path="/banks" component={BankPage} authed={this.props.isAuthed} />
        <PrivateRoute path="/bank/:id?" component={ManageBank} authed={this.props.isAuthed} />
        <PrivateRoute path="/clients" component={ClientPage} authed={this.props.isAuthed} />
        <PrivateRoute path="/client/:id?" component={ManageClient} authed={this.props.isAuthed} />
      </App>
    );
  }
}

Routes.propTypes = {
  isAuthed: PropTypes.bool,
  actions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    isAuthed: state.user && state.user.id ? true : false
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Routes);