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
exports.default = CheckboxIcon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jaGVja2JveC1pY29uLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiQ2hlY2tib3hJY29uIiwiY2hlY2tlZCIsImhhbGZDaGVja2VkIiwiZGlzYWJsZWQiLCJJY29uIiwiY2xhc3NTdHIiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBR0E7Ozs7QUFFQSxJQUFNQSxlQUFlLFNBQWZBLFlBQWUsT0FBd0M7QUFBQSxNQUFyQ0MsT0FBcUMsUUFBckNBLE9BQXFDO0FBQUEsTUFBNUJDLFdBQTRCLFFBQTVCQSxXQUE0QjtBQUFBLE1BQWZDLFFBQWUsUUFBZkEsUUFBZTs7QUFDM0QsTUFBSUMsT0FBTyxJQUFYO0FBQ0EsTUFBSUMsV0FBVyxlQUFmO0FBQ0EsTUFBSUosT0FBSixFQUFhO0FBQ1hJLGdCQUFZLFVBQVo7QUFDQUQ7QUFDRDtBQUNELE1BQUlGLFdBQUosRUFBaUI7QUFDZkcsZ0JBQVksZUFBWjtBQUNBRDtBQUNEOztBQUVELE1BQUlELFFBQUosRUFBY0UsWUFBWSxXQUFaOztBQUVkLFNBQ0U7QUFBQTtBQUFBLE1BQUssV0FBV0EsUUFBaEI7QUFDR0QsV0FBTyw4QkFBQyxJQUFELE9BQVAsR0FBa0I7QUFEckIsR0FERjtBQUtELENBbkJEOztBQUhBO2tCQTZCZUosWSIsImZpbGUiOiJjaGVja2JveC1pY29uLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBGYUNoZWNrLCBGYU1pbnVzIH0gZnJvbSAncmVhY3QtaWNvbnMvZmEnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuLy8gQXBwIGltcG9ydHNcbmltcG9ydCAnLi9jaGVja2JveC1pY29uLnNjc3MnO1xuXG5jb25zdCBDaGVja2JveEljb24gPSAoeyBjaGVja2VkLCBoYWxmQ2hlY2tlZCwgZGlzYWJsZWQgfSkgPT4ge1xuICBsZXQgSWNvbiA9IG51bGw7XG4gIGxldCBjbGFzc1N0ciA9ICd0cmVlLWNoZWNrYm94JztcbiAgaWYgKGNoZWNrZWQpIHtcbiAgICBjbGFzc1N0ciArPSAnIGNoZWNrZWQnO1xuICAgIEljb24gPSBGYUNoZWNrO1xuICB9XG4gIGlmIChoYWxmQ2hlY2tlZCkge1xuICAgIGNsYXNzU3RyICs9ICcgaGFsZi1jaGVja2VkJztcbiAgICBJY29uID0gRmFNaW51cztcbiAgfVxuXG4gIGlmIChkaXNhYmxlZCkgY2xhc3NTdHIgKz0gJyBkaXNhYmxlZCc7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NTdHJ9PlxuICAgICAge0ljb24gPyA8SWNvbiAvPiA6ICcnfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuQ2hlY2tib3hJY29uLnByb3BUeXBlcyA9IHtcbiAgY2hlY2tlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgaGFsZkNoZWNrZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcbmV4cG9ydCBkZWZhdWx0IENoZWNrYm94SWNvbjtcbiJdfQ==