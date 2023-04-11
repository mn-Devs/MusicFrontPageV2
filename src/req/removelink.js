const { auth } = require("./comp/auth");
const { mysql } = require("./comp/mysql");

const removelink = (req) => {
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
        mysql(`DELETE FROM link WHERE id = ${req.body.ID}`);
        return {
            "succes": "link removed"
        };
    }
}


exports.removelink = removelink;