import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export async function perfectionist(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'ycs77/perfectionist/rules',
      rules: {
        'perfectionist/sort-exports': 'off',
        'perfectionist/sort-imports': 'off',
        'perfectionist/sort-named-exports': 'off',
        'perfectionist/sort-named-imports': 'off',
      },
    },
  ]
}
