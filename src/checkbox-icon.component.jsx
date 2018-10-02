import React from 'react';
import { FaCheck, FaMinus } from 'react-icons/fa';
import PropTypes from 'prop-types';

// App imports
import './checkbox-icon.scss';

const CheckboxIcon = ({ checked, halfChecked, disabled }) => {
  let Icon = null;
  let classStr = 'tree-checkbox';
  if (checked) {
    classStr += ' checked';
    Icon = FaCheck;
  }
  if (halfChecked) {
    classStr += ' half-checked';
    Icon = FaMinus;
  }

  if (disabled) classStr += ' disabled';

  return (
    <div className={classStr}>
      {Icon ? <Icon /> : ''}
    </div>
  );
};

CheckboxIcon.propTypes = {
  checked: PropTypes.bool.isRequired,
  halfChecked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};
export default CheckboxIcon;
