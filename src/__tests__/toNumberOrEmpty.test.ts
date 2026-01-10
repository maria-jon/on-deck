import { test, expect } from 'vitest';
import toNumberOrEmpty from '../components/utils/toNumberOrEmpty';

test('empty string to empty', () => {
  const value = '';

  const result = toNumberOrEmpty(value);
  
  expect(result).toBe('');
})

test('string to number', () => {
  const value = '20';

  const result = toNumberOrEmpty(value);
  
  expect(result).toBe(20);
})