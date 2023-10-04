module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
    ],
    'overrides': [
        {
            'env': {
                'node': true,
            },
            'files': [
                '.eslintrc.{js,cjs}',
            ],
            'parserOptions': {
                'sourceType': 'script',
            },
        },
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
    },
    'plugins': [
        '@typescript-eslint',
        'react',
        'react-hooks',
    ],
    'rules': {
        'indent': [
            'error',
            4,
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'always',
        ],
        'comma-dangle': [
            'error',
            {
                'arrays': 'always-multiline',
                'objects': 'always-multiline',
                'imports': 'always-multiline',
                'exports': 'always-multiline',
                'functions': 'ignore',
            },
        ],
        'object-curly-spacing': [
            'warn',
            'always',
            {
                'objectsInObjects': true,
                'arraysInObjects': true,
            },
        ],
        'array-bracket-spacing': [
            'warn',
            'always',
        ],
        'jsx-quotes': [
            'error',
            'prefer-double',
        ],
        'react/jsx-curly-spacing': [
            'error',
            {
                'when': 'never',
                'children': true,
            },
        ],
        'react/jsx-curly-brace-presence': [
            'error',
            {
                'props': 'never',
                'children': 'ignore',
                'propElementValues': 'always',
            },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
};
