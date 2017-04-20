# Better Plugin Recommendations Server

Welcome!

This repository contains the very simple node server (powered by hapi.js) that returns results for the Better Plugin Recommendations WordPress plugin.

Feel free to fork this repository to power your own server.

## Instructions

* You'll need node 6+ (7.6+ ideal) to run this
* You should probably have `yarn` installed, but you can get away with just `npm`
* Install with `yarn` (or `npm install` if you prefer the old school route)
* Start the server with `yarn start` (or `npm start` I guess)
* To update the plugin list, just add/remove slugs in `plugins.txt`
* Deploy with [`now`](https://zeit.co/now) super easily if you'd like
* Install the accompanying [WordPress Plugin](https://github.com/secretpizzaparty/better-plugin-recommendations) and add the following to your `wp-config.php` file: `define( 'SPP_BPR_API_HOST', 'yourhost.com' );` -- change the domain to the host where you're serving the API from.
* ...
* Profit 💵