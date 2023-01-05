import React from "react"
import './Navbar.css'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useContext, useRef } from "react"
import { NewsItemsActions } from "../store/slices/NewsItems-Slice"
import NewsEnablerContext from "../context/newsEnabler-context"
import { AlertActions } from "../store/slices/Alert-Slice"
import { LoaderActions } from "../store/slices/Loader-Slice"
import { useHistory } from "react-router-dom"
import { PageNumberActions } from "../store/slices/PageNumber-slice"
import { ActivePageActions } from "../store/slices/ActivePage-Slice"
import { HideDropdownActions } from "../store/slices/Dropdown-hide-slice"

const Navbar:React.FC=()=>{

    const history=useHistory()
    const dispatch=useDispatch()
    let apiKey:string='43148670665846a080317d2648fb53f0'

    type ActivePageStateType={
        ActivePage:{
            activePage:number
        }
    }
    interface HideDropdownStateType{
        HideDropdown:{
            hideDropdown:boolean
        }
    }

    const [arrowCountry, setArrowCountry]= useState<string>('▼')
    const [arrowUser, setArrowUser]= useState<string>('▼')
    const [arrowCategory, setArrowCategory]= useState<string>('▼')
    const [country, setCountry]= useState<string>('in')
    const [category, setCategory]= useState<string>('general')
    const [searchValue, setSearchValue]=useState<string>('')
    const [searchEnable, setSearchEnable]= useState<boolean>(false)
    
    const searchRef=useRef<HTMLInputElement>(null)

    const {newsEnabler}=useContext(NewsEnablerContext)

    const activePageNumber=useSelector((state:ActivePageStateType)=>state.ActivePage.activePage)

    const bodyClick=useSelector((state:HideDropdownStateType)=>state.HideDropdown.hideDropdown)
    console.log(bodyClick)

    const searchFormSubmitHandler=(e:React.FormEvent)=>{
          e.preventDefault()
          if(searchRef.current!.value.trim()!==''){
             setSearchEnable(true)
             setCountry('')
             setCategory('')
            setSearchValue(searchRef.current!.value.trim())
            dispatch(PageNumberActions.setPageNumber(1))
            dispatch(ActivePageActions.setActivePage(1))
            newsEnabler(false)
                dispatch(LoaderActions.setLoader(true))
               // history.push('/')
                dispatch(AlertActions.setAlert({
                    isAlert:false,
                    type:'',
                    message:''
             }))
          }else{
            dispatch(AlertActions.setAlert({
                isAlert:true,
                type:'warning',
                message:'no text added in search box'
         }))
         setTimeout(() => {
            dispatch(AlertActions.setAlert({
                isAlert:false,
                type:'',
                message:''
         }))
         }, 10000);
          }
        }
    
    

    useEffect(()=>{
        let url:string
        if(searchEnable){
            url=`https://newsapi.org/v2/top-headlines?q=${searchValue}&pageSize=9&apiKey=${apiKey}&page=${activePageNumber}`
            setCountry('in')
        }else{
                url=`https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&pageSize=9&apiKey=${apiKey}&page=${activePageNumber}`
            }
        
        fetch(url)
        .then(response=>{
            return response.json()
        })
        .then((news)=>{
            if(news.status==='ok' && news.totalResults>0){
                
                dispatch(NewsItemsActions.setNewsItems(news))
                dispatch(LoaderActions.setLoader(false))
                newsEnabler(true)
                if(searchEnable){
                    history.push(`/`)
                    setTimeout(() => {
                        searchRef.current!.value=''
                    }, 400);
                }else{
                    history.push(`/${country}/${category}`)
                }
            }
            else if(news.status==='ok' && news.totalResults===0){
                dispatch(LoaderActions.setLoader(false))
                history.push('/')
                if(searchEnable){
                        dispatch(AlertActions.setAlert({
                            isAlert:true,
                            type:'warning',
                            message:`no search results for '${searchValue}'`
                        }))
                    setTimeout(() => {
                        dispatch(AlertActions.setAlert({
                            isAlert:false,
                            type:'',
                            message:``
                        }))
                    }, 10000);
                    
                    setTimeout(() => {
                        searchRef.current!.value=''
                    }, 400);
                }else{
                    history.push(`/`)
                    if(searchEnable){
                        setTimeout(() => {
                            searchRef.current!.value=''
                        }, 400);
                    }
                        dispatch(AlertActions.setAlert({
                            isAlert:true,
                            type:'warning',
                            message:'no news is available'
                     }))
                    setTimeout(() => {
                        dispatch(AlertActions.setAlert({
                            isAlert:false,
                            type:'',
                            message:``
                        }))
                    }, 10000);
                }
                
                 newsEnabler(false)
            }
            else if(news.status!=='ok' ){
                if(searchEnable){
                    setTimeout(() => {
                        searchRef.current!.value=''
                    }, 400);
                }
                    dispatch(AlertActions.setAlert({
                        isAlert:true,
                        type:'failure',
                        message:'some error occured'
                 }))
                setTimeout(() => {
                    dispatch(AlertActions.setAlert({
                        isAlert:false,
                        type:'',
                        message:``
                    }))
                }, 10000);
                dispatch(LoaderActions.setLoader(false))
                 
                 newsEnabler(false)
            }
        })
        },[country,category,dispatch,newsEnabler,apiKey,searchValue,activePageNumber,searchEnable,history])

        const supportFunction=(categoryName:string)=>{
            dispatch(PageNumberActions.setPageNumber(1))
            dispatch(ActivePageActions.setActivePage(1))
            newsEnabler(false)
                dispatch(LoaderActions.setLoader(true))
                setCategory(categoryName)
                setSearchEnable(false)
                setSearchValue('')
                searchRef.current!.value=''
                dispatch(AlertActions.setAlert({
                    isAlert:false,
                    type:'',
                    message:''
             }))
        }
        const china=(event:React.MouseEvent)=>{
            event.preventDefault()
            if(country!=='ch'){
                setCountry('ch')
                supportFunction('general')
            }
        }
        const japan=(event:React.MouseEvent)=>{
            event.preventDefault()
            if(country!=='jp'){
                setCountry('jp')
                supportFunction('general')
            }
        }
        const russia=(event:React.MouseEvent)=>{
            event.preventDefault()
            if(country!=='ru'){
                setCountry('ru')
                supportFunction('general')
            }
        }
        const usa=(event:React.MouseEvent)=>{
            event.preventDefault()
            if(country!=='us'){
                setCountry('us')
                supportFunction('general')
            }
        }
        const korea=(event:React.MouseEvent)=>{
            event.preventDefault()
            if(country!=='kr'){
                setCountry('kr')
                supportFunction('general')
            }
        }
        const canada=(event:React.MouseEvent)=>{
            event.preventDefault()
            if(country!=='ca'){
                setCountry('ca')
                supportFunction('general')
            }
        }
        const india=(event:React.MouseEvent)=>{
            event.preventDefault()
                    setCountry('in')
                    supportFunction('general')
                
        }
     
          const general=(event:React.MouseEvent)=>{
        event.preventDefault()
        dispatch(HideDropdownActions.setHideDropdown(true))
        if(category!=='general'){
            supportFunction('general')
      }   
}
      const health=(event:React.MouseEvent)=>{
        event.preventDefault()
        dispatch(HideDropdownActions.setHideDropdown(true))
        if(category!=='health'){
            supportFunction('health')
      }  
 }
      const business=(event:React.MouseEvent)=>{
    event.preventDefault()
    dispatch(HideDropdownActions.setHideDropdown(true))
    if(category!=='business'){
       supportFunction('business')
  }  
  }    
  const science=(event:React.MouseEvent)=>{
    event.preventDefault()
    dispatch(HideDropdownActions.setHideDropdown(true))
    if(category!=='science'){
               supportFunction('science')
  }  
  }   
  const technology=(event:React.MouseEvent)=>{
    event.preventDefault()
    dispatch(HideDropdownActions.setHideDropdown(true))
    if(category!=='technology'){
              supportFunction('technology')
  }  
}
  const sports=(event:React.MouseEvent)=>{
event.preventDefault()
dispatch(HideDropdownActions.setHideDropdown(true))
if(category!=='sports'){
    supportFunction('sports')
}  
}  
const entertainment=(event:React.MouseEvent)=>{
    event.preventDefault()
    dispatch(HideDropdownActions.setHideDropdown(true))
    if(category!=='entertainment'){
        supportFunction('entertainment')
  }  
    } 
    const homeClick=(event:React.MouseEvent)=>{
        event.preventDefault()
        dispatch(HideDropdownActions.setHideDropdown(true))
        if(category!=='general' || country!=='in'){
            supportFunction('general')
            setCountry('in')
      }  
} 

const hideDropdownClick=(event:React.MouseEvent)=>{
    dispatch(HideDropdownActions.setHideDropdown(true))
}
    
const dropdownCountry=(event:React.MouseEvent)=>{
    event.preventDefault()
    dispatch(AlertActions.setAlert({
        isAlert:false,
        type:'',
        message:``
    }))
    document.getElementById('dropdown-parent-user')!.classList.remove('dropdown-parent-color')
    document.getElementById('dropdown-parent-category')!.classList.remove('dropdown-parent-color')
    document.getElementById('dropdown-child-category')!.classList.add('hide-dropdown')
      document.getElementById('dropdown-child-user')!.classList.add('hide-dropdown')
      setArrowCategory('▼')
      setArrowUser('▼')
   if(arrowCountry==='▼'){
      setArrowCountry('▲')
      document.getElementById('dropdown-parent-country')!.classList.add('dropdown-parent-color')
      document.getElementById('dropdown-child-country')!.classList.remove('hide-dropdown') 
   } else{
    setArrowCountry('▼')
    document.getElementById('dropdown-parent-country')!.classList.remove('dropdown-parent-color')
    document.getElementById('dropdown-child-country')!.classList.add('hide-dropdown')  
   }
}
const dropdownUser=(event:React.MouseEvent)=>{
    event.preventDefault()
    dispatch(AlertActions.setAlert({
        isAlert:false,
        type:'',
        message:``
    }))
    setArrowCategory('▼')
      setArrowCountry('▼')
    document.getElementById('dropdown-child-category')!.classList.add('hide-dropdown')
      document.getElementById('dropdown-child-country')!.classList.add('hide-dropdown')
      document.getElementById('dropdown-parent-country')!.classList.remove('dropdown-parent-color')
    document.getElementById('dropdown-parent-category')!.classList.remove('dropdown-parent-color')
    if(arrowUser==='▼'){
       setArrowUser('▲')
       document.getElementById('dropdown-parent-user')!.classList.add('dropdown-parent-color')
       document.getElementById('dropdown-child-user')!.classList.remove('hide-dropdown') 
    } else{
     setArrowUser('▼')
     document.getElementById('dropdown-parent-user')!.classList.remove('dropdown-parent-color')
     document.getElementById('dropdown-child-user')!.classList.add('hide-dropdown')  
    }
 }
 const dropdownCategory=(event:React.MouseEvent)=>{
    event.preventDefault()
    dispatch(AlertActions.setAlert({
        isAlert:false,
        type:'',
        message:``
    }))
    setArrowCountry('▼')
      setArrowUser('▼')
    document.getElementById('dropdown-child-country')!.classList.add('hide-dropdown')
    document.getElementById('dropdown-child-user')!.classList.add('hide-dropdown')
    document.getElementById('dropdown-parent-country')!.classList.remove('dropdown-parent-color')
    document.getElementById('dropdown-parent-user')!.classList.remove('dropdown-parent-color')
    if(arrowCategory==='▼'){
       setArrowCategory('▲')
       document.getElementById('dropdown-parent-category')!.classList.add('dropdown-parent-color')
       document.getElementById('dropdown-child-category')!.classList.remove('hide-dropdown') 
    } else{
     setArrowCategory('▼')
     document.getElementById('dropdown-parent-category')!.classList.remove('dropdown-parent-color')
     document.getElementById('dropdown-child-category')!.classList.add('hide-dropdown')  
    }
 } 

 useEffect(()=>{
    if(bodyClick){
      document.getElementById('dropdown-child-category')!.classList.add('hide-dropdown')
      document.getElementById('dropdown-child-country')!.classList.add('hide-dropdown')
      document.getElementById('dropdown-child-user')!.classList.add('hide-dropdown')
      document.getElementById('dropdown-parent-country')!.classList.remove('dropdown-parent-color')
    document.getElementById('dropdown-parent-category')!.classList.remove('dropdown-parent-color')
    document.getElementById('dropdown-parent-user')!.classList.remove('dropdown-parent-color')
      dispatch(HideDropdownActions.setHideDropdown(false))
      setArrowCountry('▼')
      setArrowUser('▼')
      setArrowCategory('▼')
    }
 },[bodyClick,dispatch])
    
    return(
        <>
         <nav className="navbar">
            <Link className="heading" to="/general" onClick={homeClick}>NewsWeb</Link>
            <Link className="category " to="/general" onClick={general}>general</Link>
            <Link className="category " to="/business" onClick={business}>business</Link>
            <Link className="category " to="/health" onClick={health}>health</Link>
            <Link className="category " to="/science" onClick={science}>science</Link>
            <Link className="category " to="/sports" onClick={sports}>sports</Link>
            <Link className="category " to="/technology" onClick={technology}>technology</Link>
            <Link className="category " to="/entertainment" onClick={entertainment}>entertainment</Link>
             <div className="empty" onClick={hideDropdownClick}></div>
           
            
            <div className="right">

            <div className="dropdown-parent-category " onClick={dropdownCategory} id='dropdown-parent-category' >
               <p> Category</p>
               <p className="arrow">{arrowCategory}</p> 
               <div className="dropdown-child-category hide-dropdown" id='dropdown-child-category'>
               <div className="category-name" onClick={general}>General</div>
               <div className="category-name" onClick={business}>business</div>
               <div className="category-name" onClick={health}>health</div>
               <div className="category-name" onClick={science}>science</div>
               <div className="category-name" onClick={sports}>sports</div>
               <div className="category-name" onClick={technology}>technology</div>
               <div className="category-name" onClick={entertainment}>entertainment</div>
            </div>
                </div>

            <div className="dropdown-parent-country" onClick={dropdownCountry} id='dropdown-parent-country'>
               <p> Country </p>
               <p className="arrow">{arrowCountry}</p> 
               <div className="dropdown-child-country hide-dropdown" id='dropdown-child-country'>
               <div className="country-name" onClick={india}>India</div>
               <div className="country-name"  onClick={china}>China</div>
               <div className="country-name"  onClick={usa}>USA</div>
               <div className="country-name"  onClick={japan}>Japan</div>
               <div className="country-name"  onClick={russia}>Russia</div>
               
               <div className="country-name"  onClick={canada}>Canada</div>
               <div className="country-name"  onClick={korea}>Korea</div>
            </div>
                </div>
            
            
            <form className="search-form" onSubmit={searchFormSubmitHandler} onClick={hideDropdownClick}>
                <input className="input" type="text" name="search" id="search" placeholder="search..." autoComplete="on"  ref={searchRef} />
            </form>
            
    <div className="dropdown-parent-user" id='dropdown-parent-user' onClick={dropdownUser}>
        <p className="username">A</p>
        <p className="arrow">{arrowUser} </p>
        <div className="dropdown-child-user hide-dropdown" id='dropdown-child-user'>
                <div className="user-name" >Change Password</div>
                <div className="user-name">Logout</div>
            </div>
        </div>
    </div>
            
            
            {/*<div className="empty" ></div>
            <a className="signup" href="#">signUp</a>
<a className="login" href="#">login</a>*/}

            </nav>
            
        </>
    )
}
export default Navbar




