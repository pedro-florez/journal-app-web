
import types from '../types';

const initialState = {
    loading: false,
    msgError: null
}

const uiReducer = ( state = initialState, { type, payload } ) => {

    switch ( type ) {

        case types.uiSetError:
            return {
                ...state,
                msgError: payload
            };

        case types.uiDelError:
            return {
                ...state,
                msgError: null
            };

        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            };

        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
}

export default uiReducer;
