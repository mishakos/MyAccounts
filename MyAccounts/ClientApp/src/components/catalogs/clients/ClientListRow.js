import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const ClientListRow = ({ client }) => {
  return (
    <TableRow>
      <TableCell><Link to={'/client/' + client.id}>{client.id}</Link></TableCell>
      <TableCell>{client.name}</TableCell>
      <TableCell>{client.address}</TableCell>
      <TableCell>{client.phone}</TableCell>
      <TableCell />
    </TableRow>
  );
};

ClientListRow.propTypes = {
  client: PropTypes.object.isRequired
};

export default ClientListRow;
