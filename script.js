let title = document.getElementById('title');
let description = document.getElementById('description');
let date = document.getElementById('date');
let priority = document.getElementById('priority');
let btn = document.getElementById('btn');
let tableBody = document.getElementById('task-table');
let completedTask = document.getElementById('completedTask');
let pendingTask = document.getElementById('pendingTask');
let filterBtn = document.getElementById('filter');
let filter = document.getElementById('filterTask')



btn.addEventListener('click', (e) => {
    e.preventDefault();
    const taskTitle = title.value.trim();
    const taskDescription = description.value.trim();
    const taskDate = date.value;
    const taskPriority = priority.value;

    // Check if the task is complete
    const isTaskComplete = taskTitle && taskDescription && taskDate && taskPriority;

    if (!taskTitle || !taskDate) {
        alert('Please fill in the required fields: Task Title and Due Date.');
        return;
    }

    // Create a new row and column
    const newRow = document.createElement('tr');

    const titleColumn = document.createElement('td');
    titleColumn.textContent = taskTitle;

    const descriptionColumn = document.createElement('td');
    descriptionColumn.textContent = taskDescription || 'This is Pending';

    const dateColumn = document.createElement('td');
    dateColumn.textContent = taskDate;

    const priorityColumn = document.createElement('td');
    priorityColumn.textContent = taskPriority || 'This is Pending';

    const actionsColumn = document.createElement('td');

    
    // Added Edit Button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.id = 'edit';
    editBtn.addEventListener('click', () => {
        title.value = taskTitle;
        description.value = taskDescription;
        date.value = taskDate;
        priority.value = taskPriority;
        newRow.parentNode.removeChild(newRow); // Remove row from its current table
    });

    // Added Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.id = 'delete';
    deleteBtn.addEventListener('click', () => {
        newRow.parentNode.removeChild(newRow); // Remove row from its current table
    });

    // Added Mark as Completed Button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Completed';
    completeBtn.id = 'done';
    completeBtn.addEventListener('click', () => {
        if (!taskTitle || !taskDescription || !taskDate || !taskPriority) {
            alert('Something is missing. Task cannot be marked as completed.');
        } else {
            newRow.parentNode.removeChild(newRow); // Remove row from its current table
            completedTask.appendChild(newRow); // Move row to Completed Task Table
            actionsColumn.textContent = ''; // Clear action buttons
            newRow.style.backgroundColor = 'rgb(10, 173, 10)'; 
        }
    });

    // Append buttons to the actions column
    actionsColumn.appendChild(editBtn);
    actionsColumn.appendChild(deleteBtn);
    actionsColumn.appendChild(completeBtn);

    // Append columns to the row
    newRow.appendChild(titleColumn);
    newRow.appendChild(descriptionColumn);
    newRow.appendChild(dateColumn);
    newRow.appendChild(priorityColumn);
    newRow.appendChild(actionsColumn);

    // Add row to the appropriate table
    if (isTaskComplete) {
        tableBody.appendChild(newRow); // Add to main task table
    } else {
        pendingTask.appendChild(newRow); // Add to Pending Task Table
        newRow.style.backgroundColor = 'rgb(236, 55, 55)'; 
    }

    // filter task
    filterBtn.addEventListener('click', () => {
        const priorityFilter = document.getElementById('filterPriority').value;
        const dateFilter = document.getElementById('filterDate').value;
        const statusFilter = document.getElementById('filterStatus').value;
    
        const allTasks = document.querySelectorAll('#task-table tr, #completedTask tr, #pendingTask tr');
        const filterTaskTable = document.getElementById('filterTask');
        const today = new Date();
    
        // Clear the filterTask table
        filterTaskTable.innerHTML = '';
    
        allTasks.forEach(task => {
            let matchesFilter = true;
    
            // Get task details
            const taskPriority = task.querySelector('td:nth-child(4)')?.textContent.trim();
            const taskDate = task.querySelector('td:nth-child(3)')?.textContent.trim();
            const taskStatus = task.parentNode.id;
    
            // Filter by priority
            if (priorityFilter !== 'all' && taskPriority !== priorityFilter.toLowerCase()) {
                matchesFilter = false;
            }
    
            // Filter by due date
            if (dateFilter === '7days' && taskDate) {
                const taskDueDate = new Date(taskDate);
                const daysLeft = Math.ceil((taskDueDate - today) / (1000 * 60 * 60 * 24));
    
                if (daysLeft < 0 || daysLeft > 7) {
                    matchesFilter = false;
                }
            }
    
            // Filter by status
            if (statusFilter === 'pending' && taskStatus !== 'pendingTask') {
                matchesFilter = false;
            }
            if (statusFilter === 'completed' && taskStatus !== 'completedTask') {
                matchesFilter = false;
            }
    
            // If the task matches the filter, clone it and add it to the filterTask table
            if (matchesFilter) {
                const clonedTask = task.cloneNode(true); // Clone the task to prevent removal from the original table
                filterTaskTable.appendChild(clonedTask);
            }
        });
    
        // If no tasks match the filter, display a message
        if (filterTaskTable.innerHTML === '') {
            const noTasksRow = document.createElement('tr');
            const noTasksColumn = document.createElement('td');
            noTasksColumn.colSpan = 5;
            noTasksColumn.textContent = 'No tasks match the selected filters.';
            noTasksColumn.style.textAlign = 'center';
            noTasksRow.appendChild(noTasksColumn);
            filterTaskTable.appendChild(noTasksRow);
        }
    });
    // Clear form inputs
    title.value = '';
    description.value = '';
    date.value = '';
    priority.value = '';
});
