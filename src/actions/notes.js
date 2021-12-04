
import Swal from 'sweetalert2';

import types from '../types';
import { db } from '../firebase/firebaseConfig';
import { loadNotes } from '../helpers/loadNotes';
import { fileUpload } from '../helpers/fileUpload';

/* Crear Nota en Firebase
-------------------------------------------------- */
export const startNewNote = () => {

    return async( dispatch, getState ) => {

        // Obtener el uid del User Authentication
        const { uid } = getState().auth;

        // Crear Schema 
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        // Crear Colleccion en DB
        const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );

        // Agregar Nueva Note al Store
        dispatch(
            addNewNote( doc.id, newNote )
        );

        // Activar Nueva Note
        dispatch(
            activeNote( doc.id, newNote )
        );        
    }
}

/* Agregar Nota al Store
-------------------------------------------------- */
export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }    
});

/* Activar Nota
-------------------------------------------------- */
export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }    
});

/* Obtener Todas las Notes DB
-------------------------------------------------- */
export const startLoadingNotes = ( uid ) => {

    return async( dispatch ) => {

        // Obtener Listado de Notas
        const notes = await loadNotes( uid );
        
        dispatch(
            getNotes( notes )
        );        
    }   
};

/* Mostrar Todas las Notes
-------------------------------------------------- */
export const getNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

/* Actualizar Note en Firebase
-------------------------------------------------- */
export const startUpdateNote = ( note, img = false ) => {

    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        // Eliminar la Propiedad Url si esta Vacia
        if ( !note.url ) {
            delete note.url
        }

        // Eliminar el ID del Objeto ( note )
        const newNote = { ...note };
        delete newNote.id

        // Actualizar en Firebase
        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( newNote );

        // Actualizar la Note en el Arreglo de Notes
        dispatch(
            refreshNota( note )
        );

        // Mensajes de Exito
        Swal.fire(
            'Buen Trabajo', 
            ( img ? 'La imagen se subio con exito.' : note.title ), 
            'success'
        );
    }
}

/* Realizar Cambio en el Menu Latelar
-------------------------------------------------- */
export const refreshNota = ( note ) => ({
    type: types.notesUpdate,
    payload: { ...note }
});

/* Subir Imagen a Cloudinary
-------------------------------------------------- */
export const startUploadFile = ( file ) => {

    return async( dispatch, getState ) => {

        const { active: activeNote } = getState().notes;

        // Loading de Subiendo Imagen
        Swal.fire({
            title: 'Subiendo...',
            text: 'Espere por favor...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        // Realizar Peticion a Cloudinary        
        const fileUrl = await fileUpload( file );

        // Actualizar Url
        activeNote.url = fileUrl;

        // Actualizar Nota con Url(Img) en Firebase
        dispatch(
            startUpdateNote( activeNote, true )
        );

        // Cerrar el Swal
        Swal.close();
    }
}

/* Eliminar Nota en Firebase
-------------------------------------------------- */
export const startDeleteNote = ( notaId ) => {

    return async( dispatch, getState ) => {

        // Loading de Subiendo Imagen
        Swal.fire({
            title: 'Eliminando...',
            text: 'Espere por favor...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });
        
        const { uid } = getState().auth;               

        // Query Delete
        await db.doc(`${ uid }/journal/notes/${ notaId }`).delete();

        // Actualizar el Store
        dispatch(
            deleteNote( notaId )
        );

        // Cerrar el Swal
        Swal.close();

        // Swal de Exito
        Swal.fire(
            'Buen Trabajo',
            'Su nota ha sido eliminada.',
            'success'
        );
    }
}

/* Eliminar Nota de el Arreglo en el Store
-------------------------------------------------- */
export const deleteNote = ( notaId ) => ({
    type: types.notesDelete,
    payload: notaId
});

/* Vaciar Notas del Store al Cerrar Session
-------------------------------------------------- */
export const cleanerNotes = () => ({
    type: types.notesCleaner
});
