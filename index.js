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

      var name = $("#trainName").val().trim();
  		var destination = $("#Destination").val().trim();
  		var firstTime = $("#Next-Arrival").val().trim();
  		var frequency = $("#Frequency").val().trim();
  })

  