import type { OptionsFiles, OptionsHasTypeScript, OptionsStylistic } from '@antfu/eslint-config'
import type { TypedFlatConfigItem } from '../types'
import { GLOB_VUE } from '../globs'
// Reference: https://github.com/vuejs/eslint-plugin-vue/blob/d33df42f99a0d2d04421ca9618817a6f5d56ff55/lib/utils/inline-non-void-elements.json
import INLINE_ELEMENTS from '../utils/vue-inline-elements.json' with { type: 'json' }

export async function vue(
  options: OptionsHasTypeScript & OptionsStylistic & OptionsFiles = {}
): Promise<TypedFlatConfigItem[]> {
  const {
    stylistic = true,
    typescript = false,
    files = [GLOB_VUE],
  } = options

  return [
    {
      files,
      name: 'ycs77/vue/rules',
      rules: {
        'vue/v-bind-style': [
          'warn',
          'shorthand',
          { sameNameShorthand: 'always' },
        ],
        'vue/block-order': [
          'error',
          {
            order: ['template', 'script', 'style'],
          },
        ],
        'vue/html-self-closing': [
          'error',
          {
            html: {
              void: 'never',
              normal: 'always',
              component: 'always',
            },
            svg: 'any',
            math: 'any',
          },
        ],
        'vue/no-template-shadow': 'off',
        'vue/singleline-html-element-content-newline': [
          'error',
          {
            ignores: [
              'pre',
              'textarea',
              'template',
              ...INLINE_ELEMENTS,
            ],
          },
        ],

        ...stylistic
          ? {
              'vue/brace-style': [
                'error',
                '1tbs',
                { allowSingleLine: true },
              ],
              'vue/comma-dangle': [
                'error',
                {
                  arrays: 'always-multiline',
                  objects: 'always-multiline',
                  imports: 'always-multiline',
                  exports: 'always-multiline',
                  functions: 'only-multiline',
                },
              ],
              'vue/multiline-ternary': ['off'],
              'vue/operator-linebreak': [
                'error',
                'after',
                {
                  overrides: {
                    '?': 'before',
                    ':': 'before',
                  },
                },
              ],
              'vue/quote-props': ['error', 'as-needed'],
            }
          : {},

        ...typescript
          ? {
              'ts/consistent-type-imports': 'off',
            }
          : {},
      },
    },
  ]
}
