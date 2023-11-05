import { isPackageExists } from 'local-pkg'
import { type ConfigItem, type OptionsConfig, antfu } from '@antfu/eslint-config'
import { stylistic, typescript, vue } from './configs'

const VuePackages = [
  'vue',
  'nuxt',
  'vitepress',
  '@slidev/cli',
]

/**
 * Construct an array of ESLint flat config items.
 */
export function ycs77(options: OptionsConfig & ConfigItem = {}, ...userConfigs: (ConfigItem | ConfigItem[])[]) {
  const {
    componentExts = [],
    stylistic: enableStylistic = true,
    typescript: enableTypeScript = isPackageExists('typescript'),
    vue: enableVue = VuePackages.some(i => isPackageExists(i)),
  } = options

  const configs: ConfigItem[][] = []

  if (enableStylistic) {
    configs.push(stylistic())
  }

  if (enableVue) {
    componentExts.push('vue')

    configs.push(vue({
      stylistic: enableStylistic,
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
