'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp2;
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

var OCTreeView = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(OCTreeView, _React$PureComponent);

  function OCTreeView() {
    var _temp, _this, _ret;

    _classCallCheck(this, OCTreeView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.onDragDrop = function (e) {
      var _this$props = _this.props,
          onDragDrop = _this$props.onDragDrop,
          isDragDropLegal = _this$props.isDragDropLegal,
          treeData = _this$props.treeData;

      if (!onDragDrop) throw new TypeError('onDragDrop callback is not defined');

      // Calling isDragDropLegal callback to ensure that this move can be done
      if (isDragDropLegal && !isDragDropLegal(treeData, e)) return;

      var newData = _this.getUpdatedTree(_this.getTreeItem(e.dragNode.props.eventKey), e);
      onDragDrop(newData, e);
    }, _this.getUpdatedTree = function (dragItem, dragEvent) {
      var array = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.props.treeData;
      var parentFiltered = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var _this$props2 = _this.props,
          dataLookUpKey = _this$props2.dataLookUpKey,
          dataLookUpChildren = _this$props2.dataLookUpChildren;
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
        newItems = _this.removeItem(newItems, dragItem[dataLookUpKey]);
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
            found = _this.getUpdatedTree(dragItem, dragEvent, item[dataLookUpChildren], true);
          }
        }
      }
      if (!found) return false;
      return newItems;
    }, _this.getTreeItem = function (id) {
      var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.treeData;
      var _this$props3 = _this.props,
          dataLookUpChildren = _this$props3.dataLookUpChildren,
          dataLookUpKey = _this$props3.dataLookUpKey;

      var found = array.find(function (item) {
        return item[dataLookUpKey] === id;
      });
      if (!found) {
        array.forEach(function (item) {
          if (item[dataLookUpChildren] && !found) {
            found = _this.getTreeItem(id, item[dataLookUpChildren]);
          }
        });
      }
      return found;
    }, _this.removeItem = function (array, id) {
      var _this$props4 = _this.props,
          dataLookUpKey = _this$props4.dataLookUpKey,
          dataLookUpChildren = _this$props4.dataLookUpChildren;

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
            found = _this.removeItem(item[dataLookUpChildren], id);
          }
        }
      }
      if (!found) return false;
      return newItems;
    }, _this.hasChildren = function (dataObject) {
      return dataObject[_this.props.dataLookUpChildren] && dataObject[_this.props.dataLookUpChildren].length >= 1;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

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
    var clsName = this.props.className ? this.props.className + ' oc-react-tree' : 'oc-react-tree';

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
        defaultExpandAll = _props2.defaultExpandAll,
        draggable = _props2.draggable,
        disabled = _props2.disabled,
        selectedKeys = _props2.selectedKeys;


    return _react2.default.createElement(
      'div',
      { id: 'tree-view-container', className: clsName },
      !!nodes.length && _react2.default.createElement(
        _rcTree2.default,
        {
          id: treeId,
          className: className,
          defaultExpandedKeys: defaultExpandedKeys,
          defaultSelectedKeys: defaultSelectedKeys,
          defaultCheckedKeys: defaultCheckedKeys,
          checkedKeys: checkedKeys,
          onExpand: onExpand,
          onSelect: onSelect,
          onCheck: onCheck,
          showLine: showLine,
          showIcon: showIcon,
          checkable: checkable,
          selectedKeys: selectedKeys,
          selectable: selectable,
          disabled: disabled,
          draggable: draggable,
          defaultExpandAll: defaultExpandAll,
          onDrop: this.onDragDrop
        },
        nodes
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
  className: ''
}, _temp2);
exports.default = OCTreeView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiT0NUcmVlVmlldyIsIm9uRHJhZ0Ryb3AiLCJlIiwicHJvcHMiLCJpc0RyYWdEcm9wTGVnYWwiLCJ0cmVlRGF0YSIsIlR5cGVFcnJvciIsIm5ld0RhdGEiLCJnZXRVcGRhdGVkVHJlZSIsImdldFRyZWVJdGVtIiwiZHJhZ05vZGUiLCJldmVudEtleSIsImRyYWdJdGVtIiwiZHJhZ0V2ZW50IiwiYXJyYXkiLCJwYXJlbnRGaWx0ZXJlZCIsImRhdGFMb29rVXBLZXkiLCJkYXRhTG9va1VwQ2hpbGRyZW4iLCJkcm9wVG9HYXAiLCJub2RlIiwiZHJvcElkIiwiZm91bmQiLCJuZXdJdGVtcyIsInNsaWNlIiwiYWRkSXRlbVRvQXJyYXkiLCJpdGVtcyIsImRyb3BJbmRleCIsImZpbmRJbmRleCIsImNoaWxkIiwibmV3Q2hpbGRyZW4iLCJzcGxpY2UiLCJyZW1vdmVJdGVtIiwiaSIsImxlbmd0aCIsIml0ZW0iLCJjaGlsZHJlbiIsInB1c2giLCJpZCIsImZpbmQiLCJmb3JFYWNoIiwiaXNQYXJlbnQiLCJhcnIiLCJmaWx0ZXJDaGlsZCIsImZpbHRlciIsImhhc0NoaWxkcmVuIiwiZGF0YU9iamVjdCIsInJlbmRlck5vZGVzIiwiZGF0YUxvb2tVcFZhbHVlIiwiaWNvbkNsYXNzIiwiZGlzYWJsZWQiLCJjaGVja0NoaWxkcmVuIiwibW91bnROb2RlcyIsIm5vZGVMaXN0IiwibGlzdCIsInJlbmRlciIsIm5vZGVzIiwiY2xzTmFtZSIsImNsYXNzTmFtZSIsInRyZWVJZCIsImRlZmF1bHRFeHBhbmRlZEtleXMiLCJkZWZhdWx0U2VsZWN0ZWRLZXlzIiwiZGVmYXVsdENoZWNrZWRLZXlzIiwiY2hlY2tlZEtleXMiLCJvbkV4cGFuZCIsIm9uU2VsZWN0Iiwib25DaGVjayIsInNob3dMaW5lIiwic2hvd0ljb24iLCJjaGVja2FibGUiLCJzZWxlY3RhYmxlIiwiZGVmYXVsdEV4cGFuZEFsbCIsImRyYWdnYWJsZSIsInNlbGVjdGVkS2V5cyIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBOzs7QUFKQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxVOzs7Ozs7Ozs7Ozs7Z0tBeURuQkMsVSxHQUFhLFVBQUNDLENBQUQsRUFBTztBQUFBLHdCQUNnQyxNQUFLQyxLQURyQztBQUFBLFVBQ1ZGLFVBRFUsZUFDVkEsVUFEVTtBQUFBLFVBQ0VHLGVBREYsZUFDRUEsZUFERjtBQUFBLFVBQ21CQyxRQURuQixlQUNtQkEsUUFEbkI7O0FBRWxCLFVBQUksQ0FBQ0osVUFBTCxFQUFpQixNQUFNLElBQUlLLFNBQUosQ0FBYyxvQ0FBZCxDQUFOOztBQUVqQjtBQUNBLFVBQUlGLG1CQUFtQixDQUFDQSxnQkFBZ0JDLFFBQWhCLEVBQTBCSCxDQUExQixDQUF4QixFQUFzRDs7QUFFdEQsVUFBTUssVUFBVSxNQUFLQyxjQUFMLENBQW9CLE1BQUtDLFdBQUwsQ0FBaUJQLEVBQUVRLFFBQUYsQ0FBV1AsS0FBWCxDQUFpQlEsUUFBbEMsQ0FBcEIsRUFBaUVULENBQWpFLENBQWhCO0FBQ0FELGlCQUFXTSxPQUFYLEVBQW9CTCxDQUFwQjtBQUNELEssUUFVRE0sYyxHQUFpQixVQUFDSSxRQUFELEVBQVdDLFNBQVgsRUFBOEU7QUFBQSxVQUF4REMsS0FBd0QsdUVBQWhELE1BQUtYLEtBQUwsQ0FBV0UsUUFBcUM7QUFBQSxVQUEzQlUsY0FBMkIsdUVBQVYsS0FBVTtBQUFBLHlCQUMvQyxNQUFLWixLQUQwQztBQUFBLFVBQ3JGYSxhQURxRixnQkFDckZBLGFBRHFGO0FBQUEsVUFDdEVDLGtCQURzRSxnQkFDdEVBLGtCQURzRTtBQUFBLFVBRXJGQyxTQUZxRixHQUVqRUwsU0FGaUUsQ0FFckZLLFNBRnFGO0FBQUEsVUFFMUVDLElBRjBFLEdBRWpFTixTQUZpRSxDQUUxRU0sSUFGMEU7O0FBRzdGLFVBQU1DLFNBQVNE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LGVBQWEsRUF2Qk87QUF3QnBCVSxnQkFBYyxFQXhCTTtBQXlCcEJmLGFBQVc7QUF6QlMsQztrQkE3Qkh6RCxVIiwiZmlsZSI6InRyZWUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgVHJlZSwgeyBUcmVlTm9kZSB9IGZyb20gJ3JjLXRyZWUnO1xuaW1wb3J0ICdyYy10cmVlL2Fzc2V0cy9pbmRleC5jc3MnO1xuLy8gT3ZlcnJpZGUgZGVmYXVsdHMgcmMtdHJlZSBzdHlsZXNcbmltcG9ydCAnLi9vYy10cmVlLXN0eWxlcy5zY3NzJztcbmltcG9ydCBUcmVlQ2hlY2tib3ggZnJvbSAnLi90cmVlLWNoZWNrYm94LmNvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9DVHJlZVZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB0cmVlSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGljb25DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZWZhdWx0Q2hlY2tlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIG9uRXhwYW5kOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGVjazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25EcmFnRHJvcDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNEcmFnRHJvcExlZ2FsOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ljb246IFByb3BUeXBlcy5ib29sLFxuICAgIGNoZWNrYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0YWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJhZ2dhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgLy8gQ3VzdG9taXNhdGlvbiAtLSBkZWZpbmUgdGhlIGRhdGEgbG9va1VwS2V5cyBhbmQgbG9va1VwVmFsdWVzXG4gICAgdHJlZURhdGE6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxuICAgIGRhdGFMb29rVXBLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGVja2VkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgc2VsZWN0ZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHRyZWVJZDogJ2RlZmF1bHRUcmVlJyxcbiAgICBpY29uQ2xhc3M6ICdjYXJldHMnLFxuICAgIGRlZmF1bHRFeHBhbmRlZEtleXM6IFtdLFxuICAgIGRlZmF1bHRTZWxlY3RlZEtleXM6IFtdLFxuICAgIGRlZmF1bHRDaGVja2VkS2V5czogW10sXG4gICAgb25FeHBhbmQ6IHVuZGVmaW5lZCxcbiAgICBvblNlbGVjdDogdW5kZWZpbmVkLFxuICAgIG9uQ2hlY2s6IHVuZGVmaW5lZCxcbiAgICBvbkRyYWdEcm9wOiB1bmRlZmluZWQsXG4gICAgaXNEcmFnRHJvcExlZ2FsOiB1bmRlZmluZWQsXG4gICAgc2hvd0xpbmU6IGZhbHNlLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBzaG93SWNvbjogdHJ1ZSxcbiAgICBjaGVja2FibGU6IGZhbHNlLFxuICAgIGRyYWdnYWJsZTogZmFsc2UsXG4gICAgc2VsZWN0YWJsZTogZmFsc2UsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogZmFsc2UsXG4gICAgLy8gQ3VzdG9tc1xuICAgIGRhdGFMb29rVXBLZXk6ICdrZXknLFxuICAgIGRhdGFMb29rVXBWYWx1ZTogJ3BhcmVudCcsXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiAnY2hpbGRyZW4nLFxuICAgIHRyZWVEYXRhOiBbXSxcbiAgICBjaGVja2VkS2V5czogW10sXG4gICAgc2VsZWN0ZWRLZXlzOiBbXSxcbiAgICBjbGFzc05hbWU6ICcnLFxuICB9O1xuXG4gIG9uRHJhZ0Ryb3AgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHsgb25EcmFnRHJvcCwgaXNEcmFnRHJvcExlZ2FsLCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIW9uRHJhZ0Ryb3ApIHRocm93IG5ldyBUeXBlRXJyb3IoJ29uRHJhZ0Ryb3AgY2FsbGJhY2sgaXMgbm90IGRlZmluZWQnKTtcblxuICAgIC8vIENhbGxpbmcgaXNEcmFnRHJvcExlZ2FsIGNhbGxiYWNrIHRvIGVuc3VyZSB0aGF0IHRoaXMgbW92ZSBjYW4gYmUgZG9uZVxuICAgIGlmIChpc0RyYWdEcm9wTGVnYWwgJiYgIWlzRHJhZ0Ryb3BMZWdhbCh0cmVlRGF0YSwgZSkpIHJldHVybjtcblxuICAgIGNvbnN0IG5ld0RhdGEgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuZ2V0VHJlZUl0ZW0oZS5kcmFnTm9kZS5wcm9wcy5ldmVudEtleSksIGUpO1xuICAgIG9uRHJhZ0Ryb3AobmV3RGF0YSwgZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdXBkYXRlZCB0cmVlIGFmdGVyIERyYWcgbicgZHJvcCBldmVudFxuICAgKiBAcGFyYW0gZHJhZ0l0ZW0gLSBkcmFnZ2VkIGl0ZW1cbiAgICogQHBhcmFtIGRyYWdFdmVudCAtIGV2ZW50XG4gICAqIEBwYXJhbSBhcnJheSAtIHVzZWQgcmVjdXJzaXZlbHlcbiAgICogQHBhcmFtIHBhcmVudEZpbHRlcmVkIC0gdXNlZCByZWN1cnNpdmVseVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldFVwZGF0ZWRUcmVlID0gKGRyYWdJdGVtLCBkcmFnRXZlbnQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgcGFyZW50RmlsdGVyZWQgPSBmYWxzZSkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcENoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgZHJvcFRvR2FwLCBub2RlIH0gPSBkcmFnRXZlbnQ7XG4gICAgY29uc3QgZHJvcElkID0gbm9kZSAmJiBub2RlLnByb3BzLmV2ZW50S2V5O1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGxldCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XG5cbiAgICBjb25zdCBhZGRJdGVtVG9BcnJheSA9IChpdGVtcykgPT4ge1xuICAgICAgY29uc3QgZHJvcEluZGV4ID0gaXRlbXMuZmluZEluZGV4KGNoaWxkID0+IGNoaWxkW2RhdGFMb29rVXBLZXldID09PSBkcm9wSWQpO1xuICAgICAgaWYgKGRyb3BJbmRleCA+IC0xKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgbmV3Q2hpbGRyZW4gPSBpdGVtcy5zbGljZSgpO1xuICAgICAgICBuZXdDaGlsZHJlbi5zcGxpY2UoZHJvcEluZGV4LCAwLCBkcmFnSXRlbSk7XG4gICAgICAgIHJldHVybiBuZXdDaGlsZHJlbjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtcztcbiAgICB9O1xuICAgIGlmICghcGFyZW50RmlsdGVyZWQgJiYgZHJhZ0l0ZW0pIHtcbiAgICAgIG5ld0l0ZW1zID0gdGhpcy5yZW1vdmVJdGVtKG5ld0l0ZW1zLCBkcmFnSXRlbVtkYXRhTG9va1VwS2V5XSk7XG4gICAgfVxuICAgIGlmIChkcm9wVG9HYXApIHtcbiAgICAgIG5ld0l0ZW1zID0gYWRkSXRlbVRvQXJyYXkobmV3SXRlbXMpO1xuICAgIH1cblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IG5ld0l0ZW1zW2ldO1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXTtcblxuICAgICAgICBpZiAoIWRyb3BUb0dhcCAmJiBkcm9wSWQgPT09IGl0ZW1bZGF0YUxvb2tVcEtleV0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgIGlmICghY2hpbGRyZW4pIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSA9IFtdO1xuICAgICAgICAgIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXS5wdXNoKGRyYWdJdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZHJlbiAmJiBkcm9wVG9HYXApIHtcbiAgICAgICAgICBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gPSBhZGRJdGVtVG9BcnJheShjaGlsZHJlbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3VuZCAmJiBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoZHJhZ0l0ZW0sIGRyYWdFdmVudCwgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWZvdW5kKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdHJlZSBpdGVtIGJ5IElEXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcGFyYW0gYXJyYXkgLSB1c2VkIHJlY3Vyc2l2ZWx5XG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBnZXRUcmVlSXRlbSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwQ2hpbGRyZW4sIGRhdGFMb29rVXBLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGZvdW5kID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1bZGF0YUxvb2tVcEtleV0gPT09IGlkKTtcbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9O1xuXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBpdGVtIGZyb20gZ2l2ZW4gYXJyYXlcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcmV0dXJucyBhcnJheSBvZiBmaWx0ZXJlZCBpdGVtc1xuICAgKi9cbiAgcmVtb3ZlSXRlbSA9IChhcnJheSwgaWQpID0+IHtcbiAgICBjb25zdCB7IGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBDaGlsZHJlbiB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbmV3SXRlbXMgPSBhcnJheS5zbGljZSgpO1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGNvbnN0IGlzUGFyZW50ID0gYXJyID0+IGFyci5maW5kKGNoaWxkID0+IGNoaWxkW2RhdGFMb29rVXBLZXldID09PSBpZCk7XG4gICAgY29uc3QgZmlsdGVyQ2hpbGQgPSBhcnIgPT4gYXJyLmZpbHRlcihjaGlsZCA9PiBjaGlsZFtkYXRhTG9va1VwS2V5XSAhPT0gaWQpO1xuXG4gICAgaWYgKGlzUGFyZW50KG5ld0l0ZW1zKSkge1xuICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgbmV3SXRlbXMgPSBmaWx0ZXJDaGlsZChuZXdJdGVtcyk7XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XG5cbiAgICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiBpc1BhcmVudChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pKSB7XG4gICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSA9IGZpbHRlckNoaWxkKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMucmVtb3ZlSXRlbShpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0sIGlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWZvdW5kKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xuICB9O1xuXG4gIC8qIGhhc0NoaWxkcmVuIC0gZnVuY3Rpb24gKi9cbiAgaGFzQ2hpbGRyZW4gPSBkYXRhT2JqZWN0ID0+ICgoZGF0YU9iamVjdFt0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbl1cbiAgICAmJiBkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXS5sZW5ndGggPj0gMVxuICApKTtcblxuICAvKiByZW5kZXJOb2RlcyAtIGZ1bmN0aW9uICovXG4gIHJlbmRlck5vZGVzKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBWYWx1ZSwgZGF0YUxvb2tVcENoaWxkcmVuLCBpY29uQ2xhc3MsIGRpc2FibGVkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNoZWNrQ2hpbGRyZW4gPSB0aGlzLmhhc0NoaWxkcmVuO1xuXG4gICAgLy8gUmVjdXJzaXZlIGZ1bmN0aW9uIGZvciBjb2xsZWN0aW5nIG5vZGVzOlxuICAgIGNvbnN0IG1vdW50Tm9kZXMgPSAobm9kZUxpc3QpID0+IHtcbiAgICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICAgIG5vZGVMaXN0LmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKCFub2RlW2RhdGFMb29rVXBLZXldKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vIExlYWYgbm9kZVxuICAgICAgICBpZiAoIWNoZWNrQ2hpbGRyZW4obm9kZSkpIHtcbiAgICAgICAgICBsaXN0LnB1c2goIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuY3Rpb24tcGFyZW4tbmV3bGluZVxuICAgICAgICAgICAgPFRyZWVOb2RlXG4gICAgICAgICAgICAgIHRpdGxlPXtub2RlW2RhdGFMb29rVXBWYWx1ZV19XG4gICAgICAgICAgICAgIGtleT17bm9kZVtkYXRhTG9va1VwS2V5XX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtpY29uQ2xhc3N9IGxlYWYtbm9kZWB9XG4gICAgICAgICAgICAgIGljb249ezxUcmVlQ2hlY2tib3ggZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPn1cbiAgICAgICAgICAgIC8+KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBQYXJlbnQgbm9kZVxuICAgICAgICAgIGxpc3QucHVzaCggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jdGlvbi1wYXJlbi1uZXdsaW5lXG4gICAgICAgICAgICA8VHJlZU5vZGVcbiAgICAgICAgICAgICAgdGl0bGU9e25vZGVbZGF0YUxvb2tVcFZhbHVlXX1cbiAgICAgICAgICAgICAga2V5PXtub2RlW2RhdGFMb29rVXBLZXldfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2ljb25DbGFzc30gcGFyZW50LW5vZGVgfVxuICAgICAgICAgICAgICBpY29uPXs8VHJlZUNoZWNrYm94IGRpc2FibGVkPXtkaXNhYmxlZH0gLz59XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHttb3VudE5vZGVzKG5vZGVbZGF0YUxvb2tVcENoaWxkcmVuXSl9XG4gICAgICAgICAgICA8L1RyZWVOb2RlPik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbGlzdDtcbiAgICB9O1xuICAgIHJldHVybiBtb3VudE5vZGVzKHRoaXMucHJvcHMudHJlZURhdGEpO1xuICB9XG5cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLnJlbmRlck5vZGVzKCk7XG4gICAgY29uc3QgY2xzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lID8gYCR7dGhpcy5wcm9wcy5jbGFzc05hbWV9IG9jLXJlYWN0LXRyZWVgIDogJ29jLXJlYWN0LXRyZWUnO1xuXG4gICAgY29uc3Qge1xuICAgICAgdHJlZUlkLCBjbGFzc05hbWUsIGRlZmF1bHRFeHBhbmRlZEtleXMsIGRlZmF1bHRTZWxlY3RlZEtleXMsIGRlZmF1bHRDaGVja2VkS2V5cywgY2hlY2tlZEtleXMsXG4gICAgICBvbkV4cGFuZCwgb25TZWxlY3QsIG9uQ2hlY2ssIHNob3dMaW5lLCBzaG93SWNvbiwgY2hlY2thYmxlLCBzZWxlY3RhYmxlLCBkZWZhdWx0RXhwYW5kQWxsLFxuICAgICAgZHJhZ2dhYmxlLCBkaXNhYmxlZCwgc2VsZWN0ZWRLZXlzLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJ0cmVlLXZpZXctY29udGFpbmVyXCIgY2xhc3NOYW1lPXtjbHNOYW1lfT5cbiAgICAgICAgeyEhbm9kZXMubGVuZ3RoICYmXG4gICAgICAgIDxUcmVlXG4gICAgICAgICAgaWQ9e3RyZWVJZH1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICBkZWZhdWx0RXhwYW5kZWRLZXlzPXtkZWZhdWx0RXhwYW5kZWRLZXlzfVxuICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZEtleXM9e2RlZmF1bHRTZWxlY3RlZEtleXN9XG4gICAgICAgICAgZGVmYXVsdENoZWNrZWRLZXlzPXtkZWZhdWx0Q2hlY2tlZEtleXN9XG4gICAgICAgICAgY2hlY2tlZEtleXM9e2NoZWNrZWRLZXlzfVxuICAgICAgICAgIG9uRXhwYW5kPXtvbkV4cGFuZH1cbiAgICAgICAgICBvblNlbGVjdD17b25TZWxlY3R9XG4gICAgICAgICAgb25DaGVjaz17b25DaGVja31cbiAgICAgICAgICBzaG93TGluZT17c2hvd0xpbmV9XG4gICAgICAgICAgc2hvd0ljb249e3Nob3dJY29ufVxuICAgICAgICAgIGNoZWNrYWJsZT17Y2hlY2thYmxlfVxuICAgICAgICAgIHNlbGVjdGVkS2V5cz17c2VsZWN0ZWRLZXlzfVxuICAgICAgICAgIHNlbGVjdGFibGU9e3NlbGVjdGFibGV9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIGRyYWdnYWJsZT17ZHJhZ2dhYmxlfVxuICAgICAgICAgIGRlZmF1bHRFeHBhbmRBbGw9e2RlZmF1bHRFeHBhbmRBbGx9XG4gICAgICAgICAgb25Ecm9wPXt0aGlzLm9uRHJhZ0Ryb3B9XG4gICAgICAgID5cbiAgICAgICAgICB7bm9kZXN9XG4gICAgICAgIDwvVHJlZT5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19