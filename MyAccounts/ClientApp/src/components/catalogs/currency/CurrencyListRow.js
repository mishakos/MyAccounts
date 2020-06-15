import React from 'react';
import { Link } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const CurrencyListRow = ({ currency }) => {
  return (
    <TableRow>
      <TableCell>{currency.id}</TableCell>
      <TableCell><Link to={'/currency/' + currency.id}>{currency.code}</Link></TableCell>
      <TableCell>{currency.shortCode}</TableCell>
      <TableCell>{currency.symbol}</TableCell>
      <TableCell>{currency.name}</TableCell>
      <TableCell>
        <Link to={'/currencyrate/' + currency.id}>Rates</Link>
      </TableCell>
    </TableRow>
    )
}

export default CurrencyListRow;