import { Listener, OrderUpdatedEvent, Subjects } from "@fuzzyrock/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";

export class OrderUpdatedListener extends Listener<OrderUpdatedEvent> {
  subject: Subjects.OrderUpdated = Subjects.OrderUpdated;

  queueGroupName = queueGroupName;

  async onMessage(data: OrderUpdatedEvent["data"], msg: Message) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({ status: data.status });
    await order.save();

    msg.ack();
  }
}
