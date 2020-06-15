import React from 'react';
import { PropTypes } from 'prop-types';
import BankListRow from './BankListRow';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const BankList = ({ banks }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>&nbsp;</TableCell>
            <TableCell>Parent</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Bank Code</TableCell>
            <TableCell>City</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {banks ? banks.map(bank =>
            <BankListRow key={bank.id} bank={bank} />
          ) : <TableRow>
              <TableCell>No Data</TableCell>
            </TableRow>}
        </TableBody>
      </Table>
    </Paper>
  );
};

BankList.propTypes = {
  banks: PropTypes.array
};

export default BankList;