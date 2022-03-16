import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
  tasks: [
    {
      "id": 1,
      "text": "Doctor Appoint",
      "day": "Feb 5th at 2:30pm",
      "reminder": true
    },
    {
      "text": "Hello",
      "day": "Sunday",
      "reminder": true,
      "id": 4
    },
    {
      "text": "Hi",
      "day": "Friday",
      "reminder": false,
      "id": 5
    },
  ]
}

const url = 'http://localhost:5000/tasks';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  extraReducers: (builder) => {
    builder.
      addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.tasks = action.payload
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload)
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const id = action.payload
        state.tasks = state.tasks.filter((task) => task.id !== id)
      })
      .addCase(toggleReminder.fulfilled, (state, action) => {
        const id = action.payload
        for (const task of state.tasks) {
          if (task.id === id) {
            task.reminder = !task.reminder
            break
          }
        }
      })
  }

})


export const fetchAllTasks = createAsyncThunk('tasks/fetchAllTasks', async () => {
  const res = await fetch(`${url}`)
  return await res.json()
})

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const newTask = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })
  return await newTask.json()
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {

  await fetch(`${url}/${id}`, { method: 'DELETE' })
  return id
})

export const toggleReminder = createAsyncThunk('tasks/toggleReminder', async (id) => {

    const res = await fetch(`${url}/${id}`)
    const data = await res.json()
    const updatedTask = { ...data, reminder: !data.reminder };

    await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
    return id  
})


export default tasksSlice.reducer