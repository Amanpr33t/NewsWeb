import React from "react"
import './Footer.css'
import { useEffect, useState, useContext } from "react"
import NewsEnablerContext from "../context/newsEnabler-context"
import { useDispatch, useSelector } from "react-redux"

const Footer:React.FC=()=>{
    type FooterStateType={
        NewsItems:{
            status:'ok',
    totalResults:Number,
    articles:[{
        source:{
            id:string,
            name:string
        },
        url:string,
        urlToImage:string,
        description:string,
        author:string,
        publishedAt:string,
        content:string,
        title:string
}]
        }
    }
    const {newsEnable}=useContext(NewsEnablerContext)
    const [pageNumber,setPageNumber]=useState<number>(2)
    const numberOfArticles=useSelector((state:FooterStateType)=>state.NewsItems.totalResults)
    const numberOfPages:number=Math.ceil(+numberOfArticles/9)

    const nextClick3=(e:React.MouseEvent)=>{
        e.preventDefault()
        setPageNumber((pageNumber)=>pageNumber+1)
           }
    const previousClick3=(e:React.MouseEvent)=>{
        e.preventDefault()
        if(pageNumber!==2){
            setPageNumber((pageNumber)=>pageNumber-1)
        }
        
 }

    return(
        <>
        {newsEnable && numberOfPages===2 && 
        <>
        <div className="footer footer-1">
             <button className="previous">Previous</button>
             <button className="button-number">1</button>
             <button className="button-number">2</button>
        <button className="next">Next</button>
              </div>  
            <form className="page-form">
                <label className="footer-label" htmlFor="page-number">Go to page</label>
                <input className="footer-input" type="number" name='page-number' id='page-number'/>
            </form>
            </>
        }
        {newsEnable && numberOfPages===3 && 
        <>
        <div className="footer footer-1">
             <button className="previous">Previous</button>
             <button className="button-number">1</button>
             <button className="button-number">2</button>
             <button className="button-number">3</button>
             <button className="next">Next</button>
              </div>  
            <form className="page-form">
                <label className="footer-label" htmlFor="page-number">Go to page</label>
                <input className="footer-input" type="number" name='page-number' id='page-number'/>
            </form>
            </>
        }
        {newsEnable && numberOfPages>3 && 
        <>
        <div className="footer footer-1">
            
            <button className="previous" onClick={previousClick3}>Previous</button>
             
             <button className="button-number">{pageNumber-1}</button>
             <button className="button-number">{pageNumber}</button>
             <button className="button-number">{pageNumber+1}</button>
             <button className="next" onClick={nextClick3}>Next</button>
              </div>  
            <form className="page-form">
                <label className="footer-label" htmlFor="page-number">Go to page</label>
                <input className="footer-input" type="number" name='page-number' id='page-number'/>
            </form>
            </>
        }


        </>
       
        
          
        
    
    )
}
export default Footer