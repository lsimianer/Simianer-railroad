var firebaseConfig = {
    apiKey: "AIzaSyDOzIR9gEksJDgYy_zIlxez40xcaRCB5n0",
    authDomain: "lukes-project-df516.firebaseapp.com",
    databaseURL: "https://lukes-project-df516.firebaseio.com",
    projectId: "lukes-project-df516",
    storageBucket: "lukes-project-df516.appspot.com",
    messagingSenderId: "443772255372",
    appId: "1:443772255372:web:15882abb7d46dd27"
  };

  firebase.initializeApp(firebaseConfig);
    var database = firebase.database();


$("#submit").on("click", function(event){
  event.preventDefault();
  //Get values of the name, Destination, Frequency date, & Next Arrival
  tName = $("#TrainName").val().trim();
  tDestination = $("#Destination").val().trim();
  tFrequency = $("#Frequency").val().trim();
  tNextArrival = $("#Next-Arrival").val().trim();

  console.log(tName + " " + tDestination + " " + tFrequency + " " + tNextArrival);

});


database.ref().orderByChild("dateAdded").on("child_added", function (snapshot){
    console.log(snapshot.child());
      $("tbody").append("<tr><td>" + 
        snapshot.val().name + "</td>" + "<td>" + 
        snapshot.val().Destination + "</td>" + "<td>" + 
        snapshot.val().Frequency + "</td>" + 
        "<td>" + snapshot.val().NextArrival + "</td>");
  });

