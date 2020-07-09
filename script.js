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
var tasks = [];

currentDateEl.text(currentDate);

var time = 9;
var ampm = "AM";
// WHEN I scroll down
// THEN I am presented with timeblocks for standard business hours
//var each class past present future, escape it to check
for (var i = 0; i <= workDay; i++) {
  calendar.append(`<div class="row">
     <div class="col-4">
       <input
         type="text"
         class="form-control"
         placeholder="${time}:00 ${ampm}"
         id="time-${i}"
         readonly
       />
     </div>
     <div class="col-4">
       <input type="text" class="form-control" placeholder="" id="task-${i}" />
     </div>
     <div class="col-4">
       <button class="btn btn-primary save" id="${i}">Save</button>
     </div>
   </div>
 </div>`);
  time = time === 12 ? 1 : time + 1;
  ampm = time > 11 ? "PM" : ampm;
}
// WHEN I view the timeblocks for that day
// THEN each timeblock is color coded to indicate whether it is in the past, present, or future

// WHEN I click into a timeblock
// THEN I can enter an event

// WHEN I click the save button for that timeblock
// THEN the text for that event is saved in local storage
$(".save").on("click", function (event) {
  event.preventDefault();
  var clickButton = $(this);
  var inputID = "task-" + clickButton.attr("id");
  console.log($("#inputID"));
  var textVal = document.getElementById("inputID").value;
  console.log(textVal);
  //array of the input tasks
});
// WHEN I refresh the page
// THEN the saved events persist -->
