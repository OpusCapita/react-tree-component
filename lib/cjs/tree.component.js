'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

// Override defaults rc-tree styles


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _rcTree = require('rc-tree');

var _rcTree2 = _interopRequireDefault(_rcTree);

var _reactPerfectScrollbar = require('@opuscapita/react-perfect-scrollbar');

var _reactPerfectScrollbar2 = _interopRequireDefault(_reactPerfectScrollbar);

require('rc-tree/assets/index.css');

require('./oc-tree-styles.scss');

var _treeCheckbox = require('./tree-checkbox.component');

var _treeCheckbox2 = _interopRequireDefault(_treeCheckbox);

var _treeOrderingArrows = require('./tree-ordering-arrows.component');

var _treeOrderingArrows2 = _interopRequireDefault(_treeOrderingArrows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
          _react2.default.createElement(_rcTree.TreeNode, {
            title: node[dataLookUpValue],
            key: node[dataLookUpKey],
            className: iconClass + ' leaf-node',
            icon: _react2.default.createElement(_treeCheckbox2.default, { disabled: disabled })
          }));
        } else {
          // Parent node
          list.push( // eslint-disable-line function-paren-newline
          _react2.default.createElement(
            _rcTree.TreeNode,
            {
              title: node[dataLookUpValue],
              key: node[dataLookUpKey],
              className: iconClass + ' parent-node',
              icon: _react2.default.createElement(_treeCheckbox2.default, { disabled: disabled })
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
      _react2.default.createElement(
        'div',
        { id: 'tree-view-container', className: clsName, onClick: this.onContainerClick },
        (showExpandAll || title || headerRight || showOrderingArrows) && _react2.default.createElement(
          'header',
          {
            className: 'title-container',
            ref: function ref(el) {
              _this2.header = el;
            }
          },
          showExpandAll && _react2.default.createElement('button', {
            onClick: this.onExpandAllClick,
            className: 'expand-all-toggle ' + expandAllClsName
          }),
          title && _react2.default.createElement(
            'h2',
            null,
            title
          ),
          showOrderingArrows && _react2.default.createElement(_treeOrderingArrows2.default, _extends({
            onOrderButtonClick: onOrderButtonClick,
            selectedParent: this.getSelectedParent()
          }, this.props)),
          headerRight && _react2.default.createElement(
            'div',
            { className: 'header-right' },
            headerRight
          )
        ),
        !!nodes.length && _react2.default.createElement(
          _reactPerfectScrollbar2.default,
          null,
          _react2.default.createElement(
            _rcTree2.default,
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
}(_react2.default.PureComponent), _class.defaultProps = {
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
exports.default = OCTreeView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiT0NUcmVlVmlldyIsInByb3BzIiwiZXhwYW5kZWRLZXlzIiwiZGVmYXVsdEV4cGFuZEFsbCIsImdldEFsbFBhcmVudElkcyIsInRyZWVEYXRhIiwic3RhdGUiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJyZW5kZXJOb2RlcyIsImRhdGFMb29rVXBLZXkiLCJkYXRhTG9va1VwVmFsdWUiLCJkYXRhTG9va1VwQ2hpbGRyZW4iLCJpY29uQ2xhc3MiLCJkaXNhYmxlZCIsImNoZWNrQ2hpbGRyZW4iLCJoYXNDaGlsZHJlbiIsIm1vdW50Tm9kZXMiLCJub2RlTGlzdCIsImxpc3QiLCJmb3JFYWNoIiwibm9kZSIsInB1c2giLCJyZW5kZXIiLCJub2RlcyIsInRyZWVJZCIsImNsYXNzTmFtZSIsImNoZWNrZWRLZXlzIiwib25TZWxlY3QiLCJvbkNoZWNrIiwic2hvd0xpbmUiLCJzaG93SWNvbiIsImNoZWNrYWJsZSIsInNlbGVjdGFibGUiLCJkcmFnZ2FibGUiLCJzZWxlY3RlZEtleXMiLCJzaG93RXhwYW5kQWxsIiwidGl0bGUiLCJoZWFkZXJSaWdodCIsInNob3dPcmRlcmluZ0Fycm93cyIsIm9uT3JkZXJCdXR0b25DbGljayIsImNsc05hbWUiLCJleHBhbmRBbGxDbHNOYW1lIiwiaXNBbGxFeHBhbmRlZCIsIm9uQ29udGFpbmVyQ2xpY2siLCJlbCIsImhlYWRlciIsIm9uRXhwYW5kQWxsQ2xpY2siLCJnZXRTZWxlY3RlZFBhcmVudCIsImxlbmd0aCIsIm9uRXhwYW5kIiwib25EcmFnRHJvcCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiLCJpc0RyYWdEcm9wTGVnYWwiLCJkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2siLCJlIiwidGFyZ2V0IiwidGFnTmFtZSIsImNvbnRhaW5zIiwiVHlwZUVycm9yIiwibmV3RGF0YSIsImdldFVwZGF0ZWRUcmVlIiwiZ2V0VHJlZUl0ZW0iLCJkcmFnTm9kZSIsImV2ZW50S2V5IiwiaWQiLCJwYXJlbnQiLCJkcmFnSXRlbSIsImRyYWdFdmVudCIsImFycmF5IiwicGFyZW50RmlsdGVyZWQiLCJkcm9wVG9HYXAiLCJkcm9wSWQiLCJmb3VuZCIsIm5ld0l0ZW1zIiwic2xpY2UiLCJhZGRJdGVtVG9BcnJheSIsIml0ZW1zIiwiZHJvcEluZGV4IiwiZmluZEluZGV4IiwiY2hpbGQiLCJuZXdDaGlsZHJlbiIsInNwbGljZSIsInJlbW92ZUl0ZW0iLCJpIiwiaXRlbSIsImNoaWxkcmVuIiwicmV0dXJuUGFyZW50IiwiZmluZCIsImNiIiwiYWNjIiwidG90YWwiLCJjb25jYXQiLCJyZWR1Y2UiLCJpc1BhcmVudCIsImFyciIsImZpbHRlckNoaWxkIiwiZmlsdGVyIiwiZGF0YU9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUE7OztBQU5BOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBR0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxVOzs7QUFpRW5CLHNCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLCtCQURpQjs7QUFBQTs7QUFFakIsUUFBTUMsZUFBZUQsTUFBTUUsZ0JBQU4sR0FDbkIsTUFBS0MsZUFBTCxDQUFxQkgsTUFBTUksUUFBM0IsRUFBcUNKLEtBQXJDLENBRG1CLEdBQzJCQSxNQUFNQyxZQUR0RDs7QUFHQSxVQUFLSSxLQUFMLEdBQWE7QUFDWEo7QUFEVyxLQUFiO0FBTGlCO0FBUWxCOzt1QkFFREsseUIsc0NBQTBCQyxTLEVBQVc7QUFDbkMsUUFBSUEsVUFBVU4sWUFBVixLQUEyQixLQUFLRCxLQUFMLENBQVdDLFlBQTFDLEVBQXdEO0FBQ3RELFdBQUtPLFFBQUwsQ0FBYztBQUNaUCxzQkFBY00sVUFBVU47QUFEWixPQUFkO0FBR0Q7QUFDRixHOztBQTJDRDs7Ozs7Ozs7OztBQXNEQTs7Ozs7Ozs7OztBQXdCQTs7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QVEsSUFBUjtBQUNBWSxlQUFLM0Usa0JBQUwsSUFBMkJzRixZQUFZWCxLQUFLM0Usa0JBQUwsQ0FBWixDQUEzQjtBQUNBO0FBQ0Q7QUFDRCxZQUFJMkUsS0FBSzNFLGtCQUFMLEtBQTRCLENBQUMrRCxLQUFqQyxFQUF3QztBQUN0Q0Esa0JBQVEsT0FBS1UsVUFBTCxDQUFnQkUsS0FBSzNFLGtCQUFMLENBQWhCLEVBQTBDdUQsRUFBMUMsQ0FBUjtBQUNEO0FBQ0Y7QUFDRjtBQUNELFFBQUksQ0FBQ1EsS0FBTCxFQUFZLE9BQU8sS0FBUDtBQUNaLFdBQU9DLFFBQVA7QUFDRCxHOztPQUdENUQsVyxHQUFjO0FBQUEsV0FBZ0JvRixXQUFXLE9BQUtwRyxLQUFMLENBQVdZLGtCQUF0QixLQUN6QndGLFdBQVcsT0FBS3BHLEtBQUwsQ0FBV1ksa0JBQXRCLEVBQTBDcUMsTUFBMUMsSUFBb0QsQ0FEM0M7QUFBQSxHOztrQkF4UUtsRCxVIiwiZmlsZSI6InRyZWUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgVHJlZSwgeyBUcmVlTm9kZSB9IGZyb20gJ3JjLXRyZWUnO1xuaW1wb3J0IFBlcmZlY3RTY3JvbGxCYXIgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtcGVyZmVjdC1zY3JvbGxiYXInO1xuaW1wb3J0ICdyYy10cmVlL2Fzc2V0cy9pbmRleC5jc3MnO1xuXG4vLyBPdmVycmlkZSBkZWZhdWx0cyByYy10cmVlIHN0eWxlc1xuaW1wb3J0ICcuL29jLXRyZWUtc3R5bGVzLnNjc3MnO1xuaW1wb3J0IFRyZWVDaGVja2JveCBmcm9tICcuL3RyZWUtY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCBPcmRlcmluZ0Fycm93cyBmcm9tICcuL3RyZWUtb3JkZXJpbmctYXJyb3dzLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9DVHJlZVZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB0cmVlSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGljb25DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkV4cGFuZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRHJhZ0Ryb3A6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uT3JkZXJCdXR0b25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNEcmFnRHJvcExlZ2FsOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ljb246IFByb3BUeXBlcy5ib29sLFxuICAgIGNoZWNrYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0YWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJhZ2dhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgLy8gQ3VzdG9taXNhdGlvbiAtLSBkZWZpbmUgdGhlIGRhdGEgbG9va1VwS2V5cyBhbmQgbG9va1VwVmFsdWVzXG4gICAgdHJlZURhdGE6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxuICAgIGRhdGFMb29rVXBLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGVja2VkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgc2VsZWN0ZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBleHBhbmRlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGRlc2VsZWN0T25Db250YWluZXJDbGljazogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0V4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaGVhZGVyUmlnaHQ6IFByb3BUeXBlcy5ub2RlLFxuICAgIHNob3dPcmRlcmluZ0Fycm93czogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB0cmVlSWQ6ICdkZWZhdWx0VHJlZScsXG4gICAgaWNvbkNsYXNzOiAnY2FyZXRzJyxcbiAgICBvbkV4cGFuZDogdW5kZWZpbmVkLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25DaGVjazogdW5kZWZpbmVkLFxuICAgIG9uRHJhZ0Ryb3A6IHVuZGVmaW5lZCxcbiAgICBvbk9yZGVyQnV0dG9uQ2xpY2s6IHVuZGVmaW5lZCxcbiAgICBpc0RyYWdEcm9wTGVnYWw6IHVuZGVmaW5lZCxcbiAgICBzaG93TGluZTogZmFsc2UsXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIHNob3dJY29uOiB0cnVlLFxuICAgIGNoZWNrYWJsZTogZmFsc2UsXG4gICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBmYWxzZSxcbiAgICAvLyBDdXN0b21zXG4gICAgZGF0YUxvb2tVcEtleTogJ2tleScsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiAncGFyZW50JyxcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46ICdjaGlsZHJlbicsXG4gICAgdHJlZURhdGE6IFtdLFxuICAgIGNoZWNrZWRLZXlzOiBbXSxcbiAgICBzZWxlY3RlZEtleXM6IFtdLFxuICAgIGV4cGFuZGVkS2V5czogW10sXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICBkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2s6IHRydWUsXG4gICAgc2hvd0V4cGFuZEFsbDogZmFsc2UsXG4gICAgdGl0bGU6IHVuZGVmaW5lZCxcbiAgICBoZWFkZXJSaWdodDogdW5kZWZpbmVkLFxuICAgIHNob3dPcmRlcmluZ0Fycm93czogZmFsc2UsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnN0IGV4cGFuZGVkS2V5cyA9IHByb3BzLmRlZmF1bHRFeHBhbmRBbGwgP1xuICAgICAgdGhpcy5nZXRBbGxQYXJlbnRJZHMocHJvcHMudHJlZURhdGEsIHByb3BzKSA6IHByb3BzLmV4cGFuZGVkS2V5cztcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBleHBhbmRlZEtleXMsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKG5leHRQcm9wcy5leHBhbmRlZEtleXMgIT09IHRoaXMucHJvcHMuZXhwYW5kZWRLZXlzKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZXhwYW5kZWRLZXlzOiBuZXh0UHJvcHMuZXhwYW5kZWRLZXlzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25Db250YWluZXJDbGljayA9IChlKSA9PiB7XG4gICAgY29uc3QgeyBvblNlbGVjdCwgZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrIH0gPSB0aGlzLnByb3BzO1xuICAgIC8vIGNsaWNraW5nIG91dHNpZGUgaXRlbVxuICAgIGlmIChkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2sgJiYgZS50YXJnZXQudGFnTmFtZSAhPT0gJ1NQQU4nICYmICF0aGlzLmhlYWRlci5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgIG9uU2VsZWN0KFtdKTtcbiAgICB9XG4gIH07XG5cbiAgb25FeHBhbmQgPSAoZXhwYW5kZWRLZXlzKSA9PiB7XG4gICAgY29uc3QgeyBvbkV4cGFuZCB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kZWRLZXlzIH0sICgpID0+IHtcbiAgICAgIGlmIChvbkV4cGFuZCkgb25FeHBhbmQodGhpcy5zdGF0ZS5leHBhbmRlZEtleXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uRHJhZ0Ryb3AgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHsgb25EcmFnRHJvcCwgaXNEcmFnRHJvcExlZ2FsLCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIW9uRHJhZ0Ryb3ApIHRocm93IG5ldyBUeXBlRXJyb3IoJ29uRHJhZ0Ryb3AgY2FsbGJhY2sgaXMgbm90IGRlZmluZWQnKTtcblxuICAgIC8vIENhbGxpbmcgaXNEcmFnRHJvcExlZ2FsIGNhbGxiYWNrIHRvIGVuc3VyZSB0aGF0IHRoaXMgbW92ZSBjYW4gYmUgZG9uZVxuICAgIGlmIChpc0RyYWdEcm9wTGVnYWwgJiYgIWlzRHJhZ0Ryb3BMZWdhbCh0cmVlRGF0YSwgZSkpIHJldHVybjtcblxuICAgIGNvbnN0IG5ld0RhdGEgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuZ2V0VHJlZUl0ZW0oZS5kcmFnTm9kZS5wcm9wcy5ldmVudEtleSksIGUpO1xuICAgIG9uRHJhZ0Ryb3AobmV3RGF0YSwgZSk7XG4gIH07XG5cbiAgb25FeHBhbmRBbGxDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9uRXhwYW5kIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGV4cGFuZGVkS2V5cyA9IHRoaXMuaXNBbGxFeHBhbmRlZCgpID8gW10gOiB0aGlzLmdldEFsbFBhcmVudElkcygpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmRlZEtleXMgfSwgKCkgPT4ge1xuICAgICAgaWYgKG9uRXhwYW5kKSBvbkV4cGFuZCh0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cyk7XG4gICAgfSk7XG4gIH07XG5cbiAgZ2V0U2VsZWN0ZWRQYXJlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RlZEtleXMsIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlkID0gc2VsZWN0ZWRLZXlzWzBdO1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIHRyZWVEYXRhLCB0cnVlKTtcbiAgICByZXR1cm4gcGFyZW50IHx8IHRyZWVEYXRhO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHVwZGF0ZWQgdHJlZSBhZnRlciBEcmFnIG4nIGRyb3AgZXZlbnRcbiAgICogQHBhcmFtIGRyYWdJdGVtIC0gZHJhZ2dlZCBpdGVtXG4gICAqIEBwYXJhbSBkcmFnRXZlbnQgLSBldmVudFxuICAgKiBAcGFyYW0gYXJyYXkgLSB1c2VkIHJlY3Vyc2l2ZWx5XG4gICAqIEBwYXJhbSBwYXJlbnRGaWx0ZXJlZCAtIHVzZWQgcmVjdXJzaXZlbHlcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRVcGRhdGVkVHJlZSA9IChkcmFnSXRlbSwgZHJhZ0V2ZW50LCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHBhcmVudEZpbHRlcmVkID0gZmFsc2UpID0+IHtcbiAgICBjb25zdCB7IGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBDaGlsZHJlbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGRyb3BUb0dhcCwgbm9kZSB9ID0gZHJhZ0V2ZW50O1xuICAgIGNvbnN0IGRyb3BJZCA9IG5vZGUgJiYgbm9kZS5wcm9wcy5ldmVudEtleTtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICBsZXQgbmV3SXRlbXMgPSBhcnJheS5zbGljZSgpO1xuXG4gICAgY29uc3QgYWRkSXRlbVRvQXJyYXkgPSAoaXRlbXMpID0+IHtcbiAgICAgIGNvbnN0IGRyb3BJbmRleCA9IGl0ZW1zLmZpbmRJbmRleChjaGlsZCA9PiBjaGlsZFtkYXRhTG9va1VwS2V5XSA9PT0gZHJvcElkKTtcbiAgICAgIGlmIChkcm9wSW5kZXggPiAtMSkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIGNvbnN0IG5ld0NoaWxkcmVuID0gaXRlbXMuc2xpY2UoKTtcbiAgICAgICAgbmV3Q2hpbGRyZW4uc3BsaWNlKGRyb3BJbmRleCwgMCwgZHJhZ0l0ZW0pO1xuICAgICAgICByZXR1cm4gbmV3Q2hpbGRyZW47XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlbXM7XG4gICAgfTtcbiAgICBpZiAoIXBhcmVudEZpbHRlcmVkICYmIGRyYWdJdGVtKSB7XG4gICAgICBuZXdJdGVtcyA9IHRoaXMucmVtb3ZlSXRlbShuZXdJdGVtcywgZHJhZ0l0ZW1bZGF0YUxvb2tVcEtleV0pO1xuICAgIH1cbiAgICBpZiAoZHJvcFRvR2FwKSB7XG4gICAgICBuZXdJdGVtcyA9IGFkZEl0ZW1Ub0FycmF5KG5ld0l0ZW1zKTtcbiAgICB9XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl07XG5cbiAgICAgICAgaWYgKCFkcm9wVG9HYXAgJiYgZHJvcElkID09PSBpdGVtW2RhdGFMb29rVXBLZXldICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoIWNoaWxkcmVuKSBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gPSBbXTtcbiAgICAgICAgICBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0ucHVzaChkcmFnSXRlbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGRyZW4gJiYgZHJvcFRvR2FwKSB7XG4gICAgICAgICAgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dID0gYWRkSXRlbVRvQXJyYXkoY2hpbGRyZW4pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm91bmQgJiYgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKGRyYWdJdGVtLCBkcmFnRXZlbnQsIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhIHRyZWUgaXRlbSBieSBJRFxuICAgKiBAcGFyYW0gaWRcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSByZXR1cm5QYXJlbnQgLSByZXR1cm4gaXRlbSdzIHBhcmVudCBpbnN0ZWFkIG9mIHRoZSBpdGVtXG4gICAqIEBwYXJhbSBwYXJlbnQgLSBwYXJlbnQgaXRlbSAodXNlZCByZWN1cnNpdmVseSlcbiAgICogQHJldHVybnMge3t9fVxuICAgKi9cbiAgZ2V0VHJlZUl0ZW0gPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgcmV0dXJuUGFyZW50ID0gZmFsc2UsIHBhcmVudCA9IG51bGwpID0+IHtcbiAgICBjb25zdCB7IGRhdGFMb29rVXBDaGlsZHJlbiwgZGF0YUxvb2tVcEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgZm91bmQgPSBhcnJheS5maW5kKGl0ZW0gPT4gaXRlbVtkYXRhTG9va1VwS2V5XSA9PT0gaWQpO1xuXG4gICAgaWYgKGZvdW5kICYmIHJldHVyblBhcmVudCkgZm91bmQgPSBwYXJlbnQ7XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0sIHJldHVyblBhcmVudCwgaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIHBhcmVudCBJRHMgaW4gdGhlIHRyZWVcbiAgICogQHBhcmFtIGFycmF5XG4gICAqL1xuICBnZXRBbGxQYXJlbnRJZHMgPSAoYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCBwcm9wcyA9IHRoaXMucHJvcHMpID0+IHtcbiAgICBjb25zdCB7IGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBDaGlsZHJlbiB9ID0gcHJvcHM7XG4gICAgY29uc3QgY2IgPSAoYWNjLCBpdGVtKSA9PiB7XG4gICAgICBsZXQgdG90YWwgPSBhY2M7XG4gICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRvdGFsID0gYWNjLmNvbmNhdChpdGVtW2RhdGFMb29rVXBLZXldKTtcbiAgICAgICAgcmV0dXJuIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXS5yZWR1Y2UoY2IsIHRvdGFsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b3RhbDtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheS5yZWR1Y2UoY2IsIFtdKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IGFsbCBwYXJlbnQgSURzIGFyZSBleHBhbmRlZFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzQWxsRXhwYW5kZWQgPSAoKSA9PlxuICAgIHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzICYmIHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLmxlbmd0aCA9PT0gdGhpcy5nZXRBbGxQYXJlbnRJZHMoKS5sZW5ndGg7XG5cblxuICAvKipcbiAgICogUmVtb3ZlIGl0ZW0gZnJvbSBnaXZlbiBhcnJheVxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIGlkXG4gICAqIEByZXR1cm5zIGFycmF5IG9mIGZpbHRlcmVkIGl0ZW1zXG4gICAqL1xuICByZW1vdmVJdGVtID0gKGFycmF5LCBpZCkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcENoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgY29uc3QgaXNQYXJlbnQgPSBhcnIgPT4gYXJyLmZpbmQoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gPT09IGlkKTtcbiAgICBjb25zdCBmaWx0ZXJDaGlsZCA9IGFyciA9PiBhcnIuZmlsdGVyKGNoaWxkID0+IGNoaWxkW2RhdGFMb29rVXBLZXldICE9PSBpZCk7XG5cbiAgICBpZiAoaXNQYXJlbnQobmV3SXRlbXMpKSB7XG4gICAgICBmb3VuZCA9IHRydWU7XG4gICAgICBuZXdJdGVtcyA9IGZpbHRlckNoaWxkKG5ld0l0ZW1zKTtcbiAgICB9XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcblxuICAgICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmIGlzUGFyZW50KGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSkpIHtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dID0gZmlsdGVyQ2hpbGQoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5yZW1vdmVJdGVtKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSwgaWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyogaGFzQ2hpbGRyZW4gLSBmdW5jdGlvbiAqL1xuICBoYXNDaGlsZHJlbiA9IGRhdGFPYmplY3QgPT4gKChkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXVxuICAgICYmIGRhdGFPYmplY3RbdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW5dLmxlbmd0aCA+PSAxXG4gICkpO1xuXG4gIC8qIHJlbmRlck5vZGVzIC0gZnVuY3Rpb24gKi9cbiAgcmVuZGVyTm9kZXMoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcFZhbHVlLCBkYXRhTG9va1VwQ2hpbGRyZW4sIGljb25DbGFzcywgZGlzYWJsZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2hlY2tDaGlsZHJlbiA9IHRoaXMuaGFzQ2hpbGRyZW47XG5cbiAgICAvLyBSZWN1cnNpdmUgZnVuY3Rpb24gZm9yIGNvbGxlY3Rpbmcgbm9kZXM6XG4gICAgY29uc3QgbW91bnROb2RlcyA9IChub2RlTGlzdCkgPT4ge1xuICAgICAgY29uc3QgbGlzdCA9IFtdO1xuICAgICAgbm9kZUxpc3QuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAoIW5vZGVbZGF0YUxvb2tVcEtleV0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gTGVhZiBub2RlXG4gICAgICAgIGlmICghY2hlY2tDaGlsZHJlbihub2RlKSkge1xuICAgICAgICAgIGxpc3QucHVzaCggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jdGlvbi1wYXJlbi1uZXdsaW5lXG4gICAgICAgICAgICA8VHJlZU5vZGVcbiAgICAgICAgICAgICAgdGl0bGU9e25vZGVbZGF0YUxvb2tVcFZhbHVlXX1cbiAgICAgICAgICAgICAga2V5PXtub2RlW2RhdGFMb29rVXBLZXldfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2ljb25DbGFzc30gbGVhZi1ub2RlYH1cbiAgICAgICAgICAgICAgaWNvbj17PFRyZWVDaGVja2JveCBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+fVxuICAgICAgICAgICAgLz4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFBhcmVudCBub2RlXG4gICAgICAgICAgbGlzdC5wdXNoKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcbiAgICAgICAgICAgIDxUcmVlTm9kZVxuICAgICAgICAgICAgICB0aXRsZT17bm9kZVtkYXRhTG9va1VwVmFsdWVdfVxuICAgICAgICAgICAgICBrZXk9e25vZGVbZGF0YUxvb2tVcEtleV19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7aWNvbkNsYXNzfSBwYXJlbnQtbm9kZWB9XG4gICAgICAgICAgICAgIGljb249ezxUcmVlQ2hlY2tib3ggZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge21vdW50Tm9kZXMobm9kZVtkYXRhTG9va1VwQ2hpbGRyZW5dKX1cbiAgICAgICAgICAgIDwvVHJlZU5vZGU+KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBsaXN0O1xuICAgIH07XG4gICAgcmV0dXJuIG1vdW50Tm9kZXModGhpcy5wcm9wcy50cmVlRGF0YSk7XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBub2RlcyA9IHRoaXMucmVuZGVyTm9kZXMoKTtcbiAgICBjb25zdCB7XG4gICAgICB0cmVlSWQsIGNsYXNzTmFtZSwgY2hlY2tlZEtleXMsIG9uU2VsZWN0LCBvbkNoZWNrLCBzaG93TGluZSwgc2hvd0ljb24sXG4gICAgICBjaGVja2FibGUsIHNlbGVjdGFibGUsIGRyYWdnYWJsZSwgZGlzYWJsZWQsIHNlbGVjdGVkS2V5cywgc2hvd0V4cGFuZEFsbCwgdGl0bGUsIGhlYWRlclJpZ2h0LFxuICAgICAgc2hvd09yZGVyaW5nQXJyb3dzLCBvbk9yZGVyQnV0dG9uQ2xpY2ssXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2xzTmFtZSA9IGNsYXNzTmFtZSA/IGAke2NsYXNzTmFtZX0gb2MtcmVhY3QtdHJlZWAgOiAnb2MtcmVhY3QtdHJlZSc7XG4gICAgY29uc3QgZXhwYW5kQWxsQ2xzTmFtZSA9IHRoaXMuaXNBbGxFeHBhbmRlZCgpID8gJ2V4cGFuZC1hbGwnIDogJyc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICA8ZGl2IGlkPVwidHJlZS12aWV3LWNvbnRhaW5lclwiIGNsYXNzTmFtZT17Y2xzTmFtZX0gb25DbGljaz17dGhpcy5vbkNvbnRhaW5lckNsaWNrfT5cblxuICAgICAgICB7KHNob3dFeHBhbmRBbGwgfHwgdGl0bGUgfHwgaGVhZGVyUmlnaHQgfHwgc2hvd09yZGVyaW5nQXJyb3dzKSAmJlxuICAgICAgICA8aGVhZGVyXG4gICAgICAgICAgY2xhc3NOYW1lPVwidGl0bGUtY29udGFpbmVyXCJcbiAgICAgICAgICByZWY9eyhlbCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSBlbDtcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAge3Nob3dFeHBhbmRBbGwgJiZcbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uRXhwYW5kQWxsQ2xpY2t9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BleHBhbmQtYWxsLXRvZ2dsZSAke2V4cGFuZEFsbENsc05hbWV9YH1cbiAgICAgICAgICAvPn1cbiAgICAgICAgICB7dGl0bGUgJiYgPGgyPnt0aXRsZX08L2gyPn1cbiAgICAgICAgICB7c2hvd09yZGVyaW5nQXJyb3dzICYmXG4gICAgICAgICAgPE9yZGVyaW5nQXJyb3dzXG4gICAgICAgICAgICBvbk9yZGVyQnV0dG9uQ2xpY2s9e29uT3JkZXJCdXR0b25DbGlja31cbiAgICAgICAgICAgIHNlbGVjdGVkUGFyZW50PXt0aGlzLmdldFNlbGVjdGVkUGFyZW50KCl9XG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAvPn1cbiAgICAgICAgICB7aGVhZGVyUmlnaHQgJiYgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItcmlnaHRcIj57aGVhZGVyUmlnaHR9PC9kaXY+fVxuICAgICAgICA8L2hlYWRlcj59XG4gICAgICAgIHshIW5vZGVzLmxlbmd0aCAmJlxuICAgICAgICA8UGVyZmVjdFNjcm9sbEJhcj5cbiAgICAgICAgICA8VHJlZVxuICAgICAgICAgICAgaWQ9e3RyZWVJZH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgICAgY2hlY2tlZEtleXM9e2NoZWNrZWRLZXlzfVxuICAgICAgICAgICAgc2VsZWN0ZWRLZXlzPXtzZWxlY3RlZEtleXN9XG4gICAgICAgICAgICBleHBhbmRlZEtleXM9e3RoaXMuc3RhdGUuZXhwYW5kZWRLZXlzfVxuICAgICAgICAgICAgb25FeHBhbmQ9e3RoaXMub25FeHBhbmR9XG4gICAgICAgICAgICBvblNlbGVjdD17b25TZWxlY3R9XG4gICAgICAgICAgICBvbkNoZWNrPXtvbkNoZWNrfVxuICAgICAgICAgICAgb25Ecm9wPXt0aGlzLm9uRHJhZ0Ryb3B9XG4gICAgICAgICAgICBjaGVja2FibGU9e2NoZWNrYWJsZX1cbiAgICAgICAgICAgIHNlbGVjdGFibGU9e3NlbGVjdGFibGV9XG4gICAgICAgICAgICBkcmFnZ2FibGU9e2RyYWdnYWJsZX1cbiAgICAgICAgICAgIHNob3dMaW5lPXtzaG93TGluZX1cbiAgICAgICAgICAgIHNob3dJY29uPXtzaG93SWNvbn1cbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bm9kZXN9XG4gICAgICAgICAgPC9UcmVlPlxuICAgICAgICA8L1BlcmZlY3RTY3JvbGxCYXI+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==