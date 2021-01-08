import React from 'react';
import './EditPanel.css';

class EditPanel extends React.Component {

  renderTransformsList() {
    const transforms = ['a','b','c','d'];
    return (
      <ul>
        {transforms.map( (transform, index) =>
          <li>transform {index}</li>
        )}
      </ul>
    );
  }

  render() {
    return (
      <div className="EditPanel">
        <h2>Transforms</h2>
        <button>New Transform</button>
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
