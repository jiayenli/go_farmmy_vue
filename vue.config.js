module.exports = {
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080, 
    https: true,
    hotOnly: false,
  },
}