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
    var clsName = this.props.treeClass ? this.props.treeClass + ' oc-react-tree' : 'oc-react-tree';
    var _props2 = this.props,
        treeId = _props2.treeId,
        treeClass = _props2.treeClass,
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
          className: treeClass,
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
  treeClass: '',
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
  checkedKeys: []
}, _temp2);
exports.default = OCTreeView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiT0NUcmVlVmlldyIsIm9uRHJhZ0Ryb3AiLCJlIiwicHJvcHMiLCJUeXBlRXJyb3IiLCJkcm9wS2V5Iiwibm9kZSIsImV2ZW50S2V5IiwiZHJhZ0tleSIsImRyYWdOb2RlIiwibG9vcCIsImRhdGEiLCJrZXkiLCJjYWxsYmFjayIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJhcnIiLCJjaGlsZHJlbiIsIm5ld0RhdGEiLCJ0cmVlRGF0YSIsInNsaWNlIiwiZHJhZ09iaiIsInNwbGljZSIsImRyb3BUb0dhcCIsImFyIiwiaSIsInB1c2giLCJpc0NoaWxkQ2hlY2tlZCIsImRhdGFMb29rVXBDaGlsZHJlbiIsImRhdGFMb29rVXBLZXkiLCJsZW5ndGgiLCJmb3VuZCIsImZpbmQiLCJpc0NoZWNrZWQiLCJjaGlsZCIsImNoZWNrZWRLZXlzIiwiaW5jbHVkZXMiLCJkZWZhdWx0Q2hlY2tlZEtleXMiLCJoYXNDaGlsZHJlbiIsImRhdGFPYmplY3QiLCJyZW5kZXJOb2RlcyIsImRhdGFMb29rVXBWYWx1ZSIsImljb25DbGFzcyIsImRpc2FibGVkIiwiY2hlY2tDaGlsZHJlbiIsIm1vdW50Tm9kZXMiLCJub2RlTGlzdCIsImxpc3QiLCJpc0hhbGZDaGVja2VkIiwicmVuZGVyIiwibm9kZXMiLCJjbHNOYW1lIiwidHJlZUNsYXNzIiwidHJlZUlkIiwiZGVmYXVsdEV4cGFuZGVkS2V5cyIsImRlZmF1bHRTZWxlY3RlZEtleXMiLCJvbkV4cGFuZCIsIm9uU2VsZWN0Iiwib25DaGVjayIsInNob3dMaW5lIiwic2hvd0ljb24iLCJjaGVja2FibGUiLCJzZWxlY3RhYmxlIiwiZGVmYXVsdEV4cGFuZEFsbCIsImRyYWdnYWJsZSIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBOzs7QUFKQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxVOzs7Ozs7Ozs7Ozs7Z0tBc0RuQkMsVSxHQUFhLFVBQUNDLENBQUQsRUFBTztBQUNsQixVQUFJLENBQUMsTUFBS0MsS0FBTCxDQUFXRixVQUFoQixFQUE0QixNQUFNLElBQUlHLFNBQUosQ0FBYyxvQ0FBZCxDQUFOOztBQUU1QixVQUFNQyxVQUFVSCxFQUFFSSxJQUFGLENBQU9ILEtBQVAsQ0FBYUksUUFBN0I7QUFDQSxVQUFNQyxVQUFVTixFQUFFTyxRQUFGLENBQVdOLEtBQVgsQ0FBaUJJLFFBQWpDOztBQUVBLFVBQU1HLE9BQU8sU0FBUEEsSUFBTyxDQUFDQyxJQUFELEVBQU9DLEdBQVAsRUFBWUMsUUFBWixFQUF5QjtBQUNwQ0YsYUFBS0csT0FBTCxDQUFhLFVBQUNDLElBQUQsRUFBT0MsS0FBUCxFQUFjQyxHQUFkLEVBQXNCO0FBQ2pDLGNBQUlGLEtBQUtILEdBQUwsS0FBYUEsR0FBakIsRUFBc0IsT0FBT0MsU0FBU0UsSUFBVCxFQUFlQyxLQUFmLEVBQXNCQyxHQUF0QixDQUFQO0FBQ3RCLGNBQUlGLEtBQUtHLFFBQVQsRUFBbUIsT0FBT1IsS0FBS0ssS0FBS0csUUFBVixFQUFvQk4sR0FBcEIsRUFBeUJDLFFBQXpCLENBQVA7QUFDbkIsaUJBQU8sSUFBUDtBQUNELFNBSkQ7QUFLRCxPQU5EOztBQVFBLFVBQU1NLFVBQVUsTUFBS2hCLEtBQUwsQ0FBV2lCLFFBQVgsQ0FBb0JDLEtBQXBCLEVBQWhCOztBQUVBLFVBQUlDLGdCQUFKO0FBQ0FaLFdBQUtTLE9BQUwsRUFBY1gsT0FBZCxFQUF1QixVQUFDTyxJQUFELEVBQU9DLEtBQVAsRUFBY0MsR0FBZCxFQUFzQjtBQUMzQ0EsWUFBSU0sTUFBSixDQUFXUCxLQUFYLEVBQWtCLENBQWxCO0FBQ0FNLGtCQUFVUCxJQUFWO0FBQ0QsT0FIRDs7QUFLQTtBQUNBLFVBQUliLEVBQUVzQixTQUFOLEVBQWlCO0FBQ2YsWUFBSUMsV0FBSjtBQUNBLFlBQUlDLFVBQUo7QUFDQWhCLGFBQUtTLE9BQUwsRUFBY2QsT0FBZCxFQUF1QixVQUFDVSxJQUFELEVBQU9DLEtBQVAsRUFBY0MsR0FBZCxFQUFzQjtBQUMzQ1EsZUFBS1IsR0FBTDtBQUNBUyxjQUFJVixLQUFKO0FBQ0QsU0FIRDtBQUlBUyxXQUFHRixNQUFILENBQVVHLENBQVYsRUFBYSxDQUFiLEVBQWdCSixPQUFoQjtBQUNELE9BUkQsTUFRTztBQUNMWixhQUFLUyxPQUFMLEVBQWNkLE9BQWQsRUFBdUIsVUFBQ1UsSUFBRCxFQUFVO0FBQy9CQSxlQUFLRyxRQUFMLEdBQWdCSCxLQUFLRyxRQUFMLElBQWlCLEVBQWpDLENBRCtCLENBQ007QUFDckNILGVBQUtHLFFBQUwsQ0FBY1MsSUFBZCxDQUFtQkwsT0FBbkI7QUFDRCxTQUhEO0FBSUQ7O0FBRUQsWUFBS25CLEtBQUwsQ0FBV0YsVUFBWCxDQUFzQmtCLE9BQXRCO0FBQ0QsSyxRQUVEUyxjLEdBQWlCLFVBQUN0QixJQUFELEVBQW9CO0FBQUEsVUFBYlcsR0FBYSx1RUFBUCxFQUFPO0FBQUEsd0JBQ1csTUFBS2QsS0FEaEI7QUFBQSxVQUMzQjBCLGtCQUQyQixlQUMzQkEsa0JBRDJCO0FBQUEsVUFDUEMsYUFETyxlQUNQQSxhQURPOztBQUVuQyxVQUFNWixXQUFXRCxJQUFJYyxNQUFKLEdBQWFkLEdBQWIsR0FBbUJYLEtBQUt1QixrQkFBTCxDQUFwQztBQUNBLFVBQUlHLFFBQVFkLFNBQVNlLElBQVQsQ0FBYztBQUFBLGVBQVMsTUFBS0MsU0FBTCxDQUFlQyxNQUFNTCxhQUFOLENBQWYsQ0FBVDtBQUFBLE9BQWQsQ0FBWjs7QUFFQSxVQUFJLENBQUNFLEtBQUwsRUFBWTtBQUNWZCxpQkFBU0osT0FBVCxDQUFpQixVQUFDcUIsS0FBRCxFQUFXO0FBQzFCLGNBQUlBLE1BQU1OLGtCQUFOLEtBQTZCLENBQUNHLEtBQWxDLEVBQXlDO0FBQ3ZDQSxvQkFBUSxNQUFLSixjQUFMLENBQW9CTyxLQUFwQixFQUEyQkEsTUFBTU4sa0JBQU4sQ0FBM0IsQ0FBUjtBQUNEO0FBQ0YsU0FKRDtBQUtEO0FBQ0QsYUFBTyxDQUFDLENBQUNHLEtBQVQ7QUFDRCxLLFFBRURFLFMsR0FBWTtBQUFBLGFBQ1YsTUFBSy9CLEtBQUwsQ0FBV2lDLFdBQVgsQ0FBdUJDLFFBQXZCLENBQWdDekIsR0FBaEMsS0FBd0MsTUFBS1QsS0FBTCxDQUFXbUMsa0JBQVgsQ0FBOEJELFFBQTlCLENBQXVDekIsR0FBdkMsQ0FEOUI7QUFBQSxLLFFBSVoyQixXLEdBQWM7QUFBQSxhQUFnQkMsV0FBVyxNQUFLckMsS0FBTCxDQUFXMEIsa0JBQXRCLEtBQ3pCVyxXQUFXLE1BQUtyQyxLQUFMLENBQVcwQixrQkFBdEIsRUFBMENFLE1BQTFDLElBQW9ELENBRDNDO0FBQUEsSzs7O0FBRGQ7OztBQUtBO3VCQUNBVSxXLDBCQUFjO0FBQUE7O0FBQUEsaUJBR1IsS0FBS3RDLEtBSEc7QUFBQSxRQUVWMkIsYUFGVSxVQUVWQSxhQUZVO0FBQUEsUUFFS1ksZUFGTCxVQUVLQSxlQUZMO0FBQUEsUUFFc0JiLGtCQUZ0QixVQUVzQkEsa0JBRnRCO0FBQUEsUUFFMENjLFNBRjFDLFVBRTBDQSxTQUYxQztBQUFBLFFBRXFEQyxRQUZyRCxVQUVxREEsUUFGckQ7O0FBSVosUUFBTUMsZ0JBQWdCLEtBQUtOLFdBQTNCOztBQUVBO0FBQ0EsUUFBTU8sYUFBYSxTQUFiQSxVQUFhLENBQUNDLFFBQUQsRUFBYztBQUMvQixVQUFNQyxPQUFPLEVBQWI7QUFDQUQsZUFBU2pDLE9BQVQsQ0FBaUIsVUFBQ1IsSUFBRCxFQUFVO0FBQ3pCLFlBQUksQ0FBQ0EsS0FBS3dCLGFBQUwsQ0FBTCxFQUEwQixPQUFPLEtBQVA7QUFDMUI7QUFDQSxZQUFJLENBQUNlLGNBQWN2QyxJQUFkLENBQUwsRUFBMEI7QUFDeEIwQyxlQUFLckIsSUFBTCxFQUFXO0FBQ1Q7QUFDRSxtQkFBT3JCLEtBQUtvQyxlQUFMLENBRFQ7QUFFRSxpQkFBS3BDLEtBQUt3QixhQUFMLENBRlA7QUFHRSw0QkFBY2EsU0FIaEI7QUFJRSxrQkFDRTtBQUNFLHVCQUFTLE9BQUtULFNBQUwsQ0FBZTVCLEtBQUt3QixhQUFMLENBQWYsQ0FEWDtBQUVFLDJCQUFhLEtBRmY7QUFHRSx3QkFBVWM7QUFIWjtBQUxKLFlBREY7QUFhRCxTQWRELE1BY087QUFDTDtBQUNBLGNBQU1LLGdCQUNKLE9BQUtmLFNBQUwsQ0FBZTVCLEtBQUt3QixhQUFMLENBQWYsSUFBc0MsS0FBdEMsR0FBOEMsT0FBS0YsY0FBTCxDQUFvQnRCLElBQXBCLENBRGhEOztBQUdBMEMsZUFBS3JCLElBQUwsRUFBVztBQUNUO0FBQUE7QUFBQTtBQUNFLHFCQUFPckIsS0FBS29DLGVBQUwsQ0FEVDtBQUVFLG1CQUFLcEMsS0FBS3dCLGFBQUwsQ0FGUDtBQUdFLDhCQUFjYSxTQUhoQjtBQUlFLG9CQUNFO0FBQ0UseUJBQVMsT0FBS1QsU0FBTCxDQUFlNUIsS0FBS3dCLGFBQUwsQ0FBZixDQURYO0FBRUUsNkJBQWFtQixhQUZmO0FBR0UsMEJBQVVMO0FBSFo7QUFMSjtBQVlHRSx1QkFBV3hDLEtBQUt1QixrQkFBTCxDQUFYO0FBWkgsV0FERjtBQWVEO0FBQ0QsZUFBTyxLQUFQO0FBQ0QsT0F2Q0Q7QUF3Q0EsYUFBT21CLElBQVA7QUFDRCxLQTNDRDtBQTRDQSxXQUFPRixXQUFXLEtBQUszQyxLQUFMLENBQVdpQixRQUF0QixDQUFQO0FBQ0QsRzs7dUJBR0Q4QixNLHFCQUFTO0FBQ1AsUUFBTUMsUUFBUSxLQUFLVixXQUFMLEVBQWQ7QUFDQSxRQUFNVyxVQUFVLEtBQUtqRCxLQUFMLENBQVdrRCxTQUFYLEdBQTBCLEtBQUtsRCxLQUFMLENBQVdrRCxTQUFyQyxzQkFBaUUsZUFBakY7QUFGTyxrQkFPSCxLQUFLbEQsS0FQRjtBQUFBLFFBSUxtRCxNQUpLLFdBSUxBLE1BSks7QUFBQSxRQUlHRCxTQUpILFdBSUdBLFNBSkg7QUFBQSxRQUljRSxtQkFKZCxXQUljQSxtQkFKZDtBQUFBLFFBSW1DQyxtQkFKbkMsV0FJbUNBLG1CQUpuQztBQUFBLFFBSXdEbEIsa0JBSnhELFdBSXdEQSxrQkFKeEQ7QUFBQSxRQUk0RUYsV0FKNUUsV0FJNEVBLFdBSjVFO0FBQUEsUUFLTHFCLFFBTEssV0FLTEEsUUFMSztBQUFBLFFBS0tDLFFBTEwsV0FLS0EsUUFMTDtBQUFBLFFBS2VDLE9BTGYsV0FLZUEsT0FMZjtBQUFBLFFBS3dCQyxRQUx4QixXQUt3QkEsUUFMeEI7QUFBQSxRQUtrQ0MsUUFMbEMsV0FLa0NBLFFBTGxDO0FBQUEsUUFLNENDLFNBTDVDLFdBSzRDQSxTQUw1QztBQUFBLFFBS3VEQyxVQUx2RCxXQUt1REEsVUFMdkQ7QUFBQSxRQUttRUMsZ0JBTG5FLFdBS21FQSxnQkFMbkU7QUFBQSxRQU1MQyxTQU5LLFdBTUxBLFNBTks7QUFBQSxRQU1NckIsUUFOTixXQU1NQSxRQU5OOzs7QUFTUCxXQUNFO0FBQUE7QUFBQSxRQUFLLElBQUcscUJBQVIsRUFBOEIsV0FBV1EsT0FBekM7QUFDRyxPQUFDLENBQUNELE1BQU1wQixNQUFSLElBQ0Q7QUFBQTtBQUFBO0FBQ0UsY0FBSXVCLE1BRE47QUFFRSxxQkFBV0QsU0FGYjtBQUdFLCtCQUFxQkUsbUJBSHZCO0FBSUUsK0JBQXFCQyxtQkFKdkI7QUFLRSw4QkFBb0JsQixrQkFMdEI7QUFNRSx1QkFBYUYsV0FOZjtBQU9FLG9CQUFVcUIsUUFQWjtBQVFFLG9CQUFVQyxRQVJaO0FBU0UsbUJBQVNDLE9BVFg7QUFVRSxvQkFBVUMsUUFWWjtBQVdFLG9CQUFVQyxRQVhaO0FBWUUscUJBQVdDLFNBWmI7QUFhRSxzQkFBWUMsVUFiZDtBQWNFLG9CQUFVbkIsUUFkWjtBQWVFLHFCQUFXcUIsU0FmYjtBQWdCRSw0QkFBa0JELGdCQWhCcEI7QUFpQkUsa0JBQVEsS0FBSy9EO0FBakJmO0FBbUJHa0Q7QUFuQkg7QUFGRixLQURGO0FBMkJELEc7OztFQWxOcUMsZ0JBQU1lLGEsVUEyQnJDQyxZLEdBQWU7QUFDcEJiLFVBQVEsYUFEWTtBQUVwQkQsYUFBVyxFQUZTO0FBR3BCVixhQUFXLFFBSFM7QUFJcEJZLHVCQUFxQixFQUpEO0FBS3BCQyx1QkFBcUIsRUFMRDtBQU1wQmxCLHNCQUFvQixFQU5BO0FBT3BCbUIsWUFBVVcsU0FQVTtBQVFwQlYsWUFBVVUsU0FSVTtBQVNwQlQsV0FBU1MsU0FUVztBQVVwQm5FLGNBQVltRSxTQVZRO0FBV3BCUixZQUFVLEtBWFU7QUFZcEJoQixZQUFVLEtBWlU7QUFhcEJpQixZQUFVLElBYlU7QUFjcEJDLGFBQVcsS0FkUztBQWVwQkcsYUFBVyxLQWZTO0FBZ0JwQkYsY0FBWSxLQWhCUTtBQWlCcEJDLG9CQUFrQixLQWpCRTtBQWtCcEI7QUFDQWxDLGlCQUFlLEtBbkJLO0FBb0JwQlksbUJBQWlCLFFBcEJHO0FBcUJwQmIsc0JBQW9CLFVBckJBO0FBc0JwQlQsWUFBVSxFQXRCVTtBQXVCcEJnQixlQUFhO0FBdkJPLEM7a0JBM0JIcEMsVSIsImZpbGUiOiJ0cmVlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFRyZWUsIHsgVHJlZU5vZGUgfSBmcm9tICdyYy10cmVlJztcbmltcG9ydCAncmMtdHJlZS9hc3NldHMvaW5kZXguY3NzJztcbi8vIE92ZXJyaWRlIGRlZmF1bHRzIHJjLXRyZWUgc3R5bGVzXG5pbXBvcnQgJy4vb2MtdHJlZS1zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgQ2hlY2tib3hJY29uIGZyb20gJy4vY2hlY2tib3gtaWNvbi5jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPQ1RyZWVWaWV3IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgdHJlZUlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRyZWVDbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpY29uQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdEV4cGFuZGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgZGVmYXVsdFNlbGVjdGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgZGVmYXVsdENoZWNrZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBvbkV4cGFuZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRHJhZ0Ryb3A6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dMaW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93SWNvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hlY2thYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkcmFnZ2FibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAvLyBDdXN0b21pc2F0aW9uIC0tIGRlZmluZSB0aGUgZGF0YSBsb29rVXBLZXlzIGFuZCBsb29rVXBWYWx1ZXNcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksXG4gICAgZGF0YUxvb2tVcEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXRhTG9va1VwVmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoZWNrZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHRyZWVJZDogJ2RlZmF1bHRUcmVlJyxcbiAgICB0cmVlQ2xhc3M6ICcnLFxuICAgIGljb25DbGFzczogJ2NhcmV0cycsXG4gICAgZGVmYXVsdEV4cGFuZGVkS2V5czogW10sXG4gICAgZGVmYXVsdFNlbGVjdGVkS2V5czogW10sXG4gICAgZGVmYXVsdENoZWNrZWRLZXlzOiBbXSxcbiAgICBvbkV4cGFuZDogdW5kZWZpbmVkLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25DaGVjazogdW5kZWZpbmVkLFxuICAgIG9uRHJhZ0Ryb3A6IHVuZGVmaW5lZCxcbiAgICBzaG93TGluZTogZmFsc2UsXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIHNob3dJY29uOiB0cnVlLFxuICAgIGNoZWNrYWJsZTogZmFsc2UsXG4gICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBmYWxzZSxcbiAgICAvLyBDdXN0b21zXG4gICAgZGF0YUxvb2tVcEtleTogJ2tleScsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiAncGFyZW50JyxcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46ICdjaGlsZHJlbicsXG4gICAgdHJlZURhdGE6IFtdLFxuICAgIGNoZWNrZWRLZXlzOiBbXSxcbiAgfTtcblxuXG4gIG9uRHJhZ0Ryb3AgPSAoZSkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5vbkRyYWdEcm9wKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdvbkRyYWdEcm9wIGNhbGxiYWNrIGlzIG5vdCBkZWZpbmVkJyk7XG5cbiAgICBjb25zdCBkcm9wS2V5ID0gZS5ub2RlLnByb3BzLmV2ZW50S2V5O1xuICAgIGNvbnN0IGRyYWdLZXkgPSBlLmRyYWdOb2RlLnByb3BzLmV2ZW50S2V5O1xuXG4gICAgY29uc3QgbG9vcCA9IChkYXRhLCBrZXksIGNhbGxiYWNrKSA9PiB7XG4gICAgICBkYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4LCBhcnIpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0ua2V5ID09PSBrZXkpIHJldHVybiBjYWxsYmFjayhpdGVtLCBpbmRleCwgYXJyKTtcbiAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHJldHVybiBsb29wKGl0ZW0uY2hpbGRyZW4sIGtleSwgY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBuZXdEYXRhID0gdGhpcy5wcm9wcy50cmVlRGF0YS5zbGljZSgpO1xuXG4gICAgbGV0IGRyYWdPYmo7XG4gICAgbG9vcChuZXdEYXRhLCBkcmFnS2V5LCAoaXRlbSwgaW5kZXgsIGFycikgPT4ge1xuICAgICAgYXJyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBkcmFnT2JqID0gaXRlbTtcbiAgICB9KTtcblxuICAgIC8vIC4uIGl0ZW0gaXMgZHJvcHBlZCBiZXR3ZWVuIDIgaXRlbXNcbiAgICBpZiAoZS5kcm9wVG9HYXApIHtcbiAgICAgIGxldCBhcjtcbiAgICAgIGxldCBpO1xuICAgICAgbG9vcChuZXdEYXRhLCBkcm9wS2V5LCAoaXRlbSwgaW5kZXgsIGFycikgPT4ge1xuICAgICAgICBhciA9IGFycjtcbiAgICAgICAgaSA9IGluZGV4O1xuICAgICAgfSk7XG4gICAgICBhci5zcGxpY2UoaSwgMCwgZHJhZ09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvb3AobmV3RGF0YSwgZHJvcEtleSwgKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5jaGlsZHJlbiA9IGl0ZW0uY2hpbGRyZW4gfHwgW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgaXRlbS5jaGlsZHJlbi5wdXNoKGRyYWdPYmopO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5vbkRyYWdEcm9wKG5ld0RhdGEpO1xuICB9O1xuXG4gIGlzQ2hpbGRDaGVja2VkID0gKG5vZGUsIGFyciA9IFtdKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwQ2hpbGRyZW4sIGRhdGFMb29rVXBLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBhcnIubGVuZ3RoID8gYXJyIDogbm9kZVtkYXRhTG9va1VwQ2hpbGRyZW5dO1xuICAgIGxldCBmb3VuZCA9IGNoaWxkcmVuLmZpbmQoY2hpbGQgPT4gdGhpcy5pc0NoZWNrZWQoY2hpbGRbZGF0YUxvb2tVcEtleV0pKTtcblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZFtkYXRhTG9va1VwQ2hpbGRyZW5dICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5pc0NoaWxkQ2hlY2tlZChjaGlsZCwgY2hpbGRbZGF0YUxvb2tVcENoaWxkcmVuXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gISFmb3VuZDtcbiAgfTtcblxuICBpc0NoZWNrZWQgPSBrZXkgPT5cbiAgICB0aGlzLnByb3BzLmNoZWNrZWRLZXlzLmluY2x1ZGVzKGtleSkgfHwgdGhpcy5wcm9wcy5kZWZhdWx0Q2hlY2tlZEtleXMuaW5jbHVkZXMoa2V5KTtcblxuICAvKiBoYXNDaGlsZHJlbiAtIGZ1bmN0aW9uICovXG4gIGhhc0NoaWxkcmVuID0gZGF0YU9iamVjdCA9PiAoKGRhdGFPYmplY3RbdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW5dXG4gICAgJiYgZGF0YU9iamVjdFt0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbl0ubGVuZ3RoID49IDFcbiAgKSk7XG5cbiAgLyogcmVuZGVyTm9kZXMgLSBmdW5jdGlvbiAqL1xuICByZW5kZXJOb2RlcygpIHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwVmFsdWUsIGRhdGFMb29rVXBDaGlsZHJlbiwgaWNvbkNsYXNzLCBkaXNhYmxlZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjaGVja0NoaWxkcmVuID0gdGhpcy5oYXNDaGlsZHJlbjtcblxuICAgIC8vIFJlY3Vyc2l2ZSBmdW5jdGlvbiBmb3IgY29sbGVjdGluZyBub2RlczpcbiAgICBjb25zdCBtb3VudE5vZGVzID0gKG5vZGVMaXN0KSA9PiB7XG4gICAgICBjb25zdCBsaXN0ID0gW107XG4gICAgICBub2RlTGlzdC5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIGlmICghbm9kZVtkYXRhTG9va1VwS2V5XSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyBMZWFmIG5vZGVcbiAgICAgICAgaWYgKCFjaGVja0NoaWxkcmVuKG5vZGUpKSB7XG4gICAgICAgICAgbGlzdC5wdXNoKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcbiAgICAgICAgICAgIDxUcmVlTm9kZVxuICAgICAgICAgICAgICB0aXRsZT17bm9kZVtkYXRhTG9va1VwVmFsdWVdfVxuICAgICAgICAgICAgICBrZXk9e25vZGVbZGF0YUxvb2tVcEtleV19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7aWNvbkNsYXNzfWB9XG4gICAgICAgICAgICAgIGljb249e1xuICAgICAgICAgICAgICAgIDxDaGVja2JveEljb25cbiAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuaXNDaGVja2VkKG5vZGVbZGF0YUxvb2tVcEtleV0pfVxuICAgICAgICAgICAgICAgICAgaGFsZkNoZWNrZWQ9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBQYXJlbnQgbm9kZVxuICAgICAgICAgIGNvbnN0IGlzSGFsZkNoZWNrZWQgPVxuICAgICAgICAgICAgdGhpcy5pc0NoZWNrZWQobm9kZVtkYXRhTG9va1VwS2V5XSkgPyBmYWxzZSA6IHRoaXMuaXNDaGlsZENoZWNrZWQobm9kZSk7XG5cbiAgICAgICAgICBsaXN0LnB1c2goIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuY3Rpb24tcGFyZW4tbmV3bGluZVxuICAgICAgICAgICAgPFRyZWVOb2RlXG4gICAgICAgICAgICAgIHRpdGxlPXtub2RlW2RhdGFMb29rVXBWYWx1ZV19XG4gICAgICAgICAgICAgIGtleT17bm9kZVtkYXRhTG9va1VwS2V5XX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtpY29uQ2xhc3N9YH1cbiAgICAgICAgICAgICAgaWNvbj17XG4gICAgICAgICAgICAgICAgPENoZWNrYm94SWNvblxuICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5pc0NoZWNrZWQobm9kZVtkYXRhTG9va1VwS2V5XSl9XG4gICAgICAgICAgICAgICAgICBoYWxmQ2hlY2tlZD17aXNIYWxmQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHttb3VudE5vZGVzKG5vZGVbZGF0YUxvb2tVcENoaWxkcmVuXSl9XG4gICAgICAgICAgICA8L1RyZWVOb2RlPik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbGlzdDtcbiAgICB9O1xuICAgIHJldHVybiBtb3VudE5vZGVzKHRoaXMucHJvcHMudHJlZURhdGEpO1xuICB9XG5cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLnJlbmRlck5vZGVzKCk7XG4gICAgY29uc3QgY2xzTmFtZSA9IHRoaXMucHJvcHMudHJlZUNsYXNzID8gYCR7dGhpcy5wcm9wcy50cmVlQ2xhc3N9IG9jLXJlYWN0LXRyZWVgIDogJ29jLXJlYWN0LXRyZWUnO1xuICAgIGNvbnN0IHtcbiAgICAgIHRyZWVJZCwgdHJlZUNsYXNzLCBkZWZhdWx0RXhwYW5kZWRLZXlzLCBkZWZhdWx0U2VsZWN0ZWRLZXlzLCBkZWZhdWx0Q2hlY2tlZEtleXMsIGNoZWNrZWRLZXlzLFxuICAgICAgb25FeHBhbmQsIG9uU2VsZWN0LCBvbkNoZWNrLCBzaG93TGluZSwgc2hvd0ljb24sIGNoZWNrYWJsZSwgc2VsZWN0YWJsZSwgZGVmYXVsdEV4cGFuZEFsbCxcbiAgICAgIGRyYWdnYWJsZSwgZGlzYWJsZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cInRyZWUtdmlldy1jb250YWluZXJcIiBjbGFzc05hbWU9e2Nsc05hbWV9PlxuICAgICAgICB7ISFub2Rlcy5sZW5ndGggJiZcbiAgICAgICAgPFRyZWVcbiAgICAgICAgICBpZD17dHJlZUlkfVxuICAgICAgICAgIGNsYXNzTmFtZT17dHJlZUNsYXNzfVxuICAgICAgICAgIGRlZmF1bHRFeHBhbmRlZEtleXM9e2RlZmF1bHRFeHBhbmRlZEtleXN9XG4gICAgICAgICAgZGVmYXVsdFNlbGVjdGVkS2V5cz17ZGVmYXVsdFNlbGVjdGVkS2V5c31cbiAgICAgICAgICBkZWZhdWx0Q2hlY2tlZEtleXM9e2RlZmF1bHRDaGVja2VkS2V5c31cbiAgICAgICAgICBjaGVja2VkS2V5cz17Y2hlY2tlZEtleXN9XG4gICAgICAgICAgb25FeHBhbmQ9e29uRXhwYW5kfVxuICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH1cbiAgICAgICAgICBvbkNoZWNrPXtvbkNoZWNrfVxuICAgICAgICAgIHNob3dMaW5lPXtzaG93TGluZX1cbiAgICAgICAgICBzaG93SWNvbj17c2hvd0ljb259XG4gICAgICAgICAgY2hlY2thYmxlPXtjaGVja2FibGV9XG4gICAgICAgICAgc2VsZWN0YWJsZT17c2VsZWN0YWJsZX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgZHJhZ2dhYmxlPXtkcmFnZ2FibGV9XG4gICAgICAgICAgZGVmYXVsdEV4cGFuZEFsbD17ZGVmYXVsdEV4cGFuZEFsbH1cbiAgICAgICAgICBvbkRyb3A9e3RoaXMub25EcmFnRHJvcH1cbiAgICAgICAgPlxuICAgICAgICAgIHtub2Rlc31cbiAgICAgICAgPC9UcmVlPlxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=