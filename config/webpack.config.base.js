/*
* 抽离公共的webpack配置--不区分环境
* loader:[babel-loader, style-loader, css-loader, postcss-loader, sass-loader, url-loader, html-loader]
* plugins: [html-webpack-plugin, mini-css-extract-plugin, webpack-bundle-analyzer, happypack]
* */
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV ==="production" ? true : false;


const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HappyPack = require('happypack');
const os = require('os');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }); 
const join = dir => path.join(__dirname, "..", dir);

const getCssLoader = ()=> ({
  loader: "css-loader",
  options: {
    alias: {
      "~sprite.png": join("src/assets/spritesmith/sprite.png")
    },
    modules: true,
    localIdentName: "[name]-[local]-[hash:base64:5]"
  }
});
const getUrlLoader = () => ({
  loader: "url-loader",
  options: {
    limit: 8 * 1024,
    name: "[path][name].[ext]",
    context: join("src")
  }
});
const getHtmlConfig = (name, title) => ({
  template: join(`src/${name}.html`),
  filename: `${name}.html`,
  title,
  inject:true,
  hash: false,
  minify: {
    collapseWhitespace: true,
    removeComments: true,
    useShortDoctype: true
  }
});

const baseConfig = {
  context: path.resolve(__dirname, '../'),
  entry: "./src/index.js",
  output: {
    path: join("dist"),
    filename: "js/index.js"
  },
  resolve: {
    modules: [
      join("src/"),
      join("node_modules"),
      join("src/assets/spritesmith")
    ],
    extensions: [".js", ".jsx", ".json"]
  },
  module: {
    rules:[
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        exclude:/node_modules/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          getCssLoader(),
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        exclude:/src/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: getUrlLoader()
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(getHtmlConfig('index','keylenn-cli')),
    new MiniCssExtractPlugin({
      filename: isProd ?  'css/[name].[contenthash].css' : 'css/[name].css',
      chunkFileName: isProd ? 'css/[id].[contenthash].css' :'css/[id].css'
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '..', 'dist', 'manifest.json')
    }),
    new HappyPack({
      id: 'happyBabel',  //处理哪类文件
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true',
      }],
      threadPool: happyThreadPool, //共享进程池
      verbose: true, //允许输出日志
    })
  ]
}

module.exports = {
  baseConfig,
  join
};
