module.exports = {
    presets: [
        [
            '@babel/preset-env' ,
            {
                useBuiltIns: false ,
                modules: false ,
                loose: true
            }
        ] ,
        '@babel/preset-react' ,

    ] ,
    plugins: [
        [
            'babel-plugin-styled-components' ,
            {
                displayName: true
            }
        ] ,
        [
            '@babel/plugin-proposal-decorators' ,
            {
                legacy: true
            }
        ] ,
        [
            '@babel/plugin-proposal-class-properties' ,
            {
                loose: true
            }
        ] ,
        [ '@babel/plugin-transform-runtime' , {} ] ,
    ] ,
    env: {
        development: {}
    }
};
