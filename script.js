// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
//---date at top of calendar
//---create a variable with the date of today
//---display variable up at the top
//---moment js - use functions from this script source in html

//DOM elements
var currentDateEl = $("#currentDay");
var calendar = $("#schedule");

//global variables
var currentDate = moment().format("dddd, MMMM Do YYYY");
var workDay = 8;
var tasks = new Array(8);

currentDateEl.text(currentDate);

var time = 9;
var ampm = "AM";
// WHEN I scroll down
// THEN I am presented with timeblocks for standard business hours
//var each class past present future, escape it to check

//create each of the lines of the calendar
for (var i = 0; i < workDay; i++) {
  //this makes one line looking how we want
  calendar.append(`<div class="input-group" value=${i}>
     <div class="col-3">
       <input
         type="text"
         class="form-control"
         placeholder="${time}:00 ${ampm}"
         id="time-${i}"
         readonly
       />
     </div>
     <div class="col-7">
       <input type="text" class="form-control" placeholder="Your Task Here" id="task-${i}" />
     </div>
     <div class="col-2">
       <button class="btn btn-primary save form-control4" id="${i}">Save</button>
     </div>
   </div>
 </div>`);
  time = time === 12 ? 1 : time + 1;
  ampm = time > 11 ? "PM" : ampm;
}

//run function on page load
onPageLoad();

// WHEN I click into a timeblock
// THEN I can enter an event

// WHEN I click the save button for that timeblock
// THEN the text for that event is saved in local storage
$(".save").on("click", function (event) {
  event.preventDefault();
  //set the clickButton variable as the button that was clicked
  var clickButton = $(this);

  //inputID is the ID of the save button
  var inputID = "#task-" + clickButton.attr("id");

  //set textVal as the task input
  var textVal = $(inputID).val();
  console.log(textVal);

  //array of the input tasks by index
  tasks[clickButton.attr("id")] = textVal;

  //store the array to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
});

// WHEN I refresh the page
// THEN the saved events persist -->
function onPageLoad() {
  //set the global tasks array to the local storage tasks
  var checkTasks = JSON.parse(localStorage.getItem("tasks"));
  if (checkTasks !== null) {
    //only iterate if there is something in the array
    tasks = checkTasks;
  }
  //iterate through the array
  for (var i = 0; i < tasks.length; i++) {
    var inputId = "task-" + i;
    //add each item in the array into the text boxes
    $("#" + inputId).val(tasks[i]);
  }

  changeColors();
}

//change color based on time
function changeColors() {
  //get the current time
  var currentTime = Number(moment().format("h"));

  //modify the current time to make it match the indexes
  if (currentTime <= 12 && currentTime >= 9) {
    currentTime = currentTime - 9;
  } else {
    currentTime = currentTime + 3;
  }

  //check each of the schedules rows and change color
  $("#schedule > .input-group").each(function () {
    var row = $(this);
    var rowVal = Number(row.attr("value"));

    //if current row is before the current time, turn it orange
    if (rowVal < currentTime) {
      row.attr("style", "background-color:orange");
    }
    //if current row is the current time, turn it red
    else if (rowVal === currentTime) {
      row.attr("style", "background-color:red");
    }
    //if current row is after the current time, turn it blue
    else {
      row.attr("style", "background-color:blue");
    }
  });
}
