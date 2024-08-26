// @ts-check
import ycs77, { GLOB_TS } from './dist/index.js'

export default ycs77({
  typescript: true,
  vue: true,
  formatters: true,
  ignores: [
    'fixtures',
    '_fixtures',
  ],
})
  .append({
    files: [GLOB_TS],
    rules: {
      'style/quote-props': ['error', 'consistent-as-needed'],
    },
  })
