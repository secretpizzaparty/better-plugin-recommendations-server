const axios = require('axios');
const cache = require('memory-cache');


module.exports = (plugin, cb) => {
    const cache_key = 'p_data_' + plugin;
    const cache_expiry = 3600000; // 1h
    let plugin_data = cache.get(cache_key);
    if (plugin_data) {
        return cb(null, plugin_data);
    }

    axios.get('https://api.wordpress.org/plugins/info/1.0/' + plugin + '.json?fields=banners,icons,active_installs').then(res => {
        plugin_data = res.data;
        cache.put(cache_key, plugin_data, cache_expiry);
        return cb(null, plugin_data);
    });
};

