import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './Home.jsx';
import Login from './Login.jsx';
import Registration from './Registration.jsx';
import Card from './Card.jsx'; // Import the Card component
import Note from './Note.jsx'; // Import the Note component

function App() {
  const [array, setArray] = useState([]);
  
  function addNote(note) {
    setArray(prevValue => {
      return [...prevValue, note];
    });
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route 
          path="/card" 
          element={
            <>
              <Card send={addNote} />
              <div>
                {array.map((item, index) => (
                  <Note key={index} title={item.title} text={item.text} />
                ))}
              </div>
            </>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
