const { auth } = require("./comp/auth");
const { mysql } = require("./comp/mysql");

const removeartist = (req) => {
    if (!auth(req.body.auth).succes) {
        return {
            "error": "you are not logged in"
        };
    }
    if (!req.body.ID) {
        return {
            "error": "no ID provided"
        };
    } else {
        mysql(`DELETE FROM artists WHERE id = ${req.body.ID}`);
        return {
            "succes": "artist removed"
        };
    }
}


exports.removeartist = removeartist;