const pluginTester = require('babel-plugin-tester').default

const plugin = require('babel-plugin-macros')

pluginTester({
  plugin,
  babelOptions: { filename: __filename },
  tests: [
    {
      title: 'can import macros for free version',
      snapshot: true,
      code: `
        const { far, fas, fal, fab } = require('./fixtures/fontawesome5.macro.js')
      `
    },
    {
      title: 'can use string template syntax',
      snapshot: true,
      code: `
        const { far } = require('./fixtures/fontawesome5.macro.js')
        far\`smile\`
      `
    },
    {
      title: 'can use twice',
      snapshot: true,
      code: `
        const { far } = require('./fixtures/fontawesome5.macro.js')
        far\`smile\`
        far\`smile\`
      `
    },
    {
      title: 'can use function syntax',
      snapshot: true,
      code: `
        const { far } = require('./fixtures/fontawesome5.macro.js')
        far('smile')
      `
    },
    {
      title: 'can mix both syntaxes',
      snapshot: true,
      code: `
        const { far } = require('./fixtures/fontawesome5.macro.js')
        far('smile')
        far\`smile\`
      `
    }
  ]
})
