
import { db } from '../firebase/firebaseConfig';

/* Listado de Notes DB
--------------------------------------------------- */
export const loadNotes = async( uid ) => {

    // Query Listar todos las Notes
    const queryNotes = await db.collection(`${ uid }/journal/notes`).get();
    //console.log( queryNotes );

    const notes = [];

    queryNotes.forEach( noteDB => {

        // Obtener Arreglo ( docs ) de DB
        //console.log( noteDB.data() );

        // Agregar el ID al Arreglo ( notes )
        notes.push({        
            id: noteDB.id,
            ...noteDB.data()
        });

    });

    //console.log( notes );  

    return notes;
}
