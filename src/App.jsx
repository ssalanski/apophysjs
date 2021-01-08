import React from 'react';
import InfoBar from './InfoBar.js';
import './App.css';

function App() {
  // Return the App component.
  return (
    <div className="App">
	  <InfoBar />
	  <div className="EditPanel">edit panel...</div>
	  <div className="PreviewWindow">preview window...</div>
    </div>
  );
}

export default App;
