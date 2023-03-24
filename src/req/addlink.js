const { auth } = require("./comp/auth");
const { mysql } = require("./comp/mysql");
const { tokengen } = require("./comp/tokengen");
const fs = require("fs");
const path = require("path");
const addlink = (req) => {
    const { title, artistid, amazonmusic, applemusic, audius, beatport, deezer, itunes, soundcloud, spotify, tidal, youtube } = req.body;
    const token = tokengen(10);
    const imageBase64 = req.body.img;
    //const temp  = __dirname.replace("/src/req/", "/src/public/cdn/")
    const cdnPath = `/home/maurice/Documents/Github/MusicFrontPageV2/src/public/cdn`;
    if (!imageBase64) {
        return { "error": "Image data not provided" };
    }
    const imageBuffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const fileName = `${token}.png`;
    const filePath = path.join(cdnPath, fileName);
    fs.writeFile(filePath, imageBuffer, (error) => {
        if (error) {
          return { "error": "Failed to save image" };
        } else {
            console.log(filePath);
        }
    });

    if (!auth(req.body.auth).succes) {
        return { "error": "you are not logged in" };
    }
    const fromuserid = auth(req.body.auth).id;
    if (title.length == 0 || youtube.length == 0) {
        return { "message": "title artist and youtube link cannot be empty" };
    }
    mysql(`INSERT INTO link (songTitle, artistID, amazonmusic, applemusic, audius, beatport, deezer, itunes, soundcloud, spotify, tidal, youtube, itemtoken, fromuserid) VALUES ("${title}", "${artistid}", "${amazonmusic}", "${applemusic}", "${audius}", "${beatport}", "${deezer}", "${itunes}", "${soundcloud}", "${spotify}", "${tidal}", "${youtube}", "${token}", "${fromuserid}");`);

    return { "success": "added link" };
};

exports.addlink = addlink;
