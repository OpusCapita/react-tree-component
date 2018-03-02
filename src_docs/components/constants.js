import React from 'react';

export const TreeViewData = [
    { key: 'item1',
      parent: 'Item 1',
      children: [
        { key: 'item1.1', parent: 'Item 1.1', selectable: false, children: [] },
        { key: 'item1.2', parent: 'Item 1.2', children: [] },
        { key: 'item1.3',
          parent: 'Item 1.3',
          children: [
          { key: 'item1.3.1', parent: 'Item 1.3.1', children: [] },
          { key: 'item1.3.2', parent: 'Item 1.3.2', children: [] },
          { key: 'item1.3.3', parent: 'Item 1.3.3', children: [] },
          ],
        },
      ],
    },
    {
      key: 'item2',
      parent: 'Item 2',
      children: [
        { key: 'item2.1', parent: 'Item 2.1', children: [] },
        { key: 'item2.2', parent: 'Item 2.2', children: [] },
      ],
    },
    { key: 'item3', parent: 'Item 3', children: [] },
    {
      key: 'item4',
      parent: 'Item 4',
      children: [] },
]

export const PlainTreeConfig = {
  description: 'TreeView - items are selectable, checkable. No other customization. ',
  headerText: 'Plain TreeView',
  treeData: TreeViewData,
  tree: {
    treeId: 'PlainTreeViewExample',
    checkable: 'true',
    selectable: 'true',
    defaultExpandAll: 'true',
  },
};

export const NoSelectConfig = {
  description: 'TreeView - Item it self cannot be selected without checking the checkbox at the same time.',
  headerText: 'Not Selectable TreeView',
  treeData: TreeViewData,
  tree: {
    treeId: 'NotSelectableTreeViewExample',
    checkable: 'true',
    selectable: 'false',
    defaultExpandAll: 'true',
  },
};

export const ChevronConfig = {
  description: 'TreeView.',
  headerText: 'TreeView with Chevron indicators.',
  treeData: TreeViewData,
  tree: {
    treeId: 'ChevronIndicatorsTreeViewExample',
    checkable: 'false',
    selectable: 'false',
    defaultExpandAll: 'false',
    showLine: 'false',
    showIcon: 'false',
    iconClass: 'chevron'
  },
};

export const ArrowConfig = {
  description: 'TreeView.',
  headerText: 'TreeView with Arrow indicators',
  treeData: TreeViewData,
  tree: {
    treeId: 'ArrowIndicatorsTreeViewExample',
    checkable: 'false',
    selectable: 'false',
    defaultExpandAll: 'false',
    showLine: 'false',
    showIcon: 'false',
    iconClass: 'arrow'
  },
};

export const CaretConfig = {
  description: 'TreeView.',
  headerText: 'TreeView with Caret indicators',
  treeData: TreeViewData,
  tree: {
    treeId: 'CaretIndicatorsTreeViewExample',
    checkable: 'true',
    selectable: 'false',
    defaultExpandAll: 'true',
    iconClass: 'carets',
  },
};

export const AllTrueWithChevronConfig = {
  description: 'TreeView.',
  headerText: 'TreeView with all boolean true and with Chevron indicators',
  treeData: TreeViewData,
  tree: {
    treeId: 'ChevronIndicatorsAllTrueTreeViewExample',
    checkable: 'true',
    selectable: 'true',
    defaultExpandAll: 'true',
    showLine: 'true',
    showIcon: 'true',
    iconClass: 'chevron'
  },
};

export const AllTrueDefaultConfig = {
  description: 'TreeView.',
  headerText: 'TreeView with all boolean true',
  treeData: TreeViewData,
  tree: {
    treeId: 'AllTrueTreeViewExample',
    checkable: 'true',
    selectable: 'true',
    defaultExpandAll: 'true',
    showLine: 'true',
    showIcon: 'true',
  },
};

export const NoIconDefaultConfig = {
  description: 'TreeView.',
  headerText: 'TreeView showIcon set to false',
  treeData: TreeViewData,
  tree: {
    treeId: 'NoIconTreeViewExample',
    checkable: 'true',
    selectable: 'true',
    defaultExpandAll: 'true',
    showLine: 'true',
    showIcon: 'false',
  },
};

export const DefaultSelectedKeysConfig = {
  description: 'TreeView.',
  headerText: 'TreeView showIcon set to false',
  treeData: TreeViewData,
  tree: {
    treeId: 'NoIconTreeViewExample',
    checkable: 'true',
    selectable: 'true',
    defaultExpandAll: 'true',
    showLine: 'true',
    showIcon: 'false',
    defaultCheckedKeys: [
      'item1.2', 'item1.3.1',
    ],
  },
};
