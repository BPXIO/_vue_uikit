module.exports = [
  {
    name: 'uikit',
    message: 'Do you want to add UIKit to your project?',
    type: 'confirm'
  },
  {
    name: 'uikitIcons',
    when: answers => !!answers.uikit,
    message: 'Do you want to include the UIKit icons in your project?',
    type: 'confirm'
  }
]
