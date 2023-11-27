import type { FlatConfigItem } from '@antfu/eslint-config'

export async function node(): Promise<FlatConfigItem[]> {
  return [
    {
      name: 'ycs77:node',
      rules: {
        'node/prefer-global/buffer': ['error', 'always'],
        'node/prefer-global/process': ['error', 'always'],
      },
    },
  ]
}
