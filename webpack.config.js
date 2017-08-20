const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

let isProd = () => {
    let env = process.env.NODE_ENV;
    if(env) {
        return env.toUpperCase() === "PROD";
    } 
    return false;
};

let shouldGenerateSourceMaps = () => {
    return true; // Why not always generate them?
    // if(process.env.OVERRIDE_SOURCE_MAP === "true"){
    //     return true;
    // } else if (!isProd() === true) {
    //     return true;
    // } else {
    //     return false;
    // }
};

console.log(`isProd = ${isProd()}`);
console.log(`shouldGenerateSourceMaps = ${shouldGenerateSourceMaps()}`);

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

let extractSass = new ExtractTextPlugin({
    filename: "css/[name].[contenthash].css",
    disable: !isProd(),
    allChunks: true
});

// let scssExtractTextPlugin = ;

var config = {
    devtool: isProd() ? 'source-map' : 'inline-source-map',
    context: path.resolve(__dirname, "src"),
    entry: {
        app: "./app.jsx"
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
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: [
                        { 
                            loader: 'css-loader', 
                            options: {
                                sourceMap: shouldGenerateSourceMaps()
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: shouldGenerateSourceMaps(),
                                plugins: () => {
                                    return [
                                        autoprefixer({
                                            // Options go here...
                                        })
                                    ];
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: shouldGenerateSourceMaps(),
                                outputStyle: 'compressed'
                            }
                        }
                    ]
                })
            },
            {
                test: /\.tsx$/,
                use: [

                ]
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        htmlWebpackPlugin,
        extractSass,
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })//,
        // new webpack.LoaderOptionsPlugin({
        //     options: {
        //         postcss: [
        //             autoprefixer()
        //         ]
        //     }
        // })
    ]
}

module.exports = config;