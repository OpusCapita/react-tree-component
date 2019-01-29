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
        showLine = _props2.showLine,
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
              showLine: showLine,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJUcmVlIiwiVHJlZU5vZGUiLCJQZXJmZWN0U2Nyb2xsQmFyIiwiVHJlZUNoZWNrYm94IiwiT3JkZXJpbmdBcnJvd3MiLCJPQ1RyZWVWaWV3IiwicHJvcHMiLCJleHBhbmRlZEtleXMiLCJkZWZhdWx0RXhwYW5kQWxsIiwiZ2V0QWxsUGFyZW50SWRzIiwidHJlZURhdGEiLCJzdGF0ZSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJzZXRTdGF0ZSIsInJlbmRlck5vZGVzIiwiZGF0YUxvb2tVcEtleSIsImRhdGFMb29rVXBWYWx1ZSIsImRhdGFMb29rVXBDaGlsZHJlbiIsImljb25DbGFzcyIsImRpc2FibGVkIiwiY2hlY2tDaGlsZHJlbiIsImhhc0NoaWxkcmVuIiwibW91bnROb2RlcyIsIm5vZGVMaXN0IiwibGlzdCIsImZvckVhY2giLCJub2RlIiwicHVzaCIsInJlbmRlciIsIm5vZGVzIiwidHJlZUlkIiwiY2xhc3NOYW1lIiwiY2hlY2tlZEtleXMiLCJvblNlbGVjdCIsIm9uQ2hlY2siLCJzaG93TGluZSIsInNob3dJY29uIiwiY2hlY2thYmxlIiwic2VsZWN0YWJsZSIsImRyYWdnYWJsZSIsInNlbGVjdGVkS2V5cyIsInNob3dFeHBhbmRBbGwiLCJ0aXRsZSIsImhlYWRlclJpZ2h0Iiwic2hvd09yZGVyaW5nQXJyb3dzIiwib25PcmRlckJ1dHRvbkNsaWNrIiwiY2xzTmFtZSIsImV4cGFuZEFsbENsc05hbWUiLCJpc0FsbEV4cGFuZGVkIiwib25Db250YWluZXJDbGljayIsImVsIiwiaGVhZGVyIiwibGVuZ3RoIiwib25FeHBhbmRBbGxDbGljayIsImdldFNlbGVjdGVkUGFyZW50Iiwib25FeHBhbmQiLCJvbkRyYWdEcm9wIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCIsImlzRHJhZ0Ryb3BMZWdhbCIsImRlc2VsZWN0T25Db250YWluZXJDbGljayIsImUiLCJ0YXJnZXQiLCJ0YWdOYW1lIiwiY29udGFpbnMiLCJUeXBlRXJyb3IiLCJuZXdEYXRhIiwiZ2V0VXBkYXRlZFRyZWUiLCJnZXRUcmVlSXRlbSIsImRyYWdOb2RlIiwiZXZlbnRLZXkiLCJpZCIsInBhcmVudCIsImRyYWdJdGVtIiwiZHJhZ0V2ZW50IiwiYXJyYXkiLCJwYXJlbnRGaWx0ZXJlZCIsImRyb3BUb0dhcCIsImRyb3BJZCIsImZvdW5kIiwibmV3SXRlbXMiLCJzbGljZSIsImFkZEl0ZW1Ub0FycmF5IiwiaXRlbXMiLCJkcm9wSW5kZXgiLCJmaW5kSW5kZXgiLCJjaGlsZCIsIm5ld0NoaWxkcmVuIiwic3BsaWNlIiwicmVtb3ZlSXRlbSIsImkiLCJpdGVtIiwiY2hpbGRyZW4iLCJyZXR1cm5QYXJlbnQiLCJmaW5kIiwiY2IiLCJhY2MiLCJ0b3RhbCIsImNvbmNhdCIsInJlZHVjZSIsImlzUGFyZW50IiwiYXJyIiwiZmlsdGVyQ2hpbGQiLCJmaWx0ZXIiLCJkYXRhT2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxJQUFQLElBQWVDLFFBQWYsUUFBK0IsU0FBL0I7QUFDQSxPQUFPQyxnQkFBUCxNQUE2QixxQ0FBN0I7O0FBRUE7QUFDQSxPQUFPLDhCQUFQO0FBQ0EsT0FBTyw4QkFBUDtBQUNBLE9BQU9DLFlBQVAsTUFBeUIsMkJBQXpCO0FBQ0EsT0FBT0MsY0FBUCxNQUEyQixrQ0FBM0I7O0lBRXFCQyxVOzs7QUFpRW5CLHNCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLCtCQURpQjs7QUFBQTs7QUFFakIsUUFBTUMsZUFBZUQsTUFBTUUsZ0JBQU4sR0FDakIsTUFBS0MsZUFBTCxDQUFxQkgsTUFBTUksUUFBM0IsRUFBcUNKLEtBQXJDLENBRGlCLEdBQzZCQSxNQUFNQyxZQUR4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YWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IFRyZWUsIHsgVHJlZU5vZGUgfSBmcm9tICdyYy10cmVlJztcclxuaW1wb3J0IFBlcmZlY3RTY3JvbGxCYXIgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtcGVyZmVjdC1zY3JvbGxiYXInO1xyXG5cclxuLy8gTG9hZCBkZWZhdWx0IHN0eWxlcyBhbmQgb3ZlcnJpZGUgdGhlbSB3aXRoIHJjLXRyZWUgc3R5bGVzXHJcbmltcG9ydCAnLi9hc3NldHMvcmMtdHJlZS1zdHlsZXMuc2Nzcyc7XHJcbmltcG9ydCAnLi9hc3NldHMvb2MtdHJlZS1zdHlsZXMuc2Nzcyc7XHJcbmltcG9ydCBUcmVlQ2hlY2tib3ggZnJvbSAnLi90cmVlLWNoZWNrYm94LmNvbXBvbmVudCc7XHJcbmltcG9ydCBPcmRlcmluZ0Fycm93cyBmcm9tICcuL3RyZWUtb3JkZXJpbmctYXJyb3dzLmNvbXBvbmVudCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPQ1RyZWVWaWV3IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcclxuICAgIHRyZWVJZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGljb25DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG9uRXhwYW5kOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgb25EcmFnRHJvcDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvbk9yZGVyQnV0dG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgaXNEcmFnRHJvcExlZ2FsOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHNob3dMaW5lOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIHNob3dJY29uOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGNoZWNrYWJsZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBzZWxlY3RhYmxlOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGRyYWdnYWJsZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIC8vIEN1c3RvbWlzYXRpb24gLS0gZGVmaW5lIHRoZSBkYXRhIGxvb2tVcEtleXMgYW5kIGxvb2tVcFZhbHVlc1xyXG4gICAgdHJlZURhdGE6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxyXG4gICAgZGF0YUxvb2tVcEtleTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGRhdGFMb29rVXBWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGNoZWNrZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcclxuICAgIHNlbGVjdGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXHJcbiAgICBleHBhbmRlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxyXG4gICAgZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIHNob3dFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBoZWFkZXJSaWdodDogUHJvcFR5cGVzLm5vZGUsXHJcbiAgICBzaG93T3JkZXJpbmdBcnJvd3M6IFByb3BUeXBlcy5ib29sLFxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICB0cmVlSWQ6ICdkZWZhdWx0VHJlZScsXHJcbiAgICBpY29uQ2xhc3M6ICdjYXJldHMnLFxyXG4gICAgb25FeHBhbmQ6IHVuZGVmaW5lZCxcclxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXHJcbiAgICBvbkNoZWNrOiB1bmRlZmluZWQsXHJcbiAgICBvbkRyYWdEcm9wOiB1bmRlZmluZWQsXHJcbiAgICBvbk9yZGVyQnV0dG9uQ2xpY2s6IHVuZGVmaW5lZCxcclxuICAgIGlzRHJhZ0Ryb3BMZWdhbDogdW5kZWZpbmVkLFxyXG4gICAgc2hvd0xpbmU6IGZhbHNlLFxyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgc2hvd0ljb246IHRydWUsXHJcbiAgICBjaGVja2FibGU6IGZhbHNlLFxyXG4gICAgZHJhZ2dhYmxlOiBmYWxzZSxcclxuICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogZmFsc2UsXHJcbiAgICAvLyBDdXN0b21zXHJcbiAgICBkYXRhTG9va1VwS2V5OiAna2V5JyxcclxuICAgIGRhdGFMb29rVXBWYWx1ZTogJ3BhcmVudCcsXHJcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46ICdjaGlsZHJlbicsXHJcbiAgICB0cmVlRGF0YTogW10sXHJcbiAgICBjaGVja2VkS2V5czogW10sXHJcbiAgICBzZWxlY3RlZEtleXM6IFtdLFxyXG4gICAgZXhwYW5kZWRLZXlzOiBbXSxcclxuICAgIGNsYXNzTmFtZTogJycsXHJcbiAgICBkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2s6IHRydWUsXHJcbiAgICBzaG93RXhwYW5kQWxsOiBmYWxzZSxcclxuICAgIHRpdGxlOiB1bmRlZmluZWQsXHJcbiAgICBoZWFkZXJSaWdodDogdW5kZWZpbmVkLFxyXG4gICAgc2hvd09yZGVyaW5nQXJyb3dzOiBmYWxzZSxcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGNvbnN0IGV4cGFuZGVkS2V5cyA9IHByb3BzLmRlZmF1bHRFeHBhbmRBbGxcclxuICAgICAgPyB0aGlzLmdldEFsbFBhcmVudElkcyhwcm9wcy50cmVlRGF0YSwgcHJvcHMpIDogcHJvcHMuZXhwYW5kZWRLZXlzO1xyXG5cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGV4cGFuZGVkS2V5cyxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgaWYgKG5leHRQcm9wcy5leHBhbmRlZEtleXMgIT09IHRoaXMucHJvcHMuZXhwYW5kZWRLZXlzKSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGV4cGFuZGVkS2V5czogbmV4dFByb3BzLmV4cGFuZGVkS2V5cyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNvbnRhaW5lckNsaWNrID0gKGUpID0+IHtcclxuICAgIGNvbnN0IHsgb25TZWxlY3QsIGRlc2VsZWN0T25Db250YWluZXJDbGljayB9ID0gdGhpcy5wcm9wcztcclxuICAgIC8vIGNsaWNraW5nIG91dHNpZGUgaXRlbVxyXG4gICAgaWYgKGRlc2VsZWN0T25Db250YWluZXJDbGljayAmJlxyXG4gICAgICBlLnRhcmdldC50YWdOYW1lICE9PSAnU1BBTicgJiZcclxuICAgICAgKCF0aGlzLmhlYWRlciB8fCAodGhpcy5oZWFkZXIgJiYgIXRoaXMuaGVhZGVyLmNvbnRhaW5zKGUudGFyZ2V0KSkpICYmXHJcbiAgICAgIG9uU2VsZWN0KSB7XHJcbiAgICAgIG9uU2VsZWN0KFtdKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBvbkV4cGFuZCA9IChleHBhbmRlZEtleXMpID0+IHtcclxuICAgIGNvbnN0IHsgb25FeHBhbmQgfSA9IHRoaXMucHJvcHM7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kZWRLZXlzIH0sICgpID0+IHtcclxuICAgICAgaWYgKG9uRXhwYW5kKSBvbkV4cGFuZCh0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cyk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBvbkRyYWdEcm9wID0gKGUpID0+IHtcclxuICAgIGNvbnN0IHsgb25EcmFnRHJvcCwgaXNEcmFnRHJvcExlZ2FsLCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcclxuICAgIGlmICghb25EcmFnRHJvcCkgdGhyb3cgbmV3IFR5cGVFcnJvcignb25EcmFnRHJvcCBjYWxsYmFjayBpcyBub3QgZGVmaW5lZCcpO1xyXG5cclxuICAgIC8vIENhbGxpbmcgaXNEcmFnRHJvcExlZ2FsIGNhbGxiYWNrIHRvIGVuc3VyZSB0aGF0IHRoaXMgbW92ZSBjYW4gYmUgZG9uZVxyXG4gICAgaWYgKGlzRHJhZ0Ryb3BMZWdhbCAmJiAhaXNEcmFnRHJvcExlZ2FsKHRyZWVEYXRhLCBlKSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG5ld0RhdGEgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuZ2V0VHJlZUl0ZW0oZS5kcmFnTm9kZS5wcm9wcy5ldmVudEtleSksIGUpO1xyXG4gICAgb25EcmFnRHJvcChuZXdEYXRhLCBlKTtcclxuICB9O1xyXG5cclxuICBvbkV4cGFuZEFsbENsaWNrID0gKCkgPT4ge1xyXG4gICAgY29uc3QgeyBvbkV4cGFuZCB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IGV4cGFuZGVkS2V5cyA9IHRoaXMuaXNBbGxFeHBhbmRlZCgpID8gW10gOiB0aGlzLmdldEFsbFBhcmVudElkcygpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZGVkS2V5cyB9LCAoKSA9PiB7XHJcbiAgICAgIGlmIChvbkV4cGFuZCkgb25FeHBhbmQodGhpcy5zdGF0ZS5leHBhbmRlZEtleXMpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgZ2V0U2VsZWN0ZWRQYXJlbnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IHNlbGVjdGVkS2V5cywgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCBpZCA9IHNlbGVjdGVkS2V5c1swXTtcclxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIHRyZWVEYXRhLCB0cnVlKTtcclxuICAgIHJldHVybiBwYXJlbnQgfHwgdHJlZURhdGE7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB1cGRhdGVkIHRyZWUgYWZ0ZXIgRHJhZyBuJyBkcm9wIGV2ZW50XHJcbiAgICogQHBhcmFtIGRyYWdJdGVtIC0gZHJhZ2dlZCBpdGVtXHJcbiAgICogQHBhcmFtIGRyYWdFdmVudCAtIGV2ZW50XHJcbiAgICogQHBhcmFtIGFycmF5IC0gdXNlZCByZWN1cnNpdmVseVxyXG4gICAqIEBwYXJhbSBwYXJlbnRGaWx0ZXJlZCAtIHVzZWQgcmVjdXJzaXZlbHlcclxuICAgKiBAcmV0dXJucyB7Kn1cclxuICAgKi9cclxuICBnZXRVcGRhdGVkVHJlZSA9IChkcmFnSXRlbSwgZHJhZ0V2ZW50LCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHBhcmVudEZpbHRlcmVkID0gZmFsc2UpID0+IHtcclxuICAgIGNvbnN0IHsgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcENoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgeyBkcm9wVG9HYXAsIG5vZGUgfSA9IGRyYWdFdmVudDtcclxuICAgIGNvbnN0IGRyb3BJZCA9IG5vZGUgJiYgbm9kZS5wcm9wcy5ldmVudEtleTtcclxuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gICAgbGV0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcclxuXHJcbiAgICBjb25zdCBhZGRJdGVtVG9BcnJheSA9IChpdGVtcykgPT4ge1xyXG4gICAgICBjb25zdCBkcm9wSW5kZXggPSBpdGVtcy5maW5kSW5kZXgoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gPT09IGRyb3BJZCk7XHJcbiAgICAgIGlmIChkcm9wSW5kZXggPiAtMSkge1xyXG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCBuZXdDaGlsZHJlbiA9IGl0ZW1zLnNsaWNlKCk7XHJcbiAgICAgICAgbmV3Q2hpbGRyZW4uc3BsaWNlKGRyb3BJbmRleCwgMCwgZHJhZ0l0ZW0pO1xyXG4gICAgICAgIHJldHVybiBuZXdDaGlsZHJlbjtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gaXRlbXM7XHJcbiAgICB9O1xyXG4gICAgaWYgKCFwYXJlbnRGaWx0ZXJlZCAmJiBkcmFnSXRlbSkge1xyXG4gICAgICBuZXdJdGVtcyA9IHRoaXMucmVtb3ZlSXRlbShuZXdJdGVtcywgZHJhZ0l0ZW1bZGF0YUxvb2tVcEtleV0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGRyb3BUb0dhcCkge1xyXG4gICAgICBuZXdJdGVtcyA9IGFkZEl0ZW1Ub0FycmF5KG5ld0l0ZW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWZvdW5kKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl07XHJcblxyXG4gICAgICAgIGlmICghZHJvcFRvR2FwICYmIGRyb3BJZCA9PT0gaXRlbVtkYXRhTG9va1VwS2V5XSAmJiAhZm91bmQpIHtcclxuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgIGlmICghY2hpbGRyZW4pIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSA9IFtdO1xyXG4gICAgICAgICAgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLnB1c2goZHJhZ0l0ZW0pO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZHJlbiAmJiBkcm9wVG9HYXApIHtcclxuICAgICAgICAgIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSA9IGFkZEl0ZW1Ub0FycmF5KGNoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFmb3VuZCAmJiBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pIHtcclxuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRVcGRhdGVkVHJlZShkcmFnSXRlbSwgZHJhZ0V2ZW50LCBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0sIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSB0cmVlIGl0ZW0gYnkgSURcclxuICAgKiBAcGFyYW0gaWRcclxuICAgKiBAcGFyYW0gYXJyYXlcclxuICAgKiBAcGFyYW0gcmV0dXJuUGFyZW50IC0gcmV0dXJuIGl0ZW0ncyBwYXJlbnQgaW5zdGVhZCBvZiB0aGUgaXRlbVxyXG4gICAqIEBwYXJhbSBwYXJlbnQgLSBwYXJlbnQgaXRlbSAodXNlZCByZWN1cnNpdmVseSlcclxuICAgKiBAcmV0dXJucyB7e319XHJcbiAgICovXHJcbiAgZ2V0VHJlZUl0ZW0gPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgcmV0dXJuUGFyZW50ID0gZmFsc2UsIHBhcmVudCA9IG51bGwpID0+IHtcclxuICAgIGNvbnN0IHsgZGF0YUxvb2tVcENoaWxkcmVuLCBkYXRhTG9va1VwS2V5IH0gPSB0aGlzLnByb3BzO1xyXG4gICAgbGV0IGZvdW5kID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1bZGF0YUxvb2tVcEtleV0gPT09IGlkKTtcclxuXHJcbiAgICBpZiAoZm91bmQgJiYgcmV0dXJuUGFyZW50KSBmb3VuZCA9IHBhcmVudDtcclxuXHJcbiAgICBpZiAoIWZvdW5kKSB7XHJcbiAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmICFmb3VuZCkge1xyXG4gICAgICAgICAgZm91bmQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0sIHJldHVyblBhcmVudCwgaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBmb3VuZDtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGFsbCBwYXJlbnQgSURzIGluIHRoZSB0cmVlXHJcbiAgICogQHBhcmFtIGFycmF5XHJcbiAgICovXHJcbiAgZ2V0QWxsUGFyZW50SWRzID0gKGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgcHJvcHMgPSB0aGlzLnByb3BzKSA9PiB7XHJcbiAgICBjb25zdCB7IGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBDaGlsZHJlbiB9ID0gcHJvcHM7XHJcbiAgICBjb25zdCBjYiA9IChhY2MsIGl0ZW0pID0+IHtcclxuICAgICAgbGV0IHRvdGFsID0gYWNjO1xyXG4gICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdG90YWwgPSBhY2MuY29uY2F0KGl0ZW1bZGF0YUxvb2tVcEtleV0pO1xyXG4gICAgICAgIHJldHVybiBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0ucmVkdWNlKGNiLCB0b3RhbCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRvdGFsO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBhcnJheS5yZWR1Y2UoY2IsIFtdKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgYWxsIHBhcmVudCBJRHMgYXJlIGV4cGFuZGVkXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgaXNBbGxFeHBhbmRlZCA9ICgpID0+XHJcbiAgICB0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cyAmJiB0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5sZW5ndGggPT09IHRoaXMuZ2V0QWxsUGFyZW50SWRzKCkubGVuZ3RoO1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGl0ZW0gZnJvbSBnaXZlbiBhcnJheVxyXG4gICAqIEBwYXJhbSBhcnJheVxyXG4gICAqIEBwYXJhbSBpZFxyXG4gICAqIEByZXR1cm5zIGFycmF5IG9mIGZpbHRlcmVkIGl0ZW1zXHJcbiAgICovXHJcbiAgcmVtb3ZlSXRlbSA9IChhcnJheSwgaWQpID0+IHtcclxuICAgIGNvbnN0IHsgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcENoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgbGV0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcclxuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gICAgY29uc3QgaXNQYXJlbnQgPSBhcnIgPT4gYXJyLmZpbmQoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gPT09IGlkKTtcclxuICAgIGNvbnN0IGZpbHRlckNoaWxkID0gYXJyID0+IGFyci5maWx0ZXIoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gIT09IGlkKTtcclxuXHJcbiAgICBpZiAoaXNQYXJlbnQobmV3SXRlbXMpKSB7XHJcbiAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgbmV3SXRlbXMgPSBmaWx0ZXJDaGlsZChuZXdJdGVtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFmb3VuZCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IG5ld0l0ZW1zW2ldO1xyXG5cclxuICAgICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmIGlzUGFyZW50KGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSkpIHtcclxuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSA9IGZpbHRlckNoaWxkKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiAhZm91bmQpIHtcclxuICAgICAgICAgIGZvdW5kID0gdGhpcy5yZW1vdmVJdGVtKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSwgaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xyXG4gIH07XHJcblxyXG4gIC8qIGhhc0NoaWxkcmVuIC0gZnVuY3Rpb24gKi9cclxuICBoYXNDaGlsZHJlbiA9IGRhdGFPYmplY3QgPT4gKChkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXVxyXG4gICAgJiYgZGF0YU9iamVjdFt0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbl0ubGVuZ3RoID49IDFcclxuICApKTtcclxuXHJcbiAgLyogcmVuZGVyTm9kZXMgLSBmdW5jdGlvbiAqL1xyXG4gIHJlbmRlck5vZGVzKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwVmFsdWUsIGRhdGFMb29rVXBDaGlsZHJlbiwgaWNvbkNsYXNzLCBkaXNhYmxlZCxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgY2hlY2tDaGlsZHJlbiA9IHRoaXMuaGFzQ2hpbGRyZW47XHJcblxyXG4gICAgLy8gUmVjdXJzaXZlIGZ1bmN0aW9uIGZvciBjb2xsZWN0aW5nIG5vZGVzOlxyXG4gICAgY29uc3QgbW91bnROb2RlcyA9IChub2RlTGlzdCkgPT4ge1xyXG4gICAgICBjb25zdCBsaXN0ID0gW107XHJcbiAgICAgIG5vZGVMaXN0LmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgICBpZiAoIW5vZGVbZGF0YUxvb2tVcEtleV0pIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvLyBMZWFmIG5vZGVcclxuICAgICAgICBpZiAoIWNoZWNrQ2hpbGRyZW4obm9kZSkpIHtcclxuICAgICAgICAgIGxpc3QucHVzaCggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jdGlvbi1wYXJlbi1uZXdsaW5lXHJcbiAgICAgICAgICAgIDxUcmVlTm9kZVxyXG4gICAgICAgICAgICAgIHRpdGxlPXtub2RlW2RhdGFMb29rVXBWYWx1ZV19XHJcbiAgICAgICAgICAgICAga2V5PXtub2RlW2RhdGFMb29rVXBLZXldfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7aWNvbkNsYXNzfSBsZWFmLW5vZGVgfVxyXG4gICAgICAgICAgICAgIGljb249ezxUcmVlQ2hlY2tib3ggZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPn1cclxuICAgICAgICAgICAgLz4pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBQYXJlbnQgbm9kZVxyXG4gICAgICAgICAgbGlzdC5wdXNoKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcclxuICAgICAgICAgICAgPFRyZWVOb2RlXHJcbiAgICAgICAgICAgICAgdGl0bGU9e25vZGVbZGF0YUxvb2tVcFZhbHVlXX1cclxuICAgICAgICAgICAgICBrZXk9e25vZGVbZGF0YUxvb2tVcEtleV19XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtpY29uQ2xhc3N9IHBhcmVudC1ub2RlYH1cclxuICAgICAgICAgICAgICBpY29uPXs8VHJlZUNoZWNrYm94IGRpc2FibGVkPXtkaXNhYmxlZH0gLz59XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7bW91bnROb2Rlcyhub2RlW2RhdGFMb29rVXBDaGlsZHJlbl0pfVxyXG4gICAgICAgICAgICA8L1RyZWVOb2RlPik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBtb3VudE5vZGVzKHRoaXMucHJvcHMudHJlZURhdGEpO1xyXG4gIH1cclxuXHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5yZW5kZXJOb2RlcygpO1xyXG4gICAgY29uc3Qge1xyXG4gICAgICB0cmVlSWQsIGNsYXNzTmFtZSwgY2hlY2tlZEtleXMsIG9uU2VsZWN0LCBvbkNoZWNrLCBzaG93TGluZSwgc2hvd0ljb24sXHJcbiAgICAgIGNoZWNrYWJsZSwgc2VsZWN0YWJsZSwgZHJhZ2dhYmxlLCBkaXNhYmxlZCwgc2VsZWN0ZWRLZXlzLCBzaG93RXhwYW5kQWxsLCB0aXRsZSwgaGVhZGVyUmlnaHQsXHJcbiAgICAgIHNob3dPcmRlcmluZ0Fycm93cywgb25PcmRlckJ1dHRvbkNsaWNrLFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCBjbHNOYW1lID0gY2xhc3NOYW1lID8gYCR7Y2xhc3NOYW1lfSBvYy1yZWFjdC10cmVlYCA6ICdvYy1yZWFjdC10cmVlJztcclxuICAgIGNvbnN0IGV4cGFuZEFsbENsc05hbWUgPSB0aGlzLmlzQWxsRXhwYW5kZWQoKSA/ICdleHBhbmQtYWxsJyA6ICcnO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgICA8ZGl2IGlkPVwidHJlZS12aWV3LWNvbnRhaW5lclwiIGNsYXNzTmFtZT17Y2xzTmFtZX0gb25DbGljaz17dGhpcy5vbkNvbnRhaW5lckNsaWNrfT5cclxuICAgICAgICB7KHNob3dFeHBhbmRBbGwgfHwgdGl0bGUgfHwgaGVhZGVyUmlnaHQgfHwgc2hvd09yZGVyaW5nQXJyb3dzKVxyXG4gICAgICAgICYmIChcclxuICAgICAgICAgIDxoZWFkZXJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidHJlZS1oZWFkZXJcIlxyXG4gICAgICAgICAgICByZWY9eyhlbCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuaGVhZGVyID0gZWw7XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLWxlZnRcIj5cclxuICAgICAgICAgICAgICB7c2hvd0V4cGFuZEFsbCAmJiAhIW5vZGVzLmxlbmd0aFxyXG4gICAgICAgICAgICAgICYmIChcclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkV4cGFuZEFsbENsaWNrfVxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BleHBhbmQtYWxsLXRvZ2dsZSAke2V4cGFuZEFsbENsc05hbWV9YH1cclxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAge3RpdGxlICYmIDxoMj57dGl0bGV9PC9oMj59XHJcbiAgICAgICAgICAgICAge3Nob3dPcmRlcmluZ0Fycm93c1xyXG4gICAgICAgICAgICAgICYmIChcclxuICAgICAgICAgICAgICAgIDxPcmRlcmluZ0Fycm93c1xyXG4gICAgICAgICAgICAgICAgICBvbk9yZGVyQnV0dG9uQ2xpY2s9e29uT3JkZXJCdXR0b25DbGlja31cclxuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRQYXJlbnQ9e3RoaXMuZ2V0U2VsZWN0ZWRQYXJlbnQoKX1cclxuICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICB7aGVhZGVyUmlnaHQgJiYgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItcmlnaHRcIj57aGVhZGVyUmlnaHR9PC9kaXY+fVxyXG4gICAgICAgICAgPC9oZWFkZXI+XHJcbiAgICAgICAgKX1cclxuICAgICAgICA8UGVyZmVjdFNjcm9sbEJhcj5cclxuICAgICAgICAgIHshIW5vZGVzLmxlbmd0aFxyXG4gICAgICAgICAgJiYgKFxyXG4gICAgICAgICAgICA8VHJlZVxyXG4gICAgICAgICAgICAgIGlkPXt0cmVlSWR9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XHJcbiAgICAgICAgICAgICAgY2hlY2tlZEtleXM9e2NoZWNrZWRLZXlzfVxyXG4gICAgICAgICAgICAgIHNlbGVjdGVkS2V5cz17c2VsZWN0ZWRLZXlzfVxyXG4gICAgICAgICAgICAgIGV4cGFuZGVkS2V5cz17dGhpcy5zdGF0ZS5leHBhbmRlZEtleXN9XHJcbiAgICAgICAgICAgICAgb25FeHBhbmQ9e3RoaXMub25FeHBhbmR9XHJcbiAgICAgICAgICAgICAgb25TZWxlY3Q9e29uU2VsZWN0fVxyXG4gICAgICAgICAgICAgIG9uQ2hlY2s9e29uQ2hlY2t9XHJcbiAgICAgICAgICAgICAgb25Ecm9wPXt0aGlzLm9uRHJhZ0Ryb3B9XHJcbiAgICAgICAgICAgICAgY2hlY2thYmxlPXtjaGVja2FibGV9XHJcbiAgICAgICAgICAgICAgc2VsZWN0YWJsZT17c2VsZWN0YWJsZX1cclxuICAgICAgICAgICAgICBkcmFnZ2FibGU9e2RyYWdnYWJsZX1cclxuICAgICAgICAgICAgICBzaG93TGluZT17c2hvd0xpbmV9XHJcbiAgICAgICAgICAgICAgc2hvd0ljb249e3Nob3dJY29ufVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtub2Rlc31cclxuICAgICAgICAgICAgPC9UcmVlPlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIDwvUGVyZmVjdFNjcm9sbEJhcj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=