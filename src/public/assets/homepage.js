const handleaddlink = (response) => {
    console.log(response);
    resp = JSON.parse(response);
    if(!resp.success) {
        error("could not add link", "red");
    }else{
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
        document.getElementById('imageFileInput').value = '';
        error("added link", "green");
    }
}


var img = ``
document.getElementById('imageFileInput').addEventListener('change', (e) => {
    console.log(`File selected: ${e.target.files[0].name}`)
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64String = reader.result
            .replace('data:', '')
            .replace(/^.+,/, '');

        img = base64String
    };
    reader.readAsDataURL(file);
});

document.getElementById('addlink-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const auth = document.cookie.split("=")[1].replace(';', '');;
    if(!document.getElementById('title') ||!document.getElementById('youtube')) {
        error('Please fill in all fields', "red");
    }       
    var raw = JSON.stringify({
        "auth": auth,
        "title": document.getElementById('title').value,
        "artistid": document.getElementById("select-artist").options[document.getElementById("select-artist").selectedIndex].value,
        "amazonmusic": document.getElementById('amazonmusic').value,
        "applemusic": document.getElementById('applemusic').value,
        "audius": document.getElementById('audius').value,
        "beatport": document.getElementById('beatport').value,
        "deezer": document.getElementById('deezer').value,
        "itunes": document.getElementById('itunes').value,
        "soundcloud": document.getElementById('soundcloud').value,
        "spotify": document.getElementById('spotify').value,
        "tidal": document.getElementById('tidal').value,
        "youtube": document.getElementById('youtube').value,
        "img": img
    });
          var requestOptions = {
            method: 'POST',
            headers: jsonHeader,
            body: raw,
            redirect: 'follow',
          };
          
          fetch(`${url}/addlink`, requestOptions)
            .then(response => response.text())
            .then(result => handleaddlink(result))      
});


/*ophalen van linkjes*/
const handlegetlink = (res) => {
    console.log(res)
    document.getElementById("link-list").innerHTML = "";

    const response = JSON.parse(res);
    console.log(response);
    response.artist.forEach(item => {
        
        const newDiv = document.createElement("div");
        const newFirstname = document.createElement("p");
        const newLastname = document.createElement("p");
        const newArtistname = document.createElement("h2");
        const newDelete = document.createElement("button");
        newFirstname.innerHTML = item.firstname;
        newLastname.innerHTML = item.lastname;
        newArtistname.innerHTML = item.artistname;
        newDelete.innerHTML = "Delete";
        newDelete.className = "remove-artist-btn";
        newDelete.id = item.ID;
        newDiv.appendChild(newArtistname)
        newDiv.appendChild(newFirstname)
        newDiv.appendChild(newLastname)
        newDiv.appendChild(newDelete)
        document.getElementById("link-list").appendChild(newDiv);
    });
    const divs = document.querySelectorAll('.remove-link-btn');
    divs.forEach(el => el.addEventListener('click', event => {
        removeartist(event.target.id);
    }));

}

const getlink = () => {
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
    fetch(`${url}/getlink`, requestOptions)
        .then(response => response.text())
        .then(result => handlegetlink(result))

};


window.onload = getlink();
