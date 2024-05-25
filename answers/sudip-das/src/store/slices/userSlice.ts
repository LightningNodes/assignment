import { createSlice } from "@reduxjs/toolkit";

/**
 * The userSlice is a slice of the Redux store that contains the user's details.
 * @constant {object} initialState - to store the initial state of the user
 * @function setUser - to set the user details
 * @returns
 */

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