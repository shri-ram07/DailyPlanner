import type { StateStorage } from 'zustand/middleware';

const API_URL = '/api/storage';

export const vercelKVStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      const response = await fetch(`${API_URL}?key=${encodeURIComponent(name)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch from storage');
      }
      const data = await response.json();
      // Return stringified data for Zustand, or null if no data
      return data ? JSON.stringify(data) : null;
    } catch (error) {
      console.error('Error reading from Vercel KV:', error);
      // Fallback to localStorage in development or on error
      return localStorage.getItem(name);
    }
  },

  setItem: async (name: string, value: string): Promise<void> => {
    try {
      // Also save to localStorage as backup
      localStorage.setItem(name, value);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: name,
          value: JSON.parse(value) // Store as object in KV
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to save to storage');
      }
    } catch (error) {
      console.error('Error writing to Vercel KV:', error);
      // localStorage fallback already done above
    }
  },

  removeItem: async (name: string): Promise<void> => {
    try {
      localStorage.removeItem(name);

      await fetch(API_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: name }),
      });
    } catch (error) {
      console.error('Error removing from Vercel KV:', error);
    }
  },
};
