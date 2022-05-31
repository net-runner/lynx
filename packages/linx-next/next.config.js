// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withPWA = require('next-pwa')

const env = process.env.NODE_ENV
const isProdction = env === "production";
const API_URL = isProdction ? process.env.API_URL : "http://localhost:80/"
const FRONTEND_URL = isProdction ? process.env.FRONTEND_URL : "http://localhost:4200/"


/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  env: {
    API_URL,
    FRONTEND_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: API_URL + ':path*'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/signin/google',
        destination: API_URL + 'auth/signin/google',
        permanent: true,
      },
      {
        source: '/signin/github',
        destination: API_URL + 'auth/signin/github',
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
    disable: !isProdction
  },
};

module.exports = withNx(withPWA(nextConfig));
