import React, { useRef, useState, useEffect } from 'react';
import FlameGenerator from './flame/algorithm.js';
import './PreviewWindow.css';

class PreviewWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fractalData: [],
      canvasOffsets: [0,0,1,1], // will be updated when child renders
      viewportInteraction: null,
      viewport: {
        x0: -1,
        y0: -1,
        xw: 2,
        yh: 2
      },
      viewTransform: ([x,y]) => [x,y] // will be updated when child renders
    }
  }

  tick = () => {
    if(!this.state.viewportInteraction) {
      this.setState( (state,props) => {
        let fractalData = state.fractalData;
        for (const pt of this.props.flameGenerator.genPts(8,128)) {
          fractalData.push(pt);
        }
        return { fractalData };
      });
    }
    if (this.state.fractalData.length < 1<<12)
      requestAnimationFrame(this.tick);
  }

  componentDidMount() {
    requestAnimationFrame(this.tick);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.flameGenerator.transforms.length != this.props.flameGenerator.transforms.length) {
      this.setState( { fractalData: [] } );
      requestAnimationFrame(this.tick);
    }
  }
  
  viewMouseDown = ({clientX, clientY}) => {
    this.setState({
      viewportInteraction: {
        'panning': [clientX,clientY,this.state.viewport.x0,this.state.viewport.y0]
      }
    });
  }

  viewMouseUp = () => {
    this.setState({ viewportInteraction: null });
  }

  viewMouseMove = ({clientX,clientY}) => {
    if (!this.state.viewportInteraction)
      return;
    const [startX,startY,startMinX,startMinY] = this.state.viewportInteraction.panning;
    const [offsetX, offsetY, width, height] = this.state.canvasOffsets;
    let {x0,y0,xw,yh} = this.state.viewport;
    const dx = (clientX - startX)/width * (xw);
    const dy = (clientY - startY)/height * (yh);
    x0 = startMinX - dx;
    y0 = startMinY - dy;
    this.setState({
      viewport: { x0, y0, xw, yh},
      viewTransform: ([x,y]) => [ (x-x0)/xw*width - offsetX, (y-y0)/yh*height - offsetY ]
    });
    requestAnimationFrame(this.tick);
  }

  setCanvasOffsets = (canvasOffsets) => {
    const {x0,y0,xw,yh} = this.state.viewport;
    const [offsetX, offsetY, width,height] = canvasOffsets;
    const viewTransform = ([x,y]) => [ (x-x0)/xw*width - offsetX, (y-y0)/yh*height - offsetY ];
    this.setState( { canvasOffsets, viewTransform } );
  };

  render() {
    return (
      <div className="PreviewWindow"
           onMouseDown={this.viewMouseDown}
           onMouseUp={this.viewMouseUp}
           onMouseMove={this.viewMouseMove} >
        <FractalPainter
            data={this.state.fractalData}
            viewTransform={this.state.viewTransform}
            w={this.state.canvasOffsets[2]}
            h={this.state.canvasOffsets[3]}
            floatCanvasOffsetsUp={this.setCanvasOffsets}/>
      </div>
    );
  }
}

class FractalPainter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: null
    };
    this.canvasRef = React.createRef();
  }

  paint = () => {
    const { data, w, h, viewTransform } = this.props;
    const { context } = this.state;
    context.clearRect(0,0,w,h);
    context.fillStyle="#eee";
    for (let pt of data) {
      pt = viewTransform(pt);
      context.fillRect(pt[0],pt[1],1,1);
    }
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
      this.props.floatCanvasOffsetsUp(canvasOffsets);
      this.setState( { context } );
    }
  }

  componentDidUpdate() {
    this.paint();
  }

  render() {
    return (
      <canvas id="previewCanvas" ref={this.canvasRef} ></canvas>
    );
  }
}

export default PreviewWindow;
