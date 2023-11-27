import type { FlatConfigItem, OptionsComponentExts, OptionsFiles, OptionsStylistic } from '@antfu/eslint-config'
import { GLOB_SRC } from '@antfu/eslint-config'

export async function typescript(
  options: OptionsComponentExts & OptionsStylistic & OptionsFiles = {}
): Promise<FlatConfigItem[]> {
  const {
    componentExts = [],
    stylistic = true,
  } = options

  const files = options.files ?? [
    GLOB_SRC,
    ...componentExts.map(ext => `**/*.${ext}`),
  ]

  return [
    {
      files,
      name: 'ycs77:typescript',
      rules: {
        ...stylistic
          ? {
              'style/comma-dangle': 'off',
              'ts/comma-dangle': ['error', {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'only-multiline',
                enums: 'always-multiline',
                generics: 'only-multiline',
                tuples: 'only-multiline',
              }],
            }
          : {},
      },
    },
  ]
}
