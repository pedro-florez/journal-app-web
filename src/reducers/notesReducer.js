
import types from '../types';

const initialState = {
    notes: [],
    active: null
}

const notesReducer = ( state = initialState, { type, payload } ) => {

    switch ( type ) {

        /* Agregar Nota al Store
        --------------------------------- */
        case types.notesAddNew:
            return {
                ...state,
                notes: [ payload, ...state.notes ]
            };

        /* Activar Nota
        --------------------------------- */
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...payload
                }
            };        
            
        /* Mostar Todas Notas
        --------------------------------- */
        case types.notesLoad:
            return {
                ...state,
                notes: [ ...payload ]
            }; 

        /* Actualizar Nota en el Arreglo de Notes
        ----------------------------------------- */
        case types.notesUpdate:
            return {
                ...state,
                notes: state.notes.map(
                    note => ( note.id === payload.id ) ? payload : note
                )              
            };

        /* Eliminar Nota de el Arreglo en el Store
        -------------------------------------------------- */
        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter( note => note.id !== payload )             
            };

        /* Vaciar Notas del Store al Cerrar Session
        -------------------------------------------------- */
        case types.notesCleaner:
            return initialState;
            
        default:
            return state;
    }
}

export default notesReducer;