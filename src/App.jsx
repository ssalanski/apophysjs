import React from 'react';
import InfoBar from './InfoBar.js';
import EditPanel from './EditPanel.js';
import PreviewWindow from './PreviewWindow.js';
import Transformation from './flame/transformations.js';
import FlameGenerator from './flame/algorithm.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    let transforms = new Array();
    transforms.push( new Transformation([.5,0],[0,.5],[1,0], [1,0,0], 3) );
    transforms.push( new Transformation([.5,0],[0,.5],[0,1], [1,0,0], 2) );
    transforms.push( new Transformation([.5,0],[0,.5],[0,0], [1,0,0], 1) );

    let flameGenerator = new FlameGenerator(transforms);

    this.state = { transforms, flameGenerator };
  }

  addTransform = () => {
    this.setState( (state, props) => {
      let transforms = [...state.transforms];
      // TODO: switch back to no-op transformation added by default, once xform edit capability added
      transforms.push( new Transformation([-.25,.25],[.25,-.25],[0,0], [1,1,1], 1) );
      const flameGenerator = new FlameGenerator(transforms);
      return { transforms, flameGenerator };
    });
  }

  render() {
    return (
      <div className="App">
        <InfoBar />
        <EditPanel transforms={this.state.transforms} addTransform={this.addTransform}/>
        <PreviewWindow flameGenerator={this.state.flameGenerator} />
      </div>
    );
  }
}

export default App;
