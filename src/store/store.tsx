import {  configureStore} from "@reduxjs/toolkit";
import NewsItemsSlice from "./slices/NewsItems-Slice";
import PageNumberSlice from "./slices/ActivePage-Slice";
const store= configureStore({
    reducer:{
     NewsItems:NewsItemsSlice.reducer,
     ActivePage:PageNumberSlice.reducer
    }
})

export default store