import { isPackageExists } from 'local-pkg'
import { type ConfigItem, type OptionsConfig, antfu } from '@antfu/eslint-config'
import { stylistic, vue } from './configs'

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
    stylistic: enableStylistic = true,
    vue: enableVue = VuePackages.some(i => isPackageExists(i)),
  } = options

  const configs: ConfigItem[][] = []

  if (enableStylistic) {
    configs.push(stylistic())
  }

  if (enableVue) {
    configs.push(vue({
      stylistic: enableStylistic,
    }))
  }

  return antfu(options, ...configs, ...userConfigs)
}
