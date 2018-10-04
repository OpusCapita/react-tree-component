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
import TreeCheckbox from './tree-checkbox.component';

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
    var _props = this.props,
        dataLookUpKey = _props.dataLookUpKey,
        dataLookUpValue = _props.dataLookUpValue,
        dataLookUpChildren = _props.dataLookUpChildren,
        iconClass = _props.iconClass,
        disabled = _props.disabled;

    var checkChildren = this.hasChildren;

    // Recursive function for collecting nodes:
    var mountNodes = function mountNodes(nodeList) {
      var list = [];
      nodeList.forEach(function (node) {
        if (!node[dataLookUpKey]) return false;
        // Leaf node
        if (!checkChildren(node)) {
          list.push( // eslint-disable-line function-paren-newline
          React.createElement(TreeNode, {
            title: node[dataLookUpValue],
            key: node[dataLookUpKey],
            className: '' + iconClass,
            icon: React.createElement(TreeCheckbox, { disabled: disabled })
          }));
        } else {
          // Parent node
          list.push( // eslint-disable-line function-paren-newline
          React.createElement(
            TreeNode,
            {
              title: node[dataLookUpValue],
              key: node[dataLookUpKey],
              className: '' + iconClass,
              icon: React.createElement(TreeCheckbox, { disabled: disabled })
            },
            mountNodes(node[dataLookUpChildren])
          ));
        }
        return false;
      });
      return list;
    };
    return mountNodes(this.props.treeData);
  };

  OCTreeView.prototype.render = function render() {
    var nodes = this.renderNodes();
    var clsName = this.props.className ? this.props.className + ' oc-react-tree' : 'oc-react-tree';
    var _props2 = this.props,
        treeId = _props2.treeId,
        className = _props2.className,
        defaultExpandedKeys = _props2.defaultExpandedKeys,
        defaultSelectedKeys = _props2.defaultSelectedKeys,
        defaultCheckedKeys = _props2.defaultCheckedKeys,
        checkedKeys = _props2.checkedKeys,
        onExpand = _props2.onExpand,
        onSelect = _props2.onSelect,
        onCheck = _props2.onCheck,
        showLine = _props2.showLine,
        showIcon = _props2.showIcon,
        checkable = _props2.checkable,
        selectable = _props2.selectable,
        defaultExpandAll = _props2.defaultExpandAll,
        draggable = _props2.draggable,
        disabled = _props2.disabled;


    return React.createElement(
      'div',
      { id: 'tree-view-container', className: clsName },
      !!nodes.length && React.createElement(
        Tree,
        {
          id: treeId,
          className: className,
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
  iconClass: 'carets',
  defaultExpandedKeys: [],
  defaultSelectedKeys: [],
  defaultCheckedKeys: [],
  onExpand: undefined,
  onSelect: undefined,
  onCheck: undefined,
  onDragDrop: undefined,
  showLine: false,
  disabled: false,
  showIcon: true,
  checkable: false,
  draggable: false,
  selectable: false,
  defaultExpandAll: false,
  // Customs
  dataLookUpKey: 'key',
  dataLookUpValue: 'parent',
  dataLookUpChildren: 'children',
  treeData: [],
  checkedKeys: [],
  className: ''
}, _temp2);
export { OCTreeView as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJUcmVlIiwiVHJlZU5vZGUiLCJUcmVlQ2hlY2tib3giLCJPQ1RyZWVWaWV3Iiwib25EcmFnRHJvcCIsImUiLCJwcm9wcyIsIlR5cGVFcnJvciIsImRyb3BLZXkiLCJub2RlIiwiZXZlbnRLZXkiLCJkcmFnS2V5IiwiZHJhZ05vZGUiLCJsb29wIiwiZGF0YSIsImtleSIsImNhbGxiYWNrIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsImFyciIsImNoaWxkcmVuIiwibmV3RGF0YSIsInRyZWVEYXRhIiwic2xpY2UiLCJkcmFnT2JqIiwic3BsaWNlIiwiZHJvcFRvR2FwIiwiYXIiLCJpIiwicHVzaCIsImhhc0NoaWxkcmVuIiwiZGF0YU9iamVjdCIsImRhdGFMb29rVXBDaGlsZHJlbiIsImxlbmd0aCIsInJlbmRlck5vZGVzIiwiZGF0YUxvb2tVcEtleSIsImRhdGFMb29rVXBWYWx1ZSIsImljb25DbGFzcyIsImRpc2FibGVkIiwiY2hlY2tDaGlsZHJlbiIsIm1vdW50Tm9kZXMiLCJub2RlTGlzdCIsImxpc3QiLCJyZW5kZXIiLCJub2RlcyIsImNsc05hbWUiLCJjbGFzc05hbWUiLCJ0cmVlSWQiLCJkZWZhdWx0RXhwYW5kZWRLZXlzIiwiZGVmYXVsdFNlbGVjdGVkS2V5cyIsImRlZmF1bHRDaGVja2VkS2V5cyIsImNoZWNrZWRLZXlzIiwib25FeHBhbmQiLCJvblNlbGVjdCIsIm9uQ2hlY2siLCJzaG93TGluZSIsInNob3dJY29uIiwiY2hlY2thYmxlIiwic2VsZWN0YWJsZSIsImRlZmF1bHRFeHBhbmRBbGwiLCJkcmFnZ2FibGUiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FB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SXBCQyx1QkFBcUIsRUFKRDtBQUtwQkMsc0JBQW9CLEVBTEE7QUFNcEJFLFlBQVVXLFNBTlU7QUFPcEJWLFlBQVVVLFNBUFU7QUFRcEJULFdBQVNTLFNBUlc7QUFTcEI1RCxjQUFZNEQsU0FUUTtBQVVwQlIsWUFBVSxLQVZVO0FBV3BCakIsWUFBVSxLQVhVO0FBWXBCa0IsWUFBVSxJQVpVO0FBYXBCQyxhQUFXLEtBYlM7QUFjcEJHLGFBQVcsS0FkUztBQWVwQkYsY0FBWSxLQWZRO0FBZ0JwQkMsb0JBQWtCLEtBaEJFO0FBaUJwQjtBQUNBeEIsaUJBQWUsS0FsQks7QUFtQnBCQyxtQkFBaUIsUUFuQkc7QUFvQnBCSixzQkFBb0IsVUFwQkE7QUFxQnBCVixZQUFVLEVBckJVO0FBc0JwQjZCLGVBQWEsRUF0Qk87QUF1QnBCTCxhQUFXO0FBdkJTLEM7U0EzQkg1QyxVIiwiZmlsZSI6InRyZWUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgVHJlZSwgeyBUcmVlTm9kZSB9IGZyb20gJ3JjLXRyZWUnO1xuaW1wb3J0ICdyYy10cmVlL2Fzc2V0cy9pbmRleC5jc3MnO1xuLy8gT3ZlcnJpZGUgZGVmYXVsdHMgcmMtdHJlZSBzdHlsZXNcbmltcG9ydCAnLi9vYy10cmVlLXN0eWxlcy5zY3NzJztcbmltcG9ydCBUcmVlQ2hlY2tib3ggZnJvbSAnLi90cmVlLWNoZWNrYm94LmNvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9DVHJlZVZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB0cmVlSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGljb25DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZWZhdWx0Q2hlY2tlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIG9uRXhwYW5kOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGVjazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25EcmFnRHJvcDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd0xpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dJY29uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjaGVja2FibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRyYWdnYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgIC8vIEN1c3RvbWlzYXRpb24gLS0gZGVmaW5lIHRoZSBkYXRhIGxvb2tVcEtleXMgYW5kIGxvb2tVcFZhbHVlc1xuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcbiAgICBkYXRhTG9va1VwS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRhdGFMb29rVXBWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hlY2tlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgdHJlZUlkOiAnZGVmYXVsdFRyZWUnLFxuICAgIGljb25DbGFzczogJ2NhcmV0cycsXG4gICAgZGVmYXVsdEV4cGFuZGVkS2V5czogW10sXG4gICAgZGVmYXVsdFNlbGVjdGVkS2V5czogW10sXG4gICAgZGVmYXVsdENoZWNrZWRLZXlzOiBbXSxcbiAgICBvbkV4cGFuZDogdW5kZWZpbmVkLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25DaGVjazogdW5kZWZpbmVkLFxuICAgIG9uRHJhZ0Ryb3A6IHVuZGVmaW5lZCxcbiAgICBzaG93TGluZTogZmFsc2UsXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIHNob3dJY29uOiB0cnVlLFxuICAgIGNoZWNrYWJsZTogZmFsc2UsXG4gICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBmYWxzZSxcbiAgICAvLyBDdXN0b21zXG4gICAgZGF0YUxvb2tVcEtleTogJ2tleScsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiAncGFyZW50JyxcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46ICdjaGlsZHJlbicsXG4gICAgdHJlZURhdGE6IFtdLFxuICAgIGNoZWNrZWRLZXlzOiBbXSxcbiAgICBjbGFzc05hbWU6ICcnLFxuICB9O1xuXG4gIG9uRHJhZ0Ryb3AgPSAoZSkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5vbkRyYWdEcm9wKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdvbkRyYWdEcm9wIGNhbGxiYWNrIGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgY29uc3QgZHJvcEtleSA9IGUubm9kZS5wcm9wcy5ldmVudEtleTtcbiAgICBjb25zdCBkcmFnS2V5ID0gZS5kcmFnTm9kZS5wcm9wcy5ldmVudEtleTtcblxuICAgIGNvbnN0IGxvb3AgPSAoZGF0YSwga2V5LCBjYWxsYmFjaykgPT4ge1xuICAgICAgZGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCwgYXJyKSA9PiB7XG4gICAgICAgIGlmIChpdGVtLmtleSA9PT0ga2V5KSByZXR1cm4gY2FsbGJhY2soaXRlbSwgaW5kZXgsIGFycik7XG4gICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSByZXR1cm4gbG9vcChpdGVtLmNoaWxkcmVuLCBrZXksIGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3QgbmV3RGF0YSA9IHRoaXMucHJvcHMudHJlZURhdGEuc2xpY2UoKTtcblxuICAgIGxldCBkcmFnT2JqO1xuICAgIGxvb3AobmV3RGF0YSwgZHJhZ0tleSwgKGl0ZW0sIGluZGV4LCBhcnIpID0+IHtcbiAgICAgIGFyci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgZHJhZ09iaiA9IGl0ZW07XG4gICAgfSk7XG5cbiAgICAvLyAuLiBpdGVtIGlzIGRyb3BwZWQgYmV0d2VlbiAyIGl0ZW1zXG4gICAgaWYgKGUuZHJvcFRvR2FwKSB7XG4gICAgICBsZXQgYXI7XG4gICAgICBsZXQgaTtcbiAgICAgIGxvb3AobmV3RGF0YSwgZHJvcEtleSwgKGl0ZW0sIGluZGV4LCBhcnIpID0+IHtcbiAgICAgICAgYXIgPSBhcnI7XG4gICAgICAgIGkgPSBpbmRleDtcbiAgICAgIH0pO1xuICAgICAgYXIuc3BsaWNlKGksIDAsIGRyYWdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb29wKG5ld0RhdGEsIGRyb3BLZXksIChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0uY2hpbGRyZW4gPSBpdGVtLmNoaWxkcmVuIHx8IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGl0ZW0uY2hpbGRyZW4ucHVzaChkcmFnT2JqKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMub25EcmFnRHJvcChuZXdEYXRhKTtcbiAgfTtcblxuICAvKiBoYXNDaGlsZHJlbiAtIGZ1bmN0aW9uICovXG4gIGhhc0NoaWxkcmVuID0gZGF0YU9iamVjdCA9PiAoKGRhdGFPYmplY3RbdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW5dXG4gICAgJiYgZGF0YU9iamVjdFt0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbl0ubGVuZ3RoID49IDFcbiAgKSk7XG5cbiAgLyogcmVuZGVyTm9kZXMgLSBmdW5jdGlvbiAqL1xuICByZW5kZXJOb2RlcygpIHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwVmFsdWUsIGRhdGFMb29rVXBDaGlsZHJlbiwgaWNvbkNsYXNzLCBkaXNhYmxlZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjaGVja0NoaWxkcmVuID0gdGhpcy5oYXNDaGlsZHJlbjtcblxuICAgIC8vIFJlY3Vyc2l2ZSBmdW5jdGlvbiBmb3IgY29sbGVjdGluZyBub2RlczpcbiAgICBjb25zdCBtb3VudE5vZGVzID0gKG5vZGVMaXN0KSA9PiB7XG4gICAgICBjb25zdCBsaXN0ID0gW107XG4gICAgICBub2RlTGlzdC5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIGlmICghbm9kZVtkYXRhTG9va1VwS2V5XSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyBMZWFmIG5vZGVcbiAgICAgICAgaWYgKCFjaGVja0NoaWxkcmVuKG5vZGUpKSB7XG4gICAgICAgICAgbGlzdC5wdXNoKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcbiAgICAgICAgICAgIDxUcmVlTm9kZVxuICAgICAgICAgICAgICB0aXRsZT17bm9kZVtkYXRhTG9va1VwVmFsdWVdfVxuICAgICAgICAgICAgICBrZXk9e25vZGVbZGF0YUxvb2tVcEtleV19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7aWNvbkNsYXNzfWB9XG4gICAgICAgICAgICAgIGljb249ezxUcmVlQ2hlY2tib3ggZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPn1cbiAgICAgICAgICAgIC8+KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBQYXJlbnQgbm9kZVxuICAgICAgICAgIGxpc3QucHVzaCggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jdGlvbi1wYXJlbi1uZXdsaW5lXG4gICAgICAgICAgICA8VHJlZU5vZGVcbiAgICAgICAgICAgICAgdGl0bGU9e25vZGVbZGF0YUxvb2tVcFZhbHVlXX1cbiAgICAgICAgICAgICAga2V5PXtub2RlW2RhdGFMb29rVXBLZXldfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2ljb25DbGFzc31gfVxuICAgICAgICAgICAgICBpY29uPXs8VHJlZUNoZWNrYm94IGRpc2FibGVkPXtkaXNhYmxlZH0gLz59XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHttb3VudE5vZGVzKG5vZGVbZGF0YUxvb2tVcENoaWxkcmVuXSl9XG4gICAgICAgICAgICA8L1RyZWVOb2RlPik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbGlzdDtcbiAgICB9O1xuICAgIHJldHVybiBtb3VudE5vZGVzKHRoaXMucHJvcHMudHJlZURhdGEpO1xuICB9XG5cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLnJlbmRlck5vZGVzKCk7XG4gICAgY29uc3QgY2xzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lID8gYCR7dGhpcy5wcm9wcy5jbGFzc05hbWV9IG9jLXJlYWN0LXRyZWVgIDogJ29jLXJlYWN0LXRyZWUnO1xuICAgIGNvbnN0IHtcbiAgICAgIHRyZWVJZCwgY2xhc3NOYW1lLCBkZWZhdWx0RXhwYW5kZWRLZXlzLCBkZWZhdWx0U2VsZWN0ZWRLZXlzLCBkZWZhdWx0Q2hlY2tlZEtleXMsIGNoZWNrZWRLZXlzLFxuICAgICAgb25FeHBhbmQsIG9uU2VsZWN0LCBvbkNoZWNrLCBzaG93TGluZSwgc2hvd0ljb24sIGNoZWNrYWJsZSwgc2VsZWN0YWJsZSwgZGVmYXVsdEV4cGFuZEFsbCxcbiAgICAgIGRyYWdnYWJsZSwgZGlzYWJsZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cInRyZWUtdmlldy1jb250YWluZXJcIiBjbGFzc05hbWU9e2Nsc05hbWV9PlxuICAgICAgICB7ISFub2Rlcy5sZW5ndGggJiZcbiAgICAgICAgPFRyZWVcbiAgICAgICAgICBpZD17dHJlZUlkfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIGRlZmF1bHRFeHBhbmRlZEtleXM9e2RlZmF1bHRFeHBhbmRlZEtleXN9XG4gICAgICAgICAgZGVmYXVsdFNlbGVjdGVkS2V5cz17ZGVmYXVsdFNlbGVjdGVkS2V5c31cbiAgICAgICAgICBkZWZhdWx0Q2hlY2tlZEtleXM9e2RlZmF1bHRDaGVja2VkS2V5c31cbiAgICAgICAgICBjaGVja2VkS2V5cz17Y2hlY2tlZEtleXN9XG4gICAgICAgICAgb25FeHBhbmQ9e29uRXhwYW5kfVxuICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH1cbiAgICAgICAgICBvbkNoZWNrPXtvbkNoZWNrfVxuICAgICAgICAgIHNob3dMaW5lPXtzaG93TGluZX1cbiAgICAgICAgICBzaG93SWNvbj17c2hvd0ljb259XG4gICAgICAgICAgY2hlY2thYmxlPXtjaGVja2FibGV9XG4gICAgICAgICAgc2VsZWN0YWJsZT17c2VsZWN0YWJsZX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgZHJhZ2dhYmxlPXtkcmFnZ2FibGV9XG4gICAgICAgICAgZGVmYXVsdEV4cGFuZEFsbD17ZGVmYXVsdEV4cGFuZEFsbH1cbiAgICAgICAgICBvbkRyb3A9e3RoaXMub25EcmFnRHJvcH1cbiAgICAgICAgPlxuICAgICAgICAgIHtub2Rlc31cbiAgICAgICAgPC9UcmVlPlxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=