
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import JournalEntries from './JournalEntries';
import ButtonEntryNew from './ButtonEntryNew';
import { startLogout } from '../../actions/auth';

const Sidebar = () => {

    const dispatch = useDispatch();

    const { name: userName } = useSelector( state => state.auth );    

    /* Logout Firebase
    -------------------------------------------------- */
    const handleLogout = () => {

        dispatch( startLogout() );
    }

    return (

        <aside className="journal__sidebar animate__animated animate__fadeIn animate__faster">

            <div className="journal__sidebar-navbar">

                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span> { userName } </span>
                </h3>

                <button className="btn" onClick={ handleLogout }>
                    Salir
                </button>

            </div>

            <ButtonEntryNew />

            <JournalEntries />
                        
        </aside>
    );
}

export default Sidebar;