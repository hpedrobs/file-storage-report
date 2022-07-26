import { spawnSync } from 'child_process'
import path from 'path'
import reader from 'xlsx'
import { randomUUID } from 'crypto'

export default function (data) {
    const { stdout } = spawnSync('powershell',
        ["(New-Object -ComObject Shell.Application).NameSpace('shell:Downloads').Self.Path"],
        {
            shell: true,
            windowsVerbatimArguments: true,
            encoding: 'utf8'
        })

    const pathname = path.join(String(stdout).split('\r\n')[0], `report-${randomUUID()}.xls`)

    const workBook = reader.utils.book_new()
    const workSheet = reader.utils.json_to_sheet(data)
    reader.utils.book_append_sheet(workBook, workSheet, 'response')
    const exportFileName = pathname
    reader.writeFile(workBook, exportFileName)
}
