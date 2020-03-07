const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename:'[name].bundle.js'
    },
    module: {
        rules: [
            {
                test:/\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test:/\.css$/,
                loader:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve:{
        extensions:['.js','.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        })
    ]
}