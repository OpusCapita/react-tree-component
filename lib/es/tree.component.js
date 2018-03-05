var _class, _temp;

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
          lst.push(React.createElement(TreeNode, {
            title: node[nodeVal],
            key: node[nodeKey],
            className: customIcon
          }));
        } else {
          lst.push(React.createElement(
            TreeNode,
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
  // Customs
  dataLookUpKey: 'key',
  dataLookUpValue: 'parent',
  dataLookUpChildren: 'children',
  treeData: []
}, _temp);
export { OCTreeView as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJNYXAiLCJQcm9wVHlwZXMiLCJUcmVlIiwiVHJlZU5vZGUiLCJPQ1RyZWVWaWV3IiwiaGFzQ2hpbGRyZW5zIiwiZGF0YU9iamVjdCIsInByb3BzIiwiZGF0YUxvb2tVcENoaWxkcmVuIiwibGVuZ3RoIiwicmVuZGVyTm9kZXMiLCJub2RlS2V5IiwiZGF0YUxvb2tVcEtleSIsIm5vZGVWYWwiLCJkYXRhTG9va1VwVmFsdWUiLCJub2RlQ2hpbGQiLCJjaGVja0NoaWxkcyIsImJpbmQiLCJjdXN0b21JY29uIiwiaWNvbkNsYXNzIiwibW91bnROb2RlcyIsIm5saXN0IiwibHN0IiwiZm9yRWFjaCIsIm5vZGUiLCJwdXNoIiwidHJlZURhdGEiLCJyZW5kZXIiLCJub2RlcyIsImNsc05hbWUiLCJ0cmVlQ2xhc3MiLCJ0cmVlSWQiLCJkZWZhdWx0RXhwYW5kZWRLZXlzIiwiZGVmYXVsdFNlbGVjdGVkS2V5cyIsImRlZmF1bHRDaGVja2VkS2V5cyIsIm9uRXhwYW5kIiwib25TZWxlY3QiLCJvbkNoZWNrIiwic2hvd0xpbmUiLCJzaG93SWNvbiIsImNoZWNrYWJsZSIsInNlbGVjdGFibGUiLCJkZWZhdWx0RXhwYW5kQWxsIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsU0FBU0MsR0FBVCxRQUFvQixXQUFwQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxJQUFQLElBQWVDLFFBQWYsUUFBK0IsU0FBL0I7QUFDQSxPQUFPLDBCQUFQO0FBQ0E7QUFDQSxPQUFPLHVCQUFQOztJQUVxQkMsVTs7Ozs7Ozs7O0FBNENuQjt1QkFDQUMsWSx5QkFBYUMsVSxFQUFZO0FBQ3ZCLFdBQVFBLFdBQVcsS0FBS0MsS0FBTCxDQUFXQyxrQkFBdEIsS0FDSEYsV0FBVyxLQUFLQyxLQUFMLENBQVdDLGtCQUF0QixFQUEwQ0MsTUFBMUMsSUFBb0QsQ0FEekQ7QUFHRCxHOztBQUVEOzs7dUJBQ0FDLFcsMEJBQWM7QUFDWixRQUFNQyxVQUFVLEtBQUtKLEtBQUwsQ0FBV0ssYUFBM0I7QUFDQSxRQUFNQyxVQUFVLEtBQUtOLEtBQUwsQ0FBV08sZUFBM0I7QUFDQSxRQUFNQyxZQUFZLEtBQUtSLEtBQUwsQ0FBV0Msa0JBQTdCO0FBQ0EsUUFBTVEsY0FBYyxLQUFLWCxZQUFMLENBQWtCWSxJQUFsQixDQUF1QixJQUF2QixDQUFwQjtBQUNBLFFBQU1DLGFBQWEsS0FBS1gsS0FBTCxDQUFXWSxTQUE5QjtBQUNBO0FBQ0EsUUFBTUMsYUFBYSxTQUFiQSxVQUFhLENBQVVDLEtBQVYsRUFBaUI7QUFDbEMsVUFBTUMsTUFBTSxFQUFaO0FBQ0FELFlBQU1FLE9BQU4sQ0FBYyxVQUFDQyxJQUFELEVBQVU7QUFDdEIsWUFBSSxDQUFDUixZQUFZUSxJQUFaLENBQUwsRUFBd0I7QUFDdEJGLGNBQUlHLElBQUosQ0FDRSxvQkFBQyxRQUFEO0FBQ0UsbUJBQU9ELEtBQUtYLE9BQUwsQ0FEVDtBQUVFLGlCQUFLVyxLQUFLYixPQUFMLENBRlA7QUFHRSx1QkFBV087QUFIYixZQURGO0FBTUQsU0FQRCxNQU9PO0FBQ0xJLGNBQUlHLElBQUosQ0FDRTtBQUFDLG9CQUFEO0FBQUEsY0FBVSxPQUFPRCxLQUFLWCxPQUFMLENBQWpCLEVBQWdDLEtBQUtXLEtBQUtiLE9BQUwsQ0FBckMsRUFBb0QsV0FBV08sVUFBL0Q7QUFDSUUsdUJBQVdJLEtBQUtULFNBQUwsQ0FBWDtBQURKLFdBREY7QUFLRDtBQUNGLE9BZkQ7QUFnQkEsYUFBT08sR0FBUDtBQUNELEtBbkJEO0FBb0JBLFdBQU9GLFdBQVcsS0FBS2IsS0FBTCxDQUFXbUIsUUFBdEIsQ0FBUDtBQUNELEc7O3VCQUVEQyxNLHFCQUFTO0FBQ1AsUUFBTUMsUUFBUSxLQUFLbEIsV0FBTCxFQUFkO0FBQ0EsUUFBTW1CLFVBQVUsS0FBS3RCLEtBQUwsQ0FBV3VCLFNBQVgsR0FBMEIsS0FBS3ZCLEtBQUwsQ0FBV3VCLFNBQXJDLHNCQUFpRSxlQUFqRjtBQUNBLFdBQ0U7QUFBQTtBQUFBLFFBQUssSUFBRyxxQkFBUixFQUE4QixXQUFXRCxPQUF6QztBQUNFO0FBQUMsWUFBRDtBQUFBO0FBQ0UsY0FBSSxLQUFLdEIsS0FBTCxDQUFXd0IsTUFEakI7QUFFRSxxQkFBVyxLQUFLeEIsS0FBTCxDQUFXdUIsU0FGeEI7QUFHRSwrQkFBcUIsS0FBS3ZCLEtBQUwsQ0FBV3lCLG1CQUhsQztBQUlFLCtCQUFxQixLQUFLekIsS0FBTCxDQUFXMEIsbUJBSmxDO0FBS0UsOEJBQW9CLEtBQUsxQixLQUFMLENBQVcyQixrQkFMakM7QUFNRSxvQkFBVSxLQUFLM0IsS0FBTCxDQUFXNEIsUUFOdkI7QUFPRSxvQkFBVSxLQUFLNUIsS0FBTCxDQUFXNkIsUUFQdkI7QUFRRSxtQkFBUyxLQUFLN0IsS0FBTCxDQUFXOEIsT0FSdEI7QUFTRSxvQkFBVSxLQUFLOUIsS0FBTCxDQUFXK0IsUUFUdkI7QUFVRSxvQkFBVSxLQUFLL0IsS0FBTCxDQUFXZ0MsUUFWdkI7QUFXRSxxQkFBVyxLQUFLaEMsS0FBTCxDQUFXaUMsU0FYeEI7QUFZRSxzQkFBWSxLQUFLakMsS0FBTCxDQUFXa0MsVUFaekI7QUFhRSw0QkFBa0IsS0FBS2xDLEtBQUwsQ0FBV21DO0FBYi9CO0FBZUlkO0FBZko7QUFERixLQURGO0FBcUJELEc7OztFQTFHcUM3QixNQUFNNEMsYSxVQXNCckNDLFksR0FBZTtBQUNwQmIsVUFBUSxhQURZO0FBRXBCRCxhQUFXLEVBRlM7QUFHcEJYLGFBQVcsRUFIUztBQUlwQmEsdUJBQXFCLEVBSkQ7QUFLcEJDLHVCQUFxQixFQUxEO0FBTXBCQyxzQkFBb0IsRUFOQTtBQU9wQkMsWUFBVVUsU0FQVTtBQVFwQlQsWUFBVVMsU0FSVTtBQVNwQlIsV0FBU1EsU0FUVztBQVVwQlAsWUFBVSxLQVZVO0FBV3BCQyxZQUFVLEtBWFU7QUFZcEJDLGFBQVcsS0FaUztBQWFwQkMsY0FBWSxLQWJRO0FBY3BCQyxvQkFBa0IsS0FkRTtBQWVwQjtBQUNBOUIsaUJBQWUsS0FoQks7QUFpQnBCRSxtQkFBaUIsUUFqQkc7QUFrQnBCTixzQkFBb0IsVUFsQkE7QUFtQnBCa0IsWUFBVTtBQW5CVSxDO1NBdEJIdEIsVSIsImZpbGUiOiJ0cmVlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBUcmVlLCB7IFRyZWVOb2RlIH0gZnJvbSAncmMtdHJlZSc7XG5pbXBvcnQgJ3JjLXRyZWUvYXNzZXRzL2luZGV4LmNzcyc7XG4vLyBPdmVycmlkZSBkZWZhdWx0cyByYy10cmVlIHN0eWxlc1xuaW1wb3J0ICcuL29jLXRyZWUtc3R5bGVzLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPQ1RyZWVWaWV3IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgdHJlZUlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgdHJlZUNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGljb25DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZWZhdWx0Q2hlY2tlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIG9uRXhwYW5kOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGVjazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd0xpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dJY29uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjaGVja2FibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgIC8vIEN1c3RvbWlzYXRpb24gLS0gZGVmaW5lIHRoZSBkYXRhIGxvb2tVcEtleXMgYW5kIGxvb2tVcFZhbHVlc1xuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcbiAgICBkYXRhTG9va1VwS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgZGF0YUxvb2tVcFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH07XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgdHJlZUlkOiAnZGVmYXVsdFRyZWUnLFxuICAgIHRyZWVDbGFzczogJycsXG4gICAgaWNvbkNsYXNzOiAnJyxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBbXSxcbiAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzOiBbXSxcbiAgICBkZWZhdWx0Q2hlY2tlZEtleXM6IFtdLFxuICAgIG9uRXhwYW5kOiB1bmRlZmluZWQsXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBvbkNoZWNrOiB1bmRlZmluZWQsXG4gICAgc2hvd0xpbmU6IGZhbHNlLFxuICAgIHNob3dJY29uOiBmYWxzZSxcbiAgICBjaGVja2FibGU6IGZhbHNlLFxuICAgIHNlbGVjdGFibGU6IGZhbHNlLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IGZhbHNlLFxuICAgIC8vIEN1c3RvbXNcbiAgICBkYXRhTG9va1VwS2V5OiAna2V5JyxcbiAgICBkYXRhTG9va1VwVmFsdWU6ICdwYXJlbnQnLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogJ2NoaWxkcmVuJyxcbiAgICB0cmVlRGF0YTogW10sXG4gIH07XG5cbiAgLyogaGFzQ2hpbGRyZW5zIC0gZnVuY3Rpb24gKi9cbiAgaGFzQ2hpbGRyZW5zKGRhdGFPYmplY3QpIHtcbiAgICByZXR1cm4gKGRhdGFPYmplY3RbdGhpcy5wcm9wcy5kYXRhTG9va1VwQ2hpbGRyZW5dXG4gICAgICAmJiBkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXS5sZW5ndGggPj0gMVxuICAgICk7XG4gIH1cblxuICAvKiByZW5kZXJOb2RlcyAtIGZ1bmN0aW9uICovXG4gIHJlbmRlck5vZGVzKCkge1xuICAgIGNvbnN0IG5vZGVLZXkgPSB0aGlzLnByb3BzLmRhdGFMb29rVXBLZXk7XG4gICAgY29uc3Qgbm9kZVZhbCA9IHRoaXMucHJvcHMuZGF0YUxvb2tVcFZhbHVlO1xuICAgIGNvbnN0IG5vZGVDaGlsZCA9IHRoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuO1xuICAgIGNvbnN0IGNoZWNrQ2hpbGRzID0gdGhpcy5oYXNDaGlsZHJlbnMuYmluZCh0aGlzKTtcbiAgICBjb25zdCBjdXN0b21JY29uID0gdGhpcy5wcm9wcy5pY29uQ2xhc3M7XG4gICAgLy8gUmVjdXJzaXZlIGZ1bmN0aW9uIGZvciBjb2xsZWN0aW5nIG5vZGVzOlxuICAgIGNvbnN0IG1vdW50Tm9kZXMgPSBmdW5jdGlvbiAobmxpc3QpIHtcbiAgICAgIGNvbnN0IGxzdCA9IFtdO1xuICAgICAgbmxpc3QuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAoIWNoZWNrQ2hpbGRzKG5vZGUpKSB7XG4gICAgICAgICAgbHN0LnB1c2goXG4gICAgICAgICAgICA8VHJlZU5vZGVcbiAgICAgICAgICAgICAgdGl0bGU9e25vZGVbbm9kZVZhbF19XG4gICAgICAgICAgICAgIGtleT17bm9kZVtub2RlS2V5XX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjdXN0b21JY29ufVxuICAgICAgICAgICAgLz4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxzdC5wdXNoKFxuICAgICAgICAgICAgPFRyZWVOb2RlIHRpdGxlPXtub2RlW25vZGVWYWxdfSBrZXk9e25vZGVbbm9kZUtleV19IGNsYXNzTmFtZT17Y3VzdG9tSWNvbn0+XG4gICAgICAgICAgICAgIHsgbW91bnROb2Rlcyhub2RlW25vZGVDaGlsZF0pIH1cbiAgICAgICAgICAgIDwvVHJlZU5vZGU+LFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGxzdDtcbiAgICB9O1xuICAgIHJldHVybiBtb3VudE5vZGVzKHRoaXMucHJvcHMudHJlZURhdGEpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5yZW5kZXJOb2RlcygpO1xuICAgIGNvbnN0IGNsc05hbWUgPSB0aGlzLnByb3BzLnRyZWVDbGFzcyA/IGAke3RoaXMucHJvcHMudHJlZUNsYXNzfSBvYy1yZWFjdC10cmVlYCA6ICdvYy1yZWFjdC10cmVlJztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cInRyZWUtdmlldy1jb250YWluZXJcIiBjbGFzc05hbWU9e2Nsc05hbWV9PlxuICAgICAgICA8VHJlZVxuICAgICAgICAgIGlkPXt0aGlzLnByb3BzLnRyZWVJZH1cbiAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMudHJlZUNsYXNzfVxuICAgICAgICAgIGRlZmF1bHRFeHBhbmRlZEtleXM9e3RoaXMucHJvcHMuZGVmYXVsdEV4cGFuZGVkS2V5c31cbiAgICAgICAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzPXt0aGlzLnByb3BzLmRlZmF1bHRTZWxlY3RlZEtleXN9XG4gICAgICAgICAgZGVmYXVsdENoZWNrZWRLZXlzPXt0aGlzLnByb3BzLmRlZmF1bHRDaGVja2VkS2V5c31cbiAgICAgICAgICBvbkV4cGFuZD17dGhpcy5wcm9wcy5vbkV4cGFuZH1cbiAgICAgICAgICBvblNlbGVjdD17dGhpcy5wcm9wcy5vblNlbGVjdH1cbiAgICAgICAgICBvbkNoZWNrPXt0aGlzLnByb3BzLm9uQ2hlY2t9XG4gICAgICAgICAgc2hvd0xpbmU9e3RoaXMucHJvcHMuc2hvd0xpbmV9XG4gICAgICAgICAgc2hvd0ljb249e3RoaXMucHJvcHMuc2hvd0ljb259XG4gICAgICAgICAgY2hlY2thYmxlPXt0aGlzLnByb3BzLmNoZWNrYWJsZX1cbiAgICAgICAgICBzZWxlY3RhYmxlPXt0aGlzLnByb3BzLnNlbGVjdGFibGV9XG4gICAgICAgICAgZGVmYXVsdEV4cGFuZEFsbD17dGhpcy5wcm9wcy5kZWZhdWx0RXhwYW5kQWxsfVxuICAgICAgICA+XG4gICAgICAgICAgeyBub2RlcyB9XG4gICAgICAgIDwvVHJlZT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxufVxuIl19