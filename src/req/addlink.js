const { mysql } = require("./comp/mysql");

const addlink = (req) => {
    const { title, artist, amazonmusic, applemusic, audius, beatport, deezer, itunes, soundcloud, spotify, tidal, youtube, auth } = req.body;
    var credentials = decoded.split("-");


    

    var query = mysql('SELECT * FROM users WHERE username = "' + credentials[0] + '" AND password = "'+ credentials[1] +'"');
    var fromuserid = query[0].ID;
    
    if (query.length == 0) {
        return { 'code': 1 };
    } else if (query[0].username == credentials[0] && query[0].password == credentials[1]) {
        if (title.length == 0 || artist.length == 0 || youtube.length == 0) {
            return { message: "title artist and youtube link cannot be empty" };
        } else if (amazonmusic.length != 0) {
            if (amazonmusic.includes("https://")) {

            } else {
                return { 'code': 2 };
            }
        } else if (applemusic.length != 0) {
            if (applemusic.includes("https://")) {

            } else {
                return { 'code': 2 };
            }
        } else if (audius.length != 0) {
            if (audius.includes("https://")) {

            } else {
                return { 'code': 2 };
            }
        } else if (beatport.length != 0) {
            if (beatport.includes("https://")) {

            } else {
                return { 'code': 2 };
            }
        } else if (deezer.length != 0) {
            if (deezer.includes("https://")) {

            } else {
                return { 'code': 2 };
            }
        } else if (itunes.length != 0) {
            if (itunes.includes("https://")) {

            } else {
                return { 'code': 2 };
            }
        } else if (soundcloud.length != 0) {
            if (soundcloud.includes("https://")) {

            } else {
                return { 'code': 2 };
            }
        } else if (spotify.length != 0) {
            if (spotify.includes("https://")) {

            } else {
                return { 'code': 2 };
            }
        } else if (tidal.length != 0) {
            
            if (tidal.includes("https://")) {
            } else {
                return { 'code': 2 };
            }
        } else if (youtube.length != 0) {
            if (youtube.includes("https://")) {
                
            } else {
                return { 'code': 2 };
            }
        }
        mysql('INSERT INTO link (title, artist, amazonmusic, applemusic, audius, beatport, deezer, itunes, soundcloud, spotify, tidal, youtube, itemtoken, fromuserid) VALUES ("' + title + '", "' + artist + '", "' + amazonmusic + '", "' + applemusic + '", "' + audius + '", "' + beatport + '", "' + deezer + '", "' + itunes + '", "' + soundcloud + '", "' + spotify + '", "' + tidal + '", "' + youtube + '", "' + generate_token(16) + '", "' + fromuserid + '")');

        return { 'code': 0 };
    } else {
        return { 'code': 1};
    }
};

exports.addlink = addlink;
