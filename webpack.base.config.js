const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

const webpackBaseConfig = {
    target: 'web',
    entry: {
        app: [path.join(__dirname, './src/index.tsx')]
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'index.js',
    },

    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                // {
                                //     corejs: {
                                //         version: 3
                                //     },
                                //     useBuiltIns: 'usage',
                                //     targets: {
                                //         ie: '9'
                                //     }
                                // }
                            ],
                            '@babel/preset-react',
                        ]
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer')({
                                        overrideBrowserslist: [
                                            ">0.2%",
                                            "not dead",
                                            "not op_mini all"
                                        ]
                                    })
                                ]
                            }
                        }

                    },
                    'less-loader',
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer')({
                                        overrideBrowserslist: [
                                            ">0.2%",
                                            "not dead",
                                            "not op_mini all"
                                        ]
                                    })
                                ]
                            }
                        }

                    },
                ]
            },
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true, //??????????????????
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/,
                type: 'asset'
            },
        ]
    },
    // plugins: [
    //     new MonacoWebpackPlugin({
    //         languages: ['json','javascript']
    //     })
    // ],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".css", '.less', ".json"]
    }
}

module.exports = webpackBaseConfig;