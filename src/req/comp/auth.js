const { mysql } = require("./mysql");

const auth = (req) =>{

    if (!req) {
        return {"error": "you did not fill in everything"};

    }
    const auth = req.split("-");
    const username = auth[0]
    const password = auth[1]

    var query = mysql(`SELECT * FROM users WHERE username = "${username}" AND password = "${password}"`)[0];

    if(!query){
        return {"error": "cant login"}

    }else{
        return {"succes": "login-succesfull", "auth": req}

    }
    
}



exports.auth = auth