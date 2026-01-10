import type { OptionsFiles, OptionsStylistic } from '@antfu/eslint-config'
import type { RuleOptions } from '@stylistic/eslint-plugin'
import type { OptionsAstro, TypedFlatConfigItem } from '../types'
import { GLOB_ASTRO, interopDefault, StylisticConfigDefaults } from '@antfu/eslint-config'
import { isPackageExists } from 'local-pkg'
import { GLOB_ASTRO_JS, GLOB_ASTRO_TS } from '../globs'

export async function astro(
  options: OptionsAstro & OptionsFiles & OptionsStylistic = {}
): Promise<TypedFlatConfigItem[]> {
  const {
    files = [GLOB_ASTRO],
    astroExplicitWrapper: enableAstroExplicitWrapper = isPackageExists('eslint-plugin-astro-explicit-wrapper'),
    overrides = {},
  } = options

  const stylisticConfig = {
    ...StylisticConfigDefaults,
    ...(typeof options.stylistic === 'object' ? options.stylistic : {}),
  }

  const [
    astroExplicitWrapperPlugin,
    tsESLintParser,
  ] = await Promise.all([
    enableAstroExplicitWrapper
      ? interopDefault(import('eslint-plugin-astro-explicit-wrapper'))
      : null,
    interopDefault(import('@typescript-eslint/parser')),
  ])

  const [
    indentLevel = 2,
    indentOptions = {
      ArrayExpression: 1,
      CallExpression: { arguments: 1 },
      flatTernaryExpressions: false,
      FunctionDeclaration: { body: 1, parameters: 1, returnType: 1 },
      FunctionExpression: { body: 1, parameters: 1, returnType: 1 },
      ignoreComments: false,
      ignoredNodes: [
        'TSUnionType',
        'TSIntersectionType',
      ],
      ImportDeclaration: 1,
      MemberExpression: 1,
      ObjectExpression: 1,
      offsetTernaryExpressions: true,
      outerIIFEBody: 1,
      SwitchCase: 1,
      tabLength: indentLevel === 'tab' ? 4 : indentLevel,
      VariableDeclarator: 1,
    } satisfies RuleOptions['@stylistic/indent'][1],
  ] = Array.isArray(stylisticConfig.indent) ? stylisticConfig.indent : [stylisticConfig.indent]

  return [
    {
      name: 'ycs77/astro/setup',
      plugins: {
        ...enableAstroExplicitWrapper
          ? { 'astro-explicit-wrapper': astroExplicitWrapperPlugin }
          : {},
      },
    },
    {
      name: 'ycs77/astro/rules',
      files,
      languageOptions: {
        globals: {
          astroHTML: 'readonly',
        },
      },
      rules: {
        ...options.stylistic
          ? {
              'astro/semi': ['error', 'never'],

              ...enableAstroExplicitWrapper
                ? { 'astro-explicit-wrapper/explicit-wrapper': 'error' }
                : {},

              // 'style/indent' rule is copied from eslint-stylistic
              // because it disabled by @antfu/eslint-config for .astro files
              'style/indent': ['error', indentLevel, indentOptions],
              'style/semi': 'off',
              'style/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
            }
          : {},

        ...overrides,
      },
    },
    {
      // Define the configuration for `<script>` tag.
      // Script in `<script>` is assigned a virtual file name with the `.js` extension.
      name: 'ycs77/astro/js/rules',
      files: [GLOB_ASTRO_JS],
      languageOptions: {
        sourceType: 'module',
      },
      rules: {
        'prettier/prettier': 'off',

        ...options.stylistic
          ? {
              'style/indent': 'off',
            }
          : {},
      },
    },
    {
      // Define the configuration for `<script>` tag when using `client-side-ts` processor.
      // Script in `<script>` is assigned a virtual file name with the `.ts` extension.
      name: 'ycs77/astro/ts/rules',
      files: [GLOB_ASTRO_TS],
      languageOptions: {
        parser: tsESLintParser ?? undefined,
        sourceType: 'module',
        parserOptions: {
          project: null,
        },
      },
      rules: {
        'prettier/prettier': 'off',

        ...options.stylistic
          ? {
              'style/indent': 'off',
            }
          : {},
      },
    },
  ]
}
