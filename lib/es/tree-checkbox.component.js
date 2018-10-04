import React from 'react';
import PropTypes from 'prop-types';

var CheckboxIcon = function CheckboxIcon(_ref) {
  var disabled = _ref.disabled;

  var classStr = 'tree-checkbox';
  if (disabled) classStr += ' disabled';
  return React.createElement('div', { className: classStr });
};

CheckboxIcon.propTypes = {
  disabled: PropTypes.bool.isRequired
};
export default CheckboxIcon;