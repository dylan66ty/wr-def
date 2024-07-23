import { defineConfig } from 'rollup'
import terser from '@rollup/plugin-terser'


const isBuild = process.env.npm_lifecycle_event === 'build'

export default defineConfig([
  {
    input: './src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'esm',
    },
    plugins: [isBuild && terser({maxWorkers: 4})]
  }
])