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
  createdAt: new Date(),
  status: 'Incomplete',
  completedBy: new Date()
};

const status = [
  { id: 'Incomplete', title: 'Incomplete' },
  { id: 'Complete', title: 'Complete' }
];

const Task = ({ addOrEdit, recordForEdit }) => {
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
  const [completed, setCompleted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setCompleted(false);
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null) {
      setValues({
        ...recordForEdit
      });
      setCompleted(true);
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
            name="completedBy"
            label="Completion Date"
            value={values.completedBy}
            onChange={handleInputChange}
          />
        </Grid>
        { completed
          && (
          <Grid
            item
            md={12}
            xs={12}
          >
            <Controls.RadioGroup
              name="status"
              label="Status"
              value={values.status}
              onChange={handleInputChange}
              items={status}
            />
          </Grid>
          )}
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
          Save details
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
