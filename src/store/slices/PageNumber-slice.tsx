import { createSlice } from "@reduxjs/toolkit";


const initialState:{
    pageNumber:number
}={
   pageNumber:1
}


const PageNumberSlice=createSlice({ 
    name:'PageNumber',
    initialState:initialState,
    reducers:{
       setPageNumber(state:{pageNumber:number},action:{payload:number}){
           state.pageNumber=action.payload
       }
    }
})

export default PageNumberSlice
export const PageNumberActions=PageNumberSlice.actions