import fs from 'fs'

export function isDir (pathname) {
    return fs.statSync(pathname).isDirectory()
}

export function isFile (pathname) {
    return fs.statSync(pathname).isFile()
}
