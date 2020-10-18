import React from 'react';

import { CgCheck } from 'react-icons/cg';

import '../styles/components/checkbox.css';

interface Checkbox {
  label: string;
  value: boolean;
  onChange(value: boolean): void;
}

const Checkbox: React.FC<Checkbox> = ({ label, value, onChange }) => {
  return (
    <button
      id="checkbox"
      type="button"
      onClick={() => onChange(!value)}
    >
      <div className={`checkmark ${value && "active"}`}>
        <CgCheck
          size={24}
          color="#FFFFFF"
          style={{ display: value ? "flex" : "none" }}
        />
      </div>
      <span>{label}</span>
    </button>
  );
}

export default Checkbox;
