import React from 'react';
import { PropTypes } from 'prop-types';
import ClientListRow from './ClientListRow';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const ClientList = ({ clients }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>&nbsp;</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Is Resident</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {clients ? clients.map(client =>
            <ClientListRow key={client.id} client={client} />
          ) : <TableRow>
              <TableCell>No Data</TableCell>
            </TableRow>}
        </TableBody>
      </Table>
    </Paper>
  );
};

ClientList.propTypes = {
  clients: PropTypes.array
};

export default ClientList;
