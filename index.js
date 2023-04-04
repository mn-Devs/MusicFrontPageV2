const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const version = "v1";
const fs = require('fs');
const siteName = 'MusicFrontPage';
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require("express-fileupload")
const { register } = require('./src/req/register');
const { login } = require('./src/req/login');
const { auth } = require('./src/req/comp/auth');
const { getlinklocal } = require('./src/req/getlinklocal');
const { addartist } = require('./src/req/addartist');
const { getartist } = require('./src/req/getartist');
const { removeartist } = require('./src/req/removeartist');
const { addlink } = require('./src/req/addlink');
const { testupload } = require('./src/req/testupload');
const { getlink } = require('./src/req/getlinks');
app.set('view engine', 'ejs');
app.set('views', './src/views')
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(bodyParser.json());
app.use(cors())
app.use(cookieParser());
app.use(fileUpload())
/*frontend*/
app.get('/l/:tagId', function(req, res) {
  const links = getlinklocal(req.params.tagId);
  console.log(links)
  if(!links.error){
    const songtitle = `${links.artist.artistname} - ${links.objects.songtitle}`
     res.render('link', {
      title: `Stream now! ${songtitle}`,
      youtube: links.objects.youtube,
      spotify: links.objects.spotify,
      deezer: links.objects.deezer,
      itunes: links.objects.itunes,
      soundcloud: links.objects.soundcloud,
      tidal: links.objects.tidal,
      amazonmusic: links.objects.amazonmusic,
      applemusic: links.objects.applemusic,
      audius: links.objects.audius,
      beatport: links.objects.beatport,
      linktitle: songtitle,
      artist: links.objects.artist,
      image: links.objects.image,
  });
  }else{
    res.redirect('/404');
  }

});

app.get('/404', (req, res) => {
  res.render('404', {
    title: `404 | ${siteName}`,
    name: siteName,
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
      script: 'homepage.js',
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
      script: `artist.js`
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
      script: ``,
  });
});

app.get('/links', (req, res) => {

  res.render('links', {
    title: `Links | ${siteName}`,
    name: siteName,
    script: `links.js`,
});
});




  app.get('/login', (req, res) => {
    if(!auth(req.cookies.auth).succes){
      res.render('login', {
        title: `Login | ${siteName}`,
        name: siteName,
        script: `login.js`
      });
    }else{
      res.redirect('/');  
  }
  });

  app.get('/register', (req, res) => {
    res.render('register', {
      title: `Register | ${siteName}`,
      name: siteName,
      script: `register.js`
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

app.post(`/${version}/getlink`, (req, res) => {
  res.json(getlink(req));
});


app.post(`/${version}/addartist`, (req, res) => {
  res.json(addartist(req));
});
app.post(`/${version}/getartist`, (req, res) => {
  res.json(getartist(req));
});
app.post(`/${version}/removeartist`, (req, res) => {
  res.json(removeartist(req));
});




app.post("/test", testupload )







app.listen(5000, () => {
  console.log('App is listening on port 5000');
});