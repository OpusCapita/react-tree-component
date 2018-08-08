'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp2;
// Override defaults rc-tree styles


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _rcTree = require('rc-tree');

var _rcTree2 = _interopRequireDefault(_rcTree);

require('rc-tree/assets/index.css');

require('./oc-tree-styles.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OCTreeView = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(OCTreeView, _React$PureComponent);

  function OCTreeView() {
    var _temp, _this, _ret;

    _classCallCheck(this, OCTreeView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.onDragDrop = function (e) {
      if (!_this.props.onDragDrop) throw new TypeError('onDragDrop callback is not defined');

      var dropKey = e.node.props.eventKey;
      var dragKey = e.dragNode.props.eventKey;

      var loop = function loop(data, key, callback) {
        data.forEach(function (item, index, arr) {
          if (item.key === key) return callback(item, index, arr);
          if (item.children) return loop(item.children, key, callback);
          return null;
        });
      };

      var newData = _this.props.treeData.slice();

      var dragObj = void 0;
      loop(newData, dragKey, function (item, index, arr) {
        arr.splice(index, 1);
        dragObj = item;
      });

      // .. item is dropped between 2 items
      if (e.dropToGap) {
        var ar = void 0;
        var i = void 0;
        loop(newData, dropKey, function (item, index, arr) {
          ar = arr;
          i = index;
        });
        ar.splice(i, 0, dragObj);
      } else {
        loop(newData, dropKey, function (item) {
          item.children = item.children || []; // eslint-disable-line no-param-reassign
          item.children.push(dragObj);
        });
      }

      _this.props.onDragDrop(newData);
    }, _this.hasChildren = function (dataObject) {
      return dataObject[_this.props.dataLookUpChildren] && dataObject[_this.props.dataLookUpChildren].length >= 1;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /* hasChildren - function */


  /* renderNodes - function */
  OCTreeView.prototype.renderNodes = function renderNodes() {
    var nodeKey = this.props.dataLookUpKey;
    var nodeVal = this.props.dataLookUpValue;
    var nodeChild = this.props.dataLookUpChildren;
    var checkChildren = this.hasChildren;
    var customIcon = this.props.iconClass;

    // Recursive function for collecting nodes:
    var mountNodes = function mountNodes(nodeList) {
      var lst = [];
      nodeList.forEach(function (node) {
        if (!node[nodeKey]) return false;
        if (!checkChildren(node)) {
          lst.push( // eslint-disable-line function-paren-newline
          _react2.default.createElement(_rcTree.TreeNode, {
            title: node[nodeVal],
            key: node[nodeKey],
            className: '' + customIcon
          }));
        } else {
          lst.push( // eslint-disable-line function-paren-newline
          _react2.default.createElement(
            _rcTree.TreeNode,
            {
              title: node[nodeVal],
              key: node[nodeKey],
              className: '' + customIcon
            },
            mountNodes(node[nodeChild])
          ));
        }
        return false;
      });
      return lst;
    };
    return mountNodes(this.props.treeData);
  };

  OCTreeView.prototype.render = function render() {
    var nodes = this.renderNodes();
    var clsName = this.props.treeClass ? this.props.treeClass + ' oc-react-tree' : 'oc-react-tree';
    var _props = this.props,
        treeId = _props.treeId,
        treeClass = _props.treeClass,
        defaultExpandedKeys = _props.defaultExpandedKeys,
        defaultSelectedKeys = _props.defaultSelectedKeys,
        defaultCheckedKeys = _props.defaultCheckedKeys,
        checkedKeys = _props.checkedKeys,
        onExpand = _props.onExpand,
        onSelect = _props.onSelect,
        onCheck = _props.onCheck,
        showLine = _props.showLine,
        showIcon = _props.showIcon,
        checkable = _props.checkable,
        selectable = _props.selectable,
        defaultExpandAll = _props.defaultExpandAll,
        draggable = _props.draggable,
        disabled = _props.disabled;


    return _react2.default.createElement(
      'div',
      { id: 'tree-view-container', className: clsName },
      !!nodes.length && _react2.default.createElement(
        _rcTree2.default,
        {
          id: treeId,
          className: treeClass,
          defaultExpandedKeys: defaultExpandedKeys,
          defaultSelectedKeys: defaultSelectedKeys,
          defaultCheckedKeys: defaultCheckedKeys,
          checkedKeys: checkedKeys,
          onExpand: onExpand,
          onSelect: onSelect,
          onCheck: onCheck,
          showLine: showLine,
          showIcon: showIcon,
          checkable: checkable,
          selectable: selectable,
          disabled: disabled,
          draggable: draggable,
          defaultExpandAll: defaultExpandAll,
          onDrop: this.onDragDrop
        },
        nodes
      )
    );
  };

  return OCTreeView;
}(_react2.default.PureComponent), _class.defaultProps = {
  treeId: 'defaultTree',
  treeClass: '',
  iconClass: '',
  defaultExpandedKeys: [],
  defaultSelectedKeys: [],
  defaultCheckedKeys: [],
  onExpand: undefined,
  onSelect: undefined,
  onCheck: undefined,
  onDragDrop: undefined,
  showLine: false,
  disabled: false,
  showIcon: false,
  checkable: false,
  draggable: false,
  selectable: false,
  defaultExpandAll: false,
  // Customs
  dataLookUpKey: 'key',
  dataLookUpValue: 'parent',
  dataLookUpChildren: 'children',
  treeData: [],
  checkedKeys: []
}, _temp2);
exports.default = OCTreeView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiT0NUcmVlVmlldyIsIm9uRHJhZ0Ryb3AiLCJlIiwicHJvcHMiLCJUeXBlRXJyb3IiLCJkcm9wS2V5Iiwibm9kZSIsImV2ZW50S2V5IiwiZHJhZ0tleSIsImRyYWdOb2RlIiwibG9vcCIsImRhdGEiLCJrZXkiLCJjYWxsYmFjayIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJhcnIiLCJjaGlsZHJlbiIsIm5ld0RhdGEiLCJ0cmVlRGF0YSIsInNsaWNlIiwiZHJhZ09iaiIsInNwbGljZSIsImRyb3BUb0dhcCIsImFyIiwiaSIsInB1c2giLCJoYXNDaGlsZHJlbiIsImRhdGFPYmplY3QiLCJkYXRhTG9va1VwQ2hpbGRyZW4iLCJsZW5ndGgiLCJyZW5kZXJOb2RlcyIsIm5vZGVLZXkiLCJkYXRhTG9va1VwS2V5Iiwibm9kZVZhbCIsImRhdGFMb29rVXBWYWx1ZSIsIm5vZGVDaGlsZCIsImNoZWNrQ2hpbGRyZW4iLCJjdXN0b21JY29uIiwiaWNvbkNsYXNzIiwibW91bnROb2RlcyIsIm5vZGVMaXN0IiwibHN0IiwicmVuZGVyIiwibm9kZXMiLCJjbHNOYW1lIiwidHJlZUNsYXNzIiwidHJlZUlkIiwiZGVmYXVsdEV4cGFuZGVkS2V5cyIsImRlZmF1bHRTZWxlY3RlZEtleXMiLCJkZWZhdWx0Q2hlY2tlZEtleXMiLCJjaGVja2VkS2V5cyIsIm9uRXhwYW5kIiwib25TZWxlY3QiLCJvbkNoZWNrIiwic2hvd0xpbmUiLCJzaG93SWNvbiIsImNoZWNrYWJsZSIsInNlbGVjdGFibGUiLCJkZWZhdWx0RXhwYW5kQWxsIiwiZHJhZ2dhYmxlIiwiZGlzYWJsZWQiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQTs7O0FBSkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozs7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RTtBQWtCcEI7QUFDQTFCLGlCQUFlLEtBbkJLO0FBb0JwQkUsbUJBQWlCLFFBcEJHO0FBcUJwQk4sc0JBQW9CLFVBckJBO0FBc0JwQlYsWUFBVSxFQXRCVTtBQXVCcEJnQyxlQUFhO0FBdkJPLEM7a0JBM0JIcEQsVSIsImZpbGUiOiJ0cmVlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFRyZWUsIHsgVHJlZU5vZGUgfSBmcm9tICdyYy10cmVlJztcbmltcG9ydCAncmMtdHJlZS9hc3NldHMvaW5kZXguY3NzJztcbi8vIE92ZXJyaWRlIGRlZmF1bHRzIHJjLXRyZWUgc3R5bGVzXG5pbXBvcnQgJy4vb2MtdHJlZS1zdHlsZXMuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9DVHJlZVZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB0cmVlSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdHJlZUNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGljb25DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZWZhdWx0Q2hlY2tlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIG9uRXhwYW5kOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGVjazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25EcmFnRHJvcDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd0xpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dJY29uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjaGVja2FibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRyYWdnYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgIC8vIEN1c3RvbWlzYXRpb24gLS0gZGVmaW5lIHRoZSBkYXRhIGxvb2tVcEtleXMgYW5kIGxvb2tVcFZhbHVlc1xuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcbiAgICBkYXRhTG9va1VwS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRhdGFMb29rVXBWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hlY2tlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgdHJlZUlkOiAnZGVmYXVsdFRyZWUnLFxuICAgIHRyZWVDbGFzczogJycsXG4gICAgaWNvbkNsYXNzOiAnJyxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBbXSxcbiAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzOiBbXSxcbiAgICBkZWZhdWx0Q2hlY2tlZEtleXM6IFtdLFxuICAgIG9uRXhwYW5kOiB1bmRlZmluZWQsXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBvbkNoZWNrOiB1bmRlZmluZWQsXG4gICAgb25EcmFnRHJvcDogdW5kZWZpbmVkLFxuICAgIHNob3dMaW5lOiBmYWxzZSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgc2hvd0ljb246IGZhbHNlLFxuICAgIGNoZWNrYWJsZTogZmFsc2UsXG4gICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBmYWxzZSxcbiAgICAvLyBDdXN0b21zXG4gICAgZGF0YUxvb2tVcEtleTogJ2tleScsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiAncGFyZW50JyxcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46ICdjaGlsZHJlbicsXG4gICAgdHJlZURhdGE6IFtdLFxuICAgIGNoZWNrZWRLZXlzOiBbXSxcbiAgfTtcblxuXG4gIG9uRHJhZ0Ryb3AgPSAoZSkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5vbkRyYWdEcm9wKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdvbkRyYWdEcm9wIGNhbGxiYWNrIGlzIG5vdCBkZWZpbmVkJyk7XG5cbiAgICBjb25zdCBkcm9wS2V5ID0gZS5ub2RlLnByb3BzLmV2ZW50S2V5O1xuICAgIGNvbnN0IGRyYWdLZXkgPSBlLmRyYWdOb2RlLnByb3BzLmV2ZW50S2V5O1xuXG4gICAgY29uc3QgbG9vcCA9IChkYXRhLCBrZXksIGNhbGxiYWNrKSA9PiB7XG4gICAgICBkYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4LCBhcnIpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0ua2V5ID09PSBrZXkpIHJldHVybiBjYWxsYmFjayhpdGVtLCBpbmRleCwgYXJyKTtcbiAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHJldHVybiBsb29wKGl0ZW0uY2hpbGRyZW4sIGtleSwgY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBuZXdEYXRhID0gdGhpcy5wcm9wcy50cmVlRGF0YS5zbGljZSgpO1xuXG4gICAgbGV0IGRyYWdPYmo7XG4gICAgbG9vcChuZXdEYXRhLCBkcmFnS2V5LCAoaXRlbSwgaW5kZXgsIGFycikgPT4ge1xuICAgICAgYXJyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBkcmFnT2JqID0gaXRlbTtcbiAgICB9KTtcblxuICAgIC8vIC4uIGl0ZW0gaXMgZHJvcHBlZCBiZXR3ZWVuIDIgaXRlbXNcbiAgICBpZiAoZS5kcm9wVG9HYXApIHtcbiAgICAgIGxldCBhcjtcbiAgICAgIGxldCBpO1xuICAgICAgbG9vcChuZXdEYXRhLCBkcm9wS2V5LCAoaXRlbSwgaW5kZXgsIGFycikgPT4ge1xuICAgICAgICBhciA9IGFycjtcbiAgICAgICAgaSA9IGluZGV4O1xuICAgICAgfSk7XG4gICAgICBhci5zcGxpY2UoaSwgMCwgZHJhZ09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvb3AobmV3RGF0YSwgZHJvcEtleSwgKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5jaGlsZHJlbiA9IGl0ZW0uY2hpbGRyZW4gfHwgW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgaXRlbS5jaGlsZHJlbi5wdXNoKGRyYWdPYmopO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5vbkRyYWdEcm9wKG5ld0RhdGEpO1xuICB9O1xuXG4gIC8qIGhhc0NoaWxkcmVuIC0gZnVuY3Rpb24gKi9cbiAgaGFzQ2hpbGRyZW4gPSBkYXRhT2JqZWN0ID0+ICgoZGF0YU9iamVjdFt0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbl1cbiAgICAmJiBkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXS5sZW5ndGggPj0gMVxuICApKTtcblxuICAvKiByZW5kZXJOb2RlcyAtIGZ1bmN0aW9uICovXG4gIHJlbmRlck5vZGVzKCkge1xuICAgIGNvbnN0IG5vZGVLZXkgPSB0aGlzLnByb3BzLmRhdGFMb29rVXBLZXk7XG4gICAgY29uc3Qgbm9kZVZhbCA9IHRoaXMucHJvcHMuZGF0YUxvb2tVcFZhbHVlO1xuICAgIGNvbnN0IG5vZGVDaGlsZCA9IHRoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuO1xuICAgIGNvbnN0IGNoZWNrQ2hpbGRyZW4gPSB0aGlzLmhhc0NoaWxkcmVuO1xuICAgIGNvbnN0IGN1c3RvbUljb24gPSB0aGlzLnByb3BzLmljb25DbGFzcztcblxuICAgIC8vIFJlY3Vyc2l2ZSBmdW5jdGlvbiBmb3IgY29sbGVjdGluZyBub2RlczpcbiAgICBjb25zdCBtb3VudE5vZGVzID0gKG5vZGVMaXN0KSA9PiB7XG4gICAgICBjb25zdCBsc3QgPSBbXTtcbiAgICAgIG5vZGVMaXN0LmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKCFub2RlW25vZGVLZXldKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghY2hlY2tDaGlsZHJlbihub2RlKSkge1xuICAgICAgICAgIGxzdC5wdXNoKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcbiAgICAgICAgICAgIDxUcmVlTm9kZVxuICAgICAgICAgICAgICB0aXRsZT17bm9kZVtub2RlVmFsXX1cbiAgICAgICAgICAgICAga2V5PXtub2RlW25vZGVLZXldfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2N1c3RvbUljb259YH1cbiAgICAgICAgICAgIC8+KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsc3QucHVzaCggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jdGlvbi1wYXJlbi1uZXdsaW5lXG4gICAgICAgICAgICA8VHJlZU5vZGVcbiAgICAgICAgICAgICAgdGl0bGU9e25vZGVbbm9kZVZhbF19XG4gICAgICAgICAgICAgIGtleT17bm9kZVtub2RlS2V5XX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtjdXN0b21JY29ufWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHttb3VudE5vZGVzKG5vZGVbbm9kZUNoaWxkXSl9XG4gICAgICAgICAgICA8L1RyZWVOb2RlPik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbHN0O1xuICAgIH07XG4gICAgcmV0dXJuIG1vdW50Tm9kZXModGhpcy5wcm9wcy50cmVlRGF0YSk7XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBub2RlcyA9IHRoaXMucmVuZGVyTm9kZXMoKTtcbiAgICBjb25zdCBjbHNOYW1lID0gdGhpcy5wcm9wcy50cmVlQ2xhc3MgPyBgJHt0aGlzLnByb3BzLnRyZWVDbGFzc30gb2MtcmVhY3QtdHJlZWAgOiAnb2MtcmVhY3QtdHJlZSc7XG4gICAgY29uc3Qge1xuICAgICAgdHJlZUlkLCB0cmVlQ2xhc3MsIGRlZmF1bHRFeHBhbmRlZEtleXMsIGRlZmF1bHRTZWxlY3RlZEtleXMsIGRlZmF1bHRDaGVja2VkS2V5cywgY2hlY2tlZEtleXMsXG4gICAgICBvbkV4cGFuZCwgb25TZWxlY3QsIG9uQ2hlY2ssIHNob3dMaW5lLCBzaG93SWNvbiwgY2hlY2thYmxlLCBzZWxlY3RhYmxlLCBkZWZhdWx0RXhwYW5kQWxsLFxuICAgICAgZHJhZ2dhYmxlLCBkaXNhYmxlZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwidHJlZS12aWV3LWNvbnRhaW5lclwiIGNsYXNzTmFtZT17Y2xzTmFtZX0+XG4gICAgICAgIHshIW5vZGVzLmxlbmd0aCAmJlxuICAgICAgICA8VHJlZVxuICAgICAgICAgIGlkPXt0cmVlSWR9XG4gICAgICAgICAgY2xhc3NOYW1lPXt0cmVlQ2xhc3N9XG4gICAgICAgICAgZGVmYXVsdEV4cGFuZGVkS2V5cz17ZGVmYXVsdEV4cGFuZGVkS2V5c31cbiAgICAgICAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzPXtkZWZhdWx0U2VsZWN0ZWRLZXlzfVxuICAgICAgICAgIGRlZmF1bHRDaGVja2VkS2V5cz17ZGVmYXVsdENoZWNrZWRLZXlzfVxuICAgICAgICAgIGNoZWNrZWRLZXlzPXtjaGVja2VkS2V5c31cbiAgICAgICAgICBvbkV4cGFuZD17b25FeHBhbmR9XG4gICAgICAgICAgb25TZWxlY3Q9e29uU2VsZWN0fVxuICAgICAgICAgIG9uQ2hlY2s9e29uQ2hlY2t9XG4gICAgICAgICAgc2hvd0xpbmU9e3Nob3dMaW5lfVxuICAgICAgICAgIHNob3dJY29uPXtzaG93SWNvbn1cbiAgICAgICAgICBjaGVja2FibGU9e2NoZWNrYWJsZX1cbiAgICAgICAgICBzZWxlY3RhYmxlPXtzZWxlY3RhYmxlfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBkcmFnZ2FibGU9e2RyYWdnYWJsZX1cbiAgICAgICAgICBkZWZhdWx0RXhwYW5kQWxsPXtkZWZhdWx0RXhwYW5kQWxsfVxuICAgICAgICAgIG9uRHJvcD17dGhpcy5vbkRyYWdEcm9wfVxuICAgICAgICA+XG4gICAgICAgICAge25vZGVzfVxuICAgICAgICA8L1RyZWU+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==