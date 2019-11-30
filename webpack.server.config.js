const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = (env, argv) => {
  const SERVER_PATH = (argv.mode === 'production') 
    ? './src/server/_prod.ts'
    : './src/server/_dev.ts'

  return ({
    stats: 'minimal',
    entry: {
      server: SERVER_PATH,
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js'
    },
    mode: argv.mode,
    target: 'node',
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    node: {
      __dirname: false,   // if you don't put this is, __dirname
      __filename: false,  // and __filename return blank or /
    },
    externals: [ nodeExternals() ], // Need this to avoid error when working with Express
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      ]
    }
  })
}
