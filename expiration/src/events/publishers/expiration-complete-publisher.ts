import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@fuzzyrock/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
