import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    _id: "",
};
export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {

            return {
                ...state,
                ...action.payload,
            }
        },
    },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;