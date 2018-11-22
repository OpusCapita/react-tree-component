var _class, _temp, _initialiseProps;

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

var OCTreeView = (_temp = _class = function (_React$PureComponent) {
  _inherits(OCTreeView, _React$PureComponent);

  function OCTreeView(props) {
    _classCallCheck(this, OCTreeView);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this));

    _initialiseProps.call(_this);

    var expandedKeys = props.defaultExpandAll ? _this.getAllParentIds(props.treeData, props) : props.defaultExpandedKeys;

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
   * @param array - used recursively
   * @returns {Object}
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
    var nodes = this.renderNodes();
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
        draggable = _props2.draggable,
        disabled = _props2.disabled,
        selectedKeys = _props2.selectedKeys,
        showExpandAll = _props2.showExpandAll,
        title = _props2.title,
        headerRight = _props2.headerRight;

    var clsName = className ? className + ' oc-react-tree' : 'oc-react-tree';
    var expandAllClsName = this.isAllExpanded() ? 'expand-all' : '';

    return (
      // eslint-disable-next-line
      React.createElement(
        'div',
        { id: 'tree-view-container', className: clsName, onClick: this.onContainerClick },
        (showExpandAll || title || headerRight) && React.createElement(
          'header',
          { className: 'title-container' },
          showExpandAll && React.createElement('button', { onClick: this.onExpandAllClick, className: 'expand-all-toggle ' + expandAllClsName }),
          title && React.createElement(
            'h2',
            null,
            title
          ),
          headerRight && React.createElement(
            'div',
            { className: 'header-right' },
            headerRight
          )
        ),
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
            expandedKeys: this.state.expandedKeys,
            onExpand: onExpand,
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
  deselectOnContainerClick: true,
  showExpandAll: false,
  title: undefined,
  headerRight: undefined
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onContainerClick = function (e) {
    var _props3 = _this2.props,
        onSelect = _props3.onSelect,
        deselectOnContainerClick = _props3.deselectOnContainerClick;
    // clicking outside item

    if (deselectOnContainerClick && e.target.tagName !== 'SPAN') {
      onSelect([]);
    }
  };

  this.onDragDrop = function (e) {
    var _props4 = _this2.props,
        onDragDrop = _props4.onDragDrop,
        isDragDropLegal = _props4.isDragDropLegal,
        treeData = _props4.treeData;

    if (!onDragDrop) throw new TypeError('onDragDrop callback is not defined');

    // Calling isDragDropLegal callback to ensure that this move can be done
    if (isDragDropLegal && !isDragDropLegal(treeData, e)) return;

    var newData = _this2.getUpdatedTree(_this2.getTreeItem(e.dragNode.props.eventKey), e);
    onDragDrop(newData, e);
  };

  this.onExpandAllClick = function () {
    var onExpand = _this2.props.onExpand;

    var expandedKeys = _this2.isAllExpanded() ? [] : _this2.getAllParentIds();
    _this2.setState({ expandedKeys: expandedKeys }, function () {
      if (onExpand) onExpand(_this2.state.expandedKeys);
    });
  };

  this.getUpdatedTree = function (dragItem, dragEvent) {
    var array = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this2.props.treeData;
    var parentFiltered = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var _props5 = _this2.props,
        dataLookUpKey = _props5.dataLookUpKey,
        dataLookUpChildren = _props5.dataLookUpChildren;
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
      newItems = _this2.removeItem(newItems, dragItem[dataLookUpKey]);
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
          found = _this2.getUpdatedTree(dragItem, dragEvent, item[dataLookUpChildren], true);
        }
      }
    }
    if (!found) return false;
    return newItems;
  };

  this.getTreeItem = function (id) {
    var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this2.props.treeData;
    var _props6 = _this2.props,
        dataLookUpChildren = _props6.dataLookUpChildren,
        dataLookUpKey = _props6.dataLookUpKey;

    var found = array.find(function (item) {
      return item[dataLookUpKey] === id;
    });
    if (!found) {
      array.forEach(function (item) {
        if (item[dataLookUpChildren] && !found) {
          found = _this2.getTreeItem(id, item[dataLookUpChildren]);
        }
      });
    }
    return found;
  };

  this.getAllParentIds = function () {
    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this2.props.treeData;
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this2.props;
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
    return _this2.state.expandedKeys.length === _this2.getAllParentIds().length;
  };

  this.removeItem = function (array, id) {
    var _props7 = _this2.props,
        dataLookUpKey = _props7.dataLookUpKey,
        dataLookUpChildren = _props7.dataLookUpChildren;

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
          found = _this2.removeItem(item[dataLookUpChildren], id);
        }
      }
    }
    if (!found) return false;
    return newItems;
  };

  this.hasChildren = function (dataObject) {
    return dataObject[_this2.props.dataLookUpChildren] && dataObject[_this2.props.dataLookUpChildren].length >= 1;
  };
}, _temp);
export { OCTreeView as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJUcmVlIiwiVHJlZU5vZGUiLCJUcmVlQ2hlY2tib3giLCJPQ1RyZWVWaWV3IiwicHJvcHMiLCJleHBhbmRlZEtleXMiLCJkZWZhdWx0RXhwYW5kQWxsIiwiZ2V0QWxsUGFyZW50SWRzIiwidHJlZURhdGEiLCJkZWZhdWx0RXhwYW5kZWRLZXlzIiwic3RhdGUiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJyZW5kZXJOb2RlcyIsImRhdGFMb29rVXBLZXkiLCJkYXRhTG9va1VwVmFsdWUiLCJkYXRhTG9va1VwQ2hpbGRyZW4iLCJpY29uQ2xhc3MiLCJkaXNhYmxlZCIsImNoZWNrQ2hpbGRyZW4iLCJoYXNDaGlsZHJlbiIsIm1vdW50Tm9kZXMiLCJub2RlTGlzdCIsImxpc3QiLCJmb3JFYWNoIiwibm9kZSIsInB1c2giLCJyZW5kZXIiLCJub2RlcyIsInRyZWVJZCIsImNsYXNzTmFtZSIsImRlZmF1bHRTZWxlY3RlZEtleXMiLCJkZWZhdWx0Q2hlY2tlZEtleXMiLCJjaGVja2VkS2V5cyIsIm9uRXhwYW5kIiwib25TZWxlY3QiLCJvbkNoZWNrIiwic2hvd0xpbmUiLCJzaG93SWNvbiIsImNoZWNrYWJsZSIsInNlbGVjdGFibGUiLCJkcmFnZ2FibGUiLCJzZWxlY3RlZEtleXMiLCJzaG93RXhwYW5kQWxsIiwidGl0bGUiLCJoZWFkZXJSaWdodCIsImNsc05hbWUiLCJleHBhbmRBbGxDbHNOYW1lIiwiaXNBbGxFeHBhbmRlZCIsIm9uQ29udGFpbmVyQ2xpY2siLCJvbkV4cGFuZEFsbENsaWNrIiwibGVuZ3RoIiwib25EcmFnRHJvcCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiLCJpc0RyYWdEcm9wTGVnYWwiLCJkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2siLCJlIiwidGFyZ2V0IiwidGFnTmFtZSIsIlR5cGVFcnJvciIsIm5ld0RhdGEiLCJnZXRVcGRhdGVkVHJlZSIsImdldFRyZWVJdGVtIiwiZHJhZ05vZGUiLCJldmVudEtleSIsImRyYWdJdGVtIiwiZHJhZ0V2ZW50IiwiYXJyYXkiLCJwYXJlbnRGaWx0ZXJlZCIsImRyb3BUb0dhcCIsImRyb3BJZCIsImZvdW5kIiwibmV3SXRlbXMiLCJzbGljZSIsImFkZEl0ZW1Ub0FycmF5IiwiaXRlbXMiLCJkcm9wSW5kZXgiLCJmaW5kSW5kZXgiLCJjaGlsZCIsIm5ld0NoaWxkcmVuIiwic3BsaWNlIiwicmVtb3ZlSXRlbSIsImkiLCJpdGVtIiwiY2hpbGRyZW4iLCJpZCIsImZpbmQiLCJjYiIsImFjYyIsInRvdGFsIiwiY29uY2F0IiwicmVkdWNlIiwiaXNQYXJlbnQiLCJhcnIiLCJmaWx0ZXJDaGlsZCIsImZpbHRlciIsImRhdGFPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxJQUFQLElBQWVDLFFBQWYsUUFBK0IsU0FBL0I7QUFDQSxPQUFPLDBCQUFQOztBQUVBO0FBQ0EsT0FBTyx1QkFBUDtBQUNBLE9BQU9DLFlBQVAsTUFBeUIsMkJBQXpCOztJQUVxQkMsVTs7O0FBbUVuQixzQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQiwrQkFEaUI7O0FBQUE7O0FBRWpCLFFBQU1DLGVBQWVELE1BQU1FLGdCQUFOLEdBQ25CLE1BQUtDLGVBQUwsQ0FBcUJILE1BQU1JLFFBQTNCLEVBQXFDSixLQUFyQyxDQURtQixHQUMyQkEsTUFBTUssbUJBRHREOztBQUdBLFVBQUtDLEtBQUwsR0FBYTtBQUNYTDtBQURXLEtBQWI7QUFMaUI7QUFRbEI7O3VCQUVETSx5QixzQ0FBMEJDLFMsRUFBVztBQUNuQyxRQUFJQSxVQUFVUCxZQUFWLEtBQTJCLEtBQUtELEtBQUwsQ0FBV0MsWUFBMUMsRUFBd0Q7QUFDdEQs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QSxLQUFwQjs7QUFFQSxRQUFJTyxTQUFTcEIsUUFBVCxDQUFKLEVBQXdCO0FBQ3RCRCxjQUFRLElBQVI7QUFDQUMsaUJBQVdzQixZQUFZdEIsUUFBWixDQUFYO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDRCxLQUFMLEVBQVk7QUFDVixXQUFLLElBQUlXLElBQUksQ0FBYixFQUFnQkEsSUFBSVYsU0FBU3ZCLE1BQTdCLEVBQXFDaUMsS0FBSyxDQUExQyxFQUE2QztBQUMzQyxZQUFNQyxPQUFPWCxTQUFTVSxDQUFULENBQWI7O0FBRUEsWUFBSUMsS0FBS3JFLGtCQUFMLEtBQTRCOEUsU0FBU1QsS0FBS3JFLGtCQUFMLENBQVQsQ0FBaEMsRUFBb0U7QUFDbEV5RCxrQkFBUSxJQUFSO0FBQ0FZLGVBQUtyRSxrQkFBTCxJQUEyQmdGLFlBQVlYLEtBQUtyRSxrQkFBTCxDQUFaLENBQTNCO0FBQ0E7QUFDRDtBQUNELFlBQUlxRSxLQUFLckUsa0JBQUwsS0FBNEIsQ0FBQ3lELEtBQWpDLEVBQXdDO0FBQ3RDQSxrQkFBUSxPQUFLVSxVQUFMLENBQWdCRSxLQUFLckUsa0JBQUwsQ0FBaEIsRUFBMEN1RSxFQUExQyxDQUFSO0FBQ0Q7QUFDRjtBQUNGO0FBQ0QsUUFBSSxDQUFDZCxLQUFMLEVBQVksT0FBTyxLQUFQO0FBQ1osV0FBT0MsUUFBUDtBQUNELEc7O09BR0R0RCxXLEdBQWM7QUFBQSxXQUFnQjhFLFdBQVcsT0FBSy9GLEtBQUwsQ0FBV2Esa0JBQXRCLEtBQ3pCa0YsV0FBVyxPQUFLL0YsS0FBTCxDQUFXYSxrQkFBdEIsRUFBMENtQyxNQUExQyxJQUFvRCxDQUQzQztBQUFBLEc7O1NBdFBLakQsVSIsImZpbGUiOiJ0cmVlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFRyZWUsIHsgVHJlZU5vZGUgfSBmcm9tICdyYy10cmVlJztcbmltcG9ydCAncmMtdHJlZS9hc3NldHMvaW5kZXguY3NzJztcblxuLy8gT3ZlcnJpZGUgZGVmYXVsdHMgcmMtdHJlZSBzdHlsZXNcbmltcG9ydCAnLi9vYy10cmVlLXN0eWxlcy5zY3NzJztcbmltcG9ydCBUcmVlQ2hlY2tib3ggZnJvbSAnLi90cmVlLWNoZWNrYm94LmNvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9DVHJlZVZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB0cmVlSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGljb25DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZWZhdWx0Q2hlY2tlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIG9uRXhwYW5kOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGVjazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25EcmFnRHJvcDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNEcmFnRHJvcExlZ2FsOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ljb246IFByb3BUeXBlcy5ib29sLFxuICAgIGNoZWNrYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0YWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJhZ2dhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgLy8gQ3VzdG9taXNhdGlvbiAtLSBkZWZpbmUgdGhlIGRhdGEgbG9va1VwS2V5cyBhbmQgbG9va1VwVmFsdWVzXG4gICAgdHJlZURhdGE6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxuICAgIGRhdGFMb29rVXBLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGVja2VkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgc2VsZWN0ZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBleHBhbmRlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGRlc2VsZWN0T25Db250YWluZXJDbGljazogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0V4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaGVhZGVyUmlnaHQ6IFByb3BUeXBlcy5ub2RlLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgdHJlZUlkOiAnZGVmYXVsdFRyZWUnLFxuICAgIGljb25DbGFzczogJ2NhcmV0cycsXG4gICAgZGVmYXVsdEV4cGFuZGVkS2V5czogW10sXG4gICAgZGVmYXVsdFNlbGVjdGVkS2V5czogW10sXG4gICAgZGVmYXVsdENoZWNrZWRLZXlzOiBbXSxcbiAgICBvbkV4cGFuZDogdW5kZWZpbmVkLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25DaGVjazogdW5kZWZpbmVkLFxuICAgIG9uRHJhZ0Ryb3A6IHVuZGVmaW5lZCxcbiAgICBpc0RyYWdEcm9wTGVnYWw6IHVuZGVmaW5lZCxcbiAgICBzaG93TGluZTogZmFsc2UsXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIHNob3dJY29uOiB0cnVlLFxuICAgIGNoZWNrYWJsZTogZmFsc2UsXG4gICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBmYWxzZSxcbiAgICAvLyBDdXN0b21zXG4gICAgZGF0YUxvb2tVcEtleTogJ2tleScsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiAncGFyZW50JyxcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46ICdjaGlsZHJlbicsXG4gICAgdHJlZURhdGE6IFtdLFxuICAgIGNoZWNrZWRLZXlzOiBbXSxcbiAgICBzZWxlY3RlZEtleXM6IFtdLFxuICAgIGV4cGFuZGVkS2V5czogW10sXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICBkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2s6IHRydWUsXG4gICAgc2hvd0V4cGFuZEFsbDogZmFsc2UsXG4gICAgdGl0bGU6IHVuZGVmaW5lZCxcbiAgICBoZWFkZXJSaWdodDogdW5kZWZpbmVkLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zdCBleHBhbmRlZEtleXMgPSBwcm9wcy5kZWZhdWx0RXhwYW5kQWxsID9cbiAgICAgIHRoaXMuZ2V0QWxsUGFyZW50SWRzKHByb3BzLnRyZWVEYXRhLCBwcm9wcykgOiBwcm9wcy5kZWZhdWx0RXhwYW5kZWRLZXlzO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGV4cGFuZGVkS2V5cyxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLmV4cGFuZGVkS2V5cyAhPT0gdGhpcy5wcm9wcy5leHBhbmRlZEtleXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBleHBhbmRlZEtleXM6IG5leHRQcm9wcy5leHBhbmRlZEtleXMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbkNvbnRhaW5lckNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCB7IG9uU2VsZWN0LCBkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2sgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gY2xpY2tpbmcgb3V0c2lkZSBpdGVtXG4gICAgaWYgKGRlc2VsZWN0T25Db250YWluZXJDbGljayAmJiBlLnRhcmdldC50YWdOYW1lICE9PSAnU1BBTicpIHtcbiAgICAgIG9uU2VsZWN0KFtdKTtcbiAgICB9XG4gIH07XG5cbiAgb25EcmFnRHJvcCA9IChlKSA9PiB7XG4gICAgY29uc3QgeyBvbkRyYWdEcm9wLCBpc0RyYWdEcm9wTGVnYWwsIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghb25EcmFnRHJvcCkgdGhyb3cgbmV3IFR5cGVFcnJvcignb25EcmFnRHJvcCBjYWxsYmFjayBpcyBub3QgZGVmaW5lZCcpO1xuXG4gICAgLy8gQ2FsbGluZyBpc0RyYWdEcm9wTGVnYWwgY2FsbGJhY2sgdG8gZW5zdXJlIHRoYXQgdGhpcyBtb3ZlIGNhbiBiZSBkb25lXG4gICAgaWYgKGlzRHJhZ0Ryb3BMZWdhbCAmJiAhaXNEcmFnRHJvcExlZ2FsKHRyZWVEYXRhLCBlKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgbmV3RGF0YSA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5nZXRUcmVlSXRlbShlLmRyYWdOb2RlLnByb3BzLmV2ZW50S2V5KSwgZSk7XG4gICAgb25EcmFnRHJvcChuZXdEYXRhLCBlKTtcbiAgfTtcblxuICBvbkV4cGFuZEFsbENsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25FeHBhbmQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZXhwYW5kZWRLZXlzID0gdGhpcy5pc0FsbEV4cGFuZGVkKCkgPyBbXSA6IHRoaXMuZ2V0QWxsUGFyZW50SWRzKCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZGVkS2V5cyB9LCAoKSA9PiB7XG4gICAgICBpZiAob25FeHBhbmQpIG9uRXhwYW5kKHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzKTtcbiAgICB9KTtcbiAgfTtcbiAgLyoqXG4gICAqIFJldHVybnMgdXBkYXRlZCB0cmVlIGFmdGVyIERyYWcgbicgZHJvcCBldmVudFxuICAgKiBAcGFyYW0gZHJhZ0l0ZW0gLSBkcmFnZ2VkIGl0ZW1cbiAgICogQHBhcmFtIGRyYWdFdmVudCAtIGV2ZW50XG4gICAqIEBwYXJhbSBhcnJheSAtIHVzZWQgcmVjdXJzaXZlbHlcbiAgICogQHBhcmFtIHBhcmVudEZpbHRlcmVkIC0gdXNlZCByZWN1cnNpdmVseVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldFVwZGF0ZWRUcmVlID0gKGRyYWdJdGVtLCBkcmFnRXZlbnQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgcGFyZW50RmlsdGVyZWQgPSBmYWxzZSkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcENoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgZHJvcFRvR2FwLCBub2RlIH0gPSBkcmFnRXZlbnQ7XG4gICAgY29uc3QgZHJvcElkID0gbm9kZSAmJiBub2RlLnByb3BzLmV2ZW50S2V5O1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGxldCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XG5cbiAgICBjb25zdCBhZGRJdGVtVG9BcnJheSA9IChpdGVtcykgPT4ge1xuICAgICAgY29uc3QgZHJvcEluZGV4ID0gaXRlbXMuZmluZEluZGV4KGNoaWxkID0+IGNoaWxkW2RhdGFMb29rVXBLZXldID09PSBkcm9wSWQpO1xuICAgICAgaWYgKGRyb3BJbmRleCA+IC0xKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgbmV3Q2hpbGRyZW4gPSBpdGVtcy5zbGljZSgpO1xuICAgICAgICBuZXdDaGlsZHJlbi5zcGxpY2UoZHJvcEluZGV4LCAwLCBkcmFnSXRlbSk7XG4gICAgICAgIHJldHVybiBuZXdDaGlsZHJlbjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtcztcbiAgICB9O1xuICAgIGlmICghcGFyZW50RmlsdGVyZWQgJiYgZHJhZ0l0ZW0pIHtcbiAgICAgIG5ld0l0ZW1zID0gdGhpcy5yZW1vdmVJdGVtKG5ld0l0ZW1zLCBkcmFnSXRlbVtkYXRhTG9va1VwS2V5XSk7XG4gICAgfVxuICAgIGlmIChkcm9wVG9HYXApIHtcbiAgICAgIG5ld0l0ZW1zID0gYWRkSXRlbVRvQXJyYXkobmV3SXRlbXMpO1xuICAgIH1cblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IG5ld0l0ZW1zW2ldO1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXTtcblxuICAgICAgICBpZiAoIWRyb3BUb0dhcCAmJiBkcm9wSWQgPT09IGl0ZW1bZGF0YUxvb2tVcEtleV0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgIGlmICghY2hpbGRyZW4pIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSA9IFtdO1xuICAgICAgICAgIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXS5wdXNoKGRyYWdJdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZHJlbiAmJiBkcm9wVG9HYXApIHtcbiAgICAgICAgICBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gPSBhZGRJdGVtVG9BcnJheShjaGlsZHJlbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3VuZCAmJiBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoZHJhZ0l0ZW0sIGRyYWdFdmVudCwgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWZvdW5kKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdHJlZSBpdGVtIGJ5IElEXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcGFyYW0gYXJyYXkgLSB1c2VkIHJlY3Vyc2l2ZWx5XG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBnZXRUcmVlSXRlbSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwQ2hpbGRyZW4sIGRhdGFMb29rVXBLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGZvdW5kID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1bZGF0YUxvb2tVcEtleV0gPT09IGlkKTtcbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFsbCBwYXJlbnQgSURzIGluIHRoZSB0cmVlXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKi9cbiAgZ2V0QWxsUGFyZW50SWRzID0gKGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgcHJvcHMgPSB0aGlzLnByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwQ2hpbGRyZW4gfSA9IHByb3BzO1xuICAgIGNvbnN0IGNiID0gKGFjYywgaXRlbSkgPT4ge1xuICAgICAgbGV0IHRvdGFsID0gYWNjO1xuICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0ubGVuZ3RoID4gMCkge1xuICAgICAgICB0b3RhbCA9IGFjYy5jb25jYXQoaXRlbVtkYXRhTG9va1VwS2V5XSk7XG4gICAgICAgIHJldHVybiBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0ucmVkdWNlKGNiLCB0b3RhbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG90YWw7XG4gICAgfTtcbiAgICByZXR1cm4gYXJyYXkucmVkdWNlKGNiLCBbXSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCBhbGwgcGFyZW50IElEcyBhcmUgZXhwYW5kZWRcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0FsbEV4cGFuZGVkID0gKCkgPT5cbiAgICB0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5sZW5ndGggPT09IHRoaXMuZ2V0QWxsUGFyZW50SWRzKCkubGVuZ3RoO1xuXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBpdGVtIGZyb20gZ2l2ZW4gYXJyYXlcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcmV0dXJucyBhcnJheSBvZiBmaWx0ZXJlZCBpdGVtc1xuICAgKi9cbiAgcmVtb3ZlSXRlbSA9IChhcnJheSwgaWQpID0+IHtcbiAgICBjb25zdCB7IGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBDaGlsZHJlbiB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbmV3SXRlbXMgPSBhcnJheS5zbGljZSgpO1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGNvbnN0IGlzUGFyZW50ID0gYXJyID0+IGFyci5maW5kKGNoaWxkID0+IGNoaWxkW2RhdGFMb29rVXBLZXldID09PSBpZCk7XG4gICAgY29uc3QgZmlsdGVyQ2hpbGQgPSBhcnIgPT4gYXJyLmZpbHRlcihjaGlsZCA9PiBjaGlsZFtkYXRhTG9va1VwS2V5XSAhPT0gaWQpO1xuXG4gICAgaWYgKGlzUGFyZW50KG5ld0l0ZW1zKSkge1xuICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgbmV3SXRlbXMgPSBmaWx0ZXJDaGlsZChuZXdJdGVtcyk7XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XG5cbiAgICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiBpc1BhcmVudChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pKSB7XG4gICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSA9IGZpbHRlckNoaWxkKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMucmVtb3ZlSXRlbShpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0sIGlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWZvdW5kKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xuICB9O1xuXG4gIC8qIGhhc0NoaWxkcmVuIC0gZnVuY3Rpb24gKi9cbiAgaGFzQ2hpbGRyZW4gPSBkYXRhT2JqZWN0ID0+ICgoZGF0YU9iamVjdFt0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbl1cbiAgICAmJiBkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXS5sZW5ndGggPj0gMVxuICApKTtcblxuICAvKiByZW5kZXJOb2RlcyAtIGZ1bmN0aW9uICovXG4gIHJlbmRlck5vZGVzKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBWYWx1ZSwgZGF0YUxvb2tVcENoaWxkcmVuLCBpY29uQ2xhc3MsIGRpc2FibGVkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNoZWNrQ2hpbGRyZW4gPSB0aGlzLmhhc0NoaWxkcmVuO1xuXG4gICAgLy8gUmVjdXJzaXZlIGZ1bmN0aW9uIGZvciBjb2xsZWN0aW5nIG5vZGVzOlxuICAgIGNvbnN0IG1vdW50Tm9kZXMgPSAobm9kZUxpc3QpID0+IHtcbiAgICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICAgIG5vZGVMaXN0LmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKCFub2RlW2RhdGFMb29rVXBLZXldKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vIExlYWYgbm9kZVxuICAgICAgICBpZiAoIWNoZWNrQ2hpbGRyZW4obm9kZSkpIHtcbiAgICAgICAgICBsaXN0LnB1c2goIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuY3Rpb24tcGFyZW4tbmV3bGluZVxuICAgICAgICAgICAgPFRyZWVOb2RlXG4gICAgICAgICAgICAgIHRpdGxlPXtub2RlW2RhdGFMb29rVXBWYWx1ZV19XG4gICAgICAgICAgICAgIGtleT17bm9kZVtkYXRhTG9va1VwS2V5XX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtpY29uQ2xhc3N9IGxlYWYtbm9kZWB9XG4gICAgICAgICAgICAgIGljb249ezxUcmVlQ2hlY2tib3ggZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPn1cbiAgICAgICAgICAgIC8+KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBQYXJlbnQgbm9kZVxuICAgICAgICAgIGxpc3QucHVzaCggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jdGlvbi1wYXJlbi1uZXdsaW5lXG4gICAgICAgICAgICA8VHJlZU5vZGVcbiAgICAgICAgICAgICAgdGl0bGU9e25vZGVbZGF0YUxvb2tVcFZhbHVlXX1cbiAgICAgICAgICAgICAga2V5PXtub2RlW2RhdGFMb29rVXBLZXldfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2ljb25DbGFzc30gcGFyZW50LW5vZGVgfVxuICAgICAgICAgICAgICBpY29uPXs8VHJlZUNoZWNrYm94IGRpc2FibGVkPXtkaXNhYmxlZH0gLz59XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHttb3VudE5vZGVzKG5vZGVbZGF0YUxvb2tVcENoaWxkcmVuXSl9XG4gICAgICAgICAgICA8L1RyZWVOb2RlPik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbGlzdDtcbiAgICB9O1xuICAgIHJldHVybiBtb3VudE5vZGVzKHRoaXMucHJvcHMudHJlZURhdGEpO1xuICB9XG5cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLnJlbmRlck5vZGVzKCk7XG4gICAgY29uc3Qge1xuICAgICAgdHJlZUlkLCBjbGFzc05hbWUsIGRlZmF1bHRFeHBhbmRlZEtleXMsIGRlZmF1bHRTZWxlY3RlZEtleXMsIGRlZmF1bHRDaGVja2VkS2V5cywgY2hlY2tlZEtleXMsXG4gICAgICBvbkV4cGFuZCwgb25TZWxlY3QsIG9uQ2hlY2ssIHNob3dMaW5lLCBzaG93SWNvbiwgY2hlY2thYmxlLCBzZWxlY3RhYmxlLFxuICAgICAgZHJhZ2dhYmxlLCBkaXNhYmxlZCwgc2VsZWN0ZWRLZXlzLCBzaG93RXhwYW5kQWxsLCB0aXRsZSwgaGVhZGVyUmlnaHQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2xzTmFtZSA9IGNsYXNzTmFtZSA/IGAke2NsYXNzTmFtZX0gb2MtcmVhY3QtdHJlZWAgOiAnb2MtcmVhY3QtdHJlZSc7XG4gICAgY29uc3QgZXhwYW5kQWxsQ2xzTmFtZSA9IHRoaXMuaXNBbGxFeHBhbmRlZCgpID8gJ2V4cGFuZC1hbGwnIDogJyc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICA8ZGl2IGlkPVwidHJlZS12aWV3LWNvbnRhaW5lclwiIGNsYXNzTmFtZT17Y2xzTmFtZX0gb25DbGljaz17dGhpcy5vbkNvbnRhaW5lckNsaWNrfT5cblxuICAgICAgICB7KHNob3dFeHBhbmRBbGwgfHwgdGl0bGUgfHwgaGVhZGVyUmlnaHQpICYmXG4gICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwidGl0bGUtY29udGFpbmVyXCI+XG4gICAgICAgICAge3Nob3dFeHBhbmRBbGwgJiZcbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMub25FeHBhbmRBbGxDbGlja30gY2xhc3NOYW1lPXtgZXhwYW5kLWFsbC10b2dnbGUgJHtleHBhbmRBbGxDbHNOYW1lfWB9IC8+fVxuICAgICAgICAgIHt0aXRsZSAmJiA8aDI+e3RpdGxlfTwvaDI+fVxuICAgICAgICAgIHtoZWFkZXJSaWdodCAmJiA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci1yaWdodFwiPntoZWFkZXJSaWdodH08L2Rpdj59XG4gICAgICAgIDwvaGVhZGVyPn1cblxuICAgICAgICB7ISFub2Rlcy5sZW5ndGggJiZcbiAgICAgICAgPFRyZWVcbiAgICAgICAgICBpZD17dHJlZUlkfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIGRlZmF1bHRFeHBhbmRlZEtleXM9e2RlZmF1bHRFeHBhbmRlZEtleXN9XG4gICAgICAgICAgZGVmYXVsdFNlbGVjdGVkS2V5cz17ZGVmYXVsdFNlbGVjdGVkS2V5c31cbiAgICAgICAgICBkZWZhdWx0Q2hlY2tlZEtleXM9e2RlZmF1bHRDaGVja2VkS2V5c31cbiAgICAgICAgICBjaGVja2VkS2V5cz17Y2hlY2tlZEtleXN9XG4gICAgICAgICAgc2VsZWN0ZWRLZXlzPXtzZWxlY3RlZEtleXN9XG4gICAgICAgICAgZXhwYW5kZWRLZXlzPXt0aGlzLnN0YXRlLmV4cGFuZGVkS2V5c31cbiAgICAgICAgICBvbkV4cGFuZD17b25FeHBhbmR9XG4gICAgICAgICAgb25TZWxlY3Q9e29uU2VsZWN0fVxuICAgICAgICAgIG9uQ2hlY2s9e29uQ2hlY2t9XG4gICAgICAgICAgb25Ecm9wPXt0aGlzLm9uRHJhZ0Ryb3B9XG4gICAgICAgICAgY2hlY2thYmxlPXtjaGVja2FibGV9XG4gICAgICAgICAgc2VsZWN0YWJsZT17c2VsZWN0YWJsZX1cbiAgICAgICAgICBkcmFnZ2FibGU9e2RyYWdnYWJsZX1cbiAgICAgICAgICBzaG93TGluZT17c2hvd0xpbmV9XG4gICAgICAgICAgc2hvd0ljb249e3Nob3dJY29ufVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgPlxuICAgICAgICAgIHtub2Rlc31cbiAgICAgICAgPC9UcmVlPlxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=