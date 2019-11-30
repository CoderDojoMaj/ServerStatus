const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  stats: 'minimal',
  entry: {
    main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.tsx']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      // Compiles TS and TSX files
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

      // Adds the compiled JS and CSS to the HTML file
      { test: /\.html$/, loader: 'html-loader', options: { minimize: true } },

      // Compiles SASS into CSS
      { test: /\.s?(c|a)ss$/, use: [
        { loader: 'style-loader', options: {} },
        { loader: 'css-loader', options: { sourceMap: true } },
        { loader: 'sass-loader', options: { sourceMap: true } }
      ] },

      // Moves images to 'dist' dir
      { test: /\.(png|svg|jpg|gif)$/, loader: 'file-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      filename: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
