import request from 'supertest';
import { app } from '../../app';

it('has a route handler listing to /api/tickets for post requests', async () => {
    const res = await request(app)
        .post('/api/tickets')
        .send({});

    expect(res.status).not.toEqual(404);
});

it('can only access if the user is signed in', async () => {
    const res = await request(app)
        .post('/api/tickets')
        .send({});

    expect(res.status).toEqual(401);
});

it('returns status other than 401 if the user is signed in', async () => {
    const res = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({});
        
    expect(res.status).not.toEqual(401);
});

it('returns an err if an invalid title is provided', async () => {

});

it('returns an err if an invalid price is provided', async () => {

});

it('creates a ticket with valid inputs', async () => {

});