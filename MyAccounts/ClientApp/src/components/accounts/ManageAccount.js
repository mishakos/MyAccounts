import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountsActions from '../../actions/accountsActions';
import toastr from 'toastr';
import AccountForm from './AccountForm';

class ManageAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: Object.assign({}, this.props.account),
      errors: {},
      saving: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);

  }

  componentDidUpdate(nextProps) {
    if (this.props.account.id !== nextProps.account.id) {
      this.setState({
        account: Object.assign({}, nextProps.account)
      });
    }
  }

  onChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    let field = target.name;
    let account = this.state.account;
    account[field] = value;
    return this.setState({ account: account });
  }

  accountFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.account.description.length < 5) {
      formIsValid = false;
      errors.description = 'description length must be more or equal 5 characters!';
    }
    if (this.state.account.isActive === false && this.state.account.isPassive === false) {
      formIsValid = false;
      errors.isActive = 'account must be active or passive or active and passive';
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  onSave(event) {
    event.preventDefault();

    if (!this.accountFormIsValid()) {
      return;
    }

    this.setState({ saving: true });
    if (this.state.account.id === 0) {
      this.props.actions.addAccount(this.state.account)
        .then(() => this.redirect())
        .catch(error => {
          toastr.error(error);
          this.setState({ saving: false });
        });
    } else {
      this.props.actions.updateAccount(this.state.account)
        .then(() => this.redirect())
        .catch(error => {
          toastr.error(error);
          this.setState({ saving: false });
        });
    }
    
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success("Account saved.");
    this.props.history.push("/accounts");
  }

  onCancel() {
    this.props.history.goBack();
  }

  render() {
    return (
      <AccountForm
        onChange={this.onChange}
        onSave={this.onSave}
        onCancel={this.onCancel}
        account={this.state.account}
        errors={this.state.errors}
        saving={this.state.saving}
        />
      )
  }
}

ManageAccount.propTypes = {
  account: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function getAccountById(accounts, id) {
  const account = accounts.filter(acc => acc.id === +id);
  if (account) return account[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  var accountId = null;
  if (ownProps.match.params.id) {
    accountId = ownProps.match.params.id;
  }
  let account = {
    id: 0, code: '', description: '', parentId: null,
    inBalance: false, isActive: false, isPassive: false
  };
  if (accountId && state.accounts.length > 0) {
    account = getAccountById(state.accounts, accountId);
  }
  return {
    account: account
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(accountsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);