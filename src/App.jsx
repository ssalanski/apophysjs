import React from 'react';
import InfoBar from './InfoBar.js';
import EditPanel from './EditPanel.js';
import './App.css';

function App() {
  // Return the App component.
  return (
    <div className="App">
	  <InfoBar />
	  <EditPanel />
	  <div className="PreviewWindow">preview window...</div>
    </div>
  );
}

export default App;
