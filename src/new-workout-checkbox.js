import React from "react";

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div className="App">
    <div className="row">
    <label className={isSelected ? 'selected-checkbox' : ''}>
      <input
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
      />
      {label}
    </label>
    </div>
  </div>
);

export default Checkbox;