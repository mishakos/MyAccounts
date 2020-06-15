import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bankActions from '../../../actions/bankActions';
import toastr from 'toastr';
import BankForm from './BankForm';

class ManageBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bank: Object.assign({}, this.props.bank),
      errors: {},
      saving: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidUpdate(nextProps) {
    if (this.props.bank.id !== nextProps.bank.id) {
      this.setState({ bank: Object.assign({}, nextProps.bank) });
    }
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('Bank saved.');
    this.props.history.push("/banks");
  }

  onChange(event) {
    let field = event.target.name;
    let bank = this.state.bank;
    bank[field] = event.target.value;
    return this.setState({ bank: bank });
  }

  onCancel() {
    this.props.history.goBack();
  }

  bankIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.bank.bankCode.length === 0) {
      errors.bankCode = 'Bank Code is required';
      formIsValid = false;
    }

    return formIsValid;
  }

  onSave(event) {
    event.preventDefault();

    if (!this.bankIsValid()) {
      return;
    }

    this.setState({ saving: true });
    this.props.actions.saveBank(this.state.bank)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  render() {
    return (
      <BankForm
        onChange={this.onChange}
        onSave={this.onSave}
        onCancel={this.onCancel}
        bank={this.state.bank}
        errors={this.state.errors}
        saving={this.state.saving}
        />
      );
  }
}

ManageBank.propTypes = {
  bank: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function getBankById(banks, bankId) {
  const bank = banks.filter(p => p.id === +bankId);
  if (bank && bank.length > 0)
    return bank[0];
}

function mapStateToProps(state, ownProps) {
  let bankId = null;
  if (ownProps.match.params.id) {
    bankId = ownProps.match.params.id;
  }
  let bank = { id: 0, name: '', parentId: null, isGroup: false, corrAccount: '', city: '', address: '', phones: '', bankCode: '' };

  if (bankId && bankId != 0) {
    bank = getBankById(state.banks, bankId);
  }
  return {
    bank: bank
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bankActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBank);
