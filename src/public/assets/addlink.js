const handleaddlink = (response) => {
    if(!response.success) {
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



const handlegetartist = (res) => {
    document.getElementById("select-artist").innerHTML = "";
    const response = JSON.parse(res);
    response.artist.forEach(item => {
        const newOption = document.createElement("option");
        newOption.innerHTML = item.artistname;
        newOption.value = item.ID;
        document.getElementById("select-artist").appendChild(newOption);
    });
}
        
const getartist = () => {
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
        .then(result => handlegetartist(result))
    };


window.onload = getartist();
