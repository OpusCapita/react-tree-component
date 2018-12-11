var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import Tree, { TreeNode } from 'rc-tree';
import PerfectScrollBar from '@opuscapita/react-perfect-scrollbar';
import 'rc-tree/assets/index.css';

// Override defaults rc-tree styles
import './oc-tree-styles.scss';
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
            className: 'title-container',
            ref: function ref(el) {
              _this2.header = el;
            }
          },
          showExpandAll && React.createElement('button', {
            onClick: this.onExpandAllClick,
            className: 'expand-all-toggle ' + expandAllClsName
          }),
          title && React.createElement(
            'h2',
            null,
            title
          ),
          showOrderingArrows && React.createElement(OrderingArrows, _extends({
            onOrderButtonClick: onOrderButtonClick,
            selectedParent: this.getSelectedParent()
          }, this.props)),
          headerRight && React.createElement(
            'div',
            { className: 'header-right' },
            headerRight
          )
        ),
        !!nodes.length && React.createElement(
          PerfectScrollBar,
          null,
          React.createElement(
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

    if (deselectOnContainerClick && e.target.tagName !== 'SPAN' && !_this3.header.contains(e.target)) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJUcmVlIiwiVHJlZU5vZGUiLCJQZXJmZWN0U2Nyb2xsQmFyIiwiVHJlZUNoZWNrYm94IiwiT3JkZXJpbmdBcnJvd3MiLCJPQ1RyZWVWaWV3IiwicHJvcHMiLCJleHBhbmRlZEtleXMiLCJkZWZhdWx0RXhwYW5kQWxsIiwiZ2V0QWxsUGFyZW50SWRzIiwidHJlZURhdGEiLCJzdGF0ZSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJzZXRTdGF0ZSIsInJlbmRlck5vZGVzIiwiZGF0YUxvb2tVcEtleSIsImRhdGFMb29rVXBWYWx1ZSIsImRhdGFMb29rVXBDaGlsZHJlbiIsImljb25DbGFzcyIsImRpc2FibGVkIiwiY2hlY2tDaGlsZHJlbiIsImhhc0NoaWxkcmVuIiwibW91bnROb2RlcyIsIm5vZGVMaXN0IiwibGlzdCIsImZvckVhY2giLCJub2RlIiwicHVzaCIsInJlbmRlciIsIm5vZGVzIiwidHJlZUlkIiwiY2xhc3NOYW1lIiwiY2hlY2tlZEtleXMiLCJvblNlbGVjdCIsIm9uQ2hlY2siLCJzaG93TGluZSIsInNob3dJY29uIiwiY2hlY2thYmxlIiwic2VsZWN0YWJsZSIsImRyYWdnYWJsZSIsInNlbGVjdGVkS2V5cyIsInNob3dFeHBhbmRBbGwiLCJ0aXRsZSIsImhlYWRlclJpZ2h0Iiwic2hvd09yZGVyaW5nQXJyb3dzIiwib25PcmRlckJ1dHRvbkNsaWNrIiwiY2xzTmFtZSIsImV4cGFuZEFsbENsc05hbWUiLCJpc0FsbEV4cGFuZGVkIiwib25Db250YWluZXJDbGljayIsImVsIiwiaGVhZGVyIiwib25FeHBhbmRBbGxDbGljayIsImdldFNlbGVjdGVkUGFyZW50IiwibGVuZ3RoIiwib25FeHBhbmQiLCJvbkRyYWdEcm9wIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCIsImlzRHJhZ0Ryb3BMZWdhbCIsImRlc2VsZWN0T25Db250YWluZXJDbGljayIsImUiLCJ0YXJnZXQiLCJ0YWdOYW1lIiwiY29udGFpbnMiLCJUeXBlRXJyb3IiLCJuZXdEYXRhIiwiZ2V0VXBkYXRlZFRyZWUiLCJnZXRUcmVlSXRlbSIsImRyYWdOb2RlIiwiZXZlbnRLZXkiLCJpZCIsInBhcmVudCIsImRyYWdJdGVtIiwiZHJhZ0V2ZW50IiwiYXJyYXkiLCJwYXJlbnRGaWx0ZXJlZCIsImRyb3BUb0dhcCIsImRyb3BJZCIsImZvdW5kIiwibmV3SXRlbXMiLCJzbGljZSIsImFkZEl0ZW1Ub0FycmF5IiwiaXRlbXMiLCJkcm9wSW5kZXgiLCJmaW5kSW5kZXgiLCJjaGlsZCIsIm5ld0NoaWxkcmVuIiwic3BsaWNlIiwicmVtb3ZlSXRlbSIsImkiLCJpdGVtIiwiY2hpbGRyZW4iLCJyZXR1cm5QYXJlbnQiLCJmaW5kIiwiY2IiLCJhY2MiLCJ0b3RhbCIsImNvbmNhdCIsInJlZHVjZSIsImlzUGFyZW50IiwiYXJyIiwiZmlsdGVyQ2hpbGQiLCJmaWx0ZXIiLCJkYXRhT2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxJQUFQLElBQWVDLFFBQWYsUUFBK0IsU0FBL0I7QUFDQSxPQUFPQyxnQkFBUCxNQUE2QixxQ0FBN0I7QUFDQSxPQUFPLDBCQUFQOztBQUVBO0FBQ0EsT0FBTyx1QkFBUDtBQUNBLE9BQU9DLFlBQVAsTUFBeUIsMkJBQXpCO0FBQ0EsT0FBT0MsY0FBUCxNQUEyQixrQ0FBM0I7O0lBRXFCQyxVOzs7QUFpRW5CLHNCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLCtCQURpQjs7QUFBQTs7QUFFakIsUUFBTUMsZUFBZUQsTUFBTUUsZ0JBQU4sR0FDbkIsTUFBS0MsZUFBTCxDQUFxQkgsTUFBTUksUUFBM0IsRUFBcUNKLEtBQXJDLENBRG1CLEdBQzJCQSxNQUFNQyxZQUR0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STZCLFNBQVNwQixRQUFULENBQUosRUFBd0I7QUFDdEJELGNBQVEsSUFBUjtBQUNBQyxpQkFBV3NCLFlBQVl0QixRQUFaLENBQVg7QUFDRDs7QUFFRCxRQUFJLENBQUNELEtBQUwsRUFBWTtBQUNWLFdBQUssSUFBSVcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJVixTQUFTM0IsTUFBN0IsRUFBcUNxQyxLQUFLLENBQTFDLEVBQTZDO0FBQzNDLFlBQU1DLE9BQU9YLFNBQVNVLENBQVQsQ0FBYjs7QUFFQSxZQUFJQyxLQUFLM0Usa0JBQUwsS0FBNEJvRixTQUFTVCxLQUFLM0Usa0JBQUwsQ0FBVCxDQUFoQyxFQUFvRTtBQUNsRStELGtCQUFRLElBQVI7QUFDQVksZUFBSzNFLGtCQUFMLElBQTJCc0YsWUFBWVgsS0FBSzNFLGtCQUFMLENBQVosQ0FBM0I7QUFDQTtBQUNEO0FBQ0QsWUFBSTJFLEtBQUszRSxrQkFBTCxLQUE0QixDQUFDK0QsS0FBakMsRUFBd0M7QUFDdENBLGtCQUFRLE9BQUtVLFVBQUwsQ0FBZ0JFLEtBQUszRSxrQkFBTCxDQUFoQixFQUEwQ3VELEVBQTFDLENBQVI7QUFDRDtBQUNGO0FBQ0Y7QUFDRCxRQUFJLENBQUNRLEtBQUwsRUFBWSxPQUFPLEtBQVA7QUFDWixXQUFPQyxRQUFQO0FBQ0QsRzs7T0FHRDVELFcsR0FBYztBQUFBLFdBQWdCb0YsV0FBVyxPQUFLcEcsS0FBTCxDQUFXWSxrQkFBdEIsS0FDekJ3RixXQUFXLE9BQUtwRyxLQUFMLENBQVdZLGtCQUF0QixFQUEwQ3FDLE1BQTFDLElBQW9ELENBRDNDO0FBQUEsRzs7U0F4UUtsRCxVIiwiZmlsZSI6InRyZWUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgVHJlZSwgeyBUcmVlTm9kZSB9IGZyb20gJ3JjLXRyZWUnO1xuaW1wb3J0IFBlcmZlY3RTY3JvbGxCYXIgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtcGVyZmVjdC1zY3JvbGxiYXInO1xuaW1wb3J0ICdyYy10cmVlL2Fzc2V0cy9pbmRleC5jc3MnO1xuXG4vLyBPdmVycmlkZSBkZWZhdWx0cyByYy10cmVlIHN0eWxlc1xuaW1wb3J0ICcuL29jLXRyZWUtc3R5bGVzLnNjc3MnO1xuaW1wb3J0IFRyZWVDaGVja2JveCBmcm9tICcuL3RyZWUtY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCBPcmRlcmluZ0Fycm93cyBmcm9tICcuL3RyZWUtb3JkZXJpbmctYXJyb3dzLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9DVHJlZVZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB0cmVlSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGljb25DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkV4cGFuZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRHJhZ0Ryb3A6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uT3JkZXJCdXR0b25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNEcmFnRHJvcExlZ2FsOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ljb246IFByb3BUeXBlcy5ib29sLFxuICAgIGNoZWNrYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0YWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJhZ2dhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgLy8gQ3VzdG9taXNhdGlvbiAtLSBkZWZpbmUgdGhlIGRhdGEgbG9va1VwS2V5cyBhbmQgbG9va1VwVmFsdWVzXG4gICAgdHJlZURhdGE6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxuICAgIGRhdGFMb29rVXBLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGVja2VkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgc2VsZWN0ZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBleHBhbmRlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGRlc2VsZWN0T25Db250YWluZXJDbGljazogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0V4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaGVhZGVyUmlnaHQ6IFByb3BUeXBlcy5ub2RlLFxuICAgIHNob3dPcmRlcmluZ0Fycm93czogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB0cmVlSWQ6ICdkZWZhdWx0VHJlZScsXG4gICAgaWNvbkNsYXNzOiAnY2FyZXRzJyxcbiAgICBvbkV4cGFuZDogdW5kZWZpbmVkLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25DaGVjazogdW5kZWZpbmVkLFxuICAgIG9uRHJhZ0Ryb3A6IHVuZGVmaW5lZCxcbiAgICBvbk9yZGVyQnV0dG9uQ2xpY2s6IHVuZGVmaW5lZCxcbiAgICBpc0RyYWdEcm9wTGVnYWw6IHVuZGVmaW5lZCxcbiAgICBzaG93TGluZTogZmFsc2UsXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIHNob3dJY29uOiB0cnVlLFxuICAgIGNoZWNrYWJsZTogZmFsc2UsXG4gICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBmYWxzZSxcbiAgICAvLyBDdXN0b21zXG4gICAgZGF0YUxvb2tVcEtleTogJ2tleScsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiAncGFyZW50JyxcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46ICdjaGlsZHJlbicsXG4gICAgdHJlZURhdGE6IFtdLFxuICAgIGNoZWNrZWRLZXlzOiBbXSxcbiAgICBzZWxlY3RlZEtleXM6IFtdLFxuICAgIGV4cGFuZGVkS2V5czogW10sXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICBkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2s6IHRydWUsXG4gICAgc2hvd0V4cGFuZEFsbDogZmFsc2UsXG4gICAgdGl0bGU6IHVuZGVmaW5lZCxcbiAgICBoZWFkZXJSaWdodDogdW5kZWZpbmVkLFxuICAgIHNob3dPcmRlcmluZ0Fycm93czogZmFsc2UsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnN0IGV4cGFuZGVkS2V5cyA9IHByb3BzLmRlZmF1bHRFeHBhbmRBbGwgP1xuICAgICAgdGhpcy5nZXRBbGxQYXJlbnRJZHMocHJvcHMudHJlZURhdGEsIHByb3BzKSA6IHByb3BzLmV4cGFuZGVkS2V5cztcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBleHBhbmRlZEtleXMsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKG5leHRQcm9wcy5leHBhbmRlZEtleXMgIT09IHRoaXMucHJvcHMuZXhwYW5kZWRLZXlzKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZXhwYW5kZWRLZXlzOiBuZXh0UHJvcHMuZXhwYW5kZWRLZXlzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25Db250YWluZXJDbGljayA9IChlKSA9PiB7XG4gICAgY29uc3QgeyBvblNlbGVjdCwgZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrIH0gPSB0aGlzLnByb3BzO1xuICAgIC8vIGNsaWNraW5nIG91dHNpZGUgaXRlbVxuICAgIGlmIChkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2sgJiYgZS50YXJnZXQudGFnTmFtZSAhPT0gJ1NQQU4nICYmICF0aGlzLmhlYWRlci5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgIG9uU2VsZWN0KFtdKTtcbiAgICB9XG4gIH07XG5cbiAgb25FeHBhbmQgPSAoZXhwYW5kZWRLZXlzKSA9PiB7XG4gICAgY29uc3QgeyBvbkV4cGFuZCB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kZWRLZXlzIH0sICgpID0+IHtcbiAgICAgIGlmIChvbkV4cGFuZCkgb25FeHBhbmQodGhpcy5zdGF0ZS5leHBhbmRlZEtleXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uRHJhZ0Ryb3AgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHsgb25EcmFnRHJvcCwgaXNEcmFnRHJvcExlZ2FsLCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIW9uRHJhZ0Ryb3ApIHRocm93IG5ldyBUeXBlRXJyb3IoJ29uRHJhZ0Ryb3AgY2FsbGJhY2sgaXMgbm90IGRlZmluZWQnKTtcblxuICAgIC8vIENhbGxpbmcgaXNEcmFnRHJvcExlZ2FsIGNhbGxiYWNrIHRvIGVuc3VyZSB0aGF0IHRoaXMgbW92ZSBjYW4gYmUgZG9uZVxuICAgIGlmIChpc0RyYWdEcm9wTGVnYWwgJiYgIWlzRHJhZ0Ryb3BMZWdhbCh0cmVlRGF0YSwgZSkpIHJldHVybjtcblxuICAgIGNvbnN0IG5ld0RhdGEgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuZ2V0VHJlZUl0ZW0oZS5kcmFnTm9kZS5wcm9wcy5ldmVudEtleSksIGUpO1xuICAgIG9uRHJhZ0Ryb3AobmV3RGF0YSwgZSk7XG4gIH07XG5cbiAgb25FeHBhbmRBbGxDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9uRXhwYW5kIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGV4cGFuZGVkS2V5cyA9IHRoaXMuaXNBbGxFeHBhbmRlZCgpID8gW10gOiB0aGlzLmdldEFsbFBhcmVudElkcygpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmRlZEtleXMgfSwgKCkgPT4ge1xuICAgICAgaWYgKG9uRXhwYW5kKSBvbkV4cGFuZCh0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cyk7XG4gICAgfSk7XG4gIH07XG5cbiAgZ2V0U2VsZWN0ZWRQYXJlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RlZEtleXMsIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlkID0gc2VsZWN0ZWRLZXlzWzBdO1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIHRyZWVEYXRhLCB0cnVlKTtcbiAgICByZXR1cm4gcGFyZW50IHx8IHRyZWVEYXRhO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHVwZGF0ZWQgdHJlZSBhZnRlciBEcmFnIG4nIGRyb3AgZXZlbnRcbiAgICogQHBhcmFtIGRyYWdJdGVtIC0gZHJhZ2dlZCBpdGVtXG4gICAqIEBwYXJhbSBkcmFnRXZlbnQgLSBldmVudFxuICAgKiBAcGFyYW0gYXJyYXkgLSB1c2VkIHJlY3Vyc2l2ZWx5XG4gICAqIEBwYXJhbSBwYXJlbnRGaWx0ZXJlZCAtIHVzZWQgcmVjdXJzaXZlbHlcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRVcGRhdGVkVHJlZSA9IChkcmFnSXRlbSwgZHJhZ0V2ZW50LCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHBhcmVudEZpbHRlcmVkID0gZmFsc2UpID0+IHtcbiAgICBjb25zdCB7IGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBDaGlsZHJlbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGRyb3BUb0dhcCwgbm9kZSB9ID0gZHJhZ0V2ZW50O1xuICAgIGNvbnN0IGRyb3BJZCA9IG5vZGUgJiYgbm9kZS5wcm9wcy5ldmVudEtleTtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICBsZXQgbmV3SXRlbXMgPSBhcnJheS5zbGljZSgpO1xuXG4gICAgY29uc3QgYWRkSXRlbVRvQXJyYXkgPSAoaXRlbXMpID0+IHtcbiAgICAgIGNvbnN0IGRyb3BJbmRleCA9IGl0ZW1zLmZpbmRJbmRleChjaGlsZCA9PiBjaGlsZFtkYXRhTG9va1VwS2V5XSA9PT0gZHJvcElkKTtcbiAgICAgIGlmIChkcm9wSW5kZXggPiAtMSkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIGNvbnN0IG5ld0NoaWxkcmVuID0gaXRlbXMuc2xpY2UoKTtcbiAgICAgICAgbmV3Q2hpbGRyZW4uc3BsaWNlKGRyb3BJbmRleCwgMCwgZHJhZ0l0ZW0pO1xuICAgICAgICByZXR1cm4gbmV3Q2hpbGRyZW47XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlbXM7XG4gICAgfTtcbiAgICBpZiAoIXBhcmVudEZpbHRlcmVkICYmIGRyYWdJdGVtKSB7XG4gICAgICBuZXdJdGVtcyA9IHRoaXMucmVtb3ZlSXRlbShuZXdJdGVtcywgZHJhZ0l0ZW1bZGF0YUxvb2tVcEtleV0pO1xuICAgIH1cbiAgICBpZiAoZHJvcFRvR2FwKSB7XG4gICAgICBuZXdJdGVtcyA9IGFkZEl0ZW1Ub0FycmF5KG5ld0l0ZW1zKTtcbiAgICB9XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl07XG5cbiAgICAgICAgaWYgKCFkcm9wVG9HYXAgJiYgZHJvcElkID09PSBpdGVtW2RhdGFMb29rVXBLZXldICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoIWNoaWxkcmVuKSBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gPSBbXTtcbiAgICAgICAgICBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0ucHVzaChkcmFnSXRlbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGRyZW4gJiYgZHJvcFRvR2FwKSB7XG4gICAgICAgICAgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dID0gYWRkSXRlbVRvQXJyYXkoY2hpbGRyZW4pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm91bmQgJiYgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKGRyYWdJdGVtLCBkcmFnRXZlbnQsIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhIHRyZWUgaXRlbSBieSBJRFxuICAgKiBAcGFyYW0gaWRcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSByZXR1cm5QYXJlbnQgLSByZXR1cm4gaXRlbSdzIHBhcmVudCBpbnN0ZWFkIG9mIHRoZSBpdGVtXG4gICAqIEBwYXJhbSBwYXJlbnQgLSBwYXJlbnQgaXRlbSAodXNlZCByZWN1cnNpdmVseSlcbiAgICogQHJldHVybnMge3t9fVxuICAgKi9cbiAgZ2V0VHJlZUl0ZW0gPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgcmV0dXJuUGFyZW50ID0gZmFsc2UsIHBhcmVudCA9IG51bGwpID0+IHtcbiAgICBjb25zdCB7IGRhdGFMb29rVXBDaGlsZHJlbiwgZGF0YUxvb2tVcEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgZm91bmQgPSBhcnJheS5maW5kKGl0ZW0gPT4gaXRlbVtkYXRhTG9va1VwS2V5XSA9PT0gaWQpO1xuXG4gICAgaWYgKGZvdW5kICYmIHJldHVyblBhcmVudCkgZm91bmQgPSBwYXJlbnQ7XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0sIHJldHVyblBhcmVudCwgaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIHBhcmVudCBJRHMgaW4gdGhlIHRyZWVcbiAgICogQHBhcmFtIGFycmF5XG4gICAqL1xuICBnZXRBbGxQYXJlbnRJZHMgPSAoYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCBwcm9wcyA9IHRoaXMucHJvcHMpID0+IHtcbiAgICBjb25zdCB7IGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBDaGlsZHJlbiB9ID0gcHJvcHM7XG4gICAgY29uc3QgY2IgPSAoYWNjLCBpdGVtKSA9PiB7XG4gICAgICBsZXQgdG90YWwgPSBhY2M7XG4gICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRvdGFsID0gYWNjLmNvbmNhdChpdGVtW2RhdGFMb29rVXBLZXldKTtcbiAgICAgICAgcmV0dXJuIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXS5yZWR1Y2UoY2IsIHRvdGFsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b3RhbDtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheS5yZWR1Y2UoY2IsIFtdKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IGFsbCBwYXJlbnQgSURzIGFyZSBleHBhbmRlZFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzQWxsRXhwYW5kZWQgPSAoKSA9PlxuICAgIHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzICYmIHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLmxlbmd0aCA9PT0gdGhpcy5nZXRBbGxQYXJlbnRJZHMoKS5sZW5ndGg7XG5cblxuICAvKipcbiAgICogUmVtb3ZlIGl0ZW0gZnJvbSBnaXZlbiBhcnJheVxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIGlkXG4gICAqIEByZXR1cm5zIGFycmF5IG9mIGZpbHRlcmVkIGl0ZW1zXG4gICAqL1xuICByZW1vdmVJdGVtID0gKGFycmF5LCBpZCkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcENoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgY29uc3QgaXNQYXJlbnQgPSBhcnIgPT4gYXJyLmZpbmQoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gPT09IGlkKTtcbiAgICBjb25zdCBmaWx0ZXJDaGlsZCA9IGFyciA9PiBhcnIuZmlsdGVyKGNoaWxkID0+IGNoaWxkW2RhdGFMb29rVXBLZXldICE9PSBpZCk7XG5cbiAgICBpZiAoaXNQYXJlbnQobmV3SXRlbXMpKSB7XG4gICAgICBmb3VuZCA9IHRydWU7XG4gICAgICBuZXdJdGVtcyA9IGZpbHRlckNoaWxkKG5ld0l0ZW1zKTtcbiAgICB9XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcblxuICAgICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmIGlzUGFyZW50KGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSkpIHtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dID0gZmlsdGVyQ2hpbGQoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5yZW1vdmVJdGVtKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSwgaWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyogaGFzQ2hpbGRyZW4gLSBmdW5jdGlvbiAqL1xuICBoYXNDaGlsZHJlbiA9IGRhdGFPYmplY3QgPT4gKChkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXVxuICAgICYmIGRhdGFPYmplY3RbdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW5dLmxlbmd0aCA+PSAxXG4gICkpO1xuXG4gIC8qIHJlbmRlck5vZGVzIC0gZnVuY3Rpb24gKi9cbiAgcmVuZGVyTm9kZXMoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcFZhbHVlLCBkYXRhTG9va1VwQ2hpbGRyZW4sIGljb25DbGFzcywgZGlzYWJsZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2hlY2tDaGlsZHJlbiA9IHRoaXMuaGFzQ2hpbGRyZW47XG5cbiAgICAvLyBSZWN1cnNpdmUgZnVuY3Rpb24gZm9yIGNvbGxlY3Rpbmcgbm9kZXM6XG4gICAgY29uc3QgbW91bnROb2RlcyA9IChub2RlTGlzdCkgPT4ge1xuICAgICAgY29uc3QgbGlzdCA9IFtdO1xuICAgICAgbm9kZUxpc3QuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAoIW5vZGVbZGF0YUxvb2tVcEtleV0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gTGVhZiBub2RlXG4gICAgICAgIGlmICghY2hlY2tDaGlsZHJlbihub2RlKSkge1xuICAgICAgICAgIGxpc3QucHVzaCggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jdGlvbi1wYXJlbi1uZXdsaW5lXG4gICAgICAgICAgICA8VHJlZU5vZGVcbiAgICAgICAgICAgICAgdGl0bGU9e25vZGVbZGF0YUxvb2tVcFZhbHVlXX1cbiAgICAgICAgICAgICAga2V5PXtub2RlW2RhdGFMb29rVXBLZXldfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2ljb25DbGFzc30gbGVhZi1ub2RlYH1cbiAgICAgICAgICAgICAgaWNvbj17PFRyZWVDaGVja2JveCBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+fVxuICAgICAgICAgICAgLz4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFBhcmVudCBub2RlXG4gICAgICAgICAgbGlzdC5wdXNoKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcbiAgICAgICAgICAgIDxUcmVlTm9kZVxuICAgICAgICAgICAgICB0aXRsZT17bm9kZVtkYXRhTG9va1VwVmFsdWVdfVxuICAgICAgICAgICAgICBrZXk9e25vZGVbZGF0YUxvb2tVcEtleV19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7aWNvbkNsYXNzfSBwYXJlbnQtbm9kZWB9XG4gICAgICAgICAgICAgIGljb249ezxUcmVlQ2hlY2tib3ggZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge21vdW50Tm9kZXMobm9kZVtkYXRhTG9va1VwQ2hpbGRyZW5dKX1cbiAgICAgICAgICAgIDwvVHJlZU5vZGU+KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBsaXN0O1xuICAgIH07XG4gICAgcmV0dXJuIG1vdW50Tm9kZXModGhpcy5wcm9wcy50cmVlRGF0YSk7XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBub2RlcyA9IHRoaXMucmVuZGVyTm9kZXMoKTtcbiAgICBjb25zdCB7XG4gICAgICB0cmVlSWQsIGNsYXNzTmFtZSwgY2hlY2tlZEtleXMsIG9uU2VsZWN0LCBvbkNoZWNrLCBzaG93TGluZSwgc2hvd0ljb24sXG4gICAgICBjaGVja2FibGUsIHNlbGVjdGFibGUsIGRyYWdnYWJsZSwgZGlzYWJsZWQsIHNlbGVjdGVkS2V5cywgc2hvd0V4cGFuZEFsbCwgdGl0bGUsIGhlYWRlclJpZ2h0LFxuICAgICAgc2hvd09yZGVyaW5nQXJyb3dzLCBvbk9yZGVyQnV0dG9uQ2xpY2ssXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2xzTmFtZSA9IGNsYXNzTmFtZSA/IGAke2NsYXNzTmFtZX0gb2MtcmVhY3QtdHJlZWAgOiAnb2MtcmVhY3QtdHJlZSc7XG4gICAgY29uc3QgZXhwYW5kQWxsQ2xzTmFtZSA9IHRoaXMuaXNBbGxFeHBhbmRlZCgpID8gJ2V4cGFuZC1hbGwnIDogJyc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICA8ZGl2IGlkPVwidHJlZS12aWV3LWNvbnRhaW5lclwiIGNsYXNzTmFtZT17Y2xzTmFtZX0gb25DbGljaz17dGhpcy5vbkNvbnRhaW5lckNsaWNrfT5cblxuICAgICAgICB7KHNob3dFeHBhbmRBbGwgfHwgdGl0bGUgfHwgaGVhZGVyUmlnaHQgfHwgc2hvd09yZGVyaW5nQXJyb3dzKSAmJlxuICAgICAgICA8aGVhZGVyXG4gICAgICAgICAgY2xhc3NOYW1lPVwidGl0bGUtY29udGFpbmVyXCJcbiAgICAgICAgICByZWY9eyhlbCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSBlbDtcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAge3Nob3dFeHBhbmRBbGwgJiZcbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uRXhwYW5kQWxsQ2xpY2t9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BleHBhbmQtYWxsLXRvZ2dsZSAke2V4cGFuZEFsbENsc05hbWV9YH1cbiAgICAgICAgICAvPn1cbiAgICAgICAgICB7dGl0bGUgJiYgPGgyPnt0aXRsZX08L2gyPn1cbiAgICAgICAgICB7c2hvd09yZGVyaW5nQXJyb3dzICYmXG4gICAgICAgICAgPE9yZGVyaW5nQXJyb3dzXG4gICAgICAgICAgICBvbk9yZGVyQnV0dG9uQ2xpY2s9e29uT3JkZXJCdXR0b25DbGlja31cbiAgICAgICAgICAgIHNlbGVjdGVkUGFyZW50PXt0aGlzLmdldFNlbGVjdGVkUGFyZW50KCl9XG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAvPn1cbiAgICAgICAgICB7aGVhZGVyUmlnaHQgJiYgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItcmlnaHRcIj57aGVhZGVyUmlnaHR9PC9kaXY+fVxuICAgICAgICA8L2hlYWRlcj59XG4gICAgICAgIHshIW5vZGVzLmxlbmd0aCAmJlxuICAgICAgICA8UGVyZmVjdFNjcm9sbEJhcj5cbiAgICAgICAgICA8VHJlZVxuICAgICAgICAgICAgaWQ9e3RyZWVJZH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgICAgY2hlY2tlZEtleXM9e2NoZWNrZWRLZXlzfVxuICAgICAgICAgICAgc2VsZWN0ZWRLZXlzPXtzZWxlY3RlZEtleXN9XG4gICAgICAgICAgICBleHBhbmRlZEtleXM9e3RoaXMuc3RhdGUuZXhwYW5kZWRLZXlzfVxuICAgICAgICAgICAgb25FeHBhbmQ9e3RoaXMub25FeHBhbmR9XG4gICAgICAgICAgICBvblNlbGVjdD17b25TZWxlY3R9XG4gICAgICAgICAgICBvbkNoZWNrPXtvbkNoZWNrfVxuICAgICAgICAgICAgb25Ecm9wPXt0aGlzLm9uRHJhZ0Ryb3B9XG4gICAgICAgICAgICBjaGVja2FibGU9e2NoZWNrYWJsZX1cbiAgICAgICAgICAgIHNlbGVjdGFibGU9e3NlbGVjdGFibGV9XG4gICAgICAgICAgICBkcmFnZ2FibGU9e2RyYWdnYWJsZX1cbiAgICAgICAgICAgIHNob3dMaW5lPXtzaG93TGluZX1cbiAgICAgICAgICAgIHNob3dJY29uPXtzaG93SWNvbn1cbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bm9kZXN9XG4gICAgICAgICAgPC9UcmVlPlxuICAgICAgICA8L1BlcmZlY3RTY3JvbGxCYXI+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==