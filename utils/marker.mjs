function before (folder, filterValue) {
    const filterIndex = folder.indexOf(filterValue)
    if (filterIndex === 0) return true
    else return false
}

function middle (folder, filter) {
    const filterValues = filter.split('%')

    if (filterValues.length) {
        const before = filterValues[0]
        const after = filterValues[1]

        const checkMarkerBefore = before(folder, before)
        const checkMarkerAfter = after(folder, after)

        if (checkMarkerBefore && checkMarkerAfter) {
            return true
        }
    }

    return false
}

function after (folder, filterValue) {
    return folder.substr(
        (folder.length - filterValue.length),
        filterValue.length
    ) === filterValue
}

export function check (folder, filter) {
    const filterValue = filter.replace('%', '')

    const marker = filter.indexOf('%')
    const existMarker = marker !== -1

    if (existMarker) {
        if (marker === 0) {
            const existFolder = after(folder, filterValue)
            if (existFolder) return true
        } else if (marker === (filter.length - 1)) {
            const existFolder = before(folder, filterValue)
            if (existFolder) return true
        } else {
            const existFolder = middle(folder, filter)
            if (existFolder) return true
        }
    } else if (filter === folder) {
        return true
    }

    return false
}
