import React from 'react';
import BaseTree from './base-tree.component';
import {
  AllTrueDefaultConfig,
  AllTrueWithChevronConfig,
  ArrowConfig,
  CaretConfig,
  ChevronConfig,
  CustomLookUpConfig,
  DefaultSelectedKeysConfig,
  NoIconDefaultConfig,
  NoSelectConfig,
  PlainTreeConfig,
} from './constants';

import './example-component.scss';

export default class ComponentView extends React.PureComponent {
  render() {
    return (
      <div id="oc-react-tree-container" className="oc-columns">
        <div id="columns-container" className="oc-columns-container">
          <div id="plain-tree-view" className="oc-columns-item-container">
            <BaseTree {...PlainTreeConfig} />
          </div>
          <div id="noselectable-tree-view" className="oc-columns-item-container">
            <BaseTree {...NoSelectConfig} />
          </div>
          <div id="chevron-tree-view" className="oc-columns-item-container">
            <BaseTree {...ChevronConfig} />
          </div>
          <div id="arrow-tree-view" className="oc-columns-item-container">
            <BaseTree {...ArrowConfig} />
          </div>
          <div id="chevron-all-true-tree-view" className="oc-columns-item-container">
            <BaseTree {...AllTrueWithChevronConfig} />
          </div>
          <div id="all-true-tree-view" className="oc-columns-item-container">
            <BaseTree {...AllTrueDefaultConfig} />
          </div>
          <div id="no-icon-tree-view" className="oc-columns-item-container">
            <BaseTree {...NoIconDefaultConfig} />
          </div>

          <div id="caret-tree-view" className="oc-columns-item-container">
            <BaseTree {...CaretConfig} />
          </div>
          <div id="defaultselected-tree-view" className="oc-columns-item-container">
            <BaseTree {...DefaultSelectedKeysConfig} />
          </div>
          <div id="defaultselected-tree-view" className="oc-columns-item-container">
            <BaseTree {...CustomLookUpConfig} />
          </div>
        </div>
      </div>
    );
  }
}
