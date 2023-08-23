import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { natsWrapper } from "../../nats-wrapper";
import { Ticket } from "../../models/ticket";

it("returns a 404 if the provided id does not exits", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const res = await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "12qwe",
      price: 20,
    });

  expect(res.status).toEqual(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const res = await request(app).put(`/api/tickets/${id}`).send({
    title: "12qwe",
    price: 20,
  });

  expect(res.status).toEqual(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const res1 = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "weqwe",
      price: 21,
    });

  const res2 = await request(app)
    .put(`/api/tickets/${res1.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "zzzz",
      price: 33,
    });

  expect(res2.status).toEqual(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signin();
  const res1 = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "weqwe",
      price: 21,
    });

  const res2 = await request(app)
    .put(`/api/tickets/${res1.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 11,
    });
  const res3 = await request(app)
    .put(`/api/tickets/${res1.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "qwezx",
      price: -10,
    });

  expect(res2.status).toEqual(400);
  expect(res3.status).toEqual(400);
});

it("updates the ticket provided valid inputs", async () => {
  const title = "new title";
  const price = 100;
  const cookie = global.signin();
  const res1 = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "weqwe",
      price: 21,
    });

  const res2 = await request(app)
    .put(`/api/tickets/${res1.body.id}`)
    .set("Cookie", cookie)
    .send({
      title,
      price,
    });

  expect(res2.status).toEqual(200);
  const ticketRes = await request(app)
    .get(`/api/tickets/${res2.body.id}`)
    .send();
  expect(ticketRes.body.title).toEqual(title);
  expect(ticketRes.body.price).toEqual(price);
});

it("publishes an event", async () => {
  const title = "new title";
  const price = 100;
  const cookie = global.signin();
  const res1 = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "weqwe",
      price: 21,
    });

  const res2 = await request(app)
    .put(`/api/tickets/${res1.body.id}`)
    .set("Cookie", cookie)
    .send({
      title,
      price,
    });

  expect(res2.status).toEqual(200);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("rejects updates if the ticket is reserved", async () => {
  const title = "new title";
  const price = 100;
  const cookie = global.signin();
  const res1 = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "weqwe",
      price: 21,
    });
  const ticket = await Ticket.findById(res1.body.id);
  ticket!.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
  await ticket!.save();

  const res2 = await request(app)
    .put(`/api/tickets/${res1.body.id}`)
    .set("Cookie", cookie)
    .send({
      title,
      price,
    });

  expect(res2.status).toEqual(400);
});
