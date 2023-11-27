import { type FlatConfigItem, GLOB_SRC, type OptionsComponentExts, type OptionsStylistic } from '@antfu/eslint-config'

export async function typescript(
  options: OptionsComponentExts & OptionsStylistic = {}
): Promise<FlatConfigItem[]> {
  const {
    componentExts = [],
    stylistic = true,
  } = options

  return [
    {
      files: [
        GLOB_SRC,
        ...componentExts.map(ext => `**/*.${ext}`),
      ],
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
