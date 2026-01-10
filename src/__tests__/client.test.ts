import { afterEach, beforeEach, describe, test, expect, vi } from 'vitest';
import {fetchMonsterByIndex, fetchMonsterIndex} from '../lib/dnd5e/client';

// Helper: set DEV before importing the module under test
const originalEnv = import.meta.env;

function setDev(dev: boolean) {
  Object.defineProperty(import.meta, 'env', {
    value: { ...originalEnv, DEV: dev },
    configurable: true,
  });
};

describe('monster api', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    // Put env back 
    setDev(originalEnv.DEV);
    vi.clearAllMocks();
  });

  test('fetch monster', async () => {
    setDev(true);

    const mockResponse = {
      index: "orc",
      name: "Orc",
      hit_points: 15,
      armor_class: [{ value: 13 }],
      dexterity: 12,
    }

    const data = await fetchMonsterByIndex('orc');
    expect(data).toEqual(mockResponse);
  });

  test('fetch monster list', async () => {
    setDev(true);

    const responseData = {
      count: 5,
      results: [
        { index: "goblin", name: "Goblin", url: "/api/monsters/goblin" },
        { index: "orc", name: "Orc", url: "/api/monsters/orc" },
        { index: "skeleton", name: "Skeleton", url: "/api/monsters/skeleton" },
        { index: "zombie", name: "Zombie", url: "/api/monsters/zombie" },
        { index: "young-red-dragon", name: "Young Red Dragon", url: "/api/monsters/young-red-dragon" },
      ],
    }

    const fetchSpy = vi
      .spyOn(globalThis, 'fetch' as any)
      .mockImplementation(() => {
        throw new Error("fetch should not be called in mock mode");
      });

    const data = await fetchMonsterIndex();

    expect(data).toHaveBeenCalled;
    expect(data).toEqual(responseData);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  test('fetchMonsterByIndex throws in mock mode if monster does not exist', async () => {
    setDev(true);

    vi.doMock('../mock/monsters', () => ({
      mockMonsterIndex: {},
    }));

    vi.doMock('../mock/monsterDetails', () => ({
      mockMonsterDetails: {}, // empty
    }));

    const { fetchMonsterByIndex } = await import('../lib/dnd5e/client'); 

    await expect(fetchMonsterByIndex("does-not-exist")).rejects.toThrow(
      "Mock monster not found: does-not-exist"
    );
  });  

  test('fetch monster list throws if res is not ok', async () => {
    setDev(true);

    vi.doMock('../mock/monsters', () => ({
      mockMonsterIndex: {},
    }));

    const data = global.fetch = vi.fn(() => Promise.reject('API is down'));

    expect(data).toHaveBeenCalled;
    expect(data).rejects.toThrow('API is down');
  });
  
});