import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type ErrorState = string;
const initialState: ErrorState = "Network Error";
const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<ErrorState>) => {
            return action.payload;
        }
    }
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;
