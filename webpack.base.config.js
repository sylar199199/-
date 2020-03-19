var path = require("path");
process.traceDeprecation = true;
DIST_PATH = path.join(__dirname, './dist/');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
    entry: {
        index:"./js/index.js",
        game:"./js/game.js",
        global:[
            './css/index.css',
            './css/platform-search.css'
        ]
    },
    output: {
        path: DIST_PATH,
        publicPath: '/dist/',
        filename: "js/[name].js"
    },
    resolve: {
        alias: {
            'jquery': 'jquery/dist/jquery.min.js'
        },
        extensions: [".less", ".css", ".js", ".json"],
        //modules: ["D:\\node_modules", "/home/node/node_modules","spritesmith-generated"]
    },
    resolveLoader: {
        //modules: ["D:\\node_modules", "/home/node/node_modules"]
    },
    optimization: {
        minimize: false,
        runtimeChunk: false,
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "common",
                    chunks: "initial",
                    minChunks: 5
                }
            }
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            //在这里引入 manifest 文件
            manifest: require('./dist/js/vendor-manifest.json'),
            //sourceType:'var'
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional

            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),
        // 雪碧图设置
        // new SpritesmithPlugin({
        //     src: {
        //         cwd: path.resolve(__dirname, 'src/assets/icons/land'), // 图标根路径
        //         glob: '**/*.png' // 匹配任意 png 图标
        //     },
        //     target: {
        //         image: path.resolve(__dirname, 'src/assets/sprite/land.png'), // 生成雪碧图目标路径与名称
        //         // 设置生成CSS背景及其定位的文件或方式
        //         css: [
        //             [path.resolve(__dirname, 'src/style/css/sprite/land.css'), {
        //                 format: 'function_based_template'
        //             }]
        //         ]
        //     },
        //     spritesmithOptions: {
        //         padding: 4,
        //     },
        //     customTemplates: {
        //         'function_based_template':function (data) {
        //             console.log(data);
        //             let dpr=2*100;
        //             const shared = '.wn-icon { background-image: url(I);background-size: BS;display: inline-block;vertical-align: middle;}'
        //                 .replace('I', data.sprites[0].image)
        //                 .replace('BS', data.spritesheet.width/dpr+"rem")
        //             // 注意：此处默认图标使用的是二倍图
        //             const perSprite = data.sprites.map(function (sprite) {
        //                 // background-size: SWpx SHpx;
        //                 return '.wn-icon-N {width: Wrem; height: Hrem; background-position: Xrem Yrem;}'
        //                     .replace(/N/g, sprite.name)
        //                     .replace(/W/g, sprite.width / dpr)
        //                     .replace(/H/g, sprite.height / dpr)
        //                     .replace(/X/g, sprite.offset_x/dpr)
        //                     .replace(/Y/g, sprite.offset_y/dpr);
        //             }).join('\n');
        //             return shared + '\n' + perSprite;
        //         }
        //     },
        //     apiOptions: {
        //         cssImageRef: "/src/assets/sprite/land.png", // css文件中引用雪碧图的相对位置路径配置
        //     },
        // })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './',
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                            url:false,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true }
                    },
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './',
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true,
                            url:false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'images/[name].[ext]'
                    }
                }]
            },
            // 对图标单独设置，以便生成雪碧图
            {
                test: /\.png$/,
                use: ['file-loader?name=i/[hash].[ext]']
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'font/[name].[ext]'
                    }
                }]
            }
        ]
    }
}
