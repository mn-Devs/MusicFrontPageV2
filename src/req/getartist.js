const { auth } = require("./comp/auth");
const { mysql } = require("./comp/mysql");


const getartist = (req) => {

 if(!auth(req.body.auth).succes){
    return {"error": "you are not logged in"};
}else{
    const query = mysql(`SELECT * FROM artists`);
    return query;
}

}


exports.getartist = getartist;