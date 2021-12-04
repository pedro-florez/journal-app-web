
import Swal from 'sweetalert2';

import types from '../types';
import { finishLoading, startLoading } from './ui';
import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { cleanerNotes } from './notes';

/* Authetication con Firebase ( Action Asincrona )
-------------------------------------------------- */
export const startFireBaseLogin = ( email, password ) => {

    // El dispatch lo envia ( Thunk ) automaticamente
    return ( dispatch ) => {
        
        dispatch( startLoading() );

        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user: { uid, displayName } }) => {                

                // Actualizar el Store
                dispatch(                    
                    login( uid, displayName )
                );

                dispatch( finishLoading() );
            })
            .catch( e => {

                dispatch( finishLoading() );

                // Mensajes de Error
                Swal.fire('Error', e.message, 'error');

                //console.log( e );
            });        
    }
}

/* Authetication con Google ( Action Asincrona )
-------------------------------------------------- */
export const startGoogleLogin = () => {
    
    return ( dispatch ) => {
        
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user: { uid, displayName } }) => {

                // Actualizar el Store
                dispatch(                    
                    login( uid, displayName )
                );
            })
            .catch( e => {

                // Mensajes de Error
                Swal.fire('Error', e.message, 'error');
            });
    }
}

/* Register con Firebase ( Action Asincrona )
-------------------------------------------------- */
export const startRegisterUser = ( nombre, email, password ) => {
    
    return ( dispatch ) => {

        /*
        ** createUserWithEmailAndPassword() solo deja
        ** Enviar el Email y el Password
        */
        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({ user }) => {

                // Actualizar el Nombre del User en Firebase
                await user.updateProfile({ displayName: nombre }); 
                
                // Actualizar el Store                
                dispatch(                    
                    login( user.uid, user.displayName )
                );
            })
            .catch( e => {
                // Mensajes de Error
                Swal.fire('Error', e.message, 'error');
            });
    }
}

/* Login ( Action Sincrona )
-------------------------------------------------- */
export const login = ( uid, displayName ) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

/* Logout ( Action Asincrona )
-------------------------------------------------- */
export const startLogout = () => {
    
    return async( dispatch ) => {
        
        await firebase.auth().signOut();

        // Actualizar el Reducer Auth
        dispatch( logout() );

        // Actualizar el Reducer Notes
        dispatch( cleanerNotes() );
    }
}

/* Logout ( Action Sincrona )
-------------------------------------------------- */
export const logout = () => ({
    type: types.logout
});
