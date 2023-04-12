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


/*ophalen van linkjes*/
const handlegetlink = (res) => {
    console.log(res)
    document.getElementById("link-list").innerHTML = "";

    const response = JSON.parse(res);
    console.log(response);
    response.objects.forEach(item => {
        
        const newDiv = document.createElement("div");
        const newSongtitle = document.createElement("h2");
        const newImage = document.createElement("img");
        const newItemtoken = document.createElement("a");
        const newDelete = document.createElement("button");
        const newEdit = document.createElement("a");
        newSongtitle.innerHTML = item.songtitle;
        newImage.src = `/cdn/${item.imagename}`;
        newItemtoken.innerHTML = item.itemtoken;
        newItemtoken.href = `/l/${item.itemtoken}`;
        newItemtoken.target = "_blank";
        newDelete.innerHTML = "Delete";
        newDelete.className = "remove-link-btn";
        newEdit.href = `/update/${item.itemtoken}`;
        newEdit.className = "edit-link-btn";
        newEdit.innerHTML = "Edit";
        newDelete.id = item.ID;
        newDiv.appendChild(newSongtitle)

        newDiv.appendChild(newItemtoken)
        newDiv.appendChild(newImage)
        newDiv.appendChild(newDelete)
        //newDiv.appendChild(newEdit)
        document.getElementById("link-list").appendChild(newDiv);
    });
    const divs = document.querySelectorAll('.remove-link-btn');
    divs.forEach(el => el.addEventListener('click', event => {
        removelink(event.target.id);
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

const handleremovelink = (res) => {
    const response = JSON.parse(res);
    console.log(response);
    if (response.error) {
        getlink();
        error("could not remove link", "red");
    } else {
        getlink();
        return error("link removed", "green");
    }
}

const removelink = (id) => {
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
    fetch(`${url}/removelink`, requestOptions)
        .then(response => response.text())
        .then(result => handleremovelink(result))
}


window.onload = getlink();
