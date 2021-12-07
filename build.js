const shell = require('shelljs')
const { productName } = require('./package.json')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const Table = require('cli-table')

console.log(chalk.blueBright('Building...'))

const tasks = new Table({
    head: [chalk.greenBright('task'), chalk.greenBright('completed')]
})

function addTask(task='', completed=true) {
    tasks.push([
        chalk.blueBright(task),
        completed ? chalk.greenBright('Yes') : chalk.redBright('No')
    ])
}

if (shell.exec(`npx electron-packager . --platform=win32 --asar --arch=x64 --icon="${path.resolve(__dirname, 'icons', 'icon.ico')}" ${productName} --overwrite`).code === 0) {
    addTask('Building from electron-packager')

    try {
        fs.rmSync(path.resolve(__dirname, `${productName}-win32-x64`, 'resources', 'app', 'node_modules'), {
            recursive: true,
            force: true
        })

        addTask('Remove node_modules')
    } catch {
        addTask('Remove node_modules', false)
    }
} else {
    addTask('Building from electron-packager', false)
}

console.table(tasks.toString())

