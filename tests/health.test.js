const request = require('supertest');
const app = require('../app'); // import the express app (not index.js)

describe('Health endpoint', () => {
  it('GET /api/health -> 200 { status: "ok" }', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});