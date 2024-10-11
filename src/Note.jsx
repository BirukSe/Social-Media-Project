import React from 'react';
import './Note.css';

function Note(props) {
    return (
        <div className="box">
            <div className="fplace"><h1>{props.title}</h1></div>
            <div className="splace"><h3>{props.text}</h3></div>
        </div>
    );
}

export default Note;
