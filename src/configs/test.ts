import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import { GLOB_TESTS } from '@antfu/eslint-config'

export async function test(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      files: GLOB_TESTS,
      name: 'ycs77/test/rules',
      rules: {
        'test/consistent-test-it': 'off',
        'test/prefer-lowercase-title': 'off',
      },
    },
  ]
}
