const Datetime = document.getElementById("Datetime");
const input = document.getElementById("task-input");
const button = document.getElementById("add-Btn");
const list = document.getElementById("lists");
const form = document.getElementById("Form");
const errorMessage = document.getElementById("errorMsg");


console.log(Datetime);
console.log(input);
console.log(button);
console.log(list);
console.log(form);
console.log(errorMessage);
//-----------------------------------------------------------------------------------------------------------//
//                          creating the current time and displaying it to the webpage                       //
//-----------------------------------------------------------------------------------------------------------//
function showTime(){
    const now = new Date();
    Datetime.textContent = `Date and Time :
    
    |${now.toLocaleString()}|`;
}
showTime();
setInterval(showTime, 1000);




//-----------------------------------------------------------------------------------------------------------//
//                          change the current array into strings  with JSON if we vist the page
//-----------------------------------------------------------------------------------------------------------//

//===========================================================================================================//
let taskarray = JSON.parse(localStorage.getItem("tasks"))||[]; 
//=========================================================================================================//

//-----------------------------------------------------------------------------------------------------------//
//                          set the changed strings into a array and storging in the browser
//-----------------------------------------------------------------------------------------------------------//
function saveTask(){
    localStorage.setItem("tasks",JSON.stringify(taskarray));
}




//=========================================================================================================//
// creating the submit event 
form.addEventListener("submit" , function(e){
    // stop reset the browser window 
    e.preventDefault();
    
    //triming the white space 
    const task = input.value.trim();
//-----------------------------------------------------------------------------------------------------------//
    //check if there is any white space
    if(task ===""){
        errorMessage.textContent="Please write the task";
        return;
    }
//-----------------------------------------------------------------------------------------------------------//
    //creating an object for the new task array 
    const newtask = {text:task,dates:Date.now(),done:false};

    //pushing the value to from old ---> new array (new task)
    taskarray.push(newtask);
//-----------------------------------------------------------------------------------------------------------//
    //reseting the error message
    errorMessage.textContent="";

    console.log(task);
    console.log(newtask);

//-----------------------------------------------------------------------------------------------------------//
//                                  calling the functions the save change i each process
//-----------------------------------------------------------------------------------------------------------//
    saveTask();
    renderTasks();

    //reset the from for doesn't get same task
    form.reset();
})





//===========================================================================================================//
//creating the render function for adding --> checking ---> deleting buttons
function renderTasks(){
    list.innerHTML="";

    //looping thought the each arrays in the taskarray
    taskarray.forEach(function(item){

        //creating a tag
        const li = document.createElement("li");
        //display it to the webpage
        li.textContent= `${item.text}`;
        //check if it is completed 
        if(item.done === true){
            li.classList.add("done");
        }
        // adding to the ul--->li
        list.appendChild(li);
        

        //-----------------------------------------------------------------------------------------------------------//
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.dataset.id=item.dates;
        checkbox.checked=item.done;
        li.prepend(checkbox);

        //-----------------------------------------------------------------------------------------------------------//
        const removebtn = document.createElement("button");
        removebtn.textContent="🗑️";
        removebtn.dataset.id= item.dates;
        li.appendChild(removebtn);
        
    })    
}






//===========================================================================================================//
list.addEventListener("click", function(e){

    // CASE 1: trash button
    if(e.target.tagName === "BUTTON"){
        const deletedId = Number(e.target.dataset.id);
        taskarray = taskarray.filter(function(item){
            return item.dates !== deletedId;
        })
        saveTask();
        renderTasks();
    }
//-----------------------------------------------------------------------------------------------------------//
    // CASE 2: checkbox (separate if, same level)
    if(e.target.type === "checkbox"){
        const clickedId = Number(e.target.dataset.id);
        taskarray.forEach(function(item){
            if(item.dates === clickedId)
                item.done = !item.done;
        })
        saveTask();
        renderTasks();
    }

})

renderTasks();