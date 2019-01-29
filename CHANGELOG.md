# Changelog

* In general follow (https://docs.npmjs.com/getting-started/semantic-versioning) versioning.

## <next>

## 2.1.2
* Remove base64 encoded images from the styles. Component should now be CSP-compliant.

## 2.1.1
* Bug and layout fixes

## 2.1.0
* Arrows for reordering tree elements (`showOrderingArrows` and `onOrderButtonClick` props)
* Added `@opuscapita/react-perfect-scrollbar` around tree
* Made some changes on how nodes are expanded. Now it's not necessary to provide external `onExpand` callback in most of the cases.

## 2.0.1
* Hotfix: `expandedKeys` default value from `[]` to undefined.

## 2.0.0
* Item shouldn't get deselected when clicking on the header. This is now fixed.
* Removed `defaultExpandedKeys`, `defaultSelectedKeys` and `defaultCheckedKeys` props. You can achieve the same result with `expandedKeys`, `selectedKeys` and `checkedKeys`.

## 1.6.0
* Added expand all toggle and `showExpandAll`, `headerRight`  & `title` props

## 1.5.0
* Added `deselectOnContainerClick` prop
* Fixed README
* Fixed examples
* Fixed package name to `react-tree-component`

## 1.4.0
* Rewrote the whole drag n' drop functionality. Hopefully it works better now.
* Some CSS fixes. The Tree is now using `oc-cm-common-styles` library
* A couple of new props (`selectedKeys` && `isDragDropLegal`)

## 1.3.1
* Checkboxes are now implemented with CSS.

## 1.3.0
* Removed extra padding around rc-tree and made a few other adjustments
* Renamed treeClass prop to className, so that the component will play nicely with styled-components, etc.

## 1.2.1
* Move react-icons from devDependencies to dependencies

## 1.2.0
* Added a custom Checkbox component
* Set 'caret' as a default iconClass for "switchers"

## 1.1.1
* Changed disabling logic a bit (removed disableCheckboxes prop and added disabled prop)

## 1.1.0
* Added a drag 'n drop functionality

## 1.0.1
* Fixed a bug where tree rendered incorrectly when there were no items in the list
* Fixed examples and a few eslint issues

## 1.0.0
* Initial release
