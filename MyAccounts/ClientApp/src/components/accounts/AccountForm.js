import React from 'react';
import { PropTypes } from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';

import TextInput from '../common/TextInput';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CheckboxInput from '../common/CheckboxInput';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: '100%',
    margin: 20
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const AccountForm = ({ account, onChange, onSave, onCancel, errors, saving }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="h4" component='h2'>
          Edit Account
        </Typography>
        <form>
          <FormGroup row>
          <TextInput name="code"
            label="Code"
            value={account.code}
            errors={errors.code}
            onChange={onChange} />
          <TextInput name="description"
            label="Description"
            value={account.description}
            errors={errors.description}
            onChange={onChange} />
            <CheckboxInput
              onChange={onChange}
              value={account.inBalance}
              name="inBalance"
              label="In Balance"
              IsReadonly={false}
            />
            <CheckboxInput
              onChange={onChange}
              value={account.isActive}
              label="Is Active"
              name="isActive"
              IsReadonly={false}
            />
            <CheckboxInput
              onChange={onChange}
              value={account.isPassive}
              name="isPassive"
              label="Is Passive"
              IsReadonly={false}
            />

         </FormGroup>
        </form>
      </CardContent>
      <CardActions>
        <Button
          type="button"
          variant="contained"
          onClick={onCancel}>
          Cancel
          </Button>

        <Button type="submit"
          disabled={saving}
          variant="contained"
          color="primary"
          onClick={onSave} >
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </CardActions>
    </Card>
    );
}

AccountForm.propTypes = {
  account: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  errors: PropTypes.object,
  saving: PropTypes.bool
};

export default AccountForm;