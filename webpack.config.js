const path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    extractCSS = new ExtractTextPlugin('build/style/[name].[contenthash:20].css'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    WebpackAssetsManifest = require('webpack-assets-manifest');
const plugins = [
    extractCSS,
    // To prevent longterm cache of vendor chunks
    // extract a 'manifest' chunk, then include it to the app
    new webpack.optimize.CommonsChunkPlugin({
        names: ['lib', 'manifest']
    }),
    //automatically load the modules
    //when the key is identified in a file
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }),
    // create manifest json to refer assets in php file
    new WebpackAssetsManifest({
        output: 'build/webpack-manifest.json',
        publicPath: '/',
        writeToDisk: true //php needs this to read file from disk
    }),
    new CleanWebpackPlugin(path.resolve(__dirname + '/build'))
];
module.exports = {
    entry: path.resolve(__dirname + '/js/index.js'),
    output: {
        path: path.resolve(__dirname + '/'),
        publicPath: '/',
        filename: 'build/js/[name].[chunkhash].js',
        chunkFilename: 'build/js/[chunkhash].js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                loader: extractCSS.extract({
                    fallbackLoader: 'style-loader',
                    loader: `css-loader?sourceMap!postcss-loader!less-loader?sourceMap`
                        //minimize css in build to avoid bundling newline chars in js chunk
                })
            }
        ]
    },
    plugins: plugins,
    watchOptions: {
        ignored: /(node_modules)/
    }
}