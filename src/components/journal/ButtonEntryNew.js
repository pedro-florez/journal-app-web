
import React from 'react';
import { useDispatch } from 'react-redux';
import { startNewNote } from '../../actions/notes';

const ButtonEntryNew = () => {

    const dispatch = useDispatch();

    /* Logout Firebase
    -------------------------------------------------- */
    const handleNewEntry = () => {

        dispatch( startNewNote() );
    }

    return (
        <div 
            className="journal__new-entry animate__animated animate__pulse"
            onClick={ handleNewEntry }
        >

            <i className="far fa-calendar-plus fa-5x"></i>

            <p className="mt-5">
                Nueva nota
            </p>
            
        </div>
    );
}

export default ButtonEntryNew;
