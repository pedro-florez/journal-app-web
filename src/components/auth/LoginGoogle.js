
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { startGoogleLogin } from '../../actions/auth';

const LoginGoogle = () => {

    const dispatch = useDispatch();

    /* Login con Google
    -------------------------------------------------- */
    const handleGooglelogin = () => {

        dispatch( startGoogleLogin() );
    }

    return (
        <div className="auth__social-networks">

            <p>Login with social networks</p>

            <div 
                className="google-btn"
                onClick={ handleGooglelogin }
            >

                <div className="google-icon-wrapper">

                    <img 
                        className="google-icon" 
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                        alt="google button" 
                    />

                </div>

                <p className="btn-text">
                    <b>Sign in with google</b>
                </p>

            </div>

            <Link 
                to="/auth/register"
                className="link mt-1">
                Crear Cuenta
            </Link>

        </div>
    );
}

export default LoginGoogle;
