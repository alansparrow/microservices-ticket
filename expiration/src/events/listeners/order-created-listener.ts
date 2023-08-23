import { Listener, OrderCreatedEvent } from "@fuzzyrock/common";
import { Subjects } from "@fuzzyrock/common/build/events/subjects";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    throw new Error("Method not implemented.");
  }
}
