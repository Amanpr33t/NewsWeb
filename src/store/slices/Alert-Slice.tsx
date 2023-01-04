import { createSlice } from "@reduxjs/toolkit";

interface stateType{
    isAlert:boolean,
    type:''|'success'|'failure'|'warning'
    message:string
}
const initialState:stateType={
   isAlert:false,
   type:'',
    message:''
}
interface actionType{
        payload:{
            isAlert:boolean,
            type:''|'success'|'failure'|'warning'
            message:string
        }
}

const AlertSlice=createSlice({ 
    name:'Alert',
    initialState:initialState,
    reducers:{
       setAlert(state:stateType,action:actionType){
           state.isAlert=action.payload.isAlert
           state.type=action.payload.type
           state.message=action.payload.message
       }
    }
})

export default AlertSlice
export const AlertActions=AlertSlice.actions