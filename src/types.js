
/* Custom Types para los Reducers
-------------------------------------------- */
const types = {

    /* Authentication 
    ----------------------------------- */
    login:  '[auth] Login',
    logout: '[auth] Logout',

    /* Messaje de Error 
    ----------------------------------- */
    uiSetError: '[ui] Set Error',
    uiDelError: '[ui] Del Error',

    /* Loading 
    ----------------------------------- */
    uiStartLoading:  '[ui] Start Loading',
    uiFinishLoading: '[ui] Finish Loading',

    /* Notes 
    ----------------------------------- */
    notesAddNew:  '[notes] New Note',
    notesActive:  '[notes] Set Active Note',
    notesLoad:    '[notes] Load Note',
    notesUpdate:  '[notes] Update Note',
    notesUpload:  '[notes] Upload Image Url',
    notesDelete:  '[notes] Delete Note',
    notesCleaner: '[notes] Cleaner Logout'
}

export default types;
