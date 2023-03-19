const { mysql } = require("./comp/mysql");
const { auth } = require("./comp/auth");


const addartist = (req) => {
    if(!req.body.firstname || !req.body.lastname || !req.body.artistname ) {
        return {"error": "you did not fill in everything"};
    }  if(!auth(req.body.auth).succes){
        return {"error": "you are not logged in"};
    }

    const query = mysql(`INSERT INTO artists (firstname,lastname,artistname) VALUES ("${req.body.firstname}","${req.body.lastname}","${req.body.artistname}")`);

    if (!query.affectedRows == 0) {
        return {"success": "added artist"}
    }else{
        return {"error": "something went wrong"};

    }
}

exports.addartist = addartist;