const handleaddlink = () => {
}



//listen for submit on form
document.getElementById('addlink-form').addEventListener('submit', (e) => {
    const auth = document.cookie.split("=")[1].replace(';', '');;

    var img = "";

    const fileInput = document.getElementById('imageFileInput');
//convert image to base64
    const reader = new FileReader();
    



    console.log(auth);
    //prevent actual submit
    e.preventDefault();
    //get values
    const title = document.getElementById('title').value;
    const artistid = imageID = document.getElementById("select-artist").options[document.getElementById("select-artist").selectedIndex].value;;
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
        artistid,
        amazonmusic,
        applemusic,
        audius,
        beatport,
        deezer,
        itunes,
        soundcloud,
        spotify,
        tidal,
        youtube,
        img
    }
    console.log(img)
    //validate
    if(!title || !artistid) {
        //error alert
        error('Please fill in all fields', "red");
    } else {
        //clear fields
        document.getElementById('title').value = '';
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



        const handlegetartistindex = (res) => {
            document.getElementById("select-artist").innerHTML = "";
            const response = JSON.parse(res);
            console.log(response);
            response.artist.forEach(item => {
                
                const newOption = document.createElement("option");
                newOption.innerHTML = item.artistname;
                newOption.value = item.ID;
                document.getElementById("select-artist").appendChild(newOption);
            });
            const divs = document.querySelectorAll('.remove-artist-btn');
            divs.forEach(el => el.addEventListener('click', event => {
                removeartist(event.target.id);
            }));
        
        }
        
        const getartistindex = () => {
            const auth = document.cookie.split("=")[1].replace(';', '');;
            var raw = JSON.stringify({
                "auth": auth,
            });
            var requestOptions = {
                method: 'POST',
                headers: jsonHeader,
                body: raw,
                redirect: 'follow',
            };
            fetch(`${url}/getartist`, requestOptions)
                .then(response => response.text())
                .then(result => handlegetartistindex(result))
        
        };


        window.onload = getartistindex();
