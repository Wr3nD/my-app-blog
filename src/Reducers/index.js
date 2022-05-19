import { applyMiddleware, legacy_createStore as createStore } from "redux";

import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import bell from "./bellReducer";
import admin from "./adminReducer";
import { persistReducer } from "redux-persist";

import { combineReducers } from "redux";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: "root",
    storage,
};
const reducers = combineReducers({ admin, bell });

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);

export default store;
export { persistor };
