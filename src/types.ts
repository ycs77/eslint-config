import type { OptionsConfig as AntfuOptionsConfig, OptionsOverrides } from '@antfu/eslint-config'

export type { ConfigNames } from './typegen'

export interface OptionsAstro extends OptionsOverrides {
  astroExplicitWrapper?: boolean
}

export interface OptionsConfig extends AntfuOptionsConfig {
  /**
   * Enable ASTRO support.
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
