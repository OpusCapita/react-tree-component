'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fa = require('react-icons/fa');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./checkbox-icon.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxIcon = function CheckboxIcon(_ref) {
  var checked = _ref.checked,
      halfChecked = _ref.halfChecked,
      disabled = _ref.disabled;

  var Icon = null;
  var classStr = 'tree-checkbox';
  if (checked) {
    classStr += ' checked';
    Icon = _fa.FaCheck;
  }
  if (halfChecked) {
    classStr += ' half-checked';
    Icon = _fa.FaMinus;
  }

  if (disabled) classStr += ' disabled';

  return _react2.default.createElement(
    'div',
    { className: classStr },
    Icon ? _react2.default.createElement(Icon, null) : ''
  );
};

// App imports


CheckboxIcon.propTypes = {
  checked: _propTypes2.default.bool.isRequired,
  halfChecked: _propTypes2.default.bool.isRequired,
  disabled: _propTypes2.default.bool.isRequired
};
exports.default = CheckboxIcon;