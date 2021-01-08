import React from 'react';
import './InfoBar.css';

function InfoBar() {
  // Return the InfoBar component.
  return (
    <div className="InfoBar">
      <pre>ApophysJs - Browser based Flame Fractals</pre>
      <div className="button-container">
        <button>Render</button>
        <button>Save</button>
        <button>Load</button>
        <button>Random</button>
        <button>Undo</button>
        <button>Redo</button>
      </div>
    </div>
  );
}

export default InfoBar;
