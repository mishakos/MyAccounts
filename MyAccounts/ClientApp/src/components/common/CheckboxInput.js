import React from 'react';
import { PropTypes } from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const CheckboxInput = ({ value, name, label, onChange, IsReadonly }) => {
  return (
    <FormControlLabel control={
      <Checkbox
        disabled={IsReadonly}
        checked={value}
        onChange={onChange}
        name={name}
        color="primary"
      />
    }
      label={label}
    />
  );
}

CheckboxInput.propTypes = {
  value: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  isReadonly: PropTypes.bool,
  name: PropTypes.string
}

export default CheckboxInput;