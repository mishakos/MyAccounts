import React from 'react';
import { PropTypes } from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


const CurrencyRateListRow = ({ rate }) => {
    var date =new Date(rate.date);
  var dateString = date.toLocaleDateString('en-EN', options);
  return(
      <TableRow>
          <TableCell>{rate.Id}</TableCell>
          <TableCell>{rate.currencyCode}</TableCell>
          <TableCell>{dateString}</TableCell>
          <TableCell>{rate.koef}</TableCell>
          <TableCell>{rate.rate}</TableCell>
          <TableCell></TableCell>
      </TableRow>
  )
}

CurrencyRateListRow.propTypes = {
  rate: PropTypes.object.isRequired
}

export default CurrencyRateListRow;