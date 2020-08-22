const path = require("path");
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./src/index.js",

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public")
    },

    devtool: "eval",
    devServer: {
        inline: true,
        hot: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", {"targets": { "node": "current", "ie": "11" }}], "@babel/preset-react"],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader?url=false"
                        },
                        {
                            loader: "postcss-loader",
                            options:{
                                plugins: [
                                    autoprefixer({
                                        overrideBrowserslist: ['ie >= 8', 'last 4 version']
                                    })
                                ]
                            }
                        }
                    ]
            })},
        ],
    },
    plugins: [
        new ExtractTextPlugin({filename: 'style.css'})
    ]
};