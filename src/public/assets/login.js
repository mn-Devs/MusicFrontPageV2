const handleLogin = (response) => {
  console.log(response);
  resp = JSON.parse(response)
  if (!resp.error) {
    document.cookie = `auth=${resp.auth};`;
    window.location.href = '/';
  } else {
    error("wrong username or password", "red")
    console.log(resp.error)
  }
}

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  if (!document.getElementById("username").value || !document.getElementById("password").value) {
    error("Please enter a username", "red");
    return;
  } else {
    const auth = `${document.getElementById("username").value}-${hashString(document.getElementById("password").value)}`
    var raw = JSON.stringify({
      "auth": auth,
    });

    var requestOptions = {
      method: 'POST',
      headers: jsonHeader,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${url}/login`, requestOptions)
      .then(response => response.text())
      .then(result => handleLogin(result))
  }
});