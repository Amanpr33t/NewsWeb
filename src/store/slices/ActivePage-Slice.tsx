import { createSlice } from "@reduxjs/toolkit";

const initialState:{
    activePage:number
}={
   activePage:1
}

const ActivePageSlice=createSlice({
  
    name:'ActivePage',
    initialState:initialState,
    reducers:{
       setActivePage(state:{activePage:number},action:{payload:number}){
           state.activePage=action.payload
       }
    }
})

export default ActivePageSlice
export const ActivePageActions=ActivePageSlice.actions