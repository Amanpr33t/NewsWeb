import React from "react"
import './Footer.css'

const Footer:React.FC=()=>{
    
    return(
        <>
         <div className="footer footer-1">
            <button className="previous">Previous</button>
            <button className="button-number">11</button>
            <button className="button-number">2</button>
            <button className="button-number">3</button>
            <button className="next">Next</button>
       </div>
           <form className="page-form">
                <label className="footer-label" htmlFor="page-number">Go to page</label>
                <input className="footer-input" type="number" name='page-number' id='page-number'/>
    </form>
    
    </>
    )
}
export default Footer