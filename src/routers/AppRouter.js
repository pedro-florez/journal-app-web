
import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Switch
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AuthRouter from './AuthRouter';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import JournalScreen from '../components/journal/JournalScreen';
import LoadingScreen from '../components/journal/LoadingScreen';
import { firebase } from '../firebase/firebaseConfig';
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';

const AppRouter = () => {
            
    const dispatch = useDispatch();

    const [ stateLoading, setStateLoading ] = useState( true );

    const [ isLogged, setIsLogged ] = useState( false );

    useEffect(() => {

        // Verificar si Esta Authentication en Firebase        
        firebase.auth().onAuthStateChanged( (user) => {

            if ( user?.uid ) {

                // Actualizar Reducer ( Store )
                dispatch(
                    login( user.uid, user.displayName )
                );                

                // Agregar Notes al Reducer ( Store )
                dispatch( 
                    startLoadingNotes( user.uid )
                );

                setIsLogged( true );

            }else {
                setIsLogged( false );
            }

            setStateLoading( false );
        });
        
    }, [ dispatch ]);

    // Loading de Esperar que el usuario se Logged
    if ( stateLoading ) {
        return ( <LoadingScreen /> );
    }
    
    return (
        <Router>
            <>
                <Switch>

                    <PublicRoute 
                        path="/auth" 
                        component={ AuthRouter } 
                        isLogged={ isLogged } 
                    />

                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={ JournalScreen } 
                        isLogged={ isLogged }
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </>
        </Router>
    )
}

export default AppRouter;
