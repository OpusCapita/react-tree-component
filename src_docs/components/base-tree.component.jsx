import React from 'react';
import { fromJS, List } from 'immutable';
import OCTreeView from '../../src/index';

import './base.scss';

export default class BaseTree extends React.PureComponent {
  constructor(props) {
    super(props);
    const checkedKeys = props.tree.defaultCheckedKeys;
    this.state = {
      defaultCheckedKeys: checkedKeys,
      defaultExpandedKeys: [],
      defaultSelectedKeys: [],
    };
  }

  // Think about the tree data still

  treeview_onExpand(expandedKeys){
    console.log('onExpand', expandedKeys, arguments);
  }

  treeview_onSelect(selectedKeys, info){
    console.log('onSelect', selectedKeys, info);
    this.selKey = info.node.props.eventKey;
  }

  treeview_onCheck(checkedKeys, info){
    console.log('onCheck', checkedKeys, info);
  }

  componentWillMount() {
    console.log('Props: ', this.props);
  }

  renderConfiguration = (treeProps) => {
    const conf = fromJS(treeProps);
    return (
      <pre className="example-config">
        <h4>Tree configuration</h4>
        <code>
        {
          fromJS(treeProps).entrySeq().map(
            ([key, value]) => (<div className="config-content">
              <div className="property-key">{`${key}:`}</div>
              <div className="property-value">{value}</div>
            </div>)
          )
        }
      </code>
      </pre>
    );
  }

  render() {
    const {
      headerText,
      description,
      treeData,
      tree,
    } = this.props;
    // Boolean Flags:
    const isCheckable = (tree.checkable == 'true');
    const isSelectable = (tree.selectable == 'true');
    const expandAll = (tree.defaultExpandAll == 'true');
    const showLine = (tree.showLine == 'true');
    const showIcon = (tree.showIcon == 'true');
    const disableCheckboxes = (tree.disableCheckbox == 'true');
    const lookUpKey = tree.dataLookUpKey || 'key';
    const lookUpValue = tree.dataLookUpValue || 'parent';
    const children = tree.dataLookUpChildren || 'children';

    return (
      <div id="plain-tree-example-container">
        <div id="plain-tree-example-header-container">
          <div id="header-text"><h3>{headerText}</h3></div>
          <div id="configuration-opts">
            <div id="description">
              { description }
            </div>
            { this.renderConfiguration(tree) }
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
              onExpand={this.treeview_onExpand}
              onSelect={this.treeview_onSelect}
              onCheck={this.treeview_onCheck}
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
