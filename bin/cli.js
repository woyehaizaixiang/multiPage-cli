const program = require('commander')
const figlet = require('figlet')

program
  .command('create <app-name>')
  .description('create a new project')
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    require('../lib/create.js')(name, options)
  })

program
 .version(`v${require('../package.json').version}`)
 .usage('<command> [option]')

program
.on('--help', () => {
  // Logo
  console.log('\r\n' + figlet.textSync('multipage', {}))
})

program.parse(process.argv)
