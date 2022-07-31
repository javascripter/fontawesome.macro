const { createMacro } = require('babel-plugin-macros')

const { addNamed } = require('@babel/helper-module-imports')

module.exports = createMacro(fontAwesomeMacro, {
  configName: 'fontawesome.macro'
})

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1)
}

function camelCase(str) {
  return str
    .toLowerCase()
    .split('-')
    .map(
      (s, index) =>
        (index === 0 ? s[0].toLowerCase() : s[0].toUpperCase()) + s.slice(1)
    )
    .join('');
}

function replaceWithImportedIcon(
  { references, state, babel, source },
  { prefix, importFrom }
) {
  const { types: t } = babel

  references.forEach(path => {
    const { parentPath } = path

    if (parentPath.type === 'TaggedTemplateExpression') {
      const quasi = parentPath.node.quasi
      if (quasi.type === 'TemplateLiteral') {
        if (quasi.expressions.length > 0 || quasi.quasis.length > 1) {
          throw parentPath.buildCodeFrameError(
            'Dynamic expressions are not supported.'
          )
        }
        if (quasi.quasis[0].type === 'TemplateElement') {
          process(quasi.quasis[0].value.cooked, path)
        }
      }
    } else if (
      parentPath.type === 'CallExpression' &&
      parentPath.node.callee === path.node
    ) {
      if (
        parentPath.node.arguments.length !== 1 ||
        parentPath.node.arguments[0].type !== 'StringLiteral'
      ) {
        throw parentPath.buildCodeFrameError(
          'Invalid number or type of arguments.'
        )
      }
      process(parentPath.node.arguments[0].value, path)
    }
  })

  function process(iconName, path) {
    const name = `fa${capitalize(camelCase(iconName))}`
    const alias = `${prefix}${capitalize(camelCase(iconName))}`
    const importName = addNamed(path, name, importFrom, {
      nameHint: alias
    })
    path.parentPath.replaceWith(importName)
  }
}

function fontAwesomeMacro({ references, state, babel, source, config }) {
  const { far = [], fas = [], fal = [], fab = [], fad = [] } = references

  const { type = 'free' } = config

  if (!['free', 'pro'].includes(type)) {
    throw new Error(
      "fontawesome.macro config type must be either 'free' or 'pro"
    )
  }

  replaceWithImportedIcon(
    {
      references: fal,
      state,
      babel,
      source
    },
    {
      prefix: 'fal',
      importFrom: `@fortawesome/${type}-light-svg-icons`
    }
  )
  replaceWithImportedIcon(
    {
      references: fas,
      state,
      babel,
      source
    },
    {
      prefix: 'fas',
      importFrom: `@fortawesome/${type}-solid-svg-icons`
    }
  )
  replaceWithImportedIcon(
    {
      references: far,
      state,
      babel,
      source
    },
    {
      prefix: 'far',
      importFrom: `@fortawesome/${type}-regular-svg-icons`
    }
  )
  replaceWithImportedIcon(
    {
      references: fab,
      state,
      babel,
      source
    },
    {
      prefix: 'fab',
      importFrom: '@fortawesome/free-brands-svg-icons'
    }
  )
  if (type === 'pro') {
    replaceWithImportedIcon(
      {
        references: fad,
        state,
        babel,
        source
      },
      {
        prefix: 'fad',
        importFrom: '@fortawesome/pro-duotone-svg-icons'
      }
    )
  }
}
