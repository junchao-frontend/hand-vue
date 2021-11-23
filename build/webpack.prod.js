const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CssMinimizerWPlugin = require('css-minimizer-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; 
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = merge(common, {
  mode: "production",
  plugins: [
    new CompressionPlugin()
    //   new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        // options: {
        //   esModule: false, //在开发环境中启用false
        // },
      },
    ],
  },
  optimization:{
    minimizer:[
        new CssMinimizerWPlugin()
    ]
    }
})