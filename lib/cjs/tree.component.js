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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.onContainerClick = function (e) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          deselectOnContainerClick = _this$props.deselectOnContainerClick;
      // clicking outside item

      if (deselectOnContainerClick && e.target.tagName !== 'SPAN') {
        onSelect([]);
      }
    }, _this.onDragDrop = function (e) {
      var _this$props2 = _this.props,
          onDragDrop = _this$props2.onDragDrop,
          isDragDropLegal = _this$props2.isDragDropLegal,
          treeData = _this$props2.treeData;

      if (!onDragDrop) throw new TypeError('onDragDrop callback is not defined');

      // Calling isDragDropLegal callback to ensure that this move can be done
      if (isDragDropLegal && !isDragDropLegal(treeData, e)) return;

      var newData = _this.getUpdatedTree(_this.getTreeItem(e.dragNode.props.eventKey), e);
      onDragDrop(newData, e);
    }, _this.getUpdatedTree = function (dragItem, dragEvent) {
      var array = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.props.treeData;
      var parentFiltered = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var _this$props3 = _this.props,
          dataLookUpKey = _this$props3.dataLookUpKey,
          dataLookUpChildren = _this$props3.dataLookUpChildren;
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
      var _this$props4 = _this.props,
          dataLookUpChildren = _this$props4.dataLookUpChildren,
          dataLookUpKey = _this$props4.dataLookUpKey;

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
      var _this$props5 = _this.props,
          dataLookUpKey = _this$props5.dataLookUpKey,
          dataLookUpChildren = _this$props5.dataLookUpChildren;

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
        selectedKeys = _props2.selectedKeys,
        expandedKeys = _props2.expandedKeys;


    return _react2.default.createElement(
      'div',
      { id: 'tree-view-container', className: clsName, onClick: this.onContainerClick },
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
          expandedKeys: expandedKeys,
          onExpand: onExpand,
          onSelect: onSelect,
          onCheck: onCheck,
          onDrop: this.onDragDrop,
          checkable: checkable,
          selectable: selectable,
          draggable: draggable,
          showLine: showLine,
          showIcon: showIcon,
          disabled: disabled,
          defaultExpandAll: defaultExpandAll
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
  expandedKeys: [],
  className: '',
  deselectOnContainerClick: true
}, _temp2);
exports.default = OCTreeView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiT0NUcmVlVmlldyIsIm9uQ29udGFpbmVyQ2xpY2siLCJlIiwicHJvcHMiLCJvblNlbGVjdCIsImRlc2VsZWN0T25Db250YWluZXJDbGljayIsInRhcmdldCIsInRhZ05hbWUiLCJvbkRyYWdEcm9wIiwiaXNEcmFnRHJvcExlZ2FsIiwidHJlZURhdGEiLCJUeXBlRXJyb3IiLCJuZXdEYXRhIiwiZ2V0VXBkYXRlZFRyZWUiLCJnZXRUcmVlSXRlbSIsImRyYWdOb2RlIiwiZXZlbnRLZXkiLCJkcmFnSXRlbSIsImRyYWdFdmVudCIsImFycmF5IiwicGFyZW50RmlsdGVyZWQiLCJkYXRhTG9va1VwS2V5IiwiZGF0YUxvb2tVcENoaWxkcmVuIiwiZHJvcFRvR2FwIiwibm9kZSIsImRyb3BJZCIsImZvdW5kIiwibmV3SXRlbXMiLCJzbGljZSIsImFkZEl0ZW1Ub0FycmF5IiwiaXRlbXMiLCJkcm9wSW5kZXgiLCJmaW5kSW5kZXgiLCJjaGlsZCIsIm5ld0NoaWxkcmVuIiwic3BsaWNlIiwicmVtb3ZlSXRlbSIsImkiLCJsZW5ndGgiLCJpdGVtIiwiY2hpbGRyZW4iLCJwdXNoIiwiaWQiLCJmaW5kIiwiZm9yRWFjaCIsImlzUGFyZW50IiwiYXJyIiwiZmlsdGVyQ2hpbGQiLCJmaWx0ZXIiLCJoYXNDaGlsZHJlbiIsImRhdGFPYmplY3QiLCJyZW5kZXJOb2RlcyIsImRhdGFMb29rVXBWYWx1ZSIsImljb25DbGFzcyIsImRpc2FibGVkIiwiY2hlY2tDaGlsZHJlbiIsIm1vdW50Tm9kZXMiLCJub2RlTGlzdCIsImxpc3QiLCJyZW5kZXIiLCJub2RlcyIsImNsc05hbWUiLCJjbGFzc05hbWUiLCJ0cmVlSWQiLCJkZWZhdWx0RXhwYW5kZWRLZXlzIiwiZGVmYXVsdFNlbGVjdGVkS2V5cyIsImRlZmF1bHRDaGVja2VkS2V5cyIsImNoZWNrZWRLZXlzIiwib25FeHBhbmQiLCJvbkNoZWNrIiwic2hvd0xpbmUiLCJzaG93SWNvbiIsImNoZWNrYWJsZSIsInNlbGVjdGFibGUiLCJkZWZhdWx0RXhwYW5kQWxsIiwiZHJhZ2dhYmxlIiwic2VsZWN0ZWRLZXlzIiwiZXhwYW5kZWRLZXlzIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBSUE7OztBQUpBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozs7OztnS0E2RG5CQyxnQixHQUFtQixVQUFDQyxDQUFELEVBQU87QUFBQSx3QkFDdUIsTUFBS0MsS0FENUI7QUFBQSxVQUNoQkMsUUFEZ0IsZUFDaEJBLFFBRGdCO0FBQUEsVUFDTkMsd0JBRE0sZUFDTkEsd0JBRE07QUFFeEI7O0FBQ0EsVUFBSUEsNEJBQTRCSCxFQUFFSSxNQUFGLENBQVNDLE9BQVQsS0FBcUIsTUFBckQsRUFBNkQ7QUFDM0RILGlCQUFTLEVBQVQ7QUFDRDtBQUNGLEssUUFFREksVSxHQUFhLFVBQUNOLENBQUQsRUFBTztBQUFBLHlCQUNnQyxNQUFLQyxLQURyQztBQUFBLFVBQ1ZLLFVBRFUsZ0JBQ1ZBLFVBRFU7QUFBQSxVQUNFQyxlQURGLGdCQUNFQSxlQURGO0FBQUEsVUFDbUJDLFFBRG5CLGdCQUNtQkEsUUFEbkI7O0FBRWxCLFVBQUksQ0FBQ0YsVUFBTCxFQUFpQixNQUFNLElBQUlHLFNBQUosQ0FBYyxvQ0FBZCxDQUFOOztBQUVqQjtBQUNBLFVBQUlGLG1CQUFtQixDQUFDQSxnQkFBZ0JDLFFBQWhCLEVBQTBCUixDQUExQixDQUF4QixFQUFzRDs7QUFFdEQsVUFBTVUsVUFBVSxNQUFLQyxjQUFMLENBQW9CLE1BQUtDLFdBQUwsQ0FBaUJaLEVBQUVhLFFBQUYsQ0FBV1osS0FBWCxDQUFpQmEsUUFBbEMsQ0FBcEIsRUFBaUVkLENBQWpFLENBQWhCO0FBQ0FNLGlCQUFXSSxPQUFYLEVBQW9CVixDQUFwQjtBQUNELEssUUFVRFcsYyxHQUFpQixVQUFDSSxR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LFFBRlM7QUFHcEJXLHVCQUFxQixFQUhEO0FBSXBCQyx1QkFBcUIsRUFKRDtBQUtwQkMsc0JBQW9CLEVBTEE7QUFNcEJFLFlBQVVZLFNBTlU7QUFPcEI1RSxZQUFVNEUsU0FQVTtBQVFwQlgsV0FBU1csU0FSVztBQVNwQnhFLGNBQVl3RSxTQVRRO0FBVXBCdkUsbUJBQWlCdUUsU0FWRztBQVdwQlYsWUFBVSxLQVhVO0FBWXBCaEIsWUFBVSxLQVpVO0FBYXBCaUIsWUFBVSxJQWJVO0FBY3BCQyxhQUFXLEtBZFM7QUFlcEJHLGFBQVcsS0FmUztBQWdCcEJGLGNBQVksS0FoQlE7QUFpQnBCQyxvQkFBa0IsS0FqQkU7QUFrQnBCO0FBQ0FyRCxpQkFBZSxLQW5CSztBQW9CcEIrQixtQkFBaUIsUUFwQkc7QUFxQnBCOUIsc0JBQW9CLFVBckJBO0FBc0JwQlosWUFBVSxFQXRCVTtBQXVCcEJ5RCxlQUFhLEVBdkJPO0FBd0JwQlMsZ0JBQWMsRUF4Qk07QUF5QnBCQyxnQkFBYyxFQXpCTTtBQTBCcEJmLGFBQVcsRUExQlM7QUEyQnBCekQsNEJBQTBCO0FBM0JOLEM7a0JBL0JITCxVIiwiZmlsZSI6InRyZWUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgVHJlZSwgeyBUcmVlTm9kZSB9IGZyb20gJ3JjLXRyZWUnO1xuaW1wb3J0ICdyYy10cmVlL2Fzc2V0cy9pbmRleC5jc3MnO1xuLy8gT3ZlcnJpZGUgZGVmYXVsdHMgcmMtdHJlZSBzdHlsZXNcbmltcG9ydCAnLi9vYy10cmVlLXN0eWxlcy5zY3NzJztcbmltcG9ydCBUcmVlQ2hlY2tib3ggZnJvbSAnLi90cmVlLWNoZWNrYm94LmNvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9DVHJlZVZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB0cmVlSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGljb25DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZWZhdWx0Q2hlY2tlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIG9uRXhwYW5kOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGVjazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25EcmFnRHJvcDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNEcmFnRHJvcExlZ2FsOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ljb246IFByb3BUeXBlcy5ib29sLFxuICAgIGNoZWNrYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0YWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJhZ2dhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgLy8gQ3VzdG9taXNhdGlvbiAtLSBkZWZpbmUgdGhlIGRhdGEgbG9va1VwS2V5cyBhbmQgbG9va1VwVmFsdWVzXG4gICAgdHJlZURhdGE6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxuICAgIGRhdGFMb29rVXBLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGVja2VkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgc2VsZWN0ZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBleHBhbmRlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGRlc2VsZWN0T25Db250YWluZXJDbGljazogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB0cmVlSWQ6ICdkZWZhdWx0VHJlZScsXG4gICAgaWNvbkNsYXNzOiAnY2FyZXRzJyxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBbXSxcbiAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzOiBbXSxcbiAgICBkZWZhdWx0Q2hlY2tlZEtleXM6IFtdLFxuICAgIG9uRXhwYW5kOiB1bmRlZmluZWQsXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBvbkNoZWNrOiB1bmRlZmluZWQsXG4gICAgb25EcmFnRHJvcDogdW5kZWZpbmVkLFxuICAgIGlzRHJhZ0Ryb3BMZWdhbDogdW5kZWZpbmVkLFxuICAgIHNob3dMaW5lOiBmYWxzZSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgc2hvd0ljb246IHRydWUsXG4gICAgY2hlY2thYmxlOiBmYWxzZSxcbiAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgIHNlbGVjdGFibGU6IGZhbHNlLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IGZhbHNlLFxuICAgIC8vIEN1c3RvbXNcbiAgICBkYXRhTG9va1VwS2V5OiAna2V5JyxcbiAgICBkYXRhTG9va1VwVmFsdWU6ICdwYXJlbnQnLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogJ2NoaWxkcmVuJyxcbiAgICB0cmVlRGF0YTogW10sXG4gICAgY2hlY2tlZEtleXM6IFtdLFxuICAgIHNlbGVjdGVkS2V5czogW10sXG4gICAgZXhwYW5kZWRLZXlzOiBbXSxcbiAgICBjbGFzc05hbWU6ICcnLFxuICAgIGRlc2VsZWN0T25Db250YWluZXJDbGljazogdHJ1ZSxcbiAgfTtcblxuICBvbkNvbnRhaW5lckNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCB7IG9uU2VsZWN0LCBkZXNlbGVjdE9uQ29udGFpbmVyQ2xpY2sgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gY2xpY2tpbmcgb3V0c2lkZSBpdGVtXG4gICAgaWYgKGRlc2VsZWN0T25Db250YWluZXJDbGljayAmJiBlLnRhcmdldC50YWdOYW1lICE9PSAnU1BBTicpIHtcbiAgICAgIG9uU2VsZWN0KFtdKTtcbiAgICB9XG4gIH07XG5cbiAgb25EcmFnRHJvcCA9IChlKSA9PiB7XG4gICAgY29uc3QgeyBvbkRyYWdEcm9wLCBpc0RyYWdEcm9wTGVnYWwsIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghb25EcmFnRHJvcCkgdGhyb3cgbmV3IFR5cGVFcnJvcignb25EcmFnRHJvcCBjYWxsYmFjayBpcyBub3QgZGVmaW5lZCcpO1xuXG4gICAgLy8gQ2FsbGluZyBpc0RyYWdEcm9wTGVnYWwgY2FsbGJhY2sgdG8gZW5zdXJlIHRoYXQgdGhpcyBtb3ZlIGNhbiBiZSBkb25lXG4gICAgaWYgKGlzRHJhZ0Ryb3BMZWdhbCAmJiAhaXNEcmFnRHJvcExlZ2FsKHRyZWVEYXRhLCBlKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgbmV3RGF0YSA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5nZXRUcmVlSXRlbShlLmRyYWdOb2RlLnByb3BzLmV2ZW50S2V5KSwgZSk7XG4gICAgb25EcmFnRHJvcChuZXdEYXRhLCBlKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB1cGRhdGVkIHRyZWUgYWZ0ZXIgRHJhZyBuJyBkcm9wIGV2ZW50XG4gICAqIEBwYXJhbSBkcmFnSXRlbSAtIGRyYWdnZWQgaXRlbVxuICAgKiBAcGFyYW0gZHJhZ0V2ZW50IC0gZXZlbnRcbiAgICogQHBhcmFtIGFycmF5IC0gdXNlZCByZWN1cnNpdmVseVxuICAgKiBAcGFyYW0gcGFyZW50RmlsdGVyZWQgLSB1c2VkIHJlY3Vyc2l2ZWx5XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0VXBkYXRlZFRyZWUgPSAoZHJhZ0l0ZW0sIGRyYWdFdmVudCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCBwYXJlbnRGaWx0ZXJlZCA9IGZhbHNlKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwQ2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBkcm9wVG9HYXAsIG5vZGUgfSA9IGRyYWdFdmVudDtcbiAgICBjb25zdCBkcm9wSWQgPSBub2RlICYmIG5vZGUucHJvcHMuZXZlbnRLZXk7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgbGV0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcblxuICAgIGNvbnN0IGFkZEl0ZW1Ub0FycmF5ID0gKGl0ZW1zKSA9PiB7XG4gICAgICBjb25zdCBkcm9wSW5kZXggPSBpdGVtcy5maW5kSW5kZXgoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gPT09IGRyb3BJZCk7XG4gICAgICBpZiAoZHJvcEluZGV4ID4gLTEpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICBjb25zdCBuZXdDaGlsZHJlbiA9IGl0ZW1zLnNsaWNlKCk7XG4gICAgICAgIG5ld0NoaWxkcmVuLnNwbGljZShkcm9wSW5kZXgsIDAsIGRyYWdJdGVtKTtcbiAgICAgICAgcmV0dXJuIG5ld0NoaWxkcmVuO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH07XG4gICAgaWYgKCFwYXJlbnRGaWx0ZXJlZCAmJiBkcmFnSXRlbSkge1xuICAgICAgbmV3SXRlbXMgPSB0aGlzLnJlbW92ZUl0ZW0obmV3SXRlbXMsIGRyYWdJdGVtW2RhdGFMb29rVXBLZXldKTtcbiAgICB9XG4gICAgaWYgKGRyb3BUb0dhcCkge1xuICAgICAgbmV3SXRlbXMgPSBhZGRJdGVtVG9BcnJheShuZXdJdGVtcyk7XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dO1xuXG4gICAgICAgIGlmICghZHJvcFRvR2FwICYmIGRyb3BJZCA9PT0gaXRlbVtkYXRhTG9va1VwS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgaWYgKCFjaGlsZHJlbikgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dID0gW107XG4gICAgICAgICAgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLnB1c2goZHJhZ0l0ZW0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkcmVuICYmIGRyb3BUb0dhcCkge1xuICAgICAgICAgIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSA9IGFkZEl0ZW1Ub0FycmF5KGNoaWxkcmVuKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvdW5kICYmIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRVcGRhdGVkVHJlZShkcmFnSXRlbSwgZHJhZ0V2ZW50LCBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0sIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB0cmVlIGl0ZW0gYnkgSURcbiAgICogQHBhcmFtIGlkXG4gICAqIEBwYXJhbSBhcnJheSAtIHVzZWQgcmVjdXJzaXZlbHlcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIGdldFRyZWVJdGVtID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEpID0+IHtcbiAgICBjb25zdCB7IGRhdGFMb29rVXBDaGlsZHJlbiwgZGF0YUxvb2tVcEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgZm91bmQgPSBhcnJheS5maW5kKGl0ZW0gPT4gaXRlbVtkYXRhTG9va1VwS2V5XSA9PT0gaWQpO1xuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmQ7XG4gIH07XG5cblxuICAvKipcbiAgICogUmVtb3ZlIGl0ZW0gZnJvbSBnaXZlbiBhcnJheVxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIGlkXG4gICAqIEByZXR1cm5zIGFycmF5IG9mIGZpbHRlcmVkIGl0ZW1zXG4gICAqL1xuICByZW1vdmVJdGVtID0gKGFycmF5LCBpZCkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcENoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgY29uc3QgaXNQYXJlbnQgPSBhcnIgPT4gYXJyLmZpbmQoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gPT09IGlkKTtcbiAgICBjb25zdCBmaWx0ZXJDaGlsZCA9IGFyciA9PiBhcnIuZmlsdGVyKGNoaWxkID0+IGNoaWxkW2RhdGFMb29rVXBLZXldICE9PSBpZCk7XG5cbiAgICBpZiAoaXNQYXJlbnQobmV3SXRlbXMpKSB7XG4gICAgICBmb3VuZCA9IHRydWU7XG4gICAgICBuZXdJdGVtcyA9IGZpbHRlckNoaWxkKG5ld0l0ZW1zKTtcbiAgICB9XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcblxuICAgICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmIGlzUGFyZW50KGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSkpIHtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dID0gZmlsdGVyQ2hpbGQoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5yZW1vdmVJdGVtKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSwgaWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyogaGFzQ2hpbGRyZW4gLSBmdW5jdGlvbiAqL1xuICBoYXNDaGlsZHJlbiA9IGRhdGFPYmplY3QgPT4gKChkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXVxuICAgICYmIGRhdGFPYmplY3RbdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW5dLmxlbmd0aCA+PSAxXG4gICkpO1xuXG4gIC8qIHJlbmRlck5vZGVzIC0gZnVuY3Rpb24gKi9cbiAgcmVuZGVyTm9kZXMoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcFZhbHVlLCBkYXRhTG9va1VwQ2hpbGRyZW4sIGljb25DbGFzcywgZGlzYWJsZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2hlY2tDaGlsZHJlbiA9IHRoaXMuaGFzQ2hpbGRyZW47XG5cbiAgICAvLyBSZWN1cnNpdmUgZnVuY3Rpb24gZm9yIGNvbGxlY3Rpbmcgbm9kZXM6XG4gICAgY29uc3QgbW91bnROb2RlcyA9IChub2RlTGlzdCkgPT4ge1xuICAgICAgY29uc3QgbGlzdCA9IFtdO1xuICAgICAgbm9kZUxpc3QuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAoIW5vZGVbZGF0YUxvb2tVcEtleV0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gTGVhZiBub2RlXG4gICAgICAgIGlmICghY2hlY2tDaGlsZHJlbihub2RlKSkge1xuICAgICAgICAgIGxpc3QucHVzaCggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jdGlvbi1wYXJlbi1uZXdsaW5lXG4gICAgICAgICAgICA8VHJlZU5vZGVcbiAgICAgICAgICAgICAgdGl0bGU9e25vZGVbZGF0YUxvb2tVcFZhbHVlXX1cbiAgICAgICAgICAgICAga2V5PXtub2RlW2RhdGFMb29rVXBLZXldfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2ljb25DbGFzc30gbGVhZi1ub2RlYH1cbiAgICAgICAgICAgICAgaWNvbj17PFRyZWVDaGVja2JveCBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+fVxuICAgICAgICAgICAgLz4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFBhcmVudCBub2RlXG4gICAgICAgICAgbGlzdC5wdXNoKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcbiAgICAgICAgICAgIDxUcmVlTm9kZVxuICAgICAgICAgICAgICB0aXRsZT17bm9kZVtkYXRhTG9va1VwVmFsdWVdfVxuICAgICAgICAgICAgICBrZXk9e25vZGVbZGF0YUxvb2tVcEtleV19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7aWNvbkNsYXNzfSBwYXJlbnQtbm9kZWB9XG4gICAgICAgICAgICAgIGljb249ezxUcmVlQ2hlY2tib3ggZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge21vdW50Tm9kZXMobm9kZVtkYXRhTG9va1VwQ2hpbGRyZW5dKX1cbiAgICAgICAgICAgIDwvVHJlZU5vZGU+KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBsaXN0O1xuICAgIH07XG4gICAgcmV0dXJuIG1vdW50Tm9kZXModGhpcy5wcm9wcy50cmVlRGF0YSk7XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBub2RlcyA9IHRoaXMucmVuZGVyTm9kZXMoKTtcbiAgICBjb25zdCBjbHNOYW1lID0gdGhpcy5wcm9wcy5jbGFzc05hbWUgPyBgJHt0aGlzLnByb3BzLmNsYXNzTmFtZX0gb2MtcmVhY3QtdHJlZWAgOiAnb2MtcmVhY3QtdHJlZSc7XG5cbiAgICBjb25zdCB7XG4gICAgICB0cmVlSWQsIGNsYXNzTmFtZSwgZGVmYXVsdEV4cGFuZGVkS2V5cywgZGVmYXVsdFNlbGVjdGVkS2V5cywgZGVmYXVsdENoZWNrZWRLZXlzLCBjaGVja2VkS2V5cyxcbiAgICAgIG9uRXhwYW5kLCBvblNlbGVjdCwgb25DaGVjaywgc2hvd0xpbmUsIHNob3dJY29uLCBjaGVja2FibGUsIHNlbGVjdGFibGUsIGRlZmF1bHRFeHBhbmRBbGwsXG4gICAgICBkcmFnZ2FibGUsIGRpc2FibGVkLCBzZWxlY3RlZEtleXMsIGV4cGFuZGVkS2V5cyxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwidHJlZS12aWV3LWNvbnRhaW5lclwiIGNsYXNzTmFtZT17Y2xzTmFtZX0gb25DbGljaz17dGhpcy5vbkNvbnRhaW5lckNsaWNrfT5cbiAgICAgICAgeyEhbm9kZXMubGVuZ3RoICYmXG4gICAgICAgIDxUcmVlXG4gICAgICAgICAgaWQ9e3RyZWVJZH1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICBkZWZhdWx0RXhwYW5kZWRLZXlzPXtkZWZhdWx0RXhwYW5kZWRLZXlzfVxuICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZEtleXM9e2RlZmF1bHRTZWxlY3RlZEtleXN9XG4gICAgICAgICAgZGVmYXVsdENoZWNrZWRLZXlzPXtkZWZhdWx0Q2hlY2tlZEtleXN9XG4gICAgICAgICAgY2hlY2tlZEtleXM9e2NoZWNrZWRLZXlzfVxuICAgICAgICAgIHNlbGVjdGVkS2V5cz17c2VsZWN0ZWRLZXlzfVxuICAgICAgICAgIGV4cGFuZGVkS2V5cz17ZXhwYW5kZWRLZXlzfVxuICAgICAgICAgIG9uRXhwYW5kPXtvbkV4cGFuZH1cbiAgICAgICAgICBvblNlbGVjdD17b25TZWxlY3R9XG4gICAgICAgICAgb25DaGVjaz17b25DaGVja31cbiAgICAgICAgICBvbkRyb3A9e3RoaXMub25EcmFnRHJvcH1cbiAgICAgICAgICBjaGVja2FibGU9e2NoZWNrYWJsZX1cbiAgICAgICAgICBzZWxlY3RhYmxlPXtzZWxlY3RhYmxlfVxuICAgICAgICAgIGRyYWdnYWJsZT17ZHJhZ2dhYmxlfVxuICAgICAgICAgIHNob3dMaW5lPXtzaG93TGluZX1cbiAgICAgICAgICBzaG93SWNvbj17c2hvd0ljb259XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIGRlZmF1bHRFeHBhbmRBbGw9e2RlZmF1bHRFeHBhbmRBbGx9XG4gICAgICAgID5cbiAgICAgICAgICB7bm9kZXN9XG4gICAgICAgIDwvVHJlZT5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19