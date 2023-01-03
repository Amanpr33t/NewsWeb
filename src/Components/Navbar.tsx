import React from "react"
import './Navbar.css'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useContext, useRef } from "react"
import { NewsItemsActions } from "../store/slices/NewsItems-Slice"
import { ActivePageActions } from "../store/slices/ActivePage-Slice"
import NewsEnablerContext from "../context/newsEnabler-context"
import { AlertActions } from "../store/slices/Alert-Slice"
import LoaderSlice from "../store/slices/Loader-Slice"
import { LoaderActions } from "../store/slices/Loader-Slice"
import { useHistory } from "react-router-dom"
import { PageNumberActions } from "../store/slices/PageNumber-slice"

const Navbar:React.FC=()=>{

    const history=useHistory()
    let apiKey='679e483ed0304601bdcdef5fe0f0a1f7'

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
    interface LoaderStateType{
        Loader:{
            isLoader:boolean
        }
    }

    const [country, setCountry]= useState<string>('in')
    const [category, setCategory]= useState<string>('general')
    const [searchValue, setSearchValue]=useState<string>('')
    const searchRef=useRef<HTMLInputElement>(null)

    const dispatch=useDispatch()

    const {newsEnabler}=useContext(NewsEnablerContext)

    const isLoader=useSelector((state:LoaderStateType)=>state.Loader.isLoader)
    const activePageNumber=useSelector((state:ActivePageStateType)=>state.ActivePage.activePage)

    const formSubmitHandler=(e:React.FormEvent)=>{
          e.preventDefault()
          if(searchRef.current!.value.trim()!==''){
            setSearchValue(searchRef.current!.value.trim())
          }else{
            //alert
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
                dispatch(LoaderActions.setLoader(false))
                newsEnabler(true)
                dispatch(AlertActions.setAlert({
                    isAlert:false,
                    type:'',
                    message:''
             }))
                
            }
            else{
                dispatch(LoaderActions.setLoader(false))
                 dispatch(AlertActions.setAlert({
                    isAlert:true,
                    type:'warning',
                    message:'Some error occured'
             }))
                 newsEnabler(false)
            }
        })
        },[country,category,dispatch,newsEnabler,apiKey,searchValue,activePageNumber])

        const supportFunction=(categoryName:string)=>{
            dispatch(PageNumberActions.setPageNumber(1))
            newsEnabler(false)
                dispatch(LoaderActions.setLoader(true))
                setCategory(categoryName)
        }
          const general=(event:React.MouseEvent)=>{
        event.preventDefault()
        if(category!=='general'){
            history.push('/')
            supportFunction('general')
      }   
}
      const health=(event:React.MouseEvent)=>{
        event.preventDefault()
        if(category!=='health'){
            history.push('/health')
            supportFunction('health')
      }  
 }
      const business=(event:React.MouseEvent)=>{
    event.preventDefault()
    if(category!=='business'){
        history.push('/business')
       supportFunction('business')
  }  
  }    
  const science=(event:React.MouseEvent)=>{
    event.preventDefault()
    if(category!=='science'){
        history.push('/science')
               supportFunction('science')
  }  
  }   
  const technology=(event:React.MouseEvent)=>{
    event.preventDefault()
    if(category!=='technology'){
        history.push('/technology')
              supportFunction('technology')
  }  
}
  const sports=(event:React.MouseEvent)=>{
event.preventDefault()
if(category!=='sports'){
    history.push('/sports')
    supportFunction('sports')
}  
}  
const entertainment=(event:React.MouseEvent)=>{
    event.preventDefault()
    if(category!=='entertainment'){
        history.push('/entertainment')
        supportFunction('entertainment')
  }  
    }  
    
    return(
        <>
         <nav className="navbar">
            <Link className="heading" to="/general" onClick={general}>NewsWeb</Link>
            <Link className="category " to="/general" onClick={general}>general</Link>
            <Link className="category " to="/business" onClick={business}>business</Link>
            <Link className="category " to="/health" onClick={health}>health</Link>
            <Link className="category " to="/science" onClick={science}>science</Link>
            <Link className="category " to="/sports" onClick={sports}>sports</Link>
            <Link className="category " to="/technology" onClick={technology}>technology</Link>
            <Link className="category " to="/entertainment" onClick={entertainment}>entertainment</Link>
            
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




