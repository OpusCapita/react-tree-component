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
    if (nextProps.handleExpandedKeysManually && nextProps.expandedKeys !== this.props.expandedKeys) {
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
        dataLookUpLeafValue = _props.dataLookUpLeafValue,
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
          var title = node[dataLookUpLeafValue] || node[dataLookUpValue];
          list.push( // eslint-disable-line function-paren-newline
          React.createElement(TreeNode, {
            title: title,
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
    var resolvedProps = {};
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
        onOrderButtonClick = _props2.onOrderButtonClick,
        defaultExpandedKeys = _props2.defaultExpandedKeys,
        handleExpandedKeysManually = _props2.handleExpandedKeysManually;

    var clsName = className ? className + ' oc-react-tree' : 'oc-react-tree';
    var expandAllClsName = this.isAllExpanded() ? 'expand-all' : '';

    // We don't pass expandedKeys to rc-tree unless we want to handle expandedKeys
    // by ourselves
    if (handleExpandedKeysManually) resolvedProps.expandedKeys = this.state.expandedKeys;

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
            _extends({
              id: treeId,
              className: className,
              checkedKeys: checkedKeys,
              selectedKeys: selectedKeys,
              defaultExpandedKeys: defaultExpandedKeys,
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
            }, resolvedProps),
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
  dataLookUpLeafValue: undefined,
  dataLookUpChildren: 'children',
  treeData: [],
  checkedKeys: [],
  selectedKeys: [],
  expandedKeys: [],
  defaultExpandedKeys: [],
  className: '',
  deselectOnContainerClick: true,
  showExpandAll: false,
  title: undefined,
  headerRight: undefined,
  showOrderingArrows: false,
  handleExpandedKeysManually: false
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
    var _props4 = _this3.props,
        onExpand = _props4.onExpand,
        handleExpandedKeysManually = _props4.handleExpandedKeysManually;

    if (!handleExpandedKeysManually) return;
    _this3.setState({ expandedKeys: expandedKeys }, function () {
      if (onExpand) onExpand(_this3.state.expandedKeys);
    });
  };

  this.onDragDrop = function (e) {
    var _props5 = _this3.props,
        onDragDrop = _props5.onDragDrop,
        isDragDropLegal = _props5.isDragDropLegal,
        treeData = _props5.treeData;

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
    var _props6 = _this3.props,
        selectedKeys = _props6.selectedKeys,
        treeData = _props6.treeData;

    var id = selectedKeys[0];
    var parent = _this3.getTreeItem(id, treeData, true);
    return parent || treeData;
  };

  this.getUpdatedTree = function (dragItem, dragEvent) {
    var array = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this3.props.treeData;
    var parentFiltered = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var _props7 = _this3.props,
        dataLookUpKey = _props7.dataLookUpKey,
        dataLookUpChildren = _props7.dataLookUpChildren;
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
    var _props8 = _this3.props,
        dataLookUpChildren = _props8.dataLookUpChildren,
        dataLookUpKey = _props8.dataLookUpKey;

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
    var _props9 = _this3.props,
        dataLookUpKey = _props9.dataLookUpKey,
        dataLookUpChildren = _props9.dataLookUpChildren;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJUcmVlIiwiVHJlZU5vZGUiLCJQZXJmZWN0U2Nyb2xsQmFyIiwiVHJlZUNoZWNrYm94IiwiT3JkZXJpbmdBcnJvd3MiLCJPQ1RyZWVWaWV3IiwicHJvcHMiLCJleHBhbmRlZEtleXMiLCJkZWZhdWx0RXhwYW5kQWxsIiwiZ2V0QWxsUGFyZW50SWRzIiwidHJlZURhdGEiLCJzdGF0ZSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJoYW5kbGVFeHBhbmRlZEtleXNNYW51YWxseSIsInNldFN0YXRlIiwicmVuZGVyTm9kZXMiLCJkYXRhTG9va1VwS2V5IiwiZGF0YUxvb2tVcFZhbHVlIiwiZGF0YUxvb2tVcExlYWZWYWx1ZSIsImRhdGFMb29rVXBDaGlsZHJlbiIsImljb25DbGFzcyIsImRpc2FibGVkIiwiY2hlY2tDaGlsZHJlbiIsImhhc0NoaWxkcmVuIiwibW91bnROb2RlcyIsIm5vZGVMaXN0IiwibGlzdCIsImZvckVhY2giLCJub2RlIiwidGl0bGUiLCJwdXNoIiwicmVuZGVyIiwibm9kZXMiLCJyZXNvbHZlZFByb3BzIiwidHJlZUlkIiwiY2xhc3NOYW1lIiwiY2hlY2tlZEtleXMiLCJvblNlbGVjdCIsIm9uQ2hlY2siLCJzaG93SWNvbiIsImNoZWNrYWJsZSIsInNlbGVjdGFibGUiLCJkcmFnZ2FibGUiLCJzZWxlY3RlZEtleXMiLCJzaG93RXhwYW5kQWxsIiwiaGVhZGVyUmlnaHQiLCJzaG93T3JkZXJpbmdBcnJvd3MiLCJvbk9yZGVyQnV0dG9uQ2xpY2siLCJkZWZhdWx0RXhwYW5kZWRLZXlzIiwiY2xzTmFtZSIsImV4cGFuZEFsbENsc05hbWUiLCJpc0FsbEV4cGFuZGVkIiwib25Db250YWluZXJDbGljayIsImVsIiwiaGVhZGVyIiwibGVuZ3RoIiwib25FeHBhbmRBbGxDbGljayIsImdldFNlbGVjdGVkUGFyZW50Iiwib25FeHBhbmQiLCJvbkRyYWdEcm9wIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCIsImlzRHJhZ0Ryb3BMZWdhbCIsImRlc2VsZWN0T25Db250YWluZXJDbGljayIsImUiLCJ0YXJnZXQiLCJ0YWdOYW1lIiwiY29udGFpbnMiLCJUeXBlRXJyb3IiLCJuZXdEYXRhIiwiZ2V0VXBkYXRlZFRyZWUiLCJnZXRUcmVlSXRlbSIsImRyYWdOb2RlIiwiZXZlbnRLZXkiLCJpZCIsInBhcmVudCIsImRyYWdJdGVtIiwiZHJhZ0V2ZW50IiwiYXJyYXkiLCJwYXJlbnRGaWx0ZXJlZCIsImRyb3BUb0dhcCIsImRyb3BJZCIsImZvdW5kIiwibmV3SXRlbXMiLCJzbGljZSIsImFkZEl0ZW1Ub0FycmF5IiwiaXRlbXMiLCJkcm9wSW5kZXgiLCJmaW5kSW5kZXgiLCJjaGlsZCIsIm5ld0NoaWxkcmVuIiwic3BsaWNlIiwicmVtb3ZlSXRlbSIsImkiLCJpdGVtIiwiY2hpbGRyZW4iLCJyZXR1cm5QYXJlbnQiLCJmaW5kIiwiY2IiLCJhY2MiLCJ0b3RhbCIsImNvbmNhdCIsInJlZHVjZSIsImlzUGFyZW50IiwiYXJyIiwiZmlsdGVyQ2hpbGQiLCJmaWx0ZXIiLCJkYXRhT2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxJQUFQLElBQWVDLFFBQWYsUUFBK0IsU0FBL0I7QUFDQSxPQUFPQyxnQkFBUCxNQUE2QixxQ0FBN0I7O0FBRUE7QUFDQSxPQUFPLDhCQUFQO0FBQ0EsT0FBTyw4QkFBUDtBQUNBLE9BQU9DLFlBQVAsTUFBeUIsMkJBQXpCO0FBQ0EsT0FBT0MsY0FBUCxNQUEyQixrQ0FBM0I7O0lBRXFCQyxVOzs7QUFxRW5CLHNCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLCtCQURpQjs7QUFBQTs7QUFFakIsUUFBTUMsZUFBZUQsTUFBTUUs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a0JBQUwsQ0FBWixDQUEzQjtBQUNBO0FBQ0Q7QUFDRCxZQUFJNEUsS0FBSzVFLGtCQUFMLEtBQTRCLENBQUNnRSxLQUFqQyxFQUF3QztBQUN0Q0Esa0JBQVEsT0FBS1UsVUFBTCxDQUFnQkUsS0FBSzVFLGtCQUFMLENBQWhCLEVBQTBDd0QsRUFBMUMsQ0FBUjtBQUNEO0FBQ0Y7QUFDRjtBQUNELFFBQUksQ0FBQ1EsS0FBTCxFQUFZLE9BQU8sS0FBUDtBQUNaLFdBQU9DLFFBQVA7QUFDRCxHOztPQUdEN0QsVyxHQUFjO0FBQUEsV0FBZ0JxRixXQUFXLE9BQUt2RyxLQUFMLENBQVdjLGtCQUF0QixLQUN6QnlGLFdBQVcsT0FBS3ZHLEtBQUwsQ0FBV2Msa0JBQXRCLEVBQTBDb0MsTUFBMUMsSUFBb0QsQ0FEM0M7QUFBQSxHOztTQWpSS25ELFUiLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBUcmVlLCB7IFRyZWVOb2RlIH0gZnJvbSAncmMtdHJlZSc7XG5pbXBvcnQgUGVyZmVjdFNjcm9sbEJhciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1wZXJmZWN0LXNjcm9sbGJhcic7XG5cbi8vIExvYWQgZGVmYXVsdCBzdHlsZXMgYW5kIG92ZXJyaWRlIHRoZW0gd2l0aCByYy10cmVlIHN0eWxlc1xuaW1wb3J0ICcuL2Fzc2V0cy9yYy10cmVlLXN0eWxlcy5zY3NzJztcbmltcG9ydCAnLi9hc3NldHMvb2MtdHJlZS1zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgVHJlZUNoZWNrYm94IGZyb20gJy4vdHJlZS1jaGVja2JveC5jb21wb25lbnQnO1xuaW1wb3J0IE9yZGVyaW5nQXJyb3dzIGZyb20gJy4vdHJlZS1vcmRlcmluZy1hcnJvd3MuY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0NUcmVlVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHRyZWVJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWNvbkNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uRXhwYW5kOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGVjazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25EcmFnRHJvcDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25PcmRlckJ1dHRvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBpc0RyYWdEcm9wTGVnYWw6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dJY29uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjaGVja2FibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRyYWdnYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgIC8vIEN1c3RvbWlzYXRpb24gLS0gZGVmaW5lIHRoZSBkYXRhIGxvb2tVcEtleXMgYW5kIGxvb2tVcFZhbHVlc1xuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcbiAgICBkYXRhTG9va1VwS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRhdGFMb29rVXBWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXRhTG9va1VwTGVhZlZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGVja2VkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgc2VsZWN0ZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBleHBhbmRlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGhhbmRsZUV4cGFuZGVkS2V5c01hbnVhbGx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2s6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGhlYWRlclJpZ2h0OiBQcm9wVHlwZXMubm9kZSxcbiAgICBzaG93T3JkZXJpbmdBcnJvd3M6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgdHJlZUlkOiAnZGVmYXVsdFRyZWUnLFxuICAgIGljb25DbGFzczogJ2NhcmV0cycsXG4gICAgb25FeHBhbmQ6IHVuZGVmaW5lZCxcbiAgICBvblNlbGVjdDogdW5kZWZpbmVkLFxuICAgIG9uQ2hlY2s6IHVuZGVmaW5lZCxcbiAgICBvbkRyYWdEcm9wOiB1bmRlZmluZWQsXG4gICAgb25PcmRlckJ1dHRvbkNsaWNrOiB1bmRlZmluZWQsXG4gICAgaXNEcmFnRHJvcExlZ2FsOiB1bmRlZmluZWQsXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIHNob3dJY29uOiB0cnVlLFxuICAgIGNoZWNrYWJsZTogZmFsc2UsXG4gICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBmYWxzZSxcbiAgICAvLyBDdXN0b21zXG4gICAgZGF0YUxvb2tVcEtleTogJ2tleScsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiAncGFyZW50JyxcbiAgICBkYXRhTG9va1VwTGVhZlZhbHVlOiB1bmRlZmluZWQsXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiAnY2hpbGRyZW4nLFxuICAgIHRyZWVEYXRhOiBbXSxcbiAgICBjaGVja2VkS2V5czogW10sXG4gICAgc2VsZWN0ZWRLZXlzOiBbXSxcbiAgICBleHBhbmRlZEtleXM6IFtdLFxuICAgIGRlZmF1bHRFeHBhbmRlZEtleXM6IFtdLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrOiB0cnVlLFxuICAgIHNob3dFeHBhbmRBbGw6IGZhbHNlLFxuICAgIHRpdGxlOiB1bmRlZmluZWQsXG4gICAgaGVhZGVyUmlnaHQ6IHVuZGVmaW5lZCxcbiAgICBzaG93T3JkZXJpbmdBcnJvd3M6IGZhbHNlLFxuICAgIGhhbmRsZUV4cGFuZGVkS2V5c01hbnVhbGx5OiBmYWxzZSxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc3QgZXhwYW5kZWRLZXlzID0gcHJvcHMuZGVmYXVsdEV4cGFuZEFsbFxuICAgICAgPyB0aGlzLmdldEFsbFBhcmVudElkcyhwcm9wcy50cmVlRGF0YSwgcHJvcHMpIDogcHJvcHMuZXhwYW5kZWRLZXlzO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGV4cGFuZGVkS2V5cyxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLmhhbmRsZUV4cGFuZGVkS2V5c01hbnVhbGx5ICYmXG4gICAgICAobmV4dFByb3BzLmV4cGFuZGVkS2V5cyAhPT0gdGhpcy5wcm9wcy5leHBhbmRlZEtleXMpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZXhwYW5kZWRLZXlzOiBuZXh0UHJvcHMuZXhwYW5kZWRLZXlzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25Db250YWluZXJDbGljayA9IChlKSA9PiB7XG4gICAgY29uc3QgeyBvblNlbGVjdCwgZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrIH0gPSB0aGlzLnByb3BzO1xuICAgIC8vIGNsaWNraW5nIG91dHNpZGUgaXRlbVxuICAgIGlmIChkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2tcbiAgICAgICYmIGUudGFyZ2V0LnRhZ05hbWUgIT09ICdTUEFOJ1xuICAgICAgJiYgKCF0aGlzLmhlYWRlciB8fCAodGhpcy5oZWFkZXIgJiYgIXRoaXMuaGVhZGVyLmNvbnRhaW5zKGUudGFyZ2V0KSkpXG4gICAgICAmJiBvblNlbGVjdCkge1xuICAgICAgb25TZWxlY3QoW10pO1xuICAgIH1cbiAgfTtcblxuICBvbkV4cGFuZCA9IChleHBhbmRlZEtleXMpID0+IHtcbiAgICBjb25zdCB7IG9uRXhwYW5kLCBoYW5kbGVFeHBhbmRlZEtleXNNYW51YWxseSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWhhbmRsZUV4cGFuZGVkS2V5c01hbnVhbGx5KSByZXR1cm47XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZGVkS2V5cyB9LCAoKSA9PiB7XG4gICAgICBpZiAob25FeHBhbmQpIG9uRXhwYW5kKHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkRyYWdEcm9wID0gKGUpID0+IHtcbiAgICBjb25zdCB7IG9uRHJhZ0Ryb3AsIGlzRHJhZ0Ryb3BMZWdhbCwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFvbkRyYWdEcm9wKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdvbkRyYWdEcm9wIGNhbGxiYWNrIGlzIG5vdCBkZWZpbmVkJyk7XG5cbiAgICAvLyBDYWxsaW5nIGlzRHJhZ0Ryb3BMZWdhbCBjYWxsYmFjayB0byBlbnN1cmUgdGhhdCB0aGlzIG1vdmUgY2FuIGJlIGRvbmVcbiAgICBpZiAoaXNEcmFnRHJvcExlZ2FsICYmICFpc0RyYWdEcm9wTGVnYWwodHJlZURhdGEsIGUpKSByZXR1cm47XG5cbiAgICBjb25zdCBuZXdEYXRhID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLmdldFRyZWVJdGVtKGUuZHJhZ05vZGUucHJvcHMuZXZlbnRLZXkpLCBlKTtcbiAgICBvbkRyYWdEcm9wKG5ld0RhdGEsIGUpO1xuICB9O1xuXG4gIG9uRXhwYW5kQWxsQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkV4cGFuZCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBleHBhbmRlZEtleXMgPSB0aGlzLmlzQWxsRXhwYW5kZWQoKSA/IFtdIDogdGhpcy5nZXRBbGxQYXJlbnRJZHMoKTtcbiAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kZWRLZXlzIH0sICgpID0+IHtcbiAgICAgIGlmIChvbkV4cGFuZCkgb25FeHBhbmQodGhpcy5zdGF0ZS5leHBhbmRlZEtleXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIGdldFNlbGVjdGVkUGFyZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc2VsZWN0ZWRLZXlzLCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpZCA9IHNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCB0cmVlRGF0YSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHBhcmVudCB8fCB0cmVlRGF0YTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB1cGRhdGVkIHRyZWUgYWZ0ZXIgRHJhZyBuJyBkcm9wIGV2ZW50XG4gICAqIEBwYXJhbSBkcmFnSXRlbSAtIGRyYWdnZWQgaXRlbVxuICAgKiBAcGFyYW0gZHJhZ0V2ZW50IC0gZXZlbnRcbiAgICogQHBhcmFtIGFycmF5IC0gdXNlZCByZWN1cnNpdmVseVxuICAgKiBAcGFyYW0gcGFyZW50RmlsdGVyZWQgLSB1c2VkIHJlY3Vyc2l2ZWx5XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0VXBkYXRlZFRyZWUgPSAoZHJhZ0l0ZW0sIGRyYWdFdmVudCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCBwYXJlbnRGaWx0ZXJlZCA9IGZhbHNlKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwQ2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBkcm9wVG9HYXAsIG5vZGUgfSA9IGRyYWdFdmVudDtcbiAgICBjb25zdCBkcm9wSWQgPSBub2RlICYmIG5vZGUucHJvcHMuZXZlbnRLZXk7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgbGV0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcblxuICAgIGNvbnN0IGFkZEl0ZW1Ub0FycmF5ID0gKGl0ZW1zKSA9PiB7XG4gICAgICBjb25zdCBkcm9wSW5kZXggPSBpdGVtcy5maW5kSW5kZXgoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gPT09IGRyb3BJZCk7XG4gICAgICBpZiAoZHJvcEluZGV4ID4gLTEpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICBjb25zdCBuZXdDaGlsZHJlbiA9IGl0ZW1zLnNsaWNlKCk7XG4gICAgICAgIG5ld0NoaWxkcmVuLnNwbGljZShkcm9wSW5kZXgsIDAsIGRyYWdJdGVtKTtcbiAgICAgICAgcmV0dXJuIG5ld0NoaWxkcmVuO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH07XG4gICAgaWYgKCFwYXJlbnRGaWx0ZXJlZCAmJiBkcmFnSXRlbSkge1xuICAgICAgbmV3SXRlbXMgPSB0aGlzLnJlbW92ZUl0ZW0obmV3SXRlbXMsIGRyYWdJdGVtW2RhdGFMb29rVXBLZXldKTtcbiAgICB9XG4gICAgaWYgKGRyb3BUb0dhcCkge1xuICAgICAgbmV3SXRlbXMgPSBhZGRJdGVtVG9BcnJheShuZXdJdGVtcyk7XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dO1xuXG4gICAgICAgIGlmICghZHJvcFRvR2FwICYmIGRyb3BJZCA9PT0gaXRlbVtkYXRhTG9va1VwS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgaWYgKCFjaGlsZHJlbikgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dID0gW107XG4gICAgICAgICAgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLnB1c2goZHJhZ0l0ZW0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkcmVuICYmIGRyb3BUb0dhcCkge1xuICAgICAgICAgIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSA9IGFkZEl0ZW1Ub0FycmF5KGNoaWxkcmVuKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvdW5kICYmIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRVcGRhdGVkVHJlZShkcmFnSXRlbSwgZHJhZ0V2ZW50LCBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0sIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB0cmVlIGl0ZW0gYnkgSURcbiAgICogQHBhcmFtIGlkXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gcmV0dXJuUGFyZW50IC0gcmV0dXJuIGl0ZW0ncyBwYXJlbnQgaW5zdGVhZCBvZiB0aGUgaXRlbVxuICAgKiBAcGFyYW0gcGFyZW50IC0gcGFyZW50IGl0ZW0gKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqIEByZXR1cm5zIHt7fX1cbiAgICovXG4gIGdldFRyZWVJdGVtID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHJldHVyblBhcmVudCA9IGZhbHNlLCBwYXJlbnQgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwQ2hpbGRyZW4sIGRhdGFMb29rVXBLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGZvdW5kID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1bZGF0YUxvb2tVcEtleV0gPT09IGlkKTtcblxuICAgIGlmIChmb3VuZCAmJiByZXR1cm5QYXJlbnQpIGZvdW5kID0gcGFyZW50O1xuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLCByZXR1cm5QYXJlbnQsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFsbCBwYXJlbnQgSURzIGluIHRoZSB0cmVlXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKi9cbiAgZ2V0QWxsUGFyZW50SWRzID0gKGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgcHJvcHMgPSB0aGlzLnByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwQ2hpbGRyZW4gfSA9IHByb3BzO1xuICAgIGNvbnN0IGNiID0gKGFjYywgaXRlbSkgPT4ge1xuICAgICAgbGV0IHRvdGFsID0gYWNjO1xuICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0ubGVuZ3RoID4gMCkge1xuICAgICAgICB0b3RhbCA9IGFjYy5jb25jYXQoaXRlbVtkYXRhTG9va1VwS2V5XSk7XG4gICAgICAgIHJldHVybiBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0ucmVkdWNlKGNiLCB0b3RhbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG90YWw7XG4gICAgfTtcbiAgICByZXR1cm4gYXJyYXkucmVkdWNlKGNiLCBbXSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCBhbGwgcGFyZW50IElEcyBhcmUgZXhwYW5kZWRcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0FsbEV4cGFuZGVkID0gKCkgPT5cbiAgICB0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cyAmJiB0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5sZW5ndGggPT09IHRoaXMuZ2V0QWxsUGFyZW50SWRzKCkubGVuZ3RoO1xuXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBpdGVtIGZyb20gZ2l2ZW4gYXJyYXlcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcmV0dXJucyBhcnJheSBvZiBmaWx0ZXJlZCBpdGVtc1xuICAgKi9cbiAgcmVtb3ZlSXRlbSA9IChhcnJheSwgaWQpID0+IHtcbiAgICBjb25zdCB7IGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBDaGlsZHJlbiB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbmV3SXRlbXMgPSBhcnJheS5zbGljZSgpO1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGNvbnN0IGlzUGFyZW50ID0gYXJyID0+IGFyci5maW5kKGNoaWxkID0+IGNoaWxkW2RhdGFMb29rVXBLZXldID09PSBpZCk7XG4gICAgY29uc3QgZmlsdGVyQ2hpbGQgPSBhcnIgPT4gYXJyLmZpbHRlcihjaGlsZCA9PiBjaGlsZFtkYXRhTG9va1VwS2V5XSAhPT0gaWQpO1xuXG4gICAgaWYgKGlzUGFyZW50KG5ld0l0ZW1zKSkge1xuICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgbmV3SXRlbXMgPSBmaWx0ZXJDaGlsZChuZXdJdGVtcyk7XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XG5cbiAgICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiBpc1BhcmVudChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pKSB7XG4gICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSA9IGZpbHRlckNoaWxkKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMucmVtb3ZlSXRlbShpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0sIGlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWZvdW5kKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xuICB9O1xuXG4gIC8qIGhhc0NoaWxkcmVuIC0gZnVuY3Rpb24gKi9cbiAgaGFzQ2hpbGRyZW4gPSBkYXRhT2JqZWN0ID0+ICgoZGF0YU9iamVjdFt0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbl1cbiAgICAmJiBkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXS5sZW5ndGggPj0gMVxuICApKTtcblxuICAvKiByZW5kZXJOb2RlcyAtIGZ1bmN0aW9uICovXG4gIHJlbmRlck5vZGVzKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBWYWx1ZSwgZGF0YUxvb2tVcExlYWZWYWx1ZSwgZGF0YUxvb2tVcENoaWxkcmVuLCBpY29uQ2xhc3MsIGRpc2FibGVkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNoZWNrQ2hpbGRyZW4gPSB0aGlzLmhhc0NoaWxkcmVuO1xuXG4gICAgLy8gUmVjdXJzaXZlIGZ1bmN0aW9uIGZvciBjb2xsZWN0aW5nIG5vZGVzOlxuICAgIGNvbnN0IG1vdW50Tm9kZXMgPSAobm9kZUxpc3QpID0+IHtcbiAgICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICAgIG5vZGVMaXN0LmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKCFub2RlW2RhdGFMb29rVXBLZXldKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vIExlYWYgbm9kZVxuICAgICAgICBpZiAoIWNoZWNrQ2hpbGRyZW4obm9kZSkpIHtcbiAgICAgICAgICBjb25zdCB0aXRsZSA9IG5vZGVbZGF0YUxvb2tVcExlYWZWYWx1ZV0gfHwgbm9kZVtkYXRhTG9va1VwVmFsdWVdO1xuICAgICAgICAgIGxpc3QucHVzaCggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jdGlvbi1wYXJlbi1uZXdsaW5lXG4gICAgICAgICAgICA8VHJlZU5vZGVcbiAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgICAgICBrZXk9e25vZGVbZGF0YUxvb2tVcEtleV19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7aWNvbkNsYXNzfSBsZWFmLW5vZGVgfVxuICAgICAgICAgICAgICBpY29uPXs8VHJlZUNoZWNrYm94IGRpc2FibGVkPXtkaXNhYmxlZH0gLz59XG4gICAgICAgICAgICAvPik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUGFyZW50IG5vZGVcbiAgICAgICAgICBsaXN0LnB1c2goIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuY3Rpb24tcGFyZW4tbmV3bGluZVxuICAgICAgICAgICAgPFRyZWVOb2RlXG4gICAgICAgICAgICAgIHRpdGxlPXtub2RlW2RhdGFMb29rVXBWYWx1ZV19XG4gICAgICAgICAgICAgIGtleT17bm9kZVtkYXRhTG9va1VwS2V5XX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtpY29uQ2xhc3N9IHBhcmVudC1ub2RlYH1cbiAgICAgICAgICAgICAgaWNvbj17PFRyZWVDaGVja2JveCBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bW91bnROb2Rlcyhub2RlW2RhdGFMb29rVXBDaGlsZHJlbl0pfVxuICAgICAgICAgICAgPC9UcmVlTm9kZT4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfTtcbiAgICByZXR1cm4gbW91bnROb2Rlcyh0aGlzLnByb3BzLnRyZWVEYXRhKTtcbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5yZW5kZXJOb2RlcygpO1xuICAgIGNvbnN0IHJlc29sdmVkUHJvcHMgPSB7fTtcbiAgICBjb25zdCB7XG4gICAgICB0cmVlSWQsIGNsYXNzTmFtZSwgY2hlY2tlZEtleXMsIG9uU2VsZWN0LCBvbkNoZWNrLCBzaG93SWNvbiwgY2hlY2thYmxlLCBzZWxlY3RhYmxlLFxuICAgICAgZHJhZ2dhYmxlLCBkaXNhYmxlZCwgc2VsZWN0ZWRLZXlzLCBzaG93RXhwYW5kQWxsLCB0aXRsZSwgaGVhZGVyUmlnaHQsIHNob3dPcmRlcmluZ0Fycm93cyxcbiAgICAgIG9uT3JkZXJCdXR0b25DbGljaywgZGVmYXVsdEV4cGFuZGVkS2V5cywgaGFuZGxlRXhwYW5kZWRLZXlzTWFudWFsbHksXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2xzTmFtZSA9IGNsYXNzTmFtZSA/IGAke2NsYXNzTmFtZX0gb2MtcmVhY3QtdHJlZWAgOiAnb2MtcmVhY3QtdHJlZSc7XG4gICAgY29uc3QgZXhwYW5kQWxsQ2xzTmFtZSA9IHRoaXMuaXNBbGxFeHBhbmRlZCgpID8gJ2V4cGFuZC1hbGwnIDogJyc7XG5cbiAgICAvLyBXZSBkb24ndCBwYXNzIGV4cGFuZGVkS2V5cyB0byByYy10cmVlIHVubGVzcyB3ZSB3YW50IHRvIGhhbmRsZSBleHBhbmRlZEtleXNcbiAgICAvLyBieSBvdXJzZWx2ZXNcbiAgICBpZiAoaGFuZGxlRXhwYW5kZWRLZXlzTWFudWFsbHkpIHJlc29sdmVkUHJvcHMuZXhwYW5kZWRLZXlzID0gdGhpcy5zdGF0ZS5leHBhbmRlZEtleXM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICA8ZGl2IGlkPVwidHJlZS12aWV3LWNvbnRhaW5lclwiIGNsYXNzTmFtZT17Y2xzTmFtZX0gb25DbGljaz17dGhpcy5vbkNvbnRhaW5lckNsaWNrfT5cbiAgICAgICAgeyhzaG93RXhwYW5kQWxsIHx8IHRpdGxlIHx8IGhlYWRlclJpZ2h0IHx8IHNob3dPcmRlcmluZ0Fycm93cylcbiAgICAgICAgJiYgKFxuICAgICAgICAgIDxoZWFkZXJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInRyZWUtaGVhZGVyXCJcbiAgICAgICAgICAgIHJlZj17KGVsKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaGVhZGVyID0gZWw7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLWxlZnRcIj5cbiAgICAgICAgICAgICAge3Nob3dFeHBhbmRBbGwgJiYgISFub2Rlcy5sZW5ndGhcbiAgICAgICAgICAgICAgJiYgKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25FeHBhbmRBbGxDbGlja31cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGV4cGFuZC1hbGwtdG9nZ2xlICR7ZXhwYW5kQWxsQ2xzTmFtZX1gfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge3RpdGxlICYmIDxoMj57dGl0bGV9PC9oMj59XG4gICAgICAgICAgICAgIHtzaG93T3JkZXJpbmdBcnJvd3NcbiAgICAgICAgICAgICAgJiYgKFxuICAgICAgICAgICAgICAgIDxPcmRlcmluZ0Fycm93c1xuICAgICAgICAgICAgICAgICAgb25PcmRlckJ1dHRvbkNsaWNrPXtvbk9yZGVyQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZFBhcmVudD17dGhpcy5nZXRTZWxlY3RlZFBhcmVudCgpfVxuICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge2hlYWRlclJpZ2h0ICYmIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXJpZ2h0XCI+e2hlYWRlclJpZ2h0fTwvZGl2Pn1cbiAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgKX1cbiAgICAgICAgPFBlcmZlY3RTY3JvbGxCYXI+XG4gICAgICAgICAgeyEhbm9kZXMubGVuZ3RoXG4gICAgICAgICAgJiYgKFxuICAgICAgICAgICAgPFRyZWVcbiAgICAgICAgICAgICAgaWQ9e3RyZWVJZH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgICAgICAgIGNoZWNrZWRLZXlzPXtjaGVja2VkS2V5c31cbiAgICAgICAgICAgICAgc2VsZWN0ZWRLZXlzPXtzZWxlY3RlZEtleXN9XG4gICAgICAgICAgICAgIGRlZmF1bHRFeHBhbmRlZEtleXM9e2RlZmF1bHRFeHBhbmRlZEtleXN9XG4gICAgICAgICAgICAgIG9uRXhwYW5kPXt0aGlzLm9uRXhwYW5kfVxuICAgICAgICAgICAgICBvblNlbGVjdD17b25TZWxlY3R9XG4gICAgICAgICAgICAgIG9uQ2hlY2s9e29uQ2hlY2t9XG4gICAgICAgICAgICAgIG9uRHJvcD17dGhpcy5vbkRyYWdEcm9wfVxuICAgICAgICAgICAgICBjaGVja2FibGU9e2NoZWNrYWJsZX1cbiAgICAgICAgICAgICAgc2VsZWN0YWJsZT17c2VsZWN0YWJsZX1cbiAgICAgICAgICAgICAgZHJhZ2dhYmxlPXtkcmFnZ2FibGV9XG4gICAgICAgICAgICAgIHNob3dMaW5lPXtmYWxzZX1cbiAgICAgICAgICAgICAgc2hvd0ljb249e3Nob3dJY29ufVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgIHsuLi5yZXNvbHZlZFByb3BzfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bm9kZXN9XG4gICAgICAgICAgICA8L1RyZWU+XG4gICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgPC9QZXJmZWN0U2Nyb2xsQmFyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19