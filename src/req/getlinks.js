const {auth} = require("./comp/auth");
const {mysql} = require("./comp/mysql");

const getlink = (req) => {

    const authentication = req.body.auth
    if (!auth(authentication).succes) {
        return {"error": "not authenticated"};
    } else {
        const objects = mysql(`SELECT * FROM link;`);

        if (!objects) {
            return {"error": "no link found"};
        } else {
            return {"success": "ok", "objects": objects};
        }
    }

}

exports.getlink = getlink;