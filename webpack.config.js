const path = require('path')
module.exports = {
  mode: 'development',
  entry: './test/index.js',
  output: {
    filename: 'out.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10
            }
          },
          {
            loader: path.resolve(__dirname, './libs/index.js'),
            options: {
              path: path.resolve(__dirname, './test'),
              whiteList: ['logo.png']
            }
          }
        ],
      },
    ],
  }
}