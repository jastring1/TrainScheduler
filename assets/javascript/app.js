var config = {
    apiKey: "AIzaSyDYVNJ-Ggov5htghQ-BkNxOBcG3c6SfULU",
    authDomain: "bootcamp-example-8f83a.firebaseapp.com",
    databaseURL: "https://bootcamp-example-8f83a.firebaseio.com",
    projectId: "bootcamp-example-8f83a",
    storageBucket: "",
    messagingSenderId: "570706840985",
    appId: "1:570706840985:web:66af9a4c6d8e3d14"
  };
  
  firebase.initializeApp(config);
  var database = firebase.database();


  $("#add-train").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    // Code for handling the push
    database.ref().push({
      name: name,
      destination: destination,
      frequency: frequency
    });
});

database.ref().on("child_added", function(snapshot) {
    var sv = snapshot.val();
    var months = moment().diff(moment(sv.start),"months");
    $("#table-body").append("<tr>" + "<td>" + sv.name + "</td><td>" + sv.destination + "</td><td>" + sv.frequency + "</td> </tr>");


    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
  