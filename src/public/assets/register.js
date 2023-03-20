const handleRegister = (response) => {
  console.log(response);
  resp = JSON.parse(response)
  if (!resp.error) {
    document.cookie = `auth=${resp.auth};`;
    window.location.href = '/';
  } else {
    error("could not create account", "red")
    console.log(resp.error)
  }
}

document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();


  if (!document.getElementById("username").value || !document.getElementById("email").value || !document.getElementById("password1").value || !document.getElementById("password2").value || !document.getElementById("firstname").value || !document.getElementById("lastname").value) {
    error("Please enter a username", "red");
    return;
  }
  if (document.getElementById("password1").value !== document.getElementById("password2").value) {
    error("Passwords do not match", "red");
    return;
  } else {
    var raw = JSON.stringify({
      "username": document.getElementById("username").value,
      "email": document.getElementById("email").value,
      "password": hashString(document.getElementById("password1").value),
      "firstname": document.getElementById("firstname").value,
      "lastname": document.getElementById("lastname").value
    });

    var requestOptions = {
      method: 'POST',
      headers: jsonHeader,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${url}/register/`, requestOptions)
      .then(response => response.text())
      .then(result => handleRegister(result))
  }
});