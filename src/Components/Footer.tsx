import React from "react"
import './Footer.css'

const Footer:React.FC=()=>{
    
    return(
        <>
        <div className="footer footer-1">
            <button>Previous</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>Next</button>
        </div>
        <div className="footer footer-2">
            <form >
                <label htmlFor="page-number">Go to page</label>
                <input type="number" name='page-number' id='page-number'/>
            </form>
        </div>
         
        </>
    )
}
export default Footer