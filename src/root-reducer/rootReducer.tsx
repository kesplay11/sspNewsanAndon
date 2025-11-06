// import { calendarReducer } from './calendarReducer';
// import { uiReducer } from "./uiReducer";
import { combineReducers } from "@reduxjs/toolkit";
import { DatosSlice } from "../StockPlacas/Reducers/DatosSlice";

// import { authenticationSlice } from "./AuthenticationSlice";

export const rootReducer = combineReducers({
  datosSlice: DatosSlice.reducer
})
