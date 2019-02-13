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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJUcmVlIiwiVHJlZU5vZGUiLCJQZXJmZWN0U2Nyb2xsQmFyIiwiVHJlZUNoZWNrYm94IiwiT3JkZXJpbmdBcnJvd3MiLCJPQ1RyZWVWaWV3IiwicHJvcHMiLCJleHBhbmRlZEtleXMiLCJkZWZhdWx0RXhwYW5kQWxsIiwiZ2V0QWxsUGFyZW50SWRzIiwidHJlZURhdGEiLCJzdGF0ZSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJoYW5kbGVFeHBhbmRlZEtleXNNYW51YWxseSIsInNldFN0YXRlIiwicmVuZGVyTm9kZXMiLCJkYXRhTG9va1VwS2V5IiwiZGF0YUxvb2tVcFZhbHVlIiwiZGF0YUxvb2tVcENoaWxkcmVuIiwiaWNvbkNsYXNzIiwiZGlzYWJsZWQiLCJjaGVja0NoaWxkcmVuIiwiaGFzQ2hpbGRyZW4iLCJtb3VudE5vZGVzIiwibm9kZUxpc3QiLCJsaXN0IiwiZm9yRWFjaCIsIm5vZGUiLCJwdXNoIiwicmVuZGVyIiwibm9kZXMiLCJyZXNvbHZlZFByb3BzIiwidHJlZUlkIiwiY2xhc3NOYW1lIiwiY2hlY2tlZEtleXMiLCJvblNlbGVjdCIsIm9uQ2hlY2siLCJzaG93SWNvbiIsImNoZWNrYWJsZSIsInNlbGVjdGFibGUiLCJkcmFnZ2FibGUiLCJzZWxlY3RlZEtleXMiLCJzaG93RXhwYW5kQWxsIiwidGl0bGUiLCJoZWFkZXJSaWdodCIsInNob3dPcmRlcmluZ0Fycm93cyIsIm9uT3JkZXJCdXR0b25DbGljayIsImRlZmF1bHRFeHBhbmRlZEtleXMiLCJjbHNOYW1lIiwiZXhwYW5kQWxsQ2xzTmFtZSIsImlzQWxsRXhwYW5kZWQiLCJvbkNvbnRhaW5lckNsaWNrIiwiZWwiLCJoZWFkZXIiLCJsZW5ndGgiLCJvbkV4cGFuZEFsbENsaWNrIiwiZ2V0U2VsZWN0ZWRQYXJlbnQiLCJvbkV4cGFuZCIsIm9uRHJhZ0Ryb3AiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwidW5kZWZpbmVkIiwiaXNEcmFnRHJvcExlZ2FsIiwiZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrIiwiZSIsInRhcmdldCIsInRhZ05hbWUiLCJjb250YWlucyIsIlR5cGVFcnJvciIsIm5ld0RhdGEiLCJnZXRVcGRhdGVkVHJlZSIsImdldFRyZWVJdGVtIiwiZHJhZ05vZGUiLCJldmVudEtleSIsImlkIiwicGFyZW50IiwiZHJhZ0l0ZW0iLCJkcmFnRXZlbnQiLCJhcnJheSIsInBhcmVudEZpbHRlcmVkIiwiZHJvcFRvR2FwIiwiZHJvcElkIiwiZm91bmQiLCJuZXdJdGVtcyIsInNsaWNlIiwiYWRkSXRlbVRvQXJyYXkiLCJpdGVtcyIsImRyb3BJbmRleCIsImZpbmRJbmRleCIsImNoaWxkIiwibmV3Q2hpbGRyZW4iLCJzcGxpY2UiLCJyZW1vdmVJdGVtIiwiaSIsIml0ZW0iLCJjaGlsZHJlbiIsInJldHVyblBhcmVudCIsImZpbmQiLCJjYiIsImFjYyIsInRvdGFsIiwiY29uY2F0IiwicmVkdWNlIiwiaXNQYXJlbnQiLCJhcnIiLCJmaWx0ZXJDaGlsZCIsImZpbHRlciIsImRhdGFPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLElBQVAsSUFBZUMsUUFBZixRQUErQixTQUEvQjtBQUNBLE9BQU9DLGdCQUFQLE1BQTZCLHFDQUE3Qjs7QUFFQTtBQUNBLE9BQU8sOEJBQVA7QUFDQSxPQUFPLDhCQUFQO0FBQ0EsT0FBT0MsWUFBUCxNQUF5QiwyQkFBekI7QUFDQSxPQUFPQyxjQUFQLE1BQTJCLGtDQUEzQjs7SUFFcUJDLFU7OztBQW1FbkIsc0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsK0JBRGlCOztBQUFBOztBQUVqQixRQUFNQyxlQUFlRCxNQUFNRSxnQkFBTixHQUNqQixNQUFLQyxlQUFM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QixFQUEwQ3dELEVBQTFDLENBQVI7QUFDRDtBQUNGO0FBQ0Y7QUFDRCxRQUFJLENBQUNRLEtBQUwsRUFBWSxPQUFPLEtBQVA7QUFDWixXQUFPQyxRQUFQO0FBQ0QsRzs7T0FHRDdELFcsR0FBYztBQUFBLFdBQWdCcUYsV0FBVyxPQUFLdEcsS0FBTCxDQUFXYSxrQkFBdEIsS0FDekJ5RixXQUFXLE9BQUt0RyxLQUFMLENBQVdhLGtCQUF0QixFQUEwQ29DLE1BQTFDLElBQW9ELENBRDNDO0FBQUEsRzs7U0EvUUtsRCxVIiwiZmlsZSI6InRyZWUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgVHJlZSwgeyBUcmVlTm9kZSB9IGZyb20gJ3JjLXRyZWUnO1xuaW1wb3J0IFBlcmZlY3RTY3JvbGxCYXIgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtcGVyZmVjdC1zY3JvbGxiYXInO1xuXG4vLyBMb2FkIGRlZmF1bHQgc3R5bGVzIGFuZCBvdmVycmlkZSB0aGVtIHdpdGggcmMtdHJlZSBzdHlsZXNcbmltcG9ydCAnLi9hc3NldHMvcmMtdHJlZS1zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgJy4vYXNzZXRzL29jLXRyZWUtc3R5bGVzLnNjc3MnO1xuaW1wb3J0IFRyZWVDaGVja2JveCBmcm9tICcuL3RyZWUtY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCBPcmRlcmluZ0Fycm93cyBmcm9tICcuL3RyZWUtb3JkZXJpbmctYXJyb3dzLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9DVHJlZVZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB0cmVlSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGljb25DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkV4cGFuZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRHJhZ0Ryb3A6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uT3JkZXJCdXR0b25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNEcmFnRHJvcExlZ2FsOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93SWNvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hlY2thYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkcmFnZ2FibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAvLyBDdXN0b21pc2F0aW9uIC0tIGRlZmluZSB0aGUgZGF0YSBsb29rVXBLZXlzIGFuZCBsb29rVXBWYWx1ZXNcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksXG4gICAgZGF0YUxvb2tVcEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXRhTG9va1VwVmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoZWNrZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBzZWxlY3RlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGV4cGFuZGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgaGFuZGxlRXhwYW5kZWRLZXlzTWFudWFsbHk6IFByb3BUeXBlcy5ib29sLFxuICAgIGRlZmF1bHRFeHBhbmRlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGRlc2VsZWN0T25Db250YWluZXJDbGljazogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0V4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaGVhZGVyUmlnaHQ6IFByb3BUeXBlcy5ub2RlLFxuICAgIHNob3dPcmRlcmluZ0Fycm93czogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB0cmVlSWQ6ICdkZWZhdWx0VHJlZScsXG4gICAgaWNvbkNsYXNzOiAnY2FyZXRzJyxcbiAgICBvbkV4cGFuZDogdW5kZWZpbmVkLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25DaGVjazogdW5kZWZpbmVkLFxuICAgIG9uRHJhZ0Ryb3A6IHVuZGVmaW5lZCxcbiAgICBvbk9yZGVyQnV0dG9uQ2xpY2s6IHVuZGVmaW5lZCxcbiAgICBpc0RyYWdEcm9wTGVnYWw6IHVuZGVmaW5lZCxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgc2hvd0ljb246IHRydWUsXG4gICAgY2hlY2thYmxlOiBmYWxzZSxcbiAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgIHNlbGVjdGFibGU6IGZhbHNlLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IGZhbHNlLFxuICAgIC8vIEN1c3RvbXNcbiAgICBkYXRhTG9va1VwS2V5OiAna2V5JyxcbiAgICBkYXRhTG9va1VwVmFsdWU6ICdwYXJlbnQnLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogJ2NoaWxkcmVuJyxcbiAgICB0cmVlRGF0YTogW10sXG4gICAgY2hlY2tlZEtleXM6IFtdLFxuICAgIHNlbGVjdGVkS2V5czogW10sXG4gICAgZXhwYW5kZWRLZXlzOiBbXSxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBbXSxcbiAgICBjbGFzc05hbWU6ICcnLFxuICAgIGRlc2VsZWN0T25Db250YWluZXJDbGljazogdHJ1ZSxcbiAgICBzaG93RXhwYW5kQWxsOiBmYWxzZSxcbiAgICB0aXRsZTogdW5kZWZpbmVkLFxuICAgIGhlYWRlclJpZ2h0OiB1bmRlZmluZWQsXG4gICAgc2hvd09yZGVyaW5nQXJyb3dzOiBmYWxzZSxcbiAgICBoYW5kbGVFeHBhbmRlZEtleXNNYW51YWxseTogZmFsc2UsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnN0IGV4cGFuZGVkS2V5cyA9IHByb3BzLmRlZmF1bHRFeHBhbmRBbGxcbiAgICAgID8gdGhpcy5nZXRBbGxQYXJlbnRJZHMocHJvcHMudHJlZURhdGEsIHByb3BzKSA6IHByb3BzLmV4cGFuZGVkS2V5cztcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBleHBhbmRlZEtleXMsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKG5leHRQcm9wcy5oYW5kbGVFeHBhbmRlZEtleXNNYW51YWxseSAmJlxuICAgICAgKG5leHRQcm9wcy5leHBhbmRlZEtleXMgIT09IHRoaXMucHJvcHMuZXhwYW5kZWRLZXlzKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGV4cGFuZGVkS2V5czogbmV4dFByb3BzLmV4cGFuZGVkS2V5cyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uQ29udGFpbmVyQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHsgb25TZWxlY3QsIGRlc2VsZWN0T25Db250YWluZXJDbGljayB9ID0gdGhpcy5wcm9wcztcbiAgICAvLyBjbGlja2luZyBvdXRzaWRlIGl0ZW1cbiAgICBpZiAoZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrXG4gICAgICAmJiBlLnRhcmdldC50YWdOYW1lICE9PSAnU1BBTidcbiAgICAgICYmICghdGhpcy5oZWFkZXIgfHwgKHRoaXMuaGVhZGVyICYmICF0aGlzLmhlYWRlci5jb250YWlucyhlLnRhcmdldCkpKVxuICAgICAgJiYgb25TZWxlY3QpIHtcbiAgICAgIG9uU2VsZWN0KFtdKTtcbiAgICB9XG4gIH07XG5cbiAgb25FeHBhbmQgPSAoZXhwYW5kZWRLZXlzKSA9PiB7XG4gICAgY29uc3QgeyBvbkV4cGFuZCwgaGFuZGxlRXhwYW5kZWRLZXlzTWFudWFsbHkgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFoYW5kbGVFeHBhbmRlZEtleXNNYW51YWxseSkgcmV0dXJuO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmRlZEtleXMgfSwgKCkgPT4ge1xuICAgICAgaWYgKG9uRXhwYW5kKSBvbkV4cGFuZCh0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cyk7XG4gICAgfSk7XG4gIH07XG5cbiAgb25EcmFnRHJvcCA9IChlKSA9PiB7XG4gICAgY29uc3QgeyBvbkRyYWdEcm9wLCBpc0RyYWdEcm9wTGVnYWwsIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghb25EcmFnRHJvcCkgdGhyb3cgbmV3IFR5cGVFcnJvcignb25EcmFnRHJvcCBjYWxsYmFjayBpcyBub3QgZGVmaW5lZCcpO1xuXG4gICAgLy8gQ2FsbGluZyBpc0RyYWdEcm9wTGVnYWwgY2FsbGJhY2sgdG8gZW5zdXJlIHRoYXQgdGhpcyBtb3ZlIGNhbiBiZSBkb25lXG4gICAgaWYgKGlzRHJhZ0Ryb3BMZWdhbCAmJiAhaXNEcmFnRHJvcExlZ2FsKHRyZWVEYXRhLCBlKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgbmV3RGF0YSA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5nZXRUcmVlSXRlbShlLmRyYWdOb2RlLnByb3BzLmV2ZW50S2V5KSwgZSk7XG4gICAgb25EcmFnRHJvcChuZXdEYXRhLCBlKTtcbiAgfTtcblxuICBvbkV4cGFuZEFsbENsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25FeHBhbmQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZXhwYW5kZWRLZXlzID0gdGhpcy5pc0FsbEV4cGFuZGVkKCkgPyBbXSA6IHRoaXMuZ2V0QWxsUGFyZW50SWRzKCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZGVkS2V5cyB9LCAoKSA9PiB7XG4gICAgICBpZiAob25FeHBhbmQpIG9uRXhwYW5kKHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzKTtcbiAgICB9KTtcbiAgfTtcblxuICBnZXRTZWxlY3RlZFBhcmVudCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdGVkS2V5cywgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaWQgPSBzZWxlY3RlZEtleXNbMF07XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgdHJlZURhdGEsIHRydWUpO1xuICAgIHJldHVybiBwYXJlbnQgfHwgdHJlZURhdGE7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdXBkYXRlZCB0cmVlIGFmdGVyIERyYWcgbicgZHJvcCBldmVudFxuICAgKiBAcGFyYW0gZHJhZ0l0ZW0gLSBkcmFnZ2VkIGl0ZW1cbiAgICogQHBhcmFtIGRyYWdFdmVudCAtIGV2ZW50XG4gICAqIEBwYXJhbSBhcnJheSAtIHVzZWQgcmVjdXJzaXZlbHlcbiAgICogQHBhcmFtIHBhcmVudEZpbHRlcmVkIC0gdXNlZCByZWN1cnNpdmVseVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldFVwZGF0ZWRUcmVlID0gKGRyYWdJdGVtLCBkcmFnRXZlbnQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgcGFyZW50RmlsdGVyZWQgPSBmYWxzZSkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcENoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgZHJvcFRvR2FwLCBub2RlIH0gPSBkcmFnRXZlbnQ7XG4gICAgY29uc3QgZHJvcElkID0gbm9kZSAmJiBub2RlLnByb3BzLmV2ZW50S2V5O1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGxldCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XG5cbiAgICBjb25zdCBhZGRJdGVtVG9BcnJheSA9IChpdGVtcykgPT4ge1xuICAgICAgY29uc3QgZHJvcEluZGV4ID0gaXRlbXMuZmluZEluZGV4KGNoaWxkID0+IGNoaWxkW2RhdGFMb29rVXBLZXldID09PSBkcm9wSWQpO1xuICAgICAgaWYgKGRyb3BJbmRleCA+IC0xKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgbmV3Q2hpbGRyZW4gPSBpdGVtcy5zbGljZSgpO1xuICAgICAgICBuZXdDaGlsZHJlbi5zcGxpY2UoZHJvcEluZGV4LCAwLCBkcmFnSXRlbSk7XG4gICAgICAgIHJldHVybiBuZXdDaGlsZHJlbjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtcztcbiAgICB9O1xuICAgIGlmICghcGFyZW50RmlsdGVyZWQgJiYgZHJhZ0l0ZW0pIHtcbiAgICAgIG5ld0l0ZW1zID0gdGhpcy5yZW1vdmVJdGVtKG5ld0l0ZW1zLCBkcmFnSXRlbVtkYXRhTG9va1VwS2V5XSk7XG4gICAgfVxuICAgIGlmIChkcm9wVG9HYXApIHtcbiAgICAgIG5ld0l0ZW1zID0gYWRkSXRlbVRvQXJyYXkobmV3SXRlbXMpO1xuICAgIH1cblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IG5ld0l0ZW1zW2ldO1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXTtcblxuICAgICAgICBpZiAoIWRyb3BUb0dhcCAmJiBkcm9wSWQgPT09IGl0ZW1bZGF0YUxvb2tVcEtleV0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgIGlmICghY2hpbGRyZW4pIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSA9IFtdO1xuICAgICAgICAgIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXS5wdXNoKGRyYWdJdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZHJlbiAmJiBkcm9wVG9HYXApIHtcbiAgICAgICAgICBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gPSBhZGRJdGVtVG9BcnJheShjaGlsZHJlbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3VuZCAmJiBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoZHJhZ0l0ZW0sIGRyYWdFdmVudCwgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWZvdW5kKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdHJlZSBpdGVtIGJ5IElEXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIHJldHVyblBhcmVudCAtIHJldHVybiBpdGVtJ3MgcGFyZW50IGluc3RlYWQgb2YgdGhlIGl0ZW1cbiAgICogQHBhcmFtIHBhcmVudCAtIHBhcmVudCBpdGVtICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICBnZXRUcmVlSXRlbSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCByZXR1cm5QYXJlbnQgPSBmYWxzZSwgcGFyZW50ID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YUxvb2tVcENoaWxkcmVuLCBkYXRhTG9va1VwS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBmb3VuZCA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2RhdGFMb29rVXBLZXldID09PSBpZCk7XG5cbiAgICBpZiAoZm91bmQgJiYgcmV0dXJuUGFyZW50KSBmb3VuZCA9IHBhcmVudDtcblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSwgcmV0dXJuUGFyZW50LCBpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmb3VuZDtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgcGFyZW50IElEcyBpbiB0aGUgdHJlZVxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICovXG4gIGdldEFsbFBhcmVudElkcyA9IChhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHByb3BzID0gdGhpcy5wcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcENoaWxkcmVuIH0gPSBwcm9wcztcbiAgICBjb25zdCBjYiA9IChhY2MsIGl0ZW0pID0+IHtcbiAgICAgIGxldCB0b3RhbCA9IGFjYztcbiAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdG90YWwgPSBhY2MuY29uY2F0KGl0ZW1bZGF0YUxvb2tVcEtleV0pO1xuICAgICAgICByZXR1cm4gaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLnJlZHVjZShjYiwgdG90YWwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH07XG4gICAgcmV0dXJuIGFycmF5LnJlZHVjZShjYiwgW10pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgYWxsIHBhcmVudCBJRHMgYXJlIGV4cGFuZGVkXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNBbGxFeHBhbmRlZCA9ICgpID0+XG4gICAgdGhpcy5zdGF0ZS5leHBhbmRlZEtleXMgJiYgdGhpcy5zdGF0ZS5leHBhbmRlZEtleXMubGVuZ3RoID09PSB0aGlzLmdldEFsbFBhcmVudElkcygpLmxlbmd0aDtcblxuXG4gIC8qKlxuICAgKiBSZW1vdmUgaXRlbSBmcm9tIGdpdmVuIGFycmF5XG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gaWRcbiAgICogQHJldHVybnMgYXJyYXkgb2YgZmlsdGVyZWQgaXRlbXNcbiAgICovXG4gIHJlbW92ZUl0ZW0gPSAoYXJyYXksIGlkKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwQ2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICBjb25zdCBpc1BhcmVudCA9IGFyciA9PiBhcnIuZmluZChjaGlsZCA9PiBjaGlsZFtkYXRhTG9va1VwS2V5XSA9PT0gaWQpO1xuICAgIGNvbnN0IGZpbHRlckNoaWxkID0gYXJyID0+IGFyci5maWx0ZXIoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gIT09IGlkKTtcblxuICAgIGlmIChpc1BhcmVudChuZXdJdGVtcykpIHtcbiAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgIG5ld0l0ZW1zID0gZmlsdGVyQ2hpbGQobmV3SXRlbXMpO1xuICAgIH1cblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IG5ld0l0ZW1zW2ldO1xuXG4gICAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgaXNQYXJlbnQoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKSkge1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gPSBmaWx0ZXJDaGlsZChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLnJlbW92ZUl0ZW0oaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLCBpZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfTtcblxuICAvKiBoYXNDaGlsZHJlbiAtIGZ1bmN0aW9uICovXG4gIGhhc0NoaWxkcmVuID0gZGF0YU9iamVjdCA9PiAoKGRhdGFPYmplY3RbdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW5dXG4gICAgJiYgZGF0YU9iamVjdFt0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbl0ubGVuZ3RoID49IDFcbiAgKSk7XG5cbiAgLyogcmVuZGVyTm9kZXMgLSBmdW5jdGlvbiAqL1xuICByZW5kZXJOb2RlcygpIHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwVmFsdWUsIGRhdGFMb29rVXBDaGlsZHJlbiwgaWNvbkNsYXNzLCBkaXNhYmxlZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjaGVja0NoaWxkcmVuID0gdGhpcy5oYXNDaGlsZHJlbjtcblxuICAgIC8vIFJlY3Vyc2l2ZSBmdW5jdGlvbiBmb3IgY29sbGVjdGluZyBub2RlczpcbiAgICBjb25zdCBtb3VudE5vZGVzID0gKG5vZGVMaXN0KSA9PiB7XG4gICAgICBjb25zdCBsaXN0ID0gW107XG4gICAgICBub2RlTGlzdC5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIGlmICghbm9kZVtkYXRhTG9va1VwS2V5XSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyBMZWFmIG5vZGVcbiAgICAgICAgaWYgKCFjaGVja0NoaWxkcmVuKG5vZGUpKSB7XG4gICAgICAgICAgbGlzdC5wdXNoKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcbiAgICAgICAgICAgIDxUcmVlTm9kZVxuICAgICAgICAgICAgICB0aXRsZT17bm9kZVtkYXRhTG9va1VwVmFsdWVdfVxuICAgICAgICAgICAgICBrZXk9e25vZGVbZGF0YUxvb2tVcEtleV19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7aWNvbkNsYXNzfSBsZWFmLW5vZGVgfVxuICAgICAgICAgICAgICBpY29uPXs8VHJlZUNoZWNrYm94IGRpc2FibGVkPXtkaXNhYmxlZH0gLz59XG4gICAgICAgICAgICAvPik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUGFyZW50IG5vZGVcbiAgICAgICAgICBsaXN0LnB1c2goIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuY3Rpb24tcGFyZW4tbmV3bGluZVxuICAgICAgICAgICAgPFRyZWVOb2RlXG4gICAgICAgICAgICAgIHRpdGxlPXtub2RlW2RhdGFMb29rVXBWYWx1ZV19XG4gICAgICAgICAgICAgIGtleT17bm9kZVtkYXRhTG9va1VwS2V5XX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtpY29uQ2xhc3N9IHBhcmVudC1ub2RlYH1cbiAgICAgICAgICAgICAgaWNvbj17PFRyZWVDaGVja2JveCBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bW91bnROb2Rlcyhub2RlW2RhdGFMb29rVXBDaGlsZHJlbl0pfVxuICAgICAgICAgICAgPC9UcmVlTm9kZT4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfTtcbiAgICByZXR1cm4gbW91bnROb2Rlcyh0aGlzLnByb3BzLnRyZWVEYXRhKTtcbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5yZW5kZXJOb2RlcygpO1xuICAgIGNvbnN0IHJlc29sdmVkUHJvcHMgPSB7fTtcbiAgICBjb25zdCB7XG4gICAgICB0cmVlSWQsIGNsYXNzTmFtZSwgY2hlY2tlZEtleXMsIG9uU2VsZWN0LCBvbkNoZWNrLCBzaG93SWNvbiwgY2hlY2thYmxlLCBzZWxlY3RhYmxlLFxuICAgICAgZHJhZ2dhYmxlLCBkaXNhYmxlZCwgc2VsZWN0ZWRLZXlzLCBzaG93RXhwYW5kQWxsLCB0aXRsZSwgaGVhZGVyUmlnaHQsIHNob3dPcmRlcmluZ0Fycm93cyxcbiAgICAgIG9uT3JkZXJCdXR0b25DbGljaywgZGVmYXVsdEV4cGFuZGVkS2V5cywgaGFuZGxlRXhwYW5kZWRLZXlzTWFudWFsbHksXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2xzTmFtZSA9IGNsYXNzTmFtZSA/IGAke2NsYXNzTmFtZX0gb2MtcmVhY3QtdHJlZWAgOiAnb2MtcmVhY3QtdHJlZSc7XG4gICAgY29uc3QgZXhwYW5kQWxsQ2xzTmFtZSA9IHRoaXMuaXNBbGxFeHBhbmRlZCgpID8gJ2V4cGFuZC1hbGwnIDogJyc7XG5cbiAgICAvLyBXZSBkb24ndCBwYXNzIGV4cGFuZGVkS2V5cyB0byByYy10cmVlIHVubGVzcyB3ZSB3YW50IHRvIGhhbmRsZSBleHBhbmRlZEtleXNcbiAgICAvLyBieSBvdXJzZWx2ZXNcbiAgICBpZiAoaGFuZGxlRXhwYW5kZWRLZXlzTWFudWFsbHkpIHJlc29sdmVkUHJvcHMuZXhwYW5kZWRLZXlzID0gdGhpcy5zdGF0ZS5leHBhbmRlZEtleXM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICA8ZGl2IGlkPVwidHJlZS12aWV3LWNvbnRhaW5lclwiIGNsYXNzTmFtZT17Y2xzTmFtZX0gb25DbGljaz17dGhpcy5vbkNvbnRhaW5lckNsaWNrfT5cbiAgICAgICAgeyhzaG93RXhwYW5kQWxsIHx8IHRpdGxlIHx8IGhlYWRlclJpZ2h0IHx8IHNob3dPcmRlcmluZ0Fycm93cylcbiAgICAgICAgJiYgKFxuICAgICAgICAgIDxoZWFkZXJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInRyZWUtaGVhZGVyXCJcbiAgICAgICAgICAgIHJlZj17KGVsKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaGVhZGVyID0gZWw7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLWxlZnRcIj5cbiAgICAgICAgICAgICAge3Nob3dFeHBhbmRBbGwgJiYgISFub2Rlcy5sZW5ndGhcbiAgICAgICAgICAgICAgJiYgKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25FeHBhbmRBbGxDbGlja31cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGV4cGFuZC1hbGwtdG9nZ2xlICR7ZXhwYW5kQWxsQ2xzTmFtZX1gfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge3RpdGxlICYmIDxoMj57dGl0bGV9PC9oMj59XG4gICAgICAgICAgICAgIHtzaG93T3JkZXJpbmdBcnJvd3NcbiAgICAgICAgICAgICAgJiYgKFxuICAgICAgICAgICAgICAgIDxPcmRlcmluZ0Fycm93c1xuICAgICAgICAgICAgICAgICAgb25PcmRlckJ1dHRvbkNsaWNrPXtvbk9yZGVyQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZFBhcmVudD17dGhpcy5nZXRTZWxlY3RlZFBhcmVudCgpfVxuICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge2hlYWRlclJpZ2h0ICYmIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXJpZ2h0XCI+e2hlYWRlclJpZ2h0fTwvZGl2Pn1cbiAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgKX1cbiAgICAgICAgPFBlcmZlY3RTY3JvbGxCYXI+XG4gICAgICAgICAgeyEhbm9kZXMubGVuZ3RoXG4gICAgICAgICAgJiYgKFxuICAgICAgICAgICAgPFRyZWVcbiAgICAgICAgICAgICAgaWQ9e3RyZWVJZH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgICAgICAgIGNoZWNrZWRLZXlzPXtjaGVja2VkS2V5c31cbiAgICAgICAgICAgICAgc2VsZWN0ZWRLZXlzPXtzZWxlY3RlZEtleXN9XG4gICAgICAgICAgICAgIGRlZmF1bHRFeHBhbmRlZEtleXM9e2RlZmF1bHRFeHBhbmRlZEtleXN9XG4gICAgICAgICAgICAgIG9uRXhwYW5kPXt0aGlzLm9uRXhwYW5kfVxuICAgICAgICAgICAgICBvblNlbGVjdD17b25TZWxlY3R9XG4gICAgICAgICAgICAgIG9uQ2hlY2s9e29uQ2hlY2t9XG4gICAgICAgICAgICAgIG9uRHJvcD17dGhpcy5vbkRyYWdEcm9wfVxuICAgICAgICAgICAgICBjaGVja2FibGU9e2NoZWNrYWJsZX1cbiAgICAgICAgICAgICAgc2VsZWN0YWJsZT17c2VsZWN0YWJsZX1cbiAgICAgICAgICAgICAgZHJhZ2dhYmxlPXtkcmFnZ2FibGV9XG4gICAgICAgICAgICAgIHNob3dMaW5lPXtmYWxzZX1cbiAgICAgICAgICAgICAgc2hvd0ljb249e3Nob3dJY29ufVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgIHsuLi5yZXNvbHZlZFByb3BzfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bm9kZXN9XG4gICAgICAgICAgICA8L1RyZWU+XG4gICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgPC9QZXJmZWN0U2Nyb2xsQmFyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19