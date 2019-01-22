/*
* 开发环境webpack配置
* loader:[]
* plugins: [webpack.HotModuleReplacementPlugin]
* */

const  { baseConfig, join } = require("./webpack.config.base");
const merge = require("webpack-merge");
const webpack = require("webpack");

const devCofig = merge(baseConfig, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: join("dist"),
    port: 8003,
    compress: true,
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});

module.exports = devCofig;