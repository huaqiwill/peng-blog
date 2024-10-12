require('dotenv').config({ path: __dirname + '/.env.local' })

const scp2_client = require('scp2')
const ora = require('ora')
const chalk = require('chalk')
const spinner = ora(chalk.green('正在部署项目到服务器...'))
const ssh2_client = require('ssh2').Client
const conn = new ssh2_client()

conn.on('ready', () => {
  conn.exec('rm -rf /usr/local/aurora-vue/blog', (err: any, stream: any) => {
    if (err) {
      throw err
    }
    stream.on('close', () => {
      spinner.start()
      scp2_client.scp(
        './dist/',
        {
          host: process.env.VUE_APP_HOST,
          port: process.env.VUE_APP_PORT,
          username: process.env.VUE_APP_USERNAME,
          password: process.env.VUE_APP_PASSWORD,
          path: process.env.VUE_APP_PATH
        },
        (err: any) => {
          if (!err) {
            spinner.stop()
            console.log(chalk.green('项目部署完成！'))
          } else {
            console.log(chalk.red(err))
          }
        }
      )
      conn.end()
    })
      .on('data', () => { })
      .stderr.on('data', () => { })
  })
}).on('error', async (err: any) => {
  console.log(chalk.red('Client 连接错误' + err.toString()))
}).connect({
  host: process.env.VUE_APP_HOST,
  port: process.env.VUE_APP_PORT,
  username: process.env.VUE_APP_USERNAME,
  password: process.env.VUE_APP_PASSWORD
})
