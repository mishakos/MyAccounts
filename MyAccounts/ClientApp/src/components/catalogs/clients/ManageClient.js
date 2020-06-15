import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as clientActions from '../../../actions/clientActions';
import toastr from 'toastr';
import ClientForm from './ClientForm';

class ManageClient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      client: Object.assign({}, this.props.client),
      errors: {},
      saving: false
    };

    this.onCancel = this.onCancel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidUpdate(nextProps) {
    if (this.props.client.id !== nextProps.client.id) {
      this.setState({ client: Object.assign({}, nextProps.client) });
    } 
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('Client saved.');
    this.props.history.push("/clients");
  }

  onChange(event) {
    let field = event.target.name;
    let client = this.state.client;
    client[field] = event.target.value;
    return this.setState({ client: client });
  }

  onCancel() {
    this.props.history.goBack();
  }

  clientIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.client.name.length === 0) {
      errors.bankCode = 'Client name is required';
      formIsValid = false;
    }

    return formIsValid;
  }

  onSave(event) {
    event.preventDefault();

    if (!this.clientIsValid()) {
      return;
    }

    this.setState({ saving: true });
    this.props.actions.addClient(this.state.client)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  render() {
    return (
      <ClientForm
        onChange={this.onChange}
        onSave={this.onSave}
        onCancel={this.onCancel}
        client={this.state.client}
        errors={this.state.errors}
        saving={this.state.saving}
        />
      );
  }
}

ManageClient.propTypes = {
  client: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function getClientById(clients, clientId) {
  const client = clients.filter(p => p.id === +clientId);
  if (client && client.length > 0) {
    return client[0];
  }
}

function mapStateToProps(state, ownProps) {
  let clientId = null;
  if (ownProps.match.params.id) {
    clientId = ownProps.match.params.id;
  }
  let client = { id: 0, name: '', address: '', phone: '' };
  if (clientId && clientId != 0) {
    client = getClientById(state.clients, clientId);
  }

  return {
    client: client
  };

}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(clientActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageClient);
