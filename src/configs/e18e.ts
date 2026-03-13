import type { TypedFlatConfigItem } from '../types'

export async function e18e(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'ycs77/e18e/rules',
      rules: {
        'e18e/prefer-static-regex': 'off',
      },
    },
  ]
}
