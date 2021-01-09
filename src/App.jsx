import React from 'react';
import InfoBar from './InfoBar.js';
import EditPanel from './EditPanel.js';
import PreviewWindow from './PreviewWindow.js';
import Transformation from './Transformation.js';
import './App.css';

class App extends React.Component {
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

  render() {
    return (
      <div className="App">
        <InfoBar />
        <EditPanel transforms={this.state.transforms} addTransform={this.addTransform}/>
        <PreviewWindow />
      </div>
    );
  }
}

export default App;
