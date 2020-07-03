"use strict";
window.onload = function () {
    // ==================================
    // HIDE-SHOW LEFT SIDE MENU BAR FUNCTION
    // ==================================
    if (matchMedia) {
        let screen = window.matchMedia("(max-width:850px)");
        screen.addListener(changes);
        changes(screen);
    };
    function changes(e){
        if (e.matches) {
            document.querySelector("#nav").style.display = "none";
            document.querySelector("#container-main").style.gridTemplateColumns = "0 100%";
        } else {
            document.querySelector("#nav").style.display = "block";
            document.querySelector("#container-main").style.gridTemplateColumns = "300px calc(100% - 300px)";
            document.querySelector("#left-menu-fullbackground").style.display = "none";
        }
    };
    function viewLeftMenu () {
        if (window.matchMedia('(max-width:850px)').matches) {
            document.querySelector("#nav").style.display = "block";
            document.querySelector("#left-menu-fullbackground").style.display = "block";
        } else {
            document.querySelector("#nav").style.display = "block";
            document.querySelector("#container-main").style.gridTemplateColumns = "300px calc(100% - 300px)";
        }       
    };
    function hideLeftMenu () {
        if (window.matchMedia('(max-width:850px)').matches) {
            document.querySelector("#nav").style.display = "none";
            document.querySelector("#left-menu-fullbackground").style.display = "none";
        } else {
            document.querySelector("#nav").style.display = "none";
            document.querySelector("#container-main").style.gridTemplateColumns = "0% 100%";
        }
    };
    function toogleLeftMenu() {
        if (document.querySelector("#nav").style.display == "block") {
            hideLeftMenu ()
        }
        else { 
            viewLeftMenu ()
        }
    };
    document.querySelector("#menu-hide").onclick = function() {
        toogleLeftMenu();
    };
    // ==================================
    // AJAX - START
    // ==================================
    function singlePageChange(link, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", link);
        xhr.send();
        xhr.onload = function() {
            let elem = document.createElement('html')
            elem.innerHTML = xhr.response;
            document.querySelector("#nav").innerHTML = elem.querySelector("#nav").innerHTML;
            document.querySelector("#article").innerHTML = elem.querySelector("#article").innerHTML;  
            callback();
        }
    };
    document.querySelector("#btnHome").onclick = function() {
        singlePageChange("https://oyusipenko.github.io/To-Do-list/index.html", btnHome);
    };
    document.querySelector("#btnTask").onclick = function() {
        singlePageChange("https://oyusipenko.github.io/To-Do-list/task.html", btnTask);
    };
    document.querySelector("#btnTarget").onclick = function() {
        singlePageChange("https://oyusipenko.github.io/To-Do-list/target.html", btnTarget);
    };
    document.querySelector("#btnHabbit").onclick = function() {
        singlePageChange("https://oyusipenko.github.io/To-Do-list/habbit.html", btnHabbit);
    };
    document.querySelector("#btnAct").onclick = function() {
        singlePageChange("https://oyusipenko.github.io/To-Do-list/act.html", btnAct);
    };
    // ==================================
    // AJAX - END
    // ==================================

    // ==================================
    // HOME - START
    // ==================================
    function homeQuantity() {
        homeTaskQuantity();
        homeTargetQuantity();
        homeHabbitQuantity();
        homeActQuantity();
    };
    function btnHome() {
        popUpHome();
        addTaskHome();
        addTargetHome();
        addHabbitHome();
        addActHome();
        homeQuantity();
    };
    btnHome();
    // ==================================
    // HOME - END
    // ==================================

    // ==================================
    // POP-UP - START
    // ==================================
    function popUpHome() {
        popUpTask();
        popUpTarget();
        popUpHabbit();
        popUpAct();
    };
    function popUpTask() {
        document.querySelector("#openPopupTask").onclick = function () {
            document.querySelector("#left-menu-fullbackground").style.display = "block";
            document.querySelector("#popupTaskForm").style.display = "block";
        }
        document.querySelector("#closePopupTask").onclick = function () {
            document.querySelector("#left-menu-fullbackground").style.display = "none";
            document.querySelector("#popupTaskForm").style.display = "none";
        }
    };
    function popUpTarget() {
        document.querySelector("#openPopupTarget").onclick = function () {
            document.querySelector("#left-menu-fullbackground").style.display = "block";
            document.querySelector("#popupTargetForm").style.display = "block";
        }
        document.querySelector("#closePopupTarget").onclick = function () {
            document.querySelector("#left-menu-fullbackground").style.display = "none";
            document.querySelector("#popupTargetForm").style.display = "none";
        }  
    };
    function popUpTargetEdit() {
        document.querySelector("#closePopupTargetEdit").onclick = function () {
            document.querySelector("#left-menu-fullbackground").style.display = "none";
            document.querySelector("#popupTargetFormEdit").style.display = "none";
        }  
    };
    function popUpHabbit() {
        document.querySelector("#openPopupHabbit").onclick = function () {
            document.querySelector("#left-menu-fullbackground").style.display = "block";
            document.querySelector("#popupHabbitForm").style.display = "block";
        }
        document.querySelector("#closePopupHabbit").onclick = function () {
            document.querySelector("#left-menu-fullbackground").style.display = "none";
            document.querySelector("#popupHabbitForm").style.display = "none";
        }  
    };
    function popUpHabbitEdit() {
        document.querySelector("#closePopupHabbitEdit").onclick = function () {
            document.querySelector("#left-menu-fullbackground").style.display = "none";
            document.querySelector("#popupHabbitFormEdit").style.display = "none";
        }  
    };
    function popUpAct() {
        document.querySelector("#openPopupAct").onclick = function () {
            document.querySelector("#left-menu-fullbackground").style.display = "block";
            document.querySelector("#popupActForm").style.display = "block";
        }
        document.querySelector("#closePopupAct").onclick = function () {
            document.querySelector("#left-menu-fullbackground").style.display = "none";
            document.querySelector("#popupActForm").style.display = "none";
        }  
    };
    function popUpActEdit() {
        document.querySelector("#closePopupActEdit").onclick = function () {
            document.querySelector("#left-menu-fullbackground").style.display = "none";
            document.querySelector("#popupActFormEdit").style.display = "none";
        }  
    };
    // ==================================
    // POP-UP - END
    // ==================================

    // ==================================
    // TASK - START
    // ==================================

    function addTaskToArray() {
        let newTask = {
            "taskTitle": taskTitle,
            "project": "Inbox",
            "status": "Active"
        }
        let arrTaskList = JSON.parse(localStorage.getItem("arrTaskListLocal"));
        if(arrTaskList == null) arrTaskList = [];
        arrTaskList.push(newTask);
        localStorage.setItem("arrTaskListLocal", JSON.stringify(arrTaskList));
    };
    function addTask() {
        document.querySelector("#addTask").onclick = function () {
            taskTitle = document.querySelector("#addTaskText").value;
            addTaskToArray();
            makeTaskList("Active");
            document.querySelector("#left-menu-fullbackground").style.display = "none";
            document.querySelector("#popupTaskForm").style.display = "none";
            document.querySelector("#taskContainerActive").style.display = "block";
            document.querySelector("#taskContainerComplete").style.display = "none";
        };
    };
    function addTaskHome() {
        document.querySelector("#addTask").onclick = function () {  
            taskTitle = document.querySelector("#addTaskText").value;
            addTaskToArray();
            document.querySelector("#left-menu-fullbackground").style.display = "none";
            document.querySelector("#popupTaskForm").style.display = "none";
            homeTaskQuantity();
        };
    };
    function addTaskFast() {
        document.querySelector("#addTaskFast").onclick = function () {  //Создание объекта-задачи и добавление его в массив и локальный масиив.
            taskTitle = document.querySelector("#addTaskTextFast").value;
            addTaskToArray();
            makeTaskList("Active");
        };
    };
    function makeTaskList(status) {
        document.querySelector('#tableTask').innerHTML = '';
        let tableTask = document.querySelector('#tableTask');
        let arrTaskList = JSON.parse(localStorage.getItem("arrTaskListLocal"));
        if(arrTaskList == null) arrTaskList = [];
        for (let taskId = 0;  taskId < arrTaskList.length; taskId++) {
            if (arrTaskList[taskId].status == status) {
                // Container
                let div3 = document.createElement('div');
                div3.setAttribute("class", "tableTaskListContainer");
                tableTask.append(div3);
                // Checkbox
                if (arrTaskList[taskId].status !== "Done") {
                    let div2 = document.createElement('input');
                    div2.setAttribute("type", "checkbox" );
                    div2.setAttribute("class", "tableTaskListCheckbox" );
                    div2.setAttribute("id", [taskId]+"-1"); // это номер таски в массиве.
                    div3.append(div2);
                }
                if (arrTaskList[taskId].status == "Done") {
                    let button3 = document.createElement('button')
                    button3.setAttribute("class", "tableTaskSecondButtonDel" );
                    button3.setAttribute("id", [taskId]+"-2"); 
                    button3.innerHTML = ("Уничтожить")
                    div3.append(button3);
                }
                // Task
                let div1 = document.createElement('div');
                div1.setAttribute("class", "tableTaskList" );
                div1.setAttribute("id", "Task-" + [taskId]);
                div1.innerHTML = arrTaskList[taskId].taskTitle;
                div3.append(div1);
            }   
        }
    };
    function deleteTask() {
        let listTask = document.querySelector('#tableTask');
        listTask.addEventListener('click', function(event) {
            let target = event.target;
            let str = target.id;
            let substr = str.split("-");
            let tasktId = substr[0];
            let action = substr[1];
            let arrTaskList = JSON.parse(localStorage.getItem("arrTaskListLocal"));
            if (action == 1) {
                arrTaskList[tasktId].status = "Done";
                localStorage.setItem("arrTaskListLocal", JSON.stringify(arrTaskList));
                makeTaskList("Active");
            } else if (action == 2) {
                arrTaskList.splice([tasktId], 1);
                localStorage.setItem("arrTaskListLocal", JSON.stringify(arrTaskList));
                makeTaskList("Done");
            }
        });
    };
    function viewTasksActive() {
        makeTaskList("Active");
        document.querySelector("#taskContainerActive").style.display = "block";
        document.querySelector("#taskContainerComplete").style.display = "none";
    };
    function viewTasksDone() {
        makeTaskList("Done");
        document.querySelector("#taskContainerActive").style.display = "none";
        document.querySelector("#taskContainerComplete").style.display = "block";
    };
    function btnTask() {
        makeTaskList("Active");
        addTask();
        addTaskFast();
        deleteTask();
        popUpTask();
        document.querySelector("#btnTaskActive").onclick = viewTasksActive;
        document.querySelector("#btnTaskDone").onclick = viewTasksDone;
    };
    function homeTaskQuantity() {
        var arrTaskList = JSON.parse(localStorage.getItem("arrTaskListLocal"));
        if(arrTaskList == null) arrTaskList = [];
        let taskQuantity = 0;
        for (let taskId = 0; taskId < arrTaskList.length; taskId++) {
            if (arrTaskList[taskId].status == "Active") {
                taskQuantity++
            }
        }
        let x =  document.querySelector("#homeTaskQ");
        x.innerHTML = taskQuantity;
    };
    // ==================================
    // TASK - END
    // ==================================

    // ==================================
    // TARGET - START
    // ==================================
    function addTargetToArray() {
        let targetName = document.querySelector("#addTargetName").value;
        let targetDesc = document.querySelector("#addTargetDesc").value;
        let targetDone = document.querySelector("#addTargetDone").value;
        let newTarget = {
            "targetName": targetName,
            "targetDesc": targetDesc,
            "targetDone": targetDone,
            "status": "Active",
            "month": "June",
            "monthDay": {
            }
        }
        for (let dayNumber = 1; dayNumber < 31; dayNumber++) {
            newTarget.monthDay["Day"+[dayNumber]] = "-";
        }
        let arrTargetList = JSON.parse(localStorage.getItem("arrTargetListLocal"));
        if(arrTargetList == null) arrTargetList = [];
        arrTargetList.push(newTarget);
        localStorage.setItem("arrTargetListLocal", JSON.stringify(arrTargetList));
    };
    function addTarget() {
        document.querySelector("#addTarget").onclick = function () {
            addTargetToArray();
            document.querySelector("#left-menu-fullbackground").style.display = "none";
            document.querySelector("#popupTargetForm").style.display = "none";
            targetTableBuilder();
            targetTableSecondBuilder("Active");
        };
    };
    function addTargetHome() {
        document.querySelector("#addTarget").onclick = function () {
            addTargetToArray();
            document.querySelector("#left-menu-fullbackground").style.display = "none";
            document.querySelector("#popupTargetForm").style.display = "none";
            homeTargetQuantity();
        };
    };
    function targetTableBuilder() {
        document.querySelector('#tableTarget').innerHTML = '';
        let arrTargetList = JSON.parse(localStorage.getItem("arrTargetListLocal"));
        if(arrTargetList == null) arrTargetList = [];
        let tr = document.createElement('tr');
        for (let dayNumber = 0; dayNumber < 31; dayNumber++) {                           // Первая строка             
            let td = document.createElement('td');
            if (dayNumber == 0 ) {
                td.innerHTML = 'Цель';
                td.setAttribute("style", "width: 200px;" );
                tr.append(td);
            } else {
                td.innerHTML = [dayNumber];
                tr.append(td);
            }
            tableTarget.append(tr);    
        } 
        for (let targetId = 0; targetId < arrTargetList.length; targetId++) {    // Тело таблицы
            let tr = document.createElement('tr');
            for (let dayNumber = 0; dayNumber < 31; dayNumber++) { 
                let td = document.createElement('td');
                let arrTargetList = JSON.parse(localStorage.getItem("arrTargetListLocal"));
                if (arrTargetList[targetId].status == "Active") { 
                    if (dayNumber == 0 ) {
                        td.innerHTML = arrTargetList[targetId].targetName;
                        td.setAttribute("style", "width: 100px;" );
                        tr.append(td);
                    } else {
                        // divChangeStatus
                        let div = document.createElement('div');
                        div.setAttribute("class", "tableTargetChangeStatus" );
                        div.setAttribute("id", [targetId]+"-"+[dayNumber]); 
                        div.innerHTML = arrTargetList[targetId].monthDay["Day"+[dayNumber]];
                        if (arrTargetList[targetId].monthDay["Day"+[dayNumber]] == "-") {
                            div.setAttribute("class", "targetDayNone" );
                        } else if (arrTargetList[targetId].monthDay["Day"+[dayNumber]] == "&#10025") {
                            div.setAttribute("class", "targetDayPlan" );
                        } else if (arrTargetList[targetId].monthDay["Day"+[dayNumber]] == "&#10003") {
                            div.setAttribute("class", "targetDayDone" );
                        }
                        td.append(div);
                        tr.append(td);
                    }
                }
            } tableTarget.append(tr); 
        }
    };
    function targetTableSecondBuilder(status) {
        document.querySelector('#tableTargetSecond').innerHTML = '';
        let arrTargetList = JSON.parse(localStorage.getItem("arrTargetListLocal"));
        if(arrTargetList == null) arrTargetList = [];
        let tr = document.createElement('tr');
        for (let i = 0; i < 5; i++) {                                  // Шапка
            let td = document.createElement('td');
            if (i == 0 ) {
                td.innerHTML = 'Наименование цели';
                td.setAttribute("style", "width: 236px;" );
                tr.append(td);
            } else if (i == 1) {
                td.innerHTML = 'Описание цели';
                td.setAttribute("style", "width: 350px;" );
                tr.append(td);
            } else if (i == 2) {
                td.innerHTML = 'Критерий выполнения';
                td.setAttribute("style", "width: 200px;" );
                tr.append(td);
            } else if (i == 3) { 
                td.innerHTML = 'Действия';
                td.setAttribute("style", "width: 200px;" );
                tr.append(td);
            }
            tableTargetSecond.append(tr);    
        } 
        for (let targetId = 0; targetId < arrTargetList.length; targetId++) {
            let tr = document.createElement('tr');
            for (let i = 0; i < 5; i++) {    // i - номер столбца
                let td = document.createElement('td');
                let arrTargetList = JSON.parse(localStorage.getItem("arrTargetListLocal"));
                if (arrTargetList[targetId].status == status) { 
                    if (i == 0 ) {
                        td.innerHTML = arrTargetList[targetId].targetName;
                        tr.append(td);
                    } else if (i == 1) {
                        td.innerHTML = arrTargetList[targetId].targetDesc;
                        tr.append(td);
                    } else if (i == 2) {
                        td.innerHTML = arrTargetList[targetId].targetDone;
                        tr.append(td);
                    } else if (i == 3 && status == "Active")  { 
                        let button1 = document.createElement('button');
                        let button2 = document.createElement('button');
                        let button3 = document.createElement('button');
                        button1.setAttribute("class", "tableTargetSecondButton" );
                        button1.setAttribute("id", [targetId]+"-1"); 
                        button1.innerHTML = ("Цель достигнута!")
                        button2.setAttribute("class", "tableTargetSecondButton" );
                        button2.setAttribute("id", [targetId]+"-2"); 
                        button2.innerHTML = ("Редактировать")
                        button3.setAttribute("class", "tableTargetSecondButton" );
                        button3.setAttribute("id", [targetId]+"-3"); 
                        button3.innerHTML = ("Удалить")
                        td.append(button1);
                        td.append(button2);
                        td.append(button3);
                        tr.append(td);
                    } else if (i == 3 && status == "Complete") { 
                        let button2 = document.createElement('button');
                        button2.setAttribute("class", "tableTargetSecondButton" );
                        button2.setAttribute("id", [targetId]+"-4"); 
                        button2.innerHTML = ("Сделать активной")
                        td.append(button2);
                        tr.append(td);
                    } else if (i == 3 && status == "Deleted") { 
                        let button2 = document.createElement('button');
                        let button3 = document.createElement('button');
                        button2.setAttribute("class", "tableTargetSecondButton" );
                        button2.setAttribute("id", [targetId]+"-5"); 
                        button2.innerHTML = ("Сделать активной")
                        button3.setAttribute("class", "tableTargetSecondButtonDel" );
                        button3.setAttribute("id", [targetId]+"-6");
                        button3.innerHTML = ("Уничтожить")
                        td.append(button2);
                        td.append(button3);
                        tr.append(td);
                    }

                }
            } tableTargetSecond.append(tr); 
        }
    };
    function tableTargetSecondButtons () {
        tableTargetSecond.addEventListener('click', function(event) {

            let target = event.target; // Разбивка строки
            let str = target.id;
            let substr = str.split("-");
            let targetId = substr[0];
            let action = substr[1];

            //Action:
            //1 - Цель достигнута!
            //2 - Редактировать
            //3 - Удалить
            //4 - Сделать активной 
            //5 - Сделать активной с другой вкладки
            //6 - Уничтожить

            let arrTargetList = JSON.parse(localStorage.getItem("arrTargetListLocal"));
            if (action == 1) {
                arrTargetList[targetId].status = "Complete";
                localStorage.setItem("arrTargetListLocal", JSON.stringify(arrTargetList));
                targetTableBuilder();
                targetTableSecondBuilder("Active");
            } else if (action == 2) {
                document.querySelector("#left-menu-fullbackground").style.display = "block";
                document.querySelector("#popupTargetFormEdit").style.display = "block";
                addTargetNameEdit.setAttribute("value", arrTargetList[targetId].targetName);
                addTargetDescEdit.innerHTML = arrTargetList[targetId].targetDesc;
                addTargetDoneEdit.setAttribute("value", arrTargetList[targetId].targetDone);
                document.querySelector("#addTargetEdit").onclick = function () {  
                    let arrTargetList= JSON.parse(localStorage.getItem("arrTargetListLocal"));
                    if(arrTargetList == null) arrTargetList = [];
                    arrTargetList[targetId].targetName = document.querySelector("#addTargetNameEdit").value;
                    arrTargetList[targetId].targetDesc = document.querySelector("#addTargetDescEdit").value;
                    arrTargetList[targetId].targetDone = document.querySelector("#addTargetDoneEdit").value;
                    localStorage.setItem("arrTargetListLocal", JSON.stringify(arrTargetList));
                    document.querySelector("#left-menu-fullbackground").style.display = "none";
                    document.querySelector("#popupTargetFormEdit").style.display = "none";
                    targetTableBuilder();
                    targetTableSecondBuilder("Active");
                    };
            } else if (action == 3) {
                arrTargetList[targetId].status = "Deleted";
                localStorage.setItem("arrTargetListLocal", JSON.stringify(arrTargetList));
                targetTableBuilder();
                targetTableSecondBuilder("Active");
            } else if (action == 4) {
                arrTargetList[targetId].status = "Active";
                localStorage.setItem("arrTargetListLocal", JSON.stringify(arrTargetList));
                targetTableBuilder();
                targetTableSecondBuilder("Complete");
            } else if (action == 5) {
                arrTargetList[targetId].status = "Active";
                localStorage.setItem("arrTargetListLocal", JSON.stringify(arrTargetList));
                targetTableBuilder();
                targetTableSecondBuilder("Deleted");
            } else if (action == 6) {
                arrTargetList.splice([targetId], 1);
                localStorage.setItem("arrTargetListLocal", JSON.stringify(arrTargetList));
                targetTableBuilder();
                targetTableSecondBuilder("Deleted");
            }
        });
    };
    function tableTargetChangeStatus() {
        tableTarget.addEventListener('click', function(event) {

            let target = event.target;  // Разбивка строки
            let str = target.id;
            let substr = str.split("-");
            let targetId = substr[0];
            let dayNumber = substr[1];

            let arrTargetList = JSON.parse(localStorage.getItem("arrTargetListLocal"));
            if ( arrTargetList[targetId].monthDay["Day"+[dayNumber]] == "-") {
                arrTargetList[targetId].monthDay["Day"+[dayNumber]] = "&#10025";
            } else if (arrTargetList[targetId].monthDay["Day"+[dayNumber]] == "&#10025") {
                arrTargetList[targetId].monthDay["Day"+[dayNumber]] = "&#10003";
            } else if (arrTargetList[targetId].monthDay["Day"+[dayNumber]] == "&#10003") {
                arrTargetList[targetId].monthDay["Day"+[dayNumber]] = "-"
            }
            localStorage.setItem("arrTargetListLocal", JSON.stringify(arrTargetList));
            targetTableBuilder();
        });
    };
    function btnTarget() {
        targetTableBuilder();
        tableTargetChangeStatus();
        addTarget();
        popUpTarget();
        popUpTargetEdit();
        targetTableSecondBuilder("Active");
        tableTargetSecondButtons();
        document.querySelector("#targetActive").onclick = function() {
            targetTableSecondBuilder("Active");
            document.querySelector("#targetContainerSecondActive").style.display = "block";
            document.querySelector("#targetContainerSecondComplete").style.display = "none";
            document.querySelector("#targetContainerSecondDeleted").style.display = "none";
        };
        document.querySelector("#targetСopmlete").onclick = function() {
            targetTableSecondBuilder("Complete");
            document.querySelector("#targetContainerSecondActive").style.display = "none";
            document.querySelector("#targetContainerSecondComplete").style.display = "block";
            document.querySelector("#targetContainerSecondDeleted").style.display = "none";
        };
        document.querySelector("#targetDeleted").onclick = function() {
            targetTableSecondBuilder("Deleted");
            document.querySelector("#targetContainerSecondActive").style.display = "none";
            document.querySelector("#targetContainerSecondComplete").style.display = "none";
            document.querySelector("#targetContainerSecondDeleted").style.display = "block";
        };
    };
    function homeTargetQuantity() {
        var arrTargetList = JSON.parse(localStorage.getItem("arrTargetListLocal"));
        if(arrTargetList == null) arrTargetList = [];
        let targetQuantity = 0;
        for (let targetId = 0; targetId < arrTargetList.length; targetId++) {
            if (arrTargetList[targetId].status == "Active") {
                targetQuantity++
            }
        }
        let x =  document.querySelector("#homeTargetQ");
        x.innerHTML = targetQuantity;
    };
    // ==================================
    // TARGET - END
    // ==================================
    // ==================================
    // Habbit - START
    // ==================================
    function addHabbitToArray() {
        let HabbitName = document.querySelector("#addHabbitName").value;
        let HabbitDesc = document.querySelector("#addHabbitDesc").value;
        let HabbitDone = document.querySelector("#addHabbitDone").value;
        let newHabbit = {
            "HabbitName": HabbitName,
            "HabbitDesc": HabbitDesc,
            "HabbitDone": HabbitDone,
            "status": "Active",
            "month": "June",
            "monthDay": {
            }
        }
        for (let dayNumber = 1; dayNumber < 31; dayNumber++) {
            newHabbit.monthDay["Day"+[dayNumber]] = "-";
        }
        let arrHabbitList = JSON.parse(localStorage.getItem("arrHabbitListLocal"));
        if(arrHabbitList == null) arrHabbitList = [];
        arrHabbitList.push(newHabbit);
        localStorage.setItem("arrHabbitListLocal", JSON.stringify(arrHabbitList));
    };
    function addHabbit() {
        document.querySelector("#addHabbit").onclick = function () {
            addHabbitToArray();
            document.querySelector("#left-menu-fullbackground").style.display = "none";
            document.querySelector("#popupHabbitForm").style.display = "none";
            habbitTableBuilder();
            habbitTableSecondBuilder("Active");
        };
    };
    function addHabbitHome() {
        document.querySelector("#addHabbit").onclick = function () {
            addHabbitToArray();
            document.querySelector("#left-menu-fullbackground").style.display = "none";
            document.querySelector("#popupHabbitForm").style.display = "none";
            homeHabbitQuantity();
        };
    };
    function habbitTableBuilder() {
        document.querySelector('#tableHabbit').innerHTML = '';
        let arrHabbitList = JSON.parse(localStorage.getItem("arrHabbitListLocal"));
        if(arrHabbitList == null) arrHabbitList = [];
        let tr = document.createElement('tr');
        for (let dayNumber = 0; dayNumber < 31; dayNumber++) {                           // Первая строка             
            let td = document.createElement('td');
            if (dayNumber == 0 ) {
                td.innerHTML = 'Цель';
                td.setAttribute("style", "width: 200px;" );
                tr.append(td);
            } else {
                td.innerHTML = [dayNumber];
                tr.append(td);
            }
            tableHabbit.append(tr);    
        } 
        for (let habbitId = 0; habbitId < arrHabbitList.length; habbitId++) {    // Тело таблицы
            let tr = document.createElement('tr');
            for (let dayNumber = 0; dayNumber < 31; dayNumber++) { 
                let td = document.createElement('td');
                let arrHabbitList = JSON.parse(localStorage.getItem("arrHabbitListLocal"));
                if (arrHabbitList[habbitId].status == "Active") { 
                    if (dayNumber == 0 ) {
                        td.innerHTML = arrHabbitList[habbitId].HabbitName;
                        td.setAttribute("style", "width: 100px;" );
                        tr.append(td);
                    } else {
                        // divChangeStatus 
                        let div = document.createElement('div');
                        div.setAttribute("class", "tableHabbitChangeStatus" );
                        div.setAttribute("id", [habbitId]+"-"+[dayNumber]);
                        div.innerHTML = arrHabbitList[habbitId].monthDay["Day"+[dayNumber]];
                        if (arrHabbitList[habbitId].monthDay["Day"+[dayNumber]] == "-") {
                            div.setAttribute("class", "HabbitDayNone" );
                        } else if (arrHabbitList[habbitId].monthDay["Day"+[dayNumber]] == "&#10025") {
                            div.setAttribute("class", "HabbitDayPlan" );
                        } else if (arrHabbitList[habbitId].monthDay["Day"+[dayNumber]] == "&#10003") {
                            div.setAttribute("class", "HabbitDayDone" );
                        }
                        td.append(div);
                        tr.append(td);
                    }
                }
            } tableHabbit.append(tr); 
        }
    };
    function habbitTableSecondBuilder(status) {
        document.querySelector('#tableHabbitSecond').innerHTML = '';
        let arrHabbitList = JSON.parse(localStorage.getItem("arrHabbitListLocal"));
        if(arrHabbitList == null) arrHabbitList = [];
        let tr = document.createElement('tr');
        for (let i = 0; i < 5; i++) {                                  // Шапка
            let td = document.createElement('td');
            if (i == 0 ) {
                td.innerHTML = 'Наименование цели';
                td.setAttribute("style", "width: 236px;" );
                tr.append(td);
            } else if (i == 1) {
                td.innerHTML = 'Описание цели';
                td.setAttribute("style", "width: 350px;" );
                tr.append(td);
            } else if (i == 2) {
                td.innerHTML = 'Критерий выполнения';
                td.setAttribute("style", "width: 200px;" );
                tr.append(td);
            } else if (i == 3) { 
                td.innerHTML = 'Действия';
                td.setAttribute("style", "width: 200px;" );
                tr.append(td);
            }
            tableHabbitSecond.append(tr);    
        } 
        for (let HabbitId = 0; HabbitId < arrHabbitList.length; HabbitId++) {
            let tr = document.createElement('tr');
            for (let i = 0; i < 5; i++) {    // i - номер столбца
                let td = document.createElement('td');
                let arrHabbitList = JSON.parse(localStorage.getItem("arrHabbitListLocal"));
                if (arrHabbitList[HabbitId].status == status) { 
                    if (i == 0 ) {
                        td.innerHTML = arrHabbitList[HabbitId].HabbitName;
                        tr.append(td);
                    } else if (i == 1) {
                        td.innerHTML = arrHabbitList[HabbitId].HabbitDesc;
                        tr.append(td);
                    } else if (i == 2) {
                        td.innerHTML = arrHabbitList[HabbitId].HabbitDone;
                        tr.append(td);
                    } else if (i == 3 && status == "Active")  { 
                        let button1 = document.createElement('button');
                        let button2 = document.createElement('button');
                        let button3 = document.createElement('button');
                        button1.setAttribute("class", "tableHabbitSecondButton" );
                        button1.setAttribute("id", [HabbitId]+"-1"); 
                        button1.innerHTML = ("Цель достигнута!")
                        button2.setAttribute("class", "tableHabbitSecondButton" );
                        button2.setAttribute("id", [HabbitId]+"-2"); 
                        button2.innerHTML = ("Редактировать")
                        button3.setAttribute("class", "tableHabbitSecondButton" );
                        button3.setAttribute("id", [HabbitId]+"-3"); 
                        button3.innerHTML = ("Удалить")
                        td.append(button1);
                        td.append(button2);
                        td.append(button3);
                        tr.append(td);
                    } else if (i == 3 && status == "Complete") { 
                        let button2 = document.createElement('button');
                        button2.setAttribute("class", "tableHabbitSecondButton" );
                        button2.setAttribute("id", [HabbitId]+"-4"); 
                        button2.innerHTML = ("Сделать активной")
                        td.append(button2);
                        tr.append(td);
                    } else if (i == 3 && status == "Deleted") { 
                        let button2 = document.createElement('button');
                        let button3 = document.createElement('button');
                        button2.setAttribute("class", "tableHabbitSecondButton" );
                        button2.setAttribute("id", [HabbitId]+"-5"); 
                        button2.innerHTML = ("Сделать активной")
                        button3.setAttribute("class", "tableHabbitSecondButtonDel" );
                        button3.setAttribute("id", [HabbitId]+"-6");
                        button3.innerHTML = ("Уничтожить")
                        td.append(button2);
                        td.append(button3);
                        tr.append(td);
                    }

                }
            } tableHabbitSecond.append(tr); 
        }
    };
    function tableHabbitSecondButtons () {
        tableHabbitSecond.addEventListener('click', function(event) {

            let target = event.target; // Разбивка строки
            let str = target.id;
            let substr = str.split("-");
            let HabbitId = substr[0];
            let action = substr[1];

            //Action:
            //1 - Цель достигнута!
            //2 - Редактировать
            //3 - Удалить
            //4 - Сделать активной 
            //5 - Сделать активной с другой вкладки
            //6 - Уничтожить

            let arrHabbitList = JSON.parse(localStorage.getItem("arrHabbitListLocal"));
            if (action == 1) {
                arrHabbitList[HabbitId].status = "Complete";
                localStorage.setItem("arrHabbitListLocal", JSON.stringify(arrHabbitList));
                habbitTableBuilder();
                habbitTableSecondBuilder("Active");
            } else if (action == 2) {
                document.querySelector("#left-menu-fullbackground").style.display = "block";
                document.querySelector("#popupHabbitFormEdit").style.display = "block";
                addHabbitNameEdit.setAttribute("value", arrHabbitList[HabbitId].HabbitName);
                addHabbitDescEdit.innerHTML = arrHabbitList[HabbitId].HabbitDesc;
                addHabbitDoneEdit.setAttribute("value", arrHabbitList[HabbitId].HabbitDone);
                document.querySelector("#addHabbitEdit").onclick = function () {  
                    let arrHabbitList= JSON.parse(localStorage.getItem("arrHabbitListLocal"));
                    if(arrHabbitList == null) arrHabbitList = [];
                    arrHabbitList[HabbitId].HabbitName = document.querySelector("#addHabbitNameEdit").value;
                    arrHabbitList[HabbitId].HabbitDesc = document.querySelector("#addHabbitDescEdit").value;
                    arrHabbitList[HabbitId].HabbitDone = document.querySelector("#addHabbitDoneEdit").value;
                    localStorage.setItem("arrHabbitListLocal", JSON.stringify(arrHabbitList));
                    document.querySelector("#left-menu-fullbackground").style.display = "none";
                    document.querySelector("#popupHabbitFormEdit").style.display = "none";
                    habbitTableBuilder();
                    habbitTableSecondBuilder("Active");
                    };
            } else if (action == 3) {
                arrHabbitList[HabbitId].status = "Deleted";
                localStorage.setItem("arrHabbitListLocal", JSON.stringify(arrHabbitList));
                habbitTableBuilder();
                habbitTableSecondBuilder("Active");
            } else if (action == 4) {
                arrHabbitList[HabbitId].status = "Active";
                localStorage.setItem("arrHabbitListLocal", JSON.stringify(arrHabbitList));
                habbitTableBuilder();
                habbitTableSecondBuilder("Complete");
            } else if (action == 5) {
                arrHabbitList[HabbitId].status = "Active";
                localStorage.setItem("arrHabbitListLocal", JSON.stringify(arrHabbitList));
                habbitTableBuilder();
                habbitTableSecondBuilder("Deleted");
            } else if (action == 6) {
                arrHabbitList.splice([HabbitId], 1);
                localStorage.setItem("arrHabbitListLocal", JSON.stringify(arrHabbitList));
                habbitTableBuilder();
                habbitTableSecondBuilder("Deleted");
            }
        });
    };
    function tableHabbitChangeStatus() {
        tableHabbit.addEventListener('click', function(event) {
            let target = event.target;  // Разбивка строки
            let str = target.id;
            let substr = str.split("-");
            let HabbitId = substr[0];
            let day = substr[1];
            let arrHabbitList = JSON.parse(localStorage.getItem("arrHabbitListLocal"));
            if ( arrHabbitList[HabbitId].monthDay["Day"+[day]] == "-") {
                arrHabbitList[HabbitId].monthDay["Day"+[day]] = "&#10025";
            } else if (arrHabbitList[HabbitId].monthDay["Day"+[day]] == "&#10025") {
                arrHabbitList[HabbitId].monthDay["Day"+[day]] = "&#10003";
            } else if (arrHabbitList[HabbitId].monthDay["Day"+[day]] == "&#10003") {
                arrHabbitList[HabbitId].monthDay["Day"+[day]] = "-"
            }
            localStorage.setItem("arrHabbitListLocal", JSON.stringify(arrHabbitList));
            habbitTableBuilder();
        });
    };
    function btnHabbit() {
        habbitTableBuilder();
        tableHabbitChangeStatus();
        addHabbit();
        popUpHabbit();
        popUpHabbitEdit();
        habbitTableSecondBuilder("Active");
        tableHabbitSecondButtons();
        document.querySelector("#HabbitActive").onclick = function() {
            habbitTableSecondBuilder("Active");
            document.querySelector("#HabbitContainerSecondActive").style.display = "block";
            document.querySelector("#HabbitContainerSecondComplete").style.display = "none";
            document.querySelector("#HabbitContainerSecondDeleted").style.display = "none";
        };
        document.querySelector("#HabbitСopmlete").onclick = function() {
            habbitTableSecondBuilder("Complete");
            document.querySelector("#HabbitContainerSecondActive").style.display = "none";
            document.querySelector("#HabbitContainerSecondComplete").style.display = "block";
            document.querySelector("#HabbitContainerSecondDeleted").style.display = "none";
        };
        document.querySelector("#HabbitDeleted").onclick = function() {
            habbitTableSecondBuilder("Deleted");
            document.querySelector("#HabbitContainerSecondActive").style.display = "none";
            document.querySelector("#HabbitContainerSecondComplete").style.display = "none";
            document.querySelector("#HabbitContainerSecondDeleted").style.display = "block";
        };
    };
    function homeHabbitQuantity() {
        var arrHabbitList = JSON.parse(localStorage.getItem("arrHabbitListLocal"));
        if(arrHabbitList == null) arrHabbitList = [];
        let HabbitQuantity = 0;
        for (let habbitId = 0; habbitId < arrHabbitList.length; habbitId++) {
            if (arrHabbitList[habbitId].status == "Active") {
                HabbitQuantity++
            }
        }
        let x =  document.querySelector("#homeHabbitQ");
        x.innerHTML = HabbitQuantity;
    };
    // ==================================
    // Habbit - END
    // ==================================

    // ==================================
    // Date - START
    // ==================================
    function calculateNextAct(actLastAct, actCycle) {
        let str = actLastAct;
        let substr = str.split("-");
        let year = parseInt(substr[0])
        let month = parseInt(substr[1])
        let day = parseInt(substr[2])
        actLastAct = new Date(year,month,day)
        actCycle = parseInt(actCycle)
        actLastAct.setDate(actLastAct.getDate() + actCycle);
        let dd = actLastAct.getDate();
        let mm = actLastAct.getMonth();
        let yy = actLastAct.getFullYear();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        if (yy < 10) yy = '0' + yy;
        let nextAct = yy+"-"+mm+"-"+dd;
        return nextAct;
    };
    function addActToArray() {
        let actName = document.querySelector("#addActName").value;
        let actLastAct = document.querySelector("#addActLastAct").value;
        let actCycle = document.querySelector("#addActCycle").value;
        let newAct = {
            "actName": actName,
            "actLastAct": actLastAct,
            "actCycle": actCycle,
        }
        newAct["actNextAct"] = calculateNextAct(actLastAct, actCycle);
        let arrActList = JSON.parse(localStorage.getItem("arrActListLocal"));
        if (arrActList == null) arrActList = [];
        arrActList.push(newAct);
        localStorage.setItem("arrActListLocal", JSON.stringify(arrActList));
        document.querySelector("#left-menu-fullbackground").style.display = "none";
        document.querySelector("#popupActForm").style.display = "none";
    };
    function addAct() {
        document.querySelector("#addAct").onclick = function () {
            addActToArray();
            tableActBuilder();
        };
    };
    function addActHome() {
        document.querySelector("#addAct").onclick = function () {
            addActToArray();
            homeActQuantity();
        };
    };
    function tableActBuilder() {
        document.querySelector('#tableAct').innerHTML = '';
        let arrActList = JSON.parse(localStorage.getItem("arrActListLocal"));
        if(arrActList == null) arrActList = [];
        let tr = document.createElement('tr');
        for (let i = 0; i < 5; i++) {
            let td = document.createElement('td');
            if (i == 0 ) {
                td.innerHTML = 'Название';
                td.setAttribute("style", "width: 180px;" );
                tr.append(td);
            } else if (i == 1) {
                td.innerHTML = 'Последнее действие';
                td.setAttribute("style", "width: 180px;" );
                tr.append(td);
            } else if (i == 2) {
                td.innerHTML = 'Периодичность, дней';
                td.setAttribute("style", "width: 180px;" );
                tr.append(td);
            } else if (i == 3) {
                td.innerHTML = 'Следующее действие';
                td.setAttribute("style", "width: 180px;" );
                tr.append(td);
            } else if (i == 4) {
                td.innerHTML = 'Управление';
                td.setAttribute("style", "width: 180px;" );
                tr.append(td);
            }
            tableAct.append(tr);    
        }
        for (let actId = 0; actId < arrActList.length; actId++) {
            let tr = document.createElement('tr');
            for (let i = 0; i < 5; i++) {
                let td = document.createElement('td');
                if (i == 0 ) {
                    td.innerHTML = arrActList[actId].actName;
                    tr.append(td);
                } else if (i == 1) {
                    td.innerHTML = arrActList[actId].actLastAct;
                    tr.append(td);
                } else if (i == 2) {
                    td.innerHTML = arrActList[actId].actCycle;
                    tr.append(td);
                } else if (i == 3) {
                    td.innerHTML = arrActList[actId].actNextAct;
                    tr.append(td);
                } else if (i == 4) {
                    let button1 = document.createElement('button');
                    let button2 = document.createElement('button');
                    button1.setAttribute("class", "tableActButton" );
                    button1.setAttribute("id", [actId]+"-1");
                    button1.innerHTML = ("Обновить")
                    button2.setAttribute("class", "tableActButtonDel");
                    button2.setAttribute("id", [actId]+"-2");
                    button2.innerHTML = ("Удалить")
                    td.append(button1);
                    td.append(button2);
                    tr.append(td);
                }
            }tableAct.append(tr); 
        }
    };
    function tableActButtons() {
        tableAct.addEventListener('click', function(event) {
            let target = event.target;
            let str = target.id;
            let substr = str.split("-");
            let actId = substr[0];
            let action = substr[1];
            //Action:
            //1 - Обновить
            //2 - Удалить
            let arrActList = JSON.parse(localStorage.getItem("arrActListLocal"));
            if (action == 1) {
                document.querySelector("#left-menu-fullbackground").style.display = "block";
                document.querySelector("#popupActFormEdit").style.display = "block";
                addActNameEdit.setAttribute("value", arrActList[actId].actName);
                addActLastActEdit.setAttribute("value", arrActList[actId].actNextAct);
                addActCycleEdit.setAttribute("value", arrActList[actId].actCycle);
                document.querySelector("#addActEdit").onclick = function () {
                    arrActList[actId].actName = document.querySelector("#addActNameEdit").value;
                    arrActList[actId].actLastAct = document.querySelector("#addActLastActEdit").value;
                    arrActList[actId].actCycle = document.querySelector("#addActCycleEdit").value;
                    document.querySelector("#left-menu-fullbackground").style.display = "none";
                    document.querySelector("#popupActFormEdit").style.display = "none";
                    arrActList[actId].actNextAct = calculateNextAct(arrActList[actId].actLastAct, arrActList[actId].actCycle);
                    localStorage.setItem("arrActListLocal", JSON.stringify(arrActList));
                    tableActBuilder();
                };
            } else if (action == 2) {
                arrActList.splice([actId], 1);
                localStorage.setItem("arrActListLocal", JSON.stringify(arrActList));
                tableActBuilder();
            }
        });
    };
    function homeActQuantity() {
        var arrActList = JSON.parse(localStorage.getItem("arrActListLocal"));
        if(arrActList == null) arrActList = [];
        let x =  document.getElementById("homeActQ");
        if (arrActList.length == 1) {
            x.innerHTML = arrActList.length+" действие.";
        } else if (arrActList.length > 4) {
            x.innerHTML = arrActList.length+" действий.";
        } else if (arrActList.length == 0) {
            x.innerHTML = arrActList.length+" действий.";
        } else if (1 < arrActList.length < 5) {
            x.innerHTML = arrActList.length+" действия.";
        }
    };
    function btnAct() {
        popUpAct();
        popUpActEdit();
        addAct();
        tableActBuilder();
        tableActButtons();
    };
};