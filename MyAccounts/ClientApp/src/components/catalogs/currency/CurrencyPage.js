import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as currencyActions from '../../../actions/currencyActions';
import CurrencyList from './CurrencyList';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class CurrencyPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAdd = this.redirectToAdd.bind(this);
  }

  redirectToAdd() {
    this.props.history.push('/currency');
  }

  componentDidMount() {
    this.props.actions.loadCurrencies();
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <h4>Currencies</h4>
        <Fab color="primary" size="small" aria-label="add" onClick={this.redirectToAdd}>
          <AddIcon />
        </Fab>
        <CurrencyList currencies={currencies} />
      </div>
    );
  }
}

CurrencyPage.propTypes = {
  currencies: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    currencies: state.currencies
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(currencyActions, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CurrencyPage);