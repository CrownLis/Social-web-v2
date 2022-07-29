
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { activeUserReducer } from './ducks/activeUser/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export const rootReducer = combineReducers({
    auth: activeUserReducer,
});

export default function configureStore() {
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware()),
    );

    return store
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = AppStore['dispatch'];