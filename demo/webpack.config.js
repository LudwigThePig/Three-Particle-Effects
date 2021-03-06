const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
};
