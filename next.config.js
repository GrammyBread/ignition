module.exports = {
  images: {
    domains: ['imgix.cosmicjs.com',
      'cdn.cosmicjs.com'
    ],
  },
  async rewrites() {
    return [
      {
        source: '/docs/:path*',
        destination: 'http://localhost:3000/:path*' // Proxy to Backend
      }
    ]
  }
}
