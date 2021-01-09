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
    /*const x = clientX - offsetX;
    const y = clientY - offsetY;
    context.beginPath();
    context.arc(x,y,10,0,2*Math.PI);
    context.fill();
    */

    this.props.flameGenerator.drawPts(context);
  };

  componentDidMount() {
    if (this.canvasRef.current) {
      let canvasRef = this.canvasRef.current;
      // shenanigans to prevent parent container resizing just barely larger than the new canvas size
      const containerWidth = canvasRef.parentElement.offsetWidth;
      const containerHeight = canvasRef.parentElement.offsetHeight;
      canvasRef.parentElement.style.width = containerWidth + 'px';
      canvasRef.parentElement.style.height = containerHeight + 'px';
      canvasRef.width = containerWidth;
      canvasRef.height = containerHeight;

      const offsetX = canvasRef.parentElement.offsetLeft;
      const offsetY = canvasRef.parentElement.offsetTop;
      
      const context = canvasRef.getContext('2d');
      if (context) {
        this.setState( { context, offsetX, offsetY } );
        this.props.flameGenerator.setView(offsetX, offsetY, containerWidth, containerHeight);
        // test shapes
        if(context) {
          context.fillRect(5,5,100,100);
          context.fillRect(canvasRef.width-5,canvasRef.height-5,-100,-100);
          context.fillStyle = 'white';
          context.fillRect(5,canvasRef.height-5,100,-100);
          context.fillRect(canvasRef.width-5,5,-100,100);
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
