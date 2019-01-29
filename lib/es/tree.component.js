var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import Tree, { TreeNode } from 'rc-tree';
import PerfectScrollBar from '@opuscapita/react-perfect-scrollbar';

// Load default styles and override them with rc-tree styles
import './assets/rc-tree-styles.scss';
import './assets/oc-tree-styles.scss';
import TreeCheckbox from './tree-checkbox.component';
import OrderingArrows from './tree-ordering-arrows.component';

var OCTreeView = (_temp = _class = function (_React$PureComponent) {
  _inherits(OCTreeView, _React$PureComponent);

  function OCTreeView(props) {
    _classCallCheck(this, OCTreeView);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this));

    _initialiseProps.call(_this);

    var expandedKeys = props.defaultExpandAll ? _this.getAllParentIds(props.treeData, props) : props.expandedKeys;

    _this.state = {
      expandedKeys: expandedKeys
    };
    return _this;
  }

  OCTreeView.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.expandedKeys !== this.props.expandedKeys) {
      this.setState({
        expandedKeys: nextProps.expandedKeys
      });
    }
  };

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
   * @param array
   * @param returnParent - return item's parent instead of the item
   * @param parent - parent item (used recursively)
   * @returns {{}}
   */


  /**
   * Returns all parent IDs in the tree
   * @param array
   */


  /**
   * Checks whether or not all parent IDs are expanded
   * @returns {boolean}
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
    var _this2 = this;

    var nodes = this.renderNodes();
    var _props2 = this.props,
        treeId = _props2.treeId,
        className = _props2.className,
        checkedKeys = _props2.checkedKeys,
        onSelect = _props2.onSelect,
        onCheck = _props2.onCheck,
        showIcon = _props2.showIcon,
        checkable = _props2.checkable,
        selectable = _props2.selectable,
        draggable = _props2.draggable,
        disabled = _props2.disabled,
        selectedKeys = _props2.selectedKeys,
        showExpandAll = _props2.showExpandAll,
        title = _props2.title,
        headerRight = _props2.headerRight,
        showOrderingArrows = _props2.showOrderingArrows,
        onOrderButtonClick = _props2.onOrderButtonClick;

    var clsName = className ? className + ' oc-react-tree' : 'oc-react-tree';
    var expandAllClsName = this.isAllExpanded() ? 'expand-all' : '';

    return (
      // eslint-disable-next-line
      React.createElement(
        'div',
        { id: 'tree-view-container', className: clsName, onClick: this.onContainerClick },
        (showExpandAll || title || headerRight || showOrderingArrows) && React.createElement(
          'header',
          {
            className: 'tree-header',
            ref: function ref(el) {
              _this2.header = el;
            }
          },
          React.createElement(
            'div',
            { className: 'header-left' },
            showExpandAll && !!nodes.length && React.createElement('button', {
              onClick: this.onExpandAllClick,
              className: 'expand-all-toggle ' + expandAllClsName,
              type: 'button'
            }),
            title && React.createElement(
              'h2',
              null,
              title
            ),
            showOrderingArrows && React.createElement(OrderingArrows, _extends({
              onOrderButtonClick: onOrderButtonClick,
              selectedParent: this.getSelectedParent()
            }, this.props))
          ),
          headerRight && React.createElement(
            'div',
            { className: 'header-right' },
            headerRight
          )
        ),
        React.createElement(
          PerfectScrollBar,
          null,
          !!nodes.length && React.createElement(
            Tree,
            {
              id: treeId,
              className: className,
              checkedKeys: checkedKeys,
              selectedKeys: selectedKeys,
              expandedKeys: this.state.expandedKeys,
              onExpand: this.onExpand,
              onSelect: onSelect,
              onCheck: onCheck,
              onDrop: this.onDragDrop,
              checkable: checkable,
              selectable: selectable,
              draggable: draggable,
              showLine: false,
              showIcon: showIcon,
              disabled: disabled
            },
            nodes
          )
        )
      )
    );
  };

  return OCTreeView;
}(React.PureComponent), _class.defaultProps = {
  treeId: 'defaultTree',
  iconClass: 'carets',
  onExpand: undefined,
  onSelect: undefined,
  onCheck: undefined,
  onDragDrop: undefined,
  onOrderButtonClick: undefined,
  isDragDropLegal: undefined,
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
  deselectOnContainerClick: true,
  showExpandAll: false,
  title: undefined,
  headerRight: undefined,
  showOrderingArrows: false
}, _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onContainerClick = function (e) {
    var _props3 = _this3.props,
        onSelect = _props3.onSelect,
        deselectOnContainerClick = _props3.deselectOnContainerClick;
    // clicking outside item

    if (deselectOnContainerClick && e.target.tagName !== 'SPAN' && (!_this3.header || _this3.header && !_this3.header.contains(e.target)) && onSelect) {
      onSelect([]);
    }
  };

  this.onExpand = function (expandedKeys) {
    var onExpand = _this3.props.onExpand;

    _this3.setState({ expandedKeys: expandedKeys }, function () {
      if (onExpand) onExpand(_this3.state.expandedKeys);
    });
  };

  this.onDragDrop = function (e) {
    var _props4 = _this3.props,
        onDragDrop = _props4.onDragDrop,
        isDragDropLegal = _props4.isDragDropLegal,
        treeData = _props4.treeData;

    if (!onDragDrop) throw new TypeError('onDragDrop callback is not defined');

    // Calling isDragDropLegal callback to ensure that this move can be done
    if (isDragDropLegal && !isDragDropLegal(treeData, e)) return;

    var newData = _this3.getUpdatedTree(_this3.getTreeItem(e.dragNode.props.eventKey), e);
    onDragDrop(newData, e);
  };

  this.onExpandAllClick = function () {
    var onExpand = _this3.props.onExpand;

    var expandedKeys = _this3.isAllExpanded() ? [] : _this3.getAllParentIds();
    _this3.setState({ expandedKeys: expandedKeys }, function () {
      if (onExpand) onExpand(_this3.state.expandedKeys);
    });
  };

  this.getSelectedParent = function () {
    var _props5 = _this3.props,
        selectedKeys = _props5.selectedKeys,
        treeData = _props5.treeData;

    var id = selectedKeys[0];
    var parent = _this3.getTreeItem(id, treeData, true);
    return parent || treeData;
  };

  this.getUpdatedTree = function (dragItem, dragEvent) {
    var array = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this3.props.treeData;
    var parentFiltered = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var _props6 = _this3.props,
        dataLookUpKey = _props6.dataLookUpKey,
        dataLookUpChildren = _props6.dataLookUpChildren;
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
      newItems = _this3.removeItem(newItems, dragItem[dataLookUpKey]);
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
          found = _this3.getUpdatedTree(dragItem, dragEvent, item[dataLookUpChildren], true);
        }
      }
    }
    if (!found) return false;
    return newItems;
  };

  this.getTreeItem = function (id) {
    var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this3.props.treeData;
    var returnParent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var _props7 = _this3.props,
        dataLookUpChildren = _props7.dataLookUpChildren,
        dataLookUpKey = _props7.dataLookUpKey;

    var found = array.find(function (item) {
      return item[dataLookUpKey] === id;
    });

    if (found && returnParent) found = parent;

    if (!found) {
      array.forEach(function (item) {
        if (item[dataLookUpChildren] && !found) {
          found = _this3.getTreeItem(id, item[dataLookUpChildren], returnParent, item);
        }
      });
    }
    return found;
  };

  this.getAllParentIds = function () {
    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this3.props.treeData;
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this3.props;
    var dataLookUpKey = props.dataLookUpKey,
        dataLookUpChildren = props.dataLookUpChildren;

    var cb = function cb(acc, item) {
      var total = acc;
      if (item[dataLookUpChildren] && item[dataLookUpChildren].length > 0) {
        total = acc.concat(item[dataLookUpKey]);
        return item[dataLookUpChildren].reduce(cb, total);
      }
      return total;
    };
    return array.reduce(cb, []);
  };

  this.isAllExpanded = function () {
    return _this3.state.expandedKeys && _this3.state.expandedKeys.length === _this3.getAllParentIds().length;
  };

  this.removeItem = function (array, id) {
    var _props8 = _this3.props,
        dataLookUpKey = _props8.dataLookUpKey,
        dataLookUpChildren = _props8.dataLookUpChildren;

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
          found = _this3.removeItem(item[dataLookUpChildren], id);
        }
      }
    }
    if (!found) return false;
    return newItems;
  };

  this.hasChildren = function (dataObject) {
    return dataObject[_this3.props.dataLookUpChildren] && dataObject[_this3.props.dataLookUpChildren].length >= 1;
  };
}, _temp);
export { OCTreeView as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJUcmVlIiwiVHJlZU5vZGUiLCJQZXJmZWN0U2Nyb2xsQmFyIiwiVHJlZUNoZWNrYm94IiwiT3JkZXJpbmdBcnJvd3MiLCJPQ1RyZWVWaWV3IiwicHJvcHMiLCJleHBhbmRlZEtleXMiLCJkZWZhdWx0RXhwYW5kQWxsIiwiZ2V0QWxsUGFyZW50SWRzIiwidHJlZURhdGEiLCJzdGF0ZSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJzZXRTdGF0ZSIsInJlbmRlck5vZGVzIiwiZGF0YUxvb2tVcEtleSIsImRhdGFMb29rVXBWYWx1ZSIsImRhdGFMb29rVXBDaGlsZHJlbiIsImljb25DbGFzcyIsImRpc2FibGVkIiwiY2hlY2tDaGlsZHJlbiIsImhhc0NoaWxkcmVuIiwibW91bnROb2RlcyIsIm5vZGVMaXN0IiwibGlzdCIsImZvckVhY2giLCJub2RlIiwicHVzaCIsInJlbmRlciIsIm5vZGVzIiwidHJlZUlkIiwiY2xhc3NOYW1lIiwiY2hlY2tlZEtleXMiLCJvblNlbGVjdCIsIm9uQ2hlY2siLCJzaG93SWNvbiIsImNoZWNrYWJsZSIsInNlbGVjdGFibGUiLCJkcmFnZ2FibGUiLCJzZWxlY3RlZEtleXMiLCJzaG93RXhwYW5kQWxsIiwidGl0bGUiLCJoZWFkZXJSaWdodCIsInNob3dPcmRlcmluZ0Fycm93cyIsIm9uT3JkZXJCdXR0b25DbGljayIsImNsc05hbWUiLCJleHBhbmRBbGxDbHNOYW1lIiwiaXNBbGxFeHBhbmRlZCIsIm9uQ29udGFpbmVyQ2xpY2siLCJlbCIsImhlYWRlciIsImxlbmd0aCIsIm9uRXhwYW5kQWxsQ2xpY2siLCJnZXRTZWxlY3RlZFBhcmVudCIsIm9uRXhwYW5kIiwib25EcmFnRHJvcCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiLCJpc0RyYWdEcm9wTGVnYWwiLCJkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2siLCJlIiwidGFyZ2V0IiwidGFnTmFtZSIsImNvbnRhaW5zIiwiVHlwZUVycm9yIiwibmV3RGF0YSIsImdldFVwZGF0ZWRUcmVlIiwiZ2V0VHJlZUl0ZW0iLCJkcmFnTm9kZSIsImV2ZW50S2V5IiwiaWQiLCJwYXJlbnQiLCJkcmFnSXRlbSIsImRyYWdFdmVudCIsImFycmF5IiwicGFyZW50RmlsdGVyZWQiLCJkcm9wVG9HYXAiLCJkcm9wSWQiLCJmb3VuZCIsIm5ld0l0ZW1zIiwic2xpY2UiLCJhZGRJdGVtVG9BcnJheSIsIml0ZW1zIiwiZHJvcEluZGV4IiwiZmluZEluZGV4IiwiY2hpbGQiLCJuZXdDaGlsZHJlbiIsInNwbGljZSIsInJlbW92ZUl0ZW0iLCJpIiwiaXRlbSIsImNoaWxkcmVuIiwicmV0dXJuUGFyZW50IiwiZmluZCIsImNiIiwiYWNjIiwidG90YWwiLCJjb25jYXQiLCJyZWR1Y2UiLCJpc1BhcmVudCIsImFyciIsImZpbHRlckNoaWxkIiwiZmlsdGVyIiwiZGF0YU9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsSUFBUCxJQUFlQyxRQUFmLFFBQStCLFNBQS9CO0FBQ0EsT0FBT0MsZ0JBQVAsTUFBNkIscUNBQTdCOztBQUVBO0FBQ0EsT0FBTyw4QkFBUDtBQUNBLE9BQU8sOEJBQVA7QUFDQSxPQUFPQyxZQUFQLE1BQXlCLDJCQUF6QjtBQUNBLE9BQU9DLGNBQVAsTUFBMkIsa0NBQTNCOztJQUVxQkMsVTs7O0FBK0RuQixzQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQiwrQkFEaUI7O0FBQUE7O0FBRWpCLFFBQU1DLGVBQWVELE1BQU1FLGdCQUFOLEdBQ2pCLE1BQUtDLGVBQUwsQ0FBcUJILE1BQU1JLFFBQTNCLEVBQXFDSixLQUFyQyxDQURpQixHQUM2QkEsTUFBTUMsWUFEeEQ7O0FBR0EsVUFB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QUFTakIsTUFBTXZFLGFBQU4sTUFBeUJ3RCxFQUFsQztBQUFBLE9BQVgsQ0FBUDtBQUFBLEtBQXBCOztBQUVBLFFBQUk2QixTQUFTcEIsUUFBVCxDQUFKLEVBQXdCO0FBQ3RCRCxjQUFRLElBQVI7QUFDQUMsaUJBQVdzQixZQUFZdEIsUUFBWixDQUFYO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDRCxLQUFMLEVBQVk7QUFDVixXQUFLLElBQUlXLElBQUksQ0FBYixFQUFnQkEsSUFBSVYsU0FBUzdCLE1BQTdCLEVBQXFDdUMsS0FBSyxDQUExQyxFQUE2QztBQUMzQyxZQUFNQyxPQUFPWCxTQUFTVSxDQUFULENBQWI7O0FBRUEsWUFBSUMsS0FBSzFFLGtCQUFMLEtBQTRCbUYsU0FBU1QsS0FBSzFFLGtCQUFMLENBQVQsQ0FBaEMsRUFBb0U7QUFDbEU4RCxrQkFBUSxJQUFSO0FBQ0FZLGVBQUsxRSxrQkFBTCxJQUEyQnFGLFlBQVlYLEtBQUsxRSxrQkFBTCxDQUFaLENBQTNCO0FBQ0E7QUFDRDtBQUNELFlBQUkwRSxLQUFLMUUsa0JBQUwsS0FBNEIsQ0FBQzhELEtBQWpDLEVBQXdDO0FBQ3RDQSxrQkFBUSxPQUFLVSxVQUFMLENBQWdCRSxLQUFLMUUsa0JBQUwsQ0FBaEIsRUFBMENzRCxFQUExQyxDQUFSO0FBQ0Q7QUFDRjtBQUNGO0FBQ0QsUUFBSSxDQUFDUSxLQUFMLEVBQVksT0FBTyxLQUFQO0FBQ1osV0FBT0MsUUFBUDtBQUNELEc7O09BR0QzRCxXLEdBQWM7QUFBQSxXQUFnQm1GLFdBQVcsT0FBS25HLEtBQUwsQ0FBV1ksa0JBQXRCLEtBQ3pCdUYsV0FBVyxPQUFLbkcsS0FBTCxDQUFXWSxrQkFBdEIsRUFBMENrQyxNQUExQyxJQUFvRCxDQUQzQztBQUFBLEc7O1NBelFLL0MsVSIsImZpbGUiOiJ0cmVlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFRyZWUsIHsgVHJlZU5vZGUgfSBmcm9tICdyYy10cmVlJztcbmltcG9ydCBQZXJmZWN0U2Nyb2xsQmFyIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXBlcmZlY3Qtc2Nyb2xsYmFyJztcblxuLy8gTG9hZCBkZWZhdWx0IHN0eWxlcyBhbmQgb3ZlcnJpZGUgdGhlbSB3aXRoIHJjLXRyZWUgc3R5bGVzXG5pbXBvcnQgJy4vYXNzZXRzL3JjLXRyZWUtc3R5bGVzLnNjc3MnO1xuaW1wb3J0ICcuL2Fzc2V0cy9vYy10cmVlLXN0eWxlcy5zY3NzJztcbmltcG9ydCBUcmVlQ2hlY2tib3ggZnJvbSAnLi90cmVlLWNoZWNrYm94LmNvbXBvbmVudCc7XG5pbXBvcnQgT3JkZXJpbmdBcnJvd3MgZnJvbSAnLi90cmVlLW9yZGVyaW5nLWFycm93cy5jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPQ1RyZWVWaWV3IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgdHJlZUlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpY29uQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25FeHBhbmQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoZWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkRyYWdEcm9wOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk9yZGVyQnV0dG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIGlzRHJhZ0Ryb3BMZWdhbDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd0ljb246IFByb3BUeXBlcy5ib29sLFxuICAgIGNoZWNrYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0YWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJhZ2dhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgLy8gQ3VzdG9taXNhdGlvbiAtLSBkZWZpbmUgdGhlIGRhdGEgbG9va1VwS2V5cyBhbmQgbG9va1VwVmFsdWVzXG4gICAgdHJlZURhdGE6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxuICAgIGRhdGFMb29rVXBLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGVja2VkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgc2VsZWN0ZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBleHBhbmRlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGRlc2VsZWN0T25Db250YWluZXJDbGljazogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0V4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaGVhZGVyUmlnaHQ6IFByb3BUeXBlcy5ub2RlLFxuICAgIHNob3dPcmRlcmluZ0Fycm93czogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB0cmVlSWQ6ICdkZWZhdWx0VHJlZScsXG4gICAgaWNvbkNsYXNzOiAnY2FyZXRzJyxcbiAgICBvbkV4cGFuZDogdW5kZWZpbmVkLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25DaGVjazogdW5kZWZpbmVkLFxuICAgIG9uRHJhZ0Ryb3A6IHVuZGVmaW5lZCxcbiAgICBvbk9yZGVyQnV0dG9uQ2xpY2s6IHVuZGVmaW5lZCxcbiAgICBpc0RyYWdEcm9wTGVnYWw6IHVuZGVmaW5lZCxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgc2hvd0ljb246IHRydWUsXG4gICAgY2hlY2thYmxlOiBmYWxzZSxcbiAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgIHNlbGVjdGFibGU6IGZhbHNlLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IGZhbHNlLFxuICAgIC8vIEN1c3RvbXNcbiAgICBkYXRhTG9va1VwS2V5OiAna2V5JyxcbiAgICBkYXRhTG9va1VwVmFsdWU6ICdwYXJlbnQnLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogJ2NoaWxkcmVuJyxcbiAgICB0cmVlRGF0YTogW10sXG4gICAgY2hlY2tlZEtleXM6IFtdLFxuICAgIHNlbGVjdGVkS2V5czogW10sXG4gICAgZXhwYW5kZWRLZXlzOiBbXSxcbiAgICBjbGFzc05hbWU6ICcnLFxuICAgIGRlc2VsZWN0T25Db250YWluZXJDbGljazogdHJ1ZSxcbiAgICBzaG93RXhwYW5kQWxsOiBmYWxzZSxcbiAgICB0aXRsZTogdW5kZWZpbmVkLFxuICAgIGhlYWRlclJpZ2h0OiB1bmRlZmluZWQsXG4gICAgc2hvd09yZGVyaW5nQXJyb3dzOiBmYWxzZSxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc3QgZXhwYW5kZWRLZXlzID0gcHJvcHMuZGVmYXVsdEV4cGFuZEFsbFxuICAgICAgPyB0aGlzLmdldEFsbFBhcmVudElkcyhwcm9wcy50cmVlRGF0YSwgcHJvcHMpIDogcHJvcHMuZXhwYW5kZWRLZXlzO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGV4cGFuZGVkS2V5cyxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLmV4cGFuZGVkS2V5cyAhPT0gdGhpcy5wcm9wcy5leHBhbmRlZEtleXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBleHBhbmRlZEtleXM6IG5leHRQcm9wcy5leHBhbmRlZEtleXMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbkNvbnRhaW5lckNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCB7IG9uU2VsZWN0LCBkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2sgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gY2xpY2tpbmcgb3V0c2lkZSBpdGVtXG4gICAgaWYgKGRlc2VsZWN0T25Db250YWluZXJDbGlja1xuICAgICAgJiYgZS50YXJnZXQudGFnTmFtZSAhPT0gJ1NQQU4nXG4gICAgICAmJiAoIXRoaXMuaGVhZGVyIHx8ICh0aGlzLmhlYWRlciAmJiAhdGhpcy5oZWFkZXIuY29udGFpbnMoZS50YXJnZXQpKSlcbiAgICAgICYmIG9uU2VsZWN0KSB7XG4gICAgICBvblNlbGVjdChbXSk7XG4gICAgfVxuICB9O1xuXG4gIG9uRXhwYW5kID0gKGV4cGFuZGVkS2V5cykgPT4ge1xuICAgIGNvbnN0IHsgb25FeHBhbmQgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZGVkS2V5cyB9LCAoKSA9PiB7XG4gICAgICBpZiAob25FeHBhbmQpIG9uRXhwYW5kKHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkRyYWdEcm9wID0gKGUpID0+IHtcbiAgICBjb25zdCB7IG9uRHJhZ0Ryb3AsIGlzRHJhZ0Ryb3BMZWdhbCwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFvbkRyYWdEcm9wKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdvbkRyYWdEcm9wIGNhbGxiYWNrIGlzIG5vdCBkZWZpbmVkJyk7XG5cbiAgICAvLyBDYWxsaW5nIGlzRHJhZ0Ryb3BMZWdhbCBjYWxsYmFjayB0byBlbnN1cmUgdGhhdCB0aGlzIG1vdmUgY2FuIGJlIGRvbmVcbiAgICBpZiAoaXNEcmFnRHJvcExlZ2FsICYmICFpc0RyYWdEcm9wTGVnYWwodHJlZURhdGEsIGUpKSByZXR1cm47XG5cbiAgICBjb25zdCBuZXdEYXRhID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLmdldFRyZWVJdGVtKGUuZHJhZ05vZGUucHJvcHMuZXZlbnRLZXkpLCBlKTtcbiAgICBvbkRyYWdEcm9wKG5ld0RhdGEsIGUpO1xuICB9O1xuXG4gIG9uRXhwYW5kQWxsQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkV4cGFuZCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBleHBhbmRlZEtleXMgPSB0aGlzLmlzQWxsRXhwYW5kZWQoKSA/IFtdIDogdGhpcy5nZXRBbGxQYXJlbnRJZHMoKTtcbiAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kZWRLZXlzIH0sICgpID0+IHtcbiAgICAgIGlmIChvbkV4cGFuZCkgb25FeHBhbmQodGhpcy5zdGF0ZS5leHBhbmRlZEtleXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIGdldFNlbGVjdGVkUGFyZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc2VsZWN0ZWRLZXlzLCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpZCA9IHNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCB0cmVlRGF0YSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHBhcmVudCB8fCB0cmVlRGF0YTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB1cGRhdGVkIHRyZWUgYWZ0ZXIgRHJhZyBuJyBkcm9wIGV2ZW50XG4gICAqIEBwYXJhbSBkcmFnSXRlbSAtIGRyYWdnZWQgaXRlbVxuICAgKiBAcGFyYW0gZHJhZ0V2ZW50IC0gZXZlbnRcbiAgICogQHBhcmFtIGFycmF5IC0gdXNlZCByZWN1cnNpdmVseVxuICAgKiBAcGFyYW0gcGFyZW50RmlsdGVyZWQgLSB1c2VkIHJlY3Vyc2l2ZWx5XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0VXBkYXRlZFRyZWUgPSAoZHJhZ0l0ZW0sIGRyYWdFdmVudCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCBwYXJlbnRGaWx0ZXJlZCA9IGZhbHNlKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwQ2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBkcm9wVG9HYXAsIG5vZGUgfSA9IGRyYWdFdmVudDtcbiAgICBjb25zdCBkcm9wSWQgPSBub2RlICYmIG5vZGUucHJvcHMuZXZlbnRLZXk7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgbGV0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcblxuICAgIGNvbnN0IGFkZEl0ZW1Ub0FycmF5ID0gKGl0ZW1zKSA9PiB7XG4gICAgICBjb25zdCBkcm9wSW5kZXggPSBpdGVtcy5maW5kSW5kZXgoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gPT09IGRyb3BJZCk7XG4gICAgICBpZiAoZHJvcEluZGV4ID4gLTEpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICBjb25zdCBuZXdDaGlsZHJlbiA9IGl0ZW1zLnNsaWNlKCk7XG4gICAgICAgIG5ld0NoaWxkcmVuLnNwbGljZShkcm9wSW5kZXgsIDAsIGRyYWdJdGVtKTtcbiAgICAgICAgcmV0dXJuIG5ld0NoaWxkcmVuO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH07XG4gICAgaWYgKCFwYXJlbnRGaWx0ZXJlZCAmJiBkcmFnSXRlbSkge1xuICAgICAgbmV3SXRlbXMgPSB0aGlzLnJlbW92ZUl0ZW0obmV3SXRlbXMsIGRyYWdJdGVtW2RhdGFMb29rVXBLZXldKTtcbiAgICB9XG4gICAgaWYgKGRyb3BUb0dhcCkge1xuICAgICAgbmV3SXRlbXMgPSBhZGRJdGVtVG9BcnJheShuZXdJdGVtcyk7XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dO1xuXG4gICAgICAgIGlmICghZHJvcFRvR2FwICYmIGRyb3BJZCA9PT0gaXRlbVtkYXRhTG9va1VwS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgaWYgKCFjaGlsZHJlbikgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dID0gW107XG4gICAgICAgICAgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLnB1c2goZHJhZ0l0ZW0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkcmVuICYmIGRyb3BUb0dhcCkge1xuICAgICAgICAgIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSA9IGFkZEl0ZW1Ub0FycmF5KGNoaWxkcmVuKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvdW5kICYmIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRVcGRhdGVkVHJlZShkcmFnSXRlbSwgZHJhZ0V2ZW50LCBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0sIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB0cmVlIGl0ZW0gYnkgSURcbiAgICogQHBhcmFtIGlkXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gcmV0dXJuUGFyZW50IC0gcmV0dXJuIGl0ZW0ncyBwYXJlbnQgaW5zdGVhZCBvZiB0aGUgaXRlbVxuICAgKiBAcGFyYW0gcGFyZW50IC0gcGFyZW50IGl0ZW0gKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqIEByZXR1cm5zIHt7fX1cbiAgICovXG4gIGdldFRyZWVJdGVtID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHJldHVyblBhcmVudCA9IGZhbHNlLCBwYXJlbnQgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwQ2hpbGRyZW4sIGRhdGFMb29rVXBLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGZvdW5kID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1bZGF0YUxvb2tVcEtleV0gPT09IGlkKTtcblxuICAgIGlmIChmb3VuZCAmJiByZXR1cm5QYXJlbnQpIGZvdW5kID0gcGFyZW50O1xuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLCByZXR1cm5QYXJlbnQsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFsbCBwYXJlbnQgSURzIGluIHRoZSB0cmVlXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKi9cbiAgZ2V0QWxsUGFyZW50SWRzID0gKGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgcHJvcHMgPSB0aGlzLnByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwQ2hpbGRyZW4gfSA9IHByb3BzO1xuICAgIGNvbnN0IGNiID0gKGFjYywgaXRlbSkgPT4ge1xuICAgICAgbGV0IHRvdGFsID0gYWNjO1xuICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0ubGVuZ3RoID4gMCkge1xuICAgICAgICB0b3RhbCA9IGFjYy5jb25jYXQoaXRlbVtkYXRhTG9va1VwS2V5XSk7XG4gICAgICAgIHJldHVybiBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0ucmVkdWNlKGNiLCB0b3RhbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG90YWw7XG4gICAgfTtcbiAgICByZXR1cm4gYXJyYXkucmVkdWNlKGNiLCBbXSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCBhbGwgcGFyZW50IElEcyBhcmUgZXhwYW5kZWRcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0FsbEV4cGFuZGVkID0gKCkgPT5cbiAgICB0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cyAmJiB0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5sZW5ndGggPT09IHRoaXMuZ2V0QWxsUGFyZW50SWRzKCkubGVuZ3RoO1xuXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBpdGVtIGZyb20gZ2l2ZW4gYXJyYXlcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcmV0dXJucyBhcnJheSBvZiBmaWx0ZXJlZCBpdGVtc1xuICAgKi9cbiAgcmVtb3ZlSXRlbSA9IChhcnJheSwgaWQpID0+IHtcbiAgICBjb25zdCB7IGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBDaGlsZHJlbiB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbmV3SXRlbXMgPSBhcnJheS5zbGljZSgpO1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGNvbnN0IGlzUGFyZW50ID0gYXJyID0+IGFyci5maW5kKGNoaWxkID0+IGNoaWxkW2RhdGFMb29rVXBLZXldID09PSBpZCk7XG4gICAgY29uc3QgZmlsdGVyQ2hpbGQgPSBhcnIgPT4gYXJyLmZpbHRlcihjaGlsZCA9PiBjaGlsZFtkYXRhTG9va1VwS2V5XSAhPT0gaWQpO1xuXG4gICAgaWYgKGlzUGFyZW50KG5ld0l0ZW1zKSkge1xuICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgbmV3SXRlbXMgPSBmaWx0ZXJDaGlsZChuZXdJdGVtcyk7XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XG5cbiAgICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiBpc1BhcmVudChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pKSB7XG4gICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSA9IGZpbHRlckNoaWxkKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMucmVtb3ZlSXRlbShpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0sIGlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWZvdW5kKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xuICB9O1xuXG4gIC8qIGhhc0NoaWxkcmVuIC0gZnVuY3Rpb24gKi9cbiAgaGFzQ2hpbGRyZW4gPSBkYXRhT2JqZWN0ID0+ICgoZGF0YU9iamVjdFt0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbl1cbiAgICAmJiBkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXS5sZW5ndGggPj0gMVxuICApKTtcblxuICAvKiByZW5kZXJOb2RlcyAtIGZ1bmN0aW9uICovXG4gIHJlbmRlck5vZGVzKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBWYWx1ZSwgZGF0YUxvb2tVcENoaWxkcmVuLCBpY29uQ2xhc3MsIGRpc2FibGVkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNoZWNrQ2hpbGRyZW4gPSB0aGlzLmhhc0NoaWxkcmVuO1xuXG4gICAgLy8gUmVjdXJzaXZlIGZ1bmN0aW9uIGZvciBjb2xsZWN0aW5nIG5vZGVzOlxuICAgIGNvbnN0IG1vdW50Tm9kZXMgPSAobm9kZUxpc3QpID0+IHtcbiAgICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICAgIG5vZGVMaXN0LmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKCFub2RlW2RhdGFMb29rVXBLZXldKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vIExlYWYgbm9kZVxuICAgICAgICBpZiAoIWNoZWNrQ2hpbGRyZW4obm9kZSkpIHtcbiAgICAgICAgICBsaXN0LnB1c2goIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuY3Rpb24tcGFyZW4tbmV3bGluZVxuICAgICAgICAgICAgPFRyZWVOb2RlXG4gICAgICAgICAgICAgIHRpdGxlPXtub2RlW2RhdGFMb29rVXBWYWx1ZV19XG4gICAgICAgICAgICAgIGtleT17bm9kZVtkYXRhTG9va1VwS2V5XX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtpY29uQ2xhc3N9IGxlYWYtbm9kZWB9XG4gICAgICAgICAgICAgIGljb249ezxUcmVlQ2hlY2tib3ggZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPn1cbiAgICAgICAgICAgIC8+KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBQYXJlbnQgbm9kZVxuICAgICAgICAgIGxpc3QucHVzaCggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jdGlvbi1wYXJlbi1uZXdsaW5lXG4gICAgICAgICAgICA8VHJlZU5vZGVcbiAgICAgICAgICAgICAgdGl0bGU9e25vZGVbZGF0YUxvb2tVcFZhbHVlXX1cbiAgICAgICAgICAgICAga2V5PXtub2RlW2RhdGFMb29rVXBLZXldfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2ljb25DbGFzc30gcGFyZW50LW5vZGVgfVxuICAgICAgICAgICAgICBpY29uPXs8VHJlZUNoZWNrYm94IGRpc2FibGVkPXtkaXNhYmxlZH0gLz59XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHttb3VudE5vZGVzKG5vZGVbZGF0YUxvb2tVcENoaWxkcmVuXSl9XG4gICAgICAgICAgICA8L1RyZWVOb2RlPik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbGlzdDtcbiAgICB9O1xuICAgIHJldHVybiBtb3VudE5vZGVzKHRoaXMucHJvcHMudHJlZURhdGEpO1xuICB9XG5cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLnJlbmRlck5vZGVzKCk7XG4gICAgY29uc3Qge1xuICAgICAgdHJlZUlkLCBjbGFzc05hbWUsIGNoZWNrZWRLZXlzLCBvblNlbGVjdCwgb25DaGVjaywgc2hvd0ljb24sIGNoZWNrYWJsZSwgc2VsZWN0YWJsZSxcbiAgICAgIGRyYWdnYWJsZSwgZGlzYWJsZWQsIHNlbGVjdGVkS2V5cywgc2hvd0V4cGFuZEFsbCwgdGl0bGUsIGhlYWRlclJpZ2h0LCBzaG93T3JkZXJpbmdBcnJvd3MsXG4gICAgICBvbk9yZGVyQnV0dG9uQ2xpY2ssXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2xzTmFtZSA9IGNsYXNzTmFtZSA/IGAke2NsYXNzTmFtZX0gb2MtcmVhY3QtdHJlZWAgOiAnb2MtcmVhY3QtdHJlZSc7XG4gICAgY29uc3QgZXhwYW5kQWxsQ2xzTmFtZSA9IHRoaXMuaXNBbGxFeHBhbmRlZCgpID8gJ2V4cGFuZC1hbGwnIDogJyc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICA8ZGl2IGlkPVwidHJlZS12aWV3LWNvbnRhaW5lclwiIGNsYXNzTmFtZT17Y2xzTmFtZX0gb25DbGljaz17dGhpcy5vbkNvbnRhaW5lckNsaWNrfT5cbiAgICAgICAgeyhzaG93RXhwYW5kQWxsIHx8IHRpdGxlIHx8IGhlYWRlclJpZ2h0IHx8IHNob3dPcmRlcmluZ0Fycm93cylcbiAgICAgICAgJiYgKFxuICAgICAgICAgIDxoZWFkZXJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInRyZWUtaGVhZGVyXCJcbiAgICAgICAgICAgIHJlZj17KGVsKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaGVhZGVyID0gZWw7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLWxlZnRcIj5cbiAgICAgICAgICAgICAge3Nob3dFeHBhbmRBbGwgJiYgISFub2Rlcy5sZW5ndGhcbiAgICAgICAgICAgICAgJiYgKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25FeHBhbmRBbGxDbGlja31cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGV4cGFuZC1hbGwtdG9nZ2xlICR7ZXhwYW5kQWxsQ2xzTmFtZX1gfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge3RpdGxlICYmIDxoMj57dGl0bGV9PC9oMj59XG4gICAgICAgICAgICAgIHtzaG93T3JkZXJpbmdBcnJvd3NcbiAgICAgICAgICAgICAgJiYgKFxuICAgICAgICAgICAgICAgIDxPcmRlcmluZ0Fycm93c1xuICAgICAgICAgICAgICAgICAgb25PcmRlckJ1dHRvbkNsaWNrPXtvbk9yZGVyQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZFBhcmVudD17dGhpcy5nZXRTZWxlY3RlZFBhcmVudCgpfVxuICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge2hlYWRlclJpZ2h0ICYmIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXJpZ2h0XCI+e2hlYWRlclJpZ2h0fTwvZGl2Pn1cbiAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgKX1cbiAgICAgICAgPFBlcmZlY3RTY3JvbGxCYXI+XG4gICAgICAgICAgeyEhbm9kZXMubGVuZ3RoXG4gICAgICAgICAgJiYgKFxuICAgICAgICAgICAgPFRyZWVcbiAgICAgICAgICAgICAgaWQ9e3RyZWVJZH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgICAgICAgIGNoZWNrZWRLZXlzPXtjaGVja2VkS2V5c31cbiAgICAgICAgICAgICAgc2VsZWN0ZWRLZXlzPXtzZWxlY3RlZEtleXN9XG4gICAgICAgICAgICAgIGV4cGFuZGVkS2V5cz17dGhpcy5zdGF0ZS5leHBhbmRlZEtleXN9XG4gICAgICAgICAgICAgIG9uRXhwYW5kPXt0aGlzLm9uRXhwYW5kfVxuICAgICAgICAgICAgICBvblNlbGVjdD17b25TZWxlY3R9XG4gICAgICAgICAgICAgIG9uQ2hlY2s9e29uQ2hlY2t9XG4gICAgICAgICAgICAgIG9uRHJvcD17dGhpcy5vbkRyYWdEcm9wfVxuICAgICAgICAgICAgICBjaGVja2FibGU9e2NoZWNrYWJsZX1cbiAgICAgICAgICAgICAgc2VsZWN0YWJsZT17c2VsZWN0YWJsZX1cbiAgICAgICAgICAgICAgZHJhZ2dhYmxlPXtkcmFnZ2FibGV9XG4gICAgICAgICAgICAgIHNob3dMaW5lPXtmYWxzZX1cbiAgICAgICAgICAgICAgc2hvd0ljb249e3Nob3dJY29ufVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtub2Rlc31cbiAgICAgICAgICAgIDwvVHJlZT5cbiAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICA8L1BlcmZlY3RTY3JvbGxCYXI+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=