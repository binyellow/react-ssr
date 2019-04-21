const { ReactLoadablePlugin } = require('react-loadable/webpack');

module.exports = {
	module: {
		rules: [{
			test: /\.js?$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			options: {
        cacheDirectory: true,
        plugins: ['transform-decorators-legacy' ],
				// presets: ['react', 'stage-0', ['env', {
				// 	targets: {
				// 		browsers: ['last 2 versions']
				// 	}
        // }]]
        presets: ["react", ["env", {
          "targets": {
            "node": "current"
          }
        }], "stage-0"],
			}
		}]
	},
  plugins: [
    new ReactLoadablePlugin({
      filename: './build/react-loadable.json',
    }),
  ]
}