import React from "react"
import './Body.css'
import { useEffect, useState } from "react"
import Card from "./Card"

const Body:React.FC=()=>{return(
        <>
        <div className="top"></div>
        <div className="body">
            <Card/>
                 </div>         
        </>
    )
}
export default Body