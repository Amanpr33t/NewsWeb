import React from "react"
import './Navbar.css'

const Navbar:React.FC=()=>{
    
    return(
        <>
         <nav className="navbar">
            <a className="heading" href="#">NewsWeb</a>
            <a className="category " href="#">general</a>
            <a className="category " href="#">business</a>
            <a className="category " href="#">health</a>
            <a className="category " href="#">science</a>
            <a className="category "href="#">sports</a>
            <a className="category " href="#">technology</a>
            <a className="category " href="#">entertainment</a>
            
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
            
    <a className="logout " href="#">logout</a>
            
            {/*<div className="empty" ></div>
            <a className="signup" href="#">signUp</a>
<a className="login" href="#">login</a>*/}

            </nav>
            
        </>
    )
}
export default Navbar