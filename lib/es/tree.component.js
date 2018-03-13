var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';
// Override defaults rc-tree styles
import './oc-tree-styles.scss';

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
          lst.push(React.createElement(TreeNode, {
            title: node[nodeVal],
            key: node[nodeKey],
            className: customIcon,
            disableCheckbox: disableNodeCheckboxes
          }));
        } else {
          lst.push(React.createElement(
            TreeNode,
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
    return React.createElement(
      'div',
      { id: 'tree-view-container', className: clsName },
      React.createElement(
        Tree,
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
}(React.PureComponent), _class.defaultProps = {
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
export { OCTreeView as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJNYXAiLCJQcm9wVHlwZXMiLCJUcmVlIiwiVHJlZU5vZGUiLCJPQ1RyZWVWaWV3IiwiaGFzQ2hpbGRyZW5zIiwiZGF0YU9iamVjdCIsInByb3BzIiwiZGF0YUxvb2tVcENoaWxkcmVuIiwibGVuZ3RoIiwicmVuZGVyTm9kZXMiLCJub2RlS2V5IiwiZGF0YUxvb2tVcEtleSIsIm5vZGVWYWwiLCJkYXRhTG9va1VwVmFsdWUiLCJub2RlQ2hpbGQiLCJkaXNhYmxlTm9kZUNoZWNrYm94ZXMiLCJkaXNhYmxlQ2hlY2tib3hlcyIsImNoZWNrQ2hpbGRzIiwiY3VzdG9tSWNvbiIsImljb25DbGFzcyIsIm1vdW50Tm9kZXMiLCJubGlzdCIsImxzdCIsImZvckVhY2giLCJub2RlIiwicHVzaCIsInRyZWVEYXRhIiwicmVuZGVyIiwibm9kZXMiLCJjbHNOYW1lIiwidHJlZUNsYXNzIiwidHJlZUlkIiwiZGVmYXVsdEV4cGFuZGVkS2V5cyIsImRlZmF1bHRTZWxlY3RlZEtleXMiLCJkZWZhdWx0Q2hlY2tlZEtleXMiLCJvbkV4cGFuZCIsIm9uU2VsZWN0Iiwib25DaGVjayIsInNob3dMaW5lIiwic2hvd0ljb24iLCJjaGVja2FibGUiLCJzZWxlY3RhYmxlIiwiZGVmYXVsdEV4cGFuZEFsbCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLFNBQVNDLEdBQVQsUUFBb0IsV0FBcEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsSUFBUCxJQUFlQyxRQUFmLFFBQStCLFNBQS9CO0FBQ0EsT0FBTywwQkFBUDtBQUNBO0FBQ0EsT0FBTyx1QkFBUDs7SUFFcUJDLFU7Ozs7Ozs7Ozs7OztnS0FpRG5CQyxZLEdBQWUsVUFBQ0MsVUFBRCxFQUFnQjtBQUM3QixhQUFRQSxXQUFXLE1BQUtDLEtBQUwsQ0FBV0Msa0JBQXRCLEtBQ0hGLFdBQVcsTUFBS0MsS0FBTCxDQUFXQyxrQkFBdEIsRUFBMENDLE1BQTFDLElBQW9ELENBRHpEO0FBR0QsSzs7O0FBTEQ7OztBQU9BO3VCQUNBQyxXLDBCQUFjO0FBQ1osUUFBTUMsVUFBVSxLQUFLSixLQUFMLENBQVdLLGFBQTNCO0FBQ0EsUUFBTUMsVUFBVSxLQUFLTixLQUFMLENBQVdPLGVBQTNCO0FBQ0EsUUFBTUMsWUFBWSxLQUFLUixLQUFMLENBQVdDLGtCQUE3QjtBQUNBLFFBQU1RLHdCQUF3QixLQUFLVCxLQUFMLENBQVdVLGlCQUF6QztBQUNBLFFBQU1DLGNBQWMsS0FBS2IsWUFBekI7QUFDQSxRQUFNYyxhQUFhLEtBQUtaLEtBQUwsQ0FBV2EsU0FBOUI7QUFDQTtBQUNBLFFBQU1DLGFBQWEsU0FBYkEsVUFBYSxDQUFVQyxLQUFWLEVBQWlCO0FBQ2xDLFVBQU1DLE1BQU0sRUFBWjtBQUNBRCxZQUFNRSxPQUFOLENBQWMsVUFBQ0MsSUFBRCxFQUFVO0FBQ3RCLFlBQUksQ0FBQ1AsWUFBWU8sSUFBWixDQUFMLEVBQXdCO0FBQ3RCRixjQUFJRyxJQUFKLENBQ0Usb0JBQUMsUUFBRDtBQUNFLG1CQUFPRCxLQUFLWixPQUFMLENBRFQ7QUFFRSxpQkFBS1ksS0FBS2QsT0FBTCxDQUZQO0FBR0UsdUJBQVdRLFVBSGI7QUFJRSw2QkFBaUJIO0FBSm5CLFlBREY7QUFPRCxTQVJELE1BUU87QUFDTE8sY0FBSUcsSUFBSixDQUNFO0FBQUMsb0JBQUQ7QUFBQTtBQUNFLHFCQUFPRCxLQUFLWixPQUFMLENBRFQ7QUFFRSxtQkFBS1ksS0FBS2QsT0FBTCxDQUZQO0FBR0UseUJBQVdRLFVBSGI7QUFJRSwrQkFBaUJIO0FBSm5CO0FBTUlLLHVCQUFXSSxLQUFLVixTQUFMLENBQVg7QUFOSixXQURGO0FBVUQ7QUFDRixPQXJCRDtBQXNCQSxhQUFPUSxHQUFQO0FBQ0QsS0F6QkQ7QUEwQkEsV0FBT0YsV0FBVyxLQUFLZCxLQUFMLENBQVdvQixRQUF0QixDQUFQO0FBQ0QsRzs7dUJBRURDLE0scUJBQVM7QUFDUCxRQUFNQyxRQUFRLEtBQUtuQixXQUFMLEVBQWQ7QUFDQSxRQUFNb0IsVUFBVSxLQUFLdkIsS0FBTCxDQUFXd0IsU0FBWCxHQUEwQixLQUFLeEIsS0FBTCxDQUFXd0IsU0FBckMsc0JBQWlFLGVBQWpGO0FBQ0EsV0FDRTtBQUFBO0FBQUEsUUFBSyxJQUFHLHFCQUFSLEVBQThCLFdBQVdELE9BQXpDO0FBQ0U7QUFBQyxZQUFEO0FBQUE7QUFDRSxjQUFJLEtBQUt2QixLQUFMLENBQVd5QixNQURqQjtBQUVFLHFCQUFXLEtBQUt6QixLQUFMLENBQVd3QixTQUZ4QjtBQUdFLCtCQUFxQixLQUFLeEIsS0FBTCxDQUFXMEIsbUJBSGxDO0FBSUUsK0JBQXFCLEtBQUsxQixLQUFMLENBQVcyQixtQkFKbEM7QUFLRSw4QkFBb0IsS0FBSzNCLEtBQUwsQ0FBVzRCLGtCQUxqQztBQU1FLG9CQUFVLEtBQUs1QixLQUFMLENBQVc2QixRQU52QjtBQU9FLG9CQUFVLEtBQUs3QixLQUFMLENBQVc4QixRQVB2QjtBQVFFLG1CQUFTLEtBQUs5QixLQUFMLENBQVcrQixPQVJ0QjtBQVNFLG9CQUFVLEtBQUsvQixLQUFMLENBQVdnQyxRQVR2QjtBQVVFLG9CQUFVLEtBQUtoQyxLQUFMLENBQVdpQyxRQVZ2QjtBQVdFLHFCQUFXLEtBQUtqQyxLQUFMLENBQVdrQyxTQVh4QjtBQVlFLHNCQUFZLEtBQUtsQyxLQUFMLENBQVdtQyxVQVp6QjtBQWFFLDRCQUFrQixLQUFLbkMsS0FBTCxDQUFXb0M7QUFiL0I7QUFlSWQ7QUFmSjtBQURGLEtBREY7QUFxQkQsRzs7O0VBckhxQzlCLE1BQU02QyxhLFVBd0JyQ0MsWSxHQUFlO0FBQ3BCYixVQUFRLGFBRFk7QUFFcEJELGFBQVcsRUFGUztBQUdwQlgsYUFBVyxFQUhTO0FBSXBCYSx1QkFBcUIsRUFKRDtBQUtwQkMsdUJBQXFCLEVBTEQ7QUFNcEJDLHNCQUFvQixFQU5BO0FBT3BCQyxZQUFVVSxTQVBVO0FBUXBCVCxZQUFVUyxTQVJVO0FBU3BCUixXQUFTUSxTQVRXO0FBVXBCUCxZQUFVLEtBVlU7QUFXcEJDLFlBQVUsS0FYVTtBQVlwQkMsYUFBVyxLQVpTO0FBYXBCQyxjQUFZLEtBYlE7QUFjcEJDLG9CQUFrQixLQWRFO0FBZXBCO0FBQ0ExQixxQkFBbUIsS0FoQkM7QUFpQnBCO0FBQ0FMLGlCQUFlLEtBbEJLO0FBbUJwQkUsbUJBQWlCLFFBbkJHO0FBb0JwQk4sc0JBQW9CLFVBcEJBO0FBcUJwQm1CLFlBQVU7QUFyQlUsQztTQXhCSHZCLFUiLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgVHJlZSwgeyBUcmVlTm9kZSB9IGZyb20gJ3JjLXRyZWUnO1xuaW1wb3J0ICdyYy10cmVlL2Fzc2V0cy9pbmRleC5jc3MnO1xuLy8gT3ZlcnJpZGUgZGVmYXVsdHMgcmMtdHJlZSBzdHlsZXNcbmltcG9ydCAnLi9vYy10cmVlLXN0eWxlcy5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0NUcmVlVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHRyZWVJZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHRyZWVDbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpY29uQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdEV4cGFuZGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgZGVmYXVsdFNlbGVjdGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgZGVmYXVsdENoZWNrZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBvbkV4cGFuZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dMaW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93SWNvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hlY2thYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAvLyBOb2RlIHJlbGF0ZWQgcHJvcHM6XG4gICAgZGlzYWJsZUNoZWNrYm94ZXM6IFByb3BUeXBlcy5ib29sLFxuICAgIC8vIEN1c3RvbWlzYXRpb24gLS0gZGVmaW5lIHRoZSBkYXRhIGxvb2tVcEtleXMgYW5kIGxvb2tVcFZhbHVlc1xuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcbiAgICBkYXRhTG9va1VwS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH07XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgdHJlZUlkOiAnZGVmYXVsdFRyZWUnLFxuICAgIHRyZWVDbGFzczogJycsXG4gICAgaWNvbkNsYXNzOiAnJyxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBbXSxcbiAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzOiBbXSxcbiAgICBkZWZhdWx0Q2hlY2tlZEtleXM6IFtdLFxuICAgIG9uRXhwYW5kOiB1bmRlZmluZWQsXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBvbkNoZWNrOiB1bmRlZmluZWQsXG4gICAgc2hvd0xpbmU6IGZhbHNlLFxuICAgIHNob3dJY29uOiBmYWxzZSxcbiAgICBjaGVja2FibGU6IGZhbHNlLFxuICAgIHNlbGVjdGFibGU6IGZhbHNlLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IGZhbHNlLFxuICAgIC8vIE5vZGUgcmVsYXRlZCBwcm9wczpcbiAgICBkaXNhYmxlQ2hlY2tib3hlczogZmFsc2UsXG4gICAgLy8gQ3VzdG9tc1xuICAgIGRhdGFMb29rVXBLZXk6ICdrZXknLFxuICAgIGRhdGFMb29rVXBWYWx1ZTogJ3BhcmVudCcsXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiAnY2hpbGRyZW4nLFxuICAgIHRyZWVEYXRhOiBbXSxcbiAgfTtcblxuICAvKiBoYXNDaGlsZHJlbnMgLSBmdW5jdGlvbiAqL1xuICBoYXNDaGlsZHJlbnMgPSAoZGF0YU9iamVjdCkgPT4ge1xuICAgIHJldHVybiAoZGF0YU9iamVjdFt0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbl1cbiAgICAgICYmIGRhdGFPYmplY3RbdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW5dLmxlbmd0aCA+PSAxXG4gICAgKTtcbiAgfVxuXG4gIC8qIHJlbmRlck5vZGVzIC0gZnVuY3Rpb24gKi9cbiAgcmVuZGVyTm9kZXMoKSB7XG4gICAgY29uc3Qgbm9kZUtleSA9IHRoaXMucHJvcHMuZGF0YUxvb2tVcEtleTtcbiAgICBjb25zdCBub2RlVmFsID0gdGhpcy5wcm9wcy5kYXRhTG9va1VwVmFsdWU7XG4gICAgY29uc3Qgbm9kZUNoaWxkID0gdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW47XG4gICAgY29uc3QgZGlzYWJsZU5vZGVDaGVja2JveGVzID0gdGhpcy5wcm9wcy5kaXNhYmxlQ2hlY2tib3hlcztcbiAgICBjb25zdCBjaGVja0NoaWxkcyA9IHRoaXMuaGFzQ2hpbGRyZW5zO1xuICAgIGNvbnN0IGN1c3RvbUljb24gPSB0aGlzLnByb3BzLmljb25DbGFzcztcbiAgICAvLyBSZWN1cnNpdmUgZnVuY3Rpb24gZm9yIGNvbGxlY3Rpbmcgbm9kZXM6XG4gICAgY29uc3QgbW91bnROb2RlcyA9IGZ1bmN0aW9uIChubGlzdCkge1xuICAgICAgY29uc3QgbHN0ID0gW107XG4gICAgICBubGlzdC5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIGlmICghY2hlY2tDaGlsZHMobm9kZSkpIHtcbiAgICAgICAgICBsc3QucHVzaChcbiAgICAgICAgICAgIDxUcmVlTm9kZVxuICAgICAgICAgICAgICB0aXRsZT17bm9kZVtub2RlVmFsXX1cbiAgICAgICAgICAgICAga2V5PXtub2RlW25vZGVLZXldfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2N1c3RvbUljb259XG4gICAgICAgICAgICAgIGRpc2FibGVDaGVja2JveD17ZGlzYWJsZU5vZGVDaGVja2JveGVzfVxuICAgICAgICAgICAgLz4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxzdC5wdXNoKFxuICAgICAgICAgICAgPFRyZWVOb2RlXG4gICAgICAgICAgICAgIHRpdGxlPXtub2RlW25vZGVWYWxdfVxuICAgICAgICAgICAgICBrZXk9e25vZGVbbm9kZUtleV19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3VzdG9tSWNvbn1cbiAgICAgICAgICAgICAgZGlzYWJsZUNoZWNrYm94PXtkaXNhYmxlTm9kZUNoZWNrYm94ZXN9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHsgbW91bnROb2Rlcyhub2RlW25vZGVDaGlsZF0pIH1cbiAgICAgICAgICAgIDwvVHJlZU5vZGU+LFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGxzdDtcbiAgICB9O1xuICAgIHJldHVybiBtb3VudE5vZGVzKHRoaXMucHJvcHMudHJlZURhdGEpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5yZW5kZXJOb2RlcygpO1xuICAgIGNvbnN0IGNsc05hbWUgPSB0aGlzLnByb3BzLnRyZWVDbGFzcyA/IGAke3RoaXMucHJvcHMudHJlZUNsYXNzfSBvYy1yZWFjdC10cmVlYCA6ICdvYy1yZWFjdC10cmVlJztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cInRyZWUtdmlldy1jb250YWluZXJcIiBjbGFzc05hbWU9e2Nsc05hbWV9PlxuICAgICAgICA8VHJlZVxuICAgICAgICAgIGlkPXt0aGlzLnByb3BzLnRyZWVJZH1cbiAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMudHJlZUNsYXNzfVxuICAgICAgICAgIGRlZmF1bHRFeHBhbmRlZEtleXM9e3RoaXMucHJvcHMuZGVmYXVsdEV4cGFuZGVkS2V5c31cbiAgICAgICAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzPXt0aGlzLnByb3BzLmRlZmF1bHRTZWxlY3RlZEtleXN9XG4gICAgICAgICAgZGVmYXVsdENoZWNrZWRLZXlzPXt0aGlzLnByb3BzLmRlZmF1bHRDaGVja2VkS2V5c31cbiAgICAgICAgICBvbkV4cGFuZD17dGhpcy5wcm9wcy5vbkV4cGFuZH1cbiAgICAgICAgICBvblNlbGVjdD17dGhpcy5wcm9wcy5vblNlbGVjdH1cbiAgICAgICAgICBvbkNoZWNrPXt0aGlzLnByb3BzLm9uQ2hlY2t9XG4gICAgICAgICAgc2hvd0xpbmU9e3RoaXMucHJvcHMuc2hvd0xpbmV9XG4gICAgICAgICAgc2hvd0ljb249e3RoaXMucHJvcHMuc2hvd0ljb259XG4gICAgICAgICAgY2hlY2thYmxlPXt0aGlzLnByb3BzLmNoZWNrYWJsZX1cbiAgICAgICAgICBzZWxlY3RhYmxlPXt0aGlzLnByb3BzLnNlbGVjdGFibGV9XG4gICAgICAgICAgZGVmYXVsdEV4cGFuZEFsbD17dGhpcy5wcm9wcy5kZWZhdWx0RXhwYW5kQWxsfVxuICAgICAgICA+XG4gICAgICAgICAgeyBub2RlcyB9XG4gICAgICAgIDwvVHJlZT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxufVxuIl19