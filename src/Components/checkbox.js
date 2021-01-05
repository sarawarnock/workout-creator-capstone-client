import React from "react";

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div className="row">
    <label className={isSelected ? 'selected-checkbox check' : 'check'}>
      <input
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input checkbox-input"
      />
      {label}
    </label>
  </div>
);

export default Checkbox;