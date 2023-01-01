import React from "react"
import './Alert.css'

const Alert:React.FC=()=>{
    
    return(
        <>
        <div className="hide-alert warning">
            <h3 className="alert-h3">Success!</h3>
            <p className="alert-p">you have successfully logged in</p>
        </div>
         
        </>
    )
}
export default Alert