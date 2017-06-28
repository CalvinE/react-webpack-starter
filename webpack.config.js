const path = require("path");
var config = {
    context: path.resolve(__dirname, "app"),
    entry: {
        index: "./app.js"
    }
}

module exports = config;