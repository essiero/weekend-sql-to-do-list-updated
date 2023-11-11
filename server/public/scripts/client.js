/* TO-DO
- create database
- connect server to database
    - 
- form for to-dos
    - input fields for to-do
        - post route
        - post request
            - add form input to database
        - get route
        - get request
            - render response.data to DOM
                - clear table
                - render database table to DOM
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
function getTodos() {
    axios({
        type: 'GET',
        url: '/todos'
    }).then((res) => {
        renderTodos(res.data)
    }).catch((error) => {
console.log('Error in GET request', error)
    });
};

function renderTodos(todos) {
    const taskList = document.getElementById('list');
    taskList.innerHTML = '';
    for (let item of todos){
        taskList.innerHTML +=
        `<li>${item.text}</li>`
    }
}