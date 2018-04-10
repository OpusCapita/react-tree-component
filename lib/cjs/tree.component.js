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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.hasChildren = function (dataObject) {
      return dataObject[_this.props.dataLookUpChildren] && dataObject[_this.props.dataLookUpChildren].length >= 1;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /* hasChildren - function */


  /* renderNodes - function */
  OCTreeView.prototype.renderNodes = function renderNodes() {
    var nodeKey = this.props.dataLookUpKey;
    var nodeVal = this.props.dataLookUpValue;
    var nodeChild = this.props.dataLookUpChildren;
    var disableNodeCheckboxes = this.props.disableCheckboxes;
    var checkChildren = this.hasChildren;
    var disableCls = disableNodeCheckboxes ? 'disabled' : '';
    var customIcon = this.props.iconClass;

    // Recursive function for collecting nodes:
    var mountNodes = function mountNodes(nodeList) {
      var lst = [];
      nodeList.forEach(function (node) {
        if (!node[nodeKey]) return false;
        if (!checkChildren(node)) {
          lst.push(_react2.default.createElement(_rcTree.TreeNode, {
            title: node[nodeVal],
            key: node[nodeKey],
            className: customIcon + ' ' + disableCls,
            disableCheckbox: disableNodeCheckboxes
          }));
        } else {
          lst.push(_react2.default.createElement(
            _rcTree.TreeNode,
            {
              title: node[nodeVal],
              key: node[nodeKey],
              className: customIcon + ' ' + disableCls,
              disableCheckbox: disableNodeCheckboxes
            },
            mountNodes(node[nodeChild])
          ));
        }
      });
      return lst;
    };
    return mountNodes(this.props.treeData);
  };

  OCTreeView.prototype.render = function render() {
    var nodes = this.renderNodes();
    var clsName = this.props.treeClass ? this.props.treeClass + ' oc-react-tree' : 'oc-react-tree';

    return _react2.default.createElement(
      'div',
      { id: 'tree-view-container', className: clsName },
      nodes.length && _react2.default.createElement(
        _rcTree2.default,
        {
          id: this.props.treeId,
          className: this.props.treeClass,
          defaultExpandedKeys: this.props.defaultExpandedKeys,
          defaultSelectedKeys: this.props.defaultSelectedKeys,
          defaultCheckedKeys: this.props.defaultCheckedKeys,
          checkedKeys: this.props.checkedKeys,
          onExpand: this.props.onExpand,
          onSelect: this.props.onSelect,
          onCheck: this.props.onCheck,
          showLine: this.props.showLine,
          showIcon: this.props.showIcon,
          checkable: this.props.checkable,
          selectable: this.props.selectable,
          defaultExpandAll: this.props.defaultExpandAll
        },
        nodes
      )
    );
  };

  return OCTreeView;
}(_react2.default.PureComponent), _class.propTypes = {
  treeId: _propTypes2.default.string.isRequired,
  treeClass: _propTypes2.default.string,
  iconClass: _propTypes2.default.string,
  defaultExpandedKeys: _propTypes2.default.arrayOf(_propTypes2.default.string),
  defaultSelectedKeys: _propTypes2.default.arrayOf(_propTypes2.default.string),
  defaultCheckedKeys: _propTypes2.default.arrayOf(_propTypes2.default.string),
  onExpand: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  onCheck: _propTypes2.default.func,
  showLine: _propTypes2.default.bool,
  showIcon: _propTypes2.default.bool,
  checkable: _propTypes2.default.bool,
  selectable: _propTypes2.default.bool,
  defaultExpandAll: _propTypes2.default.bool,
  // Node related props:
  disableCheckboxes: _propTypes2.default.bool,
  // Customisation -- define the data lookUpKeys and lookUpValues
  treeData: _propTypes2.default.arrayOf(_propTypes2.default.object),
  dataLookUpKey: _propTypes2.default.string.isRequired,
  dataLookUpValue: _propTypes2.default.string.isRequired,
  dataLookUpChildren: _propTypes2.default.string.isRequired
}, _class.defaultProps = {
  treeId: 'defaultTree',
  treeClass: '',
  iconClass: '',
  defaultExpandedKeys: [],
  defaultSelectedKeys: [],
  defaultCheckedKeys: [],
  onExpand: undefined,
  onSelect: undefined,
  onCheck: undefined,
  showLine: false,
  showIcon: false,
  checkable: false,
  selectable: false,
  defaultExpandAll: false,
  // Node related props:
  disableCheckboxes: false,
  // Customs
  dataLookUpKey: 'key',
  dataLookUpValue: 'parent',
  dataLookUpChildren: 'children',
  treeData: []
}, _temp2);
exports.default = OCTreeView;