const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader'); // vue加载器
const path = require('path')
module.exports = {
    entry: path.resolve(__dirname, '../src/main.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[contenthash].js',
        clean: true
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".vue"], //省略文件后缀
        alias: { //配置别名
          'vue$':'vue/dist/vue.runtime.esm.js',
          "@": path.resolve(__dirname, "../src"), // @相当于src
        }
    },
    // externals: {
    //     'vue': 'Vue',
    //     'vue-router':'VueRouter'
    // },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html', 
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].css",
          }),
        new VueLoaderPlugin()
      ],
    devtool: 'inline-source-map', // 工具 有助于追踪错误和警告在源代码中的原始位置

    module:{
        rules: [
        {
            test: /\.vue$/,
            use: 'vue-loader',
            include: [path.resolve(__dirname, '../src')]
        },   
        {
            test: /(\.jsx|\.js)$/,
            use: ["babel-loader"],
            exclude: /node_modules/,
        },
        {
            test: /\.(css|less)$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] //从右往左编译的
        },
        {
            test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/, //加载图片资源
            loader: "url-loader",
            type: 'javascript/auto',//解决asset重复
            options: {
              esModule: false, //解决html区域,vue模板引入图片路径问题
              limit: 1000,
              name: "static/img/[name].[hash:7].[ext]",
            },
        },
        {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,//加载视频资源
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "static/media/[name].[hash:7].[ext]",
            },
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, //加载字体资源
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "static/fonts/[name].[hash:7].[ext]",
            },
        }
        ],
      },
}