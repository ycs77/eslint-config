import type { TypedFlatConfigItem } from '../types'
import { GLOB_SRC } from '../globs'

export async function node(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      files: [GLOB_SRC],
      name: 'ycs77/node/rules',
      rules: {
        'node/prefer-global/buffer': ['error', 'always'],
        'node/prefer-global/process': ['error', 'always'],
      },
    },
  ]
}
