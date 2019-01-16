import React from 'react';
import PropTypes from 'prop-types';

export default class OrderingArrows extends React.PureComponent {
  static propTypes = {
    onOrderButtonClick: PropTypes.func.isRequired,
    dataLookUpKey: PropTypes.string.isRequired,
    dataLookUpChildren: PropTypes.string.isRequired,
    selectedKeys: PropTypes.arrayOf(PropTypes.string),
    treeData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    selectedParent: PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.array,
    ]),
  };

  static defaultProps = {
    selectedKeys: [],
    selectedParent: null,
  };

  onUpClick = () => {
    const newItems = this.getUpdatedTreeAfterShift('up');
    this.props.onOrderButtonClick(newItems);
  };

  onDownClick = () => {
    const newItems = this.getUpdatedTreeAfterShift('down');
    this.props.onOrderButtonClick(newItems);
  };

  /**
   * Swaps array elements
   * @param original - original array
   * @param dir - click direction ('up/down')
   * @returns {*}
   */
  getArrangedArray = (original, dir) => {
    const { dataLookUpKey, selectedKeys } = this.props;
    const id = selectedKeys[0];
    const modified = original.slice();
    const startIndex = modified.findIndex(item => item[dataLookUpKey] === id);
    let endIndex = startIndex;

    if (dir === 'up' && startIndex > 0) {
      endIndex -= 1;
    } else if (dir === 'down' && startIndex < modified.length - 1) {
      endIndex += 1;
    }

    const swapped = modified[startIndex];
    modified[startIndex] = modified[endIndex];
    modified[endIndex] = swapped;

    return modified;
  };

  /**
   * Returns a new tree after re-ordering (arrow button click)
   * @param dir
   * @param array
   * @returns {*}
   */
  getUpdatedTreeAfterShift = (dir, array = this.props.treeData) => {
    const {
      selectedKeys, dataLookUpKey, onOrderButtonClick, dataLookUpChildren,
    } = this.props;
    if (selectedKeys.length !== 1) return false;
    if (!onOrderButtonClick) throw TypeError('Tree: onOrderButtonClick callback is not defined');
    const newItems = array.slice();
    const id = selectedKeys[0];

    // If item is found on main level:
    let found = newItems.find(item => item[dataLookUpKey] === id);
    if (found) return this.getArrangedArray(array, dir);

    // Otherwise..
    for (let i = 0; i < newItems.length; i += 1) {
      const item = newItems[i];
      if (!found && item[dataLookUpChildren]) {
        found = !!item[dataLookUpChildren].find(child => child[dataLookUpKey] === id);
        if (found) {
          item[dataLookUpChildren] = this.getArrangedArray(item[dataLookUpChildren], dir);
          break;
        }
        if (item[dataLookUpChildren] && !found) {
          found = this.getUpdatedTreeAfterShift(dir, item[dataLookUpChildren]);
        }
      }
    }
    if (!found) return false;
    return newItems;
  };

  /**
   * Is ordering arrow disabled
   * @param dir ('up/down')
   * @returns {boolean}
   */
  isArrowDisabled = (dir) => {
    const {
      selectedParent, selectedKeys, dataLookUpKey, dataLookUpChildren,
    } = this.props;
    if (!selectedKeys.length) return true;

    const parentArr = Array.isArray(selectedParent) ?
      selectedParent : selectedParent[dataLookUpChildren];
    const index = parentArr.findIndex(item => item[dataLookUpKey] === selectedKeys[0]);

    if (dir === 'up') return index === 0;
    return index === parentArr.length - 1;
  };

  render() {
    return (
      <div className="ordering-arrows">
        <button
          onClick={this.onUpClick}
          className="up-arrow "
          disabled={this.isArrowDisabled('up')}
          type="button"
        />
        <button
          onClick={this.onDownClick}
          className="down-arrow"
          disabled={this.isArrowDisabled('down')}
          type="button"
        />
      </div>
    );
  }
}
