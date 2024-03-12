import { isPackageExists } from 'local-pkg'
import { antfu } from '@antfu/eslint-config'
import type { Awaitable, FlatConfigItem, OptionsConfig, UserConfigItem } from '@antfu/eslint-config'
import { imports, markdown, node, stylistic, typescript, vue } from './configs'

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
  ...userConfigs: Awaitable<UserConfigItem | UserConfigItem[]>[]
): Promise<UserConfigItem[]> {
  const {
    componentExts = [],
    stylistic: enableStylistic = true,
    typescript: enableTypeScript = isPackageExists('typescript'),
    vue: enableVue = VuePackages.some(i => isPackageExists(i)),
  } = options

  const configs: Awaitable<FlatConfigItem[]>[] = []

  configs.push(
    imports(),
    node(),
  )

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

  if (options.markdown ?? true) {
    configs.push(markdown({
      stylistic: enableStylistic,
    }))
  }

  return antfu(options, ...configs, ...userConfigs)
}
