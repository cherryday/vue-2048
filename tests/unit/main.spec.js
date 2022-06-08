import { createApp } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import App from '../../src/App.vue';

vi.mock('vue', () => ({
  createApp: vi.fn(),
}));

describe('main', () => {
  it('should create and mount app', async () => {
    const mountMock = vi.fn();
    createApp.mockImplementation(() => ({
      mount: mountMock,
    }));

    await import('../../src/main');

    expect(createApp).toHaveBeenCalledWith(App);
    expect(mountMock).toHaveBeenCalledWith('#app');
  });
});
