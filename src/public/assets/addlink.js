const handleaddlink = () => {
}



//listen for submit on form
document.getElementById('addlink-form').addEventListener('submit', (e) => {
    const auth = document.cookie.split("=")[1].replace(';', '');;
    console.log(auth);
    //prevent actual submit
    e.preventDefault();
    
    //get values
    const title = document.getElementById('title').value;
    const artist = document.getElementById('artist').value;
    const amazonmusic = document.getElementById('amazonmusic').value;
    const applemusic = document.getElementById('applemusic').value;
    const audius = document.getElementById('audius').value;
    const beatport = document.getElementById('beatport').value;
    const deezer = document.getElementById('deezer').value;
    const itunes = document.getElementById('itunes').value;
    const soundcloud = document.getElementById('soundcloud').value;
    const spotify = document.getElementById('spotify').value;
    const tidal = document.getElementById('tidal').value;
    const youtube = document.getElementById('youtube').value;
    
    //create link object
    const link = {
        auth,
        title,
        artist,
        amazonmusic,
        applemusic,
        audius,
        beatport,
        deezer,
        itunes,
        soundcloud,
        spotify,
        tidal,
        youtube
    }
    
    //validate
    if(!title || !artist) {
        //error alert
        error('Please fill in all fields', "red");
    } else {
        //clear fields
        document.getElementById('title').value = '';
        document.getElementById('artist').value = '';
        document.getElementById('amazonmusic').value = '';
        document.getElementById('applemusic').value = '';
        document.getElementById('audius').value = '';
        document.getElementById('beatport').value = '';
        document.getElementById('deezer').value = '';
        document.getElementById('itunes').value = '';
        document.getElementById('soundcloud').value = '';
        document.getElementById('spotify').value = '';
        document.getElementById('tidal').value = '';
        document.getElementById('youtube').value = '';
    
    }          
          var requestOptions = {
            method: 'POST',
            headers: jsonHeader,
            body: link,
            redirect: 'follow',
          };
          
          fetch(`${url}/addlink`, requestOptions)
            .then(response => response.text())
            .then(result => handleaddlink(result))      
    
        });
