import rootConfig from '../../eslint.confih.mjs'

export default [
  ...rootConfig,
  {
    ignores: ['node_modules/**', 'dist/**', '.wrangler/**'],
  },
]
