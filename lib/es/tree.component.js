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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.onContainerClick = function (e) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          deselectOnContainerClick = _this$props.deselectOnContainerClick;
      // clicking outside item

      if (deselectOnContainerClick && e.target.tagName !== 'SPAN') {
        onSelect([]);
      }
    }, _this.onDragDrop = function (e) {
      var _this$props2 = _this.props,
          onDragDrop = _this$props2.onDragDrop,
          isDragDropLegal = _this$props2.isDragDropLegal,
          treeData = _this$props2.treeData;

      if (!onDragDrop) throw new TypeError('onDragDrop callback is not defined');

      // Calling isDragDropLegal callback to ensure that this move can be done
      if (isDragDropLegal && !isDragDropLegal(treeData, e)) return;

      var newData = _this.getUpdatedTree(_this.getTreeItem(e.dragNode.props.eventKey), e);
      onDragDrop(newData, e);
    }, _this.getUpdatedTree = function (dragItem, dragEvent) {
      var array = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.props.treeData;
      var parentFiltered = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var _this$props3 = _this.props,
          dataLookUpKey = _this$props3.dataLookUpKey,
          dataLookUpChildren = _this$props3.dataLookUpChildren;
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
      var _this$props4 = _this.props,
          dataLookUpChildren = _this$props4.dataLookUpChildren,
          dataLookUpKey = _this$props4.dataLookUpKey;

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
      var _this$props5 = _this.props,
          dataLookUpKey = _this$props5.dataLookUpKey,
          dataLookUpChildren = _this$props5.dataLookUpChildren;

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
        selectedKeys = _props2.selectedKeys,
        expandedKeys = _props2.expandedKeys;


    return React.createElement(
      'div',
      { id: 'tree-view-container', className: clsName, onClick: this.onContainerClick },
      !!nodes.length && React.createElement(
        Tree,
        {
          id: treeId,
          className: className,
          defaultExpandedKeys: defaultExpandedKeys,
          defaultSelectedKeys: defaultSelectedKeys,
          defaultCheckedKeys: defaultCheckedKeys,
          checkedKeys: checkedKeys,
          selectedKeys: selectedKeys,
          expandedKeys: expandedKeys,
          onExpand: onExpand,
          onSelect: onSelect,
          onCheck: onCheck,
          onDrop: this.onDragDrop,
          checkable: checkable,
          selectable: selectable,
          draggable: draggable,
          showLine: showLine,
          showIcon: showIcon,
          disabled: disabled,
          defaultExpandAll: defaultExpandAll
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
  expandedKeys: [],
  className: '',
  deselectOnContainerClick: true
}, _temp2);
export { OCTreeView as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJUcmVlIiwiVHJlZU5vZGUiLCJUcmVlQ2hlY2tib3giLCJPQ1RyZWVWaWV3Iiwib25Db250YWluZXJDbGljayIsImUiLCJwcm9wcyIsIm9uU2VsZWN0IiwiZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrIiwidGFyZ2V0IiwidGFnTmFtZSIsIm9uRHJhZ0Ryb3AiLCJpc0RyYWdEcm9wTGVnYWwiLCJ0cmVlRGF0YSIsIlR5cGVFcnJvciIsIm5ld0RhdGEiLCJnZXRVcGRhdGVkVHJlZSIsImdldFRyZWVJdGVtIiwiZHJhZ05vZGUiLCJldmVudEtleSIsImRyYWdJdGVtIiwiZHJhZ0V2ZW50IiwiYXJyYXkiLCJwYXJlbnRGaWx0ZXJlZCIsImRhdGFMb29rVXBLZXkiLCJkYXRhTG9va1VwQ2hpbGRyZW4iLCJkcm9wVG9HYXAiLCJub2RlIiwiZHJvcElkIiwiZm91bmQiLCJuZXdJdGVtcyIsInNsaWNlIiwiYWRkSXRlbVRvQXJyYXkiLCJpdGVtcyIsImRyb3BJbmRleCIsImZpbmRJbmRleCIsImNoaWxkIiwibmV3Q2hpbGRyZW4iLCJzcGxpY2UiLCJyZW1vdmVJdGVtIiwiaSIsImxlbmd0aCIsIml0ZW0iLCJjaGlsZHJlbiIsInB1c2giLCJpZCIsImZpbmQiLCJmb3JFYWNoIiwiaXNQYXJlbnQiLCJhcnIiLCJmaWx0ZXJDaGlsZCIsImZpbHRlciIsImhhc0NoaWxkcmVuIiwiZGF0YU9iamVjdCIsInJlbmRlck5vZGVzIiwiZGF0YUxvb2tVcFZhbHVlIiwiaWNvbkNsYXNzIiwiZGlzYWJsZWQiLCJjaGVja0NoaWxkcmVuIiwibW91bnROb2RlcyIsIm5vZGVMaXN0IiwibGlzdCIsInJlbmRlciIsIm5vZGVzIiwiY2xzTmFtZSIsImNsYXNzTmFtZSIsInRyZWVJZCIsImRlZmF1bHRFeHBhbmRlZEtleXMiLCJkZWZhdWx0U2VsZWN0ZWRLZXlzIiwiZGVmYXVsdENoZWNrZWRLZXlzIiwiY2hlY2tlZEtleXMiLCJvbkV4cGFuZCIsIm9uQ2hlY2siLCJzaG93TGluZSIsInNob3dJY29uIiwiY2hlY2thYmxlIiwic2VsZWN0YWJsZSIsImRlZmF1bHRFeHBhbmRBbGwiLCJkcmFnZ2FibGUiLCJzZWxlY3RlZEtleXMiLCJleHBhbmRlZEtleXMiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsSUFBUCxJQUFlQyxRQUFmLFFBQStCLFNBQS9CO0FBQ0EsT0FBTywwQkFBUDtBQUNBO0FBQ0EsT0FBTyx1QkFBUDtBQUNBLE9BQU9DLFlBQVAsTUFBeUIsMkJBQXpCOztJQUVxQkMsVTs7Ozs7Ozs7Ozs7O2dLQTZEbkJDLGdCLEdBQW1CLFVBQUNDLENBQUQsRUFBTztBQUFBLHdCQUN1QixNQUFLQyxLQUQ1QjtBQUFBLFVBQ2hCQyxRQURnQixlQUNoQkEsUUFEZ0I7QUFBQSxVQUNOQyx3QkFETSxlQUNOQSx3QkFETTtBQUV4Qjs7QUFDQSxVQUFJQSw0QkFBNEJILEVBQUVJLE1BQUYsQ0FBU0MsT0FBVCxLQUFxQixNQUFyRCxFQUE2RDtBQUMzREgsaUJBQVMsRUFBVDtBQUNEO0FBQ0YsSyxRQUVESSxVLEdBQWEsVUFBQ04sQ0FBRCxFQUFPO0FBQUEseUJBQ2dDLE1BQUtDLEtBRHJDO0FBQUEsVUFDVkssVUFEVSxnQkFDVkEsVUFEVTtBQUFBLFVBQ0VDLGVBREYsZ0JBQ0VBLGVBREY7QUFBQSxVQUNtQkMsUUFEbkIsZ0JBQ21CQSxRQURuQjs7QUFFbEIsVUFBSSxDQUFDRixVQUFMLEVBQWlCLE1BQU0sSUFBSUcsU0FBSixDQUFjLG9DQUFkLENBQU47O0FBRWpCO0FBQ0EsVUFBSUYsbUJBQW1CLENBQUNBLGdCQUFnQkMsUUFBaEIsRUFBMEJSLENBQTFCLENBQXhCLEVBQXNEOztBQUV0RCxVQUFNVSxV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QVlDLFVBZGQ7QUFlRSxxQkFBV0UsU0FmYjtBQWdCRSxvQkFBVUwsUUFoQlo7QUFpQkUsb0JBQVVDLFFBakJaO0FBa0JFLG9CQUFVakIsUUFsQlo7QUFtQkUsNEJBQWtCb0I7QUFuQnBCO0FBcUJHZDtBQXJCSDtBQUZGLEtBREY7QUE2QkQsRzs7O0VBblJxQ2pFLE1BQU1tRixhLFVBK0JyQ0MsWSxHQUFlO0FBQ3BCaEIsVUFBUSxhQURZO0FBRXBCVixhQUFXLFFBRlM7QUFHcEJXLHVCQUFxQixFQUhEO0FBSXBCQyx1QkFBcUIsRUFKRDtBQUtwQkMsc0JBQW9CLEVBTEE7QUFNcEJFLFlBQVVZLFNBTlU7QUFPcEI1RSxZQUFVNEUsU0FQVTtBQVFwQlgsV0FBU1csU0FSVztBQVNwQnhFLGNBQVl3RSxTQVRRO0FBVXBCdkUsbUJBQWlCdUUsU0FWRztBQVdwQlYsWUFBVSxLQVhVO0FBWXBCaEIsWUFBVSxLQVpVO0FBYXBCaUIsWUFBVSxJQWJVO0FBY3BCQyxhQUFXLEtBZFM7QUFlcEJHLGFBQVcsS0FmUztBQWdCcEJGLGNBQVksS0FoQlE7QUFpQnBCQyxvQkFBa0IsS0FqQkU7QUFrQnBCO0FBQ0FyRCxpQkFBZSxLQW5CSztBQW9CcEIrQixtQkFBaUIsUUFwQkc7QUFxQnBCOUIsc0JBQW9CLFVBckJBO0FBc0JwQlosWUFBVSxFQXRCVTtBQXVCcEJ5RCxlQUFhLEVBdkJPO0FBd0JwQlMsZ0JBQWMsRUF4Qk07QUF5QnBCQyxnQkFBYyxFQXpCTTtBQTBCcEJmLGFBQVcsRUExQlM7QUEyQnBCekQsNEJBQTBCO0FBM0JOLEM7U0EvQkhMLFUiLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBUcmVlLCB7IFRyZWVOb2RlIH0gZnJvbSAncmMtdHJlZSc7XG5pbXBvcnQgJ3JjLXRyZWUvYXNzZXRzL2luZGV4LmNzcyc7XG4vLyBPdmVycmlkZSBkZWZhdWx0cyByYy10cmVlIHN0eWxlc1xuaW1wb3J0ICcuL29jLXRyZWUtc3R5bGVzLnNjc3MnO1xuaW1wb3J0IFRyZWVDaGVja2JveCBmcm9tICcuL3RyZWUtY2hlY2tib3guY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0NUcmVlVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHRyZWVJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWNvbkNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlZmF1bHRFeHBhbmRlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGRlZmF1bHRTZWxlY3RlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGRlZmF1bHRDaGVja2VkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgb25FeHBhbmQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoZWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkRyYWdEcm9wOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBpc0RyYWdEcm9wTGVnYWw6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dMaW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93SWNvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hlY2thYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkcmFnZ2FibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAvLyBDdXN0b21pc2F0aW9uIC0tIGRlZmluZSB0aGUgZGF0YSBsb29rVXBLZXlzIGFuZCBsb29rVXBWYWx1ZXNcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksXG4gICAgZGF0YUxvb2tVcEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXRhTG9va1VwVmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoZWNrZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBzZWxlY3RlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGV4cGFuZGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHRyZWVJZDogJ2RlZmF1bHRUcmVlJyxcbiAgICBpY29uQ2xhc3M6ICdjYXJldHMnLFxuICAgIGRlZmF1bHRFeHBhbmRlZEtleXM6IFtdLFxuICAgIGRlZmF1bHRTZWxlY3RlZEtleXM6IFtdLFxuICAgIGRlZmF1bHRDaGVja2VkS2V5czogW10sXG4gICAgb25FeHBhbmQ6IHVuZGVmaW5lZCxcbiAgICBvblNlbGVjdDogdW5kZWZpbmVkLFxuICAgIG9uQ2hlY2s6IHVuZGVmaW5lZCxcbiAgICBvbkRyYWdEcm9wOiB1bmRlZmluZWQsXG4gICAgaXNEcmFnRHJvcExlZ2FsOiB1bmRlZmluZWQsXG4gICAgc2hvd0xpbmU6IGZhbHNlLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBzaG93SWNvbjogdHJ1ZSxcbiAgICBjaGVja2FibGU6IGZhbHNlLFxuICAgIGRyYWdnYWJsZTogZmFsc2UsXG4gICAgc2VsZWN0YWJsZTogZmFsc2UsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogZmFsc2UsXG4gICAgLy8gQ3VzdG9tc1xuICAgIGRhdGFMb29rVXBLZXk6ICdrZXknLFxuICAgIGRhdGFMb29rVXBWYWx1ZTogJ3BhcmVudCcsXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiAnY2hpbGRyZW4nLFxuICAgIHRyZWVEYXRhOiBbXSxcbiAgICBjaGVja2VkS2V5czogW10sXG4gICAgc2VsZWN0ZWRLZXlzOiBbXSxcbiAgICBleHBhbmRlZEtleXM6IFtdLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrOiB0cnVlLFxuICB9O1xuXG4gIG9uQ29udGFpbmVyQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHsgb25TZWxlY3QsIGRlc2VsZWN0T25Db250YWluZXJDbGljayB9ID0gdGhpcy5wcm9wcztcbiAgICAvLyBjbGlja2luZyBvdXRzaWRlIGl0ZW1cbiAgICBpZiAoZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrICYmIGUudGFyZ2V0LnRhZ05hbWUgIT09ICdTUEFOJykge1xuICAgICAgb25TZWxlY3QoW10pO1xuICAgIH1cbiAgfTtcblxuICBvbkRyYWdEcm9wID0gKGUpID0+IHtcbiAgICBjb25zdCB7IG9uRHJhZ0Ryb3AsIGlzRHJhZ0Ryb3BMZWdhbCwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFvbkRyYWdEcm9wKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdvbkRyYWdEcm9wIGNhbGxiYWNrIGlzIG5vdCBkZWZpbmVkJyk7XG5cbiAgICAvLyBDYWxsaW5nIGlzRHJhZ0Ryb3BMZWdhbCBjYWxsYmFjayB0byBlbnN1cmUgdGhhdCB0aGlzIG1vdmUgY2FuIGJlIGRvbmVcbiAgICBpZiAoaXNEcmFnRHJvcExlZ2FsICYmICFpc0RyYWdEcm9wTGVnYWwodHJlZURhdGEsIGUpKSByZXR1cm47XG5cbiAgICBjb25zdCBuZXdEYXRhID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLmdldFRyZWVJdGVtKGUuZHJhZ05vZGUucHJvcHMuZXZlbnRLZXkpLCBlKTtcbiAgICBvbkRyYWdEcm9wKG5ld0RhdGEsIGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHVwZGF0ZWQgdHJlZSBhZnRlciBEcmFnIG4nIGRyb3AgZXZlbnRcbiAgICogQHBhcmFtIGRyYWdJdGVtIC0gZHJhZ2dlZCBpdGVtXG4gICAqIEBwYXJhbSBkcmFnRXZlbnQgLSBldmVudFxuICAgKiBAcGFyYW0gYXJyYXkgLSB1c2VkIHJlY3Vyc2l2ZWx5XG4gICAqIEBwYXJhbSBwYXJlbnRGaWx0ZXJlZCAtIHVzZWQgcmVjdXJzaXZlbHlcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRVcGRhdGVkVHJlZSA9IChkcmFnSXRlbSwgZHJhZ0V2ZW50LCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHBhcmVudEZpbHRlcmVkID0gZmFsc2UpID0+IHtcbiAgICBjb25zdCB7IGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBDaGlsZHJlbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGRyb3BUb0dhcCwgbm9kZSB9ID0gZHJhZ0V2ZW50O1xuICAgIGNvbnN0IGRyb3BJZCA9IG5vZGUgJiYgbm9kZS5wcm9wcy5ldmVudEtleTtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICBsZXQgbmV3SXRlbXMgPSBhcnJheS5zbGljZSgpO1xuXG4gICAgY29uc3QgYWRkSXRlbVRvQXJyYXkgPSAoaXRlbXMpID0+IHtcbiAgICAgIGNvbnN0IGRyb3BJbmRleCA9IGl0ZW1zLmZpbmRJbmRleChjaGlsZCA9PiBjaGlsZFtkYXRhTG9va1VwS2V5XSA9PT0gZHJvcElkKTtcbiAgICAgIGlmIChkcm9wSW5kZXggPiAtMSkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIGNvbnN0IG5ld0NoaWxkcmVuID0gaXRlbXMuc2xpY2UoKTtcbiAgICAgICAgbmV3Q2hpbGRyZW4uc3BsaWNlKGRyb3BJbmRleCwgMCwgZHJhZ0l0ZW0pO1xuICAgICAgICByZXR1cm4gbmV3Q2hpbGRyZW47XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlbXM7XG4gICAgfTtcbiAgICBpZiAoIXBhcmVudEZpbHRlcmVkICYmIGRyYWdJdGVtKSB7XG4gICAgICBuZXdJdGVtcyA9IHRoaXMucmVtb3ZlSXRlbShuZXdJdGVtcywgZHJhZ0l0ZW1bZGF0YUxvb2tVcEtleV0pO1xuICAgIH1cbiAgICBpZiAoZHJvcFRvR2FwKSB7XG4gICAgICBuZXdJdGVtcyA9IGFkZEl0ZW1Ub0FycmF5KG5ld0l0ZW1zKTtcbiAgICB9XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl07XG5cbiAgICAgICAgaWYgKCFkcm9wVG9HYXAgJiYgZHJvcElkID09PSBpdGVtW2RhdGFMb29rVXBLZXldICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoIWNoaWxkcmVuKSBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gPSBbXTtcbiAgICAgICAgICBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0ucHVzaChkcmFnSXRlbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGRyZW4gJiYgZHJvcFRvR2FwKSB7XG4gICAgICAgICAgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dID0gYWRkSXRlbVRvQXJyYXkoY2hpbGRyZW4pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm91bmQgJiYgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKGRyYWdJdGVtLCBkcmFnRXZlbnQsIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhIHRyZWUgaXRlbSBieSBJRFxuICAgKiBAcGFyYW0gaWRcbiAgICogQHBhcmFtIGFycmF5IC0gdXNlZCByZWN1cnNpdmVseVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0VHJlZUl0ZW0gPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YUxvb2tVcENoaWxkcmVuLCBkYXRhTG9va1VwS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBmb3VuZCA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2RhdGFMb29rVXBLZXldID09PSBpZCk7XG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmb3VuZDtcbiAgfTtcblxuXG4gIC8qKlxuICAgKiBSZW1vdmUgaXRlbSBmcm9tIGdpdmVuIGFycmF5XG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gaWRcbiAgICogQHJldHVybnMgYXJyYXkgb2YgZmlsdGVyZWQgaXRlbXNcbiAgICovXG4gIHJlbW92ZUl0ZW0gPSAoYXJyYXksIGlkKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwQ2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICBjb25zdCBpc1BhcmVudCA9IGFyciA9PiBhcnIuZmluZChjaGlsZCA9PiBjaGlsZFtkYXRhTG9va1VwS2V5XSA9PT0gaWQpO1xuICAgIGNvbnN0IGZpbHRlckNoaWxkID0gYXJyID0+IGFyci5maWx0ZXIoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gIT09IGlkKTtcblxuICAgIGlmIChpc1BhcmVudChuZXdJdGVtcykpIHtcbiAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgIG5ld0l0ZW1zID0gZmlsdGVyQ2hpbGQobmV3SXRlbXMpO1xuICAgIH1cblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IG5ld0l0ZW1zW2ldO1xuXG4gICAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgaXNQYXJlbnQoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKSkge1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gPSBmaWx0ZXJDaGlsZChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLnJlbW92ZUl0ZW0oaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLCBpZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfTtcblxuICAvKiBoYXNDaGlsZHJlbiAtIGZ1bmN0aW9uICovXG4gIGhhc0NoaWxkcmVuID0gZGF0YU9iamVjdCA9PiAoKGRhdGFPYmplY3RbdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW5dXG4gICAgJiYgZGF0YU9iamVjdFt0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbl0ubGVuZ3RoID49IDFcbiAgKSk7XG5cbiAgLyogcmVuZGVyTm9kZXMgLSBmdW5jdGlvbiAqL1xuICByZW5kZXJOb2RlcygpIHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwVmFsdWUsIGRhdGFMb29rVXBDaGlsZHJlbiwgaWNvbkNsYXNzLCBkaXNhYmxlZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjaGVja0NoaWxkcmVuID0gdGhpcy5oYXNDaGlsZHJlbjtcblxuICAgIC8vIFJlY3Vyc2l2ZSBmdW5jdGlvbiBmb3IgY29sbGVjdGluZyBub2RlczpcbiAgICBjb25zdCBtb3VudE5vZGVzID0gKG5vZGVMaXN0KSA9PiB7XG4gICAgICBjb25zdCBsaXN0ID0gW107XG4gICAgICBub2RlTGlzdC5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIGlmICghbm9kZVtkYXRhTG9va1VwS2V5XSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyBMZWFmIG5vZGVcbiAgICAgICAgaWYgKCFjaGVja0NoaWxkcmVuKG5vZGUpKSB7XG4gICAgICAgICAgbGlzdC5wdXNoKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcbiAgICAgICAgICAgIDxUcmVlTm9kZVxuICAgICAgICAgICAgICB0aXRsZT17bm9kZVtkYXRhTG9va1VwVmFsdWVdfVxuICAgICAgICAgICAgICBrZXk9e25vZGVbZGF0YUxvb2tVcEtleV19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7aWNvbkNsYXNzfSBsZWFmLW5vZGVgfVxuICAgICAgICAgICAgICBpY29uPXs8VHJlZUNoZWNrYm94IGRpc2FibGVkPXtkaXNhYmxlZH0gLz59XG4gICAgICAgICAgICAvPik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUGFyZW50IG5vZGVcbiAgICAgICAgICBsaXN0LnB1c2goIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuY3Rpb24tcGFyZW4tbmV3bGluZVxuICAgICAgICAgICAgPFRyZWVOb2RlXG4gICAgICAgICAgICAgIHRpdGxlPXtub2RlW2RhdGFMb29rVXBWYWx1ZV19XG4gICAgICAgICAgICAgIGtleT17bm9kZVtkYXRhTG9va1VwS2V5XX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtpY29uQ2xhc3N9IHBhcmVudC1ub2RlYH1cbiAgICAgICAgICAgICAgaWNvbj17PFRyZWVDaGVja2JveCBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bW91bnROb2Rlcyhub2RlW2RhdGFMb29rVXBDaGlsZHJlbl0pfVxuICAgICAgICAgICAgPC9UcmVlTm9kZT4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfTtcbiAgICByZXR1cm4gbW91bnROb2Rlcyh0aGlzLnByb3BzLnRyZWVEYXRhKTtcbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5yZW5kZXJOb2RlcygpO1xuICAgIGNvbnN0IGNsc05hbWUgPSB0aGlzLnByb3BzLmNsYXNzTmFtZSA/IGAke3RoaXMucHJvcHMuY2xhc3NOYW1lfSBvYy1yZWFjdC10cmVlYCA6ICdvYy1yZWFjdC10cmVlJztcblxuICAgIGNvbnN0IHtcbiAgICAgIHRyZWVJZCwgY2xhc3NOYW1lLCBkZWZhdWx0RXhwYW5kZWRLZXlzLCBkZWZhdWx0U2VsZWN0ZWRLZXlzLCBkZWZhdWx0Q2hlY2tlZEtleXMsIGNoZWNrZWRLZXlzLFxuICAgICAgb25FeHBhbmQsIG9uU2VsZWN0LCBvbkNoZWNrLCBzaG93TGluZSwgc2hvd0ljb24sIGNoZWNrYWJsZSwgc2VsZWN0YWJsZSwgZGVmYXVsdEV4cGFuZEFsbCxcbiAgICAgIGRyYWdnYWJsZSwgZGlzYWJsZWQsIHNlbGVjdGVkS2V5cywgZXhwYW5kZWRLZXlzLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJ0cmVlLXZpZXctY29udGFpbmVyXCIgY2xhc3NOYW1lPXtjbHNOYW1lfSBvbkNsaWNrPXt0aGlzLm9uQ29udGFpbmVyQ2xpY2t9PlxuICAgICAgICB7ISFub2Rlcy5sZW5ndGggJiZcbiAgICAgICAgPFRyZWVcbiAgICAgICAgICBpZD17dHJlZUlkfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIGRlZmF1bHRFeHBhbmRlZEtleXM9e2RlZmF1bHRFeHBhbmRlZEtleXN9XG4gICAgICAgICAgZGVmYXVsdFNlbGVjdGVkS2V5cz17ZGVmYXVsdFNlbGVjdGVkS2V5c31cbiAgICAgICAgICBkZWZhdWx0Q2hlY2tlZEtleXM9e2RlZmF1bHRDaGVja2VkS2V5c31cbiAgICAgICAgICBjaGVja2VkS2V5cz17Y2hlY2tlZEtleXN9XG4gICAgICAgICAgc2VsZWN0ZWRLZXlzPXtzZWxlY3RlZEtleXN9XG4gICAgICAgICAgZXhwYW5kZWRLZXlzPXtleHBhbmRlZEtleXN9XG4gICAgICAgICAgb25FeHBhbmQ9e29uRXhwYW5kfVxuICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH1cbiAgICAgICAgICBvbkNoZWNrPXtvbkNoZWNrfVxuICAgICAgICAgIG9uRHJvcD17dGhpcy5vbkRyYWdEcm9wfVxuICAgICAgICAgIGNoZWNrYWJsZT17Y2hlY2thYmxlfVxuICAgICAgICAgIHNlbGVjdGFibGU9e3NlbGVjdGFibGV9XG4gICAgICAgICAgZHJhZ2dhYmxlPXtkcmFnZ2FibGV9XG4gICAgICAgICAgc2hvd0xpbmU9e3Nob3dMaW5lfVxuICAgICAgICAgIHNob3dJY29uPXtzaG93SWNvbn1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgZGVmYXVsdEV4cGFuZEFsbD17ZGVmYXVsdEV4cGFuZEFsbH1cbiAgICAgICAgPlxuICAgICAgICAgIHtub2Rlc31cbiAgICAgICAgPC9UcmVlPlxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=