const wrapperItems = document.querySelector(".wrapper_items");
const writeInput = document.querySelector(".write_text");
const buttonAdd = document.querySelector(".add_btn");

const statuses = {
    hold: "hold",
    progress: "progress",
    done: "done",
};

const getImageValue = (status) => {
    if (status === statuses.hold) {
        return {
            src: "./img/grey.jpg",
            alt: "grey",
            level: statuses.hold,
            levelColor: "background-color: rgb(136, 136, 136)",
        };
    }
    if (status === statuses.progress) {
        return {
            src: "./img/yellow.jpg",
            alt: "yellow",
            level: statuses.progress,
            levelColor: "background-color: rgb(250, 160, 5)",
        };
    }
    if (status === statuses.done) {
        return {
            src: "./img/green.jpg",
            alt: "green",
            level: statuses.done,
            levelColor: "background-color: rgb(28, 201, 109)",
        };
    }
};

let todoList = [];

const displayTodoList = () => {
    let display = "";
    if (todoList.length === 0) wrapperItems.innerHTML = "";
    todoList.forEach(function (item) {
        const imageValue = getImageValue(item.status);
        display += `
        <li class="todo_item" id="${item.id}">
            <div class="for_img">
                <img class="img_color"
                    src="${imageValue.src}"
                    alt="${imageValue.alt}"/>    
            </div>
            <select class="select_status" onchange="changeItemStatus(this)">
                <option ${item.status === statuses.hold ? "selected" : " "}
                    value="${statuses.hold}">${statuses.hold}</option>
                <option ${item.status === statuses.progress ? "selected" : " "} 
                    value="${statuses.progress}">${statuses.progress}</option>
                <option ${item.status === statuses.done ? "selected" : " "}  
                    value="${statuses.done}">${statuses.done}</option> 
            </select>
            <p class="text_task">${item.name}</p>
            <div class="status_color" style="${imageValue.levelColor}">
                ${imageValue.level}</div>
            <img class="imagine" src="./img/img_basked.jpg" />
        </li>`;
        wrapperItems.innerHTML = display;
    });
};

const localAllStorage = {
    setTodoList: (list) => {
        localStorage.setItem("todo", JSON.stringify(list));
    },
    getTodoList: () => {
        return JSON.parse(localStorage.getItem("todo"));
    },
};

const changeItemStatus = (event) => {
    const status = event.value;
    const itemId = event.parentElement.id;
    const currentItem = todoList.find((item) => {
        return item.id === itemId;
    });
    !currentItem && alert("Not found currentItem");
    currentItem.status = status;
    displayTodoList();
    localAllStorage.setTodoList(todoList);
};

const watchSelect = (e) => {
    if (e.target.closest("li")) {
        e.target.closest("li").children[1].style = "display: block";
    }
};

const enterCorrectItem = () => {
    writeInput.classList.add("incorrect");
    writeInput.placeholder = "ENTER A TASK...";
    writeInput.value = "";
};

const addItemWithButton = () => {
    if (!writeInput.value.trim()) return enterCorrectItem();
    writeInput.placeholder = "What do you want to do?...";
    writeInput.classList.remove("incorrect");
    const todoItem = {
        name: writeInput.value,
        status: statuses.hold,
        id: "todoItem_" + Math.random(),
    };
    todoList.push(todoItem);
    displayTodoList();
    localAllStorage.setTodoList(todoList);
    writeInput.value = "";
};
const addItemWithEnter = (e) => {
    e.key === "Enter" && addItemWithButton();
};

const deleteItem = (e) => {
    if (!e.target.closest(".imagine")) return;
    const elementLi = e.target.parentElement;
    let deleteItem = todoList.findIndex((item) => {
        return item.id === elementLi.id;
    });
    elementLi.remove();
    todoList.splice(deleteItem, 1);
    localAllStorage.setTodoList(todoList);
};

// initial render
if (localStorage.todo) {
    todoList = localAllStorage.getTodoList();
    displayTodoList();
}

wrapperItems.addEventListener("click", deleteItem); // delete item with image
wrapperItems.addEventListener("click", watchSelect);
buttonAdd.addEventListener("click", addItemWithButton); //add item with button
writeInput.addEventListener("keypress", addItemWithEnter); // add item with Enter
