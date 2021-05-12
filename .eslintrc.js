module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    parser: 'babel-eslint',
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
    settings: {
        react: {
            version: '17',
        },
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            modules: true,
            experimentalObjectRestSpread: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'import/no-named-as-default': 0,
        'react/prop-types': 0,
        'no-unused-vars': 0,
        'no-undef': 0,
    },
};
