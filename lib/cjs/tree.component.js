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
            className: 'tree-header',
            ref: function ref(el) {
              _this2.header = el;
            }
          },
          _react2.default.createElement(
            'div',
            { className: 'header-left' },
            showExpandAll && !!nodes.length && _react2.default.createElement('button', {
              onClick: this.onExpandAllClick,
              className: 'expand-all-toggle ' + expandAllClsName,
              type: 'button'
            }),
            title && _react2.default.createElement(
              'h2',
              null,
              title
            ),
            showOrderingArrows && _react2.default.createElement(_treeOrderingArrows2.default, _extends({
              onOrderButtonClick: onOrderButtonClick,
              selectedParent: this.getSelectedParent()
            }, this.props))
          ),
          headerRight && _react2.default.createElement(
            'div',
            { className: 'header-right' },
            headerRight
          )
        ),
        _react2.default.createElement(
          _reactPerfectScrollbar2.default,
          null,
          !!nodes.length && _react2.default.createElement(
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

    if (deselectOnContainerClick && e.target.tagName !== 'SPAN' && !_this3.header.contains(e.target) && onSelect) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiT0NUcmVlVmlldyIsInByb3BzIiwiZXhwYW5kZWRLZXlzIiwiZGVmYXVsdEV4cGFuZEFsbCIsImdldEFsbFBhcmVudElkcyIsInRyZWVEYXRhIiwic3RhdGUiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJyZW5kZXJOb2RlcyIsImRhdGFMb29rVXBLZXkiLCJkYXRhTG9va1VwVmFsdWUiLCJkYXRhTG9va1VwQ2hpbGRyZW4iLCJpY29uQ2xhc3MiLCJkaXNhYmxlZCIsImNoZWNrQ2hpbGRyZW4iLCJoYXNDaGlsZHJlbiIsIm1vdW50Tm9kZXMiLCJub2RlTGlzdCIsImxpc3QiLCJmb3JFYWNoIiwibm9kZSIsInB1c2giLCJyZW5kZXIiLCJub2RlcyIsInRyZWVJZCIsImNsYXNzTmFtZSIsImNoZWNrZWRLZXlzIiwib25TZWxlY3QiLCJvbkNoZWNrIiwic2hvd0xpbmUiLCJzaG93SWNvbiIsImNoZWNrYWJsZSIsInNlbGVjdGFibGUiLCJkcmFnZ2FibGUiLCJzZWxlY3RlZEtleXMiLCJzaG93RXhwYW5kQWxsIiwidGl0bGUiLCJoZWFkZXJSaWdodCIsInNob3dPcmRlcmluZ0Fycm93cyIsIm9uT3JkZXJCdXR0b25DbGljayIsImNsc05hbWUiLCJleHBhbmRBbGxDbHNOYW1lIiwiaXNBbGxFeHBhbmRlZCIsIm9uQ29udGFpbmVyQ2xpY2siLCJlbCIsImhlYWRlciIsImxlbmd0aCIsIm9uRXhwYW5kQWxsQ2xpY2siLCJnZXRTZWxlY3RlZFBhcmVudCIsIm9uRXhwYW5kIiwib25EcmFnRHJvcCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiLCJpc0RyYWdEcm9wTGVnYWwiLCJkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2siLCJlIiwidGFyZ2V0IiwidGFnTmFtZSIsImNvbnRhaW5zIiwiVHlwZUVycm9yIiwibmV3RGF0YSIsImdldFVwZGF0ZWRUcmVlIiwiZ2V0VHJlZUl0ZW0iLCJkcmFnTm9kZSIsImV2ZW50S2V5IiwiaWQiLCJwYXJlbnQiLCJkcmFnSXRlbSIsImRyYWdFdmVudCIsImFycmF5IiwicGFyZW50RmlsdGVyZWQiLCJkcm9wVG9HYXAiLCJkcm9wSWQiLCJmb3VuZCIsIm5ld0l0ZW1zIiwic2xpY2UiLCJhZGRJdGVtVG9BcnJheSIsIml0ZW1zIiwiZHJvcEluZGV4IiwiZmluZEluZGV4IiwiY2hpbGQiLCJuZXdDaGlsZHJlbiIsInNwbGljZSIsInJlbW92ZUl0ZW0iLCJpIiwiaXRlbSIsImNoaWxkcmVuIiwicmV0dXJuUGFyZW50IiwiZmluZCIsImNiIiwiYWNjIiwidG90YWwiLCJjb25jYXQiLCJyZWR1Y2UiLCJpc1BhcmVudCIsImFyciIsImZpbHRlckNoaWxkIiwiZmlsdGVyIiwiZGF0YU9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUE7OztBQU5BOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBR0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxVOzs7QUFpRW5CLHNCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLCtCQURpQjs7QUFBQTs7QUFFakIsUUFBTUMsZUFBZUQsTUFBTUUsZ0JBQU4sR0FDbkIsTUFBS0MsZUFBTCxDQUFxQkgsTUFBTUksUUFBM0IsRUFBcUNKLEtBQXJDLENBRG1CLEdBQzJCQSxNQUFNQyxZQUR0RDs7QUFHQSxVQUFLSSxLQUFMLEdBQWE7QUFDWEo7QUFEVyxLQUFiO0FBTGlCO0FBUWxCOzt1QkFFREsseUIsc0NBQTBCQyxTLEVBQVc7QUFDbkMsUUFBSUEsVUFBVU4sWUFBVixLQUEyQixLQUFLRCxLQUFMLENBQVdDLFlBQTFDLEVBQXdEO0FBQ3RELFdBQUtPLFFBQUwsQ0FBYztBQUNaUCxzQkFBY00sVUFBVU47QUFEWixPQUFkO0FBR0Q7QUFDRixHOztBQTJDRDs7Ozs7Ozs7OztBQXNEQTs7Ozs7Ozs7OztBQXdCQTs7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QVNVLENBQVQsQ0FBYjs7QUFFQSxZQUFJQyxLQUFLM0Usa0JBQUwsS0FBNEJvRixTQUFTVCxLQUFLM0Usa0JBQUwsQ0FBVCxDQUFoQyxFQUFvRTtBQUNsRStELGtCQUFRLElBQVI7QUFDQVksZUFBSzNFLGtCQUFMLElBQTJCc0YsWUFBWVgsS0FBSzNFLGtCQUFMLENBQVosQ0FBM0I7QUFDQTtBQUNEO0FBQ0QsWUFBSTJFLEtBQUszRSxrQkFBTCxLQUE0QixDQUFDK0QsS0FBakMsRUFBd0M7QUFDdENBLGtCQUFRLE9BQUtVLFVBQUwsQ0FBZ0JFLEtBQUszRSxrQkFBTCxDQUFoQixFQUEwQ3VELEVBQTFDLENBQVI7QUFDRDtBQUNGO0FBQ0Y7QUFDRCxRQUFJLENBQUNRLEtBQUwsRUFBWSxPQUFPLEtBQVA7QUFDWixXQUFPQyxRQUFQO0FBQ0QsRzs7T0FHRDVELFcsR0FBYztBQUFBLFdBQWdCb0YsV0FBVyxPQUFLcEcsS0FBTCxDQUFXWSxrQkFBdEIsS0FDekJ3RixXQUFXLE9BQUtwRyxLQUFMLENBQVdZLGtCQUF0QixFQUEwQ21DLE1BQTFDLElBQW9ELENBRDNDO0FBQUEsRzs7a0JBeFFLaEQsVSIsImZpbGUiOiJ0cmVlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBUcmVlLCB7IFRyZWVOb2RlIH0gZnJvbSAncmMtdHJlZSc7XHJcbmltcG9ydCBQZXJmZWN0U2Nyb2xsQmFyIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXBlcmZlY3Qtc2Nyb2xsYmFyJztcclxuaW1wb3J0ICdyYy10cmVlL2Fzc2V0cy9pbmRleC5jc3MnO1xyXG5cclxuLy8gT3ZlcnJpZGUgZGVmYXVsdHMgcmMtdHJlZSBzdHlsZXNcclxuaW1wb3J0ICcuL29jLXRyZWUtc3R5bGVzLnNjc3MnO1xyXG5pbXBvcnQgVHJlZUNoZWNrYm94IGZyb20gJy4vdHJlZS1jaGVja2JveC5jb21wb25lbnQnO1xyXG5pbXBvcnQgT3JkZXJpbmdBcnJvd3MgZnJvbSAnLi90cmVlLW9yZGVyaW5nLWFycm93cy5jb21wb25lbnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0NUcmVlVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICB0cmVlSWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBpY29uQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBvbkV4cGFuZDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvbkNoZWNrOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uRHJhZ0Ryb3A6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgb25PcmRlckJ1dHRvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIGlzRHJhZ0Ryb3BMZWdhbDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBzaG93TGluZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBzaG93SWNvbjogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBjaGVja2FibGU6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgc2VsZWN0YWJsZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBkcmFnZ2FibGU6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAvLyBDdXN0b21pc2F0aW9uIC0tIGRlZmluZSB0aGUgZGF0YSBsb29rVXBLZXlzIGFuZCBsb29rVXBWYWx1ZXNcclxuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcclxuICAgIGRhdGFMb29rVXBLZXk6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBkYXRhTG9va1VwVmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBjaGVja2VkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXHJcbiAgICBzZWxlY3RlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxyXG4gICAgZXhwYW5kZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcclxuICAgIGRlc2VsZWN0T25Db250YWluZXJDbGljazogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBzaG93RXhwYW5kQWxsOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgaGVhZGVyUmlnaHQ6IFByb3BUeXBlcy5ub2RlLFxyXG4gICAgc2hvd09yZGVyaW5nQXJyb3dzOiBQcm9wVHlwZXMuYm9vbCxcclxuICB9O1xyXG5cclxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdHJlZUlkOiAnZGVmYXVsdFRyZWUnLFxyXG4gICAgaWNvbkNsYXNzOiAnY2FyZXRzJyxcclxuICAgIG9uRXhwYW5kOiB1bmRlZmluZWQsXHJcbiAgICBvblNlbGVjdDogdW5kZWZpbmVkLFxyXG4gICAgb25DaGVjazogdW5kZWZpbmVkLFxyXG4gICAgb25EcmFnRHJvcDogdW5kZWZpbmVkLFxyXG4gICAgb25PcmRlckJ1dHRvbkNsaWNrOiB1bmRlZmluZWQsXHJcbiAgICBpc0RyYWdEcm9wTGVnYWw6IHVuZGVmaW5lZCxcclxuICAgIHNob3dMaW5lOiBmYWxzZSxcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHNob3dJY29uOiB0cnVlLFxyXG4gICAgY2hlY2thYmxlOiBmYWxzZSxcclxuICAgIGRyYWdnYWJsZTogZmFsc2UsXHJcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IGZhbHNlLFxyXG4gICAgLy8gQ3VzdG9tc1xyXG4gICAgZGF0YUxvb2tVcEtleTogJ2tleScsXHJcbiAgICBkYXRhTG9va1VwVmFsdWU6ICdwYXJlbnQnLFxyXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiAnY2hpbGRyZW4nLFxyXG4gICAgdHJlZURhdGE6IFtdLFxyXG4gICAgY2hlY2tlZEtleXM6IFtdLFxyXG4gICAgc2VsZWN0ZWRLZXlzOiBbXSxcclxuICAgIGV4cGFuZGVkS2V5czogW10sXHJcbiAgICBjbGFzc05hbWU6ICcnLFxyXG4gICAgZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrOiB0cnVlLFxyXG4gICAgc2hvd0V4cGFuZEFsbDogZmFsc2UsXHJcbiAgICB0aXRsZTogdW5kZWZpbmVkLFxyXG4gICAgaGVhZGVyUmlnaHQ6IHVuZGVmaW5lZCxcclxuICAgIHNob3dPcmRlcmluZ0Fycm93czogZmFsc2UsXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBjb25zdCBleHBhbmRlZEtleXMgPSBwcm9wcy5kZWZhdWx0RXhwYW5kQWxsID9cclxuICAgICAgdGhpcy5nZXRBbGxQYXJlbnRJZHMocHJvcHMudHJlZURhdGEsIHByb3BzKSA6IHByb3BzLmV4cGFuZGVkS2V5cztcclxuXHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBleHBhbmRlZEtleXMsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIGlmIChuZXh0UHJvcHMuZXhwYW5kZWRLZXlzICE9PSB0aGlzLnByb3BzLmV4cGFuZGVkS2V5cykge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBleHBhbmRlZEtleXM6IG5leHRQcm9wcy5leHBhbmRlZEtleXMsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Db250YWluZXJDbGljayA9IChlKSA9PiB7XHJcbiAgICBjb25zdCB7IG9uU2VsZWN0LCBkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2sgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAvLyBjbGlja2luZyBvdXRzaWRlIGl0ZW1cclxuICAgIGlmIChkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2sgJiYgZS50YXJnZXQudGFnTmFtZSAhPT0gJ1NQQU4nICYmICF0aGlzLmhlYWRlci5jb250YWlucyhlLnRhcmdldCkgJiYgb25TZWxlY3QpIHtcclxuICAgICAgb25TZWxlY3QoW10pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIG9uRXhwYW5kID0gKGV4cGFuZGVkS2V5cykgPT4ge1xyXG4gICAgY29uc3QgeyBvbkV4cGFuZCB9ID0gdGhpcy5wcm9wcztcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmRlZEtleXMgfSwgKCkgPT4ge1xyXG4gICAgICBpZiAob25FeHBhbmQpIG9uRXhwYW5kKHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIG9uRHJhZ0Ryb3AgPSAoZSkgPT4ge1xyXG4gICAgY29uc3QgeyBvbkRyYWdEcm9wLCBpc0RyYWdEcm9wTGVnYWwsIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgaWYgKCFvbkRyYWdEcm9wKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdvbkRyYWdEcm9wIGNhbGxiYWNrIGlzIG5vdCBkZWZpbmVkJyk7XHJcblxyXG4gICAgLy8gQ2FsbGluZyBpc0RyYWdEcm9wTGVnYWwgY2FsbGJhY2sgdG8gZW5zdXJlIHRoYXQgdGhpcyBtb3ZlIGNhbiBiZSBkb25lXHJcbiAgICBpZiAoaXNEcmFnRHJvcExlZ2FsICYmICFpc0RyYWdEcm9wTGVnYWwodHJlZURhdGEsIGUpKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgbmV3RGF0YSA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5nZXRUcmVlSXRlbShlLmRyYWdOb2RlLnByb3BzLmV2ZW50S2V5KSwgZSk7XHJcbiAgICBvbkRyYWdEcm9wKG5ld0RhdGEsIGUpO1xyXG4gIH07XHJcblxyXG4gIG9uRXhwYW5kQWxsQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IG9uRXhwYW5kIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgZXhwYW5kZWRLZXlzID0gdGhpcy5pc0FsbEV4cGFuZGVkKCkgPyBbXSA6IHRoaXMuZ2V0QWxsUGFyZW50SWRzKCk7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kZWRLZXlzIH0sICgpID0+IHtcclxuICAgICAgaWYgKG9uRXhwYW5kKSBvbkV4cGFuZCh0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cyk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBnZXRTZWxlY3RlZFBhcmVudCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgc2VsZWN0ZWRLZXlzLCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IGlkID0gc2VsZWN0ZWRLZXlzWzBdO1xyXG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgdHJlZURhdGEsIHRydWUpO1xyXG4gICAgcmV0dXJuIHBhcmVudCB8fCB0cmVlRGF0YTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHVwZGF0ZWQgdHJlZSBhZnRlciBEcmFnIG4nIGRyb3AgZXZlbnRcclxuICAgKiBAcGFyYW0gZHJhZ0l0ZW0gLSBkcmFnZ2VkIGl0ZW1cclxuICAgKiBAcGFyYW0gZHJhZ0V2ZW50IC0gZXZlbnRcclxuICAgKiBAcGFyYW0gYXJyYXkgLSB1c2VkIHJlY3Vyc2l2ZWx5XHJcbiAgICogQHBhcmFtIHBhcmVudEZpbHRlcmVkIC0gdXNlZCByZWN1cnNpdmVseVxyXG4gICAqIEByZXR1cm5zIHsqfVxyXG4gICAqL1xyXG4gIGdldFVwZGF0ZWRUcmVlID0gKGRyYWdJdGVtLCBkcmFnRXZlbnQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgcGFyZW50RmlsdGVyZWQgPSBmYWxzZSkgPT4ge1xyXG4gICAgY29uc3QgeyBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwQ2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCB7IGRyb3BUb0dhcCwgbm9kZSB9ID0gZHJhZ0V2ZW50O1xyXG4gICAgY29uc3QgZHJvcElkID0gbm9kZSAmJiBub2RlLnByb3BzLmV2ZW50S2V5O1xyXG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcbiAgICBsZXQgbmV3SXRlbXMgPSBhcnJheS5zbGljZSgpO1xyXG5cclxuICAgIGNvbnN0IGFkZEl0ZW1Ub0FycmF5ID0gKGl0ZW1zKSA9PiB7XHJcbiAgICAgIGNvbnN0IGRyb3BJbmRleCA9IGl0ZW1zLmZpbmRJbmRleChjaGlsZCA9PiBjaGlsZFtkYXRhTG9va1VwS2V5XSA9PT0gZHJvcElkKTtcclxuICAgICAgaWYgKGRyb3BJbmRleCA+IC0xKSB7XHJcbiAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IG5ld0NoaWxkcmVuID0gaXRlbXMuc2xpY2UoKTtcclxuICAgICAgICBuZXdDaGlsZHJlbi5zcGxpY2UoZHJvcEluZGV4LCAwLCBkcmFnSXRlbSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld0NoaWxkcmVuO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBpdGVtcztcclxuICAgIH07XHJcbiAgICBpZiAoIXBhcmVudEZpbHRlcmVkICYmIGRyYWdJdGVtKSB7XHJcbiAgICAgIG5ld0l0ZW1zID0gdGhpcy5yZW1vdmVJdGVtKG5ld0l0ZW1zLCBkcmFnSXRlbVtkYXRhTG9va1VwS2V5XSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZHJvcFRvR2FwKSB7XHJcbiAgICAgIG5ld0l0ZW1zID0gYWRkSXRlbVRvQXJyYXkobmV3SXRlbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghZm91bmQpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXTtcclxuXHJcbiAgICAgICAgaWYgKCFkcm9wVG9HYXAgJiYgZHJvcElkID09PSBpdGVtW2RhdGFMb29rVXBLZXldICYmICFmb3VuZCkge1xyXG4gICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgaWYgKCFjaGlsZHJlbikgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dID0gW107XHJcbiAgICAgICAgICBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0ucHVzaChkcmFnSXRlbSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkcmVuICYmIGRyb3BUb0dhcCkge1xyXG4gICAgICAgICAgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dID0gYWRkSXRlbVRvQXJyYXkoY2hpbGRyZW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWZvdW5kICYmIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSkge1xyXG4gICAgICAgICAgZm91bmQgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKGRyYWdJdGVtLCBkcmFnRXZlbnQsIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoIWZvdW5kKSByZXR1cm4gZmFsc2U7XHJcbiAgICByZXR1cm4gbmV3SXRlbXM7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhIHRyZWUgaXRlbSBieSBJRFxyXG4gICAqIEBwYXJhbSBpZFxyXG4gICAqIEBwYXJhbSBhcnJheVxyXG4gICAqIEBwYXJhbSByZXR1cm5QYXJlbnQgLSByZXR1cm4gaXRlbSdzIHBhcmVudCBpbnN0ZWFkIG9mIHRoZSBpdGVtXHJcbiAgICogQHBhcmFtIHBhcmVudCAtIHBhcmVudCBpdGVtICh1c2VkIHJlY3Vyc2l2ZWx5KVxyXG4gICAqIEByZXR1cm5zIHt7fX1cclxuICAgKi9cclxuICBnZXRUcmVlSXRlbSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCByZXR1cm5QYXJlbnQgPSBmYWxzZSwgcGFyZW50ID0gbnVsbCkgPT4ge1xyXG4gICAgY29uc3QgeyBkYXRhTG9va1VwQ2hpbGRyZW4sIGRhdGFMb29rVXBLZXkgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBsZXQgZm91bmQgPSBhcnJheS5maW5kKGl0ZW0gPT4gaXRlbVtkYXRhTG9va1VwS2V5XSA9PT0gaWQpO1xyXG5cclxuICAgIGlmIChmb3VuZCAmJiByZXR1cm5QYXJlbnQpIGZvdW5kID0gcGFyZW50O1xyXG5cclxuICAgIGlmICghZm91bmQpIHtcclxuICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgIWZvdW5kKSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSwgcmV0dXJuUGFyZW50LCBpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZvdW5kO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYWxsIHBhcmVudCBJRHMgaW4gdGhlIHRyZWVcclxuICAgKiBAcGFyYW0gYXJyYXlcclxuICAgKi9cclxuICBnZXRBbGxQYXJlbnRJZHMgPSAoYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCBwcm9wcyA9IHRoaXMucHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHsgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcENoaWxkcmVuIH0gPSBwcm9wcztcclxuICAgIGNvbnN0IGNiID0gKGFjYywgaXRlbSkgPT4ge1xyXG4gICAgICBsZXQgdG90YWwgPSBhY2M7XHJcbiAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0b3RhbCA9IGFjYy5jb25jYXQoaXRlbVtkYXRhTG9va1VwS2V5XSk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXS5yZWR1Y2UoY2IsIHRvdGFsKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG90YWw7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGFycmF5LnJlZHVjZShjYiwgW10pO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCBhbGwgcGFyZW50IElEcyBhcmUgZXhwYW5kZWRcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBpc0FsbEV4cGFuZGVkID0gKCkgPT5cclxuICAgIHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzICYmIHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLmxlbmd0aCA9PT0gdGhpcy5nZXRBbGxQYXJlbnRJZHMoKS5sZW5ndGg7XHJcblxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgaXRlbSBmcm9tIGdpdmVuIGFycmF5XHJcbiAgICogQHBhcmFtIGFycmF5XHJcbiAgICogQHBhcmFtIGlkXHJcbiAgICogQHJldHVybnMgYXJyYXkgb2YgZmlsdGVyZWQgaXRlbXNcclxuICAgKi9cclxuICByZW1vdmVJdGVtID0gKGFycmF5LCBpZCkgPT4ge1xyXG4gICAgY29uc3QgeyBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwQ2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XHJcbiAgICBsZXQgbmV3SXRlbXMgPSBhcnJheS5zbGljZSgpO1xyXG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcbiAgICBjb25zdCBpc1BhcmVudCA9IGFyciA9PiBhcnIuZmluZChjaGlsZCA9PiBjaGlsZFtkYXRhTG9va1VwS2V5XSA9PT0gaWQpO1xyXG4gICAgY29uc3QgZmlsdGVyQ2hpbGQgPSBhcnIgPT4gYXJyLmZpbHRlcihjaGlsZCA9PiBjaGlsZFtkYXRhTG9va1VwS2V5XSAhPT0gaWQpO1xyXG5cclxuICAgIGlmIChpc1BhcmVudChuZXdJdGVtcykpIHtcclxuICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICBuZXdJdGVtcyA9IGZpbHRlckNoaWxkKG5ld0l0ZW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWZvdW5kKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XHJcblxyXG4gICAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgaXNQYXJlbnQoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKSkge1xyXG4gICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dID0gZmlsdGVyQ2hpbGQoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmICFmb3VuZCkge1xyXG4gICAgICAgICAgZm91bmQgPSB0aGlzLnJlbW92ZUl0ZW0oaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLCBpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoIWZvdW5kKSByZXR1cm4gZmFsc2U7XHJcbiAgICByZXR1cm4gbmV3SXRlbXM7XHJcbiAgfTtcclxuXHJcbiAgLyogaGFzQ2hpbGRyZW4gLSBmdW5jdGlvbiAqL1xyXG4gIGhhc0NoaWxkcmVuID0gZGF0YU9iamVjdCA9PiAoKGRhdGFPYmplY3RbdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW5dXHJcbiAgICAmJiBkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXS5sZW5ndGggPj0gMVxyXG4gICkpO1xyXG5cclxuICAvKiByZW5kZXJOb2RlcyAtIGZ1bmN0aW9uICovXHJcbiAgcmVuZGVyTm9kZXMoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBWYWx1ZSwgZGF0YUxvb2tVcENoaWxkcmVuLCBpY29uQ2xhc3MsIGRpc2FibGVkLFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCBjaGVja0NoaWxkcmVuID0gdGhpcy5oYXNDaGlsZHJlbjtcclxuXHJcbiAgICAvLyBSZWN1cnNpdmUgZnVuY3Rpb24gZm9yIGNvbGxlY3Rpbmcgbm9kZXM6XHJcbiAgICBjb25zdCBtb3VudE5vZGVzID0gKG5vZGVMaXN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgICAgbm9kZUxpc3QuZm9yRWFjaCgobm9kZSkgPT4ge1xyXG4gICAgICAgIGlmICghbm9kZVtkYXRhTG9va1VwS2V5XSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8vIExlYWYgbm9kZVxyXG4gICAgICAgIGlmICghY2hlY2tDaGlsZHJlbihub2RlKSkge1xyXG4gICAgICAgICAgbGlzdC5wdXNoKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcclxuICAgICAgICAgICAgPFRyZWVOb2RlXHJcbiAgICAgICAgICAgICAgdGl0bGU9e25vZGVbZGF0YUxvb2tVcFZhbHVlXX1cclxuICAgICAgICAgICAgICBrZXk9e25vZGVbZGF0YUxvb2tVcEtleV19XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtpY29uQ2xhc3N9IGxlYWYtbm9kZWB9XHJcbiAgICAgICAgICAgICAgaWNvbj17PFRyZWVDaGVja2JveCBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+fVxyXG4gICAgICAgICAgICAvPik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIFBhcmVudCBub2RlXHJcbiAgICAgICAgICBsaXN0LnB1c2goIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuY3Rpb24tcGFyZW4tbmV3bGluZVxyXG4gICAgICAgICAgICA8VHJlZU5vZGVcclxuICAgICAgICAgICAgICB0aXRsZT17bm9kZVtkYXRhTG9va1VwVmFsdWVdfVxyXG4gICAgICAgICAgICAgIGtleT17bm9kZVtkYXRhTG9va1VwS2V5XX1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2ljb25DbGFzc30gcGFyZW50LW5vZGVgfVxyXG4gICAgICAgICAgICAgIGljb249ezxUcmVlQ2hlY2tib3ggZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPn1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHttb3VudE5vZGVzKG5vZGVbZGF0YUxvb2tVcENoaWxkcmVuXSl9XHJcbiAgICAgICAgICAgIDwvVHJlZU5vZGU+KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG1vdW50Tm9kZXModGhpcy5wcm9wcy50cmVlRGF0YSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLnJlbmRlck5vZGVzKCk7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHRyZWVJZCwgY2xhc3NOYW1lLCBjaGVja2VkS2V5cywgb25TZWxlY3QsIG9uQ2hlY2ssIHNob3dMaW5lLCBzaG93SWNvbixcclxuICAgICAgY2hlY2thYmxlLCBzZWxlY3RhYmxlLCBkcmFnZ2FibGUsIGRpc2FibGVkLCBzZWxlY3RlZEtleXMsIHNob3dFeHBhbmRBbGwsIHRpdGxlLCBoZWFkZXJSaWdodCxcclxuICAgICAgc2hvd09yZGVyaW5nQXJyb3dzLCBvbk9yZGVyQnV0dG9uQ2xpY2ssXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IGNsc05hbWUgPSBjbGFzc05hbWUgPyBgJHtjbGFzc05hbWV9IG9jLXJlYWN0LXRyZWVgIDogJ29jLXJlYWN0LXRyZWUnO1xyXG4gICAgY29uc3QgZXhwYW5kQWxsQ2xzTmFtZSA9IHRoaXMuaXNBbGxFeHBhbmRlZCgpID8gJ2V4cGFuZC1hbGwnIDogJyc7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICAgIDxkaXYgaWQ9XCJ0cmVlLXZpZXctY29udGFpbmVyXCIgY2xhc3NOYW1lPXtjbHNOYW1lfSBvbkNsaWNrPXt0aGlzLm9uQ29udGFpbmVyQ2xpY2t9PlxyXG4gICAgICAgIHsoc2hvd0V4cGFuZEFsbCB8fCB0aXRsZSB8fCBoZWFkZXJSaWdodCB8fCBzaG93T3JkZXJpbmdBcnJvd3MpICYmXHJcbiAgICAgICAgPGhlYWRlclxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwidHJlZS1oZWFkZXJcIlxyXG4gICAgICAgICAgcmVmPXsoZWwpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSBlbDtcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItbGVmdFwiPlxyXG4gICAgICAgICAgICB7c2hvd0V4cGFuZEFsbCAmJiAhIW5vZGVzLmxlbmd0aCAmJlxyXG4gICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkV4cGFuZEFsbENsaWNrfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGV4cGFuZC1hbGwtdG9nZ2xlICR7ZXhwYW5kQWxsQ2xzTmFtZX1gfVxyXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAvPn1cclxuICAgICAgICAgICAge3RpdGxlICYmIDxoMj57dGl0bGV9PC9oMj59XHJcbiAgICAgICAgICAgIHtzaG93T3JkZXJpbmdBcnJvd3MgJiZcclxuICAgICAgICAgICAgPE9yZGVyaW5nQXJyb3dzXHJcbiAgICAgICAgICAgICAgb25PcmRlckJ1dHRvbkNsaWNrPXtvbk9yZGVyQnV0dG9uQ2xpY2t9XHJcbiAgICAgICAgICAgICAgc2VsZWN0ZWRQYXJlbnQ9e3RoaXMuZ2V0U2VsZWN0ZWRQYXJlbnQoKX1cclxuICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cclxuICAgICAgICAgICAgLz59XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIHtoZWFkZXJSaWdodCAmJiA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci1yaWdodFwiPntoZWFkZXJSaWdodH08L2Rpdj59XHJcbiAgICAgICAgPC9oZWFkZXI+fVxyXG4gICAgICAgIDxQZXJmZWN0U2Nyb2xsQmFyPlxyXG4gICAgICAgICAgeyEhbm9kZXMubGVuZ3RoICYmXHJcbiAgICAgICAgICA8VHJlZVxyXG4gICAgICAgICAgICBpZD17dHJlZUlkfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuICAgICAgICAgICAgY2hlY2tlZEtleXM9e2NoZWNrZWRLZXlzfVxyXG4gICAgICAgICAgICBzZWxlY3RlZEtleXM9e3NlbGVjdGVkS2V5c31cclxuICAgICAgICAgICAgZXhwYW5kZWRLZXlzPXt0aGlzLnN0YXRlLmV4cGFuZGVkS2V5c31cclxuICAgICAgICAgICAgb25FeHBhbmQ9e3RoaXMub25FeHBhbmR9XHJcbiAgICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH1cclxuICAgICAgICAgICAgb25DaGVjaz17b25DaGVja31cclxuICAgICAgICAgICAgb25Ecm9wPXt0aGlzLm9uRHJhZ0Ryb3B9XHJcbiAgICAgICAgICAgIGNoZWNrYWJsZT17Y2hlY2thYmxlfVxyXG4gICAgICAgICAgICBzZWxlY3RhYmxlPXtzZWxlY3RhYmxlfVxyXG4gICAgICAgICAgICBkcmFnZ2FibGU9e2RyYWdnYWJsZX1cclxuICAgICAgICAgICAgc2hvd0xpbmU9e3Nob3dMaW5lfVxyXG4gICAgICAgICAgICBzaG93SWNvbj17c2hvd0ljb259XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge25vZGVzfVxyXG4gICAgICAgICAgPC9UcmVlPlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIDwvUGVyZmVjdFNjcm9sbEJhcj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=