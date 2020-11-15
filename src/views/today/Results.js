import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import {
  Card,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  makeStyles,
  Toolbar,
  InputAdornment,
  Button,
  Checkbox
} from '@material-ui/core';
import {
  Add as AddIcon,
  Search as SearchIcon} from '@material-ui/icons';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Popup from 'src/components/popup/Popup';
import Controls from 'src/components/controls/Controls';
import Task from './forms/Task';
import { addTask, searchTask, getAllTask, updateTask } from 'src/actions/taskActions';
import useTable from 'src/components/useTable';

const headCells = [
  { id: 'checkbox', label: '' },
  { id: 'task', label: 'Task Name' },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', label: 'Created Date' },
  { id: 'completeAt', label: 'Complete Date' },
  { id: 'action', label: '' }
]

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: "auto"
  },
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  searchInput: {
    width: '65%'
  },
  newButton: {
    position: 'absolute',
    right: '10px'
  },
  editButton: {
    margin: theme.spacing(0.5)
  },
  table: {
    minWidth: 650
  }
}));

const Results = ({ className }) => {
  const { task: { list } } = useSelector(state => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    dispatch(getAllTask())
  }, [dispatch]);
  
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPaging
  } = useTable(list, headCells);

  const getTextColor = (status) => {
    return { color: status === 'Complete' ? '#85B215' : '#B23015' };
  };

  const handleRowClick = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const addOrEdit = (obj, resetForm) => {
    if ('id' in obj) {
      dispatch(updateTask({
        ...obj
      }));
    } else {
      dispatch(addTask({
        id: uuid(),
        ...obj
      }));
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  const handleSearch = (e) => {
    const { target } = e;
    if (target.value !== '') {
      dispatch(searchTask(target.value))
    } else {
      dispatch(getAllTask(target.value))
    }
  };


  const handleSelectOne = (event, obj) => {
    console.log(obj)
    setSelectedCustomerId(obj.id);
    dispatch(updateTask({
      ...obj,
      status: 'Complete'
    }));
  };

  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <Toolbar className={classes.pageContent}>
        <Controls.Input
          label="Enter task name"
          className={classes.searchInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>)
          }}
          onChange={handleSearch}
        />
        <Button
          color="primary"
          variant="contained"
          className={classes.newButton}
          onClick={() => {setRecordForEdit(null); setOpenPopup(true); }}
        >
          <AddIcon />
          Task
        </Button>
      </Toolbar>
      <PerfectScrollbar>
        <TblContainer className={classes.table} >
          <TblHead />
          <TableBody>
            { recordsAfterPaging().map((taskObj) => (
            <TableRow
              hover
              key={taskObj.id}
            >
              <TableCell padding="checkbox">
                {
                  taskObj.status === "Incomplete" &&
                  <Checkbox
                    checked={selectedCustomerId === taskObj.id}
                    onChange={(event) => handleSelectOne(event, taskObj)}
                    value="true"
                  />
                }
              </TableCell> 
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="body1"
                >
                  {taskObj.task}
                </Typography>
              </TableCell>
              <TableCell
                style={{ ...getTextColor(taskObj.status) }}
              >
                {taskObj.status}
              </TableCell>
              <TableCell>
                {moment(taskObj.createdAt).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell>
                {moment(taskObj.completedBy).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  className={classes.editButton}
                  onClick={() => handleRowClick(taskObj)}>
                    <EditOutlinedIcon fontSize="small" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </PerfectScrollbar>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Task Form"
      >
        <Task
          addOrEdit={addOrEdit}
          recordForEdit={recordForEdit}
        />
      </Popup>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string
};

export default Results;
