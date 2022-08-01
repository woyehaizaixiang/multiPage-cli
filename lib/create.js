const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const Generator = require('./Generator')

module.exports = async function (name, options) {
  const cwdUrl  = process.cwd()
  const targetDir  = path.join(cwdUrl, name)
  // overwride
  if (fs.existsSync(targetDir)) {
    if (options.force) {
      await fs.remove(targetDir)
    } else {
      // inquiry overwride
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwride'
            },{
              name: 'Cancel',
              value: false
            }
          ]
        }
      ])
      if (action == 'overwride') {
        await fs.remove(targetDir)
      }
    }
  }

  const generator = new Generator(name, targetDir)
  generator.create()
}
