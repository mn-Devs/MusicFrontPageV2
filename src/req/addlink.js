const { auth } = require("./comp/auth");
const { mysql } = require("./comp/mysql");
const { tokengen } = require("./comp/tokengen");

const addlink = (req) => {
    const { title, artistid, amazonmusic, applemusic, audius, beatport, deezer, itunes, soundcloud, spotify, tidal, youtube, img } = req.body;



    const imageBase64 = img;
    console.log(imageBase64)
    const cdnPath = path.join(__dirname,'src', 'public', 'cdn');
    if (!imageBase64) {
      res.status(400).json({ error: 'Image data not provided' });
      return;
    }
  
    // Remove the data URL prefix and create a buffer from the base64-encoded image data
    const imageBuffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  
    // Generate a unique file name and save the image buffer to a file in the CDN directory
    const fileName = `${tokengen(10)}.png`;
    const filePath = path.join(cdnPath, fileName);
    fs.writeFile(filePath, imageBuffer, (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save image' });
      } else {
        console.log(filepath)
      }
    });


    if(!auth(req.body.auth).succes){
        return {"error": "you are not logged in"};
    }
    const credentials = req.body.auth.split("-");
    console.log(credentials)

    var query = mysql(`SELECT * FROM users WHERE username = "${credentials[0]}" AND password = "${credentials[1]}";`);
    const fromuserid = query[0].ID;
    
    if (query.length == 0) {
        return { 'code': 1 };
    } else if (query[0].username == credentials[0] && query[0].password == credentials[1]) {
        if (title.length == 0 || artistid.length == 0 || youtube.length == 0) {
            return { message: "title artist and youtube link cannot be empty" };
        }
        mysql(`INSERT INTO link (title, artistID, amazonmusic, applemusic, audius, beatport, deezer, itunes, soundcloud, spotify, tidal, youtube, itemtoken, fromuserid) VALUES ("${title}", "${artistid}", "${amazonmusic}", "${applemusic}", "${audius}", "${beatport}", "${deezer}", "${itunes}", "${soundcloud}", "${spotify}", "${tidal}", "${youtube}", "${tokengen(16)}", "${fromuserid}");`);

        return { 'success': "added link" };
    } else {
        return { "error": "something went wrong"};
    }
};

exports.addlink = addlink;
