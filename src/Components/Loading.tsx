import React from "react"
import './Loading.css'

const Loading:React.FC=()=>{
    
    return(
        <>
        <div className="loading">
            <section className="loading-gif">
                <img src="../loading.gif" alt="Loading......." />
            </section>
        </div>
         
        </>
    )
}
export default Loading