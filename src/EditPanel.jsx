import React from 'react';
import './EditPanel.css';
import Transformation from './Transformation.js';

class EditPanel extends React.Component {
  constructor(props) {
    super(props);
    let transforms = new Array();
    transforms.push( new Transformation([1,0],[0,1],[0,0],[1,0,0]) );
    this.state = { transforms };
  }

  addTransform = () => {
    this.setState( (state, props) => {
      let transforms = [...state.transforms];
      transforms.push( new Transformation([1,0],[0,1],[0,0], [1,0,0]) );
      return { transforms };
    });
  }

  renderTransformsList() {
    const transformEntries = this.state.transforms.map( (transform, idx) =>
          <TransformEntry key={idx.toString()} transform={transform} />
    );
    return (
      <ul style={{paddingLeft:"0px"}}>
        {transformEntries}
      </ul>
    );
  }

  render() {
    return (
      <div className="EditPanel">
        <h2>Transforms</h2>
        <button onClick={this.addTransform}>New Transform</button>
        {this.renderTransformsList()}
      </div>
    );
  }
}

class TransformEntry extends React.Component {
  render() {
    return (
      <li className="TransformEntry">
        <VariationQuickView variations={this.props.transform.variations} />
        <TriQuickView transform={this.props.transform} />
        <ColorQuickView color={this.props.transform.color} />
      </li>
    );
  }
}

function TriQuickView(props) {
  const xfrm = props.transform;
  const minx = Math.min(xfrm.xvec[0],xfrm.yvec[0],xfrm.ovec[0]);
  const miny = Math.min(xfrm.xvec[1],xfrm.yvec[1],xfrm.ovec[1]);
  const maxx = Math.max(xfrm.xvec[0],xfrm.yvec[0],xfrm.ovec[0]);
  const maxy = Math.max(xfrm.xvec[1],xfrm.yvec[1],xfrm.ovec[1]);
  const bounds = `${minx} ${miny} ${maxx} ${maxy}`
  const xPoint = xfrm.xvec[0] + ',' + xfrm.xvec[1];
  const yPoint = xfrm.yvec[0] + ',' + xfrm.yvec[1];
  const oPoint = xfrm.ovec[0] + ',' + xfrm.ovec[1];
  const points = `${xPoint} ${yPoint} ${oPoint}`;
  return <svg height="32" width="32" viewBox={bounds} style={{transform: "scale(1,-1)"}}><polygon points={points}/></svg>
}

function VariationQuickView(props) {
  return props.variations.map( ([variation, weight]) => <div>{variation.name + weight}</div> );
}

function ColorQuickView(props) {
  const color = `rgb(${props.color[0]*255},${props.color[1]*255},${props.color[2]*255})`;
  console.log(color);
  return <div style={{backgroundColor: color, width:"32px"}}>.</div>;
}


export default EditPanel;
