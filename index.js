var firebaseConfig = {
    apiKey: "AIzaSyDOzIR9gEksJDgYy_zIlxez40xcaRCB5n0",
    authDomain: "lukes-project-df516.firebaseapp.com",
    databaseURL: "https://lukes-project-df516.firebaseio.com",
    projectId: "lukes-project-df516",
    storageBucket: "lukes-project-df516.appspot.com",
    messagingSenderId: "443772255372",
    appId: "1:443772255372:web:15882abb7d46dd27"
  };

// Assign the reference to the database to a variable named 'database'
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var tName = "";
var tDestination = "";
var tFrequency = "";
var tNextArrival = 0;


$("#home").on("click", function(event){
    event.preventDefault();
})


$("#submit").on("click", function(event){
  event.preventDefault();
  //Get values of the name, Destination, Frequency date, & Next Arrival
  tName = $("#TrainName").val().trim();
  tDestination = $("#Destination").val().trim();
  tFrequency = $("#Frequency").val().trim();
  tNextArrival = $("#Next-Arrival").val().trim();

  console.log(tName + " " + tDestination + " " + tFrequency + " " + tNextArrival);

  //Push these values to the database
  database.ref().push({
    name: tName, 
    Destination: tDestination,
    Frequency: tFrequency,
    NextArrival: tNextArrival,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});


//When there's a child added to the database this fuction will run
// This function allows you to update your page in real-time when the firebase database changes.

database.ref().orderByChild("dateAdded").on("child_added", function (snapshot){
  console.log(snapshot.child());
    $("tbody").append("<tr><td>" + 
      snapshot.val().name + "</td>" + "<td>" + 
      snapshot.val().Destination + "</td>" + "<td>" + 
      snapshot.val().Frequency + "</td>" + 
      "<td>" + snapshot.val().NextArrival + "</td>");
});


function displayTime() {
    var time = moment().format('HH:mm:ss');
    $('#clock').html(time);
    setTimeout(displayTime, 1000);
}

$(document).ready(function() {
    displayTime();
    dateDifference();
});


// calc mins away
var now = time;
var prev = tNextArrival;

 function dateDifference(startDate, endDate){
        return moment(startDate).diff(moment(endDate), 'minutes');
    }
    console.log(this.dateDifference);

