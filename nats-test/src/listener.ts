import nats, { Message } from 'node-nats-streaming';

console.clear();

const client = nats.connect('ticket', '123', {
    url: 'http://localhost:4222'
});

client.on('connect', () => {
    console.log('Listener connected to NATS');

    const sub = client.subscribe('ticket:created');

    sub.on('message', (msg: Message) => {
        console.log('Message received');
    });
});