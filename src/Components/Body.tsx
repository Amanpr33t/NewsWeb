import React from "react"
import './Body.css'
import { useEffect, useState } from "react"
import Card from "./Card"
import { HideDropdownActions } from "../store/slices/Dropdown-hide-slice"
import { useDispatch } from "react-redux"

const Body:React.FC=()=>{
    const dispatch=useDispatch()
    const bodyClick=(event:React.MouseEvent)=>{
         dispatch(HideDropdownActions.setHideDropdown(true))
    }
    
    return(
        <>
        <div className="top"></div>
        <div className="body" onClick={bodyClick}>
            <Card/>
                 </div>         
        </>
    )
}
export default Body