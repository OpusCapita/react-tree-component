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
import TreeCheckbox from './tree-checkbox.component';

var OCTreeView = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(OCTreeView, _React$PureComponent);

  function OCTreeView() {
    var _temp, _this, _ret;

    _classCallCheck(this, OCTreeView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.onDragDrop = function (e) {
      var _this$props = _this.props,
          onDragDrop = _this$props.onDragDrop,
          isDragDropLegal = _this$props.isDragDropLegal,
          treeData = _this$props.treeData;

      if (!onDragDrop) throw new TypeError('onDragDrop callback is not defined');

      // Calling isDragDropLegal callback to ensure that this move can be done
      if (isDragDropLegal && !isDragDropLegal(treeData, e)) return;

      var newData = _this.getUpdatedTree(_this.getTreeItem(e.dragNode.props.eventKey), e);
      onDragDrop(newData, e);
    }, _this.getUpdatedTree = function (dragItem, dragEvent) {
      var array = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.props.treeData;
      var parentFiltered = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var _this$props2 = _this.props,
          dataLookUpKey = _this$props2.dataLookUpKey,
          dataLookUpChildren = _this$props2.dataLookUpChildren;
      var dropToGap = dragEvent.dropToGap,
          node = dragEvent.node;

      var dropId = node && node.props.eventKey;
      var found = false;
      var newItems = array.slice();

      var addItemToArray = function addItemToArray(items) {
        var dropIndex = items.findIndex(function (child) {
          return child[dataLookUpKey] === dropId;
        });
        if (dropIndex > -1) {
          found = true;
          var newChildren = items.slice();
          newChildren.splice(dropIndex, 0, dragItem);
          return newChildren;
        }
        return items;
      };
      if (!parentFiltered && dragItem) {
        newItems = _this.removeItem(newItems, dragItem[dataLookUpKey]);
      }
      if (dropToGap) {
        newItems = addItemToArray(newItems);
      }

      if (!found) {
        for (var i = 0; i < newItems.length; i += 1) {
          var item = newItems[i];
          var children = item[dataLookUpChildren];

          if (!dropToGap && dropId === item[dataLookUpKey] && !found) {
            found = true;
            if (!children) item[dataLookUpChildren] = [];
            item[dataLookUpChildren].push(dragItem);
            break;
          } else if (children && dropToGap) {
            item[dataLookUpChildren] = addItemToArray(children);
          }
          if (!found && item[dataLookUpChildren]) {
            found = _this.getUpdatedTree(dragItem, dragEvent, item[dataLookUpChildren], true);
          }
        }
      }
      if (!found) return false;
      return newItems;
    }, _this.getTreeItem = function (id) {
      var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.treeData;
      var _this$props3 = _this.props,
          dataLookUpChildren = _this$props3.dataLookUpChildren,
          dataLookUpKey = _this$props3.dataLookUpKey;

      var found = array.find(function (item) {
        return item[dataLookUpKey] === id;
      });
      if (!found) {
        array.forEach(function (item) {
          if (item[dataLookUpChildren] && !found) {
            found = _this.getTreeItem(id, item[dataLookUpChildren]);
          }
        });
      }
      return found;
    }, _this.removeItem = function (array, id) {
      var _this$props4 = _this.props,
          dataLookUpKey = _this$props4.dataLookUpKey,
          dataLookUpChildren = _this$props4.dataLookUpChildren;

      var newItems = array.slice();
      var found = false;
      var isParent = function isParent(arr) {
        return arr.find(function (child) {
          return child[dataLookUpKey] === id;
        });
      };
      var filterChild = function filterChild(arr) {
        return arr.filter(function (child) {
          return child[dataLookUpKey] !== id;
        });
      };

      if (isParent(newItems)) {
        found = true;
        newItems = filterChild(newItems);
      }

      if (!found) {
        for (var i = 0; i < newItems.length; i += 1) {
          var item = newItems[i];

          if (item[dataLookUpChildren] && isParent(item[dataLookUpChildren])) {
            found = true;
            item[dataLookUpChildren] = filterChild(item[dataLookUpChildren]);
            break;
          }
          if (item[dataLookUpChildren] && !found) {
            found = _this.removeItem(item[dataLookUpChildren], id);
          }
        }
      }
      if (!found) return false;
      return newItems;
    }, _this.hasChildren = function (dataObject) {
      return dataObject[_this.props.dataLookUpChildren] && dataObject[_this.props.dataLookUpChildren].length >= 1;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Returns updated tree after Drag n' drop event
   * @param dragItem - dragged item
   * @param dragEvent - event
   * @param array - used recursively
   * @param parentFiltered - used recursively
   * @returns {*}
   */


  /**
   * Returns a tree item by ID
   * @param id
   * @param array - used recursively
   * @returns {Object}
   */


  /**
   * Remove item from given array
   * @param array
   * @param id
   * @returns array of filtered items
   */


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
          React.createElement(TreeNode, {
            title: node[dataLookUpValue],
            key: node[dataLookUpKey],
            className: iconClass + ' leaf-node',
            icon: React.createElement(TreeCheckbox, { disabled: disabled })
          }));
        } else {
          // Parent node
          list.push( // eslint-disable-line function-paren-newline
          React.createElement(
            TreeNode,
            {
              title: node[dataLookUpValue],
              key: node[dataLookUpKey],
              className: iconClass + ' parent-node',
              icon: React.createElement(TreeCheckbox, { disabled: disabled })
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
        disabled = _props2.disabled,
        selectedKeys = _props2.selectedKeys;


    return React.createElement(
      'div',
      { id: 'tree-view-container', className: clsName },
      !!nodes.length && React.createElement(
        Tree,
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
          selectedKeys: selectedKeys,
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
}(React.PureComponent), _class.propTypes = {
  treeId: PropTypes.string,
  className: PropTypes.string,
  iconClass: PropTypes.string,
  defaultExpandedKeys: PropTypes.arrayOf(PropTypes.string),
  defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
  defaultCheckedKeys: PropTypes.arrayOf(PropTypes.string),
  onExpand: PropTypes.func,
  onSelect: PropTypes.func,
  onCheck: PropTypes.func,
  onDragDrop: PropTypes.func,
  isDragDropLegal: PropTypes.func,
  showLine: PropTypes.bool,
  showIcon: PropTypes.bool,
  checkable: PropTypes.bool,
  selectable: PropTypes.bool,
  draggable: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultExpandAll: PropTypes.bool,
  // Customisation -- define the data lookUpKeys and lookUpValues
  treeData: PropTypes.arrayOf(PropTypes.object),
  dataLookUpKey: PropTypes.string,
  dataLookUpValue: PropTypes.string,
  dataLookUpChildren: PropTypes.string,
  checkedKeys: PropTypes.arrayOf(PropTypes.string),
  selectedKeys: PropTypes.arrayOf(PropTypes.string)
}, _class.defaultProps = {
  treeId: 'defaultTree',
  iconClass: 'carets',
  defaultExpandedKeys: [],
  defaultSelectedKeys: [],
  defaultCheckedKeys: [],
  onExpand: undefined,
  onSelect: undefined,
  onCheck: undefined,
  onDragDrop: undefined,
  isDragDropLegal: undefined,
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
  selectedKeys: [],
  className: ''
}, _temp2);
export { OCTreeView as default };