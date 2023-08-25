import { Publisher, OrderUpdatedEvent, Subjects } from "@fuzzyrock/common";

export class OrderUpdatedPublisher extends Publisher<OrderUpdatedEvent> {
  subject: Subjects.OrderUpdated = Subjects.OrderUpdated;
}
