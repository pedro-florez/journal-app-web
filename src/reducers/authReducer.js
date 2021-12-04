
import types from "../types";

const authReducer = ( state = {}, { type, payload } ) => {

    switch ( type ) {

        case types.login:
            return {
                uid:  payload.uid,
                name: payload.displayName
            };

        case types.logout:
            return {};
    
        default:
            return state;
    }    
}

export default authReducer;
