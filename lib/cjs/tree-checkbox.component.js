'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxIcon = function CheckboxIcon(_ref) {
  var disabled = _ref.disabled;

  var classStr = 'tree-checkbox';
  if (disabled) classStr += ' disabled';
  return _react2.default.createElement('div', { className: classStr });
};

CheckboxIcon.propTypes = {
  disabled: _propTypes2.default.bool.isRequired
};
exports.default = CheckboxIcon;