const { mysql } = require("./comp/mysql");

const getlink = (req) => {

const query = mysql(`SELECT * FROM link WHERE itemid = '${req}'`)[0];

if(!query){

return {"error": "no link found"};
 }else{ 

return {"succes": "ok", "item": query};
}
}


exports.getlink = getlink;