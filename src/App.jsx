import React from 'react';
import InfoBar from './InfoBar.js';
import EditPanel from './EditPanel.js';
import PreviewWindow from './PreviewWindow.js';
import './App.css';

function App() {
  // Return the App component.
  return (
    <div className="App">
      <InfoBar />
      <EditPanel />
      <PreviewWindow />
    </div>
  );
}

export default App;
