import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

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
    const res1 = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10
        });
    const res2 = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            price: 10
        })

    expect(res1.status).toEqual(400);
    expect(res2.status).toEqual(400);
});

it('returns an err if an invalid price is provided', async () => {
    const res1 = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'asdqwe',
            price: -10
        });
    const res2 = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'asdqwe'
        })

    expect(res1.status).toEqual(400);
    expect(res2.status).toEqual(400);
});

it('creates a ticket with valid inputs', async () => {
    let title = 'TestTitle';
    let price = 20;
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const res = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ title, price });

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual(title);
    expect(tickets[0].price).toEqual(price);
    expect(res.status).toEqual(201);
});