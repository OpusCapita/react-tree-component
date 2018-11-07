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
      var _this$props = _this.props,
          onDragDrop = _this$props.onDragDrop,
          isDragDropLegal = _this$props.isDragDropLegal,
          treeData = _this$props.treeData;

      if (!onDragDrop) throw new TypeError('onDragDrop callback is not defined');

      // Calling isDragDropLegal callback to ensure that this move can be done
      if (isDragDropLegal && !isDragDropLegal(treeData, e)) return;

      var newData = _this.getUpdatedTree(_this.getTreeItem(e.dragNode.props.eventKey), e);
      onDragDrop(newData, e);
    }, _this.getUpdatedTree = function (dragItem, dragEvent) {
      var array = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.props.treeData;
      var parentFiltered = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var _this$props2 = _this.props,
          dataLookUpKey = _this$props2.dataLookUpKey,
          dataLookUpChildren = _this$props2.dataLookUpChildren;
      var dropToGap = dragEvent.dropToGap,
          node = dragEvent.node;

      var dropId = node && node.props.eventKey;
      var found = false;
      var newItems = array.slice();

      var addItemToArray = function addItemToArray(items) {
        var dropIndex = items.findIndex(function (child) {
          return child[dataLookUpKey] === dropId;
        });
        if (dropIndex > -1) {
          found = true;
          var newChildren = items.slice();
          newChildren.splice(dropIndex, 0, dragItem);
          return newChildren;
        }
        return items;
      };
      if (!parentFiltered && dragItem) {
        newItems = _this.removeItem(newItems, dragItem[dataLookUpKey]);
      }
      if (dropToGap) {
        newItems = addItemToArray(newItems);
      }

      if (!found) {
        for (var i = 0; i < newItems.length; i += 1) {
          var item = newItems[i];
          var children = item[dataLookUpChildren];

          if (!dropToGap && dropId === item[dataLookUpKey] && !found) {
            found = true;
            if (!children) item[dataLookUpChildren] = [];
            item[dataLookUpChildren].push(dragItem);
            break;
          } else if (children && dropToGap) {
            item[dataLookUpChildren] = addItemToArray(children);
          }
          if (!found && item[dataLookUpChildren]) {
            found = _this.getUpdatedTree(dragItem, dragEvent, item[dataLookUpChildren], true);
          }
        }
      }
      if (!found) return false;
      return newItems;
    }, _this.getTreeItem = function (id) {
      var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.treeData;
      var _this$props3 = _this.props,
          dataLookUpChildren = _this$props3.dataLookUpChildren,
          dataLookUpKey = _this$props3.dataLookUpKey;

      var found = array.find(function (item) {
        return item[dataLookUpKey] === id;
      });
      if (!found) {
        array.forEach(function (item) {
          if (item[dataLookUpChildren] && !found) {
            found = _this.getTreeItem(id, item[dataLookUpChildren]);
          }
        });
      }
      return found;
    }, _this.removeItem = function (array, id) {
      var _this$props4 = _this.props,
          dataLookUpKey = _this$props4.dataLookUpKey,
          dataLookUpChildren = _this$props4.dataLookUpChildren;

      var newItems = array.slice();
      var found = false;
      var isParent = function isParent(arr) {
        return arr.find(function (child) {
          return child[dataLookUpKey] === id;
        });
      };
      var filterChild = function filterChild(arr) {
        return arr.filter(function (child) {
          return child[dataLookUpKey] !== id;
        });
      };

      if (isParent(newItems)) {
        found = true;
        newItems = filterChild(newItems);
      }

      if (!found) {
        for (var i = 0; i < newItems.length; i += 1) {
          var item = newItems[i];

          if (item[dataLookUpChildren] && isParent(item[dataLookUpChildren])) {
            found = true;
            item[dataLookUpChildren] = filterChild(item[dataLookUpChildren]);
            break;
          }
          if (item[dataLookUpChildren] && !found) {
            found = _this.removeItem(item[dataLookUpChildren], id);
          }
        }
      }
      if (!found) return false;
      return newItems;
    }, _this.hasChildren = function (dataObject) {
      return dataObject[_this.props.dataLookUpChildren] && dataObject[_this.props.dataLookUpChildren].length >= 1;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Returns updated tree after Drag n' drop event
   * @param dragItem - dragged item
   * @param dragEvent - event
   * @param array - used recursively
   * @param parentFiltered - used recursively
   * @returns {*}
   */


  /**
   * Returns a tree item by ID
   * @param id
   * @param array - used recursively
   * @returns {Object}
   */


  /**
   * Remove item from given array
   * @param array
   * @param id
   * @returns array of filtered items
   */


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
            className: iconClass + ' leaf-node',
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
              className: iconClass + ' parent-node',
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
        disabled = _props2.disabled,
        selectedKeys = _props2.selectedKeys;


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
          selectedKeys: selectedKeys,
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
  isDragDropLegal: undefined,
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
  selectedKeys: [],
  className: ''
}, _temp2);
export { OCTreeView as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJUcmVlIiwiVHJlZU5vZGUiLCJUcmVlQ2hlY2tib3giLCJPQ1RyZWVWaWV3Iiwib25EcmFnRHJvcCIsImUiLCJwcm9wcyIsImlzRHJhZ0Ryb3BMZWdhbCIsInRyZWVEYXRhIiwiVHlwZUVycm9yIiwibmV3RGF0YSIsImdldFVwZGF0ZWRUcmVlIiwiZ2V0VHJlZUl0ZW0iLCJkcmFnTm9kZSIsImV2ZW50S2V5IiwiZHJhZ0l0ZW0iLCJkcmFnRXZlbnQiLCJhcnJheSIsInBhcmVudEZpbHRlcmVkIiwiZGF0YUxvb2tVcEtleSIsImRhdGFMb29rVXBDaGlsZHJlbiIsImRyb3BUb0dhcCIsIm5vZGUiLCJkcm9wSWQiLCJmb3VuZCIsIm5ld0l0ZW1zIiwic2xpY2UiLCJhZGRJdGVtVG9BcnJheSIsIml0ZW1zIiwiZHJvcEluZGV4IiwiZmluZEluZGV4IiwiY2hpbGQiLCJuZXdDaGlsZHJlbiIsInNwbGljZSIsInJlbW92ZUl0ZW0iLCJpIiwibGVuZ3RoIiwiaXRlbSIsImNoaWxkcmVuIiwicHVzaCIsImlkIiwiZmluZCIsImZvckVhY2giLCJpc1BhcmVudCIsImFyciIsImZpbHRlckNoaWxkIiwiZmlsdGVyIiwiaGFzQ2hpbGRyZW4iLCJkYXRhT2JqZWN0IiwicmVuZGVyTm9kZXMiLCJkYXRhTG9va1VwVmFsdWUiLCJpY29uQ2xhc3MiLCJkaXNhYmxlZCIsImNoZWNrQ2hpbGRyZW4iLCJtb3VudE5vZGVzIiwibm9kZUxpc3QiLCJsaXN0IiwicmVuZGVyIiwibm9kZXMiLCJjbHNOYW1lIiwiY2xhc3NOYW1lIiwidHJlZUlkIiwiZGVmYXVsdEV4cGFuZGVkS2V5cyIsImRlZmF1bHRTZWxlY3RlZEtleXMiLCJkZWZhdWx0Q2hlY2tlZEtleXMiLCJjaGVja2VkS2V5cyIsIm9uRXhwYW5kIiwib25TZWxlY3QiLCJvbkNoZWNrIiwic2hvd0xpbmUiLCJzaG93SWNvbiIsImNoZWNrYWJsZSIsInNlbGVjdGFibGUiLCJkZWZhdWx0RXhwYW5kQWxsIiwiZHJhZ2dhYmxlIiwic2VsZWN0ZWRLZXlzIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLElBQVAsSUFBZUMsUUFBZixRQUErQixTQUEvQjtBQUNBLE9BQU8sMEJBQVA7QUFDQTtBQUNBLE9BQU8sdUJBQVA7QUFDQSxPQUFPQyxZQUFQLE1BQXlCLDJCQUF6Qjs7SUFFcUJDLFU7Ozs7Ozs7Ozs7OztnS0F5RG5CQyxVLEdBQWEsVUFBQ0MsQ0FBRCxFQUFPO0FBQUEsd0JBQ2dDLE1BQUtDLEtBRHJDO0FBQUEsVUFDVkYsVUFEVSxlQUNWQSxVQURVO0FBQUEsVUFDRUcsZUFERixlQUNFQSxlQURGO0FBQUEsVUFDbUJDLFFBRG5CLGVBQ21CQSxRQURuQjs7QUFFbEIsVUFBSSxDQUFDSixVQUFMLEVBQWlCLE1BQU0sSUFBSUssU0FBSixDQUFjLG9DQUFkLENBQU47O0FBRWpCO0FBQ0EsVUFBSUYsbUJBQW1CLENBQUNBLGdCQUFnQkMsUUFBaEIsRUFBMEJILENBQTFCLENBQXhCLEVBQXNEOztBQUV0RCxVQUFNSyxVQUFVLE1BQUtDLGNBQUwsQ0FBb0IsTUFBS0MsV0FBTCxDQUFpQlAsRUFBRVEsUUFBRixDQUFXUCxLQUFYLENBQWlCUSxRQUFsQyxDQUFwQixFQUFpRVQsQ0FBakUsQ0FBaEI7QUFDQUQsaUJBQVdNLE9BQVgsRUFBb0JMLENBQXBCO0FBQ0QsSyxRQVVETSxjLEdBQWlCLFVBQUNJLFFBQUQsRUFBV0MsU0FBWCxFQUE4RTtBQUFBLFVBQXhEQyxLQUF3RCx1RUFBaEQsTUFBS1gsS0FBTCxDQUFXRSxRQUFxQztBQUFBLFVBQTNCVSxjQUEyQix1RUFBVixLQUFVO0FBQUEseUJBQy9DLE1BQUtaLEtBRDBDO0FBQUEsVUFDckZhLGFB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QixZQUFVLEtBWlU7QUFhcEJrQixZQUFVLElBYlU7QUFjcEJDLGFBQVcsS0FkUztBQWVwQkcsYUFBVyxLQWZTO0FBZ0JwQkYsY0FBWSxLQWhCUTtBQWlCcEJDLG9CQUFrQixLQWpCRTtBQWtCcEI7QUFDQXRELGlCQUFlLEtBbkJLO0FBb0JwQitCLG1CQUFpQixRQXBCRztBQXFCcEI5QixzQkFBb0IsVUFyQkE7QUFzQnBCWixZQUFVLEVBdEJVO0FBdUJwQnlELGVBQWEsRUF2Qk87QUF3QnBCVSxnQkFBYyxFQXhCTTtBQXlCcEJmLGFBQVc7QUF6QlMsQztTQTdCSHpELFUiLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBUcmVlLCB7IFRyZWVOb2RlIH0gZnJvbSAncmMtdHJlZSc7XG5pbXBvcnQgJ3JjLXRyZWUvYXNzZXRzL2luZGV4LmNzcyc7XG4vLyBPdmVycmlkZSBkZWZhdWx0cyByYy10cmVlIHN0eWxlc1xuaW1wb3J0ICcuL29jLXRyZWUtc3R5bGVzLnNjc3MnO1xuaW1wb3J0IFRyZWVDaGVja2JveCBmcm9tICcuL3RyZWUtY2hlY2tib3guY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0NUcmVlVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHRyZWVJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWNvbkNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlZmF1bHRFeHBhbmRlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGRlZmF1bHRTZWxlY3RlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGRlZmF1bHRDaGVja2VkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgb25FeHBhbmQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoZWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkRyYWdEcm9wOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBpc0RyYWdEcm9wTGVnYWw6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dMaW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93SWNvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hlY2thYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkcmFnZ2FibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAvLyBDdXN0b21pc2F0aW9uIC0tIGRlZmluZSB0aGUgZGF0YSBsb29rVXBLZXlzIGFuZCBsb29rVXBWYWx1ZXNcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksXG4gICAgZGF0YUxvb2tVcEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXRhTG9va1VwVmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoZWNrZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBzZWxlY3RlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgdHJlZUlkOiAnZGVmYXVsdFRyZWUnLFxuICAgIGljb25DbGFzczogJ2NhcmV0cycsXG4gICAgZGVmYXVsdEV4cGFuZGVkS2V5czogW10sXG4gICAgZGVmYXVsdFNlbGVjdGVkS2V5czogW10sXG4gICAgZGVmYXVsdENoZWNrZWRLZXlzOiBbXSxcbiAgICBvbkV4cGFuZDogdW5kZWZpbmVkLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25DaGVjazogdW5kZWZpbmVkLFxuICAgIG9uRHJhZ0Ryb3A6IHVuZGVmaW5lZCxcbiAgICBpc0RyYWdEcm9wTGVnYWw6IHVuZGVmaW5lZCxcbiAgICBzaG93TGluZTogZmFsc2UsXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIHNob3dJY29uOiB0cnVlLFxuICAgIGNoZWNrYWJsZTogZmFsc2UsXG4gICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBmYWxzZSxcbiAgICAvLyBDdXN0b21zXG4gICAgZGF0YUxvb2tVcEtleTogJ2tleScsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiAncGFyZW50JyxcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46ICdjaGlsZHJlbicsXG4gICAgdHJlZURhdGE6IFtdLFxuICAgIGNoZWNrZWRLZXlzOiBbXSxcbiAgICBzZWxlY3RlZEtleXM6IFtdLFxuICAgIGNsYXNzTmFtZTogJycsXG4gIH07XG5cbiAgb25EcmFnRHJvcCA9IChlKSA9PiB7XG4gICAgY29uc3QgeyBvbkRyYWdEcm9wLCBpc0RyYWdEcm9wTGVnYWwsIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghb25EcmFnRHJvcCkgdGhyb3cgbmV3IFR5cGVFcnJvcignb25EcmFnRHJvcCBjYWxsYmFjayBpcyBub3QgZGVmaW5lZCcpO1xuXG4gICAgLy8gQ2FsbGluZyBpc0RyYWdEcm9wTGVnYWwgY2FsbGJhY2sgdG8gZW5zdXJlIHRoYXQgdGhpcyBtb3ZlIGNhbiBiZSBkb25lXG4gICAgaWYgKGlzRHJhZ0Ryb3BMZWdhbCAmJiAhaXNEcmFnRHJvcExlZ2FsKHRyZWVEYXRhLCBlKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgbmV3RGF0YSA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5nZXRUcmVlSXRlbShlLmRyYWdOb2RlLnByb3BzLmV2ZW50S2V5KSwgZSk7XG4gICAgb25EcmFnRHJvcChuZXdEYXRhLCBlKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB1cGRhdGVkIHRyZWUgYWZ0ZXIgRHJhZyBuJyBkcm9wIGV2ZW50XG4gICAqIEBwYXJhbSBkcmFnSXRlbSAtIGRyYWdnZWQgaXRlbVxuICAgKiBAcGFyYW0gZHJhZ0V2ZW50IC0gZXZlbnRcbiAgICogQHBhcmFtIGFycmF5IC0gdXNlZCByZWN1cnNpdmVseVxuICAgKiBAcGFyYW0gcGFyZW50RmlsdGVyZWQgLSB1c2VkIHJlY3Vyc2l2ZWx5XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0VXBkYXRlZFRyZWUgPSAoZHJhZ0l0ZW0sIGRyYWdFdmVudCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCBwYXJlbnRGaWx0ZXJlZCA9IGZhbHNlKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwQ2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBkcm9wVG9HYXAsIG5vZGUgfSA9IGRyYWdFdmVudDtcbiAgICBjb25zdCBkcm9wSWQgPSBub2RlICYmIG5vZGUucHJvcHMuZXZlbnRLZXk7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgbGV0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcblxuICAgIGNvbnN0IGFkZEl0ZW1Ub0FycmF5ID0gKGl0ZW1zKSA9PiB7XG4gICAgICBjb25zdCBkcm9wSW5kZXggPSBpdGVtcy5maW5kSW5kZXgoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gPT09IGRyb3BJZCk7XG4gICAgICBpZiAoZHJvcEluZGV4ID4gLTEpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICBjb25zdCBuZXdDaGlsZHJlbiA9IGl0ZW1zLnNsaWNlKCk7XG4gICAgICAgIG5ld0NoaWxkcmVuLnNwbGljZShkcm9wSW5kZXgsIDAsIGRyYWdJdGVtKTtcbiAgICAgICAgcmV0dXJuIG5ld0NoaWxkcmVuO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH07XG4gICAgaWYgKCFwYXJlbnRGaWx0ZXJlZCAmJiBkcmFnSXRlbSkge1xuICAgICAgbmV3SXRlbXMgPSB0aGlzLnJlbW92ZUl0ZW0obmV3SXRlbXMsIGRyYWdJdGVtW2RhdGFMb29rVXBLZXldKTtcbiAgICB9XG4gICAgaWYgKGRyb3BUb0dhcCkge1xuICAgICAgbmV3SXRlbXMgPSBhZGRJdGVtVG9BcnJheShuZXdJdGVtcyk7XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dO1xuXG4gICAgICAgIGlmICghZHJvcFRvR2FwICYmIGRyb3BJZCA9PT0gaXRlbVtkYXRhTG9va1VwS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgaWYgKCFjaGlsZHJlbikgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dID0gW107XG4gICAgICAgICAgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLnB1c2goZHJhZ0l0ZW0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkcmVuICYmIGRyb3BUb0dhcCkge1xuICAgICAgICAgIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSA9IGFkZEl0ZW1Ub0FycmF5KGNoaWxkcmVuKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvdW5kICYmIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRVcGRhdGVkVHJlZShkcmFnSXRlbSwgZHJhZ0V2ZW50LCBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0sIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB0cmVlIGl0ZW0gYnkgSURcbiAgICogQHBhcmFtIGlkXG4gICAqIEBwYXJhbSBhcnJheSAtIHVzZWQgcmVjdXJzaXZlbHlcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIGdldFRyZWVJdGVtID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEpID0+IHtcbiAgICBjb25zdCB7IGRhdGFMb29rVXBDaGlsZHJlbiwgZGF0YUxvb2tVcEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgZm91bmQgPSBhcnJheS5maW5kKGl0ZW0gPT4gaXRlbVtkYXRhTG9va1VwS2V5XSA9PT0gaWQpO1xuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmQ7XG4gIH07XG5cblxuICAvKipcbiAgICogUmVtb3ZlIGl0ZW0gZnJvbSBnaXZlbiBhcnJheVxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIGlkXG4gICAqIEByZXR1cm5zIGFycmF5IG9mIGZpbHRlcmVkIGl0ZW1zXG4gICAqL1xuICByZW1vdmVJdGVtID0gKGFycmF5LCBpZCkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcENoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgY29uc3QgaXNQYXJlbnQgPSBhcnIgPT4gYXJyLmZpbmQoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gPT09IGlkKTtcbiAgICBjb25zdCBmaWx0ZXJDaGlsZCA9IGFyciA9PiBhcnIuZmlsdGVyKGNoaWxkID0+IGNoaWxkW2RhdGFMb29rVXBLZXldICE9PSBpZCk7XG5cbiAgICBpZiAoaXNQYXJlbnQobmV3SXRlbXMpKSB7XG4gICAgICBmb3VuZCA9IHRydWU7XG4gICAgICBuZXdJdGVtcyA9IGZpbHRlckNoaWxkKG5ld0l0ZW1zKTtcbiAgICB9XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcblxuICAgICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmIGlzUGFyZW50KGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSkpIHtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dID0gZmlsdGVyQ2hpbGQoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5yZW1vdmVJdGVtKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSwgaWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyogaGFzQ2hpbGRyZW4gLSBmdW5jdGlvbiAqL1xuICBoYXNDaGlsZHJlbiA9IGRhdGFPYmplY3QgPT4gKChkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXVxuICAgICYmIGRhdGFPYmplY3RbdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW5dLmxlbmd0aCA+PSAxXG4gICkpO1xuXG4gIC8qIHJlbmRlck5vZGVzIC0gZnVuY3Rpb24gKi9cbiAgcmVuZGVyTm9kZXMoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcFZhbHVlLCBkYXRhTG9va1VwQ2hpbGRyZW4sIGljb25DbGFzcywgZGlzYWJsZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2hlY2tDaGlsZHJlbiA9IHRoaXMuaGFzQ2hpbGRyZW47XG5cbiAgICAvLyBSZWN1cnNpdmUgZnVuY3Rpb24gZm9yIGNvbGxlY3Rpbmcgbm9kZXM6XG4gICAgY29uc3QgbW91bnROb2RlcyA9IChub2RlTGlzdCkgPT4ge1xuICAgICAgY29uc3QgbGlzdCA9IFtdO1xuICAgICAgbm9kZUxpc3QuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAoIW5vZGVbZGF0YUxvb2tVcEtleV0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gTGVhZiBub2RlXG4gICAgICAgIGlmICghY2hlY2tDaGlsZHJlbihub2RlKSkge1xuICAgICAgICAgIGxpc3QucHVzaCggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jdGlvbi1wYXJlbi1uZXdsaW5lXG4gICAgICAgICAgICA8VHJlZU5vZGVcbiAgICAgICAgICAgICAgdGl0bGU9e25vZGVbZGF0YUxvb2tVcFZhbHVlXX1cbiAgICAgICAgICAgICAga2V5PXtub2RlW2RhdGFMb29rVXBLZXldfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2ljb25DbGFzc30gbGVhZi1ub2RlYH1cbiAgICAgICAgICAgICAgaWNvbj17PFRyZWVDaGVja2JveCBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+fVxuICAgICAgICAgICAgLz4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFBhcmVudCBub2RlXG4gICAgICAgICAgbGlzdC5wdXNoKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcbiAgICAgICAgICAgIDxUcmVlTm9kZVxuICAgICAgICAgICAgICB0aXRsZT17bm9kZVtkYXRhTG9va1VwVmFsdWVdfVxuICAgICAgICAgICAgICBrZXk9e25vZGVbZGF0YUxvb2tVcEtleV19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7aWNvbkNsYXNzfSBwYXJlbnQtbm9kZWB9XG4gICAgICAgICAgICAgIGljb249ezxUcmVlQ2hlY2tib3ggZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge21vdW50Tm9kZXMobm9kZVtkYXRhTG9va1VwQ2hpbGRyZW5dKX1cbiAgICAgICAgICAgIDwvVHJlZU5vZGU+KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBsaXN0O1xuICAgIH07XG4gICAgcmV0dXJuIG1vdW50Tm9kZXModGhpcy5wcm9wcy50cmVlRGF0YSk7XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBub2RlcyA9IHRoaXMucmVuZGVyTm9kZXMoKTtcbiAgICBjb25zdCBjbHNOYW1lID0gdGhpcy5wcm9wcy5jbGFzc05hbWUgPyBgJHt0aGlzLnByb3BzLmNsYXNzTmFtZX0gb2MtcmVhY3QtdHJlZWAgOiAnb2MtcmVhY3QtdHJlZSc7XG5cbiAgICBjb25zdCB7XG4gICAgICB0cmVlSWQsIGNsYXNzTmFtZSwgZGVmYXVsdEV4cGFuZGVkS2V5cywgZGVmYXVsdFNlbGVjdGVkS2V5cywgZGVmYXVsdENoZWNrZWRLZXlzLCBjaGVja2VkS2V5cyxcbiAgICAgIG9uRXhwYW5kLCBvblNlbGVjdCwgb25DaGVjaywgc2hvd0xpbmUsIHNob3dJY29uLCBjaGVja2FibGUsIHNlbGVjdGFibGUsIGRlZmF1bHRFeHBhbmRBbGwsXG4gICAgICBkcmFnZ2FibGUsIGRpc2FibGVkLCBzZWxlY3RlZEtleXMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cInRyZWUtdmlldy1jb250YWluZXJcIiBjbGFzc05hbWU9e2Nsc05hbWV9PlxuICAgICAgICB7ISFub2Rlcy5sZW5ndGggJiZcbiAgICAgICAgPFRyZWVcbiAgICAgICAgICBpZD17dHJlZUlkfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIGRlZmF1bHRFeHBhbmRlZEtleXM9e2RlZmF1bHRFeHBhbmRlZEtleXN9XG4gICAgICAgICAgZGVmYXVsdFNlbGVjdGVkS2V5cz17ZGVmYXVsdFNlbGVjdGVkS2V5c31cbiAgICAgICAgICBkZWZhdWx0Q2hlY2tlZEtleXM9e2RlZmF1bHRDaGVja2VkS2V5c31cbiAgICAgICAgICBjaGVja2VkS2V5cz17Y2hlY2tlZEtleXN9XG4gICAgICAgICAgb25FeHBhbmQ9e29uRXhwYW5kfVxuICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH1cbiAgICAgICAgICBvbkNoZWNrPXtvbkNoZWNrfVxuICAgICAgICAgIHNob3dMaW5lPXtzaG93TGluZX1cbiAgICAgICAgICBzaG93SWNvbj17c2hvd0ljb259XG4gICAgICAgICAgY2hlY2thYmxlPXtjaGVja2FibGV9XG4gICAgICAgICAgc2VsZWN0ZWRLZXlzPXtzZWxlY3RlZEtleXN9XG4gICAgICAgICAgc2VsZWN0YWJsZT17c2VsZWN0YWJsZX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgZHJhZ2dhYmxlPXtkcmFnZ2FibGV9XG4gICAgICAgICAgZGVmYXVsdEV4cGFuZEFsbD17ZGVmYXVsdEV4cGFuZEFsbH1cbiAgICAgICAgICBvbkRyb3A9e3RoaXMub25EcmFnRHJvcH1cbiAgICAgICAgPlxuICAgICAgICAgIHtub2Rlc31cbiAgICAgICAgPC9UcmVlPlxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=