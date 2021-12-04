
import React from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

import { startDeleteNote } from '../../actions/notes';

const BtnDeleteNote = ({ noteId }) => {

    const dispatch = useDispatch();

    const handleDelete = () => {

        Swal.fire({
            title: '¿Está seguro(a) de eliminar esta nota?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: '¡Sí, bórralo!',            
        }).then((result) => {

            if (result.isConfirmed) {

                dispatch(
                    startDeleteNote( noteId )
                );
            }
        }); 
    }

    return (
        <button 
            type="button"
            className="btn btn-danger"
            onClick={ handleDelete }>
            Eliminar
        </button>
    );
}

export default BtnDeleteNote;
