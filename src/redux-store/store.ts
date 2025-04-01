import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ui from "./ui";

export const store = configureStore({
    reducer: combineReducers({
        ui: ui
    })
});

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
