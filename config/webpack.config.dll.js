const webpack = require('webpack');
const path = require("path");
const { join } = require("./webpack.config.base");

const vendors = [
  'react',
  'react-dom',
];

module.exports = {
  mode:"production",
  entry:  {
    vendor: vendors,
  },
  output: {
    path: join("dist"),
    filename: '[name].dll.js',
    library: '_dll_[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      context: path.resolve(__dirname, '../'),
      path: join("dist/manifest.json"),
      name: '_dll_[name]',
    })
  ]
};
