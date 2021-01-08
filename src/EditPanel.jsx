import React from 'react';
import './EditPanel.css';

function EditPanel() {
  // Return the EditPanel component.
  return (
    <div className="EditPanel">
      <h2>Transforms</h2>
      <button>New Transform</button>
      <ul>
        <li><span>t-form 1</span><span>123 45 55 14515 145 thingy asdfqwer</span></li>
        <li><span>t-form 2</span><span>123 45 55 14515 145 thingy asdfqwer</span></li>
        <li><span>t-form 3</span><span>123 45 55 14515 145 thingy asdfqwer</span></li>
        <li><span>t-form 4</span><span>123 45 55 14515 145 thingy asdfqwer</span></li>
        <li><span>t-form 5</span><span>123 45 55 14515 145 thingy asdfqwer</span></li>
      </ul>
    </div>
  );
}

export default EditPanel;
