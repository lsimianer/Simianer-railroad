//declare var global use
var index = 0

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDOzIR9gEksJDgYy_zIlxez40xcaRCB5n0",
    authDomain: "lukes-project-df516.firebaseapp.com",
    databaseURL: "https://lukes-project-df516.firebaseio.com",
    projectId: "lukes-project-df516",
    storageBucket: "lukes-project-df516.appspot.com",
    messagingSenderId: "443772255372",
    appId: "1:443772255372:web:15882abb7d46dd27"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();


  $("#updateTrains").on("submit", function (event) {
      event.preventDefault();
        console.log("submitted foo");

        //pull value from input and trim whitespace before and after
      var name = $("#trainName").val().trim();
  		var destination = $("#Destination").val().trim();
  		var NextArrival = $("#Next-Arrival").val().trim();
      var frequency = $("#Frequency").val().trim();
      
      //push to firebase from inputs upon submit
      database.ref().push({
  			name: name,
  			destination: destination,
  			NextArrival: NextArrival,
  			Frequency: Frequency
  });

      $("#trainName").val("");
      $("#Destination").val("");
      $("#Next-Arrival").val("");
      $("#Frequency").val(""); 
// if fields blank, no submit = false. all fields required
      return false;
    });

    // firebase will order my trains by the date created
    database.ref().orderByChild("dateAdded").on("child_added", function (childSnapshot) {

      // create an update button?? do i need this functionality.. its midnight, look on readme tomorrow
      // create a remove button for the fields? video suggested it, but they also used bootstrap. #lazy
      //go to sleep...
      // plz
      
      var tNextArrival = childSnapshot.val.NextArrival;
      var tFrequency = parseInt(childSnapshot.val().Frequency);
      // guessing on the sub 1 year part, will test tomorrow. stack overflows application was 
      //different but it made sense
      var firstTrain = moment(tNextArrival, "HH:mm:ss" ).subtract(1, "years");
      console.log(firstTrain);
      console.log(tNextArrival);
      //time calc vars
      var currentTime = moment();
      var currentTimeCalc = moment().subtract(1, "years");
      var diffTime = moment().diff(moment(firstTrain), "minutes");
      var tRemainder = diffTime%tFrequency;
      var minutesRemaining = tFrequency - tRemainder;
      //what are we doing with the time vars
      var nextTRain = moment().add(minutesRemaining, "minutes").format ("hh:mm:ss A");
      var beforeCalc = moment(firstTrain).diff(currentTimeCalc, "minutes");
      var beforeMinutes = Math.ceil(moment.duration(beforeCalc).asMinutes());
      
      //snaohsot to update time cals
      if ((currentTimeCalc - firstTrain) < 0) {
        nextTrain = childSnapshot.val().NextArrival;
        console.log("Before next arrival");
        minutesRemaining = beforeMinutes;
      }

      else {
        nextTrain = moment().add(minutesRemaining, "minutes").format("HH:mm:ss A");
        minutesRemaining = tFrequency - tRemainder;
        console.log(" time calc working")
      }

      var newRow = $("<tr>");
        newRow.addClass("row-" + index);
        var cell1 = $("<td>").append(updateButton);
        var cell2 = $("<td>").text(childSnapshot.val().name);
        var cell3 = $("<td>").text(childSnapshot.val().destination);
        var cell4 = $("<td>").text(childSnapshot.val().frequency);
        var cell5 = $("<td>").text(nextTrain);
        var cell6 = $("<td>").text(minutesRemaining);
        var cell7 = $("<td>").append(removeButton);


