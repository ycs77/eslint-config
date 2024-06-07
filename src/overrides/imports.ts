import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export function imports(): TypedFlatConfigItem {
  return {
    rules: {
      'antfu/no-import-dist': 'off',
    },
  }
}
