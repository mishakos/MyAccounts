import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const BankListRow = ({ bank }) => {
  return (
    <TableRow>
      <TableCell><Link to={'/bank/' + bank.id}>{bank.id}</Link></TableCell>
      <TableCell>{bank.parentName}</TableCell>
      <TableCell>{bank.name}</TableCell>
      <TableCell>{bank.bankCode}</TableCell>
      <TableCell>{bank.city}</TableCell>
      <TableCell />
    </TableRow>
  );
};

BankListRow.propTypes = {
  bank: PropTypes.object
};

export default BankListRow;