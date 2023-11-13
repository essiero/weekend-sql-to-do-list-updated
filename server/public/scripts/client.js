/* TO-DO
X create database
X connect server to database
    - 
X form for to-dos
    X input fields for to-do
        - post route
        - post request
            - add form input to database
        X get route
        X get request
            X render response.data to DOM
                X clear list
                X render database list to DOM
    X complete button
        X onclick attribute to preventDefault, completeTask()
        X markAsComplete(event) function
            X add completed class
            X edit CSS for .complete to strikethru
        X disable complete button when a to-do has been marked completed
    X delete button
        X onclick attribute to deleteTask()
        X deleteTask(event) function to remove task from database
            X delete request
            X delete route
    

    STRETCH GOALS
        X click on words to edit 
            X might just need to add contentEditable attribute to <td> tag??
        X style like pad of paper with lines
        - animate erase on delete











*/

console.log('JS is sourced!');
getToDos();

// Get request
function getToDos() {
    axios({
        type: 'GET',
        url: '/todos'
    }).then((res) => {
        renderToDos(res.data)
    }).catch((error) => {
console.log('Error in GET request', error)
    });
};

/* Renders to-do items to list table */
function renderToDos(todos) {
    const taskList = document.getElementById('list');
    taskList.innerHTML = '';
    for (let item of todos){
        taskList.innerHTML +=  ` 
        <tr data-testid="toDoItem" data-todoId="${item.id}" class="${item.isComplete ? 'completed' : 'not_completed'}">
            <td ${item.isComplete ? 'notEditable' : 'contentEditable'}>
                ${item.text}
                </td>
                <td><button data-testid="completeButton" onclick="markAsComplete(event)" ${item.isComplete ? 'disabled' : 'allowed'}>✅
                </button></td>
                <td><button data-testid="deleteButton" onclick="deleteToDo(event)">
                Delete item
                </button></td>
        </tr>
        `
    }
}

function handleSubmit(event){
    event.preventDefault();
    // bundles to-do text input into object
    let newTask = {};
    newTask.text = document.getElementById('toDoText').value;
    newTask.isComplete = false;
    console.log(newTask);
    document.getElementById('toDoText').value = '';
/* POST request for new to-do */
    axios({
        method: 'POST',
        url: '/todos',
        data: newTask
    }).then((response) => {
        console.log('New task:', response.data);
        getToDos();
    }).catch((error) => {
        console.log('Error in POST', error);
        alert('Unable to add task at this time. See console for more information.')
    })
}

// markComplete(event) function here
function markAsComplete(event) {
    event.preventDefault();
    let clickedButton = event.target;
    let TableRow = clickedButton.closest('tr');
    let toDoID = TableRow.getAttribute('data-todoId');
    console.log(toDoID);
    TableRow.classList.add("completed");
    console.log('Task ID', toDoID)

    axios ({
        method: 'PUT',
        url: `todos/${toDoID}`
    }).then((response) => {
        getToDos();
    }).catch((error) => {
        console.log('PUT /todos/:id fail', error)
    })
}

/* Deletes selected To-Do item */
function deleteToDo(event){
    event.preventDefault();
    let clickedButton = event.target;
    let TableRow = clickedButton.closest('tr');
    let toDoID = TableRow.getAttribute('data-todoId');
    console.log('Task ID', toDoID)

    axios({
        method: 'DELETE',
        url: `/todos/${toDoID}`
    }).then((response) => {
        getToDos();
    }).catch((error) => {
        console.log('DELETE /todos/:id fail', error)
    })
    Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    
}