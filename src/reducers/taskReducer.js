import { cloneDeep } from 'lodash';
import { SortString } from 'src/utils/utils';
import * as TaskActions from 'src/actions/taskTypes';

const intialState = {
  list: [{
    "id": "e657e7d3-a94d-47ae-b0c0-1e184fe1e469",
    "task": "Added code to change table ui",
    "createdAt": "2020-11-13T14:37:40.654Z",
    "status": "Complete",
    "completedBy": "2020-11-13T14:37:40.654Z"
  }]
};

const KEYS = {
  tasks: 'tasks'
};

export default function (state = intialState, action) {
  switch (action.type) {
    case TaskActions.GET_ALL_TASK:
      if (localStorage.getItem(KEYS.tasks) == null) {
        localStorage.setItem(KEYS.tasks, JSON.stringify(intialState.list));
      }
      const tasks = JSON.parse(localStorage.getItem(KEYS.tasks));
      return {
        ...state,
        list: tasks.sort(SortString)
      };
    case TaskActions.ADD_TASK:
      const list = cloneDeep(state.list);
      list.push(action.payload);
      localStorage.setItem(KEYS.tasks, JSON.stringify(list));
      return {
        ...state,
        list: list.sort(SortString)
      };
    case TaskActions.UPDATE_TASK:
      const updatedList = cloneDeep(state.list);
      if (state.list) {
        state.list.map((task, index) => {
          if (task.id === action.payload.id) {
            updatedList[index] = action.payload;
          }
        });
      }
      localStorage.setItem(KEYS.tasks, JSON.stringify(updatedList));
      return {
        ...state,
        list: updatedList.sort(SortString)
      };
    case TaskActions.SEARCH_TASK:
      const searchList = cloneDeep(state.list)
      return {
        ...state,
        list: searchList.filter((x) => x.task.toLowerCase().includes(action.payload))
      }
    default:
      return state;
  }
}
