import React from 'react';
import './EditPanel.css';

class EditPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { transforms: new Array() };
  }

  addTransform = () => {
    this.setState( (state, props) => {
      let transforms = [...state.transforms];
      transforms.push("" + state.transforms.length);
      return { transforms };
    });
  }

  renderTransformsList() {
    return (
      <ul>
        {this.state.transforms.map( (transform, index) =>
          <li>transform {index}</li>
        )}
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
      <li>
        <span>t-form #</span>
        <span>bla bla bla</span>
      </li>
    );
  }
}

export default EditPanel;
