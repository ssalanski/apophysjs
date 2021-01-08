import React, { useRef, useState, useEffect } from 'react';
import './PreviewWindow.css';

function PreviewWindow() {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  useEffect( () => {
    if (canvasRef.current) {
      // shenanigans to prevent parent container resizing just barely larger than the new canvas size
      const containerWidth = canvasRef.current.parentElement.offsetWidth;
      const containerHeight = canvasRef.current.parentElement.offsetHeight;
      canvasRef.current.parentElement.style.width = containerWidth + 'px';
      canvasRef.current.parentElement.style.height = containerHeight + 'px';
      canvasRef.current.width = containerWidth;
      canvasRef.current.height = containerHeight;
      
      const renderCtx = canvasRef.current.getContext('2d');
      if (renderCtx) {
        setContext(renderCtx);
      }
    }

    // test shapes
    if(context) context.fillRect(5,5,100,100);
    if(context) context.fillRect(canvasRef.current.width-5,canvasRef.current.height-5,-100,-100);
  }, [context]);


  // Return the PreviewWindow component.
  return (
    <div className="PreviewWindow">
      <canvas id="previewCanvas" ref={canvasRef}></canvas>
    </div>
  );
}

export default PreviewWindow;
