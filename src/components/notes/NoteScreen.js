
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useSimpleForm from '../../hooks/useSimpleForm';
import NoteAppBar from './NoteAppBar';
import BtnDeleteNote from './BtnDeleteNote';
import { activeNote } from '../../actions/notes';

const NoteScreen = () => {

    const dispatch = useDispatch();

    // Info Note Activa
    const { active: note } = useSelector( state => state.notes );

    // Values Formalario
    const [ formState, handleInputChange, reset ] = useSimpleForm( note );    

    const { title, body } = formState;
   
    // Almacenar una Variable mutable ( useRef )
    const activeId = useRef( note.id );

    /*
    ** Validar Cuando la Nota Cambie Para 
    ** Resetear el useSimpleForm 
    */
    useEffect( () => {

        // Si el NewID es Diferente a el OldID
        if ( note.id !== activeId.current ) {
            reset( note ); 

            /*
            ** Actualizar la Variable ( activeId )
            ** Para Evitar un Ciclo infinito 
            */
            activeId.current = note.id;
        }
        
    }, [ note, reset]);
    
    /*
    ** Actualizar la Note Active Cuando
    ** Haya un Cambio en el Formulario
    */
    useEffect(() => {        
        
        dispatch(
            activeNote(
                formState.id,
                { ...formState }
            )
        );
        
    }, [ formState, dispatch ]);

    return (
        <div className="notes__main-content">
            
            <NoteAppBar fecha={ note.date } />

            <div className="notes__content">

                <input 
                    type="text"
                    className="notes__title-input"
                    name="title"
                    value={ title }
                    onChange={ handleInputChange }
                    placeholder="Titulo"
                    autoComplete="off"
                />

                <textarea
                    className="notes__textarea"
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                    placeholder="Descripción..." 
                ></textarea>

                {
                    note.url &&
                    <div className="notes__image">

                        <img 
                            src={ note.url }
                            alt={ title }
                        />                 

                    </div>
                }

                <BtnDeleteNote noteId={ note.id } />

            </div>

        </div>
    );
}

export default NoteScreen;