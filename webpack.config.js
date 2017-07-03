const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

let isProd = () => {
    let env = process.env.NODE_ENV;
    if(env) {
        return env.toUpper() === "PROD";
    } 
    return false;
};

let htmlMinifyOptions = isProd() ? {
    //TODO: Add minify options here: https://github.com/kangax/html-minifier#options-quick-reference
    collapseWhitespace: true
} : false;

let htmlWebpackPlugin = new HtmlWebpackPlugin({
    title: `${process.env.APPNAME}`,
    template: "./templates/index.ejs",
    minify: htmlMinifyOptions,
    hash: true
});

var config = {
    context: path.resolve(__dirname, "src"),
    entry: {
        index: "./index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "./js/[name].bundle.js",
        publicPath: "/"
    },
    plugins: [
        htmlWebpackPlugin
    ]
}

module.exports = config;