import request from 'supertest';
import { app } from '../src/index';

describe('Items API', () => {
  it('starts with an empty list', async () => {
    const response = await request(app).get('/items');

    expect(response.status).toBe(200);
    expect(response.text).toContain('<h1>Here are the items</h1>');
    expect(response.text).toContain('<p>No Items Added</p>');
  });

  it('creates a new item', async () => {
    const response = await request(app)
      .post('/items')
      .send({ name: 'Test item' })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ id: expect.any(Number), name: 'Test item' });
  });
});

