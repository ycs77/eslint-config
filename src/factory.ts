import type { ConfigNames as AntfuConfigNames, Awaitable, TypedFlatConfigItem } from '@antfu/eslint-config'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import type { ConfigNames } from './typegen'
import type { OptionsConfig } from './types'
import { antfu } from '@antfu/eslint-config'
import { isPackageExists } from 'local-pkg'
import {
  astro,
  imports,
  javascript,
  markdown,
  node,
  stylistic,
  test,
  typescript,
  vue,
} from './configs'

const VuePackages = [
  'vue',
  'nuxt',
  'vitepress',
  '@slidev/cli',
]

export function ycs77(
  options: OptionsConfig & Omit<TypedFlatConfigItem, 'files'> = {},
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
): FlatConfigComposer<TypedFlatConfigItem, AntfuConfigNames | ConfigNames> {
  const {
    astro: enableAstro = false,
    componentExts = [],
    imports: enableImports = true,
    stylistic: enableStylistic = true,
    typescript: enableTypeScript = isPackageExists('typescript'),
    vue: enableVue = VuePackages.some(i => isPackageExists(i)),
  } = options

  const astroOptions = typeof options.astro === 'boolean'
    ? {}
    : options.astro || {}

  let composer = antfu(options)

  composer = composer
    .append(javascript())
    .append(node())

  if (enableImports) {
    composer = composer.append(imports())
  }

  if (enableStylistic) {
    composer = composer.append(stylistic())
  }

  if (options.test ?? true) {
    composer = composer.append(test())
  }

  if (enableVue) {
    componentExts.push('vue')
  }

  if (enableTypeScript) {
    composer = composer.append(typescript({
      componentExts,
    }))
  }

  if (enableVue) {
    composer = composer.append(vue({
      stylistic: !!enableStylistic,
      typescript: !!enableTypeScript,
    }))
  }

  if (enableAstro) {
    composer = composer.append(astro({
      ...astroOptions,
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
