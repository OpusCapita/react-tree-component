'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;
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

var OCTreeView = (_temp = _class = function (_React$PureComponent) {
  _inherits(OCTreeView, _React$PureComponent);

  function OCTreeView() {
    _classCallCheck(this, OCTreeView);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  /* hasChildrens - function */
  OCTreeView.prototype.hasChildrens = function hasChildrens(dataObject) {
    return dataObject[this.props.dataLookUpChildren] && dataObject[this.props.dataLookUpChildren].length >= 1;
  };

  /* renderNodes - function */


  OCTreeView.prototype.renderNodes = function renderNodes() {
    var nodeKey = this.props.dataLookUpKey;
    var nodeVal = this.props.dataLookUpValue;
    var nodeChild = this.props.dataLookUpChildren;
    var checkChilds = this.hasChildrens.bind(this);
    var customIcon = this.props.iconClass;
    // Recursive function for collecting nodes:
    var mountNodes = function mountNodes(nlist) {
      var lst = [];
      nlist.forEach(function (node) {
        if (!checkChilds(node)) {
          lst.push(_react2.default.createElement(_rcTree.TreeNode, {
            title: node[nodeVal],
            key: node[nodeKey],
            className: customIcon
          }));
        } else {
          lst.push(_react2.default.createElement(
            _rcTree.TreeNode,
            { title: node[nodeVal], key: node[nodeKey], className: customIcon },
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
  // Customs
  dataLookUpKey: 'key',
  dataLookUpValue: 'parent',
  dataLookUpChildren: 'children',
  treeData: []
}, _temp);
exports.default = OCTreeView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiT0NUcmVlVmlldyIsImhhc0NoaWxkcmVucyIsImRhdGFPYmplY3QiLCJwcm9wcyIsImRhdGFMb29rVXBDaGlsZHJlbiIsImxlbmd0aCIsInJlbmRlck5vZGVzIiwibm9kZUtleSIsImRhdGFMb29rVXBLZXkiLCJub2RlVmFsIiwiZGF0YUxvb2tVcFZhbHVlIiwibm9kZUNoaWxkIiwiY2hlY2tDaGlsZHMiLCJiaW5kIiwiY3VzdG9tSWNvbiIsImljb25DbGFzcyIsIm1vdW50Tm9kZXMiLCJubGlzdCIsImxzdCIsImZvckVhY2giLCJub2RlIiwicHVzaCIsInRyZWVEYXRhIiwicmVuZGVyIiwibm9kZXMiLCJjbHNOYW1lIiwidHJlZUNsYXNzIiwidHJlZUlkIiwiZGVmYXVsdEV4cGFuZGVkS2V5cyIsImRlZmF1bHRTZWxlY3RlZEtleXMiLCJkZWZhdWx0Q2hlY2tlZEtleXMiLCJvbkV4cGFuZCIsIm9uU2VsZWN0Iiwib25DaGVjayIsInNob3dMaW5lIiwic2hvd0ljb24iLCJjaGVja2FibGUiLCJzZWxlY3RhYmxlIiwiZGVmYXVsdEV4cGFuZEFsbCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtBOzs7QUFMQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7O0FBNENuQjt1QkFDQUMsWSx5QkFBYUMsVSxFQUFZO0FBQ3ZCLFdBQVFBLFdBQVcsS0FBS0MsS0FBTCxDQUFXQyxrQkFBdEIsS0FDSEYsV0FBVyxLQUFLQyxLQUFMLENBQVdDLGtCQUF0QixFQUEwQ0MsTUFBMUMsSUFBb0QsQ0FEekQ7QUFHRCxHOztBQUVEOzs7dUJBQ0FDLFcsMEJBQWM7QUFDWixRQUFNQyxVQUFVLEtBQUtKLEtBQUwsQ0FBV0ssYUFBM0I7QUFDQSxRQUFNQyxVQUFVLEtBQUtO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cnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgVHJlZSwgeyBUcmVlTm9kZSB9IGZyb20gJ3JjLXRyZWUnO1xuaW1wb3J0ICdyYy10cmVlL2Fzc2V0cy9pbmRleC5jc3MnO1xuLy8gT3ZlcnJpZGUgZGVmYXVsdHMgcmMtdHJlZSBzdHlsZXNcbmltcG9ydCAnLi9vYy10cmVlLXN0eWxlcy5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0NUcmVlVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHRyZWVJZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHRyZWVDbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpY29uQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdEV4cGFuZGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgZGVmYXVsdFNlbGVjdGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgZGVmYXVsdENoZWNrZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBvbkV4cGFuZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dMaW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93SWNvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hlY2thYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAvLyBDdXN0b21pc2F0aW9uIC0tIGRlZmluZSB0aGUgZGF0YSBsb29rVXBLZXlzIGFuZCBsb29rVXBWYWx1ZXNcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksXG4gICAgZGF0YUxvb2tVcEtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRhdGFMb29rVXBWYWx1ZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9O1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHRyZWVJZDogJ2RlZmF1bHRUcmVlJyxcbiAgICB0cmVlQ2xhc3M6ICcnLFxuICAgIGljb25DbGFzczogJycsXG4gICAgZGVmYXVsdEV4cGFuZGVkS2V5czogW10sXG4gICAgZGVmYXVsdFNlbGVjdGVkS2V5czogW10sXG4gICAgZGVmYXVsdENoZWNrZWRLZXlzOiBbXSxcbiAgICBvbkV4cGFuZDogdW5kZWZpbmVkLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25DaGVjazogdW5kZWZpbmVkLFxuICAgIHNob3dMaW5lOiBmYWxzZSxcbiAgICBzaG93SWNvbjogZmFsc2UsXG4gICAgY2hlY2thYmxlOiBmYWxzZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBmYWxzZSxcbiAgICAvLyBDdXN0b21zXG4gICAgZGF0YUxvb2tVcEtleTogJ2tleScsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiAncGFyZW50JyxcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46ICdjaGlsZHJlbicsXG4gICAgdHJlZURhdGE6IFtdLFxuICB9O1xuXG4gIC8qIGhhc0NoaWxkcmVucyAtIGZ1bmN0aW9uICovXG4gIGhhc0NoaWxkcmVucyhkYXRhT2JqZWN0KSB7XG4gICAgcmV0dXJuIChkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXVxuICAgICAgJiYgZGF0YU9iamVjdFt0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbl0ubGVuZ3RoID49IDFcbiAgICApO1xuICB9XG5cbiAgLyogcmVuZGVyTm9kZXMgLSBmdW5jdGlvbiAqL1xuICByZW5kZXJOb2RlcygpIHtcbiAgICBjb25zdCBub2RlS2V5ID0gdGhpcy5wcm9wcy5kYXRhTG9va1VwS2V5O1xuICAgIGNvbnN0IG5vZGVWYWwgPSB0aGlzLnByb3BzLmRhdGFMb29rVXBWYWx1ZTtcbiAgICBjb25zdCBub2RlQ2hpbGQgPSB0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbjtcbiAgICBjb25zdCBjaGVja0NoaWxkcyA9IHRoaXMuaGFzQ2hpbGRyZW5zLmJpbmQodGhpcyk7XG4gICAgY29uc3QgY3VzdG9tSWNvbiA9IHRoaXMucHJvcHMuaWNvbkNsYXNzO1xuICAgIC8vIFJlY3Vyc2l2ZSBmdW5jdGlvbiBmb3IgY29sbGVjdGluZyBub2RlczpcbiAgICBjb25zdCBtb3VudE5vZGVzID0gZnVuY3Rpb24gKG5saXN0KSB7XG4gICAgICBjb25zdCBsc3QgPSBbXTtcbiAgICAgIG5saXN0LmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKCFjaGVja0NoaWxkcyhub2RlKSkge1xuICAgICAgICAgIGxzdC5wdXNoKFxuICAgICAgICAgICAgPFRyZWVOb2RlXG4gICAgICAgICAgICAgIHRpdGxlPXtub2RlW25vZGVWYWxdfVxuICAgICAgICAgICAgICBrZXk9e25vZGVbbm9kZUtleV19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3VzdG9tSWNvbn1cbiAgICAgICAgICAgIC8+KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsc3QucHVzaChcbiAgICAgICAgICAgIDxUcmVlTm9kZSB0aXRsZT17bm9kZVtub2RlVmFsXX0ga2V5PXtub2RlW25vZGVLZXldfSBjbGFzc05hbWU9e2N1c3RvbUljb259PlxuICAgICAgICAgICAgICB7IG1vdW50Tm9kZXMobm9kZVtub2RlQ2hpbGRdKSB9XG4gICAgICAgICAgICA8L1RyZWVOb2RlPixcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBsc3Q7XG4gICAgfTtcbiAgICByZXR1cm4gbW91bnROb2Rlcyh0aGlzLnByb3BzLnRyZWVEYXRhKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBub2RlcyA9IHRoaXMucmVuZGVyTm9kZXMoKTtcbiAgICBjb25zdCBjbHNOYW1lID0gdGhpcy5wcm9wcy50cmVlQ2xhc3MgPyBgJHt0aGlzLnByb3BzLnRyZWVDbGFzc30gb2MtcmVhY3QtdHJlZWAgOiAnb2MtcmVhY3QtdHJlZSc7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJ0cmVlLXZpZXctY29udGFpbmVyXCIgY2xhc3NOYW1lPXtjbHNOYW1lfT5cbiAgICAgICAgPFRyZWVcbiAgICAgICAgICBpZD17dGhpcy5wcm9wcy50cmVlSWR9XG4gICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLnRyZWVDbGFzc31cbiAgICAgICAgICBkZWZhdWx0RXhwYW5kZWRLZXlzPXt0aGlzLnByb3BzLmRlZmF1bHRFeHBhbmRlZEtleXN9XG4gICAgICAgICAgZGVmYXVsdFNlbGVjdGVkS2V5cz17dGhpcy5wcm9wcy5kZWZhdWx0U2VsZWN0ZWRLZXlzfVxuICAgICAgICAgIGRlZmF1bHRDaGVja2VkS2V5cz17dGhpcy5wcm9wcy5kZWZhdWx0Q2hlY2tlZEtleXN9XG4gICAgICAgICAgb25FeHBhbmQ9e3RoaXMucHJvcHMub25FeHBhbmR9XG4gICAgICAgICAgb25TZWxlY3Q9e3RoaXMucHJvcHMub25TZWxlY3R9XG4gICAgICAgICAgb25DaGVjaz17dGhpcy5wcm9wcy5vbkNoZWNrfVxuICAgICAgICAgIHNob3dMaW5lPXt0aGlzLnByb3BzLnNob3dMaW5lfVxuICAgICAgICAgIHNob3dJY29uPXt0aGlzLnByb3BzLnNob3dJY29ufVxuICAgICAgICAgIGNoZWNrYWJsZT17dGhpcy5wcm9wcy5jaGVja2FibGV9XG4gICAgICAgICAgc2VsZWN0YWJsZT17dGhpcy5wcm9wcy5zZWxlY3RhYmxlfVxuICAgICAgICAgIGRlZmF1bHRFeHBhbmRBbGw9e3RoaXMucHJvcHMuZGVmYXVsdEV4cGFuZEFsbH1cbiAgICAgICAgPlxuICAgICAgICAgIHsgbm9kZXMgfVxuICAgICAgICA8L1RyZWU+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbn1cbiJdfQ==