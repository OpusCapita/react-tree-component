import React from 'react';
import PropTypes from 'prop-types';
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';
// Override defaults rc-tree styles
import './oc-tree-styles.scss';
import CheckboxIcon from './checkbox-icon.component';

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
    checkedKeys: [],
    className: '',
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

  isChildChecked = (node, arr = []) => {
    const { dataLookUpChildren, dataLookUpKey } = this.props;
    const children = arr.length ? arr : node[dataLookUpChildren];
    let found = children.find(child => this.isChecked(child[dataLookUpKey]));

    if (!found) {
      children.forEach((child) => {
        if (child[dataLookUpChildren] && !found) {
          found = this.isChildChecked(child, child[dataLookUpChildren]);
        }
      });
    }
    return !!found;
  };

  isChecked = key =>
    this.props.checkedKeys.includes(key) || this.props.defaultCheckedKeys.includes(key);

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
              className={`${iconClass}`}
              icon={
                <CheckboxIcon
                  checked={this.isChecked(node[dataLookUpKey])}
                  halfChecked={false}
                  disabled={disabled}
                />
              }
            />);
        } else {
          // Parent node
          const isHalfChecked =
            this.isChecked(node[dataLookUpKey]) ? false : this.isChildChecked(node);

          list.push( // eslint-disable-line function-paren-newline
            <TreeNode
              title={node[dataLookUpValue]}
              key={node[dataLookUpKey]}
              className={`${iconClass}`}
              icon={
                <CheckboxIcon
                  checked={this.isChecked(node[dataLookUpKey])}
                  halfChecked={isHalfChecked}
                  disabled={disabled}
                />
              }
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
      draggable, disabled,
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
