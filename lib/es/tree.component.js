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
import CheckboxIcon from './checkbox-icon.component';

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
          React.createElement(TreeNode, {
            title: node[dataLookUpValue],
            key: node[dataLookUpKey],
            className: '' + iconClass,
            icon: React.createElement(CheckboxIcon, {
              checked: _this2.isChecked(node[dataLookUpKey]),
              halfChecked: false,
              disabled: disabled
            })
          }));
        } else {
          // Parent node
          var isHalfChecked = _this2.isChecked(node[dataLookUpKey]) ? false : _this2.isChildChecked(node);

          list.push( // eslint-disable-line function-paren-newline
          React.createElement(
            TreeNode,
            {
              title: node[dataLookUpValue],
              key: node[dataLookUpKey],
              className: '' + iconClass,
              icon: React.createElement(CheckboxIcon, {
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


    return React.createElement(
      'div',
      { id: 'tree-view-container', className: clsName },
      !!nodes.length && React.createElement(
        Tree,
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
}(React.PureComponent), _class.defaultProps = {
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
export { OCTreeView as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJUcmVlIiwiVHJlZU5vZGUiLCJDaGVja2JveEljb24iLCJPQ1RyZWVWaWV3Iiwib25EcmFnRHJvcCIsImUiLCJwcm9wcyIsIlR5cGVFcnJvciIsImRyb3BLZXkiLCJub2RlIiwiZXZlbnRLZXkiLCJkcmFnS2V5IiwiZHJhZ05vZGUiLCJsb29wIiwiZGF0YSIsImtleSIsImNhbGxiYWNrIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsImFyciIsImNoaWxkcmVuIiwibmV3RGF0YSIsInRyZWVEYXRhIiwic2xpY2UiLCJkcmFnT2JqIiwic3BsaWNlIiwiZHJvcFRvR2FwIiwiYXIiLCJpIiwicHVzaCIsImlzQ2hpbGRDaGVja2VkIiwiZGF0YUxvb2tVcENoaWxkcmVuIiwiZGF0YUxvb2tVcEtleSIsImxlbmd0aCIsImZvdW5kIiwiZmluZCIsImlzQ2hlY2tlZCIsImNoaWxkIiwiY2hlY2tlZEtleXMiLCJpbmNsdWRlcyIsImRlZmF1bHRDaGVja2VkS2V5cyIsImhhc0NoaWxkcmVuIiwiZGF0YU9iamVjdCIsInJlbmRlck5vZGVzIiwiZGF0YUxvb2tVcFZhbHVlIiwiaWNvbkNsYXNzIiwiZGlzYWJsZWQiLCJjaGVja0NoaWxkcmVuIiwibW91bnROb2RlcyIsIm5vZGVMaXN0IiwibGlzdCIsImlzSGFsZkNoZWNrZWQiLCJyZW5kZXIiLCJub2RlcyIsImNsc05hbWUiLCJ0cmVlQ2xhc3MiLCJ0cmVlSWQiLCJkZWZhdWx0RXhwYW5kZWRLZXlzIiwiZGVmYXVsdFNlbGVjdGVkS2V5cyIsIm9uRXhwYW5kIiwib25TZWxlY3QiLCJvbkNoZWNrIiwic2hvd0xpbmUiLCJzaG93SWNvbiIsImNoZWNrYWJsZSIsInNlbGVjdGFibGUiLCJkZWZhdWx0RXhwYW5kQWxsIiwiZHJhZ2dhYmxlIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLElBQVAsSUFBZUMsUUFBZixRQUErQixTQUEvQjtBQUNBLE9BQU8sMEJBQVA7QUFDQTtBQUNBLE9BQU8sdUJBQVA7QUFDQSxPQUFPQyxZQUFQLE1BQXlCLDJCQUF6Qjs7SUFFcUJDLFU7Ozs7Ozs7Ozs7OztnS0FzRG5CQyxVLEdBQWEsVUFBQ0MsQ0FBRCxFQUFPO0FBQ2xCLFVBQUksQ0FBQyxNQUFLQyxLQUFMLENBQVdGLFVBQWhCLEVBQTRCLE1BQU0sSUFBSUcsU0FBSixDQUFjLG9DQUFkLENBQU47O0FBRTVCLFVBQU1DLFVBQVVILEVBQUVJLElBQUYsQ0FBT0gsS0FBUCxDQUFhSSxRQUE3QjtBQUNBLFVBQU1DLFVBQVVOLEVBQUVPLFFBQUYsQ0FBV04sS0FBWCxDQUFpQkksUUFBakM7O0FBRUEsVUFBTUcsT0FBTyxTQUFQQSxJQUFPLENBQUNDLElBQUQsRUFBT0MsR0FBUCxFQUFZQyxRQUFaLEVBQXlCO0FBQ3BDRixhQUFLRyxPQUFMLENBQWEsVUFBQ0MsSUFBRCxFQUFPQyxLQUFQLEVBQWNDLEdBQWQsRUFBc0I7QUFDakMsY0FBSUYsS0FBS0gsR0FBTCxLQUFhQSxHQUFqQixFQUFzQixPQUFPQyxTQUFTRSxJQUFULEVBQWVDLEtBQWYsRUFBc0JDLEdBQXRCLENBQVA7QUFDdEIsY0FBSUYsS0FBS0csUUFBVCxFQUFtQixPQUFPUixLQUFLSyxLQUFLRyxRQUFWLEVBQW9CTixHQUFwQixFQUF5QkMsUUFBekIsQ0FBUDtBQUNuQixpQkFBTyxJQUFQO0FBQ0QsU0FKRDtBQUtELE9BTkQ7O0FBUUEsVUFBTU0sVUFBVSxNQUFLaEIsS0FBTCxDQUFXaUIsUUFBWCxDQUFvQkMsS0FBcEIsRUFBaEI7O0FBRUEsVUFBSUMsZ0JBQUo7QUFDQVosV0FBS1MsT0FBTCxFQUFjWCxPQUFkLEVBQXVCLFVBQUNPLElBQUQsRUFBT0MsS0FBUCxFQUFjQyxHQUFkLEVBQXNCO0FBQzNDQSxZQUFJTSxNQUFKLENBQVdQLEtBQVgsRUFBa0IsQ0FBbEI7QUFDQU0sa0JBQVVQLElBQVY7QUFDRCxPQUhEOztBQUtBO0FBQ0EsVUFBSWIsRUFBRXNCLFNBQU4sRUFBaUI7QUFDZixZQUFJQyxXQUFKO0FBQ0EsWUFBSUMsVUFBSjtBQUNBaEIsYUFBS1MsT0FBTCxFQUFjZCxPQUFkLEVBQXVCLFVBQUNVLElBQUQsRUFBT0MsS0FBUCxFQUFjQyxHQUFkLEVBQXNCO0FBQzNDUSxlQUFLUixHQUFMO0FBQ0FTLGNBQUlWLEtBQUo7QUFDRCxTQUhEO0FBSUFTLFdBQUdGLE1BQUgsQ0FBVUcsQ0FBVixFQUFhLENBQWIsRUFBZ0JKLE9BQWhCO0FBQ0QsT0FSRCxNQVFPO0FBQ0xaLGFBQUtTLE9BQUwsRUFBY2QsT0FBZCxFQUF1QixVQUFDVSxJQUFELEVBQVU7QUFDL0JBLGVBQUtHLFFBQUwsR0FBZ0JILEtBQUtHLFFBQUwsSUFBaUIsRUFBakMsQ0FEK0IsQ0FDTTtBQUNyQ0gsZUFBS0csUUFBTCxDQUFjUyxJQUFkLENBQW1CTCxPQUFuQjtBQUNELFNBSEQ7QUFJRDs7QUFFRCxZQUFLbkIsS0FBTCxDQUFXRixVQUFYLENBQXNCa0IsT0FBdEI7QUFDRCxLLFFBRURTLGMsR0FBaUIsVUFBQ3RCLElBQUQsRUFBb0I7QUFBQSxVQUFiVyxHQUFhLHVFQUFQLEVBQU87QUFBQSx3QkFDVyxNQUFLZCxLQURoQjtBQUFBLFVBQzNCMEIsa0JBRDJCLGVBQzNCQSxrQkFEMkI7QUFBQSxVQUNQQyxhQURPLGVBQ1BBLGFBRE87O0FBRW5DLFVBQU1aLFdBQVdELElBQUljLE1BQUosR0FBYWQsR0FBYixHQUFtQlgsS0FBS3VCLGtCQUFMLENBQXBDO0FBQ0EsVUFBSUcsUUFBUWQsU0FBU2UsSUFBVCxDQUFjO0FBQUEsZUFBUyxNQUFLQyxTQUFMLENBQWVDLE1BQU1MLGFBQU4sQ0FBZixDQUFUO0FBQUEsT0FBZCxDQUFaOztBQUVBLFVBQUksQ0FBQ0UsS0FBTCxFQUFZO0FBQ1ZkLGlCQUFTSixPQUFULENBQWlCLFVBQUNxQixLQUFELEVBQVc7QUFDMUIsY0FBSUEsTUFBTU4sa0JBQU4sS0FBNkIsQ0FBQ0csS0FBbEMsRUFBeUM7QUFDdkNBLG9CQUFRLE1BQUtKLGNBQUwsQ0FBb0JPLEtBQXBCLEVBQTJCQSxNQUFNTixrQkFBTixDQUEzQixDQUFSO0FBQ0Q7QUFDRixTQUpEO0FBS0Q7QUFDRCxhQUFPLENBQUMsQ0FBQ0csS0FBVDtBQUNELEssUUFFREUsUyxHQUFZO0FBQUEsYUFDVixNQUFLL0IsS0FBTCxDQUFXaUMsV0FBWCxDQUF1QkMsUUFBdkIsQ0FBZ0N6QixHQUFoQyxLQUF3QyxNQUFLVCxLQUFMLENBQVdtQyxrQkFBWCxDQUE4QkQsUUFBOUIsQ0FBdUN6QixHQUF2QyxDQUQ5QjtBQUFBLEssUUFJWjJCLFcsR0FBYztBQUFBLGFBQWdCQyxXQUFXLE1BQUtyQyxLQUFMLENBQVcwQixrQkFBdEIsS0FDekJXLFdBQVcsTUFBS3JDLEtBQUwsQ0FBVzBCLGtCQUF0QixFQUEwQ0UsTUFBMUMsSUFBb0QsQ0FEM0M7QUFBQSxLOzs7QUFEZDs7O0FBS0E7dUJBQ0FVLFcsMEJBQWM7QUFBQTs7QUFBQSxpQkFHUixLQUFLdEMsS0FIRztBQUFBLFFBRVYyQixhQUZVLFVBRVZBLGFBRlU7QUFBQSxRQUVLWSxlQUZMLFVBRUtBLGVBRkw7QUFBQSxRQUVzQmIsa0JBRnRCLFVBRXNCQSxrQkFGdEI7QUFBQSxRQUUwQ2MsU0FGMUMsVUFFMENBLFNBRjFDO0FBQUEsUUFFcURDLFFBRnJELFVBRXFEQSxRQUZyRDs7QUFJWixRQUFNQyxnQkFBZ0IsS0FBS04sV0FBM0I7O0FBRUE7QUFDQSxRQUFNTyxhQUFhLFNBQWJBLFVBQWEsQ0FBQ0MsUUFBRCxFQUFjO0FBQy9CLFVBQU1DLE9BQU8sRUFBYjtBQUNBRCxlQUFTakMsT0FBVCxDQUFpQixVQUFDUixJQUFELEVBQVU7QUFDekIsWUFBSSxDQUFDQSxLQUFLd0IsYUFBTCxDQUFMLEVBQTBCLE9BQU8sS0FBUDtBQUMxQjtBQUNBLFlBQUksQ0FBQ2UsY0FBY3ZDLElBQWQsQ0FBTCxFQUEwQjtBQUN4QjBDLGVBQUtyQixJQUFMLEVBQVc7QUFDVCw4QkFBQyxRQUFEO0FBQ0UsbUJBQU9yQixLQUFLb0MsZUFBTCxDQURUO0FBRUUsaUJBQUtwQyxLQUFLd0IsYUFBTCxDQUZQO0FBR0UsNEJBQWNhLFNBSGhCO0FBSUUsa0JBQ0Usb0JBQUMsWUFBRDtBQUNFLHVCQUFTLE9BQUtULFNBQUwsQ0FBZTVCLEtBQUt3QixhQUFMLENBQWYsQ0FEWDtBQUVFLDJCQUFhLEtBRmY7QUFHRSx3QkFBVWM7QUFIWjtBQUxKLFlBREY7QUFhRCxTQWRELE1BY087QUFDTDtBQUNBLGNBQU1LLGdCQUNKLE9BQUtmLFNBQUwsQ0FBZTVCLEtBQUt3QixhQUFMLENBQWYsSUFBc0MsS0FBdEMsR0FBOEMsT0FBS0YsY0FBTCxDQUFvQnRCLElBQXBCLENBRGhEOztBQUdBMEMsZUFBS3JCLElBQUwsRUFBVztBQUNUO0FBQUMsb0JBQUQ7QUFBQTtBQUNFLHFCQUFPckIsS0FBS29DLGVBQUwsQ0FEVDtBQUVFLG1CQUFLcEMsS0FBS3dCLGFBQUwsQ0FGUDtBQUdFLDhCQUFjYSxTQUhoQjtBQUlFLG9CQUNFLG9CQUFDLFlBQUQ7QUFDRSx5QkFBUyxPQUFLVCxTQUFMLENBQWU1QixLQUFLd0IsYUFBTCxDQUFmLENBRFg7QUFFRSw2QkFBYW1CLGFBRmY7QUFHRSwwQkFBVUw7QUFIWjtBQUxKO0FBWUdFLHVCQUFXeEMsS0FBS3VCLGtCQUFMLENBQVg7QUFaSCxXQURGO0FBZUQ7QUFDRCxlQUFPLEtBQVA7QUFDRCxPQXZDRDtBQXdDQSxhQUFPbUIsSUFBUDtBQUNELEtBM0NEO0FBNENBLFdBQU9GLFdBQVcsS0FBSzNDLEtBQUwsQ0FBV2lCLFFBQXRCLENBQVA7QUFDRCxHOzt1QkFHRDhCLE0scUJBQVM7QUFDUCxRQUFNQyxRQUFRLEtBQUtWLFdBQUwsRUFBZDtBQUNBLFFBQU1XLFVBQVUsS0FBS2pELEtBQUwsQ0FBV2tELFNBQVgsR0FBMEIsS0FBS2xELEtBQUwsQ0FBV2tELFNBQXJDLHNCQUFpRSxlQUFqRjtBQUZPLGtCQU9ILEtBQUtsRCxLQVBGO0FBQUEsUUFJTG1ELE1BSkssV0FJTEEsTUFKSztBQUFBLFFBSUdELFNBSkgsV0FJR0EsU0FKSDtBQUFBLFFBSWNFLG1CQUpkLFdBSWNBLG1CQUpkO0FBQUEsUUFJbUNDLG1CQUpuQyxXQUltQ0EsbUJBSm5DO0FBQUEsUUFJd0RsQixrQkFKeEQsV0FJd0RBLGtCQUp4RDtBQUFBLFFBSTRFRixXQUo1RSxXQUk0RUEsV0FKNUU7QUFBQSxRQUtMcUIsUUFMSyxXQUtMQSxRQUxLO0FBQUEsUUFLS0MsUUFMTCxXQUtLQSxRQUxMO0FBQUEsUUFLZUMsT0FMZixXQUtlQSxPQUxmO0FBQUEsUUFLd0JDLFFBTHhCLFdBS3dCQSxRQUx4QjtBQUFBLFFBS2tDQyxRQUxsQyxXQUtrQ0EsUUFMbEM7QUFBQSxRQUs0Q0MsU0FMNUMsV0FLNENBLFNBTDVDO0FBQUEsUUFLdURDLFVBTHZELFdBS3VEQSxVQUx2RDtBQUFBLFFBS21FQyxnQkFMbkUsV0FLbUVBLGdCQUxuRTtBQUFBLFFBTUxDLFNBTkssV0FNTEEsU0FOSztBQUFBLFFBTU1yQixRQU5OLFdBTU1BLFFBTk47OztBQVNQLFdBQ0U7QUFBQTtBQUFBLFFBQUssSUFBRyxxQkFBUixFQUE4QixXQUFXUSxPQUF6QztBQUNHLE9BQUMsQ0FBQ0QsTUFBTXBCLE1BQVIsSUFDRDtBQUFDLFlBQUQ7QUFBQTtBQUNFLGNBQUl1QixNQUROO0FBRUUscUJBQVdELFNBRmI7QUFHRSwrQkFBcUJFLG1CQUh2QjtBQUlFLCtCQUFxQkMsbUJBSnZCO0FBS0UsOEJBQW9CbEIsa0JBTHRCO0FBTUUsdUJBQWFGLFdBTmY7QUFPRSxvQkFBVXFCLFFBUFo7QUFRRSxvQkFBVUMsUUFSWjtBQVNFLG1CQUFTQyxPQVRYO0FBVUUsb0JBQVVDLFFBVlo7QUFXRSxvQkFBVUMsUUFYWjtBQVlFLHFCQUFXQyxTQVpiO0FBYUUsc0JBQVlDLFVBYmQ7QUFjRSxvQkFBVW5CLFFBZFo7QUFlRSxxQkFBV3FCLFNBZmI7QUFnQkUsNEJBQWtCRCxnQkFoQnBCO0FBaUJFLGtCQUFRLEtBQUsvRDtBQWpCZjtBQW1CR2tEO0FBbkJIO0FBRkYsS0FERjtBQTJCRCxHOzs7RUFsTnFDeEQsTUFBTXVFLGEsVUEyQnJDQyxZLEdBQWU7QUFDcEJiLFVBQVEsYUFEWTtBQUVwQkQsYUFBVyxFQUZTO0FBR3BCVixhQUFXLFFBSFM7QUFJcEJZLHVCQUFxQixFQUpEO0FBS3BCQyx1QkFBcUIsRUFMRDtBQU1wQmxCLHNCQUFvQixFQU5BO0FBT3BCbUIsWUFBVVcsU0FQVTtBQVFwQlYsWUFBVVUsU0FSVTtBQVNwQlQsV0FBU1MsU0FUVztBQVVwQm5FLGNBQVltRSxTQVZRO0FBV3BCUixZQUFVLEtBWFU7QUFZcEJoQixZQUFVLEtBWlU7QUFhcEJpQixZQUFVLElBYlU7QUFjcEJDLGFBQVcsS0FkUztBQWVwQkcsYUFBVyxLQWZTO0FBZ0JwQkYsY0FBWSxLQWhCUTtBQWlCcEJDLG9CQUFrQixLQWpCRTtBQWtCcEI7QUFDQWxDLGlCQUFlLEtBbkJLO0FBb0JwQlksbUJBQWlCLFFBcEJHO0FBcUJwQmIsc0JBQW9CLFVBckJBO0FBc0JwQlQsWUFBVSxFQXRCVTtBQXVCcEJnQixlQUFhO0FBdkJPLEM7U0EzQkhwQyxVIiwiZmlsZSI6InRyZWUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgVHJlZSwgeyBUcmVlTm9kZSB9IGZyb20gJ3JjLXRyZWUnO1xuaW1wb3J0ICdyYy10cmVlL2Fzc2V0cy9pbmRleC5jc3MnO1xuLy8gT3ZlcnJpZGUgZGVmYXVsdHMgcmMtdHJlZSBzdHlsZXNcbmltcG9ydCAnLi9vYy10cmVlLXN0eWxlcy5zY3NzJztcbmltcG9ydCBDaGVja2JveEljb24gZnJvbSAnLi9jaGVja2JveC1pY29uLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9DVHJlZVZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB0cmVlSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdHJlZUNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGljb25DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBkZWZhdWx0Q2hlY2tlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIG9uRXhwYW5kOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGVjazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25EcmFnRHJvcDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd0xpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dJY29uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjaGVja2FibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRyYWdnYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgIC8vIEN1c3RvbWlzYXRpb24gLS0gZGVmaW5lIHRoZSBkYXRhIGxvb2tVcEtleXMgYW5kIGxvb2tVcFZhbHVlc1xuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcbiAgICBkYXRhTG9va1VwS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRhdGFMb29rVXBWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hlY2tlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgdHJlZUlkOiAnZGVmYXVsdFRyZWUnLFxuICAgIHRyZWVDbGFzczogJycsXG4gICAgaWNvbkNsYXNzOiAnY2FyZXRzJyxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBbXSxcbiAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzOiBbXSxcbiAgICBkZWZhdWx0Q2hlY2tlZEtleXM6IFtdLFxuICAgIG9uRXhwYW5kOiB1bmRlZmluZWQsXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBvbkNoZWNrOiB1bmRlZmluZWQsXG4gICAgb25EcmFnRHJvcDogdW5kZWZpbmVkLFxuICAgIHNob3dMaW5lOiBmYWxzZSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgc2hvd0ljb246IHRydWUsXG4gICAgY2hlY2thYmxlOiBmYWxzZSxcbiAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgIHNlbGVjdGFibGU6IGZhbHNlLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IGZhbHNlLFxuICAgIC8vIEN1c3RvbXNcbiAgICBkYXRhTG9va1VwS2V5OiAna2V5JyxcbiAgICBkYXRhTG9va1VwVmFsdWU6ICdwYXJlbnQnLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogJ2NoaWxkcmVuJyxcbiAgICB0cmVlRGF0YTogW10sXG4gICAgY2hlY2tlZEtleXM6IFtdLFxuICB9O1xuXG5cbiAgb25EcmFnRHJvcCA9IChlKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLm9uRHJhZ0Ryb3ApIHRocm93IG5ldyBUeXBlRXJyb3IoJ29uRHJhZ0Ryb3AgY2FsbGJhY2sgaXMgbm90IGRlZmluZWQnKTtcblxuICAgIGNvbnN0IGRyb3BLZXkgPSBlLm5vZGUucHJvcHMuZXZlbnRLZXk7XG4gICAgY29uc3QgZHJhZ0tleSA9IGUuZHJhZ05vZGUucHJvcHMuZXZlbnRLZXk7XG5cbiAgICBjb25zdCBsb29wID0gKGRhdGEsIGtleSwgY2FsbGJhY2spID0+IHtcbiAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgsIGFycikgPT4ge1xuICAgICAgICBpZiAoaXRlbS5rZXkgPT09IGtleSkgcmV0dXJuIGNhbGxiYWNrKGl0ZW0sIGluZGV4LCBhcnIpO1xuICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbikgcmV0dXJuIGxvb3AoaXRlbS5jaGlsZHJlbiwga2V5LCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG5ld0RhdGEgPSB0aGlzLnByb3BzLnRyZWVEYXRhLnNsaWNlKCk7XG5cbiAgICBsZXQgZHJhZ09iajtcbiAgICBsb29wKG5ld0RhdGEsIGRyYWdLZXksIChpdGVtLCBpbmRleCwgYXJyKSA9PiB7XG4gICAgICBhcnIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGRyYWdPYmogPSBpdGVtO1xuICAgIH0pO1xuXG4gICAgLy8gLi4gaXRlbSBpcyBkcm9wcGVkIGJldHdlZW4gMiBpdGVtc1xuICAgIGlmIChlLmRyb3BUb0dhcCkge1xuICAgICAgbGV0IGFyO1xuICAgICAgbGV0IGk7XG4gICAgICBsb29wKG5ld0RhdGEsIGRyb3BLZXksIChpdGVtLCBpbmRleCwgYXJyKSA9PiB7XG4gICAgICAgIGFyID0gYXJyO1xuICAgICAgICBpID0gaW5kZXg7XG4gICAgICB9KTtcbiAgICAgIGFyLnNwbGljZShpLCAwLCBkcmFnT2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9vcChuZXdEYXRhLCBkcm9wS2V5LCAoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLmNoaWxkcmVuID0gaXRlbS5jaGlsZHJlbiB8fCBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBpdGVtLmNoaWxkcmVuLnB1c2goZHJhZ09iaik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLm9uRHJhZ0Ryb3AobmV3RGF0YSk7XG4gIH07XG5cbiAgaXNDaGlsZENoZWNrZWQgPSAobm9kZSwgYXJyID0gW10pID0+IHtcbiAgICBjb25zdCB7IGRhdGFMb29rVXBDaGlsZHJlbiwgZGF0YUxvb2tVcEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjaGlsZHJlbiA9IGFyci5sZW5ndGggPyBhcnIgOiBub2RlW2RhdGFMb29rVXBDaGlsZHJlbl07XG4gICAgbGV0IGZvdW5kID0gY2hpbGRyZW4uZmluZChjaGlsZCA9PiB0aGlzLmlzQ2hlY2tlZChjaGlsZFtkYXRhTG9va1VwS2V5XSkpO1xuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgaWYgKGNoaWxkW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLmlzQ2hpbGRDaGVja2VkKGNoaWxkLCBjaGlsZFtkYXRhTG9va1VwQ2hpbGRyZW5dKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiAhIWZvdW5kO1xuICB9O1xuXG4gIGlzQ2hlY2tlZCA9IGtleSA9PlxuICAgIHRoaXMucHJvcHMuY2hlY2tlZEtleXMuaW5jbHVkZXMoa2V5KSB8fCB0aGlzLnByb3BzLmRlZmF1bHRDaGVja2VkS2V5cy5pbmNsdWRlcyhrZXkpO1xuXG4gIC8qIGhhc0NoaWxkcmVuIC0gZnVuY3Rpb24gKi9cbiAgaGFzQ2hpbGRyZW4gPSBkYXRhT2JqZWN0ID0+ICgoZGF0YU9iamVjdFt0aGlzLnByb3BzLmRhdGFMb29rVXBDaGlsZHJlbl1cbiAgICAmJiBkYXRhT2JqZWN0W3RoaXMucHJvcHMuZGF0YUxvb2tVcENoaWxkcmVuXS5sZW5ndGggPj0gMVxuICApKTtcblxuICAvKiByZW5kZXJOb2RlcyAtIGZ1bmN0aW9uICovXG4gIHJlbmRlck5vZGVzKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBWYWx1ZSwgZGF0YUxvb2tVcENoaWxkcmVuLCBpY29uQ2xhc3MsIGRpc2FibGVkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNoZWNrQ2hpbGRyZW4gPSB0aGlzLmhhc0NoaWxkcmVuO1xuXG4gICAgLy8gUmVjdXJzaXZlIGZ1bmN0aW9uIGZvciBjb2xsZWN0aW5nIG5vZGVzOlxuICAgIGNvbnN0IG1vdW50Tm9kZXMgPSAobm9kZUxpc3QpID0+IHtcbiAgICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICAgIG5vZGVMaXN0LmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKCFub2RlW2RhdGFMb29rVXBLZXldKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vIExlYWYgbm9kZVxuICAgICAgICBpZiAoIWNoZWNrQ2hpbGRyZW4obm9kZSkpIHtcbiAgICAgICAgICBsaXN0LnB1c2goIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuY3Rpb24tcGFyZW4tbmV3bGluZVxuICAgICAgICAgICAgPFRyZWVOb2RlXG4gICAgICAgICAgICAgIHRpdGxlPXtub2RlW2RhdGFMb29rVXBWYWx1ZV19XG4gICAgICAgICAgICAgIGtleT17bm9kZVtkYXRhTG9va1VwS2V5XX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtpY29uQ2xhc3N9YH1cbiAgICAgICAgICAgICAgaWNvbj17XG4gICAgICAgICAgICAgICAgPENoZWNrYm94SWNvblxuICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5pc0NoZWNrZWQobm9kZVtkYXRhTG9va1VwS2V5XSl9XG4gICAgICAgICAgICAgICAgICBoYWxmQ2hlY2tlZD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLz4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFBhcmVudCBub2RlXG4gICAgICAgICAgY29uc3QgaXNIYWxmQ2hlY2tlZCA9XG4gICAgICAgICAgICB0aGlzLmlzQ2hlY2tlZChub2RlW2RhdGFMb29rVXBLZXldKSA/IGZhbHNlIDogdGhpcy5pc0NoaWxkQ2hlY2tlZChub2RlKTtcblxuICAgICAgICAgIGxpc3QucHVzaCggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jdGlvbi1wYXJlbi1uZXdsaW5lXG4gICAgICAgICAgICA8VHJlZU5vZGVcbiAgICAgICAgICAgICAgdGl0bGU9e25vZGVbZGF0YUxvb2tVcFZhbHVlXX1cbiAgICAgICAgICAgICAga2V5PXtub2RlW2RhdGFMb29rVXBLZXldfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2ljb25DbGFzc31gfVxuICAgICAgICAgICAgICBpY29uPXtcbiAgICAgICAgICAgICAgICA8Q2hlY2tib3hJY29uXG4gICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLmlzQ2hlY2tlZChub2RlW2RhdGFMb29rVXBLZXldKX1cbiAgICAgICAgICAgICAgICAgIGhhbGZDaGVja2VkPXtpc0hhbGZDaGVja2VkfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge21vdW50Tm9kZXMobm9kZVtkYXRhTG9va1VwQ2hpbGRyZW5dKX1cbiAgICAgICAgICAgIDwvVHJlZU5vZGU+KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBsaXN0O1xuICAgIH07XG4gICAgcmV0dXJuIG1vdW50Tm9kZXModGhpcy5wcm9wcy50cmVlRGF0YSk7XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBub2RlcyA9IHRoaXMucmVuZGVyTm9kZXMoKTtcbiAgICBjb25zdCBjbHNOYW1lID0gdGhpcy5wcm9wcy50cmVlQ2xhc3MgPyBgJHt0aGlzLnByb3BzLnRyZWVDbGFzc30gb2MtcmVhY3QtdHJlZWAgOiAnb2MtcmVhY3QtdHJlZSc7XG4gICAgY29uc3Qge1xuICAgICAgdHJlZUlkLCB0cmVlQ2xhc3MsIGRlZmF1bHRFeHBhbmRlZEtleXMsIGRlZmF1bHRTZWxlY3RlZEtleXMsIGRlZmF1bHRDaGVja2VkS2V5cywgY2hlY2tlZEtleXMsXG4gICAgICBvbkV4cGFuZCwgb25TZWxlY3QsIG9uQ2hlY2ssIHNob3dMaW5lLCBzaG93SWNvbiwgY2hlY2thYmxlLCBzZWxlY3RhYmxlLCBkZWZhdWx0RXhwYW5kQWxsLFxuICAgICAgZHJhZ2dhYmxlLCBkaXNhYmxlZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwidHJlZS12aWV3LWNvbnRhaW5lclwiIGNsYXNzTmFtZT17Y2xzTmFtZX0+XG4gICAgICAgIHshIW5vZGVzLmxlbmd0aCAmJlxuICAgICAgICA8VHJlZVxuICAgICAgICAgIGlkPXt0cmVlSWR9XG4gICAgICAgICAgY2xhc3NOYW1lPXt0cmVlQ2xhc3N9XG4gICAgICAgICAgZGVmYXVsdEV4cGFuZGVkS2V5cz17ZGVmYXVsdEV4cGFuZGVkS2V5c31cbiAgICAgICAgICBkZWZhdWx0U2VsZWN0ZWRLZXlzPXtkZWZhdWx0U2VsZWN0ZWRLZXlzfVxuICAgICAgICAgIGRlZmF1bHRDaGVja2VkS2V5cz17ZGVmYXVsdENoZWNrZWRLZXlzfVxuICAgICAgICAgIGNoZWNrZWRLZXlzPXtjaGVja2VkS2V5c31cbiAgICAgICAgICBvbkV4cGFuZD17b25FeHBhbmR9XG4gICAgICAgICAgb25TZWxlY3Q9e29uU2VsZWN0fVxuICAgICAgICAgIG9uQ2hlY2s9e29uQ2hlY2t9XG4gICAgICAgICAgc2hvd0xpbmU9e3Nob3dMaW5lfVxuICAgICAgICAgIHNob3dJY29uPXtzaG93SWNvbn1cbiAgICAgICAgICBjaGVja2FibGU9e2NoZWNrYWJsZX1cbiAgICAgICAgICBzZWxlY3RhYmxlPXtzZWxlY3RhYmxlfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBkcmFnZ2FibGU9e2RyYWdnYWJsZX1cbiAgICAgICAgICBkZWZhdWx0RXhwYW5kQWxsPXtkZWZhdWx0RXhwYW5kQWxsfVxuICAgICAgICAgIG9uRHJvcD17dGhpcy5vbkRyYWdEcm9wfVxuICAgICAgICA+XG4gICAgICAgICAge25vZGVzfVxuICAgICAgICA8L1RyZWU+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==