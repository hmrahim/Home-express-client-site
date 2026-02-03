import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    searchQuery:null
}

const searchSlice = createSlice({
    name:"search",
    initialState,
    reducers:{
        setSearch: (state,{payload})=> {
            state.searchQuery = payload

        },
        clearSearch: (state) => {
            state.searchQuery = null
        }
    }

})

export const {setSearch,clearSearch} = searchSlice.actions

export default  searchSlice.reducer