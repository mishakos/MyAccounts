import React from 'react';
import { PropTypes } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
  },
}));


const TextInput = ({ name, label, onChange, value, errors }) => {
  const classes = useStyles();
  if (errors && errors.length > 0) {
    return (<FormControl className={classes.formControl} error>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        aria-describedby={label + "error-text"}
      />
      <FormHelperText id={label + "error-text"}>{errors}</FormHelperText>
    </FormControl>);
  } else {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Input
          name={name}
          value={value}
          onChange={onChange}
          aria-describedby={label}
        />
      </FormControl>)
  }
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;