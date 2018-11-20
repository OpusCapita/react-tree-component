# Changelog

* In general follow (https://docs.npmjs.com/getting-started/semantic-versioning) versioning.
## <next>
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
