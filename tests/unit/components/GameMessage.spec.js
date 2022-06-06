import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import GameMessage from '../../../src/components/GameMessage.vue';

describe('GameMessage', () => {
  it('render slot', () => {
    const defaultSlot = '<h1>default</h1>';
    const actionSlot = '<button>action</button>';
    const wrapper = mount(GameMessage, {
      slots: {
        default: defaultSlot,
        action: actionSlot,
      },
    });

    expect(wrapper.html()).toContain(defaultSlot);
    expect(wrapper.html()).toContain(actionSlot);
  });
});
