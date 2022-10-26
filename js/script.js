{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
                done: false
            }
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done, },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    //nowa funkcja

    const markAllTasksDone = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true,
        }));
        render();
    };

    //nowa funkcja
    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };




    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    //nowa funkcja
    const addTextButtonsEvents = () => {
        const markAllTasksDoneButton = document.querySelector(".js-markAllDone");
        const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");

        if (markAllTasksDoneButton) {
            markAllTasksDoneButton.addEventListener("click", markAllTasksDone);
        };

        if (hideDoneTasksButton) {
            hideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        };
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
           <li class="list__container ${task.done && hideDoneTasks ? "list__item--hidden" : ""}">
                <button class="js-done list__button list__button--done">${task.done ? "✔" : ""}</button> 
                <span class="list__item${task.done ? " list__item--done" : ""}">${task.content}</span>    
                <button class="js-remove list__button list__button--remove"> 🗑 </button>
                                
            </li>
                        
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        // bindEvents(); to usunąć
    };

    // //     // nowa funkcja fu się wykrzaczam
    const renderTextButtons = () => {
        const buttonsContainer = document.querySelector(".js-listTextButtons");

        if (tasks.length === 0) {
            buttonsContainer.innerHTML = "";
            return;
        }

        buttonsContainer.innerHTML = `
    			<button 
    				class="list__textButtonsButton js-hideDoneTasks" 
    				${tasks.some(({ done }) => done) ? "" : "disabled"}
    			>
    				${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
    			</button>
    			<button
    				class="list__textButtonsButton js-markAllDone"
    				${tasks.every(({ done }) => done) ? "disabled" : ""}
    			>
    				Ukończ wszystkie
    			</button>
    		`;
    };

    // // //nowy render

    const render = () => {
        renderTasks();
        bindEvents();
        renderTextButtons();
        addTextButtonsEvents();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask")
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTask.value = "";
        }

        newTask.focus();
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}