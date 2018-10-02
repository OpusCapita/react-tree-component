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
}(_react2.default.PureComponent), _class.propTypes = {
  treeId: _propTypes2.default.string,
  treeClass: _propTypes2.default.string,
  iconClass: _propTypes2.default.string,
  defaultExpandedKeys: _propTypes2.default.arrayOf(_propTypes2.default.string),
  defaultSelectedKeys: _propTypes2.default.arrayOf(_propTypes2.default.string),
  defaultCheckedKeys: _propTypes2.default.arrayOf(_propTypes2.default.string),
  onExpand: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  onCheck: _propTypes2.default.func,
  onDragDrop: _propTypes2.default.func,
  showLine: _propTypes2.default.bool,
  showIcon: _propTypes2.default.bool,
  checkable: _propTypes2.default.bool,
  selectable: _propTypes2.default.bool,
  draggable: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  defaultExpandAll: _propTypes2.default.bool,
  // Customisation -- define the data lookUpKeys and lookUpValues
  treeData: _propTypes2.default.arrayOf(_propTypes2.default.object),
  dataLookUpKey: _propTypes2.default.string,
  dataLookUpValue: _propTypes2.default.string,
  dataLookUpChildren: _propTypes2.default.string,
  checkedKeys: _propTypes2.default.arrayOf(_propTypes2.default.string)
}, _class.defaultProps = {
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