const Hapi = require('hapi');
const JFile = require('jfile');
const async = require('async');
const filter = require('lodash').filter;
const fetchPluginData = require('./fetch-plugin-data');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
        return reply.redirect('https://github.com/secretpizzaparty/better-plugin-recommendations-server');
    }
});

server.route({
    method: 'GET',
    path:'/api/plugin-recommendations',
    handler: function (request, reply) {
        const pluginsFile = new JFile( __dirname + '/plugins.txt' );
        const pluginsToFetch = filter( pluginsFile.lines );
        return async.map(
            pluginsToFetch,
            fetchPluginData,
            ( err, results ) => {
                const plugins = filter(results);
                return reply({
                    info: {
                        page: 1,
                        pages: 1,
                        results: plugins.length,
                    },
                    plugins
                });
            }
        );
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});