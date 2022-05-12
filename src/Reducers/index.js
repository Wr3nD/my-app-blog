import { applyMiddleware, legacy_createStore as createStore } from "redux";

import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import admin from "./adminReducer";
// import cart from "./cart_reducer";
// import filter from "./filter_reducer";
import { combineReducers } from "redux";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: "root",
    storage,
};
const reducers = combineReducers({ admin });

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);

export default store;
export { persistor };
