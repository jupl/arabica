const {HotModuleReplacementPlugin, NoEmitOnErrorsPlugin} = require('webpack')

// Modules requires for hot reloading in development
const hotModules = [
  'eventsource-polyfill',
  'webpack-hot-middleware/client',
]

/**
 * Add HMR settings to Webpack configuration
 * @param {Object} config Configuration to modify
 * @return {void}
 */
module.exports = config => {
  // Add plugins for hot module code
  config.plugins = [
    ...config.plugins,
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin(),
  ]

  // Add hot module code to entries
  config.entry = Object.keys(config.entry)
    .filter(key => Array.isArray(config.entry[key]))
    .reduce((previous, key) => Object.assign(previous, {
      [key]: [...hotModules, ...config.entry[key]],
    }), {})
}
