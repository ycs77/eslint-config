import type { OptionsComponentExts, OptionsFiles, TypedFlatConfigItem } from '@antfu/eslint-config'
import { GLOB_TS, GLOB_TSX } from '../globs'

export async function typescript(
  options: OptionsComponentExts & OptionsFiles = {}
): Promise<TypedFlatConfigItem[]> {
  const {
    componentExts = [],
  } = options

  const files = options.files ?? [
    GLOB_TS,
    GLOB_TSX,
    ...componentExts.map(ext => `**/*.${ext}`),
  ]

  return [
    {
      files,
      name: 'ycs77/typescript/rules',
      rules: {
        'ts/ban-ts-comment': 'off',
      },
    },
  ]
}
