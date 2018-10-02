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

var _checkboxIcon = require('./checkbox-icon.component');

var _checkboxIcon2 = _interopRequireDefault(_checkboxIcon);

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
      if (!_this.props.onDragDrop) throw new TypeError('onDragDrop callback is not defined');

      var dropKey = e.node.props.eventKey;
      var dragKey = e.dragNode.props.eventKey;

      var loop = function loop(data, key, callback) {
        data.forEach(function (item, index, arr) {
          if (item.key === key) return callback(item, index, arr);
          if (item.children) return loop(item.children, key, callback);
          return null;
        });
      };

      var newData = _this.props.treeData.slice();

      var dragObj = void 0;
      loop(newData, dragKey, function (item, index, arr) {
        arr.splice(index, 1);
        dragObj = item;
      });

      // .. item is dropped between 2 items
      if (e.dropToGap) {
        var ar = void 0;
        var i = void 0;
        loop(newData, dropKey, function (item, index, arr) {
          ar = arr;
          i = index;
        });
        ar.splice(i, 0, dragObj);
      } else {
        loop(newData, dropKey, function (item) {
          item.children = item.children || []; // eslint-disable-line no-param-reassign
          item.children.push(dragObj);
        });
      }

      _this.props.onDragDrop(newData);
    }, _this.isChildChecked = function (node) {
      var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var _this$props = _this.props,
          dataLookUpChildren = _this$props.dataLookUpChildren,
          dataLookUpKey = _this$props.dataLookUpKey;

      var children = arr.length ? arr : node[dataLookUpChildren];
      var found = children.find(function (child) {
        return _this.isChecked(child[dataLookUpKey]);
      });

      if (!found) {
        children.forEach(function (child) {
          if (child[dataLookUpChildren] && !found) {
            found = _this.isChildChecked(child, child[dataLookUpChildren]);
          }
        });
      }
      return !!found;
    }, _this.isChecked = function (key) {
      return _this.props.checkedKeys.includes(key) || _this.props.defaultCheckedKeys.includes(key);
    }, _this.hasChildren = function (dataObject) {
      return dataObject[_this.props.dataLookUpChildren] && dataObject[_this.props.dataLookUpChildren].length >= 1;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /* hasChildren - function */


  /* renderNodes - function */
  OCTreeView.prototype.renderNodes = function renderNodes() {
    var _this2 = this;

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
            className: '' + iconClass,
            icon: _react2.default.createElement(_checkboxIcon2.default, {
              checked: _this2.isChecked(node[dataLookUpKey]),
              halfChecked: false,
              disabled: disabled
            })
          }));
        } else {
          // Parent node
          var isHalfChecked = _this2.isChecked(node[dataLookUpKey]) ? false : _this2.isChildChecked(node);

          list.push( // eslint-disable-line function-paren-newline
          _react2.default.createElement(
            _rcTree.TreeNode,
            {
              title: node[dataLookUpValue],
              key: node[dataLookUpKey],
              className: '' + iconClass,
              icon: _react2.default.createElement(_checkboxIcon2.default, {
                checked: _this2.isChecked(node[dataLookUpKey]),
                halfChecked: isHalfChecked,
                disabled: disabled
              })
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
        disabled = _props2.disabled;


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
  className: ''
}, _temp2);
exports.default = OCTreeView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiT0NUcmVlVmlldyIsIm9uRHJhZ0Ryb3AiLCJlIiwicHJvcHMiLCJUeXBlRXJyb3IiLCJkcm9wS2V5Iiwibm9kZSIsImV2ZW50S2V5IiwiZHJhZ0tleSIsImRyYWdOb2RlIiwibG9vcCIsImRhdGEiLCJrZXkiLCJjYWxsYmFjayIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJhcnIiLCJjaGlsZHJlbiIsIm5ld0RhdGEiLCJ0cmVlRGF0YSIsInNsaWNlIiwiZHJhZ09iaiIsInNwbGljZSIsImRyb3BUb0dhcCIsImFyIiwiaSIsInB1c2giLCJpc0NoaWxkQ2hlY2tlZCIsImRhdGFMb29rVXBDaGlsZHJlbiIsImRhdGFMb29rVXBLZXkiLCJsZW5ndGgiLCJmb3VuZCIsImZpbmQiLCJpc0NoZWNrZWQiLCJjaGlsZCIsImNoZWNrZWRLZXlzIiwiaW5jbHVkZXMiLCJkZWZhdWx0Q2hlY2tlZEtleXMiLCJoYXNDaGlsZHJlbiIsImRhdGFPYmplY3QiLCJyZW5kZXJOb2RlcyIsImRhdGFMb29rVXBWYWx1ZSIsImljb25DbGFzcyIsImRpc2FibGVkIiwiY2hlY2tDaGlsZHJlbiIsIm1vdW50Tm9kZXMiLCJub2RlTGlzdCIsImxpc3QiLCJpc0hhbGZDaGVja2VkIiwicmVuZGVyIiwibm9kZXMiLCJjbHNOYW1lIiwiY2xhc3NOYW1lIiwidHJlZUlkIiwiZGVmYXVsdEV4cGFuZGVkS2V5cyIsImRlZmF1bHRTZWxlY3RlZEtleXMiLCJvbkV4cGFuZCIsIm9uU2VsZWN0Iiwib25DaGVjayIsInNob3dMaW5lIiwic2hvd0ljb24iLCJjaGVja2FibGUiLCJzZWxlY3RhYmxlIiwiZGVmYXVsdEV4cGFuZEFsbCIsImRyYWdnYWJsZSIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBOzs7QUFKQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFD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QVNTLFNBUlc7QUFTcEJuRSxjQUFZbUUsU0FUUTtBQVVwQlIsWUFBVSxLQVZVO0FBV3BCaEIsWUFBVSxLQVhVO0FBWXBCaUIsWUFBVSxJQVpVO0FBYXBCQyxhQUFXLEtBYlM7QUFjcEJHLGFBQVcsS0FkUztBQWVwQkYsY0FBWSxLQWZRO0FBZ0JwQkMsb0JBQWtCLEtBaEJFO0FBaUJwQjtBQUNBbEMsaUJBQWUsS0FsQks7QUFtQnBCWSxtQkFBaUIsUUFuQkc7QUFvQnBCYixzQkFBb0IsVUFwQkE7QUFxQnBCVCxZQUFVLEVBckJVO0FBc0JwQmdCLGVBQWEsRUF0Qk87QUF1QnBCaUIsYUFBVztBQXZCUyxDO2tCQTNCSHJELFUiLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBUcmVlLCB7IFRyZWVOb2RlIH0gZnJvbSAncmMtdHJlZSc7XG5pbXBvcnQgJ3JjLXRyZWUvYXNzZXRzL2luZGV4LmNzcyc7XG4vLyBPdmVycmlkZSBkZWZhdWx0cyByYy10cmVlIHN0eWxlc1xuaW1wb3J0ICcuL29jLXRyZWUtc3R5bGVzLnNjc3MnO1xuaW1wb3J0IENoZWNrYm94SWNvbiBmcm9tICcuL2NoZWNrYm94LWljb24uY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0NUcmVlVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHRyZWVJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWNvbkNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlZmF1bHRFeHBhbmRlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGRlZmF1bHRTZWxlY3RlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGRlZmF1bHRDaGVja2VkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgb25FeHBhbmQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoZWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkRyYWdEcm9wOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ljb246IFByb3BUeXBlcy5ib29sLFxuICAgIGNoZWNrYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0YWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJhZ2dhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgLy8gQ3VzdG9taXNhdGlvbiAtLSBkZWZpbmUgdGhlIGRhdGEgbG9va1VwS2V5cyBhbmQgbG9va1VwVmFsdWVzXG4gICAgdHJlZURhdGE6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxuICAgIGRhdGFMb29rVXBLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGVja2VkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB0cmVlSWQ6ICdkZWZhdWx0VHJlZScsXG4gICAgaWNvbkNsYXNzOiAnY2FyZXRzJyxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBbXSxcbiAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzOiBbXSxcbiAgICBkZWZhdWx0Q2hlY2tlZEtleXM6IFtdLFxuICAgIG9uRXhwYW5kOiB1bmRlZmluZWQsXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBvbkNoZWNrOiB1bmRlZmluZWQsXG4gICAgb25EcmFnRHJvcDogdW5kZWZpbmVkLFxuICAgIHNob3dMaW5lOiBmYWxzZSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgc2hvd0ljb246IHRydWUsXG4gICAgY2hlY2thYmxlOiBmYWxzZSxcbiAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgIHNlbGVjdGFibGU6IGZhbHNlLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IGZhbHNlLFxuICAgIC8vIEN1c3RvbXNcbiAgICBkYXRhTG9va1VwS2V5OiAna2V5JyxcbiAgICBkYXRhTG9va1VwVmFsdWU6ICdwYXJlbnQnLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogJ2NoaWxkcmVuJyxcbiAgICB0cmVlRGF0YTogW10sXG4gICAgY2hlY2tlZEtleXM6IFtdLFxuICAgIGNsYXNzTmFtZTogJycsXG4gIH07XG5cblxuICBvbkRyYWdEcm9wID0gKGUpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMub25EcmFnRHJvcCkgdGhyb3cgbmV3IFR5cGVFcnJvcignb25EcmFnRHJvcCBjYWxsYmFjayBpcyBub3QgZGVmaW5lZCcpO1xuXG4gICAgY29uc3QgZHJvcEtleSA9IGUubm9kZS5wcm9wcy5ldmVudEtleTtcbiAgICBjb25zdCBkcmFnS2V5ID0gZS5kcmFnTm9kZS5wcm9wcy5ldmVudEtleTtcblxuICAgIGNvbnN0IGxvb3AgPSAoZGF0YSwga2V5LCBjYWxsYmFjaykgPT4ge1xuICAgICAgZGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCwgYXJyKSA9PiB7XG4gICAgICAgIGlmIChpdGVtLmtleSA9PT0ga2V5KSByZXR1cm4gY2FsbGJhY2soaXRlbSwgaW5kZXgsIGFycik7XG4gICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSByZXR1cm4gbG9vcChpdGVtLmNoaWxkcmVuLCBrZXksIGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3QgbmV3RGF0YSA9IHRoaXMucHJvcHMudHJlZURhdGEuc2xpY2UoKTtcblxuICAgIGxldCBkcmFnT2JqO1xuICAgIGxvb3AobmV3RGF0YSwgZHJhZ0tleSwgKGl0ZW0sIGluZGV4LCBhcnIpID0+IHtcbiAgICAgIGFyci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgZHJhZ09iaiA9IGl0ZW07XG4gICAgfSk7XG5cbiAgICAvLyAuLiBpdGVtIGlzIGRyb3BwZWQgYmV0d2VlbiAyIGl0ZW1zXG4gICAgaWYgKGUuZHJvcFRvR2FwKSB7XG4gICAgICBsZXQgYXI7XG4gICAgICBsZXQgaTtcbiAgICAgIGxvb3AobmV3RGF0YSwgZHJvcEtleSwgKGl0ZW0sIGluZGV4LCBhcnIpID0+IHtcbiAgICAgICAgYXIgPSBhcnI7XG4gICAgICAgIGkgPSBpbmRleDtcbiAgICAgIH0pO1xuICAgICAgYXIuc3BsaWNlKGksIDAsIGRyYWdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb29wKG5ld0RhdGEsIGRyb3BLZXksIChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0uY2hpbGRyZW4gPSBpdGVtLmNoaWxkcmVuIHx8IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGl0ZW0uY2hpbGRyZW4ucHVzaChkcmFnT2JqKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMub25EcmFnRHJvcChuZXdEYXRhKTtcbiAgfTtcblxuICBpc0NoaWxkQ2hlY2tlZCA9IChub2RlLCBhcnIgPSBbXSkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YUxvb2tVcENoaWxkcmVuLCBkYXRhTG9va1VwS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNoaWxkcmVuID0gYXJyLmxlbmd0aCA/IGFyciA6IG5vZGVbZGF0YUxvb2tVcENoaWxkcmVuXTtcbiAgICBsZXQgZm91bmQgPSBjaGlsZHJlbi5maW5kKGNoaWxkID0+IHRoaXMuaXNDaGVja2VkKGNoaWxkW2RhdGFMb29rVXBLZXldKSk7XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICBpZiAoY2hpbGRbZGF0YUxvb2tVcENoaWxkcmVuXSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuaXNDaGlsZENoZWNrZWQoY2hpbGQsIGNoaWxkW2RhdGFMb29rVXBDaGlsZHJlbl0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuICEhZm91bmQ7XG4gIH07XG5cbiAgaXNDaGVja2VkID0ga2V5ID0+XG4gICAgdGhpcy5wcm9wcy5jaGVja2VkS2V5cy5pbmNsdWRlcyhrZXkpIHx8IHRoaXMucHJvcHMuZGVmYXVsdENoZWNrZWRLZXlzLmluY2x1ZGVzKGtleSk7XG5cbiAgLyogaGFzQ2hpbGRyZW4gLSBmdW5jdGlvbiAqL1xuICBoYXNDaGlsZHJlbiA9IGRhdGFPYmplY3QgPT4gKChkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXVxuICAgICYmIGRhdGFPYmplY3RbdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW5dLmxlbmd0aCA+PSAxXG4gICkpO1xuXG4gIC8qIHJlbmRlck5vZGVzIC0gZnVuY3Rpb24gKi9cbiAgcmVuZGVyTm9kZXMoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcFZhbHVlLCBkYXRhTG9va1VwQ2hpbGRyZW4sIGljb25DbGFzcywgZGlzYWJsZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2hlY2tDaGlsZHJlbiA9IHRoaXMuaGFzQ2hpbGRyZW47XG5cbiAgICAvLyBSZWN1cnNpdmUgZnVuY3Rpb24gZm9yIGNvbGxlY3Rpbmcgbm9kZXM6XG4gICAgY29uc3QgbW91bnROb2RlcyA9IChub2RlTGlzdCkgPT4ge1xuICAgICAgY29uc3QgbGlzdCA9IFtdO1xuICAgICAgbm9kZUxpc3QuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAoIW5vZGVbZGF0YUxvb2tVcEtleV0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gTGVhZiBub2RlXG4gICAgICAgIGlmICghY2hlY2tDaGlsZHJlbihub2RlKSkge1xuICAgICAgICAgIGxpc3QucHVzaCggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jdGlvbi1wYXJlbi1uZXdsaW5lXG4gICAgICAgICAgICA8VHJlZU5vZGVcbiAgICAgICAgICAgICAgdGl0bGU9e25vZGVbZGF0YUxvb2tVcFZhbHVlXX1cbiAgICAgICAgICAgICAga2V5PXtub2RlW2RhdGFMb29rVXBLZXldfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2ljb25DbGFzc31gfVxuICAgICAgICAgICAgICBpY29uPXtcbiAgICAgICAgICAgICAgICA8Q2hlY2tib3hJY29uXG4gICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLmlzQ2hlY2tlZChub2RlW2RhdGFMb29rVXBLZXldKX1cbiAgICAgICAgICAgICAgICAgIGhhbGZDaGVja2VkPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUGFyZW50IG5vZGVcbiAgICAgICAgICBjb25zdCBpc0hhbGZDaGVja2VkID1cbiAgICAgICAgICAgIHRoaXMuaXNDaGVja2VkKG5vZGVbZGF0YUxvb2tVcEtleV0pID8gZmFsc2UgOiB0aGlzLmlzQ2hpbGRDaGVja2VkKG5vZGUpO1xuXG4gICAgICAgICAgbGlzdC5wdXNoKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcbiAgICAgICAgICAgIDxUcmVlTm9kZVxuICAgICAgICAgICAgICB0aXRsZT17bm9kZVtkYXRhTG9va1VwVmFsdWVdfVxuICAgICAgICAgICAgICBrZXk9e25vZGVbZGF0YUxvb2tVcEtleV19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7aWNvbkNsYXNzfWB9XG4gICAgICAgICAgICAgIGljb249e1xuICAgICAgICAgICAgICAgIDxDaGVja2JveEljb25cbiAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuaXNDaGVja2VkKG5vZGVbZGF0YUxvb2tVcEtleV0pfVxuICAgICAgICAgICAgICAgICAgaGFsZkNoZWNrZWQ9e2lzSGFsZkNoZWNrZWR9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bW91bnROb2Rlcyhub2RlW2RhdGFMb29rVXBDaGlsZHJlbl0pfVxuICAgICAgICAgICAgPC9UcmVlTm9kZT4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfTtcbiAgICByZXR1cm4gbW91bnROb2Rlcyh0aGlzLnByb3BzLnRyZWVEYXRhKTtcbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5yZW5kZXJOb2RlcygpO1xuICAgIGNvbnN0IGNsc05hbWUgPSB0aGlzLnByb3BzLmNsYXNzTmFtZSA/IGAke3RoaXMucHJvcHMuY2xhc3NOYW1lfSBvYy1yZWFjdC10cmVlYCA6ICdvYy1yZWFjdC10cmVlJztcbiAgICBjb25zdCB7XG4gICAgICB0cmVlSWQsIGNsYXNzTmFtZSwgZGVmYXVsdEV4cGFuZGVkS2V5cywgZGVmYXVsdFNlbGVjdGVkS2V5cywgZGVmYXVsdENoZWNrZWRLZXlzLCBjaGVja2VkS2V5cyxcbiAgICAgIG9uRXhwYW5kLCBvblNlbGVjdCwgb25DaGVjaywgc2hvd0xpbmUsIHNob3dJY29uLCBjaGVja2FibGUsIHNlbGVjdGFibGUsIGRlZmF1bHRFeHBhbmRBbGwsXG4gICAgICBkcmFnZ2FibGUsIGRpc2FibGVkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJ0cmVlLXZpZXctY29udGFpbmVyXCIgY2xhc3NOYW1lPXtjbHNOYW1lfT5cbiAgICAgICAgeyEhbm9kZXMubGVuZ3RoICYmXG4gICAgICAgIDxUcmVlXG4gICAgICAgICAgaWQ9e3RyZWVJZH1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICBkZWZhdWx0RXhwYW5kZWRLZXlzPXtkZWZhdWx0RXhwYW5kZWRLZXlzfVxuICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZEtleXM9e2RlZmF1bHRTZWxlY3RlZEtleXN9XG4gICAgICAgICAgZGVmYXVsdENoZWNrZWRLZXlzPXtkZWZhdWx0Q2hlY2tlZEtleXN9XG4gICAgICAgICAgY2hlY2tlZEtleXM9e2NoZWNrZWRLZXlzfVxuICAgICAgICAgIG9uRXhwYW5kPXtvbkV4cGFuZH1cbiAgICAgICAgICBvblNlbGVjdD17b25TZWxlY3R9XG4gICAgICAgICAgb25DaGVjaz17b25DaGVja31cbiAgICAgICAgICBzaG93TGluZT17c2hvd0xpbmV9XG4gICAgICAgICAgc2hvd0ljb249e3Nob3dJY29ufVxuICAgICAgICAgIGNoZWNrYWJsZT17Y2hlY2thYmxlfVxuICAgICAgICAgIHNlbGVjdGFibGU9e3NlbGVjdGFibGV9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIGRyYWdnYWJsZT17ZHJhZ2dhYmxlfVxuICAgICAgICAgIGRlZmF1bHRFeHBhbmRBbGw9e2RlZmF1bHRFeHBhbmRBbGx9XG4gICAgICAgICAgb25Ecm9wPXt0aGlzLm9uRHJhZ0Ryb3B9XG4gICAgICAgID5cbiAgICAgICAgICB7bm9kZXN9XG4gICAgICAgIDwvVHJlZT5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19