import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading : false,
  showAddTaskForm: false
}


export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    toggleAddTaskForm: (state) => {
      state.showAddTaskForm = !state.showAddTaskForm;
    },
  }
})


export const { setLoading, toggleAddTaskForm} = appSlice.actions
export default appSlice.reducer
