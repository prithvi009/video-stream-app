import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: false
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart:(state)=>{
            state.loading = true;
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.loading = false;
        },
        setLogout: (state) => {
            state.user = null;
            state.token= null;
            state.loading = false;
            state.error = false;
        },
        loginFailure: (state)=>{
            state.loading= false;
            state.error = true;
        }
        
    }
});


export const {setLogin, setLogout, loginFailure, loginStart} = authSlice.actions;
export default authSlice.reducer;

