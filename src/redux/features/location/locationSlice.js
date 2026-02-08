import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    location:null
}

const locationSlice = createSlice({
    name:"location",
    initialState,
    reducers:{
        setLocation: (state,{payload})=> {
            state.location = payload
        },
        clearLocation: (state) => {
            state.location = null
        }
    }   
})

export const {setLocation,clearLocation} = locationSlice.actions
export default locationSlice.reducer