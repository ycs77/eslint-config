import type { OptionsFiles, OptionsStylistic, TypedFlatConfigItem } from '@antfu/eslint-config'
import type { OptionsAstro } from '../types'
import { GLOB_ASTRO, StylisticConfigDefaults } from '@antfu/eslint-config'
import { isPackageExists } from 'local-pkg'
import { GLOB_JS_IN_ASTRO, GLOB_TS_IN_ASTRO } from '../globs'

export async function astro(
  options: OptionsAstro & OptionsFiles & OptionsStylistic = {}
): Promise<TypedFlatConfigItem[]> {
  const {
    files = [GLOB_ASTRO],
    astroExplicitWrapper: enableAstroExplicitWrapper = isPackageExists('eslint-plugin-astro-explicit-wrapper'),
    overrides = {},
  } = options

  const stylistic = options.stylistic === false
    ? false
    : {
        ...StylisticConfigDefaults,
        ...(typeof options.stylistic === 'object' ? options.stylistic : {}),
      }

  const [
    astroExplicitWrapperPlugin,
    tsESLintParser,
  ] = await Promise.all([
    enableAstroExplicitWrapper
      ? import('eslint-plugin-astro-explicit-wrapper').then(m => m.default || m)
      : null,
    import('@typescript-eslint/parser').then(m => m.default || m),
  ])

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
        ...stylistic
          ? {
              'astro/semi': ['error', 'never'],

              ...enableAstroExplicitWrapper
                ? { 'astro-explicit-wrapper/explicit-wrapper': 'error' }
                : {},

              // 'style/indent' rule is copied from eslint-stylistic
              'style/indent': ['error', stylistic.indent, {
                ArrayExpression: 1,
                CallExpression: { arguments: 1 },
                flatTernaryExpressions: false,
                FunctionDeclaration: { body: 1, parameters: 1 },
                FunctionExpression: { body: 1, parameters: 1 },
                ignoreComments: false,
                ignoredNodes: [
                  'TSUnionType',
                  'TSIntersectionType',
                  'TSTypeParameterInstantiation',
                  'FunctionExpression > .params[decorators.length > 0]',
                  'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
                ],
                ImportDeclaration: 1,
                MemberExpression: 1,
                ObjectExpression: 1,
                offsetTernaryExpressions: true,
                outerIIFEBody: 1,
                SwitchCase: 1,
                tabLength: stylistic.indent === 'tab' ? 4 : stylistic.indent,
                VariableDeclarator: 1,
              }],
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
      files: [GLOB_JS_IN_ASTRO],
      languageOptions: {
        sourceType: 'module',
      },
      rules: {
        'prettier/prettier': 'off',

        ...stylistic
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
      files: [GLOB_TS_IN_ASTRO],
      languageOptions: {
        parser: tsESLintParser ?? undefined,
        sourceType: 'module',
        parserOptions: {
          project: null,
        },
      },
      rules: {
        'prettier/prettier': 'off',

        ...stylistic
          ? {
              'style/indent': 'off',
            }
          : {},
      },
    },
  ]
}
