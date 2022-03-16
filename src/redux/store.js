import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './TasksSlice'
import appReducer from './AppSlice'

export default configureStore({
  reducer: {
    tasksState: taskReducer,
    appState: appReducer
  }
})