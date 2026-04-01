// issuesLevel Show
const createElement = (arr) => {
    const htmlElements = arr.map(el => {
        let styles = "";
        let icon = "";

        if (el === "bug") {
            styles = "bg-red-100 text-[#00A96E] font-medium uppercase";
            icon = `<img src="./assets/BugDroid.png" class="w-4 h-4 inline-block">`;
        } else if (el === "help wanted") {
            styles = "bg-[#FDE68A] text-[#D97706] font-medium uppercase";
            icon = `<img src="./assets/Vector.png" class="w-4 h-4 inline-block">`;
        } else if (el === "enhancement") {
            styles = "bg-green-100 text-green-600 font-medium uppercase";
            icon = `<img src="./assets/enhancement.png" class="w-4 h-4 inline-block">`;
        }
        else if (el === "good first issue") {
            styles = "bg-[#C1C72650] text-black font-medium uppercase";
        }
        else if (el === "documentation") {
            styles = "bg-[#7B14C420] text-green-600 font-medium uppercase";
            icon = `<i class="fa-regular fa-copy"></i>`;

        } else {
            styles = "bg-gray-100 text-gray-600";
            icon = `<i class="fa-solid fa-house"></i>`;
        }

        return `<span class="px-2 py-1 rounded-full text-[12px] font-medium inline-flex items-center gap-1 ${styles}">
              ${icon} ${el}
            </span>`;
    });

    return htmlElements.join(" ");
};




// Active Button work now

function activeButton(activeId) {
    document.getElementById("all-btn").classList.remove("active-btn");
    document.getElementById("open-btn").classList.remove("active-btn");
    document.getElementById("close-btn").classList.remove("active-btn");

    document.getElementById(activeId).classList.add("active-btn");
}


// Date convert to natural flow
function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

// -------------------------------------------------------------------------------------

// Issues show on Modal
const loadIssuesDetail = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const response = await fetch(url);
    const details = await response.json();
    displayIssuesDetails(details.data);
}
const displayIssuesDetails = (issue) => {
    const statusBgColor = issue.status === "closed" ? "#A855F7" : "#00A96E";
    const issuePriority = issue.priority === "high" ? "#EF4444" : issue.priority === "medium" ? "#ffd21a" : "#4d5365";
    const issueModal = document.getElementById("modalContainer");
    document.getElementById("issue_modal").showModal();
    issueModal.innerHTML = `
          <div class="space-y-4">
                <h2 class="font-bold text-[24px] text-[#1F2937]">${issue.title}</h2>
                <div class="flex gap-2 justify-stretch items-center">
                    <button class="btn text-white h-5 rounded-full text-[12px] font-medium" style="background-color:${statusBgColor}">${issue.status}</button>
                    <p class="text-[#64748B] text-[12px] font-extralight flex items-center gap-1"><i class="fa-solid fa-circle" style="font-size: 5px;"></i>Opened by ${issue.assignee}</p>
                    <p class="text-[#64748B] text-[12px] font-extralight flex items-center gap-1"><i class="fa-solid fa-circle" style="font-size: 5px;"></i>${formatDate(issue.createdAt)}</p>  
                </div>
                <div>${createElement(issue.labels)}</div>
                <p class="text-[#64748B] text-[12px] font-extralight">${issue.description}</p>
                <div class="bg-[#F8FAFC] rounded-sm px-5 py-3 flex justify-between">
                    <div>
                        <p class="font-[400] text-[16px] text-[#64748B]">Assignee:</p>
                        <h2 class="font-semibold text-[16px] text-[#1F2937]">${issue.assignee}</h2>
                    </div>
                    <div>
                        <p class="font-[400] text-[16px] text-[#64748B]">Priority:</p>
                        <button class="btn bg-[#00A96E] text-white h-5 rounded-full text-[12px] font-medium uppercase" style="background-color:${issuePriority}">${issue.priority}</button>
                    </div>
                </div>
            </div>
    `;

}


// All Issues container started here

async function loadIssues() {
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const issues = await response.json();

    // get container
    const container = document.getElementById("issues-container");
    container.innerHTML = "";

    issues.data.forEach(issue => {

        const iconStatus = issue.status === "closed" ? "./assets/ClosedStatus.png" : "./assets/OpenStatus.png";
        const borderColor = issue.status === "closed" ? "#A855F7" : "#00A96E";

        const div = document.createElement("div");
        div.innerHTML = `
        <div onclick="loadIssuesDetail(${issue.id})" class="border-t-4 rounded-sm p-3 bg-white shadow-sm space-y-3 min-h-60" style="border-color:${borderColor}">
            <div class="flex justify-between items-center">
                <img src="${iconStatus}" alt=""> 
                <button class="btn bg-[#FEECEC] rounded-full h-5 font-medium text-[#EF4444] text-[12px]">${issue.priority}</button>
            </div>

            <h2 class="font-semibold text-[14px] text-[#1F2937]">${issue.title}</h2>
            <p class="text-[#64748B] text-[12px] font-extralight">${issue.description}</p>
            <div>${createElement(issue.labels)}</div>
            <hr class="text-gray-300">
            <p class="text-[#64748B] text-[12px] font-[400]">#1by ${issue.author}</p>
            <p class="text-[#64748B] text-[12px] font-[400]">${formatDate(issue.createdAt)}</p>
        </div>
        `;

        container.appendChild(div);
    });
    issuesCount(issues.data.length);
}


// Open issues container

// load data
async function openIssues() {
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const issues = await response.json();

    // get the container 
    const container = document.getElementById("issues-container");
    container.innerHTML = "";

    // Create loop , create div and append it

    const open = issues.data.filter(issue => issue.status === "open")

    open.forEach(issue => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="border-t-4 border-[#00A96E] rounded-sm p-3 bg-white shadow-sm space-y-3 min-h-60">
            <div class="flex justify-between items-center">
                <img src="./assets/OpenStatus.png" alt=""> 
                <button class="btn bg-[#FEECEC] rounded-full h-5 font-medium text-[#EF4444] text-[12px]">${issue.priority}</button>
            </div>

            <h2 class="font-semibold text-[14px] text-[#1F2937]">${issue.title}</h2>
            <p class="text-[#64748B] text-[12px] font-extralight">${issue.description}</p>
            <hr class="text-gray-300">
            <p class="text-[#64748B] text-[12px] font-[400]">#1by ${issue.author}</p>
            <p class="text-[#64748B] text-[12px] font-[400]">${formatDate(issue.createdAt)}</p>
        </div>
        `;
        container.appendChild(div);
    });

    issuesCount(open.length);
}


// closed issues

// load data
async function ClosedIssues() {
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const issues = await response.json();


    // get the container
    const container = document.getElementById("issues-container");
    container.innerHTML = "";


    // loop create div and append
    const closed = issues.data.filter(issue => issue.status === "closed")
    closed.forEach(issue => {

        const div = document.createElement("div");
        div.innerHTML = `
       <div class="border-t-4 border-[#A855F7] rounded-sm p-3 bg-white shadow-sm space-y-3 min-h-60">
            <div class="flex justify-between items-center">
                <img src="./assets/./ClosedStatus.png" alt="">
                <button
                    class="btn bg-[#FEECEC] rounded-full h-5 font-medium text-[#EF4444] text-[12px]">${issue.priority}</button>
            </div>

            <h2 class="font-semibold text-[14px] text-[#1F2937]">${issue.title}</h2>
            <p class="text-[#64748B] text-[12px] font-extralight">${issue.description}</p>
            <hr class="text-gray-300">
            <p class="text-[#64748B] text-[12px] font-[400]">#1by ${issue.author}</p>
            <p class="text-[#64748B] text-[12px] font-[400]">${formatDate(issue.createdAt)}</p>
        </div>
    `;

        container.appendChild(div);
    })

    issuesCount(closed.length);
}





// Issues count

function issuesCount(count) {
    document.getElementById("issues-counter").textContent = count;
}

loadIssues();
//  activeButton("all-btn");