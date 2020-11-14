import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const Input = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    name, label, value, error = null, onChange, ...other
  } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};
export default Input;
