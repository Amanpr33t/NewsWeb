import {  configureStore} from "@reduxjs/toolkit";
import NewsItemsSlice from "./slices/NewsItems-Slice";
const store= configureStore({
    reducer:{
     NewsItems:NewsItemsSlice.reducer
    }
})

export default store