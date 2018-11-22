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
      _react2.default.createElement(
        'div',
        { id: 'tree-view-container', className: clsName, onClick: this.onContainerClick },
        (showExpandAll || title || headerRight) && _react2.default.createElement(
          'header',
          { className: 'title-container' },
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
}(_react2.default.PureComponent), _class.defaultProps = {
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
exports.default = OCTreeView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiT0NUcmVlVmlldyIsInByb3BzIiwiZXhwYW5kZWRLZXlzIiwiZGVmYXVsdEV4cGFuZEFsbCIsImdldEFsbFBhcmVudElkcyIsInRyZWVEYXRhIiwiZGVmYXVsdEV4cGFuZGVkS2V5cyIsInN0YXRlIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsInNldFN0YXRlIiwicmVuZGVyTm9kZXMiLCJkYXRhTG9va1VwS2V5IiwiZGF0YUxvb2tVcFZhbHVlIiwiZGF0YUxvb2tVcENoaWxkcmVuIiwiaWNvbkNsYXNzIiwiZGlzYWJsZWQiLCJjaGVja0NoaWxkcmVuIiwiaGFzQ2hpbGRyZW4iLCJtb3VudE5vZGVzIiwibm9kZUxpc3QiLCJsaXN0IiwiZm9yRWFjaCIsIm5vZGUiLCJwdXNoIiwicmVuZGVyIiwibm9kZXMiLCJ0cmVlSWQiLCJjbGFzc05hbWUiLCJkZWZhdWx0U2VsZWN0ZWRLZXlzIiwiZGVmYXVsdENoZWNrZWRLZXlzIiwiY2hlY2tlZEtleXMiLCJvbkV4cGFuZCIsIm9uU2VsZWN0Iiwib25DaGVjayIsInNob3dMaW5lIiwic2hvd0ljb24iLCJjaGVja2FibGUiLCJzZWxlY3RhYmxlIiwiZHJhZ2dhYmxlIiwic2VsZWN0ZWRLZXlzIiwic2hvd0V4cGFuZEFsbCIsInRpdGxlIiwiaGVhZGVyUmlnaHQiLCJjbHNOYW1lIiwiZXhwYW5kQWxsQ2xzTmFtZSIsImlzQWxsRXhwYW5kZWQiLCJvbkNvbnRhaW5lckNsaWNrIiwib25FeHBhbmRBbGxDbGljayIsImxlbmd0aCIsIm9uRHJhZ0Ryb3AiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwidW5kZWZpbmVkIiwiaXNEcmFnRHJvcExlZ2FsIiwiZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrIiwiZSIsInRhcmdldCIsInRhZ05hbWUiLCJUeXBlRXJyb3IiLCJuZXdEYXRhIiwiZ2V0VXBkYXRlZFRyZWUiLCJnZXRUcmVlSXRlbSIsImRyYWdOb2RlIiwiZXZlbnRLZXkiLCJkcmFnSXRlbSIsImRyYWdFdmVudCIsImFycmF5IiwicGFyZW50RmlsdGVyZWQiLCJkcm9wVG9HYXAiLCJkcm9wSWQiLCJmb3VuZCIsIm5ld0l0ZW1zIiwic2xpY2UiLCJhZGRJdGVtVG9BcnJheSIsIml0ZW1zIiwiZHJvcEluZGV4IiwiZmluZEluZGV4IiwiY2hpbGQiLCJuZXdDaGlsZHJlbiIsInNwbGljZSIsInJlbW92ZUl0ZW0iLCJpIiwiaXRlbSIsImNoaWxkcmVuIiwiaWQiLCJmaW5kIiwiY2IiLCJhY2MiLCJ0b3RhbCIsImNvbmNhdCIsInJlZHVjZSIsImlzUGFyZW50IiwiYXJyIiwiZmlsdGVyQ2hpbGQiLCJmaWx0ZXIiLCJkYXRhT2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBS0E7OztBQUxBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUdBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFU7OztBQW1FbkIsc0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsK0JBRGlCOztBQUFBOztBQUVqQixRQUFNQyxlQUFlRCxNQUFNRSxnQkFBTixHQUNuQixNQUFLQyxlQUFMLENBQXFCSCxNQUFNSSxRQUEzQixFQUFxQ0osS0FBckMsQ0FEbUIsR0FDMkJBLE1BQU1LLG1CQUR0RDs7QUFHQSxVQUFLQyxLQUFMLEdBQWE7QUFDWEw7QUFEVyxLQUFiO0FBTGlCO0FBUWxCOzt1QkFFRE0seUIsc0NBQTBCQyxTLEVBQVc7QUFDbkMsUUFBSUEsVUFBVVAsWUFBVixLQUEyQixLQUFLRCxLQUFMLENBQVdDLFlBQTFDLEVBQXdEO0FBQ3RELFdBQUtRLFFBQUwsQ0FBYztBQUNaUixzQkFBY08sVUFBVVA7QUFEWixPQUFkO0FBR0Q7QUFDRixHO0FBNEJEOzs7Ozs7Ozs7O0FBc0RBOzs7Ozs7OztBQW1CQTs7Ozs7O0FBaUJBOzs7Ozs7QUFRQTs7Ozs7Ozs7QUFvQ0E7OztBQUtBO3VCQUNBUyxXLDBCQUFjO0FBQUEsaUJBR1Is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QUMzQyxZQUFNQyxPQUFPWCxTQUFTVSxDQUFULENBQWI7O0FBRUEsWUFBSUMsS0FBS3JFLGtCQUFMLEtBQTRCOEUsU0FBU1QsS0FBS3JFLGtCQUFMLENBQVQsQ0FBaEMsRUFBb0U7QUFDbEV5RCxrQkFBUSxJQUFSO0FBQ0FZLGVBQUtyRSxrQkFBTCxJQUEyQmdGLFlBQVlYLEtBQUtyRSxrQkFBTCxDQUFaLENBQTNCO0FBQ0E7QUFDRDtBQUNELFlBQUlxRSxLQUFLckUsa0JBQUwsS0FBNEIsQ0FBQ3lELEtBQWpDLEVBQXdDO0FBQ3RDQSxrQkFBUSxPQUFLVSxVQUFMLENBQWdCRSxLQUFLckUsa0JBQUwsQ0FBaEIsRUFBMEN1RSxFQUExQyxDQUFSO0FBQ0Q7QUFDRjtBQUNGO0FBQ0QsUUFBSSxDQUFDZCxLQUFMLEVBQVksT0FBTyxLQUFQO0FBQ1osV0FBT0MsUUFBUDtBQUNELEc7O09BR0R0RCxXLEdBQWM7QUFBQSxXQUFnQjhFLFdBQVcsT0FBSy9GLEtBQUwsQ0FBV2Esa0JBQXRCLEtBQ3pCa0YsV0FBVyxPQUFLL0YsS0FBTCxDQUFXYSxrQkFBdEIsRUFBMENtQyxNQUExQyxJQUFvRCxDQUQzQztBQUFBLEc7O2tCQXRQS2pELFUiLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBUcmVlLCB7IFRyZWVOb2RlIH0gZnJvbSAncmMtdHJlZSc7XG5pbXBvcnQgJ3JjLXRyZWUvYXNzZXRzL2luZGV4LmNzcyc7XG5cbi8vIE92ZXJyaWRlIGRlZmF1bHRzIHJjLXRyZWUgc3R5bGVzXG5pbXBvcnQgJy4vb2MtdHJlZS1zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgVHJlZUNoZWNrYm94IGZyb20gJy4vdHJlZS1jaGVja2JveC5jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPQ1RyZWVWaWV3IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgdHJlZUlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpY29uQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdEV4cGFuZGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgZGVmYXVsdFNlbGVjdGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgZGVmYXVsdENoZWNrZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBvbkV4cGFuZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRHJhZ0Ryb3A6IFByb3BUeXBlcy5mdW5jLFxuICAgIGlzRHJhZ0Ryb3BMZWdhbDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd0xpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dJY29uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjaGVja2FibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRyYWdnYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgIC8vIEN1c3RvbWlzYXRpb24gLS0gZGVmaW5lIHRoZSBkYXRhIGxvb2tVcEtleXMgYW5kIGxvb2tVcFZhbHVlc1xuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcbiAgICBkYXRhTG9va1VwS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRhdGFMb29rVXBWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hlY2tlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIHNlbGVjdGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgZXhwYW5kZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2s6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGhlYWRlclJpZ2h0OiBQcm9wVHlwZXMubm9kZSxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHRyZWVJZDogJ2RlZmF1bHRUcmVlJyxcbiAgICBpY29uQ2xhc3M6ICdjYXJldHMnLFxuICAgIGRlZmF1bHRFeHBhbmRlZEtleXM6IFtdLFxuICAgIGRlZmF1bHRTZWxlY3RlZEtleXM6IFtdLFxuICAgIGRlZmF1bHRDaGVja2VkS2V5czogW10sXG4gICAgb25FeHBhbmQ6IHVuZGVmaW5lZCxcbiAgICBvblNlbGVjdDogdW5kZWZpbmVkLFxuICAgIG9uQ2hlY2s6IHVuZGVmaW5lZCxcbiAgICBvbkRyYWdEcm9wOiB1bmRlZmluZWQsXG4gICAgaXNEcmFnRHJvcExlZ2FsOiB1bmRlZmluZWQsXG4gICAgc2hvd0xpbmU6IGZhbHNlLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBzaG93SWNvbjogdHJ1ZSxcbiAgICBjaGVja2FibGU6IGZhbHNlLFxuICAgIGRyYWdnYWJsZTogZmFsc2UsXG4gICAgc2VsZWN0YWJsZTogZmFsc2UsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogZmFsc2UsXG4gICAgLy8gQ3VzdG9tc1xuICAgIGRhdGFMb29rVXBLZXk6ICdrZXknLFxuICAgIGRhdGFMb29rVXBWYWx1ZTogJ3BhcmVudCcsXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiAnY2hpbGRyZW4nLFxuICAgIHRyZWVEYXRhOiBbXSxcbiAgICBjaGVja2VkS2V5czogW10sXG4gICAgc2VsZWN0ZWRLZXlzOiBbXSxcbiAgICBleHBhbmRlZEtleXM6IFtdLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrOiB0cnVlLFxuICAgIHNob3dFeHBhbmRBbGw6IGZhbHNlLFxuICAgIHRpdGxlOiB1bmRlZmluZWQsXG4gICAgaGVhZGVyUmlnaHQ6IHVuZGVmaW5lZCxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc3QgZXhwYW5kZWRLZXlzID0gcHJvcHMuZGVmYXVsdEV4cGFuZEFsbCA/XG4gICAgICB0aGlzLmdldEFsbFBhcmVudElkcyhwcm9wcy50cmVlRGF0YSwgcHJvcHMpIDogcHJvcHMuZGVmYXVsdEV4cGFuZGVkS2V5cztcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBleHBhbmRlZEtleXMsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKG5leHRQcm9wcy5leHBhbmRlZEtleXMgIT09IHRoaXMucHJvcHMuZXhwYW5kZWRLZXlzKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZXhwYW5kZWRLZXlzOiBuZXh0UHJvcHMuZXhwYW5kZWRLZXlzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25Db250YWluZXJDbGljayA9IChlKSA9PiB7XG4gICAgY29uc3QgeyBvblNlbGVjdCwgZGVzZWxlY3RPbkNvbnRhaW5lckNsaWNrIH0gPSB0aGlzLnByb3BzO1xuICAgIC8vIGNsaWNraW5nIG91dHNpZGUgaXRlbVxuICAgIGlmIChkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2sgJiYgZS50YXJnZXQudGFnTmFtZSAhPT0gJ1NQQU4nKSB7XG4gICAgICBvblNlbGVjdChbXSk7XG4gICAgfVxuICB9O1xuXG4gIG9uRHJhZ0Ryb3AgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHsgb25EcmFnRHJvcCwgaXNEcmFnRHJvcExlZ2FsLCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIW9uRHJhZ0Ryb3ApIHRocm93IG5ldyBUeXBlRXJyb3IoJ29uRHJhZ0Ryb3AgY2FsbGJhY2sgaXMgbm90IGRlZmluZWQnKTtcblxuICAgIC8vIENhbGxpbmcgaXNEcmFnRHJvcExlZ2FsIGNhbGxiYWNrIHRvIGVuc3VyZSB0aGF0IHRoaXMgbW92ZSBjYW4gYmUgZG9uZVxuICAgIGlmIChpc0RyYWdEcm9wTGVnYWwgJiYgIWlzRHJhZ0Ryb3BMZWdhbCh0cmVlRGF0YSwgZSkpIHJldHVybjtcblxuICAgIGNvbnN0IG5ld0RhdGEgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuZ2V0VHJlZUl0ZW0oZS5kcmFnTm9kZS5wcm9wcy5ldmVudEtleSksIGUpO1xuICAgIG9uRHJhZ0Ryb3AobmV3RGF0YSwgZSk7XG4gIH07XG5cbiAgb25FeHBhbmRBbGxDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9uRXhwYW5kIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGV4cGFuZGVkS2V5cyA9IHRoaXMuaXNBbGxFeHBhbmRlZCgpID8gW10gOiB0aGlzLmdldEFsbFBhcmVudElkcygpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmRlZEtleXMgfSwgKCkgPT4ge1xuICAgICAgaWYgKG9uRXhwYW5kKSBvbkV4cGFuZCh0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cyk7XG4gICAgfSk7XG4gIH07XG4gIC8qKlxuICAgKiBSZXR1cm5zIHVwZGF0ZWQgdHJlZSBhZnRlciBEcmFnIG4nIGRyb3AgZXZlbnRcbiAgICogQHBhcmFtIGRyYWdJdGVtIC0gZHJhZ2dlZCBpdGVtXG4gICAqIEBwYXJhbSBkcmFnRXZlbnQgLSBldmVudFxuICAgKiBAcGFyYW0gYXJyYXkgLSB1c2VkIHJlY3Vyc2l2ZWx5XG4gICAqIEBwYXJhbSBwYXJlbnRGaWx0ZXJlZCAtIHVzZWQgcmVjdXJzaXZlbHlcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRVcGRhdGVkVHJlZSA9IChkcmFnSXRlbSwgZHJhZ0V2ZW50LCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHBhcmVudEZpbHRlcmVkID0gZmFsc2UpID0+IHtcbiAgICBjb25zdCB7IGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBDaGlsZHJlbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGRyb3BUb0dhcCwgbm9kZSB9ID0gZHJhZ0V2ZW50O1xuICAgIGNvbnN0IGRyb3BJZCA9IG5vZGUgJiYgbm9kZS5wcm9wcy5ldmVudEtleTtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICBsZXQgbmV3SXRlbXMgPSBhcnJheS5zbGljZSgpO1xuXG4gICAgY29uc3QgYWRkSXRlbVRvQXJyYXkgPSAoaXRlbXMpID0+IHtcbiAgICAgIGNvbnN0IGRyb3BJbmRleCA9IGl0ZW1zLmZpbmRJbmRleChjaGlsZCA9PiBjaGlsZFtkYXRhTG9va1VwS2V5XSA9PT0gZHJvcElkKTtcbiAgICAgIGlmIChkcm9wSW5kZXggPiAtMSkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIGNvbnN0IG5ld0NoaWxkcmVuID0gaXRlbXMuc2xpY2UoKTtcbiAgICAgICAgbmV3Q2hpbGRyZW4uc3BsaWNlKGRyb3BJbmRleCwgMCwgZHJhZ0l0ZW0pO1xuICAgICAgICByZXR1cm4gbmV3Q2hpbGRyZW47XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlbXM7XG4gICAgfTtcbiAgICBpZiAoIXBhcmVudEZpbHRlcmVkICYmIGRyYWdJdGVtKSB7XG4gICAgICBuZXdJdGVtcyA9IHRoaXMucmVtb3ZlSXRlbShuZXdJdGVtcywgZHJhZ0l0ZW1bZGF0YUxvb2tVcEtleV0pO1xuICAgIH1cbiAgICBpZiAoZHJvcFRvR2FwKSB7XG4gICAgICBuZXdJdGVtcyA9IGFkZEl0ZW1Ub0FycmF5KG5ld0l0ZW1zKTtcbiAgICB9XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl07XG5cbiAgICAgICAgaWYgKCFkcm9wVG9HYXAgJiYgZHJvcElkID09PSBpdGVtW2RhdGFMb29rVXBLZXldICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoIWNoaWxkcmVuKSBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gPSBbXTtcbiAgICAgICAgICBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0ucHVzaChkcmFnSXRlbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGRyZW4gJiYgZHJvcFRvR2FwKSB7XG4gICAgICAgICAgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dID0gYWRkSXRlbVRvQXJyYXkoY2hpbGRyZW4pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm91bmQgJiYgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKGRyYWdJdGVtLCBkcmFnRXZlbnQsIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhIHRyZWUgaXRlbSBieSBJRFxuICAgKiBAcGFyYW0gaWRcbiAgICogQHBhcmFtIGFycmF5IC0gdXNlZCByZWN1cnNpdmVseVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0VHJlZUl0ZW0gPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YUxvb2tVcENoaWxkcmVuLCBkYXRhTG9va1VwS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBmb3VuZCA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2RhdGFMb29rVXBLZXldID09PSBpZCk7XG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmb3VuZDtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgcGFyZW50IElEcyBpbiB0aGUgdHJlZVxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICovXG4gIGdldEFsbFBhcmVudElkcyA9IChhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHByb3BzID0gdGhpcy5wcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcENoaWxkcmVuIH0gPSBwcm9wcztcbiAgICBjb25zdCBjYiA9IChhY2MsIGl0ZW0pID0+IHtcbiAgICAgIGxldCB0b3RhbCA9IGFjYztcbiAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdG90YWwgPSBhY2MuY29uY2F0KGl0ZW1bZGF0YUxvb2tVcEtleV0pO1xuICAgICAgICByZXR1cm4gaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLnJlZHVjZShjYiwgdG90YWwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH07XG4gICAgcmV0dXJuIGFycmF5LnJlZHVjZShjYiwgW10pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgYWxsIHBhcmVudCBJRHMgYXJlIGV4cGFuZGVkXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNBbGxFeHBhbmRlZCA9ICgpID0+XG4gICAgdGhpcy5zdGF0ZS5leHBhbmRlZEtleXMubGVuZ3RoID09PSB0aGlzLmdldEFsbFBhcmVudElkcygpLmxlbmd0aDtcblxuXG4gIC8qKlxuICAgKiBSZW1vdmUgaXRlbSBmcm9tIGdpdmVuIGFycmF5XG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gaWRcbiAgICogQHJldHVybnMgYXJyYXkgb2YgZmlsdGVyZWQgaXRlbXNcbiAgICovXG4gIHJlbW92ZUl0ZW0gPSAoYXJyYXksIGlkKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwQ2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICBjb25zdCBpc1BhcmVudCA9IGFyciA9PiBhcnIuZmluZChjaGlsZCA9PiBjaGlsZFtkYXRhTG9va1VwS2V5XSA9PT0gaWQpO1xuICAgIGNvbnN0IGZpbHRlckNoaWxkID0gYXJyID0+IGFyci5maWx0ZXIoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gIT09IGlkKTtcblxuICAgIGlmIChpc1BhcmVudChuZXdJdGVtcykpIHtcbiAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgIG5ld0l0ZW1zID0gZmlsdGVyQ2hpbGQobmV3SXRlbXMpO1xuICAgIH1cblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IG5ld0l0ZW1zW2ldO1xuXG4gICAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgaXNQYXJlbnQoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKSkge1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gPSBmaWx0ZXJDaGlsZChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLnJlbW92ZUl0ZW0oaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLCBpZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfTtcblxuICAvKiBoYXNDaGlsZHJlbiAtIGZ1bmN0aW9uICovXG4gIGhhc0NoaWxkcmVuID0gZGF0YU9iamVjdCA9PiAoKGRhdGFPYmplY3RbdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW5dXG4gICAgJiYgZGF0YU9iamVjdFt0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbl0ubGVuZ3RoID49IDFcbiAgKSk7XG5cbiAgLyogcmVuZGVyTm9kZXMgLSBmdW5jdGlvbiAqL1xuICByZW5kZXJOb2RlcygpIHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwVmFsdWUsIGRhdGFMb29rVXBDaGlsZHJlbiwgaWNvbkNsYXNzLCBkaXNhYmxlZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjaGVja0NoaWxkcmVuID0gdGhpcy5oYXNDaGlsZHJlbjtcblxuICAgIC8vIFJlY3Vyc2l2ZSBmdW5jdGlvbiBmb3IgY29sbGVjdGluZyBub2RlczpcbiAgICBjb25zdCBtb3VudE5vZGVzID0gKG5vZGVMaXN0KSA9PiB7XG4gICAgICBjb25zdCBsaXN0ID0gW107XG4gICAgICBub2RlTGlzdC5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIGlmICghbm9kZVtkYXRhTG9va1VwS2V5XSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyBMZWFmIG5vZGVcbiAgICAgICAgaWYgKCFjaGVja0NoaWxkcmVuKG5vZGUpKSB7XG4gICAgICAgICAgbGlzdC5wdXNoKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcbiAgICAgICAgICAgIDxUcmVlTm9kZVxuICAgICAgICAgICAgICB0aXRsZT17bm9kZVtkYXRhTG9va1VwVmFsdWVdfVxuICAgICAgICAgICAgICBrZXk9e25vZGVbZGF0YUxvb2tVcEtleV19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7aWNvbkNsYXNzfSBsZWFmLW5vZGVgfVxuICAgICAgICAgICAgICBpY29uPXs8VHJlZUNoZWNrYm94IGRpc2FibGVkPXtkaXNhYmxlZH0gLz59XG4gICAgICAgICAgICAvPik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUGFyZW50IG5vZGVcbiAgICAgICAgICBsaXN0LnB1c2goIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuY3Rpb24tcGFyZW4tbmV3bGluZVxuICAgICAgICAgICAgPFRyZWVOb2RlXG4gICAgICAgICAgICAgIHRpdGxlPXtub2RlW2RhdGFMb29rVXBWYWx1ZV19XG4gICAgICAgICAgICAgIGtleT17bm9kZVtkYXRhTG9va1VwS2V5XX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtpY29uQ2xhc3N9IHBhcmVudC1ub2RlYH1cbiAgICAgICAgICAgICAgaWNvbj17PFRyZWVDaGVja2JveCBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bW91bnROb2Rlcyhub2RlW2RhdGFMb29rVXBDaGlsZHJlbl0pfVxuICAgICAgICAgICAgPC9UcmVlTm9kZT4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfTtcbiAgICByZXR1cm4gbW91bnROb2Rlcyh0aGlzLnByb3BzLnRyZWVEYXRhKTtcbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5yZW5kZXJOb2RlcygpO1xuICAgIGNvbnN0IHtcbiAgICAgIHRyZWVJZCwgY2xhc3NOYW1lLCBkZWZhdWx0RXhwYW5kZWRLZXlzLCBkZWZhdWx0U2VsZWN0ZWRLZXlzLCBkZWZhdWx0Q2hlY2tlZEtleXMsIGNoZWNrZWRLZXlzLFxuICAgICAgb25FeHBhbmQsIG9uU2VsZWN0LCBvbkNoZWNrLCBzaG93TGluZSwgc2hvd0ljb24sIGNoZWNrYWJsZSwgc2VsZWN0YWJsZSxcbiAgICAgIGRyYWdnYWJsZSwgZGlzYWJsZWQsIHNlbGVjdGVkS2V5cywgc2hvd0V4cGFuZEFsbCwgdGl0bGUsIGhlYWRlclJpZ2h0LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNsc05hbWUgPSBjbGFzc05hbWUgPyBgJHtjbGFzc05hbWV9IG9jLXJlYWN0LXRyZWVgIDogJ29jLXJlYWN0LXRyZWUnO1xuICAgIGNvbnN0IGV4cGFuZEFsbENsc05hbWUgPSB0aGlzLmlzQWxsRXhwYW5kZWQoKSA/ICdleHBhbmQtYWxsJyA6ICcnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgPGRpdiBpZD1cInRyZWUtdmlldy1jb250YWluZXJcIiBjbGFzc05hbWU9e2Nsc05hbWV9IG9uQ2xpY2s9e3RoaXMub25Db250YWluZXJDbGlja30+XG5cbiAgICAgICAgeyhzaG93RXhwYW5kQWxsIHx8IHRpdGxlIHx8IGhlYWRlclJpZ2h0KSAmJlxuICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInRpdGxlLWNvbnRhaW5lclwiPlxuICAgICAgICAgIHtzaG93RXhwYW5kQWxsICYmXG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9uRXhwYW5kQWxsQ2xpY2t9IGNsYXNzTmFtZT17YGV4cGFuZC1hbGwtdG9nZ2xlICR7ZXhwYW5kQWxsQ2xzTmFtZX1gfSAvPn1cbiAgICAgICAgICB7dGl0bGUgJiYgPGgyPnt0aXRsZX08L2gyPn1cbiAgICAgICAgICB7aGVhZGVyUmlnaHQgJiYgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItcmlnaHRcIj57aGVhZGVyUmlnaHR9PC9kaXY+fVxuICAgICAgICA8L2hlYWRlcj59XG5cbiAgICAgICAgeyEhbm9kZXMubGVuZ3RoICYmXG4gICAgICAgIDxUcmVlXG4gICAgICAgICAgaWQ9e3RyZWVJZH1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICBkZWZhdWx0RXhwYW5kZWRLZXlzPXtkZWZhdWx0RXhwYW5kZWRLZXlzfVxuICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZEtleXM9e2RlZmF1bHRTZWxlY3RlZEtleXN9XG4gICAgICAgICAgZGVmYXVsdENoZWNrZWRLZXlzPXtkZWZhdWx0Q2hlY2tlZEtleXN9XG4gICAgICAgICAgY2hlY2tlZEtleXM9e2NoZWNrZWRLZXlzfVxuICAgICAgICAgIHNlbGVjdGVkS2V5cz17c2VsZWN0ZWRLZXlzfVxuICAgICAgICAgIGV4cGFuZGVkS2V5cz17dGhpcy5zdGF0ZS5leHBhbmRlZEtleXN9XG4gICAgICAgICAgb25FeHBhbmQ9e29uRXhwYW5kfVxuICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH1cbiAgICAgICAgICBvbkNoZWNrPXtvbkNoZWNrfVxuICAgICAgICAgIG9uRHJvcD17dGhpcy5vbkRyYWdEcm9wfVxuICAgICAgICAgIGNoZWNrYWJsZT17Y2hlY2thYmxlfVxuICAgICAgICAgIHNlbGVjdGFibGU9e3NlbGVjdGFibGV9XG4gICAgICAgICAgZHJhZ2dhYmxlPXtkcmFnZ2FibGV9XG4gICAgICAgICAgc2hvd0xpbmU9e3Nob3dMaW5lfVxuICAgICAgICAgIHNob3dJY29uPXtzaG93SWNvbn1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgID5cbiAgICAgICAgICB7bm9kZXN9XG4gICAgICAgIDwvVHJlZT5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19