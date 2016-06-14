const path = require('path');

module.exports = {
    entry: './assets/app/index.js',
    output: {
        path: './assets/js/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            include: __dirname
        }]
    }
};
