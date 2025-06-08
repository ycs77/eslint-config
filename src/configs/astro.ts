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

  return [
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
              'style/jsx-closing-tag-location': 'error',
              'style/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
            }
          : {},
      },
    },
  ]
}
