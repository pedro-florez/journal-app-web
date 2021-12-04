
import types from '../types';

/* Modificar el Error
-------------------------------------------------- */
export const setError = ( err ) => ({
    type: types.uiSetError,
    payload: err
});

/* Eliminar el Error ( Null )
-------------------------------------------------- */
export const delError = () => ({
    type: types.uiDelError
});

/* Agregar Loading
-------------------------------------------------- */
export const startLoading = () => ({
    type: types.uiStartLoading
});

/* Quitar Loading
-------------------------------------------------- */
export const finishLoading = () => ({
    type: types.uiFinishLoading
});
