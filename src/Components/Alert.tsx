import React from "react"
import './Alert.css'
import {  useSelector } from "react-redux"

const Alert:React.FC=()=>{
    interface StateType{
        Alert:{
            isAlert:boolean,
            type:''|'success'|'danger'|'warning'
            message:string
        }
    }
    const alertData=useSelector((state:StateType)=>state.Alert)
    const {isAlert,type,message}=alertData
    const alertMessage=message.charAt(0).toUpperCase() + message.slice(1)
    return(
        <>
        {isAlert && 
        <div className={`show-alert ${type}`}>
        <h3 className="alert-h3">{type}!</h3>
        <p className="alert-p">{alertMessage}</p>
    </div>}
         
        </>
    )
}
export default Alert