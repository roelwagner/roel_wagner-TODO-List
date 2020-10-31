// create content from api tasks
const displayData = tasks => {
    const todo = document.querySelector("#todo__list");
    todo.innerHTML = "";
    const readyForDom = tasks.forEach(task => {
        // create li tag
        const li = document.createElement("li");
        li.setAttribute("id", task._id);
        li.setAttribute("class", "inputsomething");
        // create checkbox
        const check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.setAttribute("class", "checkbox");
        li.appendChild(check);
        // create span for task text
        const span = document.createElement("span");
        span.setAttribute("class", "task__content");
        li.appendChild(span);
        span.textContent = task.description;
        span.contentEditable = true;
        // create delete option
        const trash = document.createElement("i");
        trash.setAttribute("class", "fa fa-trash-alt");
        li.appendChild(trash);
        // add status
        if(task.done === true){
            check.checked = true;
            span.classList.add("done")
        }
        // add to DOM
        todo.appendChild(li);
    })
    // give function to delete button
    const trashIcons = document.querySelectorAll(".fa-trash-alt");
    trashIcons.forEach(icon => icon.addEventListener("click", removeTask));
    // create function for status change
    const checkBoxes = document.querySelectorAll(".checkbox");
    checkBoxes.forEach(box => box.addEventListener("click", changeStatus));
    // create function for task change
    const spanElements = document.querySelectorAll(".task__content");
    spanElements.forEach(span => span.addEventListener("blur", changeTask));
}

// delete task and show new list
const removeTask = event => {
    const ID = event.target.parentNode.id;
    deleteData(ID).then(() => getData().then(data => displayData(data)));
}
// change status of task
const changeStatus = event =>{
    const ID = event.target.parentNode.id;
    const taskName = event.target.nextSibling.textContent;
    if(event.target.checked){
        changeData(ID, taskName, true).then(() => getData().then(data => displayData(data)));
    } else {
        changeData(ID, taskName, false).then(() => getData().then(data => displayData(data)));
    }
}
// change task description
const changeTask = event => {
    const taskName = event.target.textContent;
    const ID = event.target.parentNode.id;
    
    changeData(ID, taskName).then(() => getData().then(data => displayData(data)));
}

// add task
const task = document.querySelector("#taskname");
const taskButton = document.querySelector("#addtask");

const addTask = () => {
    if(task.value != ""){
        const desc = `${task.value}`;
        const data = {
            description: desc,
            done: false
        }
        postData(data).then(() => getData().then(data => displayData(data)));
        task.value = "";
    }
}

taskButton.addEventListener("click", addTask);
task.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});
// display task list
getData().then(data => displayData(data));
