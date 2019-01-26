module.exports = {
    extends: ['eslint:recommended', 'airbnb-base', 'prettier'],
    env: {
        node: true,
        es6: true,
        jest: true,
        jasmine: true,
    },
    plugins: ['import', 'prettier'],
    rules: {
        'prettier/prettier': 'warn',
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['@root', './src']],
                extensions: ['.js', '.jsx', '.json'],
            },
        },
    },
};
