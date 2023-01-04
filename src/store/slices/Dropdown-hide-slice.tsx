import { createSlice } from "@reduxjs/toolkit";


const initialState:{
    hideDropdown:boolean
}={
   hideDropdown:false
}


const HideDropdownSlice=createSlice({ 
    name:'HideDropdown',
    initialState:initialState,
    reducers:{
       setHideDropdown(state:{hideDropdown:boolean},action:{payload:boolean}){
           state.hideDropdown=action.payload
       }
    }
})

export default HideDropdownSlice
export const HideDropdownActions=HideDropdownSlice.actions