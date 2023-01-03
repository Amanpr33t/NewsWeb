import React from "react"
import './Body.css'
import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import NewsEnablerContext from "../context/newsEnabler-context"
const Card:React.FC=()=>{
   
    type NewsStateType={
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
    const newsItems = useSelector((state:NewsStateType)=>state.NewsItems)
    const {newsEnable}=useContext(NewsEnablerContext)

   
    return(
        <>
        {newsEnable===true  && newsItems.articles.map((newsItem)=>{
            return(
                <div className="card" key={Math.random()}>
                    
                 <div className="source-name">{newsItem.source.name}</div>
                <div >
                     <img className="source-image-box" alt="../loginFormImage.jpg" src={newsItem.urlToImage} />
                 </div>
                     <div >
                     
                         <p className="description" >{newsItem.title}</p>
                     </div>
                     <div className="author-flex">
                         <p className="author">Author:</p>
                         {newsItem.author==null && <p className="author-name">unknown</p>}
                        {newsItem.author!==null && newsItem.author.length>26 ? <p className="author-name">{newsItem.author.substring(0,25)}.....</p>:<p className="author-name">{newsItem.author}</p>}
                         </div>
                     <div className="publishedAt-flex">
                             <p className="publishedOn">Published on:</p>
                             <p className="publish-Date">{newsItem.publishedAt}</p>
                         </div>
                         <div className="news-link"><a className="news-url-link" href={newsItem.url} target="_blank" rel="noopener noreferrer">Read more</a></div>
                </div>
            )
        })}
                 
    
    </>
    )
}
export default Card