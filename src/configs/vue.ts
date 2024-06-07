import type { OptionsFiles, OptionsHasTypeScript, OptionsStylistic, TypedFlatConfigItem } from '@antfu/eslint-config'
import INLINE_ELEMENTS from 'eslint-plugin-vue/lib/utils/inline-non-void-elements.json'
import { GLOB_VUE } from '../globs'

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
        'vue/no-template-shadow': 'off',

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
