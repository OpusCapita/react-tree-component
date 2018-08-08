# react-tree-component

### Description
React Tree Component for showing simple hiearchy structures on the UI. Component is based on rc-tree (https://github.com/react-component/tree) component.


### Installation
```
npm install @opuscapita/react-tree-component
```

### Demo
View the [DEMO](https://opuscapita.github.io/react-tree-component)

### Builds
#### UMD
The default build with compiled styles in the .js file. Also minified version available in the lib/umd directory.
#### CommonJS/ES Module
You need to configure your module loader to use `cjs` or `es` fields of the package.json to use these module types.
Also you need to configure sass loader, since all the styles are in sass format.
* With webpack use [resolve.mainFields](https://webpack.js.org/configuration/resolve/#resolve-mainfields) to configure the module type.
* Add [SASS loader](https://github.com/webpack-contrib/sass-loader) to support importing of SASS styles.

### API
| Prop name                | Type             | Default                                  | Description                              |
| ------------------------ | ---------------- | ---------------------------------------- | ---------------------------------------- |
| treeId                   | string           |  defaultTree                             | Tree identifier                          |
| treeClass                | string           |  ''                                      | Tree container custom class for styling  |
| iconClass                | string           |  ''                                      | FontAwesome content based indicators:    |
|                          |                  |  chevron                                 | nodes as chevrons                        |
|                          |                  |  carets                                  | nodes as carets                          |
|                          |                  |  arrow                                   | nodes as arrows                          |
| defaultExpandedKeys      | Array            |  []                                      | Array of item ids to expand by default   |
| defaultSelectedKeys      | Array            |  []                                      | Array of item ids selected by default    |
| defaultCheckedKeys       | Array            |  []                                      | Array of item ids checked by default     |
| onExpand                 | Function         |  () => {}                                | Handling the node expand. Takes 'expandedKeys' as parameter ```jsx onExpand(expKeys) { console.log(expKeys, arguments); }                                ```|
| onSelect                 | Function         |  () => {}                                | Handling the item select. Takes 'selectedKeys' and 'info' (event object to get node)as parameter ```jsx onSelect(selKeys, info) { console.log(selKeys, info); }                        ```|
| onCheck                  | Function         |  () => {}                                | Handling the item checked                |
| onDragDrop               | Function         |  () => {}                                | Fires when item is dragged and dropped   |
|                          |                  |                                          | Takes 'checkedKeys' and info' (event object to get node) as parameter ```jsx onCheck (chkKeys, info) { console.log(chkKeys, info); }                                ``` |
| showLine                 | Boolean          |  false                                   | Whether show or hide node guide lines    |
| showIcon                 | Boolean          |  false                                   | Whether show or hide node guide lines    |
| checkable                | Boolean          |  false                                   | Whether show or hide checkboxes from tree|
| selectable               | Boolean          |  false                                   | Whether item can be selected.            |
| disabled                 | Boolean          |  false                                   | Disables all node items checkboxes.      |
| draggable                | Boolean          |  false                                   | Whether item can be dragged around.      |
| defaultExpandAll         | Boolean          |  false                                   | Expand all nodes by default.             |
|                          |                  |                                          | Note! For better performance do not      |
|                          |                  |                                          | enable this for large dataSets.          |
| treeData                 | Array            | []                                       | Array of node objects.                   |
| dataLookUpKey            | String           | 'key'                                    | Unique identifier of data item.          |
| dataLookUpValue          | String           | 'parent'                                 | Representative value of data item.       |
| dataLookUpChildren       | String           | 'children'                               | Data item property to identifiy subitems |


### Code example
```jsx
import React from 'react';
import { OCTreeView } from '@opuscapita/react-tree-component';   

export default class TreeView extends React.Component {
  const familyData = [
    {
      personId: '100',
      name: 'John Doe',
      siblings: [
        { personId: '100100', name: 'Martha Doe', siblings: [] },
        { personId: '100200', name: 'Jonathan Doe', siblings: [ { personId: '100200100', name: 'Mike Doe', siblings: [] }] },
      ], 
    },
    {
      personId: '200',
      name: 'Haley Miley',
      siblings: [
        { personId: '200100', name: 'Cyrus Miley', siblings: [] },
      ],
    },
  ]; 
  const treeConfig = {
    treeData: exampleData,
    treeId: 'FamilyTree',
    checkable: true,
    selectable: false,
    defaultExpandAll: false,
    showLine: true,
    showIcon: false,
    dataLookUpKey: 'personId',
    dataLookUpValue: 'name',
    dataLookUpChildren: 'siblings',
    disableCheckbox: true,
  };
  render() {
    return (
      <OCTreeView {...treeConfig} />
    );
  }
}
```
