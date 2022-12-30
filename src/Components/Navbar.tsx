import React from "react"
import './Navbar.css'

const Navbar:React.FC=()=>{
    
    return(
        <>
         <div className="navbar">
           
            <div className="heading">NewsWeb</div>
            <div className="category ">general</div>
            <div className="category ">business</div>
            <div className="category ">health</div>
            <div className="category ">science</div>
            <div className="category ">sports</div>
            <div className="category ">technology</div>
            <div className="category ">entertainment</div>
            
            <div className="empty"></div>
            
            <form className="category-dropdown">
                <select className="news-category" name="news-category" id="news-category">
                    <option value="general" selected >general</option>
                    <option value="business" >business</option>
                    <option value="health" >health</option>
                    <option value="science" >science</option>
                    <option value="sports" >sports</option>
                    <option value="technology" >technology</option>
                    <option value="entertainment" >entertainment</option>
                </select>
            </form>
            
            <form className="country-dropdown">
                <select className="country" name="country" id="country">
                    <option value="India" >Indonesia</option>
                    <option value="China" selected>China</option>
                    <option value="USA">USA</option>
                </select>
            </form>
            
            <form className="search-form">
                <input className="input" type="text" name="search" id="search" placeholder="search..." autoComplete="on"  />
            </form>
            
            <div className="logout ">logout</div>

            </div>
            
        </>
    )
}
export default Navbar