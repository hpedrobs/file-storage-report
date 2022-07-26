/* eslint-disable eqeqeq */
/* eslint-disable no-async-promise-executor */
import fs from 'fs'
import path from 'path'
import { check } from '../utils/marker.mjs'
import { isDir } from '../utils/global.mjs'
import getAllFiles from './getAllFiles.mjs'

const list = []

function mapDir (pathname, level, filter, currentLevel = 0) {
    return new Promise(resolve => {
        const dir = path.normalize(pathname)

        if (dir != '.' && isDir(dir)) {
            if (level >= currentLevel) {
                if (level === currentLevel) {
                    let acess = true
                    if (filter) acess = check(path.basename(pathname), filter)
                    if (acess) {
                        const files = getAllFiles(pathname)
                        list.push({ Caminho: pathname, Arquivos: files.length })
                    }
                } else {
                    const items = fs.readdirSync(dir)
                    items.forEach((item) => {
                        const pathabsolute = path.join(dir, item)
                        if (isDir(pathabsolute)) mapDir(pathabsolute, level, filter, currentLevel + 1)
                    })
                }
            }
        } else {
            console.log('\nErro: caminho não foi encontrado')
        }

        resolve(list)
    })
}

export default mapDir
