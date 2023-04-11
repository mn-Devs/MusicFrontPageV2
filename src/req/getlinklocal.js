const { mysql } = require("./comp/mysql");

const getlinklocal = (itemtoken) => {
const objects = mysql(`SELECT * FROM link WHERE itemtoken = "${itemtoken}"`);
const artist = mysql(`SELECT artists.* FROM link JOIN artists ON link.artistID = artists.ID WHERE link.itemtoken = "${itemtoken}"; `);

if(!artist[0]){
return {"error": "no link found"};
}else{ 
return {"success": "ok", "objects": objects[0], "artist": artist[0]};
}
}


exports.getlinklocal = getlinklocal;