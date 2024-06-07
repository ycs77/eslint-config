import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export function node(): TypedFlatConfigItem {
  return {
    rules: {
      'node/prefer-global/buffer': ['error', 'always'],
      'node/prefer-global/process': ['error', 'always'],
    },
  }
}
