import React, { useRef, useState, useEffect } from 'react';
import './PreviewWindow.css';

class PreviewWindow extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      context: null,
      offsetX: 0,
      offsetY: 0
    };
  }

  testCanvas = ({clientX, clientY}) => {
    let { context, offsetX, offsetY } = this.state;
    const x = clientX - offsetX;
    const y = clientY - offsetY;
    context.beginPath();
    context.arc(x,y,10,0,2*Math.PI);
    context.fill();
  };

  componentDidMount() {
    if (this.canvasRef.current) {
      // shenanigans to prevent parent container resizing just barely larger than the new canvas size
      const containerWidth = this.canvasRef.current.parentElement.offsetWidth;
      const containerHeight = this.canvasRef.current.parentElement.offsetHeight;
      this.canvasRef.current.parentElement.style.width = containerWidth + 'px';
      this.canvasRef.current.parentElement.style.height = containerHeight + 'px';
      this.canvasRef.current.width = containerWidth;
      this.canvasRef.current.height = containerHeight;

      const offsetX = this.canvasRef.current.parentElement.offsetLeft;
      const offsetY = this.canvasRef.current.parentElement.offsetTop;
      
      const context = this.canvasRef.current.getContext('2d');
      if (context) {
        this.setState( { context, offsetX, offsetY } );
        // test shapes
        if(context) {
          context.fillRect(5,5,100,100);
          context.fillRect(this.canvasRef.current.width-5,this.canvasRef.current.height-5,-100,-100);
          context.fillStyle = 'white';
          context.fillRect(5,this.canvasRef.current.height-5,100,-100);
          context.fillRect(this.canvasRef.current.width-5,5,-100,100);
        }
      }
    }
  }

  render() {
    return (
      <div className="PreviewWindow">
        <canvas id="previewCanvas" ref={this.canvasRef} onClick={this.testCanvas}></canvas>
      </div>
    );
  }
}

export default PreviewWindow;
