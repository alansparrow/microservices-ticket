import { Publisher, Subjects, TicketCreatedEvent } from "@fuzzyrock/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}