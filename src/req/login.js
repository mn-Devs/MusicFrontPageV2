const { mysql } = require("./comp/mysql");

const login = (req) =>{
    const auth = req.body.auth.split("-");
    const username = auth[0]
    const password = auth[1]

    var query = mysql(`SELECT * FROM users WHERE username = "${username}" AND password = "${password}"`)[0];

    if(!query){
        return {"error": "cant login"}

    }else{
        return {"succes": "login-succesfull", "auth": req.body.auth}

    }
    
}



exports.login = login