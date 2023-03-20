const handlegetartist = (res) => {
    document.getElementById("artist-list").innerHTML = "";
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
        document.getElementById("artist-list").appendChild(newDiv);
    });
    const divs = document.querySelectorAll('.remove-artist-btn');
    divs.forEach(el => el.addEventListener('click', event => {
        removeartist(event.target.id);
    }));

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

const handleaddartist = (res) => {
    const response = JSON.parse(res);
    if (!response.success) {
        getartist();
        return error("something went wrong", "red");
    } else {
        getartist();
        return error("Artist added", "green");
    }
}

document.getElementById('addartist-form').addEventListener('submit', (e) => {
    const auth = document.cookie.split("=")[1].replace(';', '');;
    e.preventDefault();
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const artistname = document.getElementById('artistname').value;

    if (!firstname || !lastname || !artistname) {
        return error('Please fill in all fields', "red");
    } else {
        document.getElementById('firstname').value = '';
        document.getElementById('lastname').value = '';
        document.getElementById('artistname').value = '';

    }
    var raw = JSON.stringify({
        "auth": auth,
        "firstname": firstname,
        "lastname": lastname,
        "artistname": artistname
    });
    var requestOptions = {
        method: 'POST',
        headers: jsonHeader,
        body: raw,
        redirect: 'follow',
    };
    fetch(`${url}/addartist`, requestOptions)
        .then(response => response.text())
        .then(result => handleaddartist(result))

});

const handleremoveartist = (res) => {
    const response = JSON.parse(res);
    console.log(response);
    if (response.error) {
        getartist();
        error("could not remove artist", "red");
    } else {
        getartist();
        return error("artist removed", "green");
    }
}

const removeartist = (id) => {
    const auth = document.cookie.split("=")[1].replace(';', '');;
    var raw = JSON.stringify({
        "ID": id,
        "auth": auth,
    });
    var requestOptions = {
        method: 'POST',
        headers: jsonHeader,
        body: raw,
        redirect: 'follow',
    };
    fetch(`${url}/removeartist`, requestOptions)
        .then(response => response.text())
        .then(result => handleremoveartist(result))
}

window.onload = getartist();