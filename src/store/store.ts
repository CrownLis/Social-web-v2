import { messagesReducer } from './ducks/messages/reducers';

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { authReducer } from './ducks/auth/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { dialogsReducer } from './ducks/dialogs/reducers';
import { postsReducer } from './ducks/posts/reducers';
import thunk from 'redux-thunk';
import { usersReducer } from './ducks/users/reducers';


export const rootReducer = combineReducers({
    auth: authReducer,
    dialogs:dialogsReducer,
    posts:postsReducer,
    messages:messagesReducer,
    users:usersReducer
});

export default function configureStore() {
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk)),
    );

    return store
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = AppStore['dispatch'];