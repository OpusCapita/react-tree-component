import React from 'react';
import PropTypes from 'prop-types';
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';
// Override defaults rc-tree styles
import './oc-tree-styles.scss';
import TreeCheckbox from './tree-checkbox.component';

export default class OCTreeView extends React.PureComponent {
  static propTypes = {
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
    selectedKeys: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
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
    className: '',
  };

  onDragDrop = (e) => {
    const { onDragDrop, isDragDropLegal, treeData } = this.props;
    if (!onDragDrop) throw new TypeError('onDragDrop callback is not defined');
    if (isDragDropLegal && !isDragDropLegal(treeData, e)) return;

    const newData = this.getUpdatedTree(this.getTreeItem(e.dragNode.props.eventKey), e);
    onDragDrop(newData, e);
  };

  getUpdatedTree = (dragItem, dragEvent, array = this.props.treeData, parentFiltered = false) => {
    const { dataLookUpKey, dataLookUpChildren } = this.props;
    const { dropToGap, node } = dragEvent;
    const dropId = node && node.props.eventKey;
    let found = false;
    let newItems = array.slice();

    const addItemToArray = (items) => {
      const dropIndex = items.findIndex(child => child[dataLookUpKey] === dropId);
      if (dropIndex > -1) {
        found = true;
        const newChildren = items.slice();
        newChildren.splice(dropIndex, 0, dragItem);
        return newChildren;
      }
      return items;
    };
    if (!parentFiltered && dragItem) {
      newItems = this.removeItem(newItems, dragItem[dataLookUpKey]);
    }
    if (dropToGap) {
      newItems = addItemToArray(newItems);
    }

    if (!found) {
      for (let i = 0; i < newItems.length; i += 1) {
        const item = newItems[i];
        const children = item[dataLookUpChildren];

        if (!dropToGap && dropId === item[dataLookUpKey] && !found) {
          found = true;
          if (!children) item[dataLookUpChildren] = [];
          item[dataLookUpChildren].push(dragItem);
          break;
        } else if (children && dropToGap) {
          item[dataLookUpChildren] = addItemToArray(children);
        }
        if (!found && item[dataLookUpChildren]) {
          found = this.getUpdatedTree(dragItem, dragEvent, item[dataLookUpChildren], true);
        }
      }
    }
    if (!found) return false;
    return newItems;
  };


  getTreeItem = (id, array = this.props.treeData) => {
    const { dataLookUpChildren, dataLookUpKey } = this.props;
    let found = array.find(item => item[dataLookUpKey] === id);
    if (!found) {
      array.forEach((item) => {
        if (item[dataLookUpChildren] && !found) {
          found = this.getTreeItem(id, item[dataLookUpChildren]);
        }
      });
    }
    return found;
  };


  /**
   * Remove item from given array
   * @param array
   * @param id
   * @returns array of filtered items
   */
  removeItem = (array, id) => {
    const { dataLookUpKey, dataLookUpChildren } = this.props;
    let newItems = array.slice();
    let found = false;
    const isParent = arr => arr.find(child => child[dataLookUpKey] === id);
    const filterChild = arr => arr.filter(child => child[dataLookUpKey] !== id);

    if (isParent(newItems)) {
      found = true;
      newItems = filterChild(newItems);
    }

    if (!found) {
      for (let i = 0; i < newItems.length; i += 1) {
        const item = newItems[i];

        if (item[dataLookUpChildren] && isParent(item[dataLookUpChildren])) {
          found = true;
          item[dataLookUpChildren] = filterChild(item[dataLookUpChildren]);
          break;
        }
        if (item[dataLookUpChildren] && !found) {
          found = this.removeItem(item[dataLookUpChildren], id);
        }
      }
    }
    if (!found) return false;
    return newItems;
  };

  /* hasChildren - function */
  hasChildren = dataObject => ((dataObject[this.props.dataLookUpChildren]
    && dataObject[this.props.dataLookUpChildren].length >= 1
  ));

  /* renderNodes - function */
  renderNodes() {
    const {
      dataLookUpKey, dataLookUpValue, dataLookUpChildren, iconClass, disabled,
    } = this.props;
    const checkChildren = this.hasChildren;

    // Recursive function for collecting nodes:
    const mountNodes = (nodeList) => {
      const list = [];
      nodeList.forEach((node) => {
        if (!node[dataLookUpKey]) return false;
        // Leaf node
        if (!checkChildren(node)) {
          list.push( // eslint-disable-line function-paren-newline
            <TreeNode
              title={node[dataLookUpValue]}
              key={node[dataLookUpKey]}
              className={`${iconClass} leaf-node`}
              icon={<TreeCheckbox disabled={disabled} />}
            />);
        } else {
          // Parent node
          list.push( // eslint-disable-line function-paren-newline
            <TreeNode
              title={node[dataLookUpValue]}
              key={node[dataLookUpKey]}
              className={`${iconClass} parent-node`}
              icon={<TreeCheckbox disabled={disabled} />}
            >
              {mountNodes(node[dataLookUpChildren])}
            </TreeNode>);
        }
        return false;
      });
      return list;
    };
    return mountNodes(this.props.treeData);
  }


  render() {
    const nodes = this.renderNodes();
    const clsName = this.props.className ? `${this.props.className} oc-react-tree` : 'oc-react-tree';

    const {
      treeId, className, defaultExpandedKeys, defaultSelectedKeys, defaultCheckedKeys, checkedKeys,
      onExpand, onSelect, onCheck, showLine, showIcon, checkable, selectable, defaultExpandAll,
      draggable, disabled, selectedKeys,
    } = this.props;

    return (
      <div id="tree-view-container" className={clsName}>
        {!!nodes.length &&
        <Tree
          id={treeId}
          className={className}
          defaultExpandedKeys={defaultExpandedKeys}
          defaultSelectedKeys={defaultSelectedKeys}
          defaultCheckedKeys={defaultCheckedKeys}
          checkedKeys={checkedKeys}
          onExpand={onExpand}
          onSelect={onSelect}
          onCheck={onCheck}
          showLine={showLine}
          showIcon={showIcon}
          checkable={checkable}
          selectedKeys={selectedKeys}
          selectable={selectable}
          disabled={disabled}
          draggable={draggable}
          defaultExpandAll={defaultExpandAll}
          onDrop={this.onDragDrop}
        >
          {nodes}
        </Tree>
        }
      </div>
    );
  }
}
