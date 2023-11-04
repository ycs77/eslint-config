import type { ConfigItem } from '@antfu/eslint-config'

export function stylistic(): ConfigItem[] {
  return [
    {
      name: 'ycs77:stylistic',
      rules: {
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
        }],
        'style/member-delimiter-style': ['error', {
          multiline: { delimiter: 'none' },
          singleline: { delimiter: 'comma', requireLast: false },
        }],
        'style/multiline-ternary': ['off'],
        'style/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
      },
    },
  ]
}
