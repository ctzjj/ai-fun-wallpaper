const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const {
    SERVER_PORT,
} = process.env;

module.exports = {
    outputDir: path.resolve(__dirname, "./dist"),
    publicPath: './',
    configureWebpack: {
        entry: path.join(__dirname, "./src/view/app.js"),
        target: "web",
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "./dist"),
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: '爱换壁纸',
                inject: true,
                hash: true,
                template: path.join(__dirname, './src/view/index.html'),
            }),
            new CopyWebpackPlugin([
                {
                    from: path.join(__dirname, './src/icons/favicon.ico'),
                    to: path.join(__dirname, './dist'),
                }
            ])
        ],
        devServer: {
            port: SERVER_PORT
        }
    }
};