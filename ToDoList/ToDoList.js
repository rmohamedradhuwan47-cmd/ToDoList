// Get the form, input, and button elements
const form = document.getElementById("task-form");
const taskinput = document.getElementById("task-input");
const taskbutton = document.getElementById("add-Btn");
const tasklist = document.getElementById("lists");
// Get the task list element
const errormsg = document.getElementById("errorMsg");
const Datetime = document.getElementById("Datetime");
// Add an event listener to the form to handle the submit event
console.log(form);
console.log(taskinput);
console.log(taskbutton);

const now = new Date();
console.log(now.toDateString());
console.log(now.toLocaleDateString());
console.log(now.toLocaleTimeString());
Datetime.innerHTML=`[
${now.toLocaleDateString()}]---
${now.toLocaleTimeString()}
`;
class Task{
    constructor(value){
        this.value = value; 
    }
}
const Tasks =[];
form.addEventListener("submit",function(event){
    event.preventDefault();
    if(taskinput.value.trim() === ""){
        errormsg.textContent = "Please enter a task";
        return;
    }
    const taskvalue = new Task(taskinput.value);
    Tasks.push(taskvalue);
    tasklist.innerHTML+=`
    <li> <input type="checkbox" id="checkbox" > ${taskvalue.value}
    <button 
    class="complete";
    width="100px"; 
    margin-top="10px";  
    padding="40px";
    
    >Task Completed</button></li>
    `;
    errormsg.textContent="";
    form.reset();
    
    console.log("Submitted");
});
tasklist.addEventListener("click",function(event){
    const row = event.target.closest("li");
    if(event.target.classList.contains("complete")){
        if (event.target.checked) {
        row.remove();
    }
}
    console.log(row);
    console.log("checked");


});