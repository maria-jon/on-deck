import { describe, test, expect } from 'vitest';
import { formatTime } from '../components/utils/formatTime.ts';

describe('stopwatch', () => {
  test('format 9000 ms to 09s', () => {
    const ms = 9000;

    const time = formatTime(ms);
    
    expect(time).toBe('0m 09s');
  })

  test('format 10000 ms to 10s', () => {
    const ms = 10000;

    const time = formatTime(ms);
    
    expect(time).toBe('0m 10s');
  })

  test('format 60000 ms to 1 minute', () => {
    const ms = 60000;

    const time = formatTime(ms);
    
    expect(time).toBe('1m 00s');
  })

  test('format 4503000 ms to 1h15m3s', () => {
    const ms = 4503000;

    const time = formatTime(ms);
    
    expect(time).toBe('1h 15m 03s');
  })
})