import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export async function astro(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'ycs77/astro/rules',
      languageOptions: {
        globals: {
          astroHTML: false,
        },
      },
    },
  ]
}
