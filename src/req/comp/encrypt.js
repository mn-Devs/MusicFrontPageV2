const { hashString } = require("./hash")

const encrypt = (username, password) => {
    const encryt = hashString(`${username}-${password}`)
    return encryt

}

exports.encrypt = encrypt