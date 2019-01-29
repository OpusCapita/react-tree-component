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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJUcmVlIiwiVHJlZU5vZGUiLCJQZXJmZWN0U2Nyb2xsQmFyIiwiVHJlZUNoZWNrYm94IiwiT3JkZXJpbmdBcnJvd3MiLCJPQ1RyZWVWaWV3IiwicHJvcHMiLCJleHBhbmRlZEtleXMiLCJkZWZhdWx0RXhwYW5kQWxsIiwiZ2V0QWxsUGFyZW50SWRzIiwidHJlZURhdGEiLCJzdGF0ZSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJzZXRTdGF0ZSIsInJlbmRlck5vZGVzIiwiZGF0YUxvb2tVcEtleSIsImRhdGFMb29rVXBWYWx1ZSIsImRhdGFMb29rVXBDaGlsZHJlbiIsImljb25DbGFzcyIsImRpc2FibGVkIiwiY2hlY2tDaGlsZHJlbiIsImhhc0NoaWxkcmVuIiwibW91bnROb2RlcyIsIm5vZGVMaXN0IiwibGlzdCIsImZvckVhY2giLCJub2RlIiwicHVzaCIsInJlbmRlciIsIm5vZGVzIiwidHJlZUlkIiwiY2xhc3NOYW1lIiwiY2hlY2tlZEtleXMiLCJvblNlbGVjdCIsIm9uQ2hlY2siLCJzaG93TGluZSIsInNob3dJY29uIiwiY2hlY2thYmxlIiwic2VsZWN0YWJsZSIsImRyYWdnYWJsZSIsInNlbGVjdGVkS2V5cyIsInNob3dFeHBhbmRBbGwiLCJ0aXRsZSIsImhlYWRlclJpZ2h0Iiwic2hvd09yZGVyaW5nQXJyb3dzIiwib25PcmRlckJ1dHRvbkNsaWNrIiwiY2xzTmFtZSIsImV4cGFuZEFsbENsc05hbWUiLCJpc0FsbEV4cGFuZGVkIiwib25Db250YWluZXJDbGljayIsImVsIiwiaGVhZGVyIiwibGVuZ3RoIiwib25FeHBhbmRBbGxDbGljayIsImdldFNlbGVjdGVkUGFyZW50Iiwib25FeHBhbmQiLCJvbkRyYWdEcm9wIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCIsImlzRHJhZ0Ryb3BMZWdhbCIsImRlc2VsZWN0T25Db250YWluZXJDbGljayIsImUiLCJ0YXJnZXQiLCJ0YWdOYW1lIiwiY29udGFpbnMiLCJUeXBlRXJyb3IiLCJuZXdEYXRhIiwiZ2V0VXBkYXRlZFRyZWUiLCJnZXRUcmVlSXRlbSIsImRyYWdOb2RlIiwiZXZlbnRLZXkiLCJpZCIsInBhcmVudCIsImRyYWdJdGVtIiwiZHJhZ0V2ZW50IiwiYXJyYXkiLCJwYXJlbnRGaWx0ZXJlZCIsImRyb3BUb0dhcCIsImRyb3BJZCIsImZvdW5kIiwibmV3SXRlbXMiLCJzbGljZSIsImFkZEl0ZW1Ub0FycmF5IiwiaXRlbXMiLCJkcm9wSW5kZXgiLCJmaW5kSW5kZXgiLCJjaGlsZCIsIm5ld0NoaWxkcmVuIiwic3BsaWNlIiwicmVtb3ZlSXRlbSIsImkiLCJpdGVtIiwiY2hpbGRyZW4iLCJyZXR1cm5QYXJlbnQiLCJmaW5kIiwiY2IiLCJhY2MiLCJ0b3RhbCIsImNvbmNhdCIsInJlZHVjZSIsImlzUGFyZW50IiwiYXJyIiwiZmlsdGVyQ2hpbGQiLCJmaWx0ZXIiLCJkYXRhT2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxJQUFQLElBQWVDLFFBQWYsUUFBK0IsU0FBL0I7QUFDQSxPQUFPQyxnQkFBUCxNQUE2QixxQ0FBN0I7O0FBRUE7QUFDQSxPQUFPLDhCQUFQO0FBQ0EsT0FBTyw4QkFBUDtBQUNBLE9BQU9DLFlBQVAsTUFBeUIsMkJBQXpCO0FBQ0EsT0FBT0MsY0FBUCxNQUEyQixrQ0FBM0I7O0lBRXFCQyxVOzs7QUFpRW5CLHNCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLCtCQURpQjs7QUFBQTs7QUFFakIsUUFBTUMsZUFBZUQsTUFBTUUsZ0JBQU4sR0FDakIsTUFBS0MsZUFBTCxDQUFxQkgsTUFBTUksUUFBM0IsRUFBcUNKLEtBQXJDLENBRGlCLEdBQzZCQSxNQUFNQyxZQUR4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YWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgVHJlZSwgeyBUcmVlTm9kZSB9IGZyb20gJ3JjLXRyZWUnO1xuaW1wb3J0IFBlcmZlY3RTY3JvbGxCYXIgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtcGVyZmVjdC1zY3JvbGxiYXInO1xuXG4vLyBMb2FkIGRlZmF1bHQgc3R5bGVzIGFuZCBvdmVycmlkZSB0aGVtIHdpdGggcmMtdHJlZSBzdHlsZXNcbmltcG9ydCAnLi9hc3NldHMvcmMtdHJlZS1zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgJy4vYXNzZXRzL29jLXRyZWUtc3R5bGVzLnNjc3MnO1xuaW1wb3J0IFRyZWVDaGVja2JveCBmcm9tICcuL3RyZWUtY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCBPcmRlcmluZ0Fycm93cyBmcm9tICcuL3RyZWUtb3JkZXJpbmctYXJyb3dzLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9DVHJlZVZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB0cmVlSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGljb25DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkV4cGFuZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRHJhZ0Ryb3A6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uT3JkZXJCdXR0b25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNEcmFnRHJvcExlZ2FsOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ljb246IFByb3BUeXBlcy5ib29sLFxuICAgIGNoZWNrYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0YWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJhZ2dhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgLy8gQ3VzdG9taXNhdGlvbiAtLSBkZWZpbmUgdGhlIGRhdGEgbG9va1VwS2V5cyBhbmQgbG9va1VwVmFsdWVzXG4gICAgdHJlZURhdGE6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxuICAgIGRhdGFMb29rVXBLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGVja2VkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgc2VsZWN0ZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBleHBhbmRlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGRlc2VsZWN0T25Db250YWluZXJDbGljazogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0V4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaGVhZGVyUmlnaHQ6IFByb3BUeXBlcy5ub2RlLFxuICAgIHNob3dPcmRlcmluZ0Fycm93czogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB0cmVlSWQ6ICdkZWZhdWx0VHJlZScsXG4gICAgaWNvbkNsYXNzOiAnY2FyZXRzJyxcbiAgICBvbkV4cGFuZDogdW5kZWZpbmVkLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25DaGVjazogdW5kZWZpbmVkLFxuICAgIG9uRHJhZ0Ryb3A6IHVuZGVmaW5lZCxcbiAgICBvbk9yZGVyQnV0dG9uQ2xpY2s6IHVuZGVmaW5lZCxcbiAgICBpc0RyYWdEcm9wTGVnYWw6IHVuZGVmaW5lZCxcbiAgICBzaG93TGluZTogZmFsc2UsXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIHNob3dJY29uOiB0cnVlLFxuICAgIGNoZWNrYWJsZTogZmFsc2UsXG4gICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBmYWxzZSxcbiAgICAvLyBDdXN0b21zXG4gICAgZGF0YUxvb2tVcEtleTogJ2tleScsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiAncGFyZW50JyxcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46ICdjaGlsZHJlbicsXG4gICAgdHJlZURhdGE6IFtdLFxuICAgIGNoZWNrZWRLZXlzOiBbXSxcbiAgICBzZWxlY3RlZEtleXM6IFtdLFxuICAgIGV4cGFuZGVkS2V5czogW10sXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICBkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2s6IHRydWUsXG4gICAgc2hvd0V4cGFuZEFsbDogZmFsc2UsXG4gICAgdGl0bGU6IHVuZGVmaW5lZCxcbiAgICBoZWFkZXJSaWdodDogdW5kZWZpbmVkLFxuICAgIHNob3dPcmRlcmluZ0Fycm93czogZmFsc2UsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnN0IGV4cGFuZGVkS2V5cyA9IHByb3BzLmRlZmF1bHRFeHBhbmRBbGxcbiAgICAgID8gdGhpcy5nZXRBbGxQYXJlbnRJZHMocHJvcHMudHJlZURhdGEsIHByb3BzKSA6IHByb3BzLmV4cGFuZGVkS2V5cztcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBleHBhbmRlZEtleXMsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKG5leHRQcm9wcy5leHBhbmRlZEtleXMgIT09IHRoaXMucHJvcHMuZXhwYW5kZWRLZXlzKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZXhwYW5kZWRLZXlzOiBuZXh0UHJvcHMuZXhwYW5kZWRLZXlzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25Db250YWluZXJDbGljayA9IChlKSA9PiB7XG4gICAgY29uc3QgeyBvblNlbGVjdCwgZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrIH0gPSB0aGlzLnByb3BzO1xuICAgIC8vIGNsaWNraW5nIG91dHNpZGUgaXRlbVxuICAgIGlmIChkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2tcbiAgICAgICYmIGUudGFyZ2V0LnRhZ05hbWUgIT09ICdTUEFOJ1xuICAgICAgJiYgKCF0aGlzLmhlYWRlciB8fCAodGhpcy5oZWFkZXIgJiYgIXRoaXMuaGVhZGVyLmNvbnRhaW5zKGUudGFyZ2V0KSkpXG4gICAgICAmJiBvblNlbGVjdCkge1xuICAgICAgb25TZWxlY3QoW10pO1xuICAgIH1cbiAgfTtcblxuICBvbkV4cGFuZCA9IChleHBhbmRlZEtleXMpID0+IHtcbiAgICBjb25zdCB7IG9uRXhwYW5kIH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmRlZEtleXMgfSwgKCkgPT4ge1xuICAgICAgaWYgKG9uRXhwYW5kKSBvbkV4cGFuZCh0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cyk7XG4gICAgfSk7XG4gIH07XG5cbiAgb25EcmFnRHJvcCA9IChlKSA9PiB7XG4gICAgY29uc3QgeyBvbkRyYWdEcm9wLCBpc0RyYWdEcm9wTGVnYWwsIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghb25EcmFnRHJvcCkgdGhyb3cgbmV3IFR5cGVFcnJvcignb25EcmFnRHJvcCBjYWxsYmFjayBpcyBub3QgZGVmaW5lZCcpO1xuXG4gICAgLy8gQ2FsbGluZyBpc0RyYWdEcm9wTGVnYWwgY2FsbGJhY2sgdG8gZW5zdXJlIHRoYXQgdGhpcyBtb3ZlIGNhbiBiZSBkb25lXG4gICAgaWYgKGlzRHJhZ0Ryb3BMZWdhbCAmJiAhaXNEcmFnRHJvcExlZ2FsKHRyZWVEYXRhLCBlKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgbmV3RGF0YSA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5nZXRUcmVlSXRlbShlLmRyYWdOb2RlLnByb3BzLmV2ZW50S2V5KSwgZSk7XG4gICAgb25EcmFnRHJvcChuZXdEYXRhLCBlKTtcbiAgfTtcblxuICBvbkV4cGFuZEFsbENsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25FeHBhbmQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZXhwYW5kZWRLZXlzID0gdGhpcy5pc0FsbEV4cGFuZGVkKCkgPyBbXSA6IHRoaXMuZ2V0QWxsUGFyZW50SWRzKCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZGVkS2V5cyB9LCAoKSA9PiB7XG4gICAgICBpZiAob25FeHBhbmQpIG9uRXhwYW5kKHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzKTtcbiAgICB9KTtcbiAgfTtcblxuICBnZXRTZWxlY3RlZFBhcmVudCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdGVkS2V5cywgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaWQgPSBzZWxlY3RlZEtleXNbMF07XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgdHJlZURhdGEsIHRydWUpO1xuICAgIHJldHVybiBwYXJlbnQgfHwgdHJlZURhdGE7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdXBkYXRlZCB0cmVlIGFmdGVyIERyYWcgbicgZHJvcCBldmVudFxuICAgKiBAcGFyYW0gZHJhZ0l0ZW0gLSBkcmFnZ2VkIGl0ZW1cbiAgICogQHBhcmFtIGRyYWdFdmVudCAtIGV2ZW50XG4gICAqIEBwYXJhbSBhcnJheSAtIHVzZWQgcmVjdXJzaXZlbHlcbiAgICogQHBhcmFtIHBhcmVudEZpbHRlcmVkIC0gdXNlZCByZWN1cnNpdmVseVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldFVwZGF0ZWRUcmVlID0gKGRyYWdJdGVtLCBkcmFnRXZlbnQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgcGFyZW50RmlsdGVyZWQgPSBmYWxzZSkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcENoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgZHJvcFRvR2FwLCBub2RlIH0gPSBkcmFnRXZlbnQ7XG4gICAgY29uc3QgZHJvcElkID0gbm9kZSAmJiBub2RlLnByb3BzLmV2ZW50S2V5O1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGxldCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XG5cbiAgICBjb25zdCBhZGRJdGVtVG9BcnJheSA9IChpdGVtcykgPT4ge1xuICAgICAgY29uc3QgZHJvcEluZGV4ID0gaXRlbXMuZmluZEluZGV4KGNoaWxkID0+IGNoaWxkW2RhdGFMb29rVXBLZXldID09PSBkcm9wSWQpO1xuICAgICAgaWYgKGRyb3BJbmRleCA+IC0xKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgbmV3Q2hpbGRyZW4gPSBpdGVtcy5zbGljZSgpO1xuICAgICAgICBuZXdDaGlsZHJlbi5zcGxpY2UoZHJvcEluZGV4LCAwLCBkcmFnSXRlbSk7XG4gICAgICAgIHJldHVybiBuZXdDaGlsZHJlbjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtcztcbiAgICB9O1xuICAgIGlmICghcGFyZW50RmlsdGVyZWQgJiYgZHJhZ0l0ZW0pIHtcbiAgICAgIG5ld0l0ZW1zID0gdGhpcy5yZW1vdmVJdGVtKG5ld0l0ZW1zLCBkcmFnSXRlbVtkYXRhTG9va1VwS2V5XSk7XG4gICAgfVxuICAgIGlmIChkcm9wVG9HYXApIHtcbiAgICAgIG5ld0l0ZW1zID0gYWRkSXRlbVRvQXJyYXkobmV3SXRlbXMpO1xuICAgIH1cblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IG5ld0l0ZW1zW2ldO1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXTtcblxuICAgICAgICBpZiAoIWRyb3BUb0dhcCAmJiBkcm9wSWQgPT09IGl0ZW1bZGF0YUxvb2tVcEtleV0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgIGlmICghY2hpbGRyZW4pIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSA9IFtdO1xuICAgICAgICAgIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXS5wdXNoKGRyYWdJdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZHJlbiAmJiBkcm9wVG9HYXApIHtcbiAgICAgICAgICBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gPSBhZGRJdGVtVG9BcnJheShjaGlsZHJlbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3VuZCAmJiBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoZHJhZ0l0ZW0sIGRyYWdFdmVudCwgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWZvdW5kKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdHJlZSBpdGVtIGJ5IElEXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIHJldHVyblBhcmVudCAtIHJldHVybiBpdGVtJ3MgcGFyZW50IGluc3RlYWQgb2YgdGhlIGl0ZW1cbiAgICogQHBhcmFtIHBhcmVudCAtIHBhcmVudCBpdGVtICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICBnZXRUcmVlSXRlbSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCByZXR1cm5QYXJlbnQgPSBmYWxzZSwgcGFyZW50ID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YUxvb2tVcENoaWxkcmVuLCBkYXRhTG9va1VwS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBmb3VuZCA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2RhdGFMb29rVXBLZXldID09PSBpZCk7XG5cbiAgICBpZiAoZm91bmQgJiYgcmV0dXJuUGFyZW50KSBmb3VuZCA9IHBhcmVudDtcblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSwgcmV0dXJuUGFyZW50LCBpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmb3VuZDtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgcGFyZW50IElEcyBpbiB0aGUgdHJlZVxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICovXG4gIGdldEFsbFBhcmVudElkcyA9IChhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHByb3BzID0gdGhpcy5wcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcENoaWxkcmVuIH0gPSBwcm9wcztcbiAgICBjb25zdCBjYiA9IChhY2MsIGl0ZW0pID0+IHtcbiAgICAgIGxldCB0b3RhbCA9IGFjYztcbiAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdG90YWwgPSBhY2MuY29uY2F0KGl0ZW1bZGF0YUxvb2tVcEtleV0pO1xuICAgICAgICByZXR1cm4gaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLnJlZHVjZShjYiwgdG90YWwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH07XG4gICAgcmV0dXJuIGFycmF5LnJlZHVjZShjYiwgW10pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgYWxsIHBhcmVudCBJRHMgYXJlIGV4cGFuZGVkXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNBbGxFeHBhbmRlZCA9ICgpID0+XG4gICAgdGhpcy5zdGF0ZS5leHBhbmRlZEtleXMgJiYgdGhpcy5zdGF0ZS5leHBhbmRlZEtleXMubGVuZ3RoID09PSB0aGlzLmdldEFsbFBhcmVudElkcygpLmxlbmd0aDtcblxuXG4gIC8qKlxuICAgKiBSZW1vdmUgaXRlbSBmcm9tIGdpdmVuIGFycmF5XG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gaWRcbiAgICogQHJldHVybnMgYXJyYXkgb2YgZmlsdGVyZWQgaXRlbXNcbiAgICovXG4gIHJlbW92ZUl0ZW0gPSAoYXJyYXksIGlkKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwQ2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICBjb25zdCBpc1BhcmVudCA9IGFyciA9PiBhcnIuZmluZChjaGlsZCA9PiBjaGlsZFtkYXRhTG9va1VwS2V5XSA9PT0gaWQpO1xuICAgIGNvbnN0IGZpbHRlckNoaWxkID0gYXJyID0+IGFyci5maWx0ZXIoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gIT09IGlkKTtcblxuICAgIGlmIChpc1BhcmVudChuZXdJdGVtcykpIHtcbiAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgIG5ld0l0ZW1zID0gZmlsdGVyQ2hpbGQobmV3SXRlbXMpO1xuICAgIH1cblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IG5ld0l0ZW1zW2ldO1xuXG4gICAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgaXNQYXJlbnQoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKSkge1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gPSBmaWx0ZXJDaGlsZChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLnJlbW92ZUl0ZW0oaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLCBpZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfTtcblxuICAvKiBoYXNDaGlsZHJlbiAtIGZ1bmN0aW9uICovXG4gIGhhc0NoaWxkcmVuID0gZGF0YU9iamVjdCA9PiAoKGRhdGFPYmplY3RbdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW5dXG4gICAgJiYgZGF0YU9iamVjdFt0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbl0ubGVuZ3RoID49IDFcbiAgKSk7XG5cbiAgLyogcmVuZGVyTm9kZXMgLSBmdW5jdGlvbiAqL1xuICByZW5kZXJOb2RlcygpIHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwVmFsdWUsIGRhdGFMb29rVXBDaGlsZHJlbiwgaWNvbkNsYXNzLCBkaXNhYmxlZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjaGVja0NoaWxkcmVuID0gdGhpcy5oYXNDaGlsZHJlbjtcblxuICAgIC8vIFJlY3Vyc2l2ZSBmdW5jdGlvbiBmb3IgY29sbGVjdGluZyBub2RlczpcbiAgICBjb25zdCBtb3VudE5vZGVzID0gKG5vZGVMaXN0KSA9PiB7XG4gICAgICBjb25zdCBsaXN0ID0gW107XG4gICAgICBub2RlTGlzdC5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIGlmICghbm9kZVtkYXRhTG9va1VwS2V5XSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyBMZWFmIG5vZGVcbiAgICAgICAgaWYgKCFjaGVja0NoaWxkcmVuKG5vZGUpKSB7XG4gICAgICAgICAgbGlzdC5wdXNoKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcbiAgICAgICAgICAgIDxUcmVlTm9kZVxuICAgICAgICAgICAgICB0aXRsZT17bm9kZVtkYXRhTG9va1VwVmFsdWVdfVxuICAgICAgICAgICAgICBrZXk9e25vZGVbZGF0YUxvb2tVcEtleV19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7aWNvbkNsYXNzfSBsZWFmLW5vZGVgfVxuICAgICAgICAgICAgICBpY29uPXs8VHJlZUNoZWNrYm94IGRpc2FibGVkPXtkaXNhYmxlZH0gLz59XG4gICAgICAgICAgICAvPik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUGFyZW50IG5vZGVcbiAgICAgICAgICBsaXN0LnB1c2goIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuY3Rpb24tcGFyZW4tbmV3bGluZVxuICAgICAgICAgICAgPFRyZWVOb2RlXG4gICAgICAgICAgICAgIHRpdGxlPXtub2RlW2RhdGFMb29rVXBWYWx1ZV19XG4gICAgICAgICAgICAgIGtleT17bm9kZVtkYXRhTG9va1VwS2V5XX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtpY29uQ2xhc3N9IHBhcmVudC1ub2RlYH1cbiAgICAgICAgICAgICAgaWNvbj17PFRyZWVDaGVja2JveCBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bW91bnROb2Rlcyhub2RlW2RhdGFMb29rVXBDaGlsZHJlbl0pfVxuICAgICAgICAgICAgPC9UcmVlTm9kZT4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfTtcbiAgICByZXR1cm4gbW91bnROb2Rlcyh0aGlzLnByb3BzLnRyZWVEYXRhKTtcbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5yZW5kZXJOb2RlcygpO1xuICAgIGNvbnN0IHtcbiAgICAgIHRyZWVJZCwgY2xhc3NOYW1lLCBjaGVja2VkS2V5cywgb25TZWxlY3QsIG9uQ2hlY2ssIHNob3dMaW5lLCBzaG93SWNvbixcbiAgICAgIGNoZWNrYWJsZSwgc2VsZWN0YWJsZSwgZHJhZ2dhYmxlLCBkaXNhYmxlZCwgc2VsZWN0ZWRLZXlzLCBzaG93RXhwYW5kQWxsLCB0aXRsZSwgaGVhZGVyUmlnaHQsXG4gICAgICBzaG93T3JkZXJpbmdBcnJvd3MsIG9uT3JkZXJCdXR0b25DbGljayxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjbHNOYW1lID0gY2xhc3NOYW1lID8gYCR7Y2xhc3NOYW1lfSBvYy1yZWFjdC10cmVlYCA6ICdvYy1yZWFjdC10cmVlJztcbiAgICBjb25zdCBleHBhbmRBbGxDbHNOYW1lID0gdGhpcy5pc0FsbEV4cGFuZGVkKCkgPyAnZXhwYW5kLWFsbCcgOiAnJztcblxuICAgIHJldHVybiAoXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIDxkaXYgaWQ9XCJ0cmVlLXZpZXctY29udGFpbmVyXCIgY2xhc3NOYW1lPXtjbHNOYW1lfSBvbkNsaWNrPXt0aGlzLm9uQ29udGFpbmVyQ2xpY2t9PlxuICAgICAgICB7KHNob3dFeHBhbmRBbGwgfHwgdGl0bGUgfHwgaGVhZGVyUmlnaHQgfHwgc2hvd09yZGVyaW5nQXJyb3dzKVxuICAgICAgICAmJiAoXG4gICAgICAgICAgPGhlYWRlclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidHJlZS1oZWFkZXJcIlxuICAgICAgICAgICAgcmVmPXsoZWwpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSBlbDtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItbGVmdFwiPlxuICAgICAgICAgICAgICB7c2hvd0V4cGFuZEFsbCAmJiAhIW5vZGVzLmxlbmd0aFxuICAgICAgICAgICAgICAmJiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkV4cGFuZEFsbENsaWNrfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZXhwYW5kLWFsbC10b2dnbGUgJHtleHBhbmRBbGxDbHNOYW1lfWB9XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7dGl0bGUgJiYgPGgyPnt0aXRsZX08L2gyPn1cbiAgICAgICAgICAgICAge3Nob3dPcmRlcmluZ0Fycm93c1xuICAgICAgICAgICAgICAmJiAoXG4gICAgICAgICAgICAgICAgPE9yZGVyaW5nQXJyb3dzXG4gICAgICAgICAgICAgICAgICBvbk9yZGVyQnV0dG9uQ2xpY2s9e29uT3JkZXJCdXR0b25DbGlja31cbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkUGFyZW50PXt0aGlzLmdldFNlbGVjdGVkUGFyZW50KCl9XG4gICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7aGVhZGVyUmlnaHQgJiYgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItcmlnaHRcIj57aGVhZGVyUmlnaHR9PC9kaXY+fVxuICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICApfVxuICAgICAgICA8UGVyZmVjdFNjcm9sbEJhcj5cbiAgICAgICAgICB7ISFub2Rlcy5sZW5ndGhcbiAgICAgICAgICAmJiAoXG4gICAgICAgICAgICA8VHJlZVxuICAgICAgICAgICAgICBpZD17dHJlZUlkfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICAgICAgY2hlY2tlZEtleXM9e2NoZWNrZWRLZXlzfVxuICAgICAgICAgICAgICBzZWxlY3RlZEtleXM9e3NlbGVjdGVkS2V5c31cbiAgICAgICAgICAgICAgZXhwYW5kZWRLZXlzPXt0aGlzLnN0YXRlLmV4cGFuZGVkS2V5c31cbiAgICAgICAgICAgICAgb25FeHBhbmQ9e3RoaXMub25FeHBhbmR9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH1cbiAgICAgICAgICAgICAgb25DaGVjaz17b25DaGVja31cbiAgICAgICAgICAgICAgb25Ecm9wPXt0aGlzLm9uRHJhZ0Ryb3B9XG4gICAgICAgICAgICAgIGNoZWNrYWJsZT17Y2hlY2thYmxlfVxuICAgICAgICAgICAgICBzZWxlY3RhYmxlPXtzZWxlY3RhYmxlfVxuICAgICAgICAgICAgICBkcmFnZ2FibGU9e2RyYWdnYWJsZX1cbiAgICAgICAgICAgICAgc2hvd0xpbmU9e3Nob3dMaW5lfVxuICAgICAgICAgICAgICBzaG93SWNvbj17c2hvd0ljb259XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge25vZGVzfVxuICAgICAgICAgICAgPC9UcmVlPlxuICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIDwvUGVyZmVjdFNjcm9sbEJhcj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==