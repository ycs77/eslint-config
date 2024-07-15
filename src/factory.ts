import { isPackageExists } from 'local-pkg'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import { antfu } from '@antfu/eslint-config'
import type { ConfigNames as AntfuConfigNames, Awaitable, OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config'
import { markdown, stylistic, typescript, vue } from './configs'
import { imports, node } from './overrides'
import type { ConfigNames } from './typegen'

const VuePackages = [
  'vue',
  'nuxt',
  'vitepress',
  '@slidev/cli',
]

export function ycs77(
  options: OptionsConfig & TypedFlatConfigItem = {},
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.FlatConfig[]>[]
): FlatConfigComposer<TypedFlatConfigItem, AntfuConfigNames | ConfigNames> {
  const {
    componentExts = [],
    stylistic: enableStylistic = true,
    typescript: enableTypeScript = isPackageExists('typescript'),
    vue: enableVue = VuePackages.some(i => isPackageExists(i)),
  } = options

  let composer = antfu(options)

  composer = composer
    .override('antfu/imports/rules', imports())
    .override('antfu/node/rules', node())

  if (enableStylistic) {
    composer = composer.append(stylistic())
  }

  if (enableVue) {
    componentExts.push('vue')

    composer = composer.append(vue({
      stylistic: !!enableStylistic,
      typescript: !!enableTypeScript,
    }))
  }

  if (enableTypeScript) {
    composer = composer.append(typescript({
      componentExts,
      stylistic: enableStylistic,
    }))
  }

  if (options.markdown ?? true) {
    composer = composer.append(markdown({
      stylistic: enableStylistic,
    }))
  }

  composer = composer.append(...userConfigs as any)

  return composer
}
