/**
* Veer Redirect Microservice
*
* @license All Rights Reserved
*
* @author Steven Velozo <steven@paviasystems.com>
* @module Headlight Router Microservice
*/

// Allow a massive number of simultaneous HTTP connections
require('http').globalAgent.maxSockets = 10000;

// Spool up a web server
var libOrator = require('orator').new(
	{
		Product: 'Veer',
		ProductVersion: require(__dirname+'/package.json').version,

		ConfigFile: __dirname+'/Veer-Config.json',

		APIServerPort: 8080,

		TargetServer: 'https://YOURHOSTHERE.COM'
	});

// Redirect everything to the TargetServer plus the URL
libOrator.webServer.get
(
	/\/.*/,
	function (pRequest, pResponse, fNext)
	{
		pResponse.header('Location', libOrator.settings.TargetServer+pRequest.url);
		return pResponse.send(302);
	}
);

// Start the web server
libOrator.startWebServer();
