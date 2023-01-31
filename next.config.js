module.exports = {
  images: {
    domains: ['imgix.cosmicjs.com',
      'cdn.cosmicjs.com',
      'i.creativecommons.org'
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
