import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order } from "../../models/order";
import { Ticket } from "../../models/ticket";
import { OrderStatus } from "@fuzzyrock/common";
import { natsWrapper } from "../../nats-wrapper";

it("returns an err if the ticket does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId();

  const res = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId });

  expect(res.status).toEqual(404);
});

it("returns an err if the ticket is already reserved", async () => {
  const ticket = Ticket.build({
    title: "concert1",
    price: 20,
  });
  await ticket.save();
  const order = Order.build({
    ticket,
    userId: "zxqwe",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();

  const res = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id });

  expect(res.status).toEqual(400);
});

it("reserves a ticket", async () => {
  const ticket = Ticket.build({
    title: "concert1",
    price: 20,
  });
  await ticket.save();

  const res = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id });

  expect(res.status).toEqual(201);
});

it("emits an order created event", async () => {
  const ticket = Ticket.build({
    title: "concert1",
    price: 20,
  });
  await ticket.save();
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
