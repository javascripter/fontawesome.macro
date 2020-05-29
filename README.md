# fontawesome.macro

## Description
This babel macro enables fontawesome icons to be imported automatically when using the following tagged template/function syntax

Before:

```javascript
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-solid-svg-icons'


<FontAwesome icon={faSquare} />
```

After:
```javascript
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from 'fontawesome.macro'

<FontAwesome icon={fas`square`} />
// or
<FontAwesome icon={fas('square')} />
```

## Usage

https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/user.md

Read the above doc to enable babel macros. If you are using create-react-app, babel macros are enabled by default so you should be able to import this macro without configuring anything.

You can use the following tagged template/function macros:
```
fal -> light
fas -> solid
fab -> brands
fad -> duotone (pro only)
```

You can specify free or pro in the babel plugin macro config.
The below config enables use of pro icons(by default this macro uses free icons).

```javascript
// babel-plugin-macros.config.js
module.exports = {
  // ...
  'fontawesome.macro': {
    type: 'pro'
  }
}
```

Note that you need to install svg font packages you want to use in your project by yourself.

https://fontawesome.com/how-to-use/with-the-api/setup/importing-icons

```
yarn add @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons	@fortawesome/free-brands-svg-icons
```
