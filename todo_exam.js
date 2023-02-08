const wrapperItems = document.querySelector(".items_place");
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
    if (todoList.length === 0) {
        wrapperItems.innerHTML = "";
        return;
    }
    
    wrapperItems.innerHTML = todoList.reduce((previousValue, currentValue) => {
        const imageValue = getImageValue(currentValue.status);
        return (previousValue += `
        <li class="todo_item" id="${currentValue.id}">
            <div class="for_img">
                <img class="img_color"
                    src="${imageValue.src}"
                    alt="${imageValue.alt}"/>    
            </div>
            <select class="select_status" onchange="changeItemStatus(this)">
                <option ${
                    currentValue.status === statuses.hold ? "selected" : " "
                }
                    value="${statuses.hold}">${statuses.hold}</option>
                <option ${
                    currentValue.status === statuses.progress ? "selected" : " "
                } 
                    value="${statuses.progress}">${statuses.progress}</option>
                <option ${
                    currentValue.status === statuses.done ? "selected" : " "
                }  
                    value="${statuses.done}">${statuses.done}</option> 
            </select>
            <p class="text_task">${currentValue.name}</p>
            <div class="status_color" style="${imageValue.levelColor}">
                ${imageValue.level}</div>
            <img class="imagine" src="./img/img_basked.jpg" />
        </li>`);
    }, "");
};

const localStorageActions = {
    setTodoList: (list) => localStorage.setItem("todo", JSON.stringify(list)),
    getTodoList: () =>
        localStorage.todo ? JSON.parse(localStorage.getItem("todo")) : "",
};

const changeItemStatus = (event) => {
    const status = event.value;
    const itemId = event.parentElement.id;
    const currentItem = todoList.find((item) => item.id === itemId);

    if (!currentItem) {
        alert("Not found currentItem");
        return;
    }

    currentItem.status = status;
    displayTodoList();
    localStorageActions.setTodoList(todoList);
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
    localStorageActions.setTodoList(todoList);
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
    localStorageActions.setTodoList(todoList);
};

// initial render
{
    todoList = localStorageActions.getTodoList();
    displayTodoList();
}

wrapperItems.addEventListener("click", deleteItem); // delete item with image
wrapperItems.addEventListener("click", watchSelect);
buttonAdd.addEventListener("click", addItemWithButton); //add item with button
writeInput.addEventListener("keypress", addItemWithEnter); // add item with Enter
