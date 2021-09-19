const withPinpointConfig = require('./pinpoint.next.js');

/**
 * @type {import('next').NextConfig}
 */
module.exports = withPinpointConfig({
	reactStrictMode: true,
	poweredByHeader: false,
	images: {
		disableStaticImages: true,
	},
});
