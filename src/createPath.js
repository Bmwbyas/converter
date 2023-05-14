const createPath = () => {
    const data = new Date()
    const year = data.getFullYear()
    const month = data.getMonth() + 1
    const day = data.getDate()

    const pathMode = process.argv[2] === 'cron'
        ? `var/spool/asterisk/${year}/${month}/${day}`
        : `${process.argv[2]}`

    return {path: pathMode}
}

module.exports = {createPath}
