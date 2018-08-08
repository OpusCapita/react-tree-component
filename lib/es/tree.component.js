var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';
// Override defaults rc-tree styles
import './oc-tree-styles.scss';

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
          React.createElement(TreeNode, {
            title: node[nodeVal],
            key: node[nodeKey],
            className: '' + customIcon
          }));
        } else {
          lst.push( // eslint-disable-line function-paren-newline
          React.createElement(
            TreeNode,
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


    return React.createElement(
      'div',
      { id: 'tree-view-container', className: clsName },
      !!nodes.length && React.createElement(
        Tree,
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
}(React.PureComponent), _class.defaultProps = {
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
export { OCTreeView as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJUcmVlIiwiVHJlZU5vZGUiLCJPQ1RyZWVWaWV3Iiwib25EcmFnRHJvcCIsImUiLCJwcm9wcyIsIlR5cGVFcnJvciIsImRyb3BLZXkiLCJub2RlIiwiZXZlbnRLZXkiLCJkcmFnS2V5IiwiZHJhZ05vZGUiLCJsb29wIiwiZGF0YSIsImtleSIsImNhbGxiYWNrIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsImFyciIsImNoaWxkcmVuIiwibmV3RGF0YSIsInRyZWVEYXRhIiwic2xpY2UiLCJkcmFnT2JqIiwic3BsaWNlIiwiZHJvcFRvR2FwIiwiYXIiLCJpIiwicHVzaCIsImhhc0NoaWxkcmVuIiwiZGF0YU9iamVjdCIsImRhdGFMb29rVXBDaGlsZHJlbiIsImxlbmd0aCIsInJlbmRlck5vZGVzIiwibm9kZUtleSIsImRhdGFMb29rVXBLZXkiLCJub2RlVmFsIiwiZGF0YUxvb2tVcFZhbHVlIiwibm9kZUNoaWxkIiwiY2hlY2tDaGlsZHJlbiIsImN1c3RvbUljb24iLCJpY29uQ2xhc3MiLCJtb3VudE5vZGVzIiwibm9kZUxpc3QiLCJsc3QiLCJyZW5kZXIiLCJub2RlcyIsImNsc05hbWUiLCJ0cmVlQ2xhc3MiLCJ0cmVlSWQiLCJkZWZhdWx0RXhwYW5kZWRLZXlzIiwiZGVmYXVsdFNlbGVjdGVkS2V5cyIsImRlZmF1bHRDaGVja2VkS2V5cyIsImNoZWNrZWRLZXlzIiwib25FeHBhbmQiLCJvblNlbGVjdCIsIm9uQ2hlY2siLCJzaG93TGluZSIsInNob3dJY29uIiwiY2hlY2thYmxlIiwic2VsZWN0YWJsZSIsImRlZmF1bHRFeHBhbmRBbGwiLCJkcmFnZ2FibGUiLCJkaXNhYmxlZCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtB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VztBQVVwQmhFLGNBQVlnRSxTQVZRO0FBV3BCVCxZQUFVLEtBWFU7QUFZcEJNLFlBQVUsS0FaVTtBQWFwQkwsWUFBVSxLQWJVO0FBY3BCQyxhQUFXLEtBZFM7QUFlcEJHLGFBQVcsS0FmUztBQWdCcEJGLGNBQVksS0FoQlE7QUFpQnBCQyxvQkFBa0IsS0FqQkU7QUFrQnBCO0FBQ0ExQixpQkFBZSxLQW5CSztBQW9CcEJFLG1CQUFpQixRQXBCRztBQXFCcEJOLHNCQUFvQixVQXJCQTtBQXNCcEJWLFlBQVUsRUF0QlU7QUF1QnBCZ0MsZUFBYTtBQXZCTyxDO1NBM0JIcEQsVSIsImZpbGUiOiJ0cmVlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFRyZWUsIHsgVHJlZU5vZGUgfSBmcm9tICdyYy10cmVlJztcbmltcG9ydCAncmMtdHJlZS9hc3NldHMvaW5kZXguY3NzJztcbi8vIE92ZXJyaWRlIGRlZmF1bHRzIHJjLXRyZWUgc3R5bGVzXG5pbXBvcnQgJy4vb2MtdHJlZS1zdHlsZXMuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9DVHJlZVZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB0cmVlSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdHJlZUNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGljb25DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZWZhdWx0Q2hlY2tlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIG9uRXhwYW5kOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGVjazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25EcmFnRHJvcDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd0xpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dJY29uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjaGVja2FibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRyYWdnYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgIC8vIEN1c3RvbWlzYXRpb24gLS0gZGVmaW5lIHRoZSBkYXRhIGxvb2tVcEtleXMgYW5kIGxvb2tVcFZhbHVlc1xuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcbiAgICBkYXRhTG9va1VwS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRhdGFMb29rVXBWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hlY2tlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgdHJlZUlkOiAnZGVmYXVsdFRyZWUnLFxuICAgIHRyZWVDbGFzczogJycsXG4gICAgaWNvbkNsYXNzOiAnJyxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBbXSxcbiAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzOiBbXSxcbiAgICBkZWZhdWx0Q2hlY2tlZEtleXM6IFtdLFxuICAgIG9uRXhwYW5kOiB1bmRlZmluZWQsXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBvbkNoZWNrOiB1bmRlZmluZWQsXG4gICAgb25EcmFnRHJvcDogdW5kZWZpbmVkLFxuICAgIHNob3dMaW5lOiBmYWxzZSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgc2hvd0ljb246IGZhbHNlLFxuICAgIGNoZWNrYWJsZTogZmFsc2UsXG4gICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBmYWxzZSxcbiAgICAvLyBDdXN0b21zXG4gICAgZGF0YUxvb2tVcEtleTogJ2tleScsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiAncGFyZW50JyxcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46ICdjaGlsZHJlbicsXG4gICAgdHJlZURhdGE6IFtdLFxuICAgIGNoZWNrZWRLZXlzOiBbXSxcbiAgfTtcblxuXG4gIG9uRHJhZ0Ryb3AgPSAoZSkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5vbkRyYWdEcm9wKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdvbkRyYWdEcm9wIGNhbGxiYWNrIGlzIG5vdCBkZWZpbmVkJyk7XG5cbiAgICBjb25zdCBkcm9wS2V5ID0gZS5ub2RlLnByb3BzLmV2ZW50S2V5O1xuICAgIGNvbnN0IGRyYWdLZXkgPSBlLmRyYWdOb2RlLnByb3BzLmV2ZW50S2V5O1xuXG4gICAgY29uc3QgbG9vcCA9IChkYXRhLCBrZXksIGNhbGxiYWNrKSA9PiB7XG4gICAgICBkYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4LCBhcnIpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0ua2V5ID09PSBrZXkpIHJldHVybiBjYWxsYmFjayhpdGVtLCBpbmRleCwgYXJyKTtcbiAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHJldHVybiBsb29wKGl0ZW0uY2hpbGRyZW4sIGtleSwgY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBuZXdEYXRhID0gdGhpcy5wcm9wcy50cmVlRGF0YS5zbGljZSgpO1xuXG4gICAgbGV0IGRyYWdPYmo7XG4gICAgbG9vcChuZXdEYXRhLCBkcmFnS2V5LCAoaXRlbSwgaW5kZXgsIGFycikgPT4ge1xuICAgICAgYXJyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBkcmFnT2JqID0gaXRlbTtcbiAgICB9KTtcblxuICAgIC8vIC4uIGl0ZW0gaXMgZHJvcHBlZCBiZXR3ZWVuIDIgaXRlbXNcbiAgICBpZiAoZS5kcm9wVG9HYXApIHtcbiAgICAgIGxldCBhcjtcbiAgICAgIGxldCBpO1xuICAgICAgbG9vcChuZXdEYXRhLCBkcm9wS2V5LCAoaXRlbSwgaW5kZXgsIGFycikgPT4ge1xuICAgICAgICBhciA9IGFycjtcbiAgICAgICAgaSA9IGluZGV4O1xuICAgICAgfSk7XG4gICAgICBhci5zcGxpY2UoaSwgMCwgZHJhZ09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvb3AobmV3RGF0YSwgZHJvcEtleSwgKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5jaGlsZHJlbiA9IGl0ZW0uY2hpbGRyZW4gfHwgW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgaXRlbS5jaGlsZHJlbi5wdXNoKGRyYWdPYmopO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5vbkRyYWdEcm9wKG5ld0RhdGEpO1xuICB9O1xuXG4gIC8qIGhhc0NoaWxkcmVuIC0gZnVuY3Rpb24gKi9cbiAgaGFzQ2hpbGRyZW4gPSBkYXRhT2JqZWN0ID0+ICgoZGF0YU9iamVjdFt0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbl1cbiAgICAmJiBkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXS5sZW5ndGggPj0gMVxuICApKTtcblxuICAvKiByZW5kZXJOb2RlcyAtIGZ1bmN0aW9uICovXG4gIHJlbmRlck5vZGVzKCkge1xuICAgIGNvbnN0IG5vZGVLZXkgPSB0aGlzLnByb3BzLmRhdGFMb29rVXBLZXk7XG4gICAgY29uc3Qgbm9kZVZhbCA9IHRoaXMucHJvcHMuZGF0YUxvb2tVcFZhbHVlO1xuICAgIGNvbnN0IG5vZGVDaGlsZCA9IHRoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuO1xuICAgIGNvbnN0IGNoZWNrQ2hpbGRyZW4gPSB0aGlzLmhhc0NoaWxkcmVuO1xuICAgIGNvbnN0IGN1c3RvbUljb24gPSB0aGlzLnByb3BzLmljb25DbGFzcztcblxuICAgIC8vIFJlY3Vyc2l2ZSBmdW5jdGlvbiBmb3IgY29sbGVjdGluZyBub2RlczpcbiAgICBjb25zdCBtb3VudE5vZGVzID0gKG5vZGVMaXN0KSA9PiB7XG4gICAgICBjb25zdCBsc3QgPSBbXTtcbiAgICAgIG5vZGVMaXN0LmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKCFub2RlW25vZGVLZXldKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghY2hlY2tDaGlsZHJlbihub2RlKSkge1xuICAgICAgICAgIGxzdC5wdXNoKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcbiAgICAgICAgICAgIDxUcmVlTm9kZVxuICAgICAgICAgICAgICB0aXRsZT17bm9kZVtub2RlVmFsXX1cbiAgICAgICAgICAgICAga2V5PXtub2RlW25vZGVLZXldfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2N1c3RvbUljb259YH1cbiAgICAgICAgICAgIC8+KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsc3QucHVzaCggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jdGlvbi1wYXJlbi1uZXdsaW5lXG4gICAgICAgICAgICA8VHJlZU5vZGVcbiAgICAgICAgICAgICAgdGl0bGU9e25vZGVbbm9kZVZhbF19XG4gICAgICAgICAgICAgIGtleT17bm9kZVtub2RlS2V5XX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtjdXN0b21JY29ufWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHttb3VudE5vZGVzKG5vZGVbbm9kZUNoaWxkXSl9XG4gICAgICAgICAgICA8L1RyZWVOb2RlPik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbHN0O1xuICAgIH07XG4gICAgcmV0dXJuIG1vdW50Tm9kZXModGhpcy5wcm9wcy50cmVlRGF0YSk7XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBub2RlcyA9IHRoaXMucmVuZGVyTm9kZXMoKTtcbiAgICBjb25zdCBjbHNOYW1lID0gdGhpcy5wcm9wcy50cmVlQ2xhc3MgPyBgJHt0aGlzLnByb3BzLnRyZWVDbGFzc30gb2MtcmVhY3QtdHJlZWAgOiAnb2MtcmVhY3QtdHJlZSc7XG4gICAgY29uc3Qge1xuICAgICAgdHJlZUlkLCB0cmVlQ2xhc3MsIGRlZmF1bHRFeHBhbmRlZEtleXMsIGRlZmF1bHRTZWxlY3RlZEtleXMsIGRlZmF1bHRDaGVja2VkS2V5cywgY2hlY2tlZEtleXMsXG4gICAgICBvbkV4cGFuZCwgb25TZWxlY3QsIG9uQ2hlY2ssIHNob3dMaW5lLCBzaG93SWNvbiwgY2hlY2thYmxlLCBzZWxlY3RhYmxlLCBkZWZhdWx0RXhwYW5kQWxsLFxuICAgICAgZHJhZ2dhYmxlLCBkaXNhYmxlZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwidHJlZS12aWV3LWNvbnRhaW5lclwiIGNsYXNzTmFtZT17Y2xzTmFtZX0+XG4gICAgICAgIHshIW5vZGVzLmxlbmd0aCAmJlxuICAgICAgICA8VHJlZVxuICAgICAgICAgIGlkPXt0cmVlSWR9XG4gICAgICAgICAgY2xhc3NOYW1lPXt0cmVlQ2xhc3N9XG4gICAgICAgICAgZGVmYXVsdEV4cGFuZGVkS2V5cz17ZGVmYXVsdEV4cGFuZGVkS2V5c31cbiAgICAgICAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzPXtkZWZhdWx0U2VsZWN0ZWRLZXlzfVxuICAgICAgICAgIGRlZmF1bHRDaGVja2VkS2V5cz17ZGVmYXVsdENoZWNrZWRLZXlzfVxuICAgICAgICAgIGNoZWNrZWRLZXlzPXtjaGVja2VkS2V5c31cbiAgICAgICAgICBvbkV4cGFuZD17b25FeHBhbmR9XG4gICAgICAgICAgb25TZWxlY3Q9e29uU2VsZWN0fVxuICAgICAgICAgIG9uQ2hlY2s9e29uQ2hlY2t9XG4gICAgICAgICAgc2hvd0xpbmU9e3Nob3dMaW5lfVxuICAgICAgICAgIHNob3dJY29uPXtzaG93SWNvbn1cbiAgICAgICAgICBjaGVja2FibGU9e2NoZWNrYWJsZX1cbiAgICAgICAgICBzZWxlY3RhYmxlPXtzZWxlY3RhYmxlfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBkcmFnZ2FibGU9e2RyYWdnYWJsZX1cbiAgICAgICAgICBkZWZhdWx0RXhwYW5kQWxsPXtkZWZhdWx0RXhwYW5kQWxsfVxuICAgICAgICAgIG9uRHJvcD17dGhpcy5vbkRyYWdEcm9wfVxuICAgICAgICA+XG4gICAgICAgICAge25vZGVzfVxuICAgICAgICA8L1RyZWU+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==