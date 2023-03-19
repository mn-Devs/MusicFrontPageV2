const handleaddartist = (res) => {
    const response = JSON.parse(res);
    if(!response.success){
        return error("something went wrong", "red");
    }else{
        return error("Artist added", "green");
    }
}



//listen for submit on form
document.getElementById('addartist-form').addEventListener('submit', (e) => {
    const auth = document.cookie.split("=")[1].replace(';', '');;
    e.preventDefault();
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const artistname = document.getElementById('artistname').value;
    
  
    if(!firstname ||!lastname || !artistname) {
        //error alert
        return error('Please fill in all fields', "red");
    } else {
        //clear fields
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
