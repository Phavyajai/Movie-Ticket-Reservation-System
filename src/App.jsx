import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';
import Main from './Main';

function App() {

const [showLogin, setShowLogin] = useState(true);

  const handleToggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="App">
      {showLogin ? (
        <Login onToggleForm={handleToggleForm} />
      ) : (
        <Register onToggleForm={handleToggleForm} />
      )}
    </div>
  );
}

export default App;