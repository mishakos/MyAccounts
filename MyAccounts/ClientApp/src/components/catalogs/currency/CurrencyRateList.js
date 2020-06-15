import React from 'react';
import { PropTypes } from 'prop-types';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CurrencyRateListRow from './CurrencyRateListRow';

const CurrencyRateList = ({ rates }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>&nbsp;</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Koef</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rates.map(rate =>
            <CurrencyRateListRow key={rate.id} rate={rate} />
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

CurrencyRateList.propTypes = {
  rates: PropTypes.array.isRequired
}

export default CurrencyRateList;