import nats from 'node-nats-streaming';

console.clear();

const client = nats.connect('ticket', 'abc', {
    url: 'http://localhost:4222'
});

client.on('connect', () => {
    console.log('Publisher connected to NATS');

    const data = JSON.stringify({
        id: '12312',
        title: 'concert',
        price: 22
    });

    client.publish('ticket:created', data, () => {
        console.log('Event published');
    });

});