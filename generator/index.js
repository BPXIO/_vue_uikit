const fs = require('fs')
let file

module.exports = (api, options) => {

  if (options.uikit) {
    api.extendPackage({
      dependencies: {
        'uikit': '^3.0.2'
      },
      eslintConfig: {
        globals: {
          'UIkit': true
        }
      }
    })

    api.render('./template', options)

    // Modify main.js
    try {
      const tsPath = api.resolve('src/main.ts')
      const jsPath = api.resolve('src/main.js')

      const tsExists = fs.existsSync(tsPath)
      const jsExists = fs.existsSync(jsPath)

      if (!tsExists && !jsExists) {
        throw new Error('No entry found')
      }

      file = tsExists ? 'src/main.ts' : 'src/main.js'
      api.injectImports(file, `import UIkit from 'uikit'`)
      api.injectImports(file, `import '@/assets/styles/styles.scss'`)
      if (options.uikitIcons) {
        api.injectImports(file, `import Icons from 'uikit/dist/js/uikit-icons'`)
      }
    } catch (e) {
      api.exitLog(`Your main file couldn't be modified.`, 'warn')
    }

    api.onCreateComplete(() => {

    let content = fs.readFileSync(file, { encoding: 'utf8' })
      console.log('PRE-REPLACE:', file, '\n\n', content, '\n\n')

      content = content.replace(/\n\n/, `\n\nwindow.UIkit = UIkit\n\n`)
      if (options.uikitIcons) {
        content = content.replace(/\n\n/, `\n\nUIkit.use(Icons)\n`)
      }
      console.log('POST-REPLACE:', '\n\n', content, '\n\n')
      fs.writeFileSync(file, content, { encoding: 'utf8' })
    })

  } else {
    api.exitLog(`🚨 Remove this unused plugin with the command: yarn remove ${api.id}\n`, 'info')
  }

}