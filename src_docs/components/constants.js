import perms from '../mockdata/perms.json';

export const TreeViewData = [
  {
    key: 'item1',
    parent: 'Item 1',
    children: [
      {
        key: 'item1.1', parent: 'Item 1.1', selectable: false, children: [],
      },
      { key: 'item1.2', parent: 'Item 1.2', children: [] },
      {
        key: 'item1.3',
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
    children: [],
  },
];

export const PlainTreeConfig = {
  description: 'TreeView - items are selectable, checkable. No other customization. ',
  headerText: 'Plain TreeView',
  treeData: TreeViewData,
  tree: {
    treeId: 'PlainTreeViewExample',
    checkable: 'true',
    selectable: 'true',
    defaultExpandAll: 'true',
    disabled: 'false',
    title: 'Plain TreeView',
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
    disabled: 'false',
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
    showIcon: 'false',
    iconClass: 'chevron',
    disabled: 'false',
    showExpandAll: 'true',
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
    showIcon: 'false',
    iconClass: 'arrow',
    disabled: 'false',
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
    disabled: 'false',
    showExpandAll: 'true',
    title: 'Expand all visible',
  },
};

export const AllTrueWithChevronConfig = {
  description: 'TreeView.',
  headerText: 'TreeView with all boolean true and with Chevron indicators',
  treeData: TreeViewData,
  tree: {
    treeId: 'ChevronIndicatorsAllTrueTreeViewExample',
    checkable: 'true',
    selectable: 'false',
    defaultExpandAll: 'true',
    showIcon: 'true',
    iconClass: 'chevron',
    disabled: 'false',
    showExpandAll: 'true',
    headerRight: 'Some custom content here',
  },
};

export const AllTrueDefaultConfig = {
  description: 'TreeView.',
  headerText: 'TreeView with all boolean true',
  treeData: TreeViewData,
  tree: {
    treeId: 'AllTrueTreeViewExample',
    checkable: 'true',
    selectable: 'false',
    defaultExpandAll: 'true',
    showIcon: 'true',
    disabled: 'false',
  },
};

export const NoIconDefaultConfig = {
  description: 'TreeView.',
  headerText: 'TreeView showIcon set to false',
  treeData: TreeViewData,
  tree: {
    treeId: 'NoIconTreeViewExample',
    checkable: 'true',
    selectable: 'false',
    defaultExpandAll: 'true',
    showIcon: 'false',
    disabled: 'false',
  },
};

export const DefaultSelectedKeysConfig = {
  description: 'TreeView.',
  headerText: 'TreeView showIcon set to false',
  treeData: TreeViewData,
  tree: {
    treeId: 'NoIconTreeViewExample',
    checkable: 'true',
    selectable: 'false',
    defaultExpandAll: 'true',
    showIcon: 'false',
    disabled: 'false',
    defaultCheckedKeys: [
      'item1.2', 'item1.3.1',
    ],
  },
};

function getData() {
  return [perms];
}

export const CustomLookUpConfig = {
  description: 'TreeView.',
  headerText: 'TreeView with custom dataLookUpKey, dataLookUpValue, dataLookUpChildren',
  treeData: getData(),
  tree: {
    treeId: 'CustomLookUpExample',
    checkable: 'true',
    selectable: 'false',
    defaultExpandAll: 'false',
    showIcon: 'false',
    dataLookUpKey: 'permissionId',
    dataLookUpValue: 'name',
    dataLookUpChildren: 'subRights',
    disabled: 'true',
    title: 'TreeView',
  },
};

export const DraggableConfig = {
  description: 'TreeView - items are selectable, checkable and draggable',
  headerText: 'Draggable Items',
  treeData: TreeViewData,
  tree: {
    treeId: 'PlainTreeViewExample',
    checkable: 'true',
    selectable: 'false',
    defaultExpandAll: 'true',
    disabled: 'false',
    draggable: 'true',
    showExpandAll: 'true',
  },
};
