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

    api.postProcessFiles(files => {
      let content = files.hasOwnProperty(api.entryFile) ? files[api.entryFile] : ''
      content = content.replace(/\n\n/, `\n\nwindow.UIkit = UIkit\n\n`)
      if (options.uikitIcons) {
        content = content.replace(/\n\n/, `\n\nUIkit.use(Icons)\n`)
      }
      files[api.entryFile] = content
    })

  } else {
    api.exitLog(`🚨 Remove this unused plugin with the command: yarn remove ${api.id}\n`, 'info')
  }

}