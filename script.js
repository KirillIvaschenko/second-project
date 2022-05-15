"use strict"
class Todo {

    id = 1; // переменная для id таска, которая будет увеличиваться на один с каждый добавлением
    taskList = [];  // список всех тасков
    htmlTaskList = document.getElementById('taskList'); // html-елемент ul
    htmlTaskInput = document.getElementById('taskInput'); // html-елемент input
    
    constructor() {}

    addTask() {
        if(this.id >= 6) {
            this.id = 0
        }
        let task = {
            id: this.id++, // id - как свойство класса, которое с каждым добавлением увеличивается
            taskText: this.htmlTaskInput.value, // значние input-а в момент вызова метода
            doneStatus: false, // статус задачи при создании всегда false
        }; // формируем обьект задачи
        
        this.taskList.push(task); // добавляем задачу в массив

        let taskElement = document.createElement('li'); // создаем в JS html-елемент  li
        taskElement.innerHTML = `
            <div class='add-div'>
                <p class='task-text'> ${task.id})  ${(task.taskText === '') ? 'пусто' : task.taskText} </p>
                <button class='remove-button'>delete</button>
                
                <button class='done-status'>✔</button>
                <button class='no-done-status'>×</button>

            </div>`;
        // заполняем его html кодом , с нужными нам полями для отображения
        this.htmlTaskInput.value = ''
        let taskDeleteButton = taskElement.getElementsByTagName('button')[0];
        
        // ищем кнопку delete Task
        taskDeleteButton.addEventListener('click', ($event) => { // вещаем событие click на кнопку удалить
            // получаем событие от браузера с данными о нажатой кнопке
            let listItem = $event.target.parentNode.parentElement;
            // event.target - button
            // event.target.parentNode - div
            // event.target.parentNode.parentElement - li
            let taskDescriptionElement = $event.target.parentNode.children[0];
            console.log('1 - ',$event.target);
            console.log('2 - ',$event.target.parentNode);
            console.log('3 - ',$event.target.parentNode.children);
            console.log('4 - ',$event.target.parentNode.children[0]);
            
            // taskDescriptionElement = <p> с контентом внутри
            let taskID = Number(taskDescriptionElement.textContent.split(')')[0]);
            console.log('id - ',taskID);
            for (let i= 0; i < this.taskList.length; i++){
                if (this.taskList[i].id === taskID){
                   this.taskList.splice(i, 1);
                }
            }
            listItem.remove(); // удаляет li
            this.id - 1
        });
        //
        let doneStatusButton = taskElement.getElementsByTagName('button')[1];
        doneStatusButton.addEventListener('click',($event)=> {
            let taskDescriptionElement2 = $event.target.parentNode.children[0];
            // console.log('1 - ',$event.target);
            // console.log('2 - ',$event.target.parentNode);
            // console.log('3 - ',$event.target.parentNode.children);
            // console.log('4 - ',$event.target.parentNode.children[0]);
            // taskDescriptionElement = <p> с контентом внутри
            let taskID2 = Number(taskDescriptionElement2.textContent.split(')')[0]);
            // console.log(taskID2);
            // console.log(document.getElementsByClassName('add-div'));
            // console.log(document.getElementsByClassName('done-status'));
            
            for (let i = 0; i < this.taskList.length; i++) {
                if (this.taskList[i].id === taskID2){
                    //смена цвета фона
                    let addictionDiv = document.getElementsByClassName('add-div')[i].style.background = '#00FF00'
                    //смена цвета переключателя с галкой 
                    document.getElementsByClassName('done-status')[i].style.background = '#DA70D6'

                    this.taskList[i].doneStatus = true
                    console.log(this.taskList[i].doneStatus);
                 }
            }   

        });
        let changeStatusButton = taskElement.getElementsByTagName('button')[2];
        console.log(changeStatusButton);
        changeStatusButton.addEventListener('click',($event)=> {
            let taskDescriptionElement3 = $event.target.parentNode.children[0];
            let taskID3 = Number(taskDescriptionElement3.textContent.split(')')[0]);
            for (let i = 0; i < this.taskList.length; i++) {
                if (this.taskList[i].id === taskID3){
                    //смена цвета фона
                    document.getElementsByClassName('add-div')[i].style.background = ''
                    //смена цвета переключателя с галкой 
                    document.getElementsByClassName('done-status')[i].style.background = '#00FF7F'

                    this.taskList[i].doneStatus = false
                    console.log(this.taskList[i].doneStatus);
                 }
            }
            




        
        });


        this.htmlTaskList.appendChild(taskElement);

        // добавляет html елемент в htmlTaskList

        console.log(this.taskList);
    }
}
let todo = new Todo();
let addTaskButton = document.getElementById('addTask');
addTaskButton.addEventListener('click', () => todo.addTask());





