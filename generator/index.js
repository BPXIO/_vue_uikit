const fs = require('fs')
module.exports = (api, options) => {

  api.extendPackage({
    dependencies: {
      'uikit': '^3.0'
    },
    eslintConfig: {
      globals: {
        'UIkit': true
      }
    }
  })

  api.injectImports(api.entryFile, `import UIkit from 'uikit'`)
  api.injectImports(api.entryFile, `import '@/assets/styles/styles.scss'`)
  if (options.icons) {
    api.injectImports(api.entryFile, `import Icons from 'uikit/dist/js/uikit-icons'`)
  }

  api.render('./template', options)

  api.onCreateComplete(() => {
    if (options.icons) {
      let content = fs.readFileSync(api.entryFile, { encoding: 'utf8' })
      content = content.replace(/\n\n/, `\n\nUIkit.use(Icons)\nwindow.UIkit = UIkit\n\n`)
      fs.writeFileSync(api.entryFile, content, { encoding: 'utf8' })
    } else {
      let content = fs.readFileSync(api.entryFile, { encoding: 'utf8' })
      content = content.replace(/\n\n/, `\n\nwindow.UIkit = UIkit\n\n`)
      fs.writeFileSync(api.entryFile, content, { encoding: 'utf8' })
    }
  })
}