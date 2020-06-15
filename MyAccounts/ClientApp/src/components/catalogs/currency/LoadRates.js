import React from 'react';
import { PropTypes } from 'prop-types';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const LoadRates = ({ fromDate, toDate, onChangeFromDate, onChangeToDate, onSubmit }) => {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container style={{ height: "80px", width: "600px" }}>
        <div style={{ margin: "5px" }}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="fromDateLoad"
            label="Load rates from"
            value={fromDate}
            onChange={onChangeFromDate}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }} />
        </div>
        <div style={{ margin: "5px" }}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="toDateLoad"
            label="Load rates to"
            value={toDate}
            onChange={onChangeToDate}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }} />
        </div>
        <div style={{ margin: "5px" }}>
          <Button color="primary" className={classes.button} onClick={onSubmit}>
            Upload
          </Button>
        </div>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

LoadRates.propTypes = {
  fromDate: PropTypes.object,
  toDate: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default LoadRates;