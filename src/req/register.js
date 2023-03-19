const { encrypt } = require("./comp/encrypt");
const { mysql } = require("./comp/mysql");

const register = (req) => {
    const {username,email,password,firstname,lastname} = req.body;

    if (!username ||!email||!password||!firstname||!lastname) {
        return {"error": "you did not fill in everything"};

    }else{
        const query = mysql(`INSERT INTO users (username, email, password, firstname, lastname) VALUES ("${username}", "${email}", "${password}", "${firstname}", "${lastname}")`);
        if (query.affectedRows == 0) {
            return {"error": "something went wrong"};
        }else{
            const auth = `${username}-${password}`;
            return {"success": "you have been registered", "auth": auth}
        }

    }

}
exports.register = register;