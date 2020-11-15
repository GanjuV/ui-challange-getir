import 'date-fns';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Grid
} from '@material-ui/core';
import Controls from 'src/components/controls/Controls';
import { useForm, Form } from 'src/components/useForm';

const initialFValues = {
  task: '',
  createdAt: new Date().toString(),
  status: 'Incomplete',
  completedBy: new Date().toString()
};

const Task = ({ addOrEdit, recordForEdit }) => {
  const [completed, setCompleted] = useState(false);
  
  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ('task' in fieldValues) {
      temp.task = fieldValues.task ? '' : 'This field is required.';
    }
    setErrors({
      ...temp
    });

    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === '');
    }
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) 
      addOrEdit(values, resetForm);
  };

  useEffect(() => {
    if (recordForEdit != null){
      setValues({
        ...recordForEdit
      });
      setCompleted(recordForEdit.status === "Complete")
    }
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          md={12}
          xs={12}
        >
          <Controls.Input
            disabled={completed}
            name="task"
            label="Task"
            value={values.task}
            onChange={handleInputChange}
            error={errors.task}
          />
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
        >
          <Controls.DatePicker
            disabled={completed}
            name="completedBy"
            label="Completion Date"
            value={values.completedBy}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          type="submit"
          color="primary"
          variant="contained"
        >
          {completed ? "Close": "Save details" }
        </Button>
      </Box>
    </Form>
  );
};

Task.propTypes = {
  addOrEdit: PropTypes.func,
  recordForEdit: PropTypes.object,
};

export default Task;
