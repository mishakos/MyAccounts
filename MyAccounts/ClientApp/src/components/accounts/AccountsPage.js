import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountsActions from '../../actions/accountsActions';
import AccountList from './AccountList';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

class AccountsPage extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToAdd = this.redirectToAdd.bind(this);
  }

  redirectToAdd() {
    this.props.history.push('/account');
  }

  componentDidMount() {
    this.props.actions.loadAccounts();
  }

  render() {
    var { accounts } = this.props;
    return (
      <div>
        <Typography gutterBottom variant="h4" component='h3'>
          Accounts Plan
        </Typography>

        <Fab color="primary" size="small" aria-label="add" onClick={this.redirectToAdd}>
          <AddIcon />
        </Fab>

        <AccountList accounts={accounts} />
      </div>
      )
  }
}

AccountsPage.propTypes = {
  accounts: PropTypes.array,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    accounts: state.accounts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(accountsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);