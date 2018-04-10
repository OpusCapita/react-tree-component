import React from 'react';
import PropTypes from 'prop-types';
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';
// Override defaults rc-tree styles
import './oc-tree-styles.scss';

export default class OCTreeView extends React.PureComponent {
  static propTypes = {
    treeId: PropTypes.string.isRequired,
    treeClass: PropTypes.string,
    iconClass: PropTypes.string,
    defaultExpandedKeys: PropTypes.arrayOf(PropTypes.string),
    defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
    defaultCheckedKeys: PropTypes.arrayOf(PropTypes.string),
    onExpand: PropTypes.func,
    onSelect: PropTypes.func,
    onCheck: PropTypes.func,
    showLine: PropTypes.bool,
    showIcon: PropTypes.bool,
    checkable: PropTypes.bool,
    selectable: PropTypes.bool,
    defaultExpandAll: PropTypes.bool,
    // Node related props:
    disableCheckboxes: PropTypes.bool,
    // Customisation -- define the data lookUpKeys and lookUpValues
    treeData: PropTypes.arrayOf(PropTypes.object),
    dataLookUpKey: PropTypes.string.isRequired,
    dataLookUpValue: PropTypes.string.isRequired,
    dataLookUpChildren: PropTypes.string.isRequired,
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
  };

  /* hasChildren - function */
  hasChildren = (dataObject) => {
    return (dataObject[this.props.dataLookUpChildren]
      && dataObject[this.props.dataLookUpChildren].length >= 1
    );
  };

  /* renderNodes - function */
  renderNodes() {
    const nodeKey = this.props.dataLookUpKey;
    const nodeVal = this.props.dataLookUpValue;
    const nodeChild = this.props.dataLookUpChildren;
    const disableNodeCheckboxes = this.props.disableCheckboxes;
    const checkChildren = this.hasChildren;
    const disableCls = disableNodeCheckboxes ? 'disabled' : '';
    const customIcon = this.props.iconClass;

    // Recursive function for collecting nodes:
    const mountNodes = (nodeList) => {
      const lst = [];
      nodeList.forEach((node) => {
        if (!node[nodeKey]) return false;
        if (!checkChildren(node)) {
          lst.push(
            <TreeNode
              title={node[nodeVal]}
              key={node[nodeKey]}
              className={`${customIcon} ${disableCls}`}
              disableCheckbox={disableNodeCheckboxes}
            />);
        } else {
          lst.push(
            <TreeNode
              title={node[nodeVal]}
              key={node[nodeKey]}
              className={`${customIcon} ${disableCls}`}
              disableCheckbox={disableNodeCheckboxes}
            >
              {mountNodes(node[nodeChild])}
            </TreeNode>,
          );
        }
      });
      return lst;
    };
    return mountNodes(this.props.treeData);
  }

  render() {
    const nodes = this.renderNodes();
    const clsName = this.props.treeClass ? `${this.props.treeClass} oc-react-tree` : 'oc-react-tree';

    return (
      <div id="tree-view-container" className={clsName}>
        {nodes.length &&
        <Tree
          id={this.props.treeId}
          className={this.props.treeClass}
          defaultExpandedKeys={this.props.defaultExpandedKeys}
          defaultSelectedKeys={this.props.defaultSelectedKeys}
          defaultCheckedKeys={this.props.defaultCheckedKeys}
          checkedKeys={this.props.checkedKeys}
          onExpand={this.props.onExpand}
          onSelect={this.props.onSelect}
          onCheck={this.props.onCheck}
          showLine={this.props.showLine}
          showIcon={this.props.showIcon}
          checkable={this.props.checkable}
          selectable={this.props.selectable}
          defaultExpandAll={this.props.defaultExpandAll}
        >
          {nodes}
        </Tree>
        }
      </div>
    );
  }

}
