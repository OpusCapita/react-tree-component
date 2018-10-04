import React from 'react';
import PropTypes from 'prop-types';

const CheckboxIcon = ({ disabled }) => {
  let classStr = 'tree-checkbox';
  if (disabled) classStr += ' disabled';
  return (<div className={classStr} />);
};

CheckboxIcon.propTypes = {
  disabled: PropTypes.bool.isRequired,
};
export default CheckboxIcon;
