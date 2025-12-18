import fs from 'node:fs/promises'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { astro } from '../src/configs/astro'
import { ycs77 } from '../src/factory'

const configs = await ycs77({
  astro: {
    astroExplicitWrapper: true,
  },
  imports: true,
  markdown: true,
  stylistic: true,
  test: true,
  typescript: true,
  vue: true,
})

const configsForRulesDTS = [
  ...(await astro({
    astroExplicitWrapper: true,
  })),
]

const configNames = configs
  .map(i => i.name)
  .filter(Boolean)
  .filter(i => i?.startsWith('ycs77/')) as string[]

let dts = await flatConfigsToRulesDTS(configsForRulesDTS, {
  includeAugmentation: false,
})

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`

await fs.writeFile('src/typegen.d.ts', dts)
