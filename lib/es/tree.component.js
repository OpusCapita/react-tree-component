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
import CheckboxIcon from './checkbox-icon.component';

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
    }, _this.isChildChecked = function (node) {
      var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var _this$props = _this.props,
          dataLookUpChildren = _this$props.dataLookUpChildren,
          dataLookUpKey = _this$props.dataLookUpKey;

      var children = arr.length ? arr : node[dataLookUpChildren];
      var found = children.find(function (child) {
        return _this.isChecked(child[dataLookUpKey]);
      });

      if (!found) {
        children.forEach(function (child) {
          if (child[dataLookUpChildren] && !found) {
            found = _this.isChildChecked(child, child[dataLookUpChildren]);
          }
        });
      }
      return !!found;
    }, _this.isChecked = function (key) {
      return _this.props.checkedKeys.includes(key) || _this.props.defaultCheckedKeys.includes(key);
    }, _this.hasChildren = function (dataObject) {
      return dataObject[_this.props.dataLookUpChildren] && dataObject[_this.props.dataLookUpChildren].length >= 1;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /* hasChildren - function */


  /* renderNodes - function */
  OCTreeView.prototype.renderNodes = function renderNodes() {
    var _this2 = this;

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
            icon: React.createElement(CheckboxIcon, {
              checked: _this2.isChecked(node[dataLookUpKey]),
              halfChecked: false,
              disabled: disabled
            })
          }));
        } else {
          // Parent node
          var isHalfChecked = _this2.isChecked(node[dataLookUpKey]) ? false : _this2.isChildChecked(node);

          list.push( // eslint-disable-line function-paren-newline
          React.createElement(
            TreeNode,
            {
              title: node[dataLookUpValue],
              key: node[dataLookUpKey],
              className: '' + iconClass,
              icon: React.createElement(CheckboxIcon, {
                checked: _this2.isChecked(node[dataLookUpKey]),
                halfChecked: isHalfChecked,
                disabled: disabled
              })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJUcmVlIiwiVHJlZU5vZGUiLCJDaGVja2JveEljb24iLCJPQ1RyZWVWaWV3Iiwib25EcmFnRHJvcCIsImUiLCJwcm9wcyIsIlR5cGVFcnJvciIsImRyb3BLZXkiLCJub2RlIiwiZXZlbnRLZXkiLCJkcmFnS2V5IiwiZHJhZ05vZGUiLCJsb29wIiwiZGF0YSIsImtleSIsImNhbGxiYWNrIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsImFyciIsImNoaWxkcmVuIiwibmV3RGF0YSIsInRyZWVEYXRhIiwic2xpY2UiLCJkcmFnT2JqIiwic3BsaWNlIiwiZHJvcFRvR2FwIiwiYXIiLCJpIiwicHVzaCIsImlzQ2hpbGRDaGVja2VkIiwiZGF0YUxvb2tVcENoaWxkcmVuIiwiZGF0YUxvb2tVcEtleSIsImxlbmd0aCIsImZvdW5kIiwiZmluZCIsImlzQ2hlY2tlZCIsImNoaWxkIiwiY2hlY2tlZEtleXMiLCJpbmNsdWRlcyIsImRlZmF1bHRDaGVja2VkS2V5cyIsImhhc0NoaWxkcmVuIiwiZGF0YU9iamVjdCIsInJlbmRlck5vZGVzIiwiZGF0YUxvb2tVcFZhbHVlIiwiaWNvbkNsYXNzIiwiZGlzYWJsZWQiLCJjaGVja0NoaWxkcmVuIiwibW91bnROb2RlcyIsIm5vZGVMaXN0IiwibGlzdCIsImlzSGFsZkNoZWNrZWQiLCJyZW5kZXIiLCJub2RlcyIsImNsc05hbWUiLCJjbGFzc05hbWUiLCJ0cmVlSWQiLCJkZWZhdWx0RXhwYW5kZWRLZXlzIiwiZGVmYXVsdFNlbGVjdGVkS2V5cyIsIm9uRXhwYW5kIiwib25TZWxlY3QiLCJvbkNoZWNrIiwic2hvd0xpbmUiLCJzaG93SWNvbiIsImNoZWNrYWJsZSIsInNlbGVjdGFibGUiLCJkZWZhdWx0RXhwYW5kQWxsIiwiZHJhZ2dhYmxlIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCJd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QW1CR2tEO0FBbkJIO0FBRkYsS0FERjtBQTJCRCxHOzs7RUFsTnFDeEQsTUFBTXVFLGEsVUEyQnJDQyxZLEdBQWU7QUFDcEJiLFVBQVEsYUFEWTtBQUVwQlgsYUFBVyxRQUZTO0FBR3BCWSx1QkFBcUIsRUFIRDtBQUlwQkMsdUJBQXFCLEVBSkQ7QUFLcEJsQixzQkFBb0IsRUFMQTtBQU1wQm1CLFlBQVVXLFNBTlU7QUFPcEJWLFlBQVVVLFNBUFU7QUFRcEJULFdBQVNTLFNBUlc7QUFTcEJuRSxjQUFZbUUsU0FUUTtBQVVwQlIsWUFBVSxLQVZVO0FBV3BCaEIsWUFBVSxLQVhVO0FBWXBCaUIsWUFBVSxJQVpVO0FBYXBCQyxhQUFXLEtBYlM7QUFjcEJHLGFBQVcsS0FkUztBQWVwQkYsY0FBWSxLQWZRO0FBZ0JwQkMsb0JBQWtCLEtBaEJFO0FBaUJwQjtBQUNBbEMsaUJBQWUsS0FsQks7QUFtQnBCWSxtQkFBaUIsUUFuQkc7QUFvQnBCYixzQkFBb0IsVUFwQkE7QUFxQnBCVCxZQUFVLEVBckJVO0FBc0JwQmdCLGVBQWEsRUF0Qk87QUF1QnBCaUIsYUFBVztBQXZCUyxDO1NBM0JIckQsVSIsImZpbGUiOiJ0cmVlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFRyZWUsIHsgVHJlZU5vZGUgfSBmcm9tICdyYy10cmVlJztcbmltcG9ydCAncmMtdHJlZS9hc3NldHMvaW5kZXguY3NzJztcbi8vIE92ZXJyaWRlIGRlZmF1bHRzIHJjLXRyZWUgc3R5bGVzXG5pbXBvcnQgJy4vb2MtdHJlZS1zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgQ2hlY2tib3hJY29uIGZyb20gJy4vY2hlY2tib3gtaWNvbi5jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPQ1RyZWVWaWV3IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgdHJlZUlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpY29uQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdEV4cGFuZGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgZGVmYXVsdFNlbGVjdGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgZGVmYXVsdENoZWNrZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBvbkV4cGFuZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRHJhZ0Ryb3A6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dMaW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93SWNvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hlY2thYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkcmFnZ2FibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAvLyBDdXN0b21pc2F0aW9uIC0tIGRlZmluZSB0aGUgZGF0YSBsb29rVXBLZXlzIGFuZCBsb29rVXBWYWx1ZXNcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksXG4gICAgZGF0YUxvb2tVcEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXRhTG9va1VwVmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoZWNrZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHRyZWVJZDogJ2RlZmF1bHRUcmVlJyxcbiAgICBpY29uQ2xhc3M6ICdjYXJldHMnLFxuICAgIGRlZmF1bHRFeHBhbmRlZEtleXM6IFtdLFxuICAgIGRlZmF1bHRTZWxlY3RlZEtleXM6IFtdLFxuICAgIGRlZmF1bHRDaGVja2VkS2V5czogW10sXG4gICAgb25FeHBhbmQ6IHVuZGVmaW5lZCxcbiAgICBvblNlbGVjdDogdW5kZWZpbmVkLFxuICAgIG9uQ2hlY2s6IHVuZGVmaW5lZCxcbiAgICBvbkRyYWdEcm9wOiB1bmRlZmluZWQsXG4gICAgc2hvd0xpbmU6IGZhbHNlLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBzaG93SWNvbjogdHJ1ZSxcbiAgICBjaGVja2FibGU6IGZhbHNlLFxuICAgIGRyYWdnYWJsZTogZmFsc2UsXG4gICAgc2VsZWN0YWJsZTogZmFsc2UsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogZmFsc2UsXG4gICAgLy8gQ3VzdG9tc1xuICAgIGRhdGFMb29rVXBLZXk6ICdrZXknLFxuICAgIGRhdGFMb29rVXBWYWx1ZTogJ3BhcmVudCcsXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiAnY2hpbGRyZW4nLFxuICAgIHRyZWVEYXRhOiBbXSxcbiAgICBjaGVja2VkS2V5czogW10sXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgfTtcblxuXG4gIG9uRHJhZ0Ryb3AgPSAoZSkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5vbkRyYWdEcm9wKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdvbkRyYWdEcm9wIGNhbGxiYWNrIGlzIG5vdCBkZWZpbmVkJyk7XG5cbiAgICBjb25zdCBkcm9wS2V5ID0gZS5ub2RlLnByb3BzLmV2ZW50S2V5O1xuICAgIGNvbnN0IGRyYWdLZXkgPSBlLmRyYWdOb2RlLnByb3BzLmV2ZW50S2V5O1xuXG4gICAgY29uc3QgbG9vcCA9IChkYXRhLCBrZXksIGNhbGxiYWNrKSA9PiB7XG4gICAgICBkYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4LCBhcnIpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0ua2V5ID09PSBrZXkpIHJldHVybiBjYWxsYmFjayhpdGVtLCBpbmRleCwgYXJyKTtcbiAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHJldHVybiBsb29wKGl0ZW0uY2hpbGRyZW4sIGtleSwgY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBuZXdEYXRhID0gdGhpcy5wcm9wcy50cmVlRGF0YS5zbGljZSgpO1xuXG4gICAgbGV0IGRyYWdPYmo7XG4gICAgbG9vcChuZXdEYXRhLCBkcmFnS2V5LCAoaXRlbSwgaW5kZXgsIGFycikgPT4ge1xuICAgICAgYXJyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBkcmFnT2JqID0gaXRlbTtcbiAgICB9KTtcblxuICAgIC8vIC4uIGl0ZW0gaXMgZHJvcHBlZCBiZXR3ZWVuIDIgaXRlbXNcbiAgICBpZiAoZS5kcm9wVG9HYXApIHtcbiAgICAgIGxldCBhcjtcbiAgICAgIGxldCBpO1xuICAgICAgbG9vcChuZXdEYXRhLCBkcm9wS2V5LCAoaXRlbSwgaW5kZXgsIGFycikgPT4ge1xuICAgICAgICBhciA9IGFycjtcbiAgICAgICAgaSA9IGluZGV4O1xuICAgICAgfSk7XG4gICAgICBhci5zcGxpY2UoaSwgMCwgZHJhZ09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvb3AobmV3RGF0YSwgZHJvcEtleSwgKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5jaGlsZHJlbiA9IGl0ZW0uY2hpbGRyZW4gfHwgW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgaXRlbS5jaGlsZHJlbi5wdXNoKGRyYWdPYmopO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5vbkRyYWdEcm9wKG5ld0RhdGEpO1xuICB9O1xuXG4gIGlzQ2hpbGRDaGVja2VkID0gKG5vZGUsIGFyciA9IFtdKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwQ2hpbGRyZW4sIGRhdGFMb29rVXBLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBhcnIubGVuZ3RoID8gYXJyIDogbm9kZVtkYXRhTG9va1VwQ2hpbGRyZW5dO1xuICAgIGxldCBmb3VuZCA9IGNoaWxkcmVuLmZpbmQoY2hpbGQgPT4gdGhpcy5pc0NoZWNrZWQoY2hpbGRbZGF0YUxvb2tVcEtleV0pKTtcblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZFtkYXRhTG9va1VwQ2hpbGRyZW5dICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5pc0NoaWxkQ2hlY2tlZChjaGlsZCwgY2hpbGRbZGF0YUxvb2tVcENoaWxkcmVuXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gISFmb3VuZDtcbiAgfTtcblxuICBpc0NoZWNrZWQgPSBrZXkgPT5cbiAgICB0aGlzLnByb3BzLmNoZWNrZWRLZXlzLmluY2x1ZGVzKGtleSkgfHwgdGhpcy5wcm9wcy5kZWZhdWx0Q2hlY2tlZEtleXMuaW5jbHVkZXMoa2V5KTtcblxuICAvKiBoYXNDaGlsZHJlbiAtIGZ1bmN0aW9uICovXG4gIGhhc0NoaWxkcmVuID0gZGF0YU9iamVjdCA9PiAoKGRhdGFPYmplY3RbdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW5dXG4gICAgJiYgZGF0YU9iamVjdFt0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbl0ubGVuZ3RoID49IDFcbiAgKSk7XG5cbiAgLyogcmVuZGVyTm9kZXMgLSBmdW5jdGlvbiAqL1xuICByZW5kZXJOb2RlcygpIHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwVmFsdWUsIGRhdGFMb29rVXBDaGlsZHJlbiwgaWNvbkNsYXNzLCBkaXNhYmxlZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjaGVja0NoaWxkcmVuID0gdGhpcy5oYXNDaGlsZHJlbjtcblxuICAgIC8vIFJlY3Vyc2l2ZSBmdW5jdGlvbiBmb3IgY29sbGVjdGluZyBub2RlczpcbiAgICBjb25zdCBtb3VudE5vZGVzID0gKG5vZGVMaXN0KSA9PiB7XG4gICAgICBjb25zdCBsaXN0ID0gW107XG4gICAgICBub2RlTGlzdC5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIGlmICghbm9kZVtkYXRhTG9va1VwS2V5XSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyBMZWFmIG5vZGVcbiAgICAgICAgaWYgKCFjaGVja0NoaWxkcmVuKG5vZGUpKSB7XG4gICAgICAgICAgbGlzdC5wdXNoKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcbiAgICAgICAgICAgIDxUcmVlTm9kZVxuICAgICAgICAgICAgICB0aXRsZT17bm9kZVtkYXRhTG9va1VwVmFsdWVdfVxuICAgICAgICAgICAgICBrZXk9e25vZGVbZGF0YUxvb2tVcEtleV19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7aWNvbkNsYXNzfWB9XG4gICAgICAgICAgICAgIGljb249e1xuICAgICAgICAgICAgICAgIDxDaGVja2JveEljb25cbiAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuaXNDaGVja2VkKG5vZGVbZGF0YUxvb2tVcEtleV0pfVxuICAgICAgICAgICAgICAgICAgaGFsZkNoZWNrZWQ9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBQYXJlbnQgbm9kZVxuICAgICAgICAgIGNvbnN0IGlzSGFsZkNoZWNrZWQgPVxuICAgICAgICAgICAgdGhpcy5pc0NoZWNrZWQobm9kZVtkYXRhTG9va1VwS2V5XSkgPyBmYWxzZSA6IHRoaXMuaXNDaGlsZENoZWNrZWQobm9kZSk7XG5cbiAgICAgICAgICBsaXN0LnB1c2goIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuY3Rpb24tcGFyZW4tbmV3bGluZVxuICAgICAgICAgICAgPFRyZWVOb2RlXG4gICAgICAgICAgICAgIHRpdGxlPXtub2RlW2RhdGFMb29rVXBWYWx1ZV19XG4gICAgICAgICAgICAgIGtleT17bm9kZVtkYXRhTG9va1VwS2V5XX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtpY29uQ2xhc3N9YH1cbiAgICAgICAgICAgICAgaWNvbj17XG4gICAgICAgICAgICAgICAgPENoZWNrYm94SWNvblxuICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5pc0NoZWNrZWQobm9kZVtkYXRhTG9va1VwS2V5XSl9XG4gICAgICAgICAgICAgICAgICBoYWxmQ2hlY2tlZD17aXNIYWxmQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHttb3VudE5vZGVzKG5vZGVbZGF0YUxvb2tVcENoaWxkcmVuXSl9XG4gICAgICAgICAgICA8L1RyZWVOb2RlPik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbGlzdDtcbiAgICB9O1xuICAgIHJldHVybiBtb3VudE5vZGVzKHRoaXMucHJvcHMudHJlZURhdGEpO1xuICB9XG5cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLnJlbmRlck5vZGVzKCk7XG4gICAgY29uc3QgY2xzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lID8gYCR7dGhpcy5wcm9wcy5jbGFzc05hbWV9IG9jLXJlYWN0LXRyZWVgIDogJ29jLXJlYWN0LXRyZWUnO1xuICAgIGNvbnN0IHtcbiAgICAgIHRyZWVJZCwgY2xhc3NOYW1lLCBkZWZhdWx0RXhwYW5kZWRLZXlzLCBkZWZhdWx0U2VsZWN0ZWRLZXlzLCBkZWZhdWx0Q2hlY2tlZEtleXMsIGNoZWNrZWRLZXlzLFxuICAgICAgb25FeHBhbmQsIG9uU2VsZWN0LCBvbkNoZWNrLCBzaG93TGluZSwgc2hvd0ljb24sIGNoZWNrYWJsZSwgc2VsZWN0YWJsZSwgZGVmYXVsdEV4cGFuZEFsbCxcbiAgICAgIGRyYWdnYWJsZSwgZGlzYWJsZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cInRyZWUtdmlldy1jb250YWluZXJcIiBjbGFzc05hbWU9e2Nsc05hbWV9PlxuICAgICAgICB7ISFub2Rlcy5sZW5ndGggJiZcbiAgICAgICAgPFRyZWVcbiAgICAgICAgICBpZD17dHJlZUlkfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIGRlZmF1bHRFeHBhbmRlZEtleXM9e2RlZmF1bHRFeHBhbmRlZEtleXN9XG4gICAgICAgICAgZGVmYXVsdFNlbGVjdGVkS2V5cz17ZGVmYXVsdFNlbGVjdGVkS2V5c31cbiAgICAgICAgICBkZWZhdWx0Q2hlY2tlZEtleXM9e2RlZmF1bHRDaGVja2VkS2V5c31cbiAgICAgICAgICBjaGVja2VkS2V5cz17Y2hlY2tlZEtleXN9XG4gICAgICAgICAgb25FeHBhbmQ9e29uRXhwYW5kfVxuICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH1cbiAgICAgICAgICBvbkNoZWNrPXtvbkNoZWNrfVxuICAgICAgICAgIHNob3dMaW5lPXtzaG93TGluZX1cbiAgICAgICAgICBzaG93SWNvbj17c2hvd0ljb259XG4gICAgICAgICAgY2hlY2thYmxlPXtjaGVja2FibGV9XG4gICAgICAgICAgc2VsZWN0YWJsZT17c2VsZWN0YWJsZX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgZHJhZ2dhYmxlPXtkcmFnZ2FibGV9XG4gICAgICAgICAgZGVmYXVsdEV4cGFuZEFsbD17ZGVmYXVsdEV4cGFuZEFsbH1cbiAgICAgICAgICBvbkRyb3A9e3RoaXMub25EcmFnRHJvcH1cbiAgICAgICAgPlxuICAgICAgICAgIHtub2Rlc31cbiAgICAgICAgPC9UcmVlPlxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=