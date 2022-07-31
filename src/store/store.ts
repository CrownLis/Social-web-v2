
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { authReducer } from './ducks/activeUser/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { dialogsReducer } from './ducks/dialogs/reducers';
import { postsReducer } from './ducks/posts/reducers';

export const rootReducer = combineReducers({
    auth: authReducer,
    dialogs:dialogsReducer,
    posts:postsReducer
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