
import React from 'react';
import moment from 'moment';
import 'moment/locale/es'; // Colocar en Español la Date
import { useDispatch, useSelector } from 'react-redux';
import { activeNote } from '../../actions/notes';

const JournalEntry = ({ id, title, body, url, date }) => {
       
    const notaDate = moment( date );
    //console.log( '🚀 Hace tanto tiempo', notaDate.fromNow() );

    const { active } = useSelector( state => state.notes );

    const dispatch = useDispatch();

    const handleActiveNote = () => {    

        dispatch(
            activeNote(
                id,
                { title, body, url, date }
            )
        );
    }

    return (
        <div             
            className={ 
                `journal__entry pointer animate__animated animate__backInLeft ${ id === active?.id && 'journal__entry-active' }` 
            }
            onClick={ handleActiveNote }
        >            
            {   
                url &&
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${ url })`
                    }}
                >
                </div>
            }

            <div className="journal__entry-body">

                <p className="journal__entry-title">
                    { title }
                </p>

                <p className="journal__entry-content">
                    { body }
                </p>

            </div>

            <div className="journal__entry-date">
                <span> { notaDate.format('dddd') } </span> 
                <h4> { notaDate.format('DD MMM') } </h4>               
            </div>
           
        </div>
    );
}

export default JournalEntry;