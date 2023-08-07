import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const res = await request(app)
        .get(`/api/tickets/${id}`)
        .send();

    expect(res.status).toEqual(404);
});

it('returns the ticket if the ticket is found', async () => {
    const title = 'concert';
    const price = 20;
    const res1 = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title, price
        });
    expect(res1.status).toEqual(201);

    const res2 = await request(app)
        .get(`/api/tickets/${res1.body.id}`)
        .send();

    expect(res2.status).toEqual(200);
    expect(res2.body.title).toEqual(title);
    expect(res2.body.price).toEqual(price);
});