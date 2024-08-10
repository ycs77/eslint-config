import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export async function node(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'ycs77/node/rules',
      rules: {
        'node/prefer-global/buffer': ['error', 'always'],
        'node/prefer-global/process': ['error', 'always'],
      },
    },
  ]
}
