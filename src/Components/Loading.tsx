import React from "react"
import './Loading.css'
import { useEffect, useState, useContext } from "react"
import NewsEnablerContext from "../context/newsEnabler-context"

const Loading:React.FC=()=>{
    
    const {newsEnable}=useContext(NewsEnablerContext)

    return(
        <>{!newsEnable && <div className="show-loading">
        <section className="loading-gif">
            <img src="../loading.gif" alt="Loading......." />
        </section>
    </div>}
        
        </>
    )
}
export default Loading