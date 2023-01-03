import React from "react"
import './Loading.css'
import { useSelector } from "react-redux"

const Loading:React.FC=()=>{
    interface StateType{
        Loader:{
            isLoader:boolean
        }
    }
    const isLoader=useSelector((state:StateType)=>state.Loader.isLoader)

    return(
        <>{isLoader && <div className="show-loading">
        <section className="loading-gif">
            <img src="../loading.gif" alt="Loading......." />
        </section>
    </div>}
        
        </>
    )
}
export default Loading