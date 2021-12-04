
import React from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useSimpleForm from '../../hooks/useSimpleForm';
import { startRegisterUser } from '../../actions/auth';
import { setError, delError } from '../../actions/ui';

const RegisterScreen = () => {

    // Obtener Informacion del Store
    const { msgError } = useSelector(state => state.ui);

    // Cambiar Informacion del Store
    const dispatch = useDispatch();

    const [ formState, handleInputChange ] = useSimpleForm({
        nombre: 'Pedro Jose Florez',
        email:  'pedro@test.com',
        password: '123456789',
        confirm: '123456789'
    });

    const { nombre, email, password, confirm } = formState;    

    const handleRegister = (e) => {

        e.preventDefault();    
        
        if ( isFormValid() ) {

            dispatch(
                startRegisterUser( nombre, email, password )
            );              
        }
    }
    
    const isFormValid = () => {

        if ( nombre.trim().length === 0 ) {

            dispatch(
                setError('🚀 El nombre es requerido.')
            );

            return false;
            
        }else if( !validator.isEmail(email) ) {

            dispatch(
                setError('🚀 El email no es válido.')
            );

            return false;

        }else if( password !== confirm || password.length <= 5 ) {

            dispatch(
                setError('🚀 El password no es válido.')
            );

            return false;
        }

        dispatch( delError() );
        return true;                
    }

    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            
            <h1 className="auth__title mb-5">🚀 Registrar</h1>

            <form onSubmit={ handleRegister }>

                {
                    msgError &&
                    <div className="auth__alert-error">
                        { msgError }
                    </div>
                }

                <input 
                    type="text"
                    className="auth__input"
                    name="nombre"
                    value={ nombre }
                    onChange={ handleInputChange }
                    placeholder="Nombre"
                    autoComplete="off"
                />

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

                <input 
                    type="password"
                    className="auth__input"
                    name="confirm"
                    value={ confirm }
                    onChange={ handleInputChange }
                    placeholder="Confirm"
                />

                <button 
                    type="submit"
                    className="btn btn-primary btn-block mb-5">
                    Registrarse
                </button>                                 

                <Link 
                    to="/auth/login"
                    className="link">
                    Ya estas registrado?
                </Link>
                
            </form>
        </div>
    );
}

export default RegisterScreen;