import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '../../../src/components/BaseButton.vue';

describe('BaseButton', () => {
  it('render slot', () => {
    const slot = 'test';
    const wrapper = mount(BaseButton, {
      slots: {
        default: slot,
      },
    });

    expect(wrapper.text()).toBe(slot);
  });

  it('emit click', async () => {
    const wrapper = mount(BaseButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
