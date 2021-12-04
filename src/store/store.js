
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/authReducer';
import uiReducer from '../reducers/uiReducer';
import notesReducer from '../reducers/notesReducer';
/*
** El Store solo puede resivir un Reducer
** Para enviar varios Reducer esta la Funcion combineReducers
*/

// Activar Extension de ( Redux DevTools )
const composeEnhancers = (
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

// Agregar Varios ( Reducers )
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});

// Crear el ( Store )
const store = createStore(
    reducers,    
    composeEnhancers(
        // Activar Middleware
        applyMiddleware( thunk )
    )
);

export default store;
