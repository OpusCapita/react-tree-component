'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp2;
// Override defaults rc-tree styles


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.hasChildrens = function (dataObject) {
      return dataObject[_this.props.dataLookUpChildren] && dataObject[_this.props.dataLookUpChildren].length >= 1;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /* hasChildrens - function */


  /* renderNodes - function */
  OCTreeView.prototype.renderNodes = function renderNodes() {
    var nodeKey = this.props.dataLookUpKey;
    var nodeVal = this.props.dataLookUpValue;
    var nodeChild = this.props.dataLookUpChildren;
    var disableNodeCheckboxes = this.props.disableCheckboxes;
    var checkChilds = this.hasChildrens;
    var customIcon = this.props.iconClass;
    // Recursive function for collecting nodes:
    var mountNodes = function mountNodes(nlist) {
      var lst = [];
      nlist.forEach(function (node) {
        if (!checkChilds(node)) {
          lst.push(_react2.default.createElement(_rcTree.TreeNode, {
            title: node[nodeVal],
            key: node[nodeKey],
            className: customIcon,
            disableCheckbox: disableNodeCheckboxes
          }));
        } else {
          lst.push(_react2.default.createElement(
            _rcTree.TreeNode,
            {
              title: node[nodeVal],
              key: node[nodeKey],
              className: customIcon,
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
      _react2.default.createElement(
        _rcTree2.default,
        {
          id: this.props.treeId,
          className: this.props.treeClass,
          defaultExpandedKeys: this.props.defaultExpandedKeys,
          defaultSelectedKeys: this.props.defaultSelectedKeys,
          defaultCheckedKeys: this.props.defaultCheckedKeys,
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
}(_react2.default.PureComponent), _class.defaultProps = {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiT0NUcmVlVmlldyIsImhhc0NoaWxkcmVucyIsImRhdGFPYmplY3QiLCJwcm9wcyIsImRhdGFMb29rVXBDaGlsZHJlbiIsImxlbmd0aCIsInJlbmRlck5vZGVzIiwibm9kZUtleSIsImRhdGFMb29rVXBLZXkiLCJub2RlVmFsIiwiZGF0YUxvb2tVcFZhbHVlIiwibm9kZUNoaWxkIiwiZGlzYWJsZU5vZGVDaGVja2JveGVzIiwiZGlzYWJsZUNoZWNrYm94ZXMiLCJjaGVja0NoaWxkcyIsImN1c3RvbUljb24iLCJpY29uQ2xhc3MiLCJtb3VudE5vZGVzIiwibmxpc3QiLCJsc3QiLCJmb3JFYWNoIiwibm9kZSIsInB1c2giLCJ0cmVlRGF0YSIsInJlbmRlciIsIm5vZGVzIiwiY2xzTmFtZSIsInRyZWVDbGFzcyIsInRyZWVJZCIsImRlZmF1bHRFeHBhbmRlZEtleXMiLCJkZWZhdWx0U2VsZWN0ZWRLZXlzIiwiZGVmYXVsdENoZWNrZWRLZXlzIiwib25FeHBhbmQiLCJvblNlbGVjdCIsIm9uQ2hlY2siLCJzaG93TGluZSIsInNob3dJY29uIiwiY2hlY2thYmxlIiwic2VsZWN0YWJsZSIsImRlZmF1bHRFeHBhbmRBbGwiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQTs7O0FBTEE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozs7OztnS0FpRG5CQyxZLEdBQWUsVUFBQ0MsVUFBRCxFQUFnQjtBQUM3QixhQUFRQSxXQUFXLE1BQUtDLEtBQUwsQ0FBV0Msa0JBQXRCLEtBQ0hGLFdBQVcsTUFBS0MsS0FBTCxDQUFXQyxrQkFBdEIsRUFBMENDLE1BQTFDLElBQW9ELENBRHpEO0FBR0QsSzs7O0FBTEQ7OztBQU9BO3VCQUNBQyxXLDBCQUFjO0FBQ1osUUFBTUMs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bUJwQkUsbUJBQWlCLFFBbkJHO0FBb0JwQk4sc0JBQW9CLFVBcEJBO0FBcUJwQm1CLFlBQVU7QUFyQlUsQztrQkF4Qkh2QixVIiwiZmlsZSI6InRyZWUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFRyZWUsIHsgVHJlZU5vZGUgfSBmcm9tICdyYy10cmVlJztcbmltcG9ydCAncmMtdHJlZS9hc3NldHMvaW5kZXguY3NzJztcbi8vIE92ZXJyaWRlIGRlZmF1bHRzIHJjLXRyZWUgc3R5bGVzXG5pbXBvcnQgJy4vb2MtdHJlZS1zdHlsZXMuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9DVHJlZVZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB0cmVlSWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB0cmVlQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWNvbkNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlZmF1bHRFeHBhbmRlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGRlZmF1bHRTZWxlY3RlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGRlZmF1bHRDaGVja2VkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgb25FeHBhbmQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoZWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ljb246IFByb3BUeXBlcy5ib29sLFxuICAgIGNoZWNrYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0YWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgLy8gTm9kZSByZWxhdGVkIHByb3BzOlxuICAgIGRpc2FibGVDaGVja2JveGVzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAvLyBDdXN0b21pc2F0aW9uIC0tIGRlZmluZSB0aGUgZGF0YSBsb29rVXBLZXlzIGFuZCBsb29rVXBWYWx1ZXNcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksXG4gICAgZGF0YUxvb2tVcEtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRhdGFMb29rVXBWYWx1ZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9O1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHRyZWVJZDogJ2RlZmF1bHRUcmVlJyxcbiAgICB0cmVlQ2xhc3M6ICcnLFxuICAgIGljb25DbGFzczogJycsXG4gICAgZGVmYXVsdEV4cGFuZGVkS2V5czogW10sXG4gICAgZGVmYXVsdFNlbGVjdGVkS2V5czogW10sXG4gICAgZGVmYXVsdENoZWNrZWRLZXlzOiBbXSxcbiAgICBvbkV4cGFuZDogdW5kZWZpbmVkLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25DaGVjazogdW5kZWZpbmVkLFxuICAgIHNob3dMaW5lOiBmYWxzZSxcbiAgICBzaG93SWNvbjogZmFsc2UsXG4gICAgY2hlY2thYmxlOiBmYWxzZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBmYWxzZSxcbiAgICAvLyBOb2RlIHJlbGF0ZWQgcHJvcHM6XG4gICAgZGlzYWJsZUNoZWNrYm94ZXM6IGZhbHNlLFxuICAgIC8vIEN1c3RvbXNcbiAgICBkYXRhTG9va1VwS2V5OiAna2V5JyxcbiAgICBkYXRhTG9va1VwVmFsdWU6ICdwYXJlbnQnLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogJ2NoaWxkcmVuJyxcbiAgICB0cmVlRGF0YTogW10sXG4gIH07XG5cbiAgLyogaGFzQ2hpbGRyZW5zIC0gZnVuY3Rpb24gKi9cbiAgaGFzQ2hpbGRyZW5zID0gKGRhdGFPYmplY3QpID0+IHtcbiAgICByZXR1cm4gKGRhdGFPYmplY3RbdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW5dXG4gICAgICAmJiBkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXS5sZW5ndGggPj0gMVxuICAgICk7XG4gIH1cblxuICAvKiByZW5kZXJOb2RlcyAtIGZ1bmN0aW9uICovXG4gIHJlbmRlck5vZGVzKCkge1xuICAgIGNvbnN0IG5vZGVLZXkgPSB0aGlzLnByb3BzLmRhdGFMb29rVXBLZXk7XG4gICAgY29uc3Qgbm9kZVZhbCA9IHRoaXMucHJvcHMuZGF0YUxvb2tVcFZhbHVlO1xuICAgIGNvbnN0IG5vZGVDaGlsZCA9IHRoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuO1xuICAgIGNvbnN0IGRpc2FibGVOb2RlQ2hlY2tib3hlcyA9IHRoaXMucHJvcHMuZGlzYWJsZUNoZWNrYm94ZXM7XG4gICAgY29uc3QgY2hlY2tDaGlsZHMgPSB0aGlzLmhhc0NoaWxkcmVucztcbiAgICBjb25zdCBjdXN0b21JY29uID0gdGhpcy5wcm9wcy5pY29uQ2xhc3M7XG4gICAgLy8gUmVjdXJzaXZlIGZ1bmN0aW9uIGZvciBjb2xsZWN0aW5nIG5vZGVzOlxuICAgIGNvbnN0IG1vdW50Tm9kZXMgPSBmdW5jdGlvbiAobmxpc3QpIHtcbiAgICAgIGNvbnN0IGxzdCA9IFtdO1xuICAgICAgbmxpc3QuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAoIWNoZWNrQ2hpbGRzKG5vZGUpKSB7XG4gICAgICAgICAgbHN0LnB1c2goXG4gICAgICAgICAgICA8VHJlZU5vZGVcbiAgICAgICAgICAgICAgdGl0bGU9e25vZGVbbm9kZVZhbF19XG4gICAgICAgICAgICAgIGtleT17bm9kZVtub2RlS2V5XX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjdXN0b21JY29ufVxuICAgICAgICAgICAgICBkaXNhYmxlQ2hlY2tib3g9e2Rpc2FibGVOb2RlQ2hlY2tib3hlc31cbiAgICAgICAgICAgIC8+KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsc3QucHVzaChcbiAgICAgICAgICAgIDxUcmVlTm9kZVxuICAgICAgICAgICAgICB0aXRsZT17bm9kZVtub2RlVmFsXX1cbiAgICAgICAgICAgICAga2V5PXtub2RlW25vZGVLZXldfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2N1c3RvbUljb259XG4gICAgICAgICAgICAgIGRpc2FibGVDaGVja2JveD17ZGlzYWJsZU5vZGVDaGVja2JveGVzfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7IG1vdW50Tm9kZXMobm9kZVtub2RlQ2hpbGRdKSB9XG4gICAgICAgICAgICA8L1RyZWVOb2RlPixcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBsc3Q7XG4gICAgfTtcbiAgICByZXR1cm4gbW91bnROb2Rlcyh0aGlzLnByb3BzLnRyZWVEYXRhKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBub2RlcyA9IHRoaXMucmVuZGVyTm9kZXMoKTtcbiAgICBjb25zdCBjbHNOYW1lID0gdGhpcy5wcm9wcy50cmVlQ2xhc3MgPyBgJHt0aGlzLnByb3BzLnRyZWVDbGFzc30gb2MtcmVhY3QtdHJlZWAgOiAnb2MtcmVhY3QtdHJlZSc7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJ0cmVlLXZpZXctY29udGFpbmVyXCIgY2xhc3NOYW1lPXtjbHNOYW1lfT5cbiAgICAgICAgPFRyZWVcbiAgICAgICAgICBpZD17dGhpcy5wcm9wcy50cmVlSWR9XG4gICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLnRyZWVDbGFzc31cbiAgICAgICAgICBkZWZhdWx0RXhwYW5kZWRLZXlzPXt0aGlzLnByb3BzLmRlZmF1bHRFeHBhbmRlZEtleXN9XG4gICAgICAgICAgZGVmYXVsdFNlbGVjdGVkS2V5cz17dGhpcy5wcm9wcy5kZWZhdWx0U2VsZWN0ZWRLZXlzfVxuICAgICAgICAgIGRlZmF1bHRDaGVja2VkS2V5cz17dGhpcy5wcm9wcy5kZWZhdWx0Q2hlY2tlZEtleXN9XG4gICAgICAgICAgb25FeHBhbmQ9e3RoaXMucHJvcHMub25FeHBhbmR9XG4gICAgICAgICAgb25TZWxlY3Q9e3RoaXMucHJvcHMub25TZWxlY3R9XG4gICAgICAgICAgb25DaGVjaz17dGhpcy5wcm9wcy5vbkNoZWNrfVxuICAgICAgICAgIHNob3dMaW5lPXt0aGlzLnByb3BzLnNob3dMaW5lfVxuICAgICAgICAgIHNob3dJY29uPXt0aGlzLnByb3BzLnNob3dJY29ufVxuICAgICAgICAgIGNoZWNrYWJsZT17dGhpcy5wcm9wcy5jaGVja2FibGV9XG4gICAgICAgICAgc2VsZWN0YWJsZT17dGhpcy5wcm9wcy5zZWxlY3RhYmxlfVxuICAgICAgICAgIGRlZmF1bHRFeHBhbmRBbGw9e3RoaXMucHJvcHMuZGVmYXVsdEV4cGFuZEFsbH1cbiAgICAgICAgPlxuICAgICAgICAgIHsgbm9kZXMgfVxuICAgICAgICA8L1RyZWU+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbn1cbiJdfQ==