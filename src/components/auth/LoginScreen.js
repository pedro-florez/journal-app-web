
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginGoogle from './LoginGoogle';
import useSimpleForm from '../../hooks/useSimpleForm';
import { startFireBaseLogin } from '../../actions/auth';

const LoginScreen = () => {

    const dispatch = useDispatch();

    const { loading } = useSelector( state => state.ui ); 

    const [ formState, handleInputChange ] = useSimpleForm({    
        email: 'pedro@test.com',
        password: '123456789'
    });

    const { email, password } = formState;  
    
    /* Login con Firebase
    -------------------------------------------------- */
    const handlelogin = (e) => {

        e.preventDefault();

        dispatch( 
            startFireBaseLogin( email, password )
        );
    }    

    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            <h1 className="auth__title mb-5">🚀 Login</h1>

            <form onSubmit={ handlelogin }>

                <input 
                    type="text"
                    className="auth__input"
                    name="email"
                    value={ email }
                    onChange={ handleInputChange }
                    placeholder="Email"
                    autoComplete="off"
                />

                <input 
                    type="password"
                    className="auth__input"
                    name="password"
                    value={ password }
                    onChange={ handleInputChange }
                    placeholder="Password"
                />

                <button 
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ loading }>
                    
                    { loading ? 'Validando...' : 'Ingresar' }
                </button>

                <LoginGoogle />

            </form>
        </div>
    );
}

export default LoginScreen;