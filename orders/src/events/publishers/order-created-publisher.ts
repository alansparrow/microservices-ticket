import { Publisher, OrderCreatedEvent, Subjects } from "@fuzzyrock/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}