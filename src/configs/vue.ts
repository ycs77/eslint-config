import { type FlatConfigItem, GLOB_VUE, type OptionsHasTypeScript, type OptionsStylistic } from '@antfu/eslint-config'
import INLINE_ELEMENTS from 'eslint-plugin-vue/lib/utils/inline-non-void-elements.json'

export async function vue(
  options: OptionsHasTypeScript & OptionsStylistic = {}
): Promise<FlatConfigItem[]> {
  const {
    stylistic = true,
    typescript = false,
  } = options

  return [
    {
      files: [GLOB_VUE],
      name: 'ycs77:vue',
      rules: {
        'vue/block-order': ['error', {
          order: ['template', 'script', 'style'],
        }],
        'vue/html-self-closing': ['error', {
          html: {
            void: 'never',
            normal: 'always',
            component: 'always',
          },
          svg: 'any',
          math: 'any',
        }],

        ...stylistic
          ? {
              'vue/comma-dangle': ['error', {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'only-multiline',
              }],
              'vue/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
              'vue/singleline-html-element-content-newline': ['error', {
                ignores: ['pre', 'textarea', 'template', ...INLINE_ELEMENTS],
              }],
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
