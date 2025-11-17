import fs from 'node:fs/promises'
import { ycs77 } from '../src/factory'

const configs = await ycs77({
  astro: true,
  imports: true,
  markdown: true,
  stylistic: true,
  gitignore: true,
  typescript: true,
  vue: true,
  test: true,
})

const configNames = configs
  .map(i => i.name)
  .filter(Boolean)
  .filter(i => i?.startsWith('ycs77/')) as string[]

const dts = `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`

await fs.writeFile('src/typegen.d.ts', dts)
