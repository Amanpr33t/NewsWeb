import {  configureStore} from "@reduxjs/toolkit";
import NewsItemsSlice from "./slices/NewsItems-Slice";
import ActivePageSlice from "./slices/ActivePage-Slice";
import AlertSlice from "./slices/Alert-Slice";
import LoaderSlice from "./slices/Loader-Slice";
import PageNumberSlice from "./slices/PageNumber-slice";
const store= configureStore({
    reducer:{
     NewsItems:NewsItemsSlice.reducer,
     ActivePage:ActivePageSlice.reducer,
     Alert:AlertSlice.reducer,
     Loader:LoaderSlice.reducer,
     PageNumber:PageNumberSlice.reducer
    }
})

export default store