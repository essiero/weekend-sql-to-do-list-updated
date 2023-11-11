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
    - complete button
        - onclick attribute to preventDefault, completeTask()
        - completeTask(event) function
            - add completed class
            - edit CSS for .complete to strikethru
        - disable complete button when a to-do has been marked completed
    - delete button
        - onclick attribute to deleteTask()
        - deleteTask(event) function to remove task from database
            - delete request
            - delete route
    

    STRETCH GOALS
        - click on words to edit 
            - might just need to add contentEditable attribute to <td> tag??
        - style like pad of paper with lines
        - animate erase on delete











*/
console.log('JS is sourced!');
getTodos();

// Get request
function getToDos() {
    axios({
        type: 'GET',
        url: '/todos'
    }).then((res) => {
        renderTodos(res.data)
    }).catch((error) => {
console.log('Error in GET request', error)
    });
};

function renderToDos(todos) {
    const taskList = document.getElementById('list');
    taskList.innerHTML = '';
    for (let item of todos){
        taskList.innerHTML +=
        `<li>${item.text}</li>`
    }
}

function handleSubmit(event){
    event.preventDefault();
    // bundles to-do text input into object
    let newTask = {};
    newTask.text = document.getElementById('toDoText').value;
    newTask.isComplete = false;
// POST request for new to-do
    axios({
        method: 'POST',
        url: '/list',
        data: newTask
    }).then((response) => {
        console.log('New task:', response.data);
        getToDos();
    }).catch((error) => {
        console.log('Error in POST', error);
        alert('Unable to add task at this time. See console for more information.')
    })
}

