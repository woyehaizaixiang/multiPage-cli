const util = require('util')
const downloadGitRepo = require('download-git-repo')
const chalk = require('chalk')
const ora = require('ora')
const path = require('path')
const figlet = require('figlet')

async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message)
  spinner.start()
  try {
    const result = await fn(...args)
    spinner.succeed();
    return result;
  } catch (error) {
    spinner.fail('Request failed, refetch ...')
  }
}
class Generator {
  constructor (name, targetDir){
    this.name = name
    this.targetDir = targetDir
    this.downloadGitRepo = util.promisify(downloadGitRepo)
  }

  async download(){
    console.log('\r\n' + figlet.textSync('multipage', {}))
    const requestUrl = `woyehaizaixiang/create-multiPage-templates`
    await wrapLoading(
      this.downloadGitRepo,
      'waiting download template',
      requestUrl,
      path.resolve(process.cwd(), this.targetDir))
  }

  async create(){
    await this.download()
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
    console.log('  npm install')
    console.log('  npm run serve\r\n')
  }
}

module.exports = Generator
