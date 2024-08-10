import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export async function imports(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'ycs77/imports/rules',
      rules: {
        'antfu/no-import-dist': 'off',
      },
    },
  ]
}
