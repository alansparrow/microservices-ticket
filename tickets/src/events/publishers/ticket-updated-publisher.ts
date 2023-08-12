import { Publisher, Subjects, TicketUpdatedEvent } from "@fuzzyrock/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
