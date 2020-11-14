import * as TaskActions from './taskTypes';

export const getAllTask = () => {
  return {
    type: TaskActions.GET_ALL_TASK
  }
};

export const addTask = (taskObj) => {
  return {
    type: TaskActions.ADD_TASK,
    payload: taskObj
  }
};

export const updateTask = (taskObj) => {
    return {
      type: TaskActions.UPDATE_TASK,
      payload: taskObj
    }
}

export const searchTask = (searchVal) => {
  return {
    type: TaskActions.SEARCH_TASK,
    payload: searchVal
  }
}