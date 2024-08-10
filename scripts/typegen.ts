import fs from 'node:fs/promises'
import { combine } from '@antfu/eslint-config'
import { imports, javascript, markdown, node, stylistic, typescript, vue } from '../src'

const configs = await combine(
  imports(),
  javascript(),
  markdown(),
  node(),
  stylistic(),
  typescript(),
  vue(),
)

const configNames = configs.map(i => i.name).filter(Boolean) as string[]

const dts = `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`

await fs.writeFile('src/typegen.d.ts', dts)
