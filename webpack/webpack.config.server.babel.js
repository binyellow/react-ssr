import { server } from 'universal-webpack/config'
import settings from './universal-webpack-settings'
import configuration from './webpack.config'

// Create server-side Webpack config.
export default server(configuration, settings)