import type { ConfigItem } from '@antfu/eslint-config'

export function node(): ConfigItem[] {
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
