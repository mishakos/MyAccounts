import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as currencyActions from '../../../actions/currencyActions';
import CurrencyForm from './CurrencyForm';
import toastr from 'toastr';

class ManageCurrency extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currency: Object.assign({}, this.props.currency),
      errors: {},
      saving: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidUpdate(nextProps) {
    if (this.props.currency.id !== nextProps.currency.id) {
      this.setState({
        currency: Object.assign({}, nextProps.currency)
      });
    }
  }

  onChange(event) {
    let field = event.target.name;
    let currency = this.state.currency;
    currency[field] = event.target.value;
    return this.setState({ currency: currency });
  }

  currencyFormIsValid() {
    let formIsValid = true;
    let errors = {};
    if (this.state.currency.code.length !== 3) {
      
      errors.code = "Currency code must to be 3 characters";
      formIsValid = false;
    }
    if (this.state.currency.shortCode.length !== 3) {
      errors.shortCode = "Currency short code must to be 3 characters";
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  saveCurrency() {
    if (this.state.currency.id === 0) {
      return this.props.actions.saveCurrency(this.state.currency);
    } else {
      return this.props.actions.updateCurrency(this.state.currency)
    }

  }

  onSave(event) {
    event.preventDefault();

    if (!this.currencyFormIsValid()) {
      return;
    }

    this.setState({ saving: true });
    this.props.actions.saveCurrency(this.state.currency)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success("Currency saved.");
    this.props.history.push("/currencies");
  }

  onCancel() {
    this.props.history.goBack();
  }

  render() {
    return (
      <CurrencyForm
        onChange={this.onChange}
        onSave={this.onSave}
        onCancel={this.onCancel}
        currency={this.state.currency}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageCurrency.propTypes = {
    currency: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

function getCurrencyById(currencies, id) {
  const currency = currencies.filter(cur => cur.id === +id);
  if (currency) return currency[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  let currencyId = null;
  if (ownProps.match.params.id) {
    currencyId = ownProps.match.params.id;
  }
  let currency = { id: 0, code: "", shortCode: "", symbol: "", name: "" };

  if (currencyId && state.currencies.length > 0) {
    currency = getCurrencyById(state.currencies, currencyId);
  }

  return {
    currency: currency
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(currencyActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCurrency);