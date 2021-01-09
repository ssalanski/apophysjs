import React, { useRef, useState, useEffect } from 'react';
import './PreviewWindow.css';

class PreviewWindow extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      context: null,
      canvasOffsets: [0, 0, 100, 100],
      viewState: false,
      viewport: {
        x0: -1,
        y0: -1,
        xw: 2,
        yh: 2
      }
    };
  }

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

      const canvasOffsets= [canvasRef.parentElement.offsetLeft,
                      canvasRef.parentElement.offsetTop,
                      containerWidth,
                      containerHeight];
      
      const context = canvasRef.getContext('2d');
      if (context) {
        this.props.flameGenerator.setView(this.state.viewport, canvasOffsets);
        this.setState( { context, canvasOffsets } );
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
  
  viewMouseDown = ({clientX, clientY}) => {
    this.setState({ viewState: { 'panning': [clientX,clientY,this.state.viewport.x0,this.state.viewport.y0] } });
  }

  viewMouseUp = () => {
    this.setState({ viewState: false });
    this.props.flameGenerator.setView(this.state.viewport,this.state.canvasOffsets);
    this.state.context.clearRect(0,0,this.state.canvasOffsets[2],this.state.canvasOffsets[3]);
    for (const pt of this.props.flameGenerator.genPts()) {
      this.state.context.fillRect(pt[0],pt[1],2,2);
    }
  }

  viewMouseMove = ({clientX,clientY}) => {
    if (!this.state.viewState)
      return;
    const [startX,startY,startMinX,startMinY] = this.state.viewState.panning;
    const [w, h] = this.state.canvasOffsets.slice(2);
    let {x0,y0,xw,yh} = this.state.viewport;
    const dx = (clientX - startX)/w * (xw);
    const dy = (clientY - startY)/h * (yh);
    x0 = startMinX - dx;
    y0 = startMinY - dy;
    this.setState({ viewport: { x0, y0, xw, yh} } );
  }

  render() {
    return (
      <div className="PreviewWindow">
        <canvas id="previewCanvas" 
          ref={this.canvasRef}
          onMouseDown={this.viewMouseDown}
          onMouseUp={this.viewMouseUp}
          onMouseMove={this.viewMouseMove}
          ></canvas>
      </div>
    );
  }
}

export default PreviewWindow;
