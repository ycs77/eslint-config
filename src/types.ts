import type {
  OptionsConfig as AntfuOptionsConfig,
  Rules as AntfuRules,
  TypedFlatConfigItem as AntfuTypedFlatConfigItem,
  OptionsOverrides,
} from '@antfu/eslint-config'
import type { ConfigNames, RuleOptions } from './typegen'

export type Rules = AntfuRules & RuleOptions

export type { ConfigNames }

/**
 * An updated version of ESLint's `Linter.Config`, which provides autocompletion
 * for `rules` and relaxes type limitations for `plugins` and `rules`, because
 * many plugins still lack proper type definitions.
 */
export interface TypedFlatConfigItem extends AntfuTypedFlatConfigItem {
  /**
   * An object containing the configured rules. When `files` or `ignores` are
   * specified, these rule configurations are only available to the matching files.
   */
  rules?: Rules
}

export interface OptionsAstro extends OptionsOverrides {
  astroExplicitWrapper?: boolean
}

export interface OptionsConfig extends AntfuOptionsConfig {
  /**
   * Enable Astro support.
   *
   * Requires installing:
   * - `eslint-plugin-astro`
   * - `eslint-plugin-astro-explicit-wrapper` (if `astroExplicitWrapper` is true)
   *
   * Requires installing for formatting .astro:
   * - `prettier-plugin-astro`
   *
   * @default false
   */
  astro?: boolean | OptionsAstro
}
