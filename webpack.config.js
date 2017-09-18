const webpack = require('webpack');
const path = require('path');

const sourcePath = path.join(__dirname, './src');
const staticsPath = path.join(__dirname, './static');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var apiHost, workspace, geoServerURL, initialMapCoordinates, highlightLayer;

var setupAPI = function () {
    // eventually this could be different for `process.env.NODE_ENV`, but for now it will be the same
    // those double quotes look weird, but they are replaced as is, so they need to be quoted.
    workspace = "'plataforma'";
    apiHost = "'/geoserver/plataforma/wms'";
    if(process.env.NODE_ENV === 'mprj'){
        geoServerURL = 'http://p-mapas02:8080/geoserver';
    } else {
        geoServerURL = 'http://apps.mprj.mp.br/geoserver';
    }
}
setupAPI();

module.exports = function (env) {
    const nodeEnv = env && env.prod ? 'production' : 'development';
    const isProd = nodeEnv === 'production';

    const plugins = [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.bundle.js'
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: nodeEnv,
        }),
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin('./styles.css'),
        new webpack.DefinePlugin({
            __API__: apiHost,
            __WORKSPACE__: workspace,
            __INITIAL_MAP_COORDINATES__: {
                lat: -22.25,
                lng: -42.5,
                zoom: 8,
            }
        }),
    ];

    var sassUse;

    if (isProd) {
        plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                },
                output: {
                    comments: false,
                },
            })
        );

        sassUse = ExtractTextPlugin.extract({
            fallback: 'style-loader', // The backup style loader
            use: 'css-loader!sass-loader'
        });
    } else {
        plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );

        sassUse = [
            'style-loader',
            'css-loader',
            'sass-loader'
        ];
    }

    return {
        devtool: isProd ? 'source-map' : 'eval',
        context: sourcePath,
        entry: {
            js: 'components/App/App.js',
            vendor: ['react']
        },
        output: {
            path: staticsPath,
            filename: '[name].bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    loader: 'style-loader/url!file-loader'
                },
                {
                    test: /\.html$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'file-loader',
                        query: {
                            name: '[name].[ext]'
                        },
                    },
                },
                {
                    test: /\.(scss)$/,
                    use: sassUse
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader'
                    ],
                },
                {
                    test: /\.png$/,
                    loader: 'url-loader',
                    query: { mimetype: 'image/png' }
                },
                {
                    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url-loader?limit=10000&mimetype=application/font-woff"
                },
                {
                    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url-loader?limit=10000&mimetype=application/font-woff"
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url-loader?limit=10000&mimetype=application/octet-stream"
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "file-loader"
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url-loader?limit=10000&mimetype=image/svg+xml"
                }
            ],
        },
        resolve: {
            extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
            modules: [
                path.resolve(__dirname, 'node_modules'),
                sourcePath
            ]
        },

        plugins,

        performance: isProd && {
            maxAssetSize: 100,
            maxEntrypointSize: 300,
            hints: 'warning',
        },

        stats: {
            colors: {
                green: '\u001b[32m',
            }
        },

        devServer: {
            contentBase: './public',
            historyApiFallback: true,
            port: 3000,
            compress: isProd,
            inline: !isProd,
            hot: !isProd,
            proxy: {
                '/geoserver/*': {
                    target: geoServerURL,
                    changeOrigin: true,
                    pathRewrite: {
                        '^/geoserver': ''
                    }
                }
            },
            stats: {
                assets: true,
                children: false,
                chunks: false,
                hash: false,
                modules: false,
                publicPath: false,
                timings: true,
                version: false,
                warnings: true,
                colors: {
                    green: '\u001b[32m',
                }
            }
        }
    };
};
