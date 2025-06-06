import ycs77, { GLOB_TS } from './dist/index.js'

export default ycs77({
  vue: {
    a11y: true,
  },
  astro: true,
  typescript: true,
  formatters: true,
  ignores: [
    'fixtures',
    '_fixtures',
    '**/constants-generated.ts',
  ],
})
  .append({
    files: [GLOB_TS],
    rules: {
      'style/quote-props': ['error', 'consistent-as-needed'],
    },
  })
