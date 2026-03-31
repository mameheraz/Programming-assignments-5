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


// Issues container started here

async function loadIssues() {
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const issues = await response.json();

    // get container
    const container = document.getElementById("issues-container");
    container.innerHTML = "";

    issues.data.forEach(issue => {
        const div = document.createElement("div");
        div.innerHTML = `

        <div class="border-t-4 border-[#00A96E] rounded-sm p-3 bg-white shadow-sm space-y-3 h-48">
            <div class="flex justify-between items-center">
                <img src="./assets/Open-Status.png" alt=""> 
                <button class="btn bg-[#FEECEC] rounded-full h-5 font-medium text-[#EF4444] text-[12px]">${issue.priority}</button>
            </div>

            <h2 class="font-semibold text-[14px] text-[#1F2937]">${issue.title}</h2>
            <p class="text-[#64748B] text-[12px] font-extralight">${issue.description}</p>
        </div>
        `;

        container.appendChild(div);
    })

}