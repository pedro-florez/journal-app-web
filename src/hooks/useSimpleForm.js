
import { useState } from 'react';

/* Custom Hook useSimpleForm ( Estado del los Inputs del formularios )
------------------------------------------------------------------------ */
const useSimpleForm = ( initialState = {} ) => {
    
    const [ formState, setFormState ] = useState( initialState );
    
    const handleInputChange = ({ target }) => {       

        setFormState({
            ...formState,
            [ target.name ]: target.value
        });
    }
    
    const reset = ( newInitialState = initialState ) => {

        setFormState( newInitialState );
    }

    return [ formState, handleInputChange, reset ];
}

export default useSimpleForm;
