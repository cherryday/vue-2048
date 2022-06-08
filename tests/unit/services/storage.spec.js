import { beforeEach, describe, expect, it, vi } from 'vitest';
import storage from '../../../src/services/storage';

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
});

describe('storage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('should get gameState', () => {
    const gameState = { tiles: [], score: 0 };
    window.localStorage.getItem.mockImplementation(() =>
      JSON.stringify(gameState),
    );
    expect(storage.getGameState()).toEqual(gameState);
    expect(window.localStorage.getItem).toHaveBeenCalledWith('game');
  });

  it('should return null gameState if score not a number', () => {
    window.localStorage.getItem.mockImplementation(() =>
      JSON.stringify({ tiles: [], score: undefined }),
    );
    expect(storage.getGameState()).toBeNull();
  });

  it('should return null gameState if tiles not a array', () => {
    window.localStorage.getItem.mockImplementation(() =>
      JSON.stringify({ tiles: '', score: 0 }),
    );
    expect(storage.getGameState()).toBeNull();
  });

  it('should set gameState', () => {
    const gameState = { tiles: [], score: 0 };
    storage.setGameState(gameState);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'game',
      JSON.stringify(gameState),
    );
  });

  it('should clear gameState', () => {
    storage.clearGameState();
    expect(window.localStorage.removeItem).toHaveBeenCalledWith('game');
  });

  it('should get bestScore', () => {
    const score = 5;
    window.localStorage.getItem.mockImplementation(() => score);
    expect(storage.getBestScore()).toBe(score);
    expect(window.localStorage.getItem).toHaveBeenCalledWith('bestScore');
  });

  it('should return null if bestScore not a number', () => {
    window.localStorage.getItem.mockImplementation(() => undefined);
    expect(storage.getBestScore()).toBeNull();
  });

  it('should set bestScore', () => {
    const score = 5;
    storage.setBestScore(score);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'bestScore',
      score,
    );
  });

  it('should clear bestScore', () => {
    storage.clearBestScore();
    expect(window.localStorage.removeItem).toHaveBeenCalledWith('bestScore');
  });
});
