const { auth } = require("./comp/auth");
const { mysql } = require("./comp/mysql");
const { tokengen } = require("./comp/tokengen");
const fs = require("fs");
const path = require("path");
const addlink = (req) => {
    const { title, artistid, amazonmusic, applemusic, audius, beatport, deezer, itunes, soundcloud, spotify, tidal, youtube } = req.body;
    const token = tokengen(10);
    console.log(req.body.artistid)
    //console.log(req)
    const fromuserid = auth(req.cookies.auth).id

    if (!auth(req.cookies.auth).succes) {
        return { "error": "you are not logged in" };
    }if (title.length == 0 || youtube.length == 0) {
        return { "message": "title artist and youtube link cannot be empty" };
    }else{
        console.log(req.files)
        const filetype = req.files.img.mimetype.split(`/`)[1]
        fs.writeFileSync("/home/maurice/Documents/Github/MusicFrontPageV2/src/public/cdn/", `${token}.${filetype}`, req.files.img.data)

        mysql(`INSERT INTO link (songTitle, artistID, amazonmusic, applemusic, audius, beatport, deezer, itunes, soundcloud, spotify, tidal, youtube, itemtoken, fromuserid) VALUES ("${title}", "${artistid}", "${amazonmusic}", "${applemusic}", "${audius}", "${beatport}", "${deezer}", "${itunes}", "${soundcloud}", "${spotify}", "${tidal}", "${youtube}", "${token}", "${fromuserid}");`);
        return { "success": "added link" };
    }

};

exports.addlink = addlink;
