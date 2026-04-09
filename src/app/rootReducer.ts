import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer from '../features/loading/loadingSlice';
import breadcrumbReducer from '../features/breadcrumb/breadcrumbSlice';

export const rootReducer = combineReducers({
  loading: loadingReducer,
  breadcrumb: breadcrumbReducer,
});