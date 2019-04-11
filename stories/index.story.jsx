import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, number, boolean, array, select } from '@storybook/addon-knobs';
import '../src_docs/app.component.scss';

// Application imports
import Tree from '../src/tree.component';
import exampleTree from './example-tree.json';


const stories = storiesOf('@opuscapita/react-tree-component', module);

const knobs = {
  checkable: boolean('Is checkable', true, 'Select props'),
};
// FloatingSelectStory
stories.add('TreeComponent', () => (
  /* eslint-disable key-spacing */
  <Tree
    treeData={exampleTree}
    dataLookUpKey="id"
    dataLookUpValue="name"
    {...knobs}
  />
));
