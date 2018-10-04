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
    }, _this.hasChildren = function (dataObject) {
      return dataObject[_this.props.dataLookUpChildren] && dataObject[_this.props.dataLookUpChildren].length >= 1;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

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
            className: '' + iconClass,
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
              className: '' + iconClass,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiT0NUcmVlVmlldyIsIm9uRHJhZ0Ryb3AiLCJlIiwicHJvcHMiLCJUeXBlRXJyb3IiLCJkcm9wS2V5Iiwibm9kZSIsImV2ZW50S2V5IiwiZHJhZ0tleSIsImRyYWdOb2RlIiwibG9vcCIsImRhdGEiLCJrZXkiLCJjYWxsYmFjayIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJhcnIiLCJjaGlsZHJlbiIsIm5ld0RhdGEiLCJ0cmVlRGF0YSIsInNsaWNlIiwiZHJhZ09iaiIsInNwbGljZSIsImRyb3BUb0dhcCIsImFyIiwiaSIsInB1c2giLCJoYXNDaGlsZHJlbiIsImRhdGFPYmplY3QiLCJkYXRhTG9va1VwQ2hpbGRyZW4iLCJsZW5ndGgiLCJyZW5kZXJOb2RlcyIsImRhdGFMb29rVXBLZXkiLCJkYXRhTG9va1VwVmFsdWUiLCJpY29uQ2xhc3MiLCJkaXNhYmxlZCIsImNoZWNrQ2hpbGRyZW4iLCJtb3VudE5vZGVzIiwibm9kZUxpc3QiLCJsaXN0IiwicmVuZGVyIiwibm9kZXMiLCJjbHNOYW1lIiwiY2xhc3NOYW1lIiwidHJlZUlkIiwiZGVmYXVsdEV4cGFuZGVkS2V5cyIsImRlZmF1bHRTZWxlY3RlZEtleXMiLCJkZWZhdWx0Q2hlY2tlZEtleXMiLCJjaGVja2VkS2V5cyIsIm9uRXhwYW5kIiwib25TZWxlY3QiLCJvbkNoZWNrIiwic2hvd0xpbmUiLCJzaG93SWNvbiIsImNoZWNrYWJsZSIsInNlbGVjdGFibGUiLCJkZWZhdWx0RXhwYW5kQWxsIiwiZHJhZ2dhYmxlIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBSUE7OztBQUpBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozs7OztnS0FxRG5CQyxVLEdBQWEsVUFBQ0MsQ0FBRCxFQUFPO0FBQ2xCLFVBQUksQ0FBQyxNQUFLQyxLQUFMLENBQVdGLFVBQWhCLEVBQTRCLE1BQU0sSUFBSUcsU0FBSixDQUFjLG9DQUFkLENBQU47QUFDNUIsVUFBTUMsVUFBVUgsRUFBRUksSUFBRixDQUFPSCxLQUFQLENBQWFJLFFBQTdCO0FBQ0EsVUFBTUMsVUFBVU4sRUFBRU8sUUFBRixDQUFXTixLQUFYLENBQWlCSSxRQUFqQzs7QUFFQSxVQUFNRyxPQUFPLFNBQVBBLElBQU8sQ0FBQ0MsSUFBRCxFQUFPQyxHQUFQLEVBQVlDLFFBQVosRUFBeUI7QUFDcENGLGFBQUtHLE9BQUwsQ0FBYSxVQUFDQyxJQUFELEVBQU9DLEtBQVAsRUFBY0MsR0FBZCxFQUFzQjtBQUNqQyxjQUFJRixLQUFLSCxHQUFMLEtBQWFBLEdBQWpCLEVBQXNCLE9BQU9DLFNBQVNFLElBQVQsRUFBZUMsS0FBZixFQUFzQkMsR0FBdEIsQ0FBUDtBQUN0QixjQUFJRixLQUFLRyxRQUFULEVBQW1CLE9BQU9SLEtBQUtLLEtBQUtHLFFBQVYsRUFBb0JOLEdBQXBCLEVBQXlCQyxRQUF6QixDQUFQO0FBQ25CLGlCQUFPLElBQVA7QUFDRCxTQUpEO0FBS0QsT0FORDs7QUFRQSxVQUFNTSxVQUFVLE1BQUtoQixLQUFMLENBQVdpQixRQUFYLENBQW9CQyxLQUFwQixFQUFoQjs7QUFFQSxVQUFJQyxnQkFBSjtBQUNBWixXQUFLUyxPQUFMLEVBQWNYLE9BQWQsRUFBdUIsVUFBQ08sSUFBRCxFQUFPQyxLQUFQLEVBQWNDLEdBQWQsRUFBc0I7QUFDM0NBLFlBQUlNLE1BQUosQ0FBV1AsS0FBWCxFQUFrQixDQUFsQjtBQUNBTSxrQkFBVVAsSUFBVjtBQUNELE9BSEQ7O0FBS0E7QUFDQSxVQUFJYixFQUFFc0IsU0FBTixFQUFpQjtBQUNmLFlBQUlDLFdBQUo7QUFDQSxZQUFJQyxVQUFKO0FBQ0FoQixhQUFLUyxPQUFMLEVBQWNkLE9BQWQsRUFBdUIsVUFBQ1UsSUFBRCxFQUFPQyxLQUFQLEVBQWNDLEdBQWQsRUFBc0I7QUFDM0NRLGVBQUtSLEdBQUw7QUFDQVMsY0FBSVYsS0FBSjtBQUNELFNBSEQ7QUFJQVMsV0FBR0YsTUFBSCxDQUFVRyxDQUFWLEVBQWEsQ0FBYixFQUFnQkosT0FBaEI7QUFDRCxPQVJELE1BUU87QUFDTFosYUFBS1MsT0FBTCxFQUFjZCxPQUFkLEVBQXVCLFVBQUNVLElBQUQsRUFBVTtBQUMvQkEsZUFBS0csUUFBTCxHQUFnQkgsS0FBS0csUUFBTCxJQUFpQixFQUFqQyxDQUQrQixDQUNNO0FBQ3JDSCxlQUFLRyxRQUFMLENBQWNTLElBQWQsQ0FBbUJMLE9BQW5CO0FBQ0QsU0FIRDtBQUlEOztBQUVELFlBQUtuQixLQUFMLENBQVdGLFVBQVgsQ0FBc0JrQixPQUF0QjtBQUNELEssUUFHRFMsVyxHQUFjO0FBQUEsYUFBZ0JDLFdBQVcsTUFBSzFCLEtBQUwsQ0FBVzJCLGtCQUF0QixLQUN6QkQsV0FBVyxNQUFLMUIsS0FBTCxDQUFXMkIsa0JBQXRCLEVBQTBDQyxNQUExQyxJQUFvRCxDQUQzQztBQUFBLEs7OztBQURkOzs7QUFLQTt1QkFDQUMsVywwQkFBYztBQUFBLGlCQUdSLEtBQUs3QixLQUhHO0FBQUEsUUFFVjhCLGFBRlUsVUFFVkEsYUFGVTtBQUFBLFFBRUtDLGVBRkwsVUFFS0EsZUFGTDtBQUFBLFFBRXNCSixrQkFGdEIsVUFFc0JBLGtCQUZ0QjtBQUFBLFFBRTBDSyxTQUYxQyxVQUUwQ0EsU0FGMUM7QUFBQSxRQUVxREMsUUFGckQsVUFFcURBLFFBRnJEOztBQUlaLFFBQU1DLGdCQUFnQixLQUFLVCxXQUEzQjs7QUFFQTtBQUNBLFFBQU1VLGFBQWEsU0FBYkEsVUFBYSxDQUFDQyxRQUFELEVBQWM7QUFDL0IsVUFBTUMsT0FBTyxFQUFiO0FBQ0FELGVBQVN6QixPQUFULENBQWlCLFVBQUNSLElBQUQsRUFBVTtBQUN6QixZQUFJLENBQUNBLEtBQUsyQixhQUFMLENBQUwsRUFBMEIsT0FBTyxLQUFQO0FBQzFCO0FBQ0EsWUFBSSxDQUFDSSxjQUFjL0IsSUFBZCxDQUFMLEVBQTBCO0FBQ3hCa0MsZUFBS2IsSUFBTCxFQUFXO0FBQ1Q7QUFDRSxtQkFBT3JCLEtBQUs0QixlQUFMLENBRFQ7QUFFRSxpQkFBSzVCLEtBQUsyQixhQUFMLENBRlA7QUFHRSw0QkFBY0UsU0FIaEI7QUFJRSxrQkFBTSx3REFBYyxVQUFVQyxRQUF4QjtBQUpSLFlBREY7QUFPRCxTQVJELE1BUU87QUFDTDtBQUNBSSxlQUFLYixJQUFMLEVBQVc7QUFDVDtBQUFBO0FBQUE7QUFDRSxxQkFBT3JCLEtBQUs0QixlQUFMLENBRFQ7QUFFRSxtQkFBSzVCLEtBQUsyQixhQUFMLENBRlA7QUFHRSw4QkFBY0UsU0FIaEI7QUFJRSxvQkFBTSx3REFBYyxVQUFVQyxRQUF4QjtBQUpSO0FBTUdFLHVCQUFXaEMsS0FBS3dCLGtCQUFMLENBQVg7QUFOSCxXQURGO0FBU0Q7QUFDRCxlQUFPLEtBQVA7QUFDRCxPQXhCRDtBQXlCQSxhQUFPVSxJQUFQO0FBQ0QsS0E1QkQ7QUE2QkEsV0FBT0YsV0FBVyxLQUFLbkMsS0FBTCxDQUFXaUIsUUFBdEIsQ0FBUDtBQUNELEc7O3VCQUdEcUIsTSxxQkFBUztBQUNQLFFBQU1DLFFBQVEsS0FBS1YsV0FBTCxFQUFkO0FBQ0EsUUFBTVcsVUFBVSxLQUFLeEMsS0FBTCxDQUFXeUMsU0FBWCxHQUEwQixLQUFLekMsS0FBTCxDQUFXeUMsU0FBckMsc0JBQWlFLGVBQWpGO0FBRk8sa0JBT0gsS0FBS3pDLEtBUEY7QUFBQSxRQUlMMEMsTUFKSyxXQUlMQSxNQUpLO0FBQUEsUUFJR0QsU0FKSCxXQUlHQSxTQUpIO0FBQUEsUUFJY0UsbUJBSmQsV0FJY0EsbUJBSmQ7QUFBQSxRQUltQ0MsbUJBSm5DLFdBSW1DQSxtQkFKbkM7QUFBQSxRQUl3REMsa0JBSnhELFdBSXdEQSxrQkFKeEQ7QUFBQSxRQUk0RUMsV0FKNUUsV0FJNEVBLFdBSjVFO0FBQUEsUUFLTEMsUUFMSyxXQUtMQSxRQUxLO0FBQUEsUUFLS0MsUUFMTCxXQUtLQSxRQUxMO0FBQUEsUUFLZUMsT0FMZixXQUtlQSxPQUxmO0FBQUEsUUFLd0JDLFFBTHhCLFdBS3dCQSxRQUx4QjtBQUFBLFFBS2tDQyxRQUxsQyxXQUtrQ0EsUUFMbEM7QUFBQSxRQUs0Q0MsU0FMNUMsV0FLNENBLFNBTDVDO0FBQUEsUUFLdURDLFVBTHZELFdBS3VEQSxVQUx2RDtBQUFBLFFBS21FQyxnQkFMbkUsV0FLbUVBLGdCQUxuRTtBQUFBLFFBTUxDLFNBTkssV0FNTEEsU0FOSztBQUFBLFFBTU10QixRQU5OLFdBTU1BLFFBTk47OztBQVNQLFdBQ0U7QUFBQTtBQUFBLFFBQUssSUFBRyxxQkFBUixFQUE4QixXQUFXTyxPQUF6QztBQUNHLE9BQUMsQ0FBQ0QsTUFBTVgsTUFBUixJQUNEO0FBQUE7QUFBQTtBQUNFLGNBQUljLE1BRE47QUFFRSxxQkFBV0QsU0FGYjtBQUdFLCtCQUFxQkUsbUJBSHZCO0FBSUUsK0JBQXFCQyxtQkFKdkI7QUFLRSw4QkFBb0JDLGtCQUx0QjtBQU1FLHVCQUFhQyxXQU5mO0FBT0Usb0JBQVVDLFFBUFo7QUFRRSxvQkFBVUMsUUFSWjtBQVNFLG1CQUFTQyxPQVRYO0FBVUUsb0JBQVVDLFFBVlo7QUFXRSxvQkFBVUMsUUFYWjtBQVlFLHFCQUFXQyxTQVpiO0FBYUUsc0JBQVlDLFVBYmQ7QUFjRSxvQkFBVXBCLFFBZFo7QUFlRSxxQkFBV3NCLFNBZmI7QUFnQkUsNEJBQWtCRCxnQkFoQnBCO0FBaUJFLGtCQUFRLEtBQUt4RDtBQWpCZjtBQW1CR3lDO0FBbkJIO0FBRkYsS0FERjtBQTJCRCxHOzs7RUEvS3FDLGdCQUFNaUIsYSxVQTJCckNDLFksR0FBZTtBQUNwQmYsVUFBUSxhQURZO0FBRXBCVixhQUFXLFFBRlM7QUFHcEJXLHVCQUFxQixFQUhEO0FBSXBCQyx1QkFBcUIsRUFKRDtBQUtwQkMsc0JBQW9CLEVBTEE7QUFNcEJFLFlBQVVXLFNBTlU7QUFPcEJWLFlBQVVVLFNBUFU7QUFRcEJULFdBQVNTLFNBUlc7QUFTcEI1RCxjQUFZNEQsU0FUUTtBQVVwQlIsWUFBVSxLQVZVO0FBV3BCakIsWUFBVSxLQVhVO0FBWXBCa0IsWUFBVSxJQVpVO0FBYXBCQyxhQUFXLEtBYlM7QUFjcEJHLGFBQVcsS0FkUztBQWVwQkYsY0FBWSxLQWZRO0FBZ0JwQkMsb0JBQWtCLEtBaEJFO0FBaUJwQjtBQUNBeEIsaUJBQWUsS0FsQks7QUFtQnBCQyxtQkFBaUIsUUFuQkc7QUFvQnBCSixzQkFBb0IsVUFwQkE7QUFxQnBCVixZQUFVLEVBckJVO0FBc0JwQjZCLGVBQWEsRUF0Qk87QUF1QnBCTCxhQUFXO0FBdkJTLEM7a0JBM0JINUMsVSIsImZpbGUiOiJ0cmVlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFRyZWUsIHsgVHJlZU5vZGUgfSBmcm9tICdyYy10cmVlJztcbmltcG9ydCAncmMtdHJlZS9hc3NldHMvaW5kZXguY3NzJztcbi8vIE92ZXJyaWRlIGRlZmF1bHRzIHJjLXRyZWUgc3R5bGVzXG5pbXBvcnQgJy4vb2MtdHJlZS1zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgVHJlZUNoZWNrYm94IGZyb20gJy4vdHJlZS1jaGVja2JveC5jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPQ1RyZWVWaWV3IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgdHJlZUlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpY29uQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdEV4cGFuZGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgZGVmYXVsdFNlbGVjdGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgZGVmYXVsdENoZWNrZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBvbkV4cGFuZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRHJhZ0Ryb3A6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dMaW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93SWNvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hlY2thYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkcmFnZ2FibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAvLyBDdXN0b21pc2F0aW9uIC0tIGRlZmluZSB0aGUgZGF0YSBsb29rVXBLZXlzIGFuZCBsb29rVXBWYWx1ZXNcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksXG4gICAgZGF0YUxvb2tVcEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXRhTG9va1VwVmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoZWNrZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHRyZWVJZDogJ2RlZmF1bHRUcmVlJyxcbiAgICBpY29uQ2xhc3M6ICdjYXJldHMnLFxuICAgIGRlZmF1bHRFeHBhbmRlZEtleXM6IFtdLFxuICAgIGRlZmF1bHRTZWxlY3RlZEtleXM6IFtdLFxuICAgIGRlZmF1bHRDaGVja2VkS2V5czogW10sXG4gICAgb25FeHBhbmQ6IHVuZGVmaW5lZCxcbiAgICBvblNlbGVjdDogdW5kZWZpbmVkLFxuICAgIG9uQ2hlY2s6IHVuZGVmaW5lZCxcbiAgICBvbkRyYWdEcm9wOiB1bmRlZmluZWQsXG4gICAgc2hvd0xpbmU6IGZhbHNlLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBzaG93SWNvbjogdHJ1ZSxcbiAgICBjaGVja2FibGU6IGZhbHNlLFxuICAgIGRyYWdnYWJsZTogZmFsc2UsXG4gICAgc2VsZWN0YWJsZTogZmFsc2UsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogZmFsc2UsXG4gICAgLy8gQ3VzdG9tc1xuICAgIGRhdGFMb29rVXBLZXk6ICdrZXknLFxuICAgIGRhdGFMb29rVXBWYWx1ZTogJ3BhcmVudCcsXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiAnY2hpbGRyZW4nLFxuICAgIHRyZWVEYXRhOiBbXSxcbiAgICBjaGVja2VkS2V5czogW10sXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgfTtcblxuICBvbkRyYWdEcm9wID0gKGUpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMub25EcmFnRHJvcCkgdGhyb3cgbmV3IFR5cGVFcnJvcignb25EcmFnRHJvcCBjYWxsYmFjayBpcyBub3QgZGVmaW5lZCcpO1xuICAgIGNvbnN0IGRyb3BLZXkgPSBlLm5vZGUucHJvcHMuZXZlbnRLZXk7XG4gICAgY29uc3QgZHJhZ0tleSA9IGUuZHJhZ05vZGUucHJvcHMuZXZlbnRLZXk7XG5cbiAgICBjb25zdCBsb29wID0gKGRhdGEsIGtleSwgY2FsbGJhY2spID0+IHtcbiAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgsIGFycikgPT4ge1xuICAgICAgICBpZiAoaXRlbS5rZXkgPT09IGtleSkgcmV0dXJuIGNhbGxiYWNrKGl0ZW0sIGluZGV4LCBhcnIpO1xuICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbikgcmV0dXJuIGxvb3AoaXRlbS5jaGlsZHJlbiwga2V5LCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG5ld0RhdGEgPSB0aGlzLnByb3BzLnRyZWVEYXRhLnNsaWNlKCk7XG5cbiAgICBsZXQgZHJhZ09iajtcbiAgICBsb29wKG5ld0RhdGEsIGRyYWdLZXksIChpdGVtLCBpbmRleCwgYXJyKSA9PiB7XG4gICAgICBhcnIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGRyYWdPYmogPSBpdGVtO1xuICAgIH0pO1xuXG4gICAgLy8gLi4gaXRlbSBpcyBkcm9wcGVkIGJldHdlZW4gMiBpdGVtc1xuICAgIGlmIChlLmRyb3BUb0dhcCkge1xuICAgICAgbGV0IGFyO1xuICAgICAgbGV0IGk7XG4gICAgICBsb29wKG5ld0RhdGEsIGRyb3BLZXksIChpdGVtLCBpbmRleCwgYXJyKSA9PiB7XG4gICAgICAgIGFyID0gYXJyO1xuICAgICAgICBpID0gaW5kZXg7XG4gICAgICB9KTtcbiAgICAgIGFyLnNwbGljZShpLCAwLCBkcmFnT2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9vcChuZXdEYXRhLCBkcm9wS2V5LCAoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLmNoaWxkcmVuID0gaXRlbS5jaGlsZHJlbiB8fCBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBpdGVtLmNoaWxkcmVuLnB1c2goZHJhZ09iaik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLm9uRHJhZ0Ryb3AobmV3RGF0YSk7XG4gIH07XG5cbiAgLyogaGFzQ2hpbGRyZW4gLSBmdW5jdGlvbiAqL1xuICBoYXNDaGlsZHJlbiA9IGRhdGFPYmplY3QgPT4gKChkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXVxuICAgICYmIGRhdGFPYmplY3RbdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW5dLmxlbmd0aCA+PSAxXG4gICkpO1xuXG4gIC8qIHJlbmRlck5vZGVzIC0gZnVuY3Rpb24gKi9cbiAgcmVuZGVyTm9kZXMoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcFZhbHVlLCBkYXRhTG9va1VwQ2hpbGRyZW4sIGljb25DbGFzcywgZGlzYWJsZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2hlY2tDaGlsZHJlbiA9IHRoaXMuaGFzQ2hpbGRyZW47XG5cbiAgICAvLyBSZWN1cnNpdmUgZnVuY3Rpb24gZm9yIGNvbGxlY3Rpbmcgbm9kZXM6XG4gICAgY29uc3QgbW91bnROb2RlcyA9IChub2RlTGlzdCkgPT4ge1xuICAgICAgY29uc3QgbGlzdCA9IFtdO1xuICAgICAgbm9kZUxpc3QuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAoIW5vZGVbZGF0YUxvb2tVcEtleV0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gTGVhZiBub2RlXG4gICAgICAgIGlmICghY2hlY2tDaGlsZHJlbihub2RlKSkge1xuICAgICAgICAgIGxpc3QucHVzaCggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jdGlvbi1wYXJlbi1uZXdsaW5lXG4gICAgICAgICAgICA8VHJlZU5vZGVcbiAgICAgICAgICAgICAgdGl0bGU9e25vZGVbZGF0YUxvb2tVcFZhbHVlXX1cbiAgICAgICAgICAgICAga2V5PXtub2RlW2RhdGFMb29rVXBLZXldfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2ljb25DbGFzc31gfVxuICAgICAgICAgICAgICBpY29uPXs8VHJlZUNoZWNrYm94IGRpc2FibGVkPXtkaXNhYmxlZH0gLz59XG4gICAgICAgICAgICAvPik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUGFyZW50IG5vZGVcbiAgICAgICAgICBsaXN0LnB1c2goIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuY3Rpb24tcGFyZW4tbmV3bGluZVxuICAgICAgICAgICAgPFRyZWVOb2RlXG4gICAgICAgICAgICAgIHRpdGxlPXtub2RlW2RhdGFMb29rVXBWYWx1ZV19XG4gICAgICAgICAgICAgIGtleT17bm9kZVtkYXRhTG9va1VwS2V5XX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtpY29uQ2xhc3N9YH1cbiAgICAgICAgICAgICAgaWNvbj17PFRyZWVDaGVja2JveCBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bW91bnROb2Rlcyhub2RlW2RhdGFMb29rVXBDaGlsZHJlbl0pfVxuICAgICAgICAgICAgPC9UcmVlTm9kZT4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfTtcbiAgICByZXR1cm4gbW91bnROb2Rlcyh0aGlzLnByb3BzLnRyZWVEYXRhKTtcbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5yZW5kZXJOb2RlcygpO1xuICAgIGNvbnN0IGNsc05hbWUgPSB0aGlzLnByb3BzLmNsYXNzTmFtZSA/IGAke3RoaXMucHJvcHMuY2xhc3NOYW1lfSBvYy1yZWFjdC10cmVlYCA6ICdvYy1yZWFjdC10cmVlJztcbiAgICBjb25zdCB7XG4gICAgICB0cmVlSWQsIGNsYXNzTmFtZSwgZGVmYXVsdEV4cGFuZGVkS2V5cywgZGVmYXVsdFNlbGVjdGVkS2V5cywgZGVmYXVsdENoZWNrZWRLZXlzLCBjaGVja2VkS2V5cyxcbiAgICAgIG9uRXhwYW5kLCBvblNlbGVjdCwgb25DaGVjaywgc2hvd0xpbmUsIHNob3dJY29uLCBjaGVja2FibGUsIHNlbGVjdGFibGUsIGRlZmF1bHRFeHBhbmRBbGwsXG4gICAgICBkcmFnZ2FibGUsIGRpc2FibGVkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJ0cmVlLXZpZXctY29udGFpbmVyXCIgY2xhc3NOYW1lPXtjbHNOYW1lfT5cbiAgICAgICAgeyEhbm9kZXMubGVuZ3RoICYmXG4gICAgICAgIDxUcmVlXG4gICAgICAgICAgaWQ9e3RyZWVJZH1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICBkZWZhdWx0RXhwYW5kZWRLZXlzPXtkZWZhdWx0RXhwYW5kZWRLZXlzfVxuICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZEtleXM9e2RlZmF1bHRTZWxlY3RlZEtleXN9XG4gICAgICAgICAgZGVmYXVsdENoZWNrZWRLZXlzPXtkZWZhdWx0Q2hlY2tlZEtleXN9XG4gICAgICAgICAgY2hlY2tlZEtleXM9e2NoZWNrZWRLZXlzfVxuICAgICAgICAgIG9uRXhwYW5kPXtvbkV4cGFuZH1cbiAgICAgICAgICBvblNlbGVjdD17b25TZWxlY3R9XG4gICAgICAgICAgb25DaGVjaz17b25DaGVja31cbiAgICAgICAgICBzaG93TGluZT17c2hvd0xpbmV9XG4gICAgICAgICAgc2hvd0ljb249e3Nob3dJY29ufVxuICAgICAgICAgIGNoZWNrYWJsZT17Y2hlY2thYmxlfVxuICAgICAgICAgIHNlbGVjdGFibGU9e3NlbGVjdGFibGV9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIGRyYWdnYWJsZT17ZHJhZ2dhYmxlfVxuICAgICAgICAgIGRlZmF1bHRFeHBhbmRBbGw9e2RlZmF1bHRFeHBhbmRBbGx9XG4gICAgICAgICAgb25Ecm9wPXt0aGlzLm9uRHJhZ0Ryb3B9XG4gICAgICAgID5cbiAgICAgICAgICB7bm9kZXN9XG4gICAgICAgIDwvVHJlZT5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19