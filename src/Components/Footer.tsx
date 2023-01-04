import React from "react"
import './Footer.css'
import {  useContext, useRef } from "react"
import NewsEnablerContext from "../context/newsEnabler-context"
import { useDispatch, useSelector } from "react-redux"
import { ActivePageActions } from "../store/slices/ActivePage-Slice"
import { PageNumberActions } from "../store/slices/PageNumber-slice"

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
    type ActivePageStateType={
        ActivePage:{
            activePage:number
        }
    }
    interface PageNumberStateType{
        PageNumber:{
            pageNumber:number
        }
    }

    const pageNumber=useSelector((state:PageNumberStateType)=>state.PageNumber.pageNumber)
    
   
    const inputRef=useRef<HTMLInputElement>(null)
    const dispatch=useDispatch()
    const {newsEnable}=useContext(NewsEnablerContext)
    const totalResults=useSelector((state:FooterStateType)=>state.NewsItems.totalResults)
    const activePageNumber=useSelector((state:ActivePageStateType)=>state.ActivePage.activePage)
    const numberOfPages:number=Math.ceil(+totalResults/9)
    

    const nextClick=(e:React.MouseEvent)=>{
        e.preventDefault()
        if(activePageNumber<numberOfPages){
            document.documentElement.scrollTop = 0; 
        }
        
        if(numberOfPages>activePageNumber){
            
            if(activePageNumber%3===0 ){
                dispatch(PageNumberActions.setPageNumber(pageNumber+3))
                if(numberOfPages-activePageNumber===1){
                    document.getElementById('button2')!.classList.add('button-display-none')
                    document.getElementById('button3')!.classList.add('button-display-none')
                } else if(numberOfPages-activePageNumber===2){
                    document.getElementById('button3')!.classList.add('button-display-none')
                } 
            }

            dispatch(ActivePageActions.setActivePage(activePageNumber+1))
            if(document.getElementById('button1')!.classList.contains('button-active')===true){
                document.getElementById('button1')!.classList.remove('button-active')
                document.getElementById('button2')!.classList.add('button-active')
            }else if(document.getElementById('button2')!.classList.contains('button-active')===true){
                document.getElementById('button2')!.classList.remove('button-active')
                document.getElementById('button3')!.classList.add('button-active')
            }else if(document.getElementById('button3')!.classList.contains('button-active')===true){
                document.getElementById('button3')!.classList.remove('button-active')
                document.getElementById('button1')!.classList.add('button-active')
            }
        }
       }
    
    
        const previousClick=(e:React.MouseEvent)=>{
        e.preventDefault()
        if(activePageNumber!==1){
            document.documentElement.scrollTop = 0; 
        }
         
        if(activePageNumber>1){
            dispatch(ActivePageActions.setActivePage(activePageNumber-1))
            if(document.getElementById('button1')!.classList.contains('button-active')===true ){
                dispatch(PageNumberActions.setPageNumber(pageNumber-3))
                document.getElementById('button1')!.classList.remove('button-active')
                document.getElementById('button2')!.classList.remove('button-active') 
                document.getElementById('button3')!.classList.add('button-active')
                document.getElementById('button1')!.classList.remove('button-display-none')
                document.getElementById('button2')!.classList.remove('button-display-none')
                document.getElementById('button3')!.classList.remove('button-display-none')
            } else if(document.getElementById('button2')!.classList.contains('button-active')===true){
                document.getElementById('button1')!.classList.add('button-active')
                document.getElementById('button2')!.classList.remove('button-active') 
            } else if(document.getElementById('button3')!.classList.contains('button-active')===true){
                document.getElementById('button2')!.classList.add('button-active')
                document.getElementById('button3')!.classList.remove('button-active')
         }
        }
        
 }

    const formSubmit=(e:React.FormEvent)=>{
    e.preventDefault()
    dispatch(ActivePageActions.setActivePage(+inputRef.current!.value))
    document.documentElement.scrollTop = 0;
 
    if(+inputRef.current!.value%3===0){
        dispatch(PageNumberActions.setPageNumber(+inputRef.current!.value-2))
        document.getElementById('button1')!.classList.remove('button-active')
        document.getElementById('button2')!.classList.remove('button-active') 
        document.getElementById('button3')!.classList.add('button-active')
        document.getElementById('button1')!.classList.remove('button-display-none')
        document.getElementById('button2')!.classList.remove('button-display-none')
        document.getElementById('button3')!.classList.remove('button-display-none')
        
    }else if((+inputRef.current!.value+1)%3===0){
        dispatch(PageNumberActions.setPageNumber(+inputRef.current!.value-1))
        document.getElementById('button1')!.classList.remove('button-active')
        document.getElementById('button2')!.classList.add('button-active') 
        document.getElementById('button3')!.classList.remove('button-active')
        document.getElementById('button1')!.classList.remove('button-display-none')
        document.getElementById('button2')!.classList.remove('button-display-none')
        if(numberOfPages===+inputRef.current!.value){
            document.getElementById('button3')!.classList.add('button-display-none')
        }else{
            document.getElementById('button3')!.classList.remove('button-display-none')
        }
    }else if((+inputRef.current!.value+2)%3===0){
        dispatch(PageNumberActions.setPageNumber(+inputRef.current!.value))
        document.getElementById('button1')!.classList.add('button-active')
        document.getElementById('button2')!.classList.remove('button-active') 
        document.getElementById('button3')!.classList.remove('button-active')
        document.getElementById('button1')!.classList.remove('button-display-none')
    
        if(numberOfPages===+inputRef.current!.value){
        document.getElementById('button2')!.classList.add('button-display-none')
        document.getElementById('button3')!.classList.add('button-display-none')
       }else if(numberOfPages-1===+inputRef.current!.value){
        document.getElementById('button3')!.classList.add('button-display-none')
        document.getElementById('button2')!.classList.remove('button-display-none')
       }else{
        document.getElementById('button2')!.classList.remove('button-display-none')
        document.getElementById('button3')!.classList.remove('button-display-none')
       }
    }
    inputRef.current!.value=''
    } 

    const button1=(e:React.MouseEvent)=>{
        e.preventDefault()
        if( !document.getElementById('button1')!.classList.contains('button-active')){
            document.documentElement.scrollTop = 0;
            dispatch(ActivePageActions.setActivePage(pageNumber))
            document.getElementById('button1')!.classList.add('button-active')
            document.getElementById('button2')!.classList.remove('button-active') 
            document.getElementById('button3')!.classList.remove('button-active')
        }
    }
    const button2=(e:React.MouseEvent)=>{
        e.preventDefault()
        if( !document.getElementById('button2')!.classList.contains('button-active')){
            document.documentElement.scrollTop = 0;
            dispatch(ActivePageActions.setActivePage(pageNumber+1))
            document.getElementById('button1')!.classList.remove('button-active')
            document.getElementById('button2')!.classList.add('button-active') 
            document.getElementById('button3')!.classList.remove('button-active')
        }
    } 
    const button3=(e:React.MouseEvent)=>{
        e.preventDefault()
        if( !document.getElementById('button3')!.classList.contains('button-active')){
            document.documentElement.scrollTop = 0;
            dispatch(ActivePageActions.setActivePage(pageNumber+2))
        document.getElementById('button1')!.classList.remove('button-active')
        document.getElementById('button2')!.classList.remove('button-active') 
        document.getElementById('button3')!.classList.add('button-active')
        
        }
    } 
    
   

    return(
        <>
        {newsEnable && 
        <>
        <div className="footer footer-1">
            
            {numberOfPages>1 && <button className="previous" onClick={previousClick}>Previous</button>}
             
            {numberOfPages>1 && <> 
            <button className="button-number button-active" id='button1' onClick={button1}>{pageNumber}</button>
             <button className="button-number " id='button2' onClick={button2}>{pageNumber+1}</button>
             </> }

             {numberOfPages>2 && <button className="button-number " id='button3' onClick={button3}>{pageNumber+2}</button>}

             {numberOfPages>1 && <button className="next" onClick={nextClick}>Next</button>}
              </div> 
              
            
           {numberOfPages>1 && <form className="page-form" onSubmit={formSubmit}>
                <label className="footer-label" htmlFor="page-number">Go to page</label>
                <input className="footer-input" type="number" name='page-number' id='page-number' min={1} max={numberOfPages} ref={inputRef}/>
            </form>} 
            </>
       }
            </>   
    
    )
}
export default Footer