module.exports = [
  {
    name: 'uikit',
    message: 'Do you want to add UIKit to your project?',
    type: 'confirm'
  },
  {
    name: 'uikitRemove',
    when: answers => !answers.uikit,
    message: `🚨 Since this plugin is unused, you should remove it with the command which will be printed below.`,
    type: 'confirm'
  },
  {
    name: 'uikitIcons',
    when: answers => !!answers.uikit,
    message: 'Do you want to include the UIKit icons in your project?',
    type: 'confirm'
  }
]
