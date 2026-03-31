document.getElementById("login-btn").addEventListener("click", function () {
    // get the username

    const usernameInput = document.getElementById("username");
    const inputValue = usernameInput.value;

    // Get the password
    const password = document.getElementById("password");
    const passWordValue = password.value;
    console.log(passWordValue);


    if (inputValue == "admin" && passWordValue == "admin123") {
        alert("Login Success")
        window.location.assign("/homepage.html")
    } else {
        alert("Ops! Login Fail")
        return;
    }
})



