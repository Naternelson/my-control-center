import { combineReducers } from "redux"
import { viewsSlice } from "./views/slice";

export default combineReducers({
    views: viewsSlice.reducer
})