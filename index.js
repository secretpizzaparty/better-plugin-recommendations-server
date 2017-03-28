const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
        return reply('Sup?');
    }
});

server.route({
    method: 'GET',
    path:'/api/plugin-recommendations',
    handler: function (request, reply) {
        
        return reply('hello world');
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});