/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import OCTreeView from '../../src/index';

describe('OCTreeView component', () => {
  it('is rendered', () => {
    const wrapper = mount(<OCTreeView />);
    expect(wrapper).to.exist;
  });
});
