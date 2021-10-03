const fs = require('fs');
const path = require('path');
const { apihost, siteId } = require('./pinpoint.config.js');
const homeurl = (apihost || '').includes('.edge.') ? `https://home.edge.pinpoint.com` : `https://home.pinpoint.com`;

const apiRules = [
	{ source: '/site-api/v1/site', destination: `https://${apihost}/site/v1/${siteId}` },
	{ source: '/site-api/v1/site/:slug*', destination: `https://${apihost}/site/v1/${siteId}/:slug*` },
	{ source: '/site-api/v1/content', destination: `https://${apihost}/content/v1/${siteId}` },
	{ source: '/site-api/v1/content/:slug*', destination: `https://${apihost}/content/v1/${siteId}/:slug*` },
	{ source: '/subscription/subscribe', destination: `${homeurl}/subscription/subscribe/${siteId}` },
	{ source: '/api/event', destination: `https://${apihost}/analytics/track` },
	{ source: '/rss', destination: `https://${apihost}/rss/${siteId}` },
	{ source: '/a.js', destination: `https://cdn.pinpoint.com/beacon/index.min.js` },
];

const apiRewrites = {
	beforeFiles: apiRules,
	afterFiles: [],
	fallback: [],
};

const cacheableRoutes = ['/', '/search', '/entry/(.*)', '/entries/(.*)'];

const securityHeaders = [
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on',
	},
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=63072000; includeSubDomains; preload',
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block',
	},
	{
		key: 'X-Frame-Options',
		value: 'SAMEORIGIN',
	},
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
];

async function pinpointHeaders() {
	if (process.env.NODE_ENV !== 'production') {
		return [];
	}
	return [
		// Apply these headers to all routes in your application.
		...[{ source: '/(.*)', headers: securityHeaders }],
		...cacheableRoutes.map((source) => ({
			source,
			headers: [
				// this header is used by the pinpoint proxy to increase cachability of content at the edge proxies w/o messing with the client or intermediate caches
				{
					key: 'x-proxy-cache-control',
					value: 's-maxage=432000', // 5 days in seconds
				},
			],
		})),
	];
}

const createHeaderWrapper = (headers) => {
	return async () => {
		// invoke the original headers (if any)
		const _headers = headers ? await headers() : [];
		const _ourheaders = await pinpointHeaders();
		// merge in our headers + your headers
		return [..._ourheaders, ..._headers];
	};
};

const createRewriteWrapper = (rewrites) => {
	return async () => {
		// invoke the original rewrite (if any)
		const _rewrites = rewrites ? await rewrites() : {};
		// merge in our rewrites + your rewrites
		let _a = _rewrites;
		if (Array.isArray(_rewrites)) {
			_a = { beforeFiles: _rewrites, afterFiles: [], fallback: [] };
		}
		let _b = { ...apiRewrites };
		const dest = {
			fallback: [...(_b.fallback || []), ...(_a.fallback || [])],
			beforeFiles: [...(_b.beforeFiles || []), ...(_a.beforeFiles || [])],
			afterFiles: [...(_b.afterFiles || []), ...(_a.afterFiles || [])],
		};
		return dest;
	};
};

/**
 * @type {import('next').NextConfig}
 */
const withPinpointConfig = (config) => {
	const _config = { ...config };
	_config.headers = createHeaderWrapper(_config.headers);
	_config.rewrites = createRewriteWrapper(_config.rewrites);
	// load up build-time config
	if (fs.existsSync(path.join(__dirname, 'pinpoint.config.json'))) {
		const buildConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'pinpoint.config.json')).toString());
		return { ..._config, ...buildConfig };
	}
	return _config;
};

module.exports = withPinpointConfig;
