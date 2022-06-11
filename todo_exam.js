const img = document.querySelector(".for_img");
const selects = document.querySelector(".select_status");
const wrapperItems = document.querySelector(".wrapper_items");
const writeInput = document.querySelector(".write_text");
const buttonAdd = document.querySelector(".add_btn");

const watchSelect = (e) => {
    if (e.target.closest(".todo_item")) {
        selects.style = "display: block";
    }
};

const changeStatusColor = (e) => {
    const img = document.querySelector(".img_color");
    const statusColor = document.querySelector(".status_color");
    let ePrevious;

    if (ePrevious != e.target.value) {
        if (e.target.value === "in_progress") {
            img.src = "./img/yellow.jpg";
            statusColor.textContent = "in progress";
            statusColor.style = "background-color: rgb(250, 160, 5);";
        }
        if (e.target.value === "hold") {
            img.src = "./img/grey.jpg";
            statusColor.textContent = "hold";
            statusColor.style = "background-color: rgb(136, 136, 136);";
        }
        if (e.target.value === "done") {
            img.src = "./img/green.jpg";
            statusColor.textContent = "done";
            statusColor.style = "background-color: rgb(28, 201, 109);";
        }
        selects.style = "display: none;";
    }
    ePrevious = e.target.value;
};

const enterCorrectItem = () => {
    writeInput.classList.add("incorrect");
    writeInput.placeholder = "ENTER A TASK...";
    writeInput.value = "";
};

const displayMessages = () => {
    wrapperItems.innerHTML += `<li class="todo_item">
    <div class="for_img" id="img_src">
        <img
            class="img_color"
            src="./img/grey.jpg"
            alt="silver"
        />
    </div>
    <form method="get">
        <select class="select_status">
            <option id="hold" value="hold">hold</option>
            <option
                id="in_progress"
                value="in_progress"
            >
                in progress
            </option>
            <option id="done" value="done">done</option>
        </select>
    </form>
    <p class="text_task">${writeInput.value}</p>
    <div class="status_color">hold</div>
    <img class="imagine" src="./img/img_basked.jpg" />
</li>`;
    writeInput.placeholder = "What do you want to do?...";
    writeInput.classList.remove("incorrect");
    writeInput.value = "";
};

const addItemWithButton = () => {
    if (!writeInput.value.trim()) return enterCorrectItem();
    displayMessages();
};

const addItemWithEnter = (e) => {
    if (e.key === "Enter") {
        if (!writeInput.value.trim()) return enterCorrectItem();
        displayMessages();
    }
};

selects.addEventListener("change", changeStatusColor);
wrapperItems.addEventListener("click", watchSelect);
writeInput.addEventListener("keypress", addItemWithEnter); // add item with Enter
buttonAdd.addEventListener("click", addItemWithButton); //add item with button
