import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import settingManagementReducer from './settingManagement/slice';
import userManagementReducer from './userManagement/slice';
import commonApiManagementReducer from './common/slice';
import accessRequestrReducer from './accessRequest/slice';
import providerManagementReducer from './providerManagement/slice'


export const appReducer = combineReducers({
  authReducer,
  settingManagement: settingManagementReducer,
  userManagement: userManagementReducer,
  commonApiManagement: commonApiManagementReducer,
  accessRequestManagement: accessRequestrReducer,
  providerManagement:providerManagementReducer,
});

export const store = () => {
  return configureStore({
    reducer: appReducer,
  });
};

// Infer the type of makeStore SubscriptionSlice
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
