const request = require('supertest');
// index.js is two levels up from tests/integration, so require('../../index')
const app = require('../../index');

describe('Integration — Health endpoint', () => {
  it('GET /__health should return 200 and { ok: true }', async () => {
    const res = await request(app).get('/__health').expect(200);
    expect(res.body).toEqual({ ok: true });
  });
});
