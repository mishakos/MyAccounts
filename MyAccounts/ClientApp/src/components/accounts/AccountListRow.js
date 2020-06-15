import React from 'react';
import { PropTypes } from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';

const AccountListRow = ({ account }) => {
  return (
    <TableRow>
      <TableCell><div>{account.id}</div></TableCell>
      <TableCell><Link to={'/account/' + account.id}>{account.code}</Link></TableCell>
      <TableCell><div>{account.description}</div></TableCell>
      <TableCell><div>{account.parentCode}</div></TableCell>
      <TableCell>
        <div>
          <Checkbox
            checked={account.inBalance}
            color='primary'
            
          />
        </div>
      </TableCell>
      <TableCell>
      </TableCell>
    </TableRow>
  )
}

AccountListRow.propTypes = {
  account: PropTypes.object.isRequired
}

export default AccountListRow;