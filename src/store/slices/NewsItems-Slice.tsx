import { createSlice } from "@reduxjs/toolkit";


type StateType={
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
type ActionType={
    payload:StateType
}
const initialState:StateType={
    status:'ok',
    totalResults:0,
    articles:[{
        source:{
            id:'',
            name:''
        },
        url:'',
        urlToImage:'',
        description:'',
        author:'',
        publishedAt:'',
        content:'',
        title:''
}]
}


const NewsItemsSlice=createSlice({
    name:'NewsItems',
    initialState:initialState,
    reducers:{
       setNewsItems(state:StateType,action:ActionType){
          state.totalResults=action.payload.totalResults
          state.articles=action.payload.articles
       }
    }
})

export default NewsItemsSlice
export const NewsItemsActions=NewsItemsSlice.actions