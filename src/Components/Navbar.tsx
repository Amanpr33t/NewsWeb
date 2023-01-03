import React from "react"
import './Navbar.css'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useContext, useRef } from "react"
import { NewsItemsActions } from "../store/slices/NewsItems-Slice"
import { ActivePageActions } from "../store/slices/ActivePage-Slice"
import NewsEnablerContext from "../context/newsEnabler-context"

const Navbar:React.FC=()=>{
    let apiKey='d3f073e870e54878b8925d1a77216c96'

    type NewsItemType={
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
            publishedAt:string
            content:string,
            title:string
    }]
    }
    type ActivePageStateType={
        ActivePage:{
            activePage:number
        }
    }
    const [country, setCountry]= useState<string>('in')
    const [category, setCategory]= useState<string>('general')
    const [searchValue, setSearchValue]=useState<string>('')
    const searchRef=useRef<HTMLInputElement>(null)
    const dispatch=useDispatch()
    console.log(searchValue)

    const {newsEnable,newsEnabler}=useContext(NewsEnablerContext)

    const activePageNumber=useSelector((state:ActivePageStateType)=>state.ActivePage.activePage)

    const formSubmitHandler=(e:React.FormEvent)=>{
          e.preventDefault()
          if(searchRef.current!.value.trim()!==''){
            setSearchValue(searchRef.current!.value.trim())
          }else{
           //add alert
          }
        }


    useEffect(()=>{
        let url:string
        if(searchValue!==''){
            url=`https://newsapi.org/v2/top-headlines?country=in&q=${searchValue}&apiKey=${apiKey}&page=${activePageNumber}`
        }else{
            url=`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=9&apiKey=${apiKey}&page=${activePageNumber}`
        }
        fetch(url)
        .then(response=>{
            return response.json()
        })
        .then(news=>{
            if(news.status==='ok'){
                dispatch(NewsItemsActions.setNewsItems(news))
                newsEnabler(true)
            }else{
               setTimeout(() => {
                 console.log('error')
               }, 20000);
            }
        })
        },[country,category,dispatch,newsEnabler,apiKey,searchValue,activePageNumber])
    
    return(
        <>
         <nav className="navbar">
            <Link className="heading" to="/" onClick={()=>setCategory('general')}>NewsWeb</Link>
            <Link className="category " to="/" onClick={()=>setCategory('general')}>general</Link>
            <Link className="category " to="/business" onClick={()=>setCategory('business')}>business</Link>
            <Link className="category " to="health" onClick={()=>setCategory('health')}>health</Link>
            <Link className="category " to="/science" onClick={()=>setCategory('science')}>science</Link>
            <Link className="category " to="sports" onClick={()=>setCategory('sports')}>sports</Link>
            <Link className="category " to="/technology" onClick={()=>setCategory('technology')}>technology</Link>
            <Link className="category " to="/entertainment" onClick={()=>setCategory('entertainment')}>entertainment</Link>
            
            <div className="empty"></div>
            
            <form className="category-dropdown">
                <select className="news-category" name="news-category" id="news-category">
                    <option value="general"  >general</option>
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
                    <option value="India" onClick={()=>setCountry('in')}>India</option>
                    <option value="China" onClick={()=>setCountry('ch')}>China</option>
                    <option value="USA" onClick={()=>setCountry('us')}>USA</option>
                </select>
            </form>
            
            <form className="search-form" onSubmit={formSubmitHandler}>
                <input className="input" type="text" name="search" id="search" placeholder="search..." autoComplete="on"  ref={searchRef} />
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
























