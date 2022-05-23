// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withPWA = require('next-pwa')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  env: {
    API_URL: process.env.API_URL
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.API_URL + ':path*'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/signin/google',
        destination: process.env.API_URL + 'auth/signin/google',
        permanent: true,
      },
      {
        source: '/signin/github',
        destination: process.env.API_URL + 'auth/signin/github',
        permanent: true,
      }
    ]
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
    swcMinify: true,
    reactStrictMode: false,
    compiler: {
      styledComponents: true,
    },


  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  },
};

module.exports = withNx(withPWA(nextConfig));
