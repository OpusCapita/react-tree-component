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
    var _this2 = this;

    var nodes = this.renderNodes();
    var _props2 = this.props,
        treeId = _props2.treeId,
        className = _props2.className,
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
          {
            className: 'title-container',
            ref: function ref(el) {
              _this2.header = el;
            }
          },
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
  expandedKeys: undefined,
  className: '',
  deselectOnContainerClick: true,
  showExpandAll: false,
  title: undefined,
  headerRight: undefined
}, _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onContainerClick = function (e) {
    var _props3 = _this3.props,
        onSelect = _props3.onSelect,
        deselectOnContainerClick = _props3.deselectOnContainerClick;
    // clicking outside item

    if (deselectOnContainerClick && e.target.tagName !== 'SPAN' && !_this3.header.contains(e.target)) {
      onSelect([]);
    }
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

  this.getUpdatedTree = function (dragItem, dragEvent) {
    var array = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this3.props.treeData;
    var parentFiltered = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var _props5 = _this3.props,
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
    var _props6 = _this3.props,
        dataLookUpChildren = _props6.dataLookUpChildren,
        dataLookUpKey = _props6.dataLookUpKey;

    var found = array.find(function (item) {
      return item[dataLookUpKey] === id;
    });
    if (!found) {
      array.forEach(function (item) {
        if (item[dataLookUpChildren] && !found) {
          found = _this3.getTreeItem(id, item[dataLookUpChildren]);
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
    return _this3.state.expandedKeys.length === _this3.getAllParentIds().length;
  };

  this.removeItem = function (array, id) {
    var _props7 = _this3.props,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJUcmVlIiwiVHJlZU5vZGUiLCJUcmVlQ2hlY2tib3giLCJPQ1RyZWVWaWV3IiwicHJvcHMiLCJleHBhbmRlZEtleXMiLCJkZWZhdWx0RXhwYW5kQWxsIiwiZ2V0QWxsUGFyZW50SWRzIiwidHJlZURhdGEiLCJzdGF0ZSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJzZXRTdGF0ZSIsInJlbmRlck5vZGVzIiwiZGF0YUxvb2tVcEtleSIsImRhdGFMb29rVXBWYWx1ZSIsImRhdGFMb29rVXBDaGlsZHJlbiIsImljb25DbGFzcyIsImRpc2FibGVkIiwiY2hlY2tDaGlsZHJlbiIsImhhc0NoaWxkcmVuIiwibW91bnROb2RlcyIsIm5vZGVMaXN0IiwibGlzdCIsImZvckVhY2giLCJub2RlIiwicHVzaCIsInJlbmRlciIsIm5vZGVzIiwidHJlZUlkIiwiY2xhc3NOYW1lIiwiY2hlY2tlZEtleXMiLCJvbkV4cGFuZCIsIm9uU2VsZWN0Iiwib25DaGVjayIsInNob3dMaW5lIiwic2hvd0ljb24iLCJjaGVja2FibGUiLCJzZWxlY3RhYmxlIiwiZHJhZ2dhYmxlIiwic2VsZWN0ZWRLZXlzIiwic2hvd0V4cGFuZEFsbCIsInRpdGxlIiwiaGVhZGVyUmlnaHQiLCJjbHNOYW1lIiwiZXhwYW5kQWxsQ2xzTmFtZSIsImlzQWxsRXhwYW5kZWQiLCJvbkNvbnRhaW5lckNsaWNrIiwiZWwiLCJoZWFkZXIiLCJvbkV4cGFuZEFsbENsaWNrIiwibGVuZ3RoIiwib25EcmFnRHJvcCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiLCJpc0RyYWdEcm9wTGVnYWwiLCJkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2siLCJlIiwidGFyZ2V0IiwidGFnTmFtZSIsImNvbnRhaW5zIiwiVHlwZUVycm9yIiwibmV3RGF0YSIsImdldFVwZGF0ZWRUcmVlIiwiZ2V0VHJlZUl0ZW0iLCJkcmFnTm9kZSIsImV2ZW50S2V5IiwiZHJhZ0l0ZW0iLCJkcmFnRXZlbnQiLCJhcnJheSIsInBhcmVudEZpbHRlcmVkIiwiZHJvcFRvR2FwIiwiZHJvcElkIiwiZm91bmQiLCJuZXdJdGVtcyIsInNsaWNlIiwiYWRkSXRlbVRvQXJyYXkiLCJpdGVtcyIsImRyb3BJbmRleCIsImZpbmRJbmRleCIsImNoaWxkIiwibmV3Q2hpbGRyZW4iLCJzcGxpY2UiLCJyZW1vdmVJdGVtIiwiaSIsIml0ZW0iLCJjaGlsZHJlbiIsImlkIiwiZmluZCIsImNiIiwiYWNjIiwidG90YWwiLCJjb25jYXQiLCJyZWR1Y2UiLCJpc1BhcmVudCIsImFyciIsImZpbHRlckNoaWxkIiwiZmlsdGVyIiwiZGF0YU9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLElBQVAsSUFBZUMsUUFBZixRQUErQixTQUEvQjtBQUNBLE9BQU8sMEJBQVA7O0FBRUE7QUFDQSxPQUFPLHVCQUFQO0FBQ0EsT0FBT0MsWUFBUCxNQUF5QiwyQkFBekI7O0lBRXFCQyxVOzs7QUE2RG5CLHNCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLCtCQURpQjs7QUFBQTs7QUFFakIsUUFBTUMsZUFBZUQsTUFBTUUsZ0JBQU4sR0FDbkIsTUFBS0MsZUFBTCxDQUFxQkgsTUFBTUksUUFBM0IsRUFBcUNKLEtBQXJDLENBRG1CLEdBQzJCQSxNQUFNQyxZQUR0RDs7QUFHQSxVQUFLSSxLQUFMLEdBQWE7QUFDWEo7QUFEVyxLQUFiO0FBTGlCO0FBUWxCOzt1QkFFREsseUIsc0NBQTBCQyxTLEVBQVc7QUFDbkMsUUFBSUEsVUFBVU4sWUFBVixLQUEyQixLQUFLRCxLQUFMLENBQVdDLFlBQTFDLEVBQXdEO0FBQ3RELFdBQUtPLFFBQUwsQ0FBYztBQUNaUCxzQkFBY00sVUFBVU47QUFEWixP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SyxJQUFJVyxJQUFJLENBQWIsRUFBZ0JBLElBQUlWLFNBQVN4QixNQUE3QixFQUFxQ2tDLEtBQUssQ0FBMUMsRUFBNkM7QUFDM0MsWUFBTUMsT0FBT1gsU0FBU1UsQ0FBVCxDQUFiOztBQUVBLFlBQUlDLEtBQUt0RSxrQkFBTCxLQUE0QitFLFNBQVNULEtBQUt0RSxrQkFBTCxDQUFULENBQWhDLEVBQW9FO0FBQ2xFMEQsa0JBQVEsSUFBUjtBQUNBWSxlQUFLdEUsa0JBQUwsSUFBMkJpRixZQUFZWCxLQUFLdEUsa0JBQUwsQ0FBWixDQUEzQjtBQUNBO0FBQ0Q7QUFDRCxZQUFJc0UsS0FBS3RFLGtCQUFMLEtBQTRCLENBQUMwRCxLQUFqQyxFQUF3QztBQUN0Q0Esa0JBQVEsT0FBS1UsVUFBTCxDQUFnQkUsS0FBS3RFLGtCQUFMLENBQWhCLEVBQTBDd0UsRUFBMUMsQ0FBUjtBQUNEO0FBQ0Y7QUFDRjtBQUNELFFBQUksQ0FBQ2QsS0FBTCxFQUFZLE9BQU8sS0FBUDtBQUNaLFdBQU9DLFFBQVA7QUFDRCxHOztPQUdEdkQsVyxHQUFjO0FBQUEsV0FBZ0IrRSxXQUFXLE9BQUsvRixLQUFMLENBQVdZLGtCQUF0QixLQUN6Qm1GLFdBQVcsT0FBSy9GLEtBQUwsQ0FBV1ksa0JBQXRCLEVBQTBDbUMsTUFBMUMsSUFBb0QsQ0FEM0M7QUFBQSxHOztTQWhQS2hELFUiLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBUcmVlLCB7IFRyZWVOb2RlIH0gZnJvbSAncmMtdHJlZSc7XG5pbXBvcnQgJ3JjLXRyZWUvYXNzZXRzL2luZGV4LmNzcyc7XG5cbi8vIE92ZXJyaWRlIGRlZmF1bHRzIHJjLXRyZWUgc3R5bGVzXG5pbXBvcnQgJy4vb2MtdHJlZS1zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgVHJlZUNoZWNrYm94IGZyb20gJy4vdHJlZS1jaGVja2JveC5jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPQ1RyZWVWaWV3IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgdHJlZUlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpY29uQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25FeHBhbmQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoZWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkRyYWdEcm9wOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBpc0RyYWdEcm9wTGVnYWw6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dMaW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93SWNvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hlY2thYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkcmFnZ2FibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAvLyBDdXN0b21pc2F0aW9uIC0tIGRlZmluZSB0aGUgZGF0YSBsb29rVXBLZXlzIGFuZCBsb29rVXBWYWx1ZXNcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksXG4gICAgZGF0YUxvb2tVcEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXRhTG9va1VwVmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoZWNrZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBzZWxlY3RlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGV4cGFuZGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RXhwYW5kQWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBoZWFkZXJSaWdodDogUHJvcFR5cGVzLm5vZGUsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB0cmVlSWQ6ICdkZWZhdWx0VHJlZScsXG4gICAgaWNvbkNsYXNzOiAnY2FyZXRzJyxcbiAgICBvbkV4cGFuZDogdW5kZWZpbmVkLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25DaGVjazogdW5kZWZpbmVkLFxuICAgIG9uRHJhZ0Ryb3A6IHVuZGVmaW5lZCxcbiAgICBpc0RyYWdEcm9wTGVnYWw6IHVuZGVmaW5lZCxcbiAgICBzaG93TGluZTogZmFsc2UsXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIHNob3dJY29uOiB0cnVlLFxuICAgIGNoZWNrYWJsZTogZmFsc2UsXG4gICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBmYWxzZSxcbiAgICAvLyBDdXN0b21zXG4gICAgZGF0YUxvb2tVcEtleTogJ2tleScsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiAncGFyZW50JyxcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46ICdjaGlsZHJlbicsXG4gICAgdHJlZURhdGE6IFtdLFxuICAgIGNoZWNrZWRLZXlzOiBbXSxcbiAgICBzZWxlY3RlZEtleXM6IFtdLFxuICAgIGV4cGFuZGVkS2V5czogdW5kZWZpbmVkLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrOiB0cnVlLFxuICAgIHNob3dFeHBhbmRBbGw6IGZhbHNlLFxuICAgIHRpdGxlOiB1bmRlZmluZWQsXG4gICAgaGVhZGVyUmlnaHQ6IHVuZGVmaW5lZCxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc3QgZXhwYW5kZWRLZXlzID0gcHJvcHMuZGVmYXVsdEV4cGFuZEFsbCA/XG4gICAgICB0aGlzLmdldEFsbFBhcmVudElkcyhwcm9wcy50cmVlRGF0YSwgcHJvcHMpIDogcHJvcHMuZXhwYW5kZWRLZXlzO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGV4cGFuZGVkS2V5cyxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLmV4cGFuZGVkS2V5cyAhPT0gdGhpcy5wcm9wcy5leHBhbmRlZEtleXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBleHBhbmRlZEtleXM6IG5leHRQcm9wcy5leHBhbmRlZEtleXMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbkNvbnRhaW5lckNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCB7IG9uU2VsZWN0LCBkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2sgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gY2xpY2tpbmcgb3V0c2lkZSBpdGVtXG4gICAgaWYgKGRlc2VsZWN0T25Db250YWluZXJDbGljayAmJiBlLnRhcmdldC50YWdOYW1lICE9PSAnU1BBTicgJiYgIXRoaXMuaGVhZGVyLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgb25TZWxlY3QoW10pO1xuICAgIH1cbiAgfTtcblxuICBvbkRyYWdEcm9wID0gKGUpID0+IHtcbiAgICBjb25zdCB7IG9uRHJhZ0Ryb3AsIGlzRHJhZ0Ryb3BMZWdhbCwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFvbkRyYWdEcm9wKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdvbkRyYWdEcm9wIGNhbGxiYWNrIGlzIG5vdCBkZWZpbmVkJyk7XG5cbiAgICAvLyBDYWxsaW5nIGlzRHJhZ0Ryb3BMZWdhbCBjYWxsYmFjayB0byBlbnN1cmUgdGhhdCB0aGlzIG1vdmUgY2FuIGJlIGRvbmVcbiAgICBpZiAoaXNEcmFnRHJvcExlZ2FsICYmICFpc0RyYWdEcm9wTGVnYWwodHJlZURhdGEsIGUpKSByZXR1cm47XG5cbiAgICBjb25zdCBuZXdEYXRhID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLmdldFRyZWVJdGVtKGUuZHJhZ05vZGUucHJvcHMuZXZlbnRLZXkpLCBlKTtcbiAgICBvbkRyYWdEcm9wKG5ld0RhdGEsIGUpO1xuICB9O1xuXG4gIG9uRXhwYW5kQWxsQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkV4cGFuZCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBleHBhbmRlZEtleXMgPSB0aGlzLmlzQWxsRXhwYW5kZWQoKSA/IFtdIDogdGhpcy5nZXRBbGxQYXJlbnRJZHMoKTtcbiAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kZWRLZXlzIH0sICgpID0+IHtcbiAgICAgIGlmIChvbkV4cGFuZCkgb25FeHBhbmQodGhpcy5zdGF0ZS5leHBhbmRlZEtleXMpO1xuICAgIH0pO1xuICB9O1xuICAvKipcbiAgICogUmV0dXJucyB1cGRhdGVkIHRyZWUgYWZ0ZXIgRHJhZyBuJyBkcm9wIGV2ZW50XG4gICAqIEBwYXJhbSBkcmFnSXRlbSAtIGRyYWdnZWQgaXRlbVxuICAgKiBAcGFyYW0gZHJhZ0V2ZW50IC0gZXZlbnRcbiAgICogQHBhcmFtIGFycmF5IC0gdXNlZCByZWN1cnNpdmVseVxuICAgKiBAcGFyYW0gcGFyZW50RmlsdGVyZWQgLSB1c2VkIHJlY3Vyc2l2ZWx5XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0VXBkYXRlZFRyZWUgPSAoZHJhZ0l0ZW0sIGRyYWdFdmVudCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCBwYXJlbnRGaWx0ZXJlZCA9IGZhbHNlKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwQ2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBkcm9wVG9HYXAsIG5vZGUgfSA9IGRyYWdFdmVudDtcbiAgICBjb25zdCBkcm9wSWQgPSBub2RlICYmIG5vZGUucHJvcHMuZXZlbnRLZXk7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgbGV0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcblxuICAgIGNvbnN0IGFkZEl0ZW1Ub0FycmF5ID0gKGl0ZW1zKSA9PiB7XG4gICAgICBjb25zdCBkcm9wSW5kZXggPSBpdGVtcy5maW5kSW5kZXgoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gPT09IGRyb3BJZCk7XG4gICAgICBpZiAoZHJvcEluZGV4ID4gLTEpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICBjb25zdCBuZXdDaGlsZHJlbiA9IGl0ZW1zLnNsaWNlKCk7XG4gICAgICAgIG5ld0NoaWxkcmVuLnNwbGljZShkcm9wSW5kZXgsIDAsIGRyYWdJdGVtKTtcbiAgICAgICAgcmV0dXJuIG5ld0NoaWxkcmVuO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH07XG4gICAgaWYgKCFwYXJlbnRGaWx0ZXJlZCAmJiBkcmFnSXRlbSkge1xuICAgICAgbmV3SXRlbXMgPSB0aGlzLnJlbW92ZUl0ZW0obmV3SXRlbXMsIGRyYWdJdGVtW2RhdGFMb29rVXBLZXldKTtcbiAgICB9XG4gICAgaWYgKGRyb3BUb0dhcCkge1xuICAgICAgbmV3SXRlbXMgPSBhZGRJdGVtVG9BcnJheShuZXdJdGVtcyk7XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dO1xuXG4gICAgICAgIGlmICghZHJvcFRvR2FwICYmIGRyb3BJZCA9PT0gaXRlbVtkYXRhTG9va1VwS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgaWYgKCFjaGlsZHJlbikgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dID0gW107XG4gICAgICAgICAgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLnB1c2goZHJhZ0l0ZW0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkcmVuICYmIGRyb3BUb0dhcCkge1xuICAgICAgICAgIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSA9IGFkZEl0ZW1Ub0FycmF5KGNoaWxkcmVuKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvdW5kICYmIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRVcGRhdGVkVHJlZShkcmFnSXRlbSwgZHJhZ0V2ZW50LCBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0sIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB0cmVlIGl0ZW0gYnkgSURcbiAgICogQHBhcmFtIGlkXG4gICAqIEBwYXJhbSBhcnJheSAtIHVzZWQgcmVjdXJzaXZlbHlcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIGdldFRyZWVJdGVtID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEpID0+IHtcbiAgICBjb25zdCB7IGRhdGFMb29rVXBDaGlsZHJlbiwgZGF0YUxvb2tVcEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgZm91bmQgPSBhcnJheS5maW5kKGl0ZW0gPT4gaXRlbVtkYXRhTG9va1VwS2V5XSA9PT0gaWQpO1xuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIHBhcmVudCBJRHMgaW4gdGhlIHRyZWVcbiAgICogQHBhcmFtIGFycmF5XG4gICAqL1xuICBnZXRBbGxQYXJlbnRJZHMgPSAoYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCBwcm9wcyA9IHRoaXMucHJvcHMpID0+IHtcbiAgICBjb25zdCB7IGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBDaGlsZHJlbiB9ID0gcHJvcHM7XG4gICAgY29uc3QgY2IgPSAoYWNjLCBpdGVtKSA9PiB7XG4gICAgICBsZXQgdG90YWwgPSBhY2M7XG4gICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRvdGFsID0gYWNjLmNvbmNhdChpdGVtW2RhdGFMb29rVXBLZXldKTtcbiAgICAgICAgcmV0dXJuIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXS5yZWR1Y2UoY2IsIHRvdGFsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b3RhbDtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheS5yZWR1Y2UoY2IsIFtdKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IGFsbCBwYXJlbnQgSURzIGFyZSBleHBhbmRlZFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzQWxsRXhwYW5kZWQgPSAoKSA9PlxuICAgIHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLmxlbmd0aCA9PT0gdGhpcy5nZXRBbGxQYXJlbnRJZHMoKS5sZW5ndGg7XG5cblxuICAvKipcbiAgICogUmVtb3ZlIGl0ZW0gZnJvbSBnaXZlbiBhcnJheVxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIGlkXG4gICAqIEByZXR1cm5zIGFycmF5IG9mIGZpbHRlcmVkIGl0ZW1zXG4gICAqL1xuICByZW1vdmVJdGVtID0gKGFycmF5LCBpZCkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcENoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgY29uc3QgaXNQYXJlbnQgPSBhcnIgPT4gYXJyLmZpbmQoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gPT09IGlkKTtcbiAgICBjb25zdCBmaWx0ZXJDaGlsZCA9IGFyciA9PiBhcnIuZmlsdGVyKGNoaWxkID0+IGNoaWxkW2RhdGFMb29rVXBLZXldICE9PSBpZCk7XG5cbiAgICBpZiAoaXNQYXJlbnQobmV3SXRlbXMpKSB7XG4gICAgICBmb3VuZCA9IHRydWU7XG4gICAgICBuZXdJdGVtcyA9IGZpbHRlckNoaWxkKG5ld0l0ZW1zKTtcbiAgICB9XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcblxuICAgICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmIGlzUGFyZW50KGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSkpIHtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dID0gZmlsdGVyQ2hpbGQoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5yZW1vdmVJdGVtKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSwgaWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyogaGFzQ2hpbGRyZW4gLSBmdW5jdGlvbiAqL1xuICBoYXNDaGlsZHJlbiA9IGRhdGFPYmplY3QgPT4gKChkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXVxuICAgICYmIGRhdGFPYmplY3RbdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW5dLmxlbmd0aCA+PSAxXG4gICkpO1xuXG4gIC8qIHJlbmRlck5vZGVzIC0gZnVuY3Rpb24gKi9cbiAgcmVuZGVyTm9kZXMoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcFZhbHVlLCBkYXRhTG9va1VwQ2hpbGRyZW4sIGljb25DbGFzcywgZGlzYWJsZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2hlY2tDaGlsZHJlbiA9IHRoaXMuaGFzQ2hpbGRyZW47XG5cbiAgICAvLyBSZWN1cnNpdmUgZnVuY3Rpb24gZm9yIGNvbGxlY3Rpbmcgbm9kZXM6XG4gICAgY29uc3QgbW91bnROb2RlcyA9IChub2RlTGlzdCkgPT4ge1xuICAgICAgY29uc3QgbGlzdCA9IFtdO1xuICAgICAgbm9kZUxpc3QuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAoIW5vZGVbZGF0YUxvb2tVcEtleV0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gTGVhZiBub2RlXG4gICAgICAgIGlmICghY2hlY2tDaGlsZHJlbihub2RlKSkge1xuICAgICAgICAgIGxpc3QucHVzaCggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jdGlvbi1wYXJlbi1uZXdsaW5lXG4gICAgICAgICAgICA8VHJlZU5vZGVcbiAgICAgICAgICAgICAgdGl0bGU9e25vZGVbZGF0YUxvb2tVcFZhbHVlXX1cbiAgICAgICAgICAgICAga2V5PXtub2RlW2RhdGFMb29rVXBLZXldfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2ljb25DbGFzc30gbGVhZi1ub2RlYH1cbiAgICAgICAgICAgICAgaWNvbj17PFRyZWVDaGVja2JveCBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+fVxuICAgICAgICAgICAgLz4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFBhcmVudCBub2RlXG4gICAgICAgICAgbGlzdC5wdXNoKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcbiAgICAgICAgICAgIDxUcmVlTm9kZVxuICAgICAgICAgICAgICB0aXRsZT17bm9kZVtkYXRhTG9va1VwVmFsdWVdfVxuICAgICAgICAgICAgICBrZXk9e25vZGVbZGF0YUxvb2tVcEtleV19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7aWNvbkNsYXNzfSBwYXJlbnQtbm9kZWB9XG4gICAgICAgICAgICAgIGljb249ezxUcmVlQ2hlY2tib3ggZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge21vdW50Tm9kZXMobm9kZVtkYXRhTG9va1VwQ2hpbGRyZW5dKX1cbiAgICAgICAgICAgIDwvVHJlZU5vZGU+KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBsaXN0O1xuICAgIH07XG4gICAgcmV0dXJuIG1vdW50Tm9kZXModGhpcy5wcm9wcy50cmVlRGF0YSk7XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBub2RlcyA9IHRoaXMucmVuZGVyTm9kZXMoKTtcbiAgICBjb25zdCB7XG4gICAgICB0cmVlSWQsIGNsYXNzTmFtZSwgY2hlY2tlZEtleXMsIG9uRXhwYW5kLCBvblNlbGVjdCwgb25DaGVjaywgc2hvd0xpbmUsIHNob3dJY29uLFxuICAgICAgY2hlY2thYmxlLCBzZWxlY3RhYmxlLCBkcmFnZ2FibGUsIGRpc2FibGVkLCBzZWxlY3RlZEtleXMsIHNob3dFeHBhbmRBbGwsIHRpdGxlLCBoZWFkZXJSaWdodCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjbHNOYW1lID0gY2xhc3NOYW1lID8gYCR7Y2xhc3NOYW1lfSBvYy1yZWFjdC10cmVlYCA6ICdvYy1yZWFjdC10cmVlJztcbiAgICBjb25zdCBleHBhbmRBbGxDbHNOYW1lID0gdGhpcy5pc0FsbEV4cGFuZGVkKCkgPyAnZXhwYW5kLWFsbCcgOiAnJztcblxuICAgIHJldHVybiAoXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIDxkaXYgaWQ9XCJ0cmVlLXZpZXctY29udGFpbmVyXCIgY2xhc3NOYW1lPXtjbHNOYW1lfSBvbkNsaWNrPXt0aGlzLm9uQ29udGFpbmVyQ2xpY2t9PlxuXG4gICAgICAgIHsoc2hvd0V4cGFuZEFsbCB8fCB0aXRsZSB8fCBoZWFkZXJSaWdodCkgJiZcbiAgICAgICAgPGhlYWRlclxuICAgICAgICAgIGNsYXNzTmFtZT1cInRpdGxlLWNvbnRhaW5lclwiXG4gICAgICAgICAgcmVmPXsoZWwpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyID0gZWw7XG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIHtzaG93RXhwYW5kQWxsICYmXG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9uRXhwYW5kQWxsQ2xpY2t9IGNsYXNzTmFtZT17YGV4cGFuZC1hbGwtdG9nZ2xlICR7ZXhwYW5kQWxsQ2xzTmFtZX1gfSAvPn1cbiAgICAgICAgICB7dGl0bGUgJiYgPGgyPnt0aXRsZX08L2gyPn1cbiAgICAgICAgICB7aGVhZGVyUmlnaHQgJiYgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItcmlnaHRcIj57aGVhZGVyUmlnaHR9PC9kaXY+fVxuICAgICAgICA8L2hlYWRlcj59XG5cbiAgICAgICAgeyEhbm9kZXMubGVuZ3RoICYmXG4gICAgICAgIDxUcmVlXG4gICAgICAgICAgaWQ9e3RyZWVJZH1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICBjaGVja2VkS2V5cz17Y2hlY2tlZEtleXN9XG4gICAgICAgICAgc2VsZWN0ZWRLZXlzPXtzZWxlY3RlZEtleXN9XG4gICAgICAgICAgZXhwYW5kZWRLZXlzPXt0aGlzLnN0YXRlLmV4cGFuZGVkS2V5c31cbiAgICAgICAgICBvbkV4cGFuZD17b25FeHBhbmR9XG4gICAgICAgICAgb25TZWxlY3Q9e29uU2VsZWN0fVxuICAgICAgICAgIG9uQ2hlY2s9e29uQ2hlY2t9XG4gICAgICAgICAgb25Ecm9wPXt0aGlzLm9uRHJhZ0Ryb3B9XG4gICAgICAgICAgY2hlY2thYmxlPXtjaGVja2FibGV9XG4gICAgICAgICAgc2VsZWN0YWJsZT17c2VsZWN0YWJsZX1cbiAgICAgICAgICBkcmFnZ2FibGU9e2RyYWdnYWJsZX1cbiAgICAgICAgICBzaG93TGluZT17c2hvd0xpbmV9XG4gICAgICAgICAgc2hvd0ljb249e3Nob3dJY29ufVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgPlxuICAgICAgICAgIHtub2Rlc31cbiAgICAgICAgPC9UcmVlPlxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=