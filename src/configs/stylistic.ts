import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export async function stylistic(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'ycs77/stylistic/rules',
      rules: {
        'antfu/consistent-list-newline': ['error', {
          ArrowFunctionExpression: false,
          CallExpression: false,
        }],
        'antfu/if-newline': 'off',

        'curly': 'off',

        'style/arrow-parens': ['error', 'as-needed'],
        'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'style/comma-dangle': ['error', {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'only-multiline',
          enums: 'always-multiline',
          generics: 'only-multiline',
          tuples: 'only-multiline',
        }],
        'style/indent-binary-ops': 'off',
        'style/member-delimiter-style': ['error', {
          multiline: { delimiter: 'none' },
          singleline: { delimiter: 'comma', requireLast: false },
        }],
        'style/multiline-ternary': ['off'],
        'style/operator-linebreak': ['error', 'after', {
          overrides: {
            '?': 'before',
            ':': 'before',
          },
        }],
        'style/quote-props': ['error', 'as-needed'],
      },
    },
  ]
}
