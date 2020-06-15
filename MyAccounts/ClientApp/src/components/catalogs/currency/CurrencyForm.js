import React from 'react';
import { PropTypes } from 'prop-types';
import TextInput from '../../common/TextInput';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth:800,
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

const CurrencyForm = ({ currency, onChange, onSave, onCancel, errors, saving }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <form>
          <h1>Manage currency</h1>
          <TextInput name="code"
            label="Code"
            value={currency.code}
            errors={errors.code}
            onChange={onChange} />
          <TextInput name="shortCode"
            label="ShortCode"
            value={currency.shortCode}
            errors={errors.shortCode}
            onChange={onChange} />
          <TextInput name="symbol"
            label="Symbol"
            value={currency.symbol}
            errors={errors.symbol}
            onChange={onChange}
          />
          <TextInput name="name"
            label="Name"
            value={currency.name}
            errors={errors.name}
            onChange={onChange}
          />
          
        </form>
      </CardContent>
      <CardActions>
        <Button
          type="button"
          varian="contained"
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

CurrencyForm.propTypes = {
  currency: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default CurrencyForm;