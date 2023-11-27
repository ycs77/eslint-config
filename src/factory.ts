import { isPackageExists } from 'local-pkg'
import { antfu } from '@antfu/eslint-config'
import type { Awaitable, FlatConfigItem, OptionsConfig } from '@antfu/eslint-config'
import { node, stylistic, typescript, vue } from './configs'

const VuePackages = [
  'vue',
  'nuxt',
  'vitepress',
  '@slidev/cli',
]

/**
 * Construct an array of ESLint flat config items.
 */
export function ycs77(
  options: OptionsConfig & FlatConfigItem = {},
  ...userConfigs: Awaitable<FlatConfigItem | FlatConfigItem[]>[]
) {
  const {
    componentExts = [],
    stylistic: enableStylistic = true,
    typescript: enableTypeScript = isPackageExists('typescript'),
    vue: enableVue = VuePackages.some(i => isPackageExists(i)),
  } = options

  const configs: Awaitable<FlatConfigItem[]>[] = []

  configs.push(node())

  if (enableStylistic) {
    configs.push(stylistic())
  }

  if (enableVue) {
    componentExts.push('vue')

    configs.push(vue({
      stylistic: enableStylistic,
      typescript: !!enableTypeScript,
    }))
  }

  if (enableTypeScript) {
    configs.push(typescript({
      componentExts,
      stylistic: enableStylistic,
    }))
  }

  return antfu(options, ...configs, ...userConfigs)
}
