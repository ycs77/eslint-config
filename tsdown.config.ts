import { defineConfig } from 'tsdown'
import { StaleGuardRecorder } from 'tsdown-stale-guard'

export default defineConfig({
  entry: ['src/index.ts'],
  exports: true,
  plugins: [
    StaleGuardRecorder(),
  ],
})
