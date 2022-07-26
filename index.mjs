import inquirer from 'inquirer'
import createReport from './services/createReport.mjs'
import writeReport from './services/downloadReport.js'

(function () {
    const questions = [
        {
            name: 'pathname',
            message: 'Qual é o endereço do diretório raiz?'
        },
        {
            name: 'level',
            message: 'Qual é o nível?'
        },
        {
            name: 'filter',
            message: 'Qual é o filtro?'
        }
    ]

    const result = inquirer.prompt(questions)

    result
        .then(async answers => {
            const { pathname, level, filter } = answers
            const report = await createReport(pathname, level, filter)
            writeReport(report)
        })
        .catch(err => console.log(err))
})()
