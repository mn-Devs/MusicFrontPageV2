const error = async (message, color) => {


    var currentColor = ""
    const MainErrorDiv = document.getElementById("main-error-div");

    const errorDiv = document.createElement("div");
    const errorMessage = document.createElement("p");
    if(color == "green"){
        currentColor = "green";
    }if(color === "red"){
        currentColor = "red";
    }
    errorMessage.innerHTML = message;
    errorDiv.style.background = currentColor;
    errorDiv.style.display = "block";

    errorDiv.appendChild(errorMessage);
    MainErrorDiv.appendChild(errorDiv);

    setTimeout(function(){
        errorDiv.style.display = "none";
    }
    , 3000);

}



const handleGetImages = async (result) => {



};