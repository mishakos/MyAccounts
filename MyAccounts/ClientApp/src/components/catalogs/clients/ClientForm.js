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

const ClientForm = ({ client, onChange, onSave, onCancel, errors, saving }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <form>
          <h1>Manage client</h1>
          <TextInput name="name"
            label="Name"
            value={client.name}
            errors={errors.name}
            onChange={onChange} />
          <TextInput name="address"
            label="Address"
            value={client.address}
            errors={errors.address}
            onChange={onChange} />
          <TextInput name="phone"
            label="Phone"
            value={client.phone}
            errors={errors.phone}
            onChange={onChange} />
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

ClientForm.propTypes = {
  client: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default ClientForm;