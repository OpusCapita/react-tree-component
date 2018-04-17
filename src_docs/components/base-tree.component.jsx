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
    const checkedKeys = props.tree.defaultCheckedKeys;
    this.state = {
      defaultCheckedKeys: checkedKeys,
      defaultExpandedKeys: [],
      defaultSelectedKeys: [],
    };
  }

  treeViewOnSelect = (selectedKeys, info) => {
    this.selKey = info.node.props.eventKey;
  };

  treeViewOnCheck = (keys) => {
    this.setState({
      checkedKeys: keys,
    });
  };

  renderConfiguration = treeProps => (
    <pre className="example-config">
      <h4>Tree configuration</h4>
      <code>{
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
    const expandAll = (tree.defaultExpandAll === 'true');
    const showLine = (tree.showLine === 'true');
    const showIcon = (tree.showIcon === 'true');
    const disableCheckboxes = (tree.disableCheckbox === 'true');
    const lookUpKey = tree.dataLookUpKey || 'key';
    const lookUpValue = tree.dataLookUpValue || 'parent';
    const children = tree.dataLookUpChildren || 'children';

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
              treeData={treeData}
              defaultExpandedKeys={this.state.defaultExpandedKeys}
              defaultSelectedKeys={tree.defaultSelectedKeys || this.state.defaultSelectedKeys}
              defaultCheckedKeys={this.state.defaultCheckedKeys}
              onExpand={this.treeViewOnExpand}
              onSelect={this.treeViewOnSelect}
              onCheck={this.treeViewOnCheck}
              checkedKeys={this.state.checkedKeys}
              iconClass={tree.iconClass || null}
              checkable={isCheckable}
              selectable={isSelectable}
              defaultExpandAll={expandAll}
              showIcon={showIcon}
              showLine={showLine}
              dataLookUpKey={lookUpKey}
              dataLookUpValue={lookUpValue}
              dataLookUpChildren={children}
              disableCheckboxes={disableCheckboxes}
            />
          </div>
        </div>
      </div>
    );
  }
}
