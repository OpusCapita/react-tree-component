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
    var disableNodeCheckboxes = this.props.disableCheckboxes;
    var checkChildren = this.hasChildren;
    var disableCls = disableNodeCheckboxes ? 'disabled' : '';
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
            className: customIcon + ' ' + disableCls,
            disableCheckbox: disableNodeCheckboxes
          }));
        } else {
          lst.push( // eslint-disable-line function-paren-newline
          _react2.default.createElement(
            _rcTree.TreeNode,
            {
              title: node[nodeVal],
              key: node[nodeKey],
              className: customIcon + ' ' + disableCls,
              disableCheckbox: disableNodeCheckboxes
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
        draggable = _props.draggable;


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
  showIcon: false,
  checkable: false,
  draggable: false,
  selectable: false,
  defaultExpandAll: false,
  // Node related props:
  disableCheckboxes: false,
  // Customs
  dataLookUpKey: 'key',
  dataLookUpValue: 'parent',
  dataLookUpChildren: 'children',
  treeData: [],
  checkedKeys: []
}, _temp2);
exports.default = OCTreeView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiT0NUcmVlVmlldyIsIm9uRHJhZ0Ryb3AiLCJlIiwicHJvcHMiLCJUeXBlRXJyb3IiLCJkcm9wS2V5Iiwibm9kZSIsImV2ZW50S2V5IiwiZHJhZ0tleSIsImRyYWdOb2RlIiwibG9vcCIsImRhdGEiLCJrZXkiLCJjYWxsYmFjayIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJhcnIiLCJjaGlsZHJlbiIsIm5ld0RhdGEiLCJ0cmVlRGF0YSIsInNsaWNlIiwiZHJhZ09iaiIsInNwbGljZSIsImRyb3BUb0dhcCIsImFyIiwiaSIsInB1c2giLCJoYXNDaGlsZHJlbiIsImRhdGFPYmplY3QiLCJkYXRhTG9va1VwQ2hpbGRyZW4iLCJsZW5ndGgiLCJyZW5kZXJOb2RlcyIsIm5vZGVLZXkiLCJkYXRhTG9va1VwS2V5Iiwibm9kZVZhbCIsImRhdGFMb29rVXBWYWx1ZSIsIm5vZGVDaGlsZCIsImRpc2FibGVOb2RlQ2hlY2tib3hlcyIsImRpc2FibGVDaGVja2JveGVzIiwiY2hlY2tDaGlsZHJlbiIsImRpc2FibGVDbHMiLCJjdXN0b21JY29uIiwiaWNvbkNsYXNzIiwibW91bnROb2RlcyIsIm5vZGVMaXN0IiwibHN0IiwicmVuZGVyIiwibm9kZXMiLCJjbHNOYW1lIiwidHJlZUNsYXNzIiwidHJlZUlkIiwiZGVmYXVsdEV4cGFuZGVkS2V5cyIsImRlZmF1bHRTZWxlY3RlZEtleXMiLCJkZWZhdWx0Q2hlY2tlZEtleXMiLCJjaGVja2VkS2V5cyIsIm9uRXhwYW5kIiwib25TZWxlY3QiLCJvbkNoZWNrIiwic2hvd0xpbmUiLCJzaG93SWNvbiIsImNoZWNrYWJsZSIsInNlbGVjdGFibGUiLCJkZWZhdWx0RXhwYW5kQWxsIiwiZHJhZ2dhYmxlIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBSUE7OztBQUpBOzs7O0FBQ0E7Ozs7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LFNBVFc7QUFVcEJsRSxjQUFZa0UsU0FWUTtBQVdwQlIsWUFBVSxLQVhVO0FBWXBCQyxZQUFVLEtBWlU7QUFhcEJDLGFBQVcsS0FiUztBQWNwQkcsYUFBVyxLQWRTO0FBZXBCRixjQUFZLEtBZlE7QUFnQnBCQyxvQkFBa0IsS0FoQkU7QUFpQnBCO0FBQ0F4QixxQkFBbUIsS0FsQkM7QUFtQnBCO0FBQ0FMLGlCQUFlLEtBcEJLO0FBcUJwQkUsbUJBQWlCLFFBckJHO0FBc0JwQk4sc0JBQW9CLFVBdEJBO0FBdUJwQlYsWUFBVSxFQXZCVTtBQXdCcEJtQyxlQUFhO0FBeEJPLEM7a0JBNUJIdkQsVSIsImZpbGUiOiJ0cmVlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFRyZWUsIHsgVHJlZU5vZGUgfSBmcm9tICdyYy10cmVlJztcbmltcG9ydCAncmMtdHJlZS9hc3NldHMvaW5kZXguY3NzJztcbi8vIE92ZXJyaWRlIGRlZmF1bHRzIHJjLXRyZWUgc3R5bGVzXG5pbXBvcnQgJy4vb2MtdHJlZS1zdHlsZXMuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9DVHJlZVZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB0cmVlSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdHJlZUNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGljb25DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZWZhdWx0Q2hlY2tlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIG9uRXhwYW5kOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGVjazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25EcmFnRHJvcDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd0xpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dJY29uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjaGVja2FibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRyYWdnYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgLy8gTm9kZSByZWxhdGVkIHByb3BzOlxuICAgIGRpc2FibGVDaGVja2JveGVzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAvLyBDdXN0b21pc2F0aW9uIC0tIGRlZmluZSB0aGUgZGF0YSBsb29rVXBLZXlzIGFuZCBsb29rVXBWYWx1ZXNcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksXG4gICAgZGF0YUxvb2tVcEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXRhTG9va1VwVmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoZWNrZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHRyZWVJZDogJ2RlZmF1bHRUcmVlJyxcbiAgICB0cmVlQ2xhc3M6ICcnLFxuICAgIGljb25DbGFzczogJycsXG4gICAgZGVmYXVsdEV4cGFuZGVkS2V5czogW10sXG4gICAgZGVmYXVsdFNlbGVjdGVkS2V5czogW10sXG4gICAgZGVmYXVsdENoZWNrZWRLZXlzOiBbXSxcbiAgICBvbkV4cGFuZDogdW5kZWZpbmVkLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25DaGVjazogdW5kZWZpbmVkLFxuICAgIG9uRHJhZ0Ryb3A6IHVuZGVmaW5lZCxcbiAgICBzaG93TGluZTogZmFsc2UsXG4gICAgc2hvd0ljb246IGZhbHNlLFxuICAgIGNoZWNrYWJsZTogZmFsc2UsXG4gICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBmYWxzZSxcbiAgICAvLyBOb2RlIHJlbGF0ZWQgcHJvcHM6XG4gICAgZGlzYWJsZUNoZWNrYm94ZXM6IGZhbHNlLFxuICAgIC8vIEN1c3RvbXNcbiAgICBkYXRhTG9va1VwS2V5OiAna2V5JyxcbiAgICBkYXRhTG9va1VwVmFsdWU6ICdwYXJlbnQnLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogJ2NoaWxkcmVuJyxcbiAgICB0cmVlRGF0YTogW10sXG4gICAgY2hlY2tlZEtleXM6IFtdLFxuICB9O1xuXG5cbiAgb25EcmFnRHJvcCA9IChlKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLm9uRHJhZ0Ryb3ApIHRocm93IG5ldyBUeXBlRXJyb3IoJ29uRHJhZ0Ryb3AgY2FsbGJhY2sgaXMgbm90IGRlZmluZWQnKTtcblxuICAgIGNvbnN0IGRyb3BLZXkgPSBlLm5vZGUucHJvcHMuZXZlbnRLZXk7XG4gICAgY29uc3QgZHJhZ0tleSA9IGUuZHJhZ05vZGUucHJvcHMuZXZlbnRLZXk7XG5cbiAgICBjb25zdCBsb29wID0gKGRhdGEsIGtleSwgY2FsbGJhY2spID0+IHtcbiAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgsIGFycikgPT4ge1xuICAgICAgICBpZiAoaXRlbS5rZXkgPT09IGtleSkgcmV0dXJuIGNhbGxiYWNrKGl0ZW0sIGluZGV4LCBhcnIpO1xuICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbikgcmV0dXJuIGxvb3AoaXRlbS5jaGlsZHJlbiwga2V5LCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG5ld0RhdGEgPSB0aGlzLnByb3BzLnRyZWVEYXRhLnNsaWNlKCk7XG5cbiAgICBsZXQgZHJhZ09iajtcbiAgICBsb29wKG5ld0RhdGEsIGRyYWdLZXksIChpdGVtLCBpbmRleCwgYXJyKSA9PiB7XG4gICAgICBhcnIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGRyYWdPYmogPSBpdGVtO1xuICAgIH0pO1xuXG4gICAgLy8gLi4gaXRlbSBpcyBkcm9wcGVkIGJldHdlZW4gMiBpdGVtc1xuICAgIGlmIChlLmRyb3BUb0dhcCkge1xuICAgICAgbGV0IGFyO1xuICAgICAgbGV0IGk7XG4gICAgICBsb29wKG5ld0RhdGEsIGRyb3BLZXksIChpdGVtLCBpbmRleCwgYXJyKSA9PiB7XG4gICAgICAgIGFyID0gYXJyO1xuICAgICAgICBpID0gaW5kZXg7XG4gICAgICB9KTtcbiAgICAgIGFyLnNwbGljZShpLCAwLCBkcmFnT2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9vcChuZXdEYXRhLCBkcm9wS2V5LCAoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLmNoaWxkcmVuID0gaXRlbS5jaGlsZHJlbiB8fCBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBpdGVtLmNoaWxkcmVuLnB1c2goZHJhZ09iaik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLm9uRHJhZ0Ryb3AobmV3RGF0YSk7XG4gIH07XG5cbiAgLyogaGFzQ2hpbGRyZW4gLSBmdW5jdGlvbiAqL1xuICBoYXNDaGlsZHJlbiA9IGRhdGFPYmplY3QgPT4gKChkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXVxuICAgICYmIGRhdGFPYmplY3RbdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW5dLmxlbmd0aCA+PSAxXG4gICkpO1xuXG4gIC8qIHJlbmRlck5vZGVzIC0gZnVuY3Rpb24gKi9cbiAgcmVuZGVyTm9kZXMoKSB7XG4gICAgY29uc3Qgbm9kZUtleSA9IHRoaXMucHJvcHMuZGF0YUxvb2tVcEtleTtcbiAgICBjb25zdCBub2RlVmFsID0gdGhpcy5wcm9wcy5kYXRhTG9va1VwVmFsdWU7XG4gICAgY29uc3Qgbm9kZUNoaWxkID0gdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW47XG4gICAgY29uc3QgZGlzYWJsZU5vZGVDaGVja2JveGVzID0gdGhpcy5wcm9wcy5kaXNhYmxlQ2hlY2tib3hlcztcbiAgICBjb25zdCBjaGVja0NoaWxkcmVuID0gdGhpcy5oYXNDaGlsZHJlbjtcbiAgICBjb25zdCBkaXNhYmxlQ2xzID0gZGlzYWJsZU5vZGVDaGVja2JveGVzID8gJ2Rpc2FibGVkJyA6ICcnO1xuICAgIGNvbnN0IGN1c3RvbUljb24gPSB0aGlzLnByb3BzLmljb25DbGFzcztcblxuICAgIC8vIFJlY3Vyc2l2ZSBmdW5jdGlvbiBmb3IgY29sbGVjdGluZyBub2RlczpcbiAgICBjb25zdCBtb3VudE5vZGVzID0gKG5vZGVMaXN0KSA9PiB7XG4gICAgICBjb25zdCBsc3QgPSBbXTtcbiAgICAgIG5vZGVMaXN0LmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKCFub2RlW25vZGVLZXldKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghY2hlY2tDaGlsZHJlbihub2RlKSkge1xuICAgICAgICAgIGxzdC5wdXNoKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcbiAgICAgICAgICAgIDxUcmVlTm9kZVxuICAgICAgICAgICAgICB0aXRsZT17bm9kZVtub2RlVmFsXX1cbiAgICAgICAgICAgICAga2V5PXtub2RlW25vZGVLZXldfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2N1c3RvbUljb259ICR7ZGlzYWJsZUNsc31gfVxuICAgICAgICAgICAgICBkaXNhYmxlQ2hlY2tib3g9e2Rpc2FibGVOb2RlQ2hlY2tib3hlc31cbiAgICAgICAgICAgIC8+KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsc3QucHVzaCggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jdGlvbi1wYXJlbi1uZXdsaW5lXG4gICAgICAgICAgICA8VHJlZU5vZGVcbiAgICAgICAgICAgICAgdGl0bGU9e25vZGVbbm9kZVZhbF19XG4gICAgICAgICAgICAgIGtleT17bm9kZVtub2RlS2V5XX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtjdXN0b21JY29ufSAke2Rpc2FibGVDbHN9YH1cbiAgICAgICAgICAgICAgZGlzYWJsZUNoZWNrYm94PXtkaXNhYmxlTm9kZUNoZWNrYm94ZXN9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHttb3VudE5vZGVzKG5vZGVbbm9kZUNoaWxkXSl9XG4gICAgICAgICAgICA8L1RyZWVOb2RlPik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbHN0O1xuICAgIH07XG4gICAgcmV0dXJuIG1vdW50Tm9kZXModGhpcy5wcm9wcy50cmVlRGF0YSk7XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBub2RlcyA9IHRoaXMucmVuZGVyTm9kZXMoKTtcbiAgICBjb25zdCBjbHNOYW1lID0gdGhpcy5wcm9wcy50cmVlQ2xhc3MgPyBgJHt0aGlzLnByb3BzLnRyZWVDbGFzc30gb2MtcmVhY3QtdHJlZWAgOiAnb2MtcmVhY3QtdHJlZSc7XG4gICAgY29uc3Qge1xuICAgICAgdHJlZUlkLCB0cmVlQ2xhc3MsIGRlZmF1bHRFeHBhbmRlZEtleXMsIGRlZmF1bHRTZWxlY3RlZEtleXMsIGRlZmF1bHRDaGVja2VkS2V5cywgY2hlY2tlZEtleXMsXG4gICAgICBvbkV4cGFuZCwgb25TZWxlY3QsIG9uQ2hlY2ssIHNob3dMaW5lLCBzaG93SWNvbiwgY2hlY2thYmxlLCBzZWxlY3RhYmxlLCBkZWZhdWx0RXhwYW5kQWxsLFxuICAgICAgZHJhZ2dhYmxlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJ0cmVlLXZpZXctY29udGFpbmVyXCIgY2xhc3NOYW1lPXtjbHNOYW1lfT5cbiAgICAgICAgeyEhbm9kZXMubGVuZ3RoICYmXG4gICAgICAgIDxUcmVlXG4gICAgICAgICAgaWQ9e3RyZWVJZH1cbiAgICAgICAgICBjbGFzc05hbWU9e3RyZWVDbGFzc31cbiAgICAgICAgICBkZWZhdWx0RXhwYW5kZWRLZXlzPXtkZWZhdWx0RXhwYW5kZWRLZXlzfVxuICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZEtleXM9e2RlZmF1bHRTZWxlY3RlZEtleXN9XG4gICAgICAgICAgZGVmYXVsdENoZWNrZWRLZXlzPXtkZWZhdWx0Q2hlY2tlZEtleXN9XG4gICAgICAgICAgY2hlY2tlZEtleXM9e2NoZWNrZWRLZXlzfVxuICAgICAgICAgIG9uRXhwYW5kPXtvbkV4cGFuZH1cbiAgICAgICAgICBvblNlbGVjdD17b25TZWxlY3R9XG4gICAgICAgICAgb25DaGVjaz17b25DaGVja31cbiAgICAgICAgICBzaG93TGluZT17c2hvd0xpbmV9XG4gICAgICAgICAgc2hvd0ljb249e3Nob3dJY29ufVxuICAgICAgICAgIGNoZWNrYWJsZT17Y2hlY2thYmxlfVxuICAgICAgICAgIHNlbGVjdGFibGU9e3NlbGVjdGFibGV9XG4gICAgICAgICAgZHJhZ2dhYmxlPXtkcmFnZ2FibGV9XG4gICAgICAgICAgZGVmYXVsdEV4cGFuZEFsbD17ZGVmYXVsdEV4cGFuZEFsbH1cbiAgICAgICAgICBvbkRyb3A9e3RoaXMub25EcmFnRHJvcH1cbiAgICAgICAgPlxuICAgICAgICAgIHtub2Rlc31cbiAgICAgICAgPC9UcmVlPlxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=