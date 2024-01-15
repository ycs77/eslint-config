import type { FlatConfigItem } from '@antfu/eslint-config'

export async function imports(): Promise<FlatConfigItem[]> {
  return [
    {
      name: 'ycs77:imports',
      rules: {
        'antfu/no-import-dist': 'off',
      },
    },
  ]
}
