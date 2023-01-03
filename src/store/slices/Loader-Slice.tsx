import { createSlice } from "@reduxjs/toolkit";


const initialState:{
    isLoader:boolean
}={
   isLoader:true
}


const LoaderSlice=createSlice({ 
    name:'Loader',
    initialState:initialState,
    reducers:{
       setLoader(state:{isLoader:boolean},action:{payload:boolean}){
           state.isLoader=action.payload
       }
    }
})

export default LoaderSlice
export const LoaderActions=LoaderSlice.actions