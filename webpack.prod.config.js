const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  stats: 'minimal',
  entry: {
    main: './src/index.tsx'
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
        { loader: MiniCssExtractPlugin.loader, options: { sourceMap: true } },
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
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
}