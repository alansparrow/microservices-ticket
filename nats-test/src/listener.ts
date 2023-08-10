import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const client = nats.connect("ticket", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

client.on("connect", () => {
  console.log("Listener connected to NATS");

  client.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  const options = client
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable() // Get all the events that have been emitted in the past.
    .setDurableName("accounting-service"); // Keep track of all events have gone to this sub for handling offline
  const sub = client.subscribe(
    "ticket:created",
    "queue-group-name", // Not dump durable name even if all of our services restart
    options
  );

  sub.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack();
  });
});

process.on("SIGINT", () => client.close());
process.on("SIGTERM", () => client.close());
