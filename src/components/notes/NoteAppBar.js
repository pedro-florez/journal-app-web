
import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { startUpdateNote, startUploadFile } from '../../actions/notes';

const NoteAppBar = ({ fecha }) => {
    
    const notaDate = moment( fecha );

    const dispatch = useDispatch();    
    
    const { active:note } = useSelector( state => state.notes );

    /* Actualizar Note
    ------------------------------------------- */
    const handleUpdateNote = () => {

        dispatch(
            startUpdateNote( note )
        );
    }

    /* Mostrar Seleccion de Imagen ( Input: File )
    ------------------------------------------- */
    const handleSelectImg = () => {
        
        // Simular un CLick
        document.querySelector('#fileSelector').click();
    }

    /* Subir Imagen a Cloudinary 
    ------------------------------------------- */
    const handleUploadImg = (e) => {
        
        const file = e.target.files[0];
        
        if ( file ) {

            dispatch(
                startUploadFile( file )
            );

        }else {

            // Mensajes de Error
            Swal.fire('Error', 'No has seleccionado una imagen', 'error');
        }
    }

    return (
        <div className="notes__appbar">

            <span> { notaDate.format('DD [de] MMMM [de] YYYY') } </span>

            <input 
                id="fileSelector"
                type="file" 
                name="imagen"
                onChange={ handleUploadImg }
                style={{
                    display: 'none'
                }}
            />

            <div>

                <button 
                    className="btn"
                    onClick={ handleSelectImg }
                >
                    Subir imagen
                </button>

                <button 
                    className="btn"
                    onClick={ handleUpdateNote }
                >
                    Guardar
                </button>

            </div>

        </div>
    );
}

export default NoteAppBar;