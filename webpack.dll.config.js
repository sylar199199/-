/**
 * Created by Lidy on 2016/11/1.
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vendor: [
            'jquery',
            "jsencrypt"
        ]
    },
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: '[name].dll.js',
        /**
         * output.library
         * 将会定义为 window.${output.library}
         * 在这次的例子中，将会定义为`window.vendor_library`
         */
        library: '[name]_library'
    },
    resolve: {
        alias: {
            'jquery': 'jquery/dist/jquery.min.js',
            "jsencrypt":"jsencrypt/bin/jsencrypt.min.js"
        },
        //modules: ['D:\\node_modules',"/home/node/node_modules"]
    },
    resolveLoader: {
        //modules: ['D:\\node_modules',"/home/node/node_modules"]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            JSEncrypt:"jsencrypt",
            'window.JSEncrypt': 'jsencrypt',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.DllPlugin({
            /**
             * path
             * 定义 manifest 文件生成的位置
             * [name]的部分由entry的名字替换
             */
            path: path.join(__dirname, 'dist/js', '[name]-manifest.json'),
            /**
             * name
             * dll bundle 输出到那个全局变量上
             * 和 output.library 一样即可。
             */
            name: '[name]_library',
            context: __dirname,
        })
    ]
};
