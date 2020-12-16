module.exports = {
    plugins: [
        require('postcss-preset-env')(),
        require('precss')(),
        process.env.NODE_ENV === 'production' && require('cssnano')()
    ].filter(Boolean)
};
