const Hapi = require('hapi');
const JFile = require('jfile');
const async = require('async');
const axios = require('axios');

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
        const pluginsFile = new JFile( __dirname + '/plugins.txt' );
        const plugins = pluginsFile.lines;
        const numberOfPlugins = plugins.length;
        return async.map(
            plugins,
            (plugin, cb) => {
                axios.get( 'https://api.wordpress.org/plugins/info/1.0/' + plugin + '.json?fields=banners,icons,active_installs' ).then(res => {
                    cb(null, res.data);
                });
            },
            ( err, results ) => {
                return reply({
                    info: {
                        page: 1,
                        pages: 1,
                        results: numberOfPlugins,
                    },
                    plugins: results
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