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
        'no-use-before-define': 0,
        'import/prefer-default-export': 0,
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: ['**/*.test.js', '__mongo_test__/*.js'] },
        ],
        'no-underscore-dangle': ['error', { allow: ['_id'] }],
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
