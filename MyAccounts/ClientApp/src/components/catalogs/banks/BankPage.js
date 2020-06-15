import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bankActions from '../../../actions/bankActions';
import BankList from './BankList';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class BankPage extends React.Component {
  constructor(props) {
    super(props);

    this.redirectToAdd = this.redirectToAdd.bind(this);
  }

  redirectToAdd() {
    this.props.history.push('/bank');
  }

  componentDidMount() {
    this.props.actions.loadBanks();
  }

  render() {
    const { banks } = this.props;
    return (
      <div>
        <h4>Bank</h4>
        <Fab color="primary" size="small" aria-label="add" onClick={this.redirectToAdd}>
          <AddIcon />
        </Fab>
        <BankList banks={banks} />
      </div>
      );
  }
}

BankPage.propTypes = {
  actions: PropTypes.object.isRequired,
  banks: PropTypes.array
};

function mapStateToProps(state, ownProps) {
  return {
    banks: state.banks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bankActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BankPage);