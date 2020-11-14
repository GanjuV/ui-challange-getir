import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import * as taskService from 'src/services/TaskService';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Toolbar,
  InputAdornment,
  Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Search } from 'react-feather';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Popup from 'src/components/popup/Popup';
import Controls from 'src/components/controls/Controls';
import Task from './forms/Task';
import { addTask, searchTask, getAllTask, updateTask } from 'src/actions/taskActions';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      fontSize: '15px',
      color: 'white',
      backgroundColor: theme.palette.primary.light,
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  searchInput: {
    width: '75%'
  },
  newButton: {
    position: 'absolute',
    right: '10px'
  }
}));

const Results = ({ className }) => {
  const selector = useSelector(state => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);

  useEffect(() => {
    dispatch(getAllTask())
  }, [dispatch]);
  
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const getTextColor = (status) => {
    return { color: status === 'Complete' ? '#85B215' : '#B23015' };
  };

  const handleRowClick = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const addOrEdit = (obj, resetForm) => {
    if ('id' in obj) {
      taskService.update(obj);
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
                <Search />
              </InputAdornment>)
          }}
          onChange={handleSearch}
        />
        <Button
          color="primary"
          variant="contained"
          className={classes.newButton}
          onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
        >
          <AddIcon />
          Add task
        </Button>
      </Toolbar>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" />
                <TableCell>
                  Task
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Created Date
                </TableCell>
                <TableCell>
                  Complete Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selector.task.list.slice(0, limit).map((taskObj) => (
                <TableRow
                  hover
                  key={taskObj.id}
                  onClick={() => handleRowClick(taskObj)}
                >
                  <TableCell padding="checkbox" />
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={selector.task.list.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
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
