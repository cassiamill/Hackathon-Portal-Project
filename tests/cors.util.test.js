const { isAllowedOrigin } = require('../utils/cors');

describe('isAllowedOrigin (unit)', () => {
  const allowed = ['http://localhost:5173', 'https://example.com'];

  test('allows an origin that is in the allowed list', () => {
    expect(isAllowedOrigin('http://localhost:5173', allowed)).toBe(true);
  });

  test('blocks an origin that is not in the allowed list', () => {
    expect(isAllowedOrigin('http://blocked.example', allowed)).toBe(false);
  });

  // Adjust these if your implementation treats undefined/null differently
  test('handles undefined/null origin (non-browser tools, same-origin)', () => {
    expect(isAllowedOrigin(undefined, allowed)).toBe(true);
    expect(isAllowedOrigin(null, allowed)).toBe(true);
  });
});