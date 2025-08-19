import type { OptionsStylistic, TypedFlatConfigItem } from '@antfu/eslint-config'
import { GLOB_ASTRO, StylisticConfigDefaults } from '@antfu/eslint-config'

export async function astro(
  options: OptionsStylistic = {}
): Promise<TypedFlatConfigItem[]> {
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
    import('eslint-plugin-astro-explicit-wrapper').then(m => m.default || m),
    import('@typescript-eslint/parser').then(m => m.default || m),
  ])

  return [
    {
      name: 'ycs77/astro/setup',
      plugins: {
        'astro-explicit-wrapper': astroExplicitWrapperPlugin,
      },
    },
    {
      name: 'ycs77/astro/rules',
      files: [GLOB_ASTRO],
      languageOptions: {
        globals: {
          astroHTML: 'readonly',
        },
      },
      rules: {
        ...stylistic
          ? {
              'astro/semi': ['error', 'never'],
              'astro-explicit-wrapper/explicit-wrapper': 'error',
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
      },
    },
    {
      // Define the configuration for `<script>` tag.
      // Script in `<script>` is assigned a virtual file name with the `.js` extension.
      name: 'ycs77/astro/js/rules',
      files: ['**/*.astro/*.js'],
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
      files: ['**/*.astro/*.ts'],
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
