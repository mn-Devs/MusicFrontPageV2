const { auth } = require("./comp/auth");
const { mysql } = require("./comp/mysql");
const { tokengen } = require("./comp/tokengen");

const addlink = (req) => {
    const { title, artist, amazonmusic, applemusic, audius, beatport, deezer, itunes, soundcloud, spotify, tidal, youtube } = req.body;

    if(!auth(req.body.auth).succes){
        return {"error": "you are not logged in"};
    }
    const credentials = req.body.auth.split("-");

    var query = mysql('SELECT * FROM users WHERE username = "' + credentials[0] + '" AND password = "'+ credentials[1] +'"');
    var fromuserid = query[0].ID;
    
    if (query.length == 0) {
        return { 'code': 1 };
    } else if (query[0].username == credentials[0] && query[0].password == credentials[1]) {
        if (title.length == 0 || artist.length == 0 || youtube.length == 0) {
            return { message: "title artist and youtube link cannot be empty" };
        }
        mysql(`INSERT INTO link (title, artist, amazonmusic, applemusic, audius, beatport, deezer, itunes, soundcloud, spotify, tidal, youtube, itemtoken, fromuserid) VALUES ("${title}", "${artist}", "${amazonmusic}", "${applemusic}", "${audius}", "${beatport}", "${deezer}", "${itunes}", "${soundcloud}", "${spotify}", "${tidal}", "${youtube}", "${tokengen(16)}", "${fromuserid}"`);

        return { 'success': "added link" };
    } else {
        return { "error": "something went wrong"};
    }
};

exports.addlink = addlink;
