import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = []

export const fetchStudentsAsync = createAsyncThunk("allStudents", async () => {
    try {
        const { data } = await axios.get("/api/students");
        console.log(data, "DATA LOG - STORE")
        return data; 
    } catch (error) {
     console.log(error)   
    }
})

const studentsSlice = createSlice({
    name: "students",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStudentsAsync.fulfilled, (state, action) => {
            console.log(action, "ACTION LOG")
            console.log(action.payload, "ACTION PAYLOAD LOG")
            return action.payload
        })
    }
})

export const selectStudents = (state) => {
    return state.students;
}

export default studentsSlice.reducer