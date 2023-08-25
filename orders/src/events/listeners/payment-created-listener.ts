import {
  Listener,
  OrderStatus,
  PaymentCreatedEvent,
  Subjects,
} from "@fuzzyrock/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";
import { OrderUpdatedPublisher } from "../publishers/order-updated-publisher";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({
      status: OrderStatus.Complete,
    });
    await order.save();

    await new OrderUpdatedPublisher(this.client).publish({
      id: order.id,
      status: order.status,
      version: order.version,
    });

    msg.ack();
  }
}
