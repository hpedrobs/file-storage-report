import fs from 'fs'
import path from 'path'
import { isDir, isFile } from '../utils/global.mjs'

function getAllFiles (pathname, ListFiles = []) {
    pathname = path.normalize(pathname)

    const files = fs.readdirSync(pathname)

    for (const file of files) {
        const pathabsolute = path.join(pathname, file)

        if (isDir(pathabsolute)) {
            ListFiles = getAllFiles(pathabsolute, ListFiles)
        } else if (isFile(pathabsolute)) {
            ListFiles.push(pathabsolute)
        }
    }

    return ListFiles
}

export default getAllFiles
