import React,{useState} from 'react'
type NewsEnablerType={
    newsEnabler:(bool:boolean)=>void,
    newsEnable:boolean
}
 const NewsEnablerContext=React.createContext<NewsEnablerType>({
    newsEnabler:()=>{}, 
    newsEnable:false
})
export default NewsEnablerContext


export const NewsEnablerContextProvider=(props:{children:React.ReactNode})=>{
   const [newsEnable, setNewsEnable]=useState<boolean>(false)
  const newsEnabler=(bool:boolean)=>{
       setNewsEnable(bool)
  }
    
  return(
  <NewsEnablerContext.Provider value={{newsEnable,newsEnabler}}>
    {props.children}
  </NewsEnablerContext.Provider>
    )
}