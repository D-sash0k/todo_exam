const img = document.querySelector(".for_img");
const selects = document.querySelector(".select_status");

const watchSelect = () => {
    selects.style = "display: block";
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
selects.addEventListener("change", changeStatusColor);
img.addEventListener("click", watchSelect);
