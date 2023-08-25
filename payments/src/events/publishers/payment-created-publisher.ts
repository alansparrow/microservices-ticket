import { PaymentCreatedEvent, Publisher, Subjects } from "@fuzzyrock/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
