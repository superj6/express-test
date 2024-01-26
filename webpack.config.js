const path = require('path');

const clientReactPath = path.resolve(__dirname, 'client', 'react');
const entryFile = path.join(clientReactPath, 'src', 'index.js');
const outputDir = path.resolve(clientReactPath, 'dist');

module.exports = env => {
  return {
    entry: [entryFile],
    output: {
      path: outputDir,
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
	  exclude: /node_modules/,
	  use: [
	    {
              loader: 'babel-loader',
	      options: {
                cacheDirectory: true,
	      },
	    },
	  ],
	},
      ],
    },
  }
}
