import { createSlice } from "@reduxjs/toolkit";


const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        tasks: [],
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
     
        },
        deleteTask: (state, action) => {
            state.tasks.splice(action.payload, 1);
        },
        editTask: (state, action) => {
            const {taskId, updatedTask} = action.payload;
            state.tasks[taskId] = updatedTask;
        },
    },
});

export const { addTask, deleteTask, editTask } = todoSlice.actions;
export default todoSlice.reducer;