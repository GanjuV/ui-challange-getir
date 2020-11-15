import React from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const DatePicker = (props) => {
  const {
    name, label, value, onChange, ...other
  } = props;

  // eslint-disable-next-line no-shadow
  const convertToDefEventPara = (name, value) => ({
    target: {
      name, value
    }
  });

  const disablePrevDates = (startDate) => {
    const startSeconds = Date.parse(new Date());
    return (date) => {
      return Date.parse(date) < startSeconds;
    }
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        label={label}
        format="MMM/dd/yyyy"
        name={name}
        value={value}
        shouldDisableDate={disablePrevDates()}
        onChange={(date) => onChange(convertToDefEventPara(name, date.toString()))}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};

DatePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default DatePicker;
