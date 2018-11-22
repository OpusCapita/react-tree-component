import React from 'react';
import PropTypes from 'prop-types';

export default class HierarchyTreeSelectorExpandAllToggle extends React.PureComponent {
  static propTypes = {
    onExpandAllClick: PropTypes.func.isRequired,
    expandAll: PropTypes.bool.isRequired,
  };

  static defaultProps = {};

  render() {
    const { onExpandAllClick, expandAll } = this.props;
    const expandedCls = expandAll ? 'all-expanded' : '';
    return (
      <button className={`expand-all-toggle ${expandedCls}`} onExpandAllClick={onExpandAllClick} />
    );
  }
}
