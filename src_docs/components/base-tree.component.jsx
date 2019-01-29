import React from 'react';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import OCTreeView from '../../src/index';

import './base.scss';

export default class BaseTree extends React.PureComponent {
  static propTypes = {
    headerText: PropTypes.string,
    description: PropTypes.string,
    treeData: PropTypes.arrayOf(PropTypes.shape({})),
    tree: PropTypes.shape({
      defaultCheckedKeys: PropTypes.arrayOf(PropTypes.string),
    }),
  };

  static defaultProps = {
    headerText: undefined,
    description: undefined,
    tree: {
      defaultCheckedKeys: [],
    },
    treeData: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      checkedKeys: [],
      expandedKeys: [],
      selectedKeys: [],
    };
  }

  treeViewOnExpand = (expandedKeys) => {
    this.setState({ expandedKeys });
  };

  treeViewOnSelect = (selectedKeys) => {
    this.setState({ selectedKeys });
  };

  treeViewOnCheck = (checkedKeys) => {
    this.setState({ checkedKeys });
  };

  treeViewOnDragDrop = (newItems) => {
    this.setState({
      treeData: newItems,
    });
  };

  renderConfiguration = treeProps => (
    <pre className="example-config">
      <h4>Tree configuration</h4>
      <code>
        {
        fromJS(treeProps).entrySeq().map(([key, value]) => (
          <div className="config-content" key={key}>
            <div className="property-key">{`${key}:`}</div>
            <div className="property-value">{value}</div>
          </div>
        ))
      }
      </code>
    </pre>
  );

  render() {
    const {
      headerText,
      description,
      treeData,
      tree,
    } = this.props;
    // Boolean Flags:
    const isCheckable = (tree.checkable === 'true');
    const isSelectable = (tree.selectable === 'true');
    const isDraggable = (tree.draggable === 'true');
    const expandAll = (tree.defaultExpandAll === 'true');
    const showIcon = (tree.showIcon === 'true');
    const disabled = (tree.disabled === 'true');
    const lookUpKey = tree.dataLookUpKey || 'key';
    const lookUpValue = tree.dataLookUpValue || 'parent';
    const children = tree.dataLookUpChildren || 'children';
    const modifiedTreeData = this.state.treeData || treeData;
    const showExpandAll = (tree.showExpandAll === 'true');
    const { headerRight, title } = tree;

    return (
      <div id="plain-tree-example-container">
        <div id="plain-tree-example-header-container">
          <div id="header-text"><h3>{headerText}</h3></div>
          <div id="configuration-opts">
            <div id="description">
              {description}
            </div>
            {this.renderConfiguration(tree)}
          </div>
        </div>
        <div className="example-tree-container">
          <div className="trees">
            <OCTreeView
              treeId={tree.treeId}
              treeData={modifiedTreeData}
              onExpand={this.treeViewOnExpand}
              onSelect={this.treeViewOnSelect}
              onCheck={this.treeViewOnCheck}
              onDragDrop={this.treeViewOnDragDrop}
              checkedKeys={this.state.checkedKeys}
              selectedKeys={this.state.selectedKeys}
              expandedKeys={this.state.expandedKeys}
              iconClass={tree.iconClass || null}
              checkable={isCheckable}
              selectable={isSelectable}
              draggable={isDraggable}
              defaultExpandAll={expandAll}
              showExpandAll={showExpandAll}
              showIcon={showIcon}
              dataLookUpKey={lookUpKey}
              dataLookUpValue={lookUpValue}
              dataLookUpChildren={children}
              disabled={disabled}
              title={title}
              headerRight={headerRight}
            />
          </div>
        </div>
      </div>
    );
  }
}
