const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
    mode: 'production',
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({}),new TerserPlugin()],
    },
})