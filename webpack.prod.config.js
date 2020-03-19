const webpack = require('webpack'),
    merge = require('webpack-merge'),
    baseWebpackConfig = require('./webpack.base.config');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(baseWebpackConfig, {
    mode:'production',
    devtool: 'none',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            '__DEV__': false
        }),
        new UglifyJsPlugin({
            extractComments: false,// 移除注释
            uglifyOptions: {
                mangle: { // 排除不想要压缩的对象名称
                    reserved: ['$', 'exports', 'require', 'module']
                }
            }
        }),
        new optimizeCss({
            assetNameRegExp: /\.(less|css)$/g,
            cssProcessorOptions: {
                safe: true,
                discardComments: {
                    removeAll: true // 移除注释
                }
            },
            canPrint: true
        })
    ]
})

console.log("initializing webpack production build....");
