import { Publisher, OrderCancelledEvent, Subjects } from "@fuzzyrock/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
