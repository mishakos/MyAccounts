import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ClientList from './ClientList';
import * as clientActions from '../../../actions/clientActions';

class ClientPage extends React.Component {
  constructor(props) {
    super(props);

    this.redirectToAdd = this.redirectToAdd.bind(this);
  }

  redirectToAdd() {
    this.props.history.push('/client');
  }

  componentDidMount() {
    this.props.actions.loadClients();
  }

  render() {
    const { clients } = this.props;
    return (
      <div>
        <h4>Clients</h4>
        <Fab color="primary" size="small" aria-label="add" onClick={this.redirectToAdd}>
          <AddIcon />
        </Fab>
        <ClientList clients={clients} />
      </div>
    );
  }
}

ClientPage.propTypes = {
  clients: PropTypes.array,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    clients: state.clients
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(clientActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientPage);
