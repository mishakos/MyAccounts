import React from 'react';
import { PropTypes } from 'prop-types';
import AccountListRow from './AccountListRow';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const AccountList = ({ accounts }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>&nbsp;</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Decription</TableCell>
            <TableCell>Parent</TableCell>
            <TableCell>In Balance</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts ? accounts.map(account =>
            <AccountListRow key={account.id} account={account} />
          ) :
            <TableRow>
              <TableCell>No Data</TableCell>
            </TableRow>
            }
        </TableBody>
      </Table>
    </Paper>
    );
}

AccountList.propTypes = {
  accounts: PropTypes.array.isRequired
};

export default AccountList;