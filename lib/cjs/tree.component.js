'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp, _initialiseProps;

// Override defaults rc-tree styles


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _rcTree = require('rc-tree');

var _rcTree2 = _interopRequireDefault(_rcTree);

require('rc-tree/assets/index.css');

require('./oc-tree-styles.scss');

var _treeCheckbox = require('./tree-checkbox.component');

var _treeCheckbox2 = _interopRequireDefault(_treeCheckbox);

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
      _react2.default.createElement(
        'div',
        { id: 'tree-view-container', className: clsName, onClick: this.onContainerClick },
        (showExpandAll || title || headerRight) && _react2.default.createElement(
          'header',
          {
            className: 'title-container',
            ref: function ref(el) {
              _this2.header = el;
            }
          },
          showExpandAll && _react2.default.createElement('button', { onClick: this.onExpandAllClick, className: 'expand-all-toggle ' + expandAllClsName }),
          title && _react2.default.createElement(
            'h2',
            null,
            title
          ),
          headerRight && _react2.default.createElement(
            'div',
            { className: 'header-right' },
            headerRight
          )
        ),
        !!nodes.length && _react2.default.createElement(
          _rcTree2.default,
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
}(_react2.default.PureComponent), _class.defaultProps = {
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
    return _this3.state.expandedKeys && _this3.state.expandedKeys.length === _this3.getAllParentIds().length;
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
exports.default = OCTreeView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiT0NUcmVlVmlldyIsInByb3BzIiwiZXhwYW5kZWRLZXlzIiwiZGVmYXVsdEV4cGFuZEFsbCIsImdldEFsbFBhcmVudElkcyIsInRyZWVEYXRhIiwic3RhdGUiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJyZW5kZXJOb2RlcyIsImRhdGFMb29rVXBLZXkiLCJkYXRhTG9va1VwVmFsdWUiLCJkYXRhTG9va1VwQ2hpbGRyZW4iLCJpY29uQ2xhc3MiLCJkaXNhYmxlZCIsImNoZWNrQ2hpbGRyZW4iLCJoYXNDaGlsZHJlbiIsIm1vdW50Tm9kZXMiLCJub2RlTGlzdCIsImxpc3QiLCJmb3JFYWNoIiwibm9kZSIsInB1c2giLCJyZW5kZXIiLCJub2RlcyIsInRyZWVJZCIsImNsYXNzTmFtZSIsImNoZWNrZWRLZXlzIiwib25FeHBhbmQiLCJvblNlbGVjdCIsIm9uQ2hlY2siLCJzaG93TGluZSIsInNob3dJY29uIiwiY2hlY2thYmxlIiwic2VsZWN0YWJsZSIsImRyYWdnYWJsZSIsInNlbGVjdGVkS2V5cyIsInNob3dFeHBhbmRBbGwiLCJ0aXRsZSIsImhlYWRlclJpZ2h0IiwiY2xzTmFtZSIsImV4cGFuZEFsbENsc05hbWUiLCJpc0FsbEV4cGFuZGVkIiwib25Db250YWluZXJDbGljayIsImVsIiwiaGVhZGVyIiwib25FeHBhbmRBbGxDbGljayIsImxlbmd0aCIsIm9uRHJhZ0Ryb3AiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwidW5kZWZpbmVkIiwiaXNEcmFnRHJvcExlZ2FsIiwiZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrIiwiZSIsInRhcmdldCIsInRhZ05hbWUiLCJjb250YWlucyIsIlR5cGVFcnJvciIsIm5ld0RhdGEiLCJnZXRVcGRhdGVkVHJlZSIsImdldFRyZWVJdGVtIiwiZHJhZ05vZGUiLCJldmVudEtleSIsImRyYWdJdGVtIiwiZHJhZ0V2ZW50IiwiYXJyYXkiLCJwYXJlbnRGaWx0ZXJlZCIsImRyb3BUb0dhcCIsImRyb3BJZCIsImZvdW5kIiwibmV3SXRlbXMiLCJzbGljZSIsImFkZEl0ZW1Ub0FycmF5IiwiaXRlbXMiLCJkcm9wSW5kZXgiLCJmaW5kSW5kZXgiLCJjaGlsZCIsIm5ld0NoaWxkcmVuIiwic3BsaWNlIiwicmVtb3ZlSXRlbSIsImkiLCJpdGVtIiwiY2hpbGRyZW4iLCJpZCIsImZpbmQiLCJjYiIsImFjYyIsInRvdGFsIiwiY29uY2F0IiwicmVkdWNlIiwiaXNQYXJlbnQiLCJhcnIiLCJmaWx0ZXJDaGlsZCIsImZpbHRlciIsImRhdGFPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFLQTs7O0FBTEE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBR0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7O0FBNkRuQixzQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQiwrQkFEaUI7O0FBQUE7O0FBRWpCLFFBQU1DLGVBQWVELE1BQU1FLGdCQUFOLEdBQ25CLE1BQUtDLGVBQUwsQ0FBcUJILE1BQU1JLFFBQTNCLEVBQXFDSixLQUFyQyxDQURtQixHQUMyQkEsTUFBTUMsWUFEdEQ7O0FBR0EsVUFBS0ksS0FBTCxHQUFhO0FBQ1hKO0FBRFcsS0FBYjtBQUxpQjtBQVFsQjs7dUJBRURLLHlCLHNDQUEwQkMsUyxFQUFXO0FBQ25DLFFBQUlBLFVBQVVOLFlBQVYsS0FBMkIsS0FBS0QsS0FBTCxDQUFXQyxZQUExQyxFQUF3RDtBQUN0RCxXQUFLTyxRQUFMLENBQWM7QUFDWlAsc0JBQWNNLFVBQVVOO0FBRFosT0FBZDtBQUdEO0FBQ0YsRztBQTRCRDs7Ozs7Ozs7OztBQXNEQTs7Ozs7Ozs7QUFtQkE7Ozs7OztBQWlCQTs7Ozs7O0FBUUE7Ozs7Ozs7O0FBb0NBOzs7QUFLQTt1QkFDQVEsVywwQkFBYztBQUFBLGlCQUdSLEtBQUtULEtBSEc7QUFBQSxRQUVWVSxhQUZVLFVBRVZBLGFBRlU7QUFB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QUNsRTBELGtCQUFRLElBQVI7QUFDQVksZUFBS3RFLGtCQUFMLElBQTJCaUYsWUFBWVgsS0FBS3RFLGtCQUFMLENBQVosQ0FBM0I7QUFDQTtBQUNEO0FBQ0QsWUFBSXNFLEtBQUt0RSxrQkFBTCxLQUE0QixDQUFDMEQsS0FBakMsRUFBd0M7QUFDdENBLGtCQUFRLE9BQUtVLFVBQUwsQ0FBZ0JFLEtBQUt0RSxrQkFBTCxDQUFoQixFQUEwQ3dFLEVBQTFDLENBQVI7QUFDRDtBQUNGO0FBQ0Y7QUFDRCxRQUFJLENBQUNkLEtBQUwsRUFBWSxPQUFPLEtBQVA7QUFDWixXQUFPQyxRQUFQO0FBQ0QsRzs7T0FHRHZELFcsR0FBYztBQUFBLFdBQWdCK0UsV0FBVyxPQUFLL0YsS0FBTCxDQUFXWSxrQkFBdEIsS0FDekJtRixXQUFXLE9BQUsvRixLQUFMLENBQVdZLGtCQUF0QixFQUEwQ21DLE1BQTFDLElBQW9ELENBRDNDO0FBQUEsRzs7a0JBaFBLaEQsVSIsImZpbGUiOiJ0cmVlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFRyZWUsIHsgVHJlZU5vZGUgfSBmcm9tICdyYy10cmVlJztcbmltcG9ydCAncmMtdHJlZS9hc3NldHMvaW5kZXguY3NzJztcblxuLy8gT3ZlcnJpZGUgZGVmYXVsdHMgcmMtdHJlZSBzdHlsZXNcbmltcG9ydCAnLi9vYy10cmVlLXN0eWxlcy5zY3NzJztcbmltcG9ydCBUcmVlQ2hlY2tib3ggZnJvbSAnLi90cmVlLWNoZWNrYm94LmNvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9DVHJlZVZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB0cmVlSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGljb25DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkV4cGFuZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRHJhZ0Ryb3A6IFByb3BUeXBlcy5mdW5jLFxuICAgIGlzRHJhZ0Ryb3BMZWdhbDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd0xpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dJY29uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjaGVja2FibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRyYWdnYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgIC8vIEN1c3RvbWlzYXRpb24gLS0gZGVmaW5lIHRoZSBkYXRhIGxvb2tVcEtleXMgYW5kIGxvb2tVcFZhbHVlc1xuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcbiAgICBkYXRhTG9va1VwS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRhdGFMb29rVXBWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hlY2tlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIHNlbGVjdGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgZXhwYW5kZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2s6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGhlYWRlclJpZ2h0OiBQcm9wVHlwZXMubm9kZSxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHRyZWVJZDogJ2RlZmF1bHRUcmVlJyxcbiAgICBpY29uQ2xhc3M6ICdjYXJldHMnLFxuICAgIG9uRXhwYW5kOiB1bmRlZmluZWQsXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBvbkNoZWNrOiB1bmRlZmluZWQsXG4gICAgb25EcmFnRHJvcDogdW5kZWZpbmVkLFxuICAgIGlzRHJhZ0Ryb3BMZWdhbDogdW5kZWZpbmVkLFxuICAgIHNob3dMaW5lOiBmYWxzZSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgc2hvd0ljb246IHRydWUsXG4gICAgY2hlY2thYmxlOiBmYWxzZSxcbiAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgIHNlbGVjdGFibGU6IGZhbHNlLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IGZhbHNlLFxuICAgIC8vIEN1c3RvbXNcbiAgICBkYXRhTG9va1VwS2V5OiAna2V5JyxcbiAgICBkYXRhTG9va1VwVmFsdWU6ICdwYXJlbnQnLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogJ2NoaWxkcmVuJyxcbiAgICB0cmVlRGF0YTogW10sXG4gICAgY2hlY2tlZEtleXM6IFtdLFxuICAgIHNlbGVjdGVkS2V5czogW10sXG4gICAgZXhwYW5kZWRLZXlzOiB1bmRlZmluZWQsXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICBkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2s6IHRydWUsXG4gICAgc2hvd0V4cGFuZEFsbDogZmFsc2UsXG4gICAgdGl0bGU6IHVuZGVmaW5lZCxcbiAgICBoZWFkZXJSaWdodDogdW5kZWZpbmVkLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zdCBleHBhbmRlZEtleXMgPSBwcm9wcy5kZWZhdWx0RXhwYW5kQWxsID9cbiAgICAgIHRoaXMuZ2V0QWxsUGFyZW50SWRzKHByb3BzLnRyZWVEYXRhLCBwcm9wcykgOiBwcm9wcy5leHBhbmRlZEtleXM7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZXhwYW5kZWRLZXlzLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmIChuZXh0UHJvcHMuZXhwYW5kZWRLZXlzICE9PSB0aGlzLnByb3BzLmV4cGFuZGVkS2V5cykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGV4cGFuZGVkS2V5czogbmV4dFByb3BzLmV4cGFuZGVkS2V5cyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uQ29udGFpbmVyQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHsgb25TZWxlY3QsIGRlc2VsZWN0T25Db250YWluZXJDbGljayB9ID0gdGhpcy5wcm9wcztcbiAgICAvLyBjbGlja2luZyBvdXRzaWRlIGl0ZW1cbiAgICBpZiAoZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrICYmIGUudGFyZ2V0LnRhZ05hbWUgIT09ICdTUEFOJyAmJiAhdGhpcy5oZWFkZXIuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICBvblNlbGVjdChbXSk7XG4gICAgfVxuICB9O1xuXG4gIG9uRHJhZ0Ryb3AgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHsgb25EcmFnRHJvcCwgaXNEcmFnRHJvcExlZ2FsLCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIW9uRHJhZ0Ryb3ApIHRocm93IG5ldyBUeXBlRXJyb3IoJ29uRHJhZ0Ryb3AgY2FsbGJhY2sgaXMgbm90IGRlZmluZWQnKTtcblxuICAgIC8vIENhbGxpbmcgaXNEcmFnRHJvcExlZ2FsIGNhbGxiYWNrIHRvIGVuc3VyZSB0aGF0IHRoaXMgbW92ZSBjYW4gYmUgZG9uZVxuICAgIGlmIChpc0RyYWdEcm9wTGVnYWwgJiYgIWlzRHJhZ0Ryb3BMZWdhbCh0cmVlRGF0YSwgZSkpIHJldHVybjtcblxuICAgIGNvbnN0IG5ld0RhdGEgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuZ2V0VHJlZUl0ZW0oZS5kcmFnTm9kZS5wcm9wcy5ldmVudEtleSksIGUpO1xuICAgIG9uRHJhZ0Ryb3AobmV3RGF0YSwgZSk7XG4gIH07XG5cbiAgb25FeHBhbmRBbGxDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9uRXhwYW5kIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGV4cGFuZGVkS2V5cyA9IHRoaXMuaXNBbGxFeHBhbmRlZCgpID8gW10gOiB0aGlzLmdldEFsbFBhcmVudElkcygpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmRlZEtleXMgfSwgKCkgPT4ge1xuICAgICAgaWYgKG9uRXhwYW5kKSBvbkV4cGFuZCh0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cyk7XG4gICAgfSk7XG4gIH07XG4gIC8qKlxuICAgKiBSZXR1cm5zIHVwZGF0ZWQgdHJlZSBhZnRlciBEcmFnIG4nIGRyb3AgZXZlbnRcbiAgICogQHBhcmFtIGRyYWdJdGVtIC0gZHJhZ2dlZCBpdGVtXG4gICAqIEBwYXJhbSBkcmFnRXZlbnQgLSBldmVudFxuICAgKiBAcGFyYW0gYXJyYXkgLSB1c2VkIHJlY3Vyc2l2ZWx5XG4gICAqIEBwYXJhbSBwYXJlbnRGaWx0ZXJlZCAtIHVzZWQgcmVjdXJzaXZlbHlcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRVcGRhdGVkVHJlZSA9IChkcmFnSXRlbSwgZHJhZ0V2ZW50LCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHBhcmVudEZpbHRlcmVkID0gZmFsc2UpID0+IHtcbiAgICBjb25zdCB7IGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBDaGlsZHJlbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGRyb3BUb0dhcCwgbm9kZSB9ID0gZHJhZ0V2ZW50O1xuICAgIGNvbnN0IGRyb3BJZCA9IG5vZGUgJiYgbm9kZS5wcm9wcy5ldmVudEtleTtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICBsZXQgbmV3SXRlbXMgPSBhcnJheS5zbGljZSgpO1xuXG4gICAgY29uc3QgYWRkSXRlbVRvQXJyYXkgPSAoaXRlbXMpID0+IHtcbiAgICAgIGNvbnN0IGRyb3BJbmRleCA9IGl0ZW1zLmZpbmRJbmRleChjaGlsZCA9PiBjaGlsZFtkYXRhTG9va1VwS2V5XSA9PT0gZHJvcElkKTtcbiAgICAgIGlmIChkcm9wSW5kZXggPiAtMSkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIGNvbnN0IG5ld0NoaWxkcmVuID0gaXRlbXMuc2xpY2UoKTtcbiAgICAgICAgbmV3Q2hpbGRyZW4uc3BsaWNlKGRyb3BJbmRleCwgMCwgZHJhZ0l0ZW0pO1xuICAgICAgICByZXR1cm4gbmV3Q2hpbGRyZW47XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlbXM7XG4gICAgfTtcbiAgICBpZiAoIXBhcmVudEZpbHRlcmVkICYmIGRyYWdJdGVtKSB7XG4gICAgICBuZXdJdGVtcyA9IHRoaXMucmVtb3ZlSXRlbShuZXdJdGVtcywgZHJhZ0l0ZW1bZGF0YUxvb2tVcEtleV0pO1xuICAgIH1cbiAgICBpZiAoZHJvcFRvR2FwKSB7XG4gICAgICBuZXdJdGVtcyA9IGFkZEl0ZW1Ub0FycmF5KG5ld0l0ZW1zKTtcbiAgICB9XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl07XG5cbiAgICAgICAgaWYgKCFkcm9wVG9HYXAgJiYgZHJvcElkID09PSBpdGVtW2RhdGFMb29rVXBLZXldICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoIWNoaWxkcmVuKSBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gPSBbXTtcbiAgICAgICAgICBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0ucHVzaChkcmFnSXRlbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGRyZW4gJiYgZHJvcFRvR2FwKSB7XG4gICAgICAgICAgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dID0gYWRkSXRlbVRvQXJyYXkoY2hpbGRyZW4pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm91bmQgJiYgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKGRyYWdJdGVtLCBkcmFnRXZlbnQsIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhIHRyZWUgaXRlbSBieSBJRFxuICAgKiBAcGFyYW0gaWRcbiAgICogQHBhcmFtIGFycmF5IC0gdXNlZCByZWN1cnNpdmVseVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0VHJlZUl0ZW0gPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YUxvb2tVcENoaWxkcmVuLCBkYXRhTG9va1VwS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBmb3VuZCA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2RhdGFMb29rVXBLZXldID09PSBpZCk7XG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmb3VuZDtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgcGFyZW50IElEcyBpbiB0aGUgdHJlZVxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICovXG4gIGdldEFsbFBhcmVudElkcyA9IChhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHByb3BzID0gdGhpcy5wcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcENoaWxkcmVuIH0gPSBwcm9wcztcbiAgICBjb25zdCBjYiA9IChhY2MsIGl0ZW0pID0+IHtcbiAgICAgIGxldCB0b3RhbCA9IGFjYztcbiAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdG90YWwgPSBhY2MuY29uY2F0KGl0ZW1bZGF0YUxvb2tVcEtleV0pO1xuICAgICAgICByZXR1cm4gaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLnJlZHVjZShjYiwgdG90YWwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH07XG4gICAgcmV0dXJuIGFycmF5LnJlZHVjZShjYiwgW10pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgYWxsIHBhcmVudCBJRHMgYXJlIGV4cGFuZGVkXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNBbGxFeHBhbmRlZCA9ICgpID0+XG4gICAgdGhpcy5zdGF0ZS5leHBhbmRlZEtleXMgJiYgdGhpcy5zdGF0ZS5leHBhbmRlZEtleXMubGVuZ3RoID09PSB0aGlzLmdldEFsbFBhcmVudElkcygpLmxlbmd0aDtcblxuXG4gIC8qKlxuICAgKiBSZW1vdmUgaXRlbSBmcm9tIGdpdmVuIGFycmF5XG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gaWRcbiAgICogQHJldHVybnMgYXJyYXkgb2YgZmlsdGVyZWQgaXRlbXNcbiAgICovXG4gIHJlbW92ZUl0ZW0gPSAoYXJyYXksIGlkKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwQ2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICBjb25zdCBpc1BhcmVudCA9IGFyciA9PiBhcnIuZmluZChjaGlsZCA9PiBjaGlsZFtkYXRhTG9va1VwS2V5XSA9PT0gaWQpO1xuICAgIGNvbnN0IGZpbHRlckNoaWxkID0gYXJyID0+IGFyci5maWx0ZXIoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gIT09IGlkKTtcblxuICAgIGlmIChpc1BhcmVudChuZXdJdGVtcykpIHtcbiAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgIG5ld0l0ZW1zID0gZmlsdGVyQ2hpbGQobmV3SXRlbXMpO1xuICAgIH1cblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IG5ld0l0ZW1zW2ldO1xuXG4gICAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgaXNQYXJlbnQoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKSkge1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gPSBmaWx0ZXJDaGlsZChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLnJlbW92ZUl0ZW0oaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLCBpZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfTtcblxuICAvKiBoYXNDaGlsZHJlbiAtIGZ1bmN0aW9uICovXG4gIGhhc0NoaWxkcmVuID0gZGF0YU9iamVjdCA9PiAoKGRhdGFPYmplY3RbdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW5dXG4gICAgJiYgZGF0YU9iamVjdFt0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbl0ubGVuZ3RoID49IDFcbiAgKSk7XG5cbiAgLyogcmVuZGVyTm9kZXMgLSBmdW5jdGlvbiAqL1xuICByZW5kZXJOb2RlcygpIHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwVmFsdWUsIGRhdGFMb29rVXBDaGlsZHJlbiwgaWNvbkNsYXNzLCBkaXNhYmxlZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjaGVja0NoaWxkcmVuID0gdGhpcy5oYXNDaGlsZHJlbjtcblxuICAgIC8vIFJlY3Vyc2l2ZSBmdW5jdGlvbiBmb3IgY29sbGVjdGluZyBub2RlczpcbiAgICBjb25zdCBtb3VudE5vZGVzID0gKG5vZGVMaXN0KSA9PiB7XG4gICAgICBjb25zdCBsaXN0ID0gW107XG4gICAgICBub2RlTGlzdC5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIGlmICghbm9kZVtkYXRhTG9va1VwS2V5XSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyBMZWFmIG5vZGVcbiAgICAgICAgaWYgKCFjaGVja0NoaWxkcmVuKG5vZGUpKSB7XG4gICAgICAgICAgbGlzdC5wdXNoKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcbiAgICAgICAgICAgIDxUcmVlTm9kZVxuICAgICAgICAgICAgICB0aXRsZT17bm9kZVtkYXRhTG9va1VwVmFsdWVdfVxuICAgICAgICAgICAgICBrZXk9e25vZGVbZGF0YUxvb2tVcEtleV19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7aWNvbkNsYXNzfSBsZWFmLW5vZGVgfVxuICAgICAgICAgICAgICBpY29uPXs8VHJlZUNoZWNrYm94IGRpc2FibGVkPXtkaXNhYmxlZH0gLz59XG4gICAgICAgICAgICAvPik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUGFyZW50IG5vZGVcbiAgICAgICAgICBsaXN0LnB1c2goIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuY3Rpb24tcGFyZW4tbmV3bGluZVxuICAgICAgICAgICAgPFRyZWVOb2RlXG4gICAgICAgICAgICAgIHRpdGxlPXtub2RlW2RhdGFMb29rVXBWYWx1ZV19XG4gICAgICAgICAgICAgIGtleT17bm9kZVtkYXRhTG9va1VwS2V5XX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtpY29uQ2xhc3N9IHBhcmVudC1ub2RlYH1cbiAgICAgICAgICAgICAgaWNvbj17PFRyZWVDaGVja2JveCBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bW91bnROb2Rlcyhub2RlW2RhdGFMb29rVXBDaGlsZHJlbl0pfVxuICAgICAgICAgICAgPC9UcmVlTm9kZT4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfTtcbiAgICByZXR1cm4gbW91bnROb2Rlcyh0aGlzLnByb3BzLnRyZWVEYXRhKTtcbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5yZW5kZXJOb2RlcygpO1xuICAgIGNvbnN0IHtcbiAgICAgIHRyZWVJZCwgY2xhc3NOYW1lLCBjaGVja2VkS2V5cywgb25FeHBhbmQsIG9uU2VsZWN0LCBvbkNoZWNrLCBzaG93TGluZSwgc2hvd0ljb24sXG4gICAgICBjaGVja2FibGUsIHNlbGVjdGFibGUsIGRyYWdnYWJsZSwgZGlzYWJsZWQsIHNlbGVjdGVkS2V5cywgc2hvd0V4cGFuZEFsbCwgdGl0bGUsIGhlYWRlclJpZ2h0LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNsc05hbWUgPSBjbGFzc05hbWUgPyBgJHtjbGFzc05hbWV9IG9jLXJlYWN0LXRyZWVgIDogJ29jLXJlYWN0LXRyZWUnO1xuICAgIGNvbnN0IGV4cGFuZEFsbENsc05hbWUgPSB0aGlzLmlzQWxsRXhwYW5kZWQoKSA/ICdleHBhbmQtYWxsJyA6ICcnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgPGRpdiBpZD1cInRyZWUtdmlldy1jb250YWluZXJcIiBjbGFzc05hbWU9e2Nsc05hbWV9IG9uQ2xpY2s9e3RoaXMub25Db250YWluZXJDbGlja30+XG5cbiAgICAgICAgeyhzaG93RXhwYW5kQWxsIHx8IHRpdGxlIHx8IGhlYWRlclJpZ2h0KSAmJlxuICAgICAgICA8aGVhZGVyXG4gICAgICAgICAgY2xhc3NOYW1lPVwidGl0bGUtY29udGFpbmVyXCJcbiAgICAgICAgICByZWY9eyhlbCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSBlbDtcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAge3Nob3dFeHBhbmRBbGwgJiZcbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMub25FeHBhbmRBbGxDbGlja30gY2xhc3NOYW1lPXtgZXhwYW5kLWFsbC10b2dnbGUgJHtleHBhbmRBbGxDbHNOYW1lfWB9IC8+fVxuICAgICAgICAgIHt0aXRsZSAmJiA8aDI+e3RpdGxlfTwvaDI+fVxuICAgICAgICAgIHtoZWFkZXJSaWdodCAmJiA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci1yaWdodFwiPntoZWFkZXJSaWdodH08L2Rpdj59XG4gICAgICAgIDwvaGVhZGVyPn1cblxuICAgICAgICB7ISFub2Rlcy5sZW5ndGggJiZcbiAgICAgICAgPFRyZWVcbiAgICAgICAgICBpZD17dHJlZUlkfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIGNoZWNrZWRLZXlzPXtjaGVja2VkS2V5c31cbiAgICAgICAgICBzZWxlY3RlZEtleXM9e3NlbGVjdGVkS2V5c31cbiAgICAgICAgICBleHBhbmRlZEtleXM9e3RoaXMuc3RhdGUuZXhwYW5kZWRLZXlzfVxuICAgICAgICAgIG9uRXhwYW5kPXtvbkV4cGFuZH1cbiAgICAgICAgICBvblNlbGVjdD17b25TZWxlY3R9XG4gICAgICAgICAgb25DaGVjaz17b25DaGVja31cbiAgICAgICAgICBvbkRyb3A9e3RoaXMub25EcmFnRHJvcH1cbiAgICAgICAgICBjaGVja2FibGU9e2NoZWNrYWJsZX1cbiAgICAgICAgICBzZWxlY3RhYmxlPXtzZWxlY3RhYmxlfVxuICAgICAgICAgIGRyYWdnYWJsZT17ZHJhZ2dhYmxlfVxuICAgICAgICAgIHNob3dMaW5lPXtzaG93TGluZX1cbiAgICAgICAgICBzaG93SWNvbj17c2hvd0ljb259XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICA+XG4gICAgICAgICAge25vZGVzfVxuICAgICAgICA8L1RyZWU+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==