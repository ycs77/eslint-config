import type { FlatConfigItem, OptionsStylistic } from '@antfu/eslint-config'
import { GLOB_YAML_IN_MARKDOWN } from '../globs'

export async function markdown(
  options: OptionsStylistic = {},
): Promise<FlatConfigItem[]> {
  const {
    stylistic = true,
  } = options

  return [
    {
      name: 'ycs77:markdown:yaml',
      files: [GLOB_YAML_IN_MARKDOWN],
      rules: {
        ...stylistic
          ? {
              'yaml/indent': 'off',
            }
          : {},
      },
    },
  ]
}
