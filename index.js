const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const version = "v1";
const cors = require('cors');
const { register } = require('./src/req/register');
const { login } = require('./src/req/login');
const siteName = 'MusicFrontPage';
const cookieParser = require('cookie-parser');
const { auth } = require('./src/req/comp/auth');
const { addlink } = require('./src/req/addlink');
const { getlink } = require('./src/req/getlink');
const fs = require('fs');
const { addartist } = require('./src/req/addartist');
const { getartist } = require('./src/req/getartist');
app.set('view engine', 'ejs');
app.set('views', './src/views')
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(bodyParser.json());
app.use(cors())
app.use(cookieParser());
/*frontend*/
app.get('/l/:tagId', function(req, res) {

    const links = getlink(req.params.tagId)
    res.send();

    res.render('link', {
      title: `Test | ${siteName}`,
      name: siteName,
      youtube: links.youtube,
      spotify: links.spotify,
      deezer: links.deezer,
      itunes: links.itunes,
      soundcloud: links.soundcloud,
      tidal: links.tidal,
      amazonmusic: links.amazonmusic,
      applemusic: links.applemusic,
      audius: links.audius,
      beatport: links.beatport,
      title: links.title,
      artist: links.artist,
      image: links.image,
  });

});

app.get('/', (req, res) => {
  if(!auth(req.cookies.auth).succes){
    res.redirect('/login');
  }else{
    res.render('index', {
      title: `Admin | ${siteName}`,
      name: siteName,
      username: req.cookies.auth.split("-")[0],
  });
  }
});


app.get('/artist', (req, res) => {
  if(!auth(req.cookies.auth).succes){
    res.redirect('/login');
  }else{
    res.render('artist', {
      title: `Artist | ${siteName}`,
      name: siteName,
      username: req.cookies.auth.split("-")[0],
  });
  }
});


app.get('/test', (req, res) => {
  if(!auth(req.cookies.auth).succes){
    res.redirect('/login');
  }else{
    res.render('test', {
      title: `File UPLOAD | ${siteName}`,
      name: siteName,
      username: req.cookies.auth.split("-")[0],
  });
  }
});

  app.get('/logout', (req, res) => {

    res.render('logout', {
      title: `Logging out | ${siteName}`,
      name: siteName,
  });
});




  app.get('/login', (req, res) => {
    if(!auth(req.cookies.auth).succes){
      res.render('login', {
        title: `Login | ${siteName}`,
        name: siteName,
      });
    }else{
      res.redirect('/');  
  }
  });

  app.get('/register', (req, res) => {
    res.render('register', {
      title: `Register | ${siteName}`,
      name: siteName,
    });
  });


  /*api*/

app.post(`/${version}/login`, (req, res) => {
    res.json(login(req));
});

app.post(`/${version}/register`, (req, res) => {
    res.json(register(req));
});


app.post(`/${version}/addlink`, (req, res) => {
  res.json(addlink(req));
});


app.post(`/${version}/addartist`, (req, res) => {
  res.json(addartist(req));
});
app.post(`/${version}/getartist`, (req, res) => {
  res.json(getartist(req));
});



app.post(`/${version}/upload`, (req, res) => {
  const imageBase64 = req.body.image;
  const cdnPath = path.join(__dirname,'src', 'public', 'cdn');
  if (!imageBase64) {
    res.status(400).json({ error: 'Image data not provided' });
    return;
  }

  // Remove the data URL prefix and create a buffer from the base64-encoded image data
  const imageBuffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64');

  // Generate a unique file name and save the image buffer to a file in the CDN directory
  const fileName = `image_${Date.now()}.png`;
  const filePath = path.join(cdnPath, fileName);
  fs.writeFile(filePath, imageBuffer, (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to save image' });
    } else {
      res.json({ success: true });
    }
  });
});






app.listen(5000, () => {
  console.log('App is listening on port 5000');
});