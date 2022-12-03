module.exports = {
  images: {
    domains: ['imgix.cosmicjs.com',
      'cdn.cosmicjs.com'
    ],
  },
  async rewrites() {
    return [
      {
        source: '/docs/epubs/:path*',
        destination: 'https://cdn.cosmicjs.com/:path*' // Proxy to Backend
      }
    ]
  }
}
