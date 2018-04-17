var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
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
          lst.push( // eslint-disable-line function-paren-newline
          React.createElement(TreeNode, {
            title: node[nodeVal],
            key: node[nodeKey],
            className: customIcon + ' ' + disableCls,
            disableCheckbox: disableNodeCheckboxes
          }));
        } else {
          lst.push( // eslint-disable-line function-paren-newline
          React.createElement(
            TreeNode,
            {
              title: node[nodeVal],
              key: node[nodeKey],
              className: customIcon + ' ' + disableCls,
              disableCheckbox: disableNodeCheckboxes
            },
            mountNodes(node[nodeChild])
          ));
        }
        return false;
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
      !!nodes.length && React.createElement(
        Tree,
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
  treeData: [],
  checkedKeys: []
}, _temp2);
export { OCTreeView as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJUcmVlIiwiVHJlZU5vZGUiLCJPQ1RyZWVWaWV3IiwiaGFzQ2hpbGRyZW4iLCJkYXRhT2JqZWN0IiwicHJvcHMiLCJkYXRhTG9va1VwQ2hpbGRyZW4iLCJsZW5ndGgiLCJyZW5kZXJOb2RlcyIsIm5vZGVLZXkiLCJkYXRhTG9va1VwS2V5Iiwibm9kZVZhbCIsImRhdGFMb29rVXBWYWx1ZSIsIm5vZGVDaGlsZCIsImRpc2FibGVOb2RlQ2hlY2tib3hlcyIsImRpc2FibGVDaGVja2JveGVzIiwiY2hlY2tDaGlsZHJlbiIsImRpc2FibGVDbHMiLCJjdXN0b21JY29uIiwiaWNvbkNsYXNzIiwibW91bnROb2RlcyIsIm5vZGVMaXN0IiwibHN0IiwiZm9yRWFjaCIsIm5vZGUiLCJwdXNoIiwidHJlZURhdGEiLCJyZW5kZXIiLCJub2RlcyIsImNsc05hbWUiLCJ0cmVlQ2xhc3MiLCJ0cmVlSWQiLCJkZWZhdWx0RXhwYW5kZWRLZXlzIiwiZGVmYXVsdFNlbGVjdGVkS2V5cyIsImRlZmF1bHRDaGVja2VkS2V5cyIsImNoZWNrZWRLZXlzIiwib25FeHBhbmQiLCJvblNlbGVjdCIsIm9uQ2hlY2siLCJzaG93TGluZSIsInNob3dJY29uIiwiY2hlY2thYmxlIiwic2VsZWN0YWJsZSIsImRlZmF1bHRFeHBhbmRBbGwiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsSUFBUCxJQUFlQyxRQUFmLFFBQStCLFNBQS9CO0FBQ0EsT0FBTywwQkFBUDtBQUNBO0FBQ0EsT0FBTyx1QkFBUDs7SUFFcUJDLFU7Ozs7Ozs7Ozs7OztnS0FvRG5CQyxXLEdBQWM7QUFBQSxhQUFnQkMsV0FBVyxN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Z0JHZjtBQWhCSDtBQUZGLEtBREY7QUF3QkQsRzs7O0VBN0hxQzlCLE1BQU04QyxhLFVBMEJyQ0MsWSxHQUFlO0FBQ3BCZCxVQUFRLGFBRFk7QUFFcEJELGFBQVcsRUFGUztBQUdwQlgsYUFBVyxFQUhTO0FBSXBCYSx1QkFBcUIsRUFKRDtBQUtwQkMsdUJBQXFCLEVBTEQ7QUFNcEJDLHNCQUFvQixFQU5BO0FBT3BCRSxZQUFVVSxTQVBVO0FBUXBCVCxZQUFVUyxTQVJVO0FBU3BCUixXQUFTUSxTQVRXO0FBVXBCUCxZQUFVLEtBVlU7QUFXcEJDLFlBQVUsS0FYVTtBQVlwQkMsYUFBVyxLQVpTO0FBYXBCQyxjQUFZLEtBYlE7QUFjcEJDLG9CQUFrQixLQWRFO0FBZXBCO0FBQ0E1QixxQkFBbUIsS0FoQkM7QUFpQnBCO0FBQ0FMLGlCQUFlLEtBbEJLO0FBbUJwQkUsbUJBQWlCLFFBbkJHO0FBb0JwQk4sc0JBQW9CLFVBcEJBO0FBcUJwQm9CLFlBQVUsRUFyQlU7QUFzQnBCUyxlQUFhO0FBdEJPLEM7U0ExQkhqQyxVIiwiZmlsZSI6InRyZWUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgVHJlZSwgeyBUcmVlTm9kZSB9IGZyb20gJ3JjLXRyZWUnO1xuaW1wb3J0ICdyYy10cmVlL2Fzc2V0cy9pbmRleC5jc3MnO1xuLy8gT3ZlcnJpZGUgZGVmYXVsdHMgcmMtdHJlZSBzdHlsZXNcbmltcG9ydCAnLi9vYy10cmVlLXN0eWxlcy5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0NUcmVlVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHRyZWVJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0cmVlQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWNvbkNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlZmF1bHRFeHBhbmRlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGRlZmF1bHRTZWxlY3RlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGRlZmF1bHRDaGVja2VkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgb25FeHBhbmQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoZWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ljb246IFByb3BUeXBlcy5ib29sLFxuICAgIGNoZWNrYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0YWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgLy8gTm9kZSByZWxhdGVkIHByb3BzOlxuICAgIGRpc2FibGVDaGVja2JveGVzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAvLyBDdXN0b21pc2F0aW9uIC0tIGRlZmluZSB0aGUgZGF0YSBsb29rVXBLZXlzIGFuZCBsb29rVXBWYWx1ZXNcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksXG4gICAgZGF0YUxvb2tVcEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXRhTG9va1VwVmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoZWNrZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHRyZWVJZDogJ2RlZmF1bHRUcmVlJyxcbiAgICB0cmVlQ2xhc3M6ICcnLFxuICAgIGljb25DbGFzczogJycsXG4gICAgZGVmYXVsdEV4cGFuZGVkS2V5czogW10sXG4gICAgZGVmYXVsdFNlbGVjdGVkS2V5czogW10sXG4gICAgZGVmYXVsdENoZWNrZWRLZXlzOiBbXSxcbiAgICBvbkV4cGFuZDogdW5kZWZpbmVkLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25DaGVjazogdW5kZWZpbmVkLFxuICAgIHNob3dMaW5lOiBmYWxzZSxcbiAgICBzaG93SWNvbjogZmFsc2UsXG4gICAgY2hlY2thYmxlOiBmYWxzZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBmYWxzZSxcbiAgICAvLyBOb2RlIHJlbGF0ZWQgcHJvcHM6XG4gICAgZGlzYWJsZUNoZWNrYm94ZXM6IGZhbHNlLFxuICAgIC8vIEN1c3RvbXNcbiAgICBkYXRhTG9va1VwS2V5OiAna2V5JyxcbiAgICBkYXRhTG9va1VwVmFsdWU6ICdwYXJlbnQnLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogJ2NoaWxkcmVuJyxcbiAgICB0cmVlRGF0YTogW10sXG4gICAgY2hlY2tlZEtleXM6IFtdLFxuICB9O1xuXG4gIC8qIGhhc0NoaWxkcmVuIC0gZnVuY3Rpb24gKi9cbiAgaGFzQ2hpbGRyZW4gPSBkYXRhT2JqZWN0ID0+ICgoZGF0YU9iamVjdFt0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbl1cbiAgICAmJiBkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXS5sZW5ndGggPj0gMVxuICApKTtcblxuICAvKiByZW5kZXJOb2RlcyAtIGZ1bmN0aW9uICovXG4gIHJlbmRlck5vZGVzKCkge1xuICAgIGNvbnN0IG5vZGVLZXkgPSB0aGlzLnByb3BzLmRhdGFMb29rVXBLZXk7XG4gICAgY29uc3Qgbm9kZVZhbCA9IHRoaXMucHJvcHMuZGF0YUxvb2tVcFZhbHVlO1xuICAgIGNvbnN0IG5vZGVDaGlsZCA9IHRoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuO1xuICAgIGNvbnN0IGRpc2FibGVOb2RlQ2hlY2tib3hlcyA9IHRoaXMucHJvcHMuZGlzYWJsZUNoZWNrYm94ZXM7XG4gICAgY29uc3QgY2hlY2tDaGlsZHJlbiA9IHRoaXMuaGFzQ2hpbGRyZW47XG4gICAgY29uc3QgZGlzYWJsZUNscyA9IGRpc2FibGVOb2RlQ2hlY2tib3hlcyA/ICdkaXNhYmxlZCcgOiAnJztcbiAgICBjb25zdCBjdXN0b21JY29uID0gdGhpcy5wcm9wcy5pY29uQ2xhc3M7XG5cbiAgICAvLyBSZWN1cnNpdmUgZnVuY3Rpb24gZm9yIGNvbGxlY3Rpbmcgbm9kZXM6XG4gICAgY29uc3QgbW91bnROb2RlcyA9IChub2RlTGlzdCkgPT4ge1xuICAgICAgY29uc3QgbHN0ID0gW107XG4gICAgICBub2RlTGlzdC5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIGlmICghbm9kZVtub2RlS2V5XSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoIWNoZWNrQ2hpbGRyZW4obm9kZSkpIHtcbiAgICAgICAgICBsc3QucHVzaCggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jdGlvbi1wYXJlbi1uZXdsaW5lXG4gICAgICAgICAgICA8VHJlZU5vZGVcbiAgICAgICAgICAgICAgdGl0bGU9e25vZGVbbm9kZVZhbF19XG4gICAgICAgICAgICAgIGtleT17bm9kZVtub2RlS2V5XX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtjdXN0b21JY29ufSAke2Rpc2FibGVDbHN9YH1cbiAgICAgICAgICAgICAgZGlzYWJsZUNoZWNrYm94PXtkaXNhYmxlTm9kZUNoZWNrYm94ZXN9XG4gICAgICAgICAgICAvPik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbHN0LnB1c2goIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuY3Rpb24tcGFyZW4tbmV3bGluZVxuICAgICAgICAgICAgPFRyZWVOb2RlXG4gICAgICAgICAgICAgIHRpdGxlPXtub2RlW25vZGVWYWxdfVxuICAgICAgICAgICAgICBrZXk9e25vZGVbbm9kZUtleV19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7Y3VzdG9tSWNvbn0gJHtkaXNhYmxlQ2xzfWB9XG4gICAgICAgICAgICAgIGRpc2FibGVDaGVja2JveD17ZGlzYWJsZU5vZGVDaGVja2JveGVzfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bW91bnROb2Rlcyhub2RlW25vZGVDaGlsZF0pfVxuICAgICAgICAgICAgPC9UcmVlTm9kZT4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGxzdDtcbiAgICB9O1xuICAgIHJldHVybiBtb3VudE5vZGVzKHRoaXMucHJvcHMudHJlZURhdGEpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5yZW5kZXJOb2RlcygpO1xuICAgIGNvbnN0IGNsc05hbWUgPSB0aGlzLnByb3BzLnRyZWVDbGFzcyA/IGAke3RoaXMucHJvcHMudHJlZUNsYXNzfSBvYy1yZWFjdC10cmVlYCA6ICdvYy1yZWFjdC10cmVlJztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwidHJlZS12aWV3LWNvbnRhaW5lclwiIGNsYXNzTmFtZT17Y2xzTmFtZX0+XG4gICAgICAgIHshIW5vZGVzLmxlbmd0aCAmJlxuICAgICAgICA8VHJlZVxuICAgICAgICAgIGlkPXt0aGlzLnByb3BzLnRyZWVJZH1cbiAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMudHJlZUNsYXNzfVxuICAgICAgICAgIGRlZmF1bHRFeHBhbmRlZEtleXM9e3RoaXMucHJvcHMuZGVmYXVsdEV4cGFuZGVkS2V5c31cbiAgICAgICAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzPXt0aGlzLnByb3BzLmRlZmF1bHRTZWxlY3RlZEtleXN9XG4gICAgICAgICAgZGVmYXVsdENoZWNrZWRLZXlzPXt0aGlzLnByb3BzLmRlZmF1bHRDaGVja2VkS2V5c31cbiAgICAgICAgICBjaGVja2VkS2V5cz17dGhpcy5wcm9wcy5jaGVja2VkS2V5c31cbiAgICAgICAgICBvbkV4cGFuZD17dGhpcy5wcm9wcy5vbkV4cGFuZH1cbiAgICAgICAgICBvblNlbGVjdD17dGhpcy5wcm9wcy5vblNlbGVjdH1cbiAgICAgICAgICBvbkNoZWNrPXt0aGlzLnByb3BzLm9uQ2hlY2t9XG4gICAgICAgICAgc2hvd0xpbmU9e3RoaXMucHJvcHMuc2hvd0xpbmV9XG4gICAgICAgICAgc2hvd0ljb249e3RoaXMucHJvcHMuc2hvd0ljb259XG4gICAgICAgICAgY2hlY2thYmxlPXt0aGlzLnByb3BzLmNoZWNrYWJsZX1cbiAgICAgICAgICBzZWxlY3RhYmxlPXt0aGlzLnByb3BzLnNlbGVjdGFibGV9XG4gICAgICAgICAgZGVmYXVsdEV4cGFuZEFsbD17dGhpcy5wcm9wcy5kZWZhdWx0RXhwYW5kQWxsfVxuICAgICAgICA+XG4gICAgICAgICAge25vZGVzfVxuICAgICAgICA8L1RyZWU+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==