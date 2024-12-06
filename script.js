let title = document.getElementById('title');
let description = document.getElementById('description');
let date = document.getElementById('date');
let priority = document.getElementById('priority');
let btn = document.getElementById('btn');
let tableBody = document.getElementById('task-table');
let completedTask = document.getElementById('completedTask');
let pendingTask = document.getElementById('pendingTask');
let filterBtn = document.getElementById('filter');



btn.addEventListener('click', (e) => {
    e.preventDefault();
    const taskTitle = title.value.trim();
    const taskDescription = description.value.trim();
    const taskDate = date.value;
    const taskPriority = priority.value;

    if(!taskTitle || !taskDate){
        alert('Please fill in the required field (Task title and Due Date).');
        return;
    }
    const newRow = document.createElement('tr');

    const titleColumn = document.createElement('td');
    titleColumn.textContent = taskTitle;

    const descriptionColumn = document.createElement('td');
    descriptionColumn.textContent = taskDescription;

    const dateColumn = document.createElement('td');
    dateColumn.textContent = taskDate;

    const priorityColumn = document.createElement('td');
    priorityColumn.textContent = taskPriority;

    const actionsColumn = document.createElement('td');
  
    if(!taskTitle || !taskDate || !taskDescription || !taskPriority){
        pendingTask.appendChild(newRow);
        actionsColumn.textContent = '';
        newRow.style.backgroundColor = 'rgb(236, 55, 55)';
        if(!taskDescription){
            descriptionColumn.textContent = 'This is pending';
            descriptionColumn.style.color = 'black';
        }
    }

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.id = 'edit'
    editBtn.addEventListener('click', () => {
        title.value = taskTitle;
        description.value = taskDescription;
        date.value = taskDate;
        priority.value = taskPriority;
        tableBody.removeChild(newRow);
    });

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.id = 'delete';
    deleteBtn.addEventListener('click', () => {
        if (newRow.parentNode === completedTask) {
            completedTask.removeChild(newRow);
        } else {
            tableBody.removeChild(newRow);
        }
    });

    // Mark as a completed button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Completed';
    completeBtn.id = 'done';
    completeBtn.addEventListener('click', () => {
        tableBody.removeChild(newRow);
        completedTask.appendChild(newRow);
        actionsColumn.textContent = '';
        newRow.style.background = 'rgb(10, 173, 10)';
    });
    
    actionsColumn.appendChild(editBtn);
    actionsColumn.appendChild(deleteBtn);
    actionsColumn.appendChild(completeBtn);    


    // filter task
    filterBtn.addEventListener('click', () => {
        
    });


    newRow.appendChild(titleColumn);
    newRow.appendChild(descriptionColumn);
    newRow.appendChild(dateColumn);
    newRow.appendChild(priorityColumn);
    newRow.appendChild(actionsColumn)

    tableBody.appendChild(newRow);
    
    title.value = '';
    description.value = '';
    date.value = '';
    priority.value = 'Low';
});