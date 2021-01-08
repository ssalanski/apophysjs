import React from 'react';
import './PreviewWindow.css';

function PreviewWindow() {
  // Return the PreviewWindow component.
  return (
    <div className="PreviewWindow">
      <canvas id="previewCanvas"></canvas>
    </div>
  );
}

export default PreviewWindow;
