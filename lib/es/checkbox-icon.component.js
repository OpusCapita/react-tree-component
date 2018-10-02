import React from 'react';
import { FaCheck, FaMinus } from 'react-icons/fa';
import PropTypes from 'prop-types';

// App imports
import './checkbox-icon.scss';

var CheckboxIcon = function CheckboxIcon(_ref) {
  var checked = _ref.checked,
      halfChecked = _ref.halfChecked,
      disabled = _ref.disabled;

  var Icon = null;
  var classStr = 'tree-checkbox';
  if (checked) {
    classStr += ' checked';
    Icon = FaCheck;
  }
  if (halfChecked) {
    classStr += ' half-checked';
    Icon = FaMinus;
  }

  if (disabled) classStr += ' disabled';

  return React.createElement(
    'div',
    { className: classStr },
    Icon ? React.createElement(Icon, null) : ''
  );
};

CheckboxIcon.propTypes = {
  checked: PropTypes.bool.isRequired,
  halfChecked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired
};
export default CheckboxIcon;