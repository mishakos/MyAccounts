import React from 'react';
import { PropTypes } from 'prop-types';
import CurrencyListRow from './CurrencyListRow';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CurrencyList = ({ currencies }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>&nbsp;</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>ShortCode</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Name</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencies.map(currency =>
            <CurrencyListRow key={currency.id} currency={currency} />
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

CurrencyList.propTypes = {
  currencies: PropTypes.array.isRequired
};

export default CurrencyList;