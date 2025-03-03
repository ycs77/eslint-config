import ycs77, { GLOB_TS } from './dist/index.js'

export default ycs77({
  vue: true,
  typescript: true,
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
