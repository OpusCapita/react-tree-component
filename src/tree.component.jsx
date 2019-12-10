import React from 'react';
import PropTypes from 'prop-types';
import Tree, { TreeNode } from 'rc-tree';
import PerfectScrollBar from '@opuscapita/react-perfect-scrollbar';

// Load default styles and override them with rc-tree styles
import './assets/rc-tree-styles.scss';
import './assets/oc-tree-styles.scss';
import TreeCheckbox from './tree-checkbox.component';
import OrderingArrows from './tree-ordering-arrows.component';

export default class OCTreeView extends React.PureComponent {
  static propTypes = {
    treeId: PropTypes.string,
    className: PropTypes.string,
    iconClass: PropTypes.string,
    onExpand: PropTypes.func,
    onSelect: PropTypes.func,
    onCheck: PropTypes.func,
    onDragDrop: PropTypes.func,
    onOrderButtonClick: PropTypes.func,
    isDragDropLegal: PropTypes.func,
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
    dataLookUpLeafValue: PropTypes.string,
    dataLookUpChildren: PropTypes.string,
    checkedKeys: PropTypes.arrayOf(PropTypes.string),
    selectedKeys: PropTypes.arrayOf(PropTypes.string),
    expandedKeys: PropTypes.arrayOf(PropTypes.string),
    handleExpandedKeysManually: PropTypes.bool,
    defaultExpandedKeys: PropTypes.arrayOf(PropTypes.string),
    deselectOnContainerClick: PropTypes.bool,
    showExpandAll: PropTypes.bool,
    title: PropTypes.string,
    headerRight: PropTypes.node,
    showOrderingArrows: PropTypes.bool,
  };

  static defaultProps = {
    treeId: 'defaultTree',
    iconClass: 'carets',
    onExpand: undefined,
    onSelect: undefined,
    onCheck: undefined,
    onDragDrop: undefined,
    onOrderButtonClick: undefined,
    isDragDropLegal: undefined,
    disabled: false,
    showIcon: true,
    checkable: false,
    draggable: false,
    selectable: false,
    defaultExpandAll: false,
    // Customs
    dataLookUpKey: 'key',
    dataLookUpValue: 'parent',
    dataLookUpLeafValue: undefined,
    dataLookUpChildren: 'children',
    treeData: [],
    checkedKeys: [],
    selectedKeys: [],
    expandedKeys: [],
    defaultExpandedKeys: [],
    className: '',
    deselectOnContainerClick: true,
    showExpandAll: false,
    title: undefined,
    headerRight: undefined,
    showOrderingArrows: false,
    handleExpandedKeysManually: false,
  };

  constructor(props) {
    super();
    const expandedKeys = props.defaultExpandAll
      ? this.getAllParentIds(props.treeData, props) : props.expandedKeys;

    this.state = {
      expandedKeys,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.handleExpandedKeysManually &&
      (nextProps.expandedKeys !== this.props.expandedKeys)) {
      this.setState({
        expandedKeys: nextProps.expandedKeys,
      });
    }
  }

  onContainerClick = (e) => {
    const { onSelect, deselectOnContainerClick } = this.props;
    // clicking outside item
    if (deselectOnContainerClick
      && e.target.tagName !== 'SPAN'
      && (!this.header || (this.header && !this.header.contains(e.target)))
      && onSelect) {
      onSelect([]);
    }
  };

  onExpand = (expandedKeys) => {
    const { onExpand, handleExpandedKeysManually } = this.props;
    if (!handleExpandedKeysManually) return;
    this.setState({ expandedKeys }, () => {
      if (onExpand) onExpand(this.state.expandedKeys);
    });
  };

  onDragDrop = (e) => {
    const { onDragDrop, isDragDropLegal, treeData } = this.props;
    if (!onDragDrop) throw new TypeError('onDragDrop callback is not defined');

    // Calling isDragDropLegal callback to ensure that this move can be done
    if (isDragDropLegal && !isDragDropLegal(treeData, e)) return;

    const newData = this.getUpdatedTree(this.getTreeItem(e.dragNode.props.eventKey), e);
    onDragDrop(newData, e);
  };

  onExpandAllClick = () => {
    const { onExpand } = this.props;
    const expandedKeys = this.isAllExpanded() ? [] : this.getAllParentIds();
    this.setState({ expandedKeys }, () => {
      if (onExpand) onExpand(this.state.expandedKeys);
    });
  };

  getSelectedParent = () => {
    const { selectedKeys, treeData } = this.props;
    const id = selectedKeys[0];
    const parent = this.getTreeItem(id, treeData, true);
    return parent || treeData;
  };

  /**
   * Returns updated tree after Drag n' drop event
   * @param dragItem - dragged item
   * @param dragEvent - event
   * @param array - used recursively
   * @param parentFiltered - used recursively
   * @returns {*}
   */
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

  /**
   * Returns a tree item by ID
   * @param id
   * @param array
   * @param returnParent - return item's parent instead of the item
   * @param parent - parent item (used recursively)
   * @returns {{}}
   */
  getTreeItem = (id, array = this.props.treeData, returnParent = false, parent = null) => {
    const { dataLookUpChildren, dataLookUpKey } = this.props;
    let found = array.find(item => item[dataLookUpKey] === id);

    if (found && returnParent) found = parent;

    if (!found) {
      array.forEach((item) => {
        if (item[dataLookUpChildren] && !found) {
          found = this.getTreeItem(id, item[dataLookUpChildren], returnParent, item);
        }
      });
    }
    return found;
  };

  /**
   * Returns all parent IDs in the tree
   * @param array
   */
  getAllParentIds = (array = this.props.treeData, props = this.props) => {
    const { dataLookUpKey, dataLookUpChildren } = props;
    const cb = (acc, item) => {
      let total = acc;
      if (item[dataLookUpChildren] && item[dataLookUpChildren].length > 0) {
        total = acc.concat(item[dataLookUpKey]);
        return item[dataLookUpChildren].reduce(cb, total);
      }
      return total;
    };
    return array.reduce(cb, []);
  };

  /**
   * Checks whether or not all parent IDs are expanded
   * @returns {boolean}
   */
  isAllExpanded = () =>
    this.state.expandedKeys && this.state.expandedKeys.length === this.getAllParentIds().length;


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
      dataLookUpKey, dataLookUpValue, dataLookUpLeafValue, dataLookUpChildren, iconClass, disabled,
    } = this.props;
    const checkChildren = this.hasChildren;

    // Recursive function for collecting nodes:
    const mountNodes = (nodeList) => {
      const list = [];
      nodeList.forEach((node) => {
        if (!node[dataLookUpKey]) return false;
        // Leaf node
        if (!checkChildren(node)) {
          const title = dataLookUpLeafValue ? node[dataLookUpLeafValue] : node[dataLookUpValue];
          list.push( // eslint-disable-line function-paren-newline
            <TreeNode
              title={title}
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
    const resolvedProps = {};
    const {
      treeId, className, checkedKeys, onSelect, onCheck, showIcon, checkable, selectable,
      draggable, disabled, selectedKeys, showExpandAll, title, headerRight, showOrderingArrows,
      onOrderButtonClick, defaultExpandedKeys, handleExpandedKeysManually,
    } = this.props;
    const clsName = className ? `${className} oc-react-tree` : 'oc-react-tree';
    const expandAllClsName = this.isAllExpanded() ? 'expand-all' : '';

    // We don't pass expandedKeys to rc-tree unless we want to handle expandedKeys
    // by ourselves
    if (handleExpandedKeysManually) resolvedProps.expandedKeys = this.state.expandedKeys;

    return (
      // eslint-disable-next-line
      <div id="tree-view-container" className={clsName} onClick={this.onContainerClick}>
        {(showExpandAll || title || headerRight || showOrderingArrows)
        && (
          <header
            className="tree-header"
            ref={(el) => {
              this.header = el;
            }}
          >
            <div className="header-left">
              {showExpandAll && !!nodes.length
              && (
                <button
                  onClick={this.onExpandAllClick}
                  className={`expand-all-toggle ${expandAllClsName}`}
                  type="button"
                />
              )}
              {title && <h2>{title}</h2>}
              {showOrderingArrows
              && (
                <OrderingArrows
                  onOrderButtonClick={onOrderButtonClick}
                  selectedParent={this.getSelectedParent()}
                  {...this.props}
                />
              )}
            </div>
            {headerRight && <div className="header-right">{headerRight}</div>}
          </header>
        )}
        <PerfectScrollBar>
          {!!nodes.length
          && (
            <Tree
              id={treeId}
              className={className}
              checkedKeys={checkedKeys}
              selectedKeys={selectedKeys}
              defaultExpandedKeys={defaultExpandedKeys}
              onExpand={this.onExpand}
              onSelect={onSelect}
              onCheck={onCheck}
              onDrop={this.onDragDrop}
              checkable={checkable}
              selectable={selectable}
              draggable={draggable}
              showLine={false}
              showIcon={showIcon}
              disabled={disabled}
              {...resolvedProps}
            >
              {nodes}
            </Tree>
          )
          }
        </PerfectScrollBar>
      </div>
    );
  }
}
