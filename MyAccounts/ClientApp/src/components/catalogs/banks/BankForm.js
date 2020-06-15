import React from 'react';
import { PropTypes } from 'prop-types';
import TextInput from '../../common/TextInput';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import CheckboxInput from '../../common/CheckboxInput';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 800,
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

const BankForm = ({ bank, onChange, onSave, onCancel, errors, saving }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <form>
          <h1>Manage bank</h1>
          <TextInput name="name"
            label="Name"
            value={bank.name}
            errors={errors.name}
            onChange={onChange} />
          <TextInput name="bankCode"
            label="Bank Code"
            value={bank.bankCode}
            errors={errors.bankCode}
            onChange={onChange} />
          <TextInput name="corrAccount"
            label="Corr Account"
            value={bank.corrAccount}
            errors={errors.corrAccount}
            onChange={onChange} />
          <TextInput name="city"
            label="City"
            value={bank.city}
            errors={errors.city}
            onChange={onChange} />
          <TextInput name="phone"
            label="Phone"
            value={bank.phone}
            errors={errors.phone}
            onChange={onChange} />
          <CheckboxInput
            onChange={onChange}
            value={bank.isGroup}
            label="Is Group"
            name="isGroup"
            IsReadonly={false}
          />

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
          onClick={onSave}>
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </CardActions>
    </Card>

  );
};

BankForm.propTypes = {
  bank: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default BankForm;
