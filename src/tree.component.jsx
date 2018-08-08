import React from 'react';
import PropTypes from 'prop-types';
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';
// Override defaults rc-tree styles
import './oc-tree-styles.scss';

export default class OCTreeView extends React.PureComponent {
  static propTypes = {
    treeId: PropTypes.string,
    treeClass: PropTypes.string,
    iconClass: PropTypes.string,
    defaultExpandedKeys: PropTypes.arrayOf(PropTypes.string),
    defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
    defaultCheckedKeys: PropTypes.arrayOf(PropTypes.string),
    onExpand: PropTypes.func,
    onSelect: PropTypes.func,
    onCheck: PropTypes.func,
    onDragDrop: PropTypes.func,
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
  };

  static defaultProps = {
    treeId: 'defaultTree',
    treeClass: '',
    iconClass: '',
    defaultExpandedKeys: [],
    defaultSelectedKeys: [],
    defaultCheckedKeys: [],
    onExpand: undefined,
    onSelect: undefined,
    onCheck: undefined,
    onDragDrop: undefined,
    showLine: false,
    disabled: false,
    showIcon: false,
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
  };


  onDragDrop = (e) => {
    if (!this.props.onDragDrop) throw new TypeError('onDragDrop callback is not defined');

    const dropKey = e.node.props.eventKey;
    const dragKey = e.dragNode.props.eventKey;

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) return callback(item, index, arr);
        if (item.children) return loop(item.children, key, callback);
        return null;
      });
    };

    const newData = this.props.treeData.slice();

    let dragObj;
    loop(newData, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    // .. item is dropped between 2 items
    if (e.dropToGap) {
      let ar;
      let i;
      loop(newData, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      ar.splice(i, 0, dragObj);
    } else {
      loop(newData, dropKey, (item) => {
        item.children = item.children || []; // eslint-disable-line no-param-reassign
        item.children.push(dragObj);
      });
    }

    this.props.onDragDrop(newData);
  };

  /* hasChildren - function */
  hasChildren = dataObject => ((dataObject[this.props.dataLookUpChildren]
    && dataObject[this.props.dataLookUpChildren].length >= 1
  ));

  /* renderNodes - function */
  renderNodes() {
    const nodeKey = this.props.dataLookUpKey;
    const nodeVal = this.props.dataLookUpValue;
    const nodeChild = this.props.dataLookUpChildren;
    const checkChildren = this.hasChildren;
    const customIcon = this.props.iconClass;

    // Recursive function for collecting nodes:
    const mountNodes = (nodeList) => {
      const lst = [];
      nodeList.forEach((node) => {
        if (!node[nodeKey]) return false;
        if (!checkChildren(node)) {
          lst.push( // eslint-disable-line function-paren-newline
            <TreeNode
              title={node[nodeVal]}
              key={node[nodeKey]}
              className={`${customIcon}`}
            />);
        } else {
          lst.push( // eslint-disable-line function-paren-newline
            <TreeNode
              title={node[nodeVal]}
              key={node[nodeKey]}
              className={`${customIcon}`}
            >
              {mountNodes(node[nodeChild])}
            </TreeNode>);
        }
        return false;
      });
      return lst;
    };
    return mountNodes(this.props.treeData);
  }


  render() {
    const nodes = this.renderNodes();
    const clsName = this.props.treeClass ? `${this.props.treeClass} oc-react-tree` : 'oc-react-tree';
    const {
      treeId, treeClass, defaultExpandedKeys, defaultSelectedKeys, defaultCheckedKeys, checkedKeys,
      onExpand, onSelect, onCheck, showLine, showIcon, checkable, selectable, defaultExpandAll,
      draggable, disabled,
    } = this.props;

    return (
      <div id="tree-view-container" className={clsName}>
        {!!nodes.length &&
        <Tree
          id={treeId}
          className={treeClass}
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
