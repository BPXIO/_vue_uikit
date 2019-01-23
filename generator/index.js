const fs = require('fs')

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

    api.injectImports(api.entryFile, `import UIkit from 'uikit'`)
    api.injectImports(api.entryFile, `import '@/assets/styles/styles.scss'`)
    if (options.uikitIcons) {
      api.injectImports(api.entryFile, `import Icons from 'uikit/dist/js/uikit-icons'`)
    }

    api.render('./template', options)

    api.onCreateComplete(() => {

      const file = api.resolve(api.entryFile)

      try {
        const fileExists = fs.existsSync(file)
        if (!file && !fileExists) {
          throw new Error('No entry found')
        }
      } catch (e) {
        api.exitLog(`Your main file couldn’t be modified.`)
      }

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
    api.exitLog(`🚨 Remove this unused plugin with the command: yarn remove ${api.id}\n`)
  }

}