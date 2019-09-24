module.exports = {
    entry:"./assert/js/main.js",
    output:{
        path:__dirname,
        filename:'./assert/js/bundle.js'
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ],
    },
};