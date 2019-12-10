'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

// Load default styles and override them with rc-tree styles


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _rcTree = require('rc-tree');

var _rcTree2 = _interopRequireDefault(_rcTree);

var _reactPerfectScrollbar = require('@opuscapita/react-perfect-scrollbar');

var _reactPerfectScrollbar2 = _interopRequireDefault(_reactPerfectScrollbar);

require('./assets/rc-tree-styles.scss');

require('./assets/oc-tree-styles.scss');

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
          _react2.default.createElement(_rcTree.TreeNode, {
            title: title,
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
}(_react2.default.PureComponent), _class.defaultProps = {
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
exports.default = OCTreeView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiT0NUcmVlVmlldyIsInByb3BzIiwiZXhwYW5kZWRLZXlzIiwiZGVmYXVsdEV4cGFuZEFsbCIsImdldEFsbFBhcmVudElkcyIsInRyZWVEYXRhIiwic3RhdGUiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwiaGFuZGxlRXhwYW5kZWRLZXlzTWFudWFsbHkiLCJzZXRTdGF0ZSIsInJlbmRlck5vZGVzIiwiZGF0YUxvb2tVcEtleSIsImRhdGFMb29rVXBWYWx1ZSIsImRhdGFMb29rVXBMZWFmVmFsdWUiLCJkYXRhTG9va1VwQ2hpbGRyZW4iLCJpY29uQ2xhc3MiLCJkaXNhYmxlZCIsImNoZWNrQ2hpbGRyZW4iLCJoYXNDaGlsZHJlbiIsIm1vdW50Tm9kZXMiLCJub2RlTGlzdCIsImxpc3QiLCJmb3JFYWNoIiwibm9kZSIsInRpdGxlIiwicHVzaCIsInJlbmRlciIsIm5vZGVzIiwicmVzb2x2ZWRQcm9wcyIsInRyZWVJZCIsImNsYXNzTmFtZSIsImNoZWNrZWRLZXlzIiwib25TZWxlY3QiLCJvbkNoZWNrIiwic2hvd0ljb24iLCJjaGVja2FibGUiLCJzZWxlY3RhYmxlIiwiZHJhZ2dhYmxlIiwic2VsZWN0ZWRLZXlzIiwic2hvd0V4cGFuZEFsbCIsImhlYWRlclJpZ2h0Iiwic2hvd09yZGVyaW5nQXJyb3dzIiwib25PcmRlckJ1dHRvbkNsaWNrIiwiZGVmYXVsdEV4cGFuZGVkS2V5cyIsImNsc05hbWUiLCJleHBhbmRBbGxDbHNOYW1lIiwiaXNBbGxFeHBhbmRlZCIsIm9uQ29udGFpbmVyQ2xpY2siLCJlbCIsImhlYWRlciIsImxlbmd0aCIsIm9uRXhwYW5kQWxsQ2xpY2siLCJnZXRTZWxlY3RlZFBhcmVudCIsIm9uRXhwYW5kIiwib25EcmFnRHJvcCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiLCJpc0RyYWdEcm9wTGVnYWwiLCJkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2siLCJlIiwidGFyZ2V0IiwidGFnTmFtZSIsImNvbnRhaW5zIiwiVHlwZUVycm9yIiwibmV3RGF0YSIsImdldFVwZGF0ZWRUcmVlIiwiZ2V0VHJlZUl0ZW0iLCJkcmFnTm9kZSIsImV2ZW50S2V5IiwiaWQiLCJwYXJlbnQiLCJkcmFnSXRlbSIsImRyYWdFdmVudCIsImFycmF5IiwicGFyZW50RmlsdGVyZWQiLCJkcm9wVG9HYXAiLCJkcm9wSWQiLCJmb3VuZCIsIm5ld0l0ZW1zIiwic2xpY2UiLCJhZGRJdGVtVG9BcnJheSIsIml0ZW1zIiwiZHJvcEluZGV4IiwiZmluZEluZGV4IiwiY2hpbGQiLCJuZXdDaGlsZHJlbiIsInNwbGljZSIsInJlbW92ZUl0ZW0iLCJpIiwiaXRlbSIsImNoaWxkcmVuIiwicmV0dXJuUGFyZW50IiwiZmluZCIsImNiIiwiYWNjIiwidG90YWwiLCJjb25jYXQiLCJyZWR1Y2UiLCJpc1BhcmVudCIsImFyciIsImZpbHRlckNoaWxkIiwiZmlsdGVyIiwiZGF0YU9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0E7OztBQUxBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxVOzs7QUFxRW5CLHNCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLCtCQURpQjs7QUFBQTs7QUFFakIsUUFBTUMsZUFBZUQsTUFBTUUsZ0JBQU4sR0FDakIsTUFBS0MsZUFBTCxDQUFxQkgsTUFBTUksUUFBM0IsRUFBcUNKLEtBQXJDLENBRGlCLEdBQzZCQSxNQUFNQyxZQUR4RDs7QUFHQSxVQUFLSSxLQUFMLEdBQWE7QUFDWEo7QUFEVyxLQUFiO0FBTGlCO0FBUWxCOzt1QkFFREsseUIsc0NBQTBCQyxTLEVBQVc7QUFDbkMsUUFBSUEsVUFBVUMsMEJBQVYsSUFDREQsVUFBVU4sWUFBVixLQUEyQixLQUFLRCxLQUFMLENBQVdDLFlBRHpDLEVBQ3dEO0FBQ3RE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S0FBTCxDQUFXYyxrQkFBdEIsRUFBMENvQyxNQUExQyxJQUFvRCxDQUQzQztBQUFBLEc7O2tCQWpSS25ELFUiLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBUcmVlLCB7IFRyZWVOb2RlIH0gZnJvbSAncmMtdHJlZSc7XG5pbXBvcnQgUGVyZmVjdFNjcm9sbEJhciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1wZXJmZWN0LXNjcm9sbGJhcic7XG5cbi8vIExvYWQgZGVmYXVsdCBzdHlsZXMgYW5kIG92ZXJyaWRlIHRoZW0gd2l0aCByYy10cmVlIHN0eWxlc1xuaW1wb3J0ICcuL2Fzc2V0cy9yYy10cmVlLXN0eWxlcy5zY3NzJztcbmltcG9ydCAnLi9hc3NldHMvb2MtdHJlZS1zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgVHJlZUNoZWNrYm94IGZyb20gJy4vdHJlZS1jaGVja2JveC5jb21wb25lbnQnO1xuaW1wb3J0IE9yZGVyaW5nQXJyb3dzIGZyb20gJy4vdHJlZS1vcmRlcmluZy1hcnJvd3MuY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0NUcmVlVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHRyZWVJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWNvbkNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uRXhwYW5kOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGVjazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25EcmFnRHJvcDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25PcmRlckJ1dHRvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBpc0RyYWdEcm9wTGVnYWw6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dJY29uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjaGVja2FibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRyYWdnYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgIC8vIEN1c3RvbWlzYXRpb24gLS0gZGVmaW5lIHRoZSBkYXRhIGxvb2tVcEtleXMgYW5kIGxvb2tVcFZhbHVlc1xuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcbiAgICBkYXRhTG9va1VwS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRhdGFMb29rVXBWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXRhTG9va1VwTGVhZlZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGVja2VkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgc2VsZWN0ZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBleHBhbmRlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGhhbmRsZUV4cGFuZGVkS2V5c01hbnVhbGx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2s6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGhlYWRlclJpZ2h0OiBQcm9wVHlwZXMubm9kZSxcbiAgICBzaG93T3JkZXJpbmdBcnJvd3M6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgdHJlZUlkOiAnZGVmYXVsdFRyZWUnLFxuICAgIGljb25DbGFzczogJ2NhcmV0cycsXG4gICAgb25FeHBhbmQ6IHVuZGVmaW5lZCxcbiAgICBvblNlbGVjdDogdW5kZWZpbmVkLFxuICAgIG9uQ2hlY2s6IHVuZGVmaW5lZCxcbiAgICBvbkRyYWdEcm9wOiB1bmRlZmluZWQsXG4gICAgb25PcmRlckJ1dHRvbkNsaWNrOiB1bmRlZmluZWQsXG4gICAgaXNEcmFnRHJvcExlZ2FsOiB1bmRlZmluZWQsXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIHNob3dJY29uOiB0cnVlLFxuICAgIGNoZWNrYWJsZTogZmFsc2UsXG4gICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBmYWxzZSxcbiAgICAvLyBDdXN0b21zXG4gICAgZGF0YUxvb2tVcEtleTogJ2tleScsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiAncGFyZW50JyxcbiAgICBkYXRhTG9va1VwTGVhZlZhbHVlOiB1bmRlZmluZWQsXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiAnY2hpbGRyZW4nLFxuICAgIHRyZWVEYXRhOiBbXSxcbiAgICBjaGVja2VkS2V5czogW10sXG4gICAgc2VsZWN0ZWRLZXlzOiBbXSxcbiAgICBleHBhbmRlZEtleXM6IFtdLFxuICAgIGRlZmF1bHRFeHBhbmRlZEtleXM6IFtdLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrOiB0cnVlLFxuICAgIHNob3dFeHBhbmRBbGw6IGZhbHNlLFxuICAgIHRpdGxlOiB1bmRlZmluZWQsXG4gICAgaGVhZGVyUmlnaHQ6IHVuZGVmaW5lZCxcbiAgICBzaG93T3JkZXJpbmdBcnJvd3M6IGZhbHNlLFxuICAgIGhhbmRsZUV4cGFuZGVkS2V5c01hbnVhbGx5OiBmYWxzZSxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc3QgZXhwYW5kZWRLZXlzID0gcHJvcHMuZGVmYXVsdEV4cGFuZEFsbFxuICAgICAgPyB0aGlzLmdldEFsbFBhcmVudElkcyhwcm9wcy50cmVlRGF0YSwgcHJvcHMpIDogcHJvcHMuZXhwYW5kZWRLZXlzO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGV4cGFuZGVkS2V5cyxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLmhhbmRsZUV4cGFuZGVkS2V5c01hbnVhbGx5ICYmXG4gICAgICAobmV4dFByb3BzLmV4cGFuZGVkS2V5cyAhPT0gdGhpcy5wcm9wcy5leHBhbmRlZEtleXMpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZXhwYW5kZWRLZXlzOiBuZXh0UHJvcHMuZXhwYW5kZWRLZXlzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25Db250YWluZXJDbGljayA9IChlKSA9PiB7XG4gICAgY29uc3QgeyBvblNlbGVjdCwgZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrIH0gPSB0aGlzLnByb3BzO1xuICAgIC8vIGNsaWNraW5nIG91dHNpZGUgaXRlbVxuICAgIGlmIChkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2tcbiAgICAgICYmIGUudGFyZ2V0LnRhZ05hbWUgIT09ICdTUEFOJ1xuICAgICAgJiYgKCF0aGlzLmhlYWRlciB8fCAodGhpcy5oZWFkZXIgJiYgIXRoaXMuaGVhZGVyLmNvbnRhaW5zKGUudGFyZ2V0KSkpXG4gICAgICAmJiBvblNlbGVjdCkge1xuICAgICAgb25TZWxlY3QoW10pO1xuICAgIH1cbiAgfTtcblxuICBvbkV4cGFuZCA9IChleHBhbmRlZEtleXMpID0+IHtcbiAgICBjb25zdCB7IG9uRXhwYW5kLCBoYW5kbGVFeHBhbmRlZEtleXNNYW51YWxseSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWhhbmRsZUV4cGFuZGVkS2V5c01hbnVhbGx5KSByZXR1cm47XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZGVkS2V5cyB9LCAoKSA9PiB7XG4gICAgICBpZiAob25FeHBhbmQpIG9uRXhwYW5kKHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkRyYWdEcm9wID0gKGUpID0+IHtcbiAgICBjb25zdCB7IG9uRHJhZ0Ryb3AsIGlzRHJhZ0Ryb3BMZWdhbCwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFvbkRyYWdEcm9wKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdvbkRyYWdEcm9wIGNhbGxiYWNrIGlzIG5vdCBkZWZpbmVkJyk7XG5cbiAgICAvLyBDYWxsaW5nIGlzRHJhZ0Ryb3BMZWdhbCBjYWxsYmFjayB0byBlbnN1cmUgdGhhdCB0aGlzIG1vdmUgY2FuIGJlIGRvbmVcbiAgICBpZiAoaXNEcmFnRHJvcExlZ2FsICYmICFpc0RyYWdEcm9wTGVnYWwodHJlZURhdGEsIGUpKSByZXR1cm47XG5cbiAgICBjb25zdCBuZXdEYXRhID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLmdldFRyZWVJdGVtKGUuZHJhZ05vZGUucHJvcHMuZXZlbnRLZXkpLCBlKTtcbiAgICBvbkRyYWdEcm9wKG5ld0RhdGEsIGUpO1xuICB9O1xuXG4gIG9uRXhwYW5kQWxsQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkV4cGFuZCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBleHBhbmRlZEtleXMgPSB0aGlzLmlzQWxsRXhwYW5kZWQoKSA/IFtdIDogdGhpcy5nZXRBbGxQYXJlbnRJZHMoKTtcbiAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kZWRLZXlzIH0sICgpID0+IHtcbiAgICAgIGlmIChvbkV4cGFuZCkgb25FeHBhbmQodGhpcy5zdGF0ZS5leHBhbmRlZEtleXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIGdldFNlbGVjdGVkUGFyZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc2VsZWN0ZWRLZXlzLCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpZCA9IHNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCB0cmVlRGF0YSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHBhcmVudCB8fCB0cmVlRGF0YTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB1cGRhdGVkIHRyZWUgYWZ0ZXIgRHJhZyBuJyBkcm9wIGV2ZW50XG4gICAqIEBwYXJhbSBkcmFnSXRlbSAtIGRyYWdnZWQgaXRlbVxuICAgKiBAcGFyYW0gZHJhZ0V2ZW50IC0gZXZlbnRcbiAgICogQHBhcmFtIGFycmF5IC0gdXNlZCByZWN1cnNpdmVseVxuICAgKiBAcGFyYW0gcGFyZW50RmlsdGVyZWQgLSB1c2VkIHJlY3Vyc2l2ZWx5XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0VXBkYXRlZFRyZWUgPSAoZHJhZ0l0ZW0sIGRyYWdFdmVudCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCBwYXJlbnRGaWx0ZXJlZCA9IGZhbHNlKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwQ2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBkcm9wVG9HYXAsIG5vZGUgfSA9IGRyYWdFdmVudDtcbiAgICBjb25zdCBkcm9wSWQgPSBub2RlICYmIG5vZGUucHJvcHMuZXZlbnRLZXk7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgbGV0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcblxuICAgIGNvbnN0IGFkZEl0ZW1Ub0FycmF5ID0gKGl0ZW1zKSA9PiB7XG4gICAgICBjb25zdCBkcm9wSW5kZXggPSBpdGVtcy5maW5kSW5kZXgoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gPT09IGRyb3BJZCk7XG4gICAgICBpZiAoZHJvcEluZGV4ID4gLTEpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICBjb25zdCBuZXdDaGlsZHJlbiA9IGl0ZW1zLnNsaWNlKCk7XG4gICAgICAgIG5ld0NoaWxkcmVuLnNwbGljZShkcm9wSW5kZXgsIDAsIGRyYWdJdGVtKTtcbiAgICAgICAgcmV0dXJuIG5ld0NoaWxkcmVuO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH07XG4gICAgaWYgKCFwYXJlbnRGaWx0ZXJlZCAmJiBkcmFnSXRlbSkge1xuICAgICAgbmV3SXRlbXMgPSB0aGlzLnJlbW92ZUl0ZW0obmV3SXRlbXMsIGRyYWdJdGVtW2RhdGFMb29rVXBLZXldKTtcbiAgICB9XG4gICAgaWYgKGRyb3BUb0dhcCkge1xuICAgICAgbmV3SXRlbXMgPSBhZGRJdGVtVG9BcnJheShuZXdJdGVtcyk7XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dO1xuXG4gICAgICAgIGlmICghZHJvcFRvR2FwICYmIGRyb3BJZCA9PT0gaXRlbVtkYXRhTG9va1VwS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgaWYgKCFjaGlsZHJlbikgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dID0gW107XG4gICAgICAgICAgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLnB1c2goZHJhZ0l0ZW0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkcmVuICYmIGRyb3BUb0dhcCkge1xuICAgICAgICAgIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSA9IGFkZEl0ZW1Ub0FycmF5KGNoaWxkcmVuKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvdW5kICYmIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRVcGRhdGVkVHJlZShkcmFnSXRlbSwgZHJhZ0V2ZW50LCBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0sIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB0cmVlIGl0ZW0gYnkgSURcbiAgICogQHBhcmFtIGlkXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gcmV0dXJuUGFyZW50IC0gcmV0dXJuIGl0ZW0ncyBwYXJlbnQgaW5zdGVhZCBvZiB0aGUgaXRlbVxuICAgKiBAcGFyYW0gcGFyZW50IC0gcGFyZW50IGl0ZW0gKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqIEByZXR1cm5zIHt7fX1cbiAgICovXG4gIGdldFRyZWVJdGVtID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHJldHVyblBhcmVudCA9IGZhbHNlLCBwYXJlbnQgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwQ2hpbGRyZW4sIGRhdGFMb29rVXBLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGZvdW5kID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1bZGF0YUxvb2tVcEtleV0gPT09IGlkKTtcblxuICAgIGlmIChmb3VuZCAmJiByZXR1cm5QYXJlbnQpIGZvdW5kID0gcGFyZW50O1xuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLCByZXR1cm5QYXJlbnQsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFsbCBwYXJlbnQgSURzIGluIHRoZSB0cmVlXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKi9cbiAgZ2V0QWxsUGFyZW50SWRzID0gKGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgcHJvcHMgPSB0aGlzLnByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwQ2hpbGRyZW4gfSA9IHByb3BzO1xuICAgIGNvbnN0IGNiID0gKGFjYywgaXRlbSkgPT4ge1xuICAgICAgbGV0IHRvdGFsID0gYWNjO1xuICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0ubGVuZ3RoID4gMCkge1xuICAgICAgICB0b3RhbCA9IGFjYy5jb25jYXQoaXRlbVtkYXRhTG9va1VwS2V5XSk7XG4gICAgICAgIHJldHVybiBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0ucmVkdWNlKGNiLCB0b3RhbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG90YWw7XG4gICAgfTtcbiAgICByZXR1cm4gYXJyYXkucmVkdWNlKGNiLCBbXSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCBhbGwgcGFyZW50IElEcyBhcmUgZXhwYW5kZWRcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0FsbEV4cGFuZGVkID0gKCkgPT5cbiAgICB0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cyAmJiB0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5sZW5ndGggPT09IHRoaXMuZ2V0QWxsUGFyZW50SWRzKCkubGVuZ3RoO1xuXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBpdGVtIGZyb20gZ2l2ZW4gYXJyYXlcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcmV0dXJucyBhcnJheSBvZiBmaWx0ZXJlZCBpdGVtc1xuICAgKi9cbiAgcmVtb3ZlSXRlbSA9IChhcnJheSwgaWQpID0+IHtcbiAgICBjb25zdCB7IGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBDaGlsZHJlbiB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbmV3SXRlbXMgPSBhcnJheS5zbGljZSgpO1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGNvbnN0IGlzUGFyZW50ID0gYXJyID0+IGFyci5maW5kKGNoaWxkID0+IGNoaWxkW2RhdGFMb29rVXBLZXldID09PSBpZCk7XG4gICAgY29uc3QgZmlsdGVyQ2hpbGQgPSBhcnIgPT4gYXJyLmZpbHRlcihjaGlsZCA9PiBjaGlsZFtkYXRhTG9va1VwS2V5XSAhPT0gaWQpO1xuXG4gICAgaWYgKGlzUGFyZW50KG5ld0l0ZW1zKSkge1xuICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgbmV3SXRlbXMgPSBmaWx0ZXJDaGlsZChuZXdJdGVtcyk7XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XG5cbiAgICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiBpc1BhcmVudChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pKSB7XG4gICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSA9IGZpbHRlckNoaWxkKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMucmVtb3ZlSXRlbShpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0sIGlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWZvdW5kKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xuICB9O1xuXG4gIC8qIGhhc0NoaWxkcmVuIC0gZnVuY3Rpb24gKi9cbiAgaGFzQ2hpbGRyZW4gPSBkYXRhT2JqZWN0ID0+ICgoZGF0YU9iamVjdFt0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbl1cbiAgICAmJiBkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXS5sZW5ndGggPj0gMVxuICApKTtcblxuICAvKiByZW5kZXJOb2RlcyAtIGZ1bmN0aW9uICovXG4gIHJlbmRlck5vZGVzKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBWYWx1ZSwgZGF0YUxvb2tVcExlYWZWYWx1ZSwgZGF0YUxvb2tVcENoaWxkcmVuLCBpY29uQ2xhc3MsIGRpc2FibGVkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNoZWNrQ2hpbGRyZW4gPSB0aGlzLmhhc0NoaWxkcmVuO1xuXG4gICAgLy8gUmVjdXJzaXZlIGZ1bmN0aW9uIGZvciBjb2xsZWN0aW5nIG5vZGVzOlxuICAgIGNvbnN0IG1vdW50Tm9kZXMgPSAobm9kZUxpc3QpID0+IHtcbiAgICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICAgIG5vZGVMaXN0LmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKCFub2RlW2RhdGFMb29rVXBLZXldKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vIExlYWYgbm9kZVxuICAgICAgICBpZiAoIWNoZWNrQ2hpbGRyZW4obm9kZSkpIHtcbiAgICAgICAgICBjb25zdCB0aXRsZSA9IG5vZGVbZGF0YUxvb2tVcExlYWZWYWx1ZV0gfHwgbm9kZVtkYXRhTG9va1VwVmFsdWVdO1xuICAgICAgICAgIGxpc3QucHVzaCggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jdGlvbi1wYXJlbi1uZXdsaW5lXG4gICAgICAgICAgICA8VHJlZU5vZGVcbiAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgICAgICBrZXk9e25vZGVbZGF0YUxvb2tVcEtleV19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7aWNvbkNsYXNzfSBsZWFmLW5vZGVgfVxuICAgICAgICAgICAgICBpY29uPXs8VHJlZUNoZWNrYm94IGRpc2FibGVkPXtkaXNhYmxlZH0gLz59XG4gICAgICAgICAgICAvPik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUGFyZW50IG5vZGVcbiAgICAgICAgICBsaXN0LnB1c2goIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuY3Rpb24tcGFyZW4tbmV3bGluZVxuICAgICAgICAgICAgPFRyZWVOb2RlXG4gICAgICAgICAgICAgIHRpdGxlPXtub2RlW2RhdGFMb29rVXBWYWx1ZV19XG4gICAgICAgICAgICAgIGtleT17bm9kZVtkYXRhTG9va1VwS2V5XX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtpY29uQ2xhc3N9IHBhcmVudC1ub2RlYH1cbiAgICAgICAgICAgICAgaWNvbj17PFRyZWVDaGVja2JveCBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bW91bnROb2Rlcyhub2RlW2RhdGFMb29rVXBDaGlsZHJlbl0pfVxuICAgICAgICAgICAgPC9UcmVlTm9kZT4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfTtcbiAgICByZXR1cm4gbW91bnROb2Rlcyh0aGlzLnByb3BzLnRyZWVEYXRhKTtcbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5yZW5kZXJOb2RlcygpO1xuICAgIGNvbnN0IHJlc29sdmVkUHJvcHMgPSB7fTtcbiAgICBjb25zdCB7XG4gICAgICB0cmVlSWQsIGNsYXNzTmFtZSwgY2hlY2tlZEtleXMsIG9uU2VsZWN0LCBvbkNoZWNrLCBzaG93SWNvbiwgY2hlY2thYmxlLCBzZWxlY3RhYmxlLFxuICAgICAgZHJhZ2dhYmxlLCBkaXNhYmxlZCwgc2VsZWN0ZWRLZXlzLCBzaG93RXhwYW5kQWxsLCB0aXRsZSwgaGVhZGVyUmlnaHQsIHNob3dPcmRlcmluZ0Fycm93cyxcbiAgICAgIG9uT3JkZXJCdXR0b25DbGljaywgZGVmYXVsdEV4cGFuZGVkS2V5cywgaGFuZGxlRXhwYW5kZWRLZXlzTWFudWFsbHksXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2xzTmFtZSA9IGNsYXNzTmFtZSA/IGAke2NsYXNzTmFtZX0gb2MtcmVhY3QtdHJlZWAgOiAnb2MtcmVhY3QtdHJlZSc7XG4gICAgY29uc3QgZXhwYW5kQWxsQ2xzTmFtZSA9IHRoaXMuaXNBbGxFeHBhbmRlZCgpID8gJ2V4cGFuZC1hbGwnIDogJyc7XG5cbiAgICAvLyBXZSBkb24ndCBwYXNzIGV4cGFuZGVkS2V5cyB0byByYy10cmVlIHVubGVzcyB3ZSB3YW50IHRvIGhhbmRsZSBleHBhbmRlZEtleXNcbiAgICAvLyBieSBvdXJzZWx2ZXNcbiAgICBpZiAoaGFuZGxlRXhwYW5kZWRLZXlzTWFudWFsbHkpIHJlc29sdmVkUHJvcHMuZXhwYW5kZWRLZXlzID0gdGhpcy5zdGF0ZS5leHBhbmRlZEtleXM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICA8ZGl2IGlkPVwidHJlZS12aWV3LWNvbnRhaW5lclwiIGNsYXNzTmFtZT17Y2xzTmFtZX0gb25DbGljaz17dGhpcy5vbkNvbnRhaW5lckNsaWNrfT5cbiAgICAgICAgeyhzaG93RXhwYW5kQWxsIHx8IHRpdGxlIHx8IGhlYWRlclJpZ2h0IHx8IHNob3dPcmRlcmluZ0Fycm93cylcbiAgICAgICAgJiYgKFxuICAgICAgICAgIDxoZWFkZXJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInRyZWUtaGVhZGVyXCJcbiAgICAgICAgICAgIHJlZj17KGVsKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaGVhZGVyID0gZWw7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLWxlZnRcIj5cbiAgICAgICAgICAgICAge3Nob3dFeHBhbmRBbGwgJiYgISFub2Rlcy5sZW5ndGhcbiAgICAgICAgICAgICAgJiYgKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25FeHBhbmRBbGxDbGlja31cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGV4cGFuZC1hbGwtdG9nZ2xlICR7ZXhwYW5kQWxsQ2xzTmFtZX1gfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge3RpdGxlICYmIDxoMj57dGl0bGV9PC9oMj59XG4gICAgICAgICAgICAgIHtzaG93T3JkZXJpbmdBcnJvd3NcbiAgICAgICAgICAgICAgJiYgKFxuICAgICAgICAgICAgICAgIDxPcmRlcmluZ0Fycm93c1xuICAgICAgICAgICAgICAgICAgb25PcmRlckJ1dHRvbkNsaWNrPXtvbk9yZGVyQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZFBhcmVudD17dGhpcy5nZXRTZWxlY3RlZFBhcmVudCgpfVxuICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge2hlYWRlclJpZ2h0ICYmIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXJpZ2h0XCI+e2hlYWRlclJpZ2h0fTwvZGl2Pn1cbiAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgKX1cbiAgICAgICAgPFBlcmZlY3RTY3JvbGxCYXI+XG4gICAgICAgICAgeyEhbm9kZXMubGVuZ3RoXG4gICAgICAgICAgJiYgKFxuICAgICAgICAgICAgPFRyZWVcbiAgICAgICAgICAgICAgaWQ9e3RyZWVJZH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgICAgICAgIGNoZWNrZWRLZXlzPXtjaGVja2VkS2V5c31cbiAgICAgICAgICAgICAgc2VsZWN0ZWRLZXlzPXtzZWxlY3RlZEtleXN9XG4gICAgICAgICAgICAgIGRlZmF1bHRFeHBhbmRlZEtleXM9e2RlZmF1bHRFeHBhbmRlZEtleXN9XG4gICAgICAgICAgICAgIG9uRXhwYW5kPXt0aGlzLm9uRXhwYW5kfVxuICAgICAgICAgICAgICBvblNlbGVjdD17b25TZWxlY3R9XG4gICAgICAgICAgICAgIG9uQ2hlY2s9e29uQ2hlY2t9XG4gICAgICAgICAgICAgIG9uRHJvcD17dGhpcy5vbkRyYWdEcm9wfVxuICAgICAgICAgICAgICBjaGVja2FibGU9e2NoZWNrYWJsZX1cbiAgICAgICAgICAgICAgc2VsZWN0YWJsZT17c2VsZWN0YWJsZX1cbiAgICAgICAgICAgICAgZHJhZ2dhYmxlPXtkcmFnZ2FibGV9XG4gICAgICAgICAgICAgIHNob3dMaW5lPXtmYWxzZX1cbiAgICAgICAgICAgICAgc2hvd0ljb249e3Nob3dJY29ufVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgIHsuLi5yZXNvbHZlZFByb3BzfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bm9kZXN9XG4gICAgICAgICAgICA8L1RyZWU+XG4gICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgPC9QZXJmZWN0U2Nyb2xsQmFyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19