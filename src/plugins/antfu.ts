/* eslint-disable import/no-named-default */
import { default as pluginAntfu } from 'eslint-plugin-antfu'

pluginAntfu.rules['consistent-list-newline'].meta!.schema = [{
  type: 'object',
  properties: {
    ArrayExpression: { type: 'boolean' },
    ArrowFunctionExpression: { type: 'boolean' },
    CallExpression: { type: 'boolean' },
    ExportNamedDeclaration: { type: 'boolean' },
    FunctionDeclaration: { type: 'boolean' },
    FunctionExpression: { type: 'boolean' },
    ImportDeclaration: { type: 'boolean' },
    NewExpression: { type: 'boolean' },
    ObjectExpression: { type: 'boolean' },
    TSInterfaceDeclaration: { type: 'boolean' },
    TSTupleType: { type: 'boolean' },
    TSTypeLiteral: { type: 'boolean' },
    TSTypeParameterDeclaration: { type: 'boolean' },
    TSTypeParameterInstantiation: { type: 'boolean' },
    ObjectPattern: { type: 'boolean' },
    ArrayPattern: { type: 'boolean' },
  },
  additionalProperties: false,
}]

export default pluginAntfu
