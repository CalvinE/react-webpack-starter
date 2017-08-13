const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let isProd = () => {
    let env = process.env.NODE_ENV;
    if(env) {
        return env.toUpperCase() === "PROD";
    } 
    return false;
};

let htmlMinifyOptions = isProd() ? {
    // Add minify options here: https://github.com/kangax/html-minifier#options-quick-reference
    collapseWhitespace: true
} : false;

let htmlWebpackPlugin = new HtmlWebpackPlugin({
    // Add configuration options here: https://github.com/jantimon/html-webpack-plugin#configuration
    title: `${process.env.APPNAME}`,
    template: "./templates/index.ejs",
    minify: htmlMinifyOptions,
    hash: true
});

// let scssExtractTextPlugin = ;

var config = {
    context: path.resolve(__dirname, "src"),
    entry: {
        app: "./app.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            { // SASS loader
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.jsx?$/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        htmlWebpackPlugin,
        new ExtractTextPlugin({
            filename: 'css/[name].bundle.css',
            disable: !isProd(),
            allChunks: true
        })
    ]
}

module.exports = config;